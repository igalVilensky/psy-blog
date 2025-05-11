import { doc, getDoc, updateDoc, setDoc, increment } from "firebase/firestore";

// Fetch Wheel of Life data for a user
export const getWheelOfLifeData = async (firestore, userId) => {
  try {
    const userRef = doc(firestore, "wheel_of_life", userId);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        success: true,
        data: {
          categories: data.categories || [],
          lastSaved: data.lastSaved || null,
          goals: data.goals || [],
          history: data.history || [],
        },
      };
    } else {
      return {
        success: false,
        message: "No Wheel of Life data found for this user",
      };
    }
  } catch (error) {
    console.error("Error fetching Wheel of Life data:", error);
    return {
      success: false,
      message: "Failed to fetch data",
    };
  }
};

// Save Wheel of Life data and update Hod Sefira progress
export const saveWheelOfLifeData = async (
  firestore,
  userId,
  categories,
  goals,
  history,
  showNotification
) => {
  if (!userId) {
    console.error("User ID is required");
    showNotification("Требуется идентификатор пользователя.", "error");
    return { success: false, message: "User ID is required" };
  }

  // Validate data
  if (!Array.isArray(categories) || categories.length === 0) {
    console.error("Categories must be a non-empty array");
    showNotification("Категории должны быть непустым массивом.", "error");
    return { success: false, message: "Invalid categories" };
  }

  for (const category of categories) {
    if (
      typeof category.name !== "string" ||
      typeof category.score !== "number" ||
      category.score < 1 ||
      category.score > 10 ||
      typeof category.color !== "string" ||
      (category.importance != null &&
        (typeof category.importance !== "number" ||
          category.importance < 1 ||
          category.importance > 5)) ||
      (category.energy != null &&
        !["energizing", "neutral", "draining"].includes(category.energy))
    ) {
      console.error("Invalid category:", category);
      showNotification("Недопустимая категория.", "error");
      return { success: false, message: "Invalid category" };
    }
  }

  if (goals != null && !Array.isArray(goals)) {
    console.error("Goals must be an array or null");
    showNotification("Цели должны быть массивом или null.", "error");
    return { success: false, message: "Invalid goals" };
  }

  if (history != null && !Array.isArray(history)) {
    console.error("History must be an array or null");
    showNotification("История должна быть массивом или null.", "error");
    return { success: false, message: "Invalid history" };
  }

  for (const entry of history || []) {
    if (
      typeof entry.timestamp !== "number" ||
      (entry.dateFormatted != null &&
        typeof entry.dateFormatted !== "string") ||
      !Array.isArray(entry.categories)
    ) {
      console.error("Invalid history entry:", entry);
      showNotification("Недопустимая запись истории.", "error");
      return { success: false, message: "Invalid history entry" };
    }
    for (const category of entry.categories) {
      if (
        typeof category.name !== "string" ||
        typeof category.score !== "number" ||
        category.score < 1 ||
        category.score > 10 ||
        typeof category.color !== "string" ||
        (category.importance != null &&
          (typeof category.importance !== "number" ||
            category.importance < 1 ||
            category.importance > 5)) ||
        (category.energy != null &&
          !["energizing", "neutral", "draining"].includes(category.energy))
      ) {
        console.error("Invalid history category:", category);
        showNotification("Недопустимая категория в истории.", "error");
        return { success: false, message: "Invalid history category" };
      }
    }
  }

  const userRef = doc(firestore, "wheel_of_life", userId);
  const progressRef = doc(firestore, `users/${userId}/progress/sefirot`);
  const today = new Date().toISOString().split("T")[0];
  const dailyRef = doc(firestore, `users/${userId}/daily/${today}`);

  const newData = {
    categories,
    goals: goals || [],
    history: history || [],
    lastSaved: new Date().toISOString(),
  };

  try {
    // Check if daily actions document exists and initialize if not
    const dailySnap = await getDoc(dailyRef);
    if (!dailySnap.exists()) {
      const initialDailyData = {
        keter: { actions: 0 },
        chokhmah: { actions: 0 },
        binah: { actions: 0 },
        chesed: { actions: 0 },
        gevurah: { actions: 0 },
        tiferet: { actions: 0 },
        netzach: { actions: 0 },
        hod: { actions: 0 },
        yesod: { actions: 0 },
        malkhut: { actions: 0 },
      };
      await setDoc(dailyRef, initialDailyData);
    } else {
      // Check if max actions (3) for Hod have been reached
      const dailyData = dailySnap.data();
      if (dailyData.hod?.actions >= 3) {
        showNotification(
          "Достигнуто максимальное количество действий для Ход сегодня.",
          "warning"
        );
        return {
          success: false,
          message: "Max daily actions for Hod reached",
        };
      }
    }

    // Save the Wheel of Life data
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      await updateDoc(userRef, newData);
    } else {
      await setDoc(userRef, newData);
    }

    // Update Sefirot progress (add 10 points to Hod)
    await updateDoc(progressRef, {
      "hod.points": increment(10),
      "hod.lastActive": new Date(),
    });

    // Update daily actions (add 1 action to Hod)
    await updateDoc(dailyRef, {
      "hod.actions": increment(1),
    });

    showNotification(
      "Данные успешно сохранены и прогресс обновлен!",
      "success"
    );
    return {
      success: true,
      message: "Data saved and progress updated successfully",
    };
  } catch (error) {
    console.error(
      "Error saving Wheel of Life data or updating progress:",
      error
    );
    showNotification(
      "Ошибка сохранения данных или обновления прогресса. Пожалуйста, попробуйте еще раз.",
      "error"
    );
    return {
      success: false,
      message: "Failed to save data or update progress",
    };
  }
};
