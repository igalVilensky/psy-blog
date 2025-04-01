// api/firebase/dailyGrowthSpark.js
import { doc, getDoc, updateDoc, setDoc, arrayUnion } from "firebase/firestore";

// Fetch user's Daily Growth Spark data
export const getDailyGrowthSparkData = async (firestore, userId) => {
  try {
    const userRef = doc(firestore, "daily_growth_spark", userId);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        success: true,
        data: {
          entries: data.entries || [],
          streakDays: data.streakDays || 0,
          points: data.points || 0,
          lastUpdated: data.lastUpdated || null,
        },
      };
    } else {
      return {
        success: true, // Return success even if no data exists yet
        data: {
          entries: [],
          streakDays: 0,
          points: 0,
          lastUpdated: null,
        },
      };
    }
  } catch (error) {
    console.error("Error fetching daily growth spark data:", error);
    return {
      success: false,
      message: "Failed to fetch data",
    };
  }
};

// Save a new Daily Growth Spark entry
export const saveDailyGrowthSparkEntry = async (
  firestore,
  userId,
  entryData,
  showNotification // Callback for notifications
) => {
  if (!userId) {
    console.error("User ID is required");
    return { success: false, message: "User ID is required" };
  }

  const userRef = doc(firestore, "daily_growth_spark", userId);
  const currentDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format

  const newEntry = {
    date: new Date().toISOString(),
    gameResults: entryData.gameResults || { wins: 0 },
    energy: entryData.energy || { level: 5, fuelFactors: [] },
    insight: entryData.insight || null,
    timestamp: new Date().toISOString(),
  };

  try {
    const docSnap = await getDoc(userRef);
    let updatedStreak = 1;
    let updatedPoints = entryData.points || 0;

    if (docSnap.exists()) {
      const data = docSnap.data();
      const lastUpdated = data.lastUpdated
        ? data.lastUpdated.split("T")[0]
        : null;
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayDate = yesterday.toISOString().split("T")[0];

      // Calculate streak
      if (lastUpdated === yesterdayDate) {
        updatedStreak = (data.streakDays || 0) + 1;
      } else if (lastUpdated !== currentDate) {
        updatedStreak = 1; // Reset streak if not consecutive or same day
      } else {
        updatedStreak = data.streakDays || 1; // Same day, keep streak
      }

      updatedPoints += data.points || 0;

      await updateDoc(userRef, {
        entries: arrayUnion(newEntry),
        streakDays: updatedStreak,
        points: updatedPoints,
        lastUpdated: currentDate,
      });
    } else {
      await setDoc(userRef, {
        entries: [newEntry],
        streakDays: updatedStreak,
        points: updatedPoints,
        lastUpdated: currentDate,
      });
    }

    showNotification("Daily Growth Spark saved successfully!", "success");
    return {
      success: true,
      message: "Entry saved successfully",
      streakDays: updatedStreak,
      points: updatedPoints,
    };
  } catch (error) {
    console.error("Error saving daily growth spark entry:", error);
    showNotification("Failed to save entry. Please try again.", "error");
    return { success: false, message: "Failed to save entry" };
  }
};

// Fetch statistics for Daily Growth Spark (optional, for future use)
export const getDailyGrowthSparkStats = async (firestore, userId) => {
  try {
    const userRef = doc(firestore, "daily_growth_spark", userId);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      return {
        success: true,
        stats: {
          totalEntries: 0,
          totalPoints: 0,
          longestStreak: 0,
          averageEnergyLevel: 0,
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
          totalPoints: data.points || 0,
          longestStreak: data.streakDays || 0,
          averageEnergyLevel: 0,
        },
      };
    }

    const totalEnergy = entries.reduce(
      (sum, entry) => sum + (entry.energy.level || 0),
      0
    );
    const averageEnergyLevel =
      entries.length > 0 ? totalEnergy / entries.length : 0;

    return {
      success: true,
      stats: {
        totalEntries: entries.length,
        totalPoints: data.points || 0,
        longestStreak: data.streakDays || 0,
        averageEnergyLevel: Number(averageEnergyLevel.toFixed(2)),
      },
    };
  } catch (error) {
    console.error("Error fetching daily growth spark stats:", error);
    return {
      success: false,
      message: "Error fetching stats",
    };
  }
};
