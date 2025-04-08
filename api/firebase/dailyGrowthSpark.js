import {
  doc,
  getDoc,
  updateDoc,
  setDoc,
  arrayUnion,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

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
        success: true,
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

// Save a new Daily Growth Spark entry and shared insight
export const saveDailyGrowthSparkEntry = async (
  firestore,
  userId,
  entryData,
  showNotification
) => {
  if (!userId) {
    console.error("User ID is required");
    return { success: false, message: "User ID is required" };
  }

  const userRef = doc(firestore, "daily_growth_spark", userId);
  const currentDate = new Date().toISOString().split("T")[0];

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

      if (lastUpdated === yesterdayDate) {
        updatedStreak = (data.streakDays || 0) + 1;
      } else if (lastUpdated !== currentDate) {
        updatedStreak = 1;
      } else {
        updatedStreak = data.streakDays || 1;
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

    if (entryData.insight && entryData.insight.text.trim() !== "") {
      const insightData = {
        text: entryData.insight.text,
        category: entryData.insight.category,
        isAnonymous: entryData.insight.isAnonymous,
        userId: userId,
        displayName: entryData.insight.isAnonymous
          ? null
          : entryData.insight.displayName || "Unknown",
        timestamp: new Date().toISOString(),
        date: currentDate,
      };
      console.log(entryData, "insightData");

      await addDoc(collection(firestore, "shared_insights"), insightData);
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

// Fetch shared insights for display
export const getSharedInsights = async (firestore, fetchLimit = 20) => {
  try {
    if (typeof limit !== "function") {
      throw new Error(
        "Firestore 'limit' function is not available. Check your Firebase SDK imports."
      );
    }
    const insightsCollection = collection(firestore, "shared_insights");
    const q = query(
      insightsCollection,
      orderBy("timestamp", "desc"),
      limit(fetchLimit)
    );
    const querySnapshot = await getDocs(q);
    const insights = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return {
      success: true,
      data: insights,
    };
  } catch (error) {
    console.error("Error fetching shared insights:", error);
    return {
      success: false,
      message: "Failed to fetch shared insights",
    };
  }
};

// Fetch statistics for Daily Growth Spark
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
