import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    arrayUnion,
    Timestamp,
} from "firebase/firestore";

// Save a reflection entry
export const saveReflectionEntry = async (firestore, userId, entryData) => {
    if (!userId) {
        return { success: false, message: "User ID is required" };
    }

    const userRef = doc(firestore, "deep_conversation_journal", userId);

    const newEntry = {
        id: Date.now().toString(),
        cardId: entryData.cardId,
        cardTitle: entryData.cardTitle,
        question: entryData.question,
        reflection: entryData.reflection,
        timestamp: new Date().toISOString(),
        date: new Date().toISOString().split("T")[0],
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
                createdAt: new Date().toISOString(),
                lastUpdated: new Date().toISOString(),
            });
        }

        return {
            success: true,
            message: "Reflection saved successfully",
            entry: newEntry,
        };
    } catch (error) {
        console.error("Error saving reflection:", error);
        return {
            success: false,
            message: "Failed to save reflection",
            error: error.message,
        };
    }
};

// Get user's reflections
export const getUserReflections = async (firestore, userId) => {
    if (!userId) return { success: false, message: "User ID is required" };

    try {
        const userRef = doc(firestore, "deep_conversation_journal", userId);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
            return {
                success: true,
                data: docSnap.data().entries || [],
            };
        } else {
            return {
                success: true,
                data: [],
            };
        }
    } catch (error) {
        console.error("Error fetching reflections:", error);
        return {
            success: false,
            message: "Failed to fetch reflections",
            error: error.message,
        };
    }
};
