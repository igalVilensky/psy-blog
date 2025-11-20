import {
    doc,
    getDoc,
    updateDoc,
    setDoc,
    arrayUnion,
} from "firebase/firestore";

const LOCAL_STORAGE_KEY = "emotion_barometer_guest_data";

// Helper to get guest data
const getGuestData = () => {
    if (typeof window === "undefined") return { entries: [] };
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : { entries: [] };
};

// Helper to save guest data
const saveGuestData = (data) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
};

export const emotionBarometerService = {
    async saveEntry(db, user, entryData, showNotification) {
        const newEntry = {
            emotion: entryData.emotion,
            subEmotion: entryData.subEmotion,
            intensity: entryData.intensity,
            entry: entryData.entry,
            perception: entryData.perception,
            coping: entryData.coping,
            action: entryData.action,
            tags: [...entryData.tags],
            timestamp: new Date().toISOString(),
        };

        if (user) {
            // Firebase Logic
            try {
                const userRef = doc(db, "emotion_barometer", user.uid);
                const docSnap = await getDoc(userRef);

                if (docSnap.exists()) {
                    await updateDoc(userRef, {
                        entries: arrayUnion(newEntry),
                        lastUpdated: new Date().toISOString(),
                    });
                } else {
                    await setDoc(userRef, {
                        entries: [newEntry],
                        lastUpdated: new Date().toISOString(),
                    });
                }
                showNotification("Запись успешно сохранена!", "success");
                return { success: true };
            } catch (error) {
                console.error("Error saving to Firebase:", error);
                showNotification("Ошибка сохранения записи.", "error");
                return { success: false, message: error.message };
            }
        } else {
            // LocalStorage Logic
            try {
                const data = getGuestData();
                data.entries.push(newEntry);
                data.lastUpdated = new Date().toISOString();
                saveGuestData(data);
                showNotification("Запись сохранена (локально)!", "success");
                return { success: true };
            } catch (error) {
                console.error("Error saving to localStorage:", error);
                showNotification("Ошибка сохранения.", "error");
                return { success: false, message: error.message };
            }
        }
    },

    async getStats(db, user) {
        let entries = [];

        if (user) {
            try {
                const userRef = doc(db, "emotion_barometer", user.uid);
                const docSnap = await getDoc(userRef);
                if (docSnap.exists()) {
                    entries = docSnap.data().entries || [];
                }
            } catch (error) {
                console.error("Error fetching stats from Firebase:", error);
                return { success: false, message: "Failed to fetch stats" };
            }
        } else {
            const data = getGuestData();
            entries = data.entries || [];
        }

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

        const emotionCounts = {};
        const tagCounts = {};
        let totalIntensity = 0;

        entries.forEach((entry) => {
            const intensity = parseFloat(entry.intensity) || 0;
            totalIntensity += intensity;
            emotionCounts[entry.emotion] = (emotionCounts[entry.emotion] || 0) + 1;
            (entry.tags || []).forEach((tag) => {
                tagCounts[tag] = (tagCounts[tag] || 0) + 1;
            });
        });

        const mostCommonEmotion = Object.entries(emotionCounts).sort(
            (a, b) => b[1] - a[1]
        )[0]?.[0];
        const mostCommonTag = Object.entries(tagCounts).sort(
            (a, b) => b[1] - a[1]
        )[0]?.[0];
        const averageIntensity = totalIntensity / entries.length;

        return {
            success: true,
            stats: {
                totalEntries: entries.length,
                mostCommonEmotion: mostCommonEmotion || "Нет данных",
                averageIntensity: Number(averageIntensity.toFixed(2)),
                mostCommonTag: mostCommonTag || "Нет данных",
                emotionDistribution: emotionCounts,
            },
        };
    },

    async getHistory(db, user) {
        if (user) {
            try {
                const userRef = doc(db, "emotion_barometer", user.uid);
                const docSnap = await getDoc(userRef);
                if (docSnap.exists()) {
                    return {
                        success: true,
                        data: {
                            entries: docSnap.data().entries || [],
                        },
                    };
                }
                return { success: true, data: { entries: [] } };
            } catch (error) {
                console.error("Error fetching history from Firebase:", error);
                return { success: false, message: "Failed to fetch history" };
            }
        } else {
            const data = getGuestData();
            return {
                success: true,
                data: {
                    entries: data.entries || [],
                },
            };
        }
    },
};
