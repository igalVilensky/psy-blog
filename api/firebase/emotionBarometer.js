import {
  doc,
  getDoc,
  updateDoc,
  setDoc,
  arrayUnion,
  increment,
} from "firebase/firestore";

// Fetch user emotion data from `emotion_barometer` document (unchanged)
export const getEmotionBarometerData = async (firestore, userId) => {
  try {
    const userRef = doc(firestore, "emotion_barometer", userId);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        success: true,
        data: {
          entries: data.entries || [],
          lastUpdated: data.lastUpdated || null,
        },
      };
    } else {
      return {
        success: false,
        message: "No entries found for this user",
      };
    }
  } catch (error) {
    console.error("Error fetching emotion barometer data:", error);
    return {
      success: false,
      message: "Failed to fetch data",
    };
  }
};

// Save emotion entry to Firebase and update Sefirot progress
export const saveEmotionBarometerEntry = async (
  firestore,
  userId,
  entryData,
  showNotification // Callback for notifications
) => {
  if (!userId) {
    console.error("User ID is required");
    showNotification("Требуется идентификатор пользователя.", "error");
    return { success: false, message: "User ID is required" };
  }

  const userRef = doc(firestore, "emotion_barometer", userId);
  const progressRef = doc(firestore, `users/${userId}/progress/sefirot`);
  const today = new Date().toISOString().split("T")[0];
  const dailyRef = doc(firestore, `users/${userId}/daily/${today}`);

  const newEntry = {
    emotion: entryData.emotion,
    subEmotion: entryData.subEmotion,
    intensity: entryData.intensity,
    entry: entryData.entry,
    perception: entryData.perception,
    coping: entryData.coping,
    action: entryData.action,
    tags: [...entryData.tags],
    timestamp: new Date().toISOString(),
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
      // Check if max actions (3) for Binah have been reached
      const dailyData = dailySnap.data();
      if (dailyData.binah?.actions >= 3) {
        showNotification(
          "Достигнуто максимальное количество действий для Бины сегодня.",
          "warning"
        );
        return {
          success: false,
          message: "Max daily actions for Binah reached",
        };
      }
    }

    // Save the Emotion Barometer entry
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      await updateDoc(userRef, {
        entries: arrayUnion(newEntry),
        lastUpdated: new Date().toISOString(),
      });
    } else {
      await setDoc(userRef, {
        entries: [newEntry],
        lastUpdated: new Date().toISOString(),
      });
    }

    // Update Sefirot progress (add 10 points to Binah)
    await updateDoc(progressRef, {
      "binah.points": increment(10),
      "binah.lastActive": new Date(),
    });

    // Update daily actions (add 1 action to Binah)
    await updateDoc(dailyRef, {
      "binah.actions": increment(1),
    });

    showNotification(
      "Запись успешно сохранена и прогресс обновлен!",
      "success"
    );
    return {
      success: true,
      message: "Entry saved and progress updated successfully",
    };
  } catch (error) {
    console.error("Error saving entry or updating progress:", error);
    showNotification(
      "Ошибка сохранения записи или обновления прогресса. Пожалуйста, попробуйте еще раз.",
      "error"
    );
    return {
      success: false,
      message: "Failed to save entry or update progress",
    };
  }
};

// Calculate emotion barometer statistics (unchanged)
export const getEmotionBarometerStats = async (firestore, userId) => {
  const barometerRef = doc(firestore, "emotion_barometer", userId);

  try {
    const docSnap = await getDoc(barometerRef);

    if (!docSnap.exists()) {
      return {
        success: true,
        stats: {
          totalEntries: 0,
          mostCommonEmotion: "Нет данных",
          averageIntensity: 0,
          mostCommonTag: "Нет данных",
          emotionDistribution: {},
        },
      };
    }

    const data = docSnap.data();
    const entries = data.entries || [];

    if (entries.length === 0) {
      return {
        success: true,
        stats: {
          totalEntries: 0,
          mostCommonEmotion: "Нет данных",
          averageIntensity: 0,
          mostCommonTag: "Нет данных",
          emotionDistribution: {},
        },
      };
    }

    const emotionCounts = {};
    const tagCounts = {};
    let totalIntensity = 0;

    entries.forEach((entry) => {
      const intensity = parseFloat(entry.intensity) || 0;
      totalIntensity += intensity;
      emotionCounts[entry.emotion] = (emotionCounts[entry.emotion] || 0) + 1;
      (entry.tags || []).forEach((tag) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });

    const mostCommonEmotion = Object.entries(emotionCounts).sort(
      (a, b) => b[1] - a[1]
    )[0]?.[0];
    const mostCommonTag = Object.entries(tagCounts).sort(
      (a, b) => b[1] - a[1]
    )[0]?.[0];
    const averageIntensity =
      entries.length > 0 ? totalIntensity / entries.length : 0;

    return {
      success: true,
      stats: {
        totalEntries: entries.length,
        mostCommonEmotion: mostCommonEmotion || "Нет данных",
        averageIntensity: Number(averageIntensity.toFixed(2)),
        mostCommonTag: mostCommonTag || "Нет данных",
        emotionDistribution: emotionCounts,
      },
    };
  } catch (error) {
    console.error("Error fetching emotion barometer stats:", error);
    return {
      success: false,
      message: "Error fetching emotion barometer stats",
    };
  }
};
