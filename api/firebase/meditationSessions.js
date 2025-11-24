import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

/**
 * Get meditation data for a user
 * @param {object} firestore - Firestore instance
 * @param {string} userId - User ID
 * @returns {Promise<Object>} Meditation data
 */
export async function getMeditationData(firestore, userId) {
    if (!firestore || !userId) return null;

    try {
        const docRef = doc(firestore, 'meditation_sessions', userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            // Initialize new user data
            const initialData = {
                userId,
                totalSessions: 0,
                totalMinutes: 0,
                currentStreak: 0,
                lastSessionDate: null,
                dailyMinutes: {},
                createdAt: serverTimestamp(),
            };
            await setDoc(docRef, initialData);
            return initialData;
        }
    } catch (error) {
        console.error('Error getting meditation data:', error);
        return null;
    }
}

/**
 * Save a completed meditation session
 * @param {object} firestore - Firestore instance
 * @param {string} userId - User ID
 * @param {number} minutes - Session duration in minutes
 * @returns {Promise<boolean>} Success status
 */
export async function saveMeditationSession(firestore, userId, minutes) {
    if (!firestore || !userId || minutes <= 0) return false;

    try {
        const docRef = doc(firestore, 'meditation_sessions', userId);
        const docSnap = await getDoc(docRef);

        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        const now = new Date();

        if (docSnap.exists()) {
            const data = docSnap.data();
            const dailyMinutes = data.dailyMinutes || {};

            // Add today's minutes
            dailyMinutes[today] = (dailyMinutes[today] || 0) + minutes;

            // Calculate streak
            let newStreak = data.currentStreak || 0;
            const lastSessionDate = data.lastSessionDate?.toDate();

            if (lastSessionDate) {
                const lastDate = new Date(lastSessionDate.toISOString().split('T')[0]);
                const todayDate = new Date(today);
                const diffDays = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));

                if (diffDays === 0) {
                    // Same day, keep streak
                } else if (diffDays === 1) {
                    // Consecutive day, increment streak
                    newStreak++;
                } else {
                    // Streak broken, reset to 1
                    newStreak = 1;
                }
            } else {
                // First session
                newStreak = 1;
            }

            // Update document
            await updateDoc(docRef, {
                totalSessions: (data.totalSessions || 0) + 1,
                totalMinutes: (data.totalMinutes || 0) + minutes,
                currentStreak: newStreak,
                lastSessionDate: serverTimestamp(),
                dailyMinutes,
                updatedAt: serverTimestamp(),
            });
        } else {
            // Create new document
            await setDoc(docRef, {
                userId,
                totalSessions: 1,
                totalMinutes: minutes,
                currentStreak: 1,
                lastSessionDate: serverTimestamp(),
                dailyMinutes: { [today]: minutes },
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });
        }

        return true;
    } catch (error) {
        console.error('Error saving meditation session:', error);
        return false;
    }
}

/**
 * Get weekly progress (last 7 days)
 * @param {object} firestore - Firestore instance
 * @param {string} userId - User ID
 * @returns {Promise<Array>} Array of {day, minutes} for last 7 days
 */
export async function getWeeklyProgress(firestore, userId) {
    if (!firestore || !userId) return [];

    try {
        const data = await getMeditationData(firestore, userId);
        if (!data) return [];

        const dailyMinutes = data.dailyMinutes || {};
        const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
        const today = new Date();
        const progress = [];

        // Get last 7 days
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
            const dayIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Convert to Mon=0, Sun=6

            progress.push({
                day: weekDays[dayIndex],
                minutes: dailyMinutes[dateStr] || 0,
                date: dateStr,
            });
        }

        return progress;
    } catch (error) {
        console.error('Error getting weekly progress:', error);
        return [];
    }
}
