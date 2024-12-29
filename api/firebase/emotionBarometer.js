// api/firebase/emotionBarometer.js
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  addDoc,
  serverTimestamp,
  orderBy,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

// Submit a new emotion entry
export const submitEmotionEntry = async (firestore, userId, entryData) => {
  try {
    const emotionData = {
      userId,
      timestamp: serverTimestamp(),
      emotion: entryData.emotion,
      intensity: entryData.intensity,
      entry: entryData.entry,
      tags: entryData.tags,
      status: "completed",
    };

    const docRef = await addDoc(
      collection(firestore, "emotionBarometer"),
      emotionData
    );

    return {
      success: true,
      entryId: docRef.id,
      message: "Emotion entry saved successfully",
    };
  } catch (error) {
    console.error("Error submitting emotion entry:", error);
    return {
      success: false,
      message: "Failed to save emotion entry",
    };
  }
};

// Get all emotion entries for a user
export const getUserEmotionEntries = async (firestore, userId) => {
  try {
    const q = query(
      collection(firestore, "emotionBarometer"),
      where("userId", "==", userId),
      orderBy("timestamp", "desc")
    );

    const querySnapshot = await getDocs(q);
    const entries = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      entries.push({
        id: doc.id,
        ...data,
        timestamp: data.timestamp?.toDate(), // Convert timestamp to Date object
      });
    });

    return {
      success: true,
      entries,
    };
  } catch (error) {
    console.error("Error fetching emotion entries:", error);
    return {
      success: false,
      message: "Failed to fetch entries",
    };
  }
};

// Get a specific emotion entry
export const getEmotionEntry = async (firestore, entryId) => {
  try {
    const docRef = doc(firestore, "emotionBarometer", entryId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        success: true,
        entry: {
          id: docSnap.id,
          ...data,
          timestamp: data.timestamp?.toDate(),
        },
      };
    }

    return {
      success: false,
      message: "Entry not found",
    };
  } catch (error) {
    console.error("Error fetching emotion entry:", error);
    return {
      success: false,
      message: "Failed to fetch entry",
    };
  }
};

// Delete an emotion entry
export const deleteEmotionEntry = async (firestore, entryId) => {
  try {
    await deleteDoc(doc(firestore, "emotionBarometer", entryId));
    return {
      success: true,
      message: "Entry deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting emotion entry:", error);
    return {
      success: false,
      message: "Failed to delete entry",
    };
  }
};

// Update an emotion entry
export const updateEmotionEntry = async (firestore, entryId, updateData) => {
  try {
    const docRef = doc(firestore, "emotionBarometer", entryId);
    await updateDoc(docRef, {
      ...updateData,
      lastUpdated: serverTimestamp(),
    });

    return {
      success: true,
      message: "Entry updated successfully",
    };
  } catch (error) {
    console.error("Error updating emotion entry:", error);
    return {
      success: false,
      message: "Failed to update entry",
    };
  }
};
