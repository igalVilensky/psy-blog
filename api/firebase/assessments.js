// api/firebase/assessments.js
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  setDoc,
  orderBy,
  limit,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

// Submit a new assessment
// export const submitAssessment = async (firestore, userId, answers, scores) => {
//   try {
//     const resultData = {
//       userId,
//       timestamp: serverTimestamp(),
//       answers,
//       scores,
//       status: "completed",
//     };

//     const docRef = await addDoc(
//       collection(firestore, "archetypeResults"),
//       resultData
//     );
//     return {
//       success: true,
//       assessmentId: docRef.id,
//       message: "Assessment submitted successfully",
//     };
//   } catch (error) {
//     console.error("Error submitting assessment:", error);
//     return {
//       success: false,
//       message: "Failed to submit assessment",
//     };
//   }
// };

export const submitAssessment = async (firestore, userId, answers, scores) => {
  try {
    const resultData = {
      userId: userId || null, // Store userId if available, otherwise store null
      sessionId: !userId ? generateSessionId() : null, // Generate a session ID for anonymous users
      timestamp: serverTimestamp(),
      answers,
      scores,
      status: "completed",
    };

    const docRef = await addDoc(
      collection(firestore, "archetypeResults"),
      resultData
    );
    return {
      success: true,
      assessmentId: docRef.id,
      message: "Assessment submitted successfully",
    };
  } catch (error) {
    console.error("Error submitting assessment:", error);
    return {
      success: false,
      message: "Failed to submit assessment",
    };
  }
};

// Function to generate a session ID for anonymous users
const generateSessionId = () => {
  return `anon-${Math.random().toString(36).substr(2, 9)}`;
};

// Get all assessments for a user
export const getUserAssessments = async (firestore, userId) => {
  try {
    const q = query(
      collection(firestore, "archetypeResults"),
      where("userId", "==", userId)
    );

    const querySnapshot = await getDocs(q);
    const assessments = [];

    querySnapshot.forEach((doc) => {
      assessments.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return {
      success: true,
      assessments,
    };
  } catch (error) {
    console.error("Error fetching user assessments:", error);
    return {
      success: false,
      message: "Failed to fetch assessments",
    };
  }
};

// Get a specific assessment
export const getAssessment = async (firestore, assessmentId) => {
  try {
    const docRef = doc(firestore, "archetypeResults", assessmentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        success: true,
        assessment: {
          id: docSnap.id,
          ...docSnap.data(),
        },
      };
    }

    return {
      success: false,
      message: "Assessment not found",
    };
  } catch (error) {
    console.error("Error fetching assessment:", error);
    return {
      success: false,
      message: "Failed to fetch assessment",
    };
  }
};

// Get latest assessment for a user
export const getLatestUserAssessment = async (firestore, userId) => {
  try {
    const q = query(
      collection(firestore, "archetypeResults"),
      where("userId", "==", userId),
      orderBy("timestamp", "desc"),
      limit(1)
    );

    const querySnapshot = await getDocs(q);
    const doc = querySnapshot.docs[0];

    if (doc) {
      return {
        success: true,
        assessment: {
          id: doc.id,
          ...doc.data(),
        },
      };
    }

    return {
      success: false,
      message: "No assessments found",
    };
  } catch (error) {
    console.error("Error fetching latest assessment:", error);
    return {
      success: false,
      message: "Failed to fetch latest assessment",
    };
  }
};

// Save assessment progress
export const saveAssessmentProgress = async (firestore, userId, progress) => {
  try {
    // Instead of nested path, use the top-level collection with userId as document ID
    const docRef = doc(firestore, "assessmentProgress", userId);

    await setDoc(docRef, {
      ...progress,
      lastUpdated: serverTimestamp(),
      // Add userId to the document data for additional security
      userId: userId,
    });

    return {
      success: true,
      message: "Progress saved successfully",
    };
  } catch (error) {
    console.error("Error saving progress:", error);
    return {
      success: false,
      message: "Failed to save progress",
    };
  }
};
