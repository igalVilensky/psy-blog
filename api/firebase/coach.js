// api/firebase/coach.js
import {
    getFirestore,
    collection,
    query,
    where,
    getDocs,
    doc,
    getDoc,
    addDoc,
    serverTimestamp,
    orderBy,
    limit
} from "firebase/firestore";

/**
 * Fetch all clients assigned to a specific coach
 */
export const getCoachClients = async (coachId) => {
    const db = getFirestore();
    try {
        const clientsRef = collection(db, "users");
        const q = query(clientsRef, where("coachId", "==", coachId));
        const snapshot = await getDocs(q);

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            // Add a default status if not present
            status: doc.data().status || 'active'
        }));
    } catch (error) {
        console.error("Error fetching coach clients:", error);
        return [];
    }
};

/**
 * Fetch full profile of a client, including their assessment results
 */
export const getCoachClientDetails = async (clientId) => {
    const db = getFirestore();
    try {
        const userRef = doc(db, "users", clientId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const data = userSnap.data();
            return { id: userSnap.id, ...data };
        }
        return null;
    } catch (error) {
        console.error("Error fetching client details:", error);
        return null;
    }
};

/**
 * Add a private note for a client (visible only to coach)
 */
export const addCoachNote = async (coachId, clientId, content) => {
    const db = getFirestore();
    try {
        const notesRef = collection(db, "coachNotes");
        const docRef = await addDoc(notesRef, {
            coachId,
            clientId,
            content,
            createdAt: serverTimestamp()
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Error adding coach note:", error);
        return { success: false, error };
    }
};

/**
 * Fetch all notes for a specific client added by this coach
 */
export const getCoachNotes = async (coachId, clientId) => {
    const db = getFirestore();
    try {
        const notesRef = collection(db, "coachNotes");
        const q = query(
            notesRef,
            where("coachId", "==", coachId),
            where("clientId", "==", clientId),
            orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error("Error fetching coach notes:", error);
        return [];
    }
};

/**
 * Fetch training results from various sub-collections
 */
export const getClientTrainingResults = async (clientId) => {
    const db = getFirestore();
    const collectionsToFetch = [
        "targetTrackingResults",
        "mentalShiftResults",
        "patternDetectionResults",
        "stroopResults",
        "reactionResults",
        "anagramResults",
        "nbackTrainingResults",
        "doubleGameResults",
        "logicPairsResults",
        "digitSpanResults",
        "trailMakingResults",
        "ravenResults"
    ];

    try {
        const allResults = [];

        // Fetch from each collection in parallel
        const fetchPromises = collectionsToFetch.map(async (colName) => {
            const colRef = collection(db, `users/${clientId}/${colName}`);
            const q = query(colRef, orderBy("createdAt", "desc"), limit(10));
            const snap = await getDocs(q);
            return snap.docs.map(doc => {
                // Determine exercise identifier from collection name
                let exerciseType = colName;
                if (colName.endsWith('Results')) {
                    exerciseType = colName.replace('Results', '');
                }
                // Handle specific descriptive suffixes
                if (exerciseType.endsWith('Training')) {
                    exerciseType = exerciseType.replace('Training', '');
                }
                if (exerciseType.endsWith('Game')) {
                    exerciseType = exerciseType.replace('Game', '');
                }

                return {
                    id: doc.id,
                    exerciseType,
                    ...doc.data()
                };
            });
        });

        const resultsArray = await Promise.all(fetchPromises);
        resultsArray.forEach(results => allResults.push(...results));

        // Sort all results by date
        return allResults.sort((a, b) => {
            const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
            const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
            return dateB - dateA;
        });
    } catch (error) {
        console.error("Error fetching client training results:", error);
        return [];
    }
};

/**
 * Fetch emotion history from emotion_barometer
 */
export const getClientEmotionHistory = async (clientId) => {
    const db = getFirestore();
    try {
        const docRef = doc(db, "emotion_barometer", clientId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            return data.entries || [];
        }
        return [];
    } catch (error) {
        console.error("Error fetching client emotion history:", error);
        return [];
    }
};
