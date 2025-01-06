// api/firebase/emotionBarometer.js
import { doc, getDoc } from "firebase/firestore";

// New function to calculate emotion barometer statistics
export const getEmotionBarometerStats = async (firestore, userId) => {
  const barometerRef = doc(firestore, "emotion_barometer", userId);

  try {
    const docSnap = await getDoc(barometerRef);

    // If the document doesn't exist, return default values
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

    // If there are no entries, return default values
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

    // Initialize counts and totals
    const emotionCounts = {};
    const tagCounts = {};
    let totalIntensity = 0;

    entries.forEach((entry) => {
      // Validate intensity
      const intensity = parseFloat(entry.intensity) || 0;
      totalIntensity += intensity;

      // Count emotions
      emotionCounts[entry.emotion] = (emotionCounts[entry.emotion] || 0) + 1;

      // Count tags
      (entry.tags || []).forEach((tag) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });

    // Find the most common emotion and tag
    const mostCommonEmotion = Object.entries(emotionCounts).sort(
      (a, b) => b[1] - a[1]
    )[0]?.[0];
    const mostCommonTag = Object.entries(tagCounts).sort(
      (a, b) => b[1] - a[1]
    )[0]?.[0];

    // Calculate average intensity
    const averageIntensity =
      entries.length > 0 ? totalIntensity / entries.length : 0;

    return {
      success: true,
      stats: {
        totalEntries: entries.length,
        mostCommonEmotion: mostCommonEmotion || "Нет данных",
        averageIntensity: Number(averageIntensity.toFixed(2)), // Round to 2 decimal places
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

// Fetch user emotion data from `emotion_barometer` document
export const getEmotionBarometerData = async (firestore, userId) => {
  try {
    const userRef = doc(firestore, "emotion_barometer", userId);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        success: true,
        data: data.entries || [], // Return entries or an empty array
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
