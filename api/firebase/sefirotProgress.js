import { useFirestore } from "~/plugins/firebase";
import {
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  updateDoc,
  increment,
} from "firebase/firestore";

// Initialize Firestore
const firestore = useFirestore();

// Initialize progress data for a user
export const initializeSefirotProgress = async (userId, sefirot) => {
  const progressRef = doc(firestore, `users/${userId}/progress/sefirot`);
  const initialData = sefirot.reduce(
    (acc, s) => ({
      ...acc,
      [s.id]: { points: 0, lastActive: new Date() },
    }),
    {}
  );
  await setDoc(progressRef, initialData);
  return initialData;
};

// Initialize daily actions for a user
export const initializeDailyActions = async (userId, date, sefirot) => {
  const dailyRef = doc(firestore, `users/${userId}/daily/${date}`);
  const initialData = sefirot.reduce(
    (acc, s) => ({
      ...acc,
      [s.id]: { actions: 0 },
    }),
    {}
  );
  await setDoc(dailyRef, initialData);
  return initialData;
};

// Log an action for a sefirah
export const logAction = async (userId, sefirahId) => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const progressRef = doc(firestore, `users/${userId}/progress/sefirot`);
    const dailyRef = doc(firestore, `users/${userId}/daily/${today}`);

    // Check if daily actions exist
    const dailySnap = await getDoc(dailyRef);
    if (!dailySnap.exists()) {
      await initializeDailyActions(userId, today, sefirot);
    } else {
      // Check if max actions (3) reached
      const dailyData = dailySnap.data();
      if (dailyData[sefirahId]?.actions >= 3) {
        console.log("Max daily actions reached for", sefirahId);
        return;
      }
    }

    // Update progress (add 10 points)
    await updateDoc(progressRef, {
      [`${sefirahId}.points`]: increment(10),
      [`${sefirahId}.lastActive`]: new Date(),
    });

    // Update daily actions (add 1 action)
    await updateDoc(dailyRef, {
      [`${sefirahId}.actions`]: increment(1),
    });
  } catch (error) {
    console.error("Error logging action:", error);
  }
};

// Fetch user progress from Firebase
export const fetchSefirotProgress = async (
  userId,
  sefirot,
  applyDecay,
  calculateLevel,
  calculateDailyProgress
) => {
  try {
    // Get progress data
    const progressRef = doc(firestore, `users/${userId}/progress/sefirot`);
    const progressSnap = await getDoc(progressRef);

    if (!progressSnap.exists()) {
      await initializeSefirotProgress(userId, sefirot);
    } else {
      const progressData = progressSnap.data();
      sefirot.forEach((sefirah) => {
        if (progressData[sefirah.id]) {
          const points = applyDecay(
            progressData[sefirah.id].points || 0,
            progressData[sefirah.id].lastActive
          );
          const level = calculateLevel(points);
          sefirah.points = points;
          sefirah.level = level;
          sefirah.lastActive = progressData[sefirah.id].lastActive;
        }
      });
    }

    // Get daily actions
    const today = new Date().toISOString().split("T")[0];
    const dailyRef = doc(firestore, `users/${userId}/daily/${today}`);
    const dailySnap = await getDoc(dailyRef);

    if (!dailySnap.exists()) {
      await initializeDailyActions(userId, today, sefirot);
    } else {
      const dailyData = dailySnap.data();
      sefirot.forEach((sefirah) => {
        sefirah.dailyActions = dailyData[sefirah.id]?.actions || 0;
        sefirah.displayProgress = calculateDailyProgress(
          sefirah.dailyActions,
          sefirah.maxActions
        );
      });
    }

    // Set up real-time listener for progress updates
    onSnapshot(progressRef, (snap) => {
      if (snap.exists()) {
        const progressData = snap.data();
        sefirot.forEach((sefirah) => {
          if (progressData[sefirah.id]) {
            const points = applyDecay(
              progressData[sefirah.id].points || 0,
              progressData[sefirah.id].lastActive
            );
            const level = calculateLevel(points);
            sefirah.points = points;
            sefirah.level = level;
            sefirah.lastActive = progressData[sefirah.id].lastActive;
          }
        });
      }
    });

    // Set up real-time listener for daily actions
    onSnapshot(dailyRef, (snap) => {
      if (snap.exists()) {
        const dailyData = snap.data();
        sefirot.forEach((sefirah) => {
          sefirah.dailyActions = dailyData[sefirah.id]?.actions || 0;
          sefirah.displayProgress = calculateDailyProgress(
            sefirah.dailyActions,
            sefirah.maxActions
          );
        });
      } else {
        // If no data for today, reset daily actions
        sefirot.forEach((sefirah) => {
          sefirah.dailyActions = 0;
          sefirah.displayProgress = 0;
        });
      }
    });
  } catch (error) {
    console.error("Error fetching Sefirot progress:", error);
    sefirot.forEach((s) => {
      s.points = 0;
      s.dailyActions = 0;
      s.displayProgress = 0;
      s.level = 1;
    });
  }
};
