// api/firebase/emotionBarometer.js.js
import { doc, getDoc, updateDoc, setDoc, arrayUnion } from "firebase/firestore";

// Fetch user emotion data from `emotion_barometer` document
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
          lastUpdated: data.lastUpdated || null, // Возвращаем lastUpdated
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

// Save emotion entry to Firebase (перенос вашей функции в API)
export const saveEmotionBarometerEntry = async (
  firestore,
  userId,
  entryData,
  showNotification // Callback для уведомлений, переданный из компонента
) => {
  if (!userId) {
    console.error("User ID is required");
    return { success: false, message: "User ID is required" };
  }

  const userRef = doc(firestore, "emotion_barometer", userId);

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

    showNotification("Запись успешно сохранена!", "success");
    return { success: true, message: "Entry saved successfully" };
  } catch (error) {
    console.error("Error saving entry to Firebase:", error);
    showNotification(
      "Ошибка сохранения записи. Пожалуйста, попробуйте еще раз.",
      "error"
    );
    return { success: false, message: "Failed to save entry" };
  }
};

// New function to calculate emotion barometer statistics (без изменений)
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
