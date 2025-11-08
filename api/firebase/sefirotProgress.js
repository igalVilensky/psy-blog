// ~/utils/firestoreProgress.js
import {
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  updateDoc,
  increment,
} from "firebase/firestore";
import { useFirestore } from "~/plugins/firebase";

/**
 * Helper to get Firestore only on the client
 */
const getClientFirestore = () => {
  if (!process.client) return null;
  return useFirestore();
};

/**
 * Initialize Sefirot progress for a user
 */
export const initializeSefirotProgress = async (userId, sefirot) => {
  const firestore = getClientFirestore();
  if (!firestore) return; // SSR-safe

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

/**
 * Initialize daily actions for a user
 */
export const initializeDailyActions = async (userId, date, sefirot) => {
  const firestore = getClientFirestore();
  if (!firestore) return; // SSR-safe

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

/**
 * Log an action for a Sefirah
 */
export const logAction = async (userId, sefirahId, sefirot) => {
  const firestore = getClientFirestore();
  if (!firestore) return; // SSR-safe

  try {
    const today = new Date().toISOString().split("T")[0];
    const progressRef = doc(firestore, `users/${userId}/progress/sefirot`);
    const dailyRef = doc(firestore, `users/${userId}/daily/${today}`);

    const dailySnap = await getDoc(dailyRef);
    if (!dailySnap.exists()) {
      await initializeDailyActions(userId, today, sefirot);
    } else {
      const dailyData = dailySnap.data();
      if (dailyData[sefirahId]?.actions >= 3) {
        console.log("Max daily actions reached for", sefirahId);
        return;
      }
    }

    await updateDoc(progressRef, {
      [`${sefirahId}.points`]: increment(10),
      [`${sefirahId}.lastActive`]: new Date(),
    });

    await updateDoc(dailyRef, {
      [`${sefirahId}.actions`]: increment(1),
    });
  } catch (error) {
    console.error("Error logging action:", error);
  }
};

/**
 * Fetch Sefirot progress for a user
 * Supports SSR-safe defaults and client-only listeners
 */
export const fetchSefirotProgress = async (
  userId,
  sefirot,
  applyDecay,
  calculateLevel,
  calculateDailyProgress
) => {
  // Default data for SSR
  if (!process.client) {
    return sefirot.map((s) => ({
      ...s,
      points: 0,
      level: 1,
      dailyActions: 0,
      displayProgress: 0,
    }));
  }

  const firestore = getClientFirestore();
  if (!firestore) return [];

  try {
    const progressRef = doc(firestore, `users/${userId}/progress/sefirot`);
    const dailyRef = doc(
      firestore,
      `users/${userId}/daily/${new Date().toISOString().split("T")[0]}`
    );

    // Fetch progress data
    const progressSnap = await getDoc(progressRef);
    if (!progressSnap.exists()) {
      await initializeSefirotProgress(userId, sefirot);
    } else {
      const progressData = progressSnap.data();
      sefirot.forEach((s) => {
        if (progressData[s.id]) {
          const points = applyDecay(
            progressData[s.id].points || 0,
            progressData[s.id].lastActive
          );
          const level = calculateLevel(points);
          s.points = points;
          s.level = level;
          s.lastActive = progressData[s.id].lastActive;
        }
      });
    }

    // Fetch daily actions
    const dailySnap = await getDoc(dailyRef);
    if (!dailySnap.exists()) {
      await initializeDailyActions(
        userId,
        new Date().toISOString().split("T")[0],
        sefirot
      );
    } else {
      const dailyData = dailySnap.data();
      sefirot.forEach((s) => {
        s.dailyActions = dailyData[s.id]?.actions || 0;
        s.displayProgress = calculateDailyProgress(
          s.dailyActions,
          s.maxActions
        );
      });
    }

    // Set up real-time listeners
    onSnapshot(progressRef, (snap) => {
      if (!snap.exists()) return;
      const data = snap.data();
      sefirot.forEach((s) => {
        if (data[s.id]) {
          const points = applyDecay(
            data[s.id].points || 0,
            data[s.id].lastActive
          );
          const level = calculateLevel(points);
          s.points = points;
          s.level = level;
          s.lastActive = data[s.id].lastActive;
        }
      });
    });

    onSnapshot(dailyRef, (snap) => {
      sefirot.forEach((s) => {
        s.dailyActions = 0;
        s.displayProgress = 0;
      });
      if (!snap.exists()) return;
      const data = snap.data();
      sefirot.forEach((s) => {
        s.dailyActions = data[s.id]?.actions || 0;
        s.displayProgress = calculateDailyProgress(
          s.dailyActions,
          s.maxActions
        );
      });
    });

    return sefirot;
  } catch (error) {
    console.error("Error fetching Sefirot progress:", error);
    return sefirot.map((s) => ({
      ...s,
      points: 0,
      level: 1,
      dailyActions: 0,
      displayProgress: 0,
    }));
  }
};
