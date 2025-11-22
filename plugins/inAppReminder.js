import mitt from "mitt";
import { getEmotionBarometerData } from "~/api/firebase/emotionBarometer";

export default defineNuxtPlugin((nuxtApp) => {
  const emitter = mitt();
  const REMINDER_TIME = "00:00"; // Adjust as needed
  let notificationVisible = false;

  const firestore = nuxtApp.$firestore;
  const getUserId = nuxtApp.$userId;

  // Emotional Compass: Get last entry date
  const getLastEntryDate = async () => {
    const userId = getUserId();
    if (!firestore || !userId) {
      console.warn("Firestore или userId недоступны");
      return null;
    }
    const response = await getEmotionBarometerData(firestore, userId);
    if (response.success && response.data.lastUpdated) {
      return new Date(response.data.lastUpdated);
    }
    return null;
  };

  // Check if reminder should be shown
  const shouldRemind = async () => {
    if (notificationVisible || !getUserId()) return false;
    const now = new Date();
    const today = now.toDateString();
    const [hours, minutes] = REMINDER_TIME.split(":");
    const reminderDate = new Date();
    reminderDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);

    if (now < reminderDate) return false;

    const lastEntryDate = await getLastEntryDate();
    return !lastEntryDate || lastEntryDate.toDateString() !== today;
  };

  // Show reminder for Emotional Compass
  const showReminder = async () => {
    if (await shouldRemind()) {
      notificationVisible = true;
      emitter.emit("showNotification", {
        routePath: "/lab/experiments/emotional-compass",
        message:
          "Не забудь добавить запись в Эмоциональный компас сегодня! Отслеживай свои эмоции и оставайся в гармонии.",
        ctaText: "Добавить запись",
      });
    }
  };

  const markEntryAdded = () => {
    notificationVisible = false;
    // Optionally emit an event to clear the notification
    emitter.emit("clearNotification", { type: "emotion" });
  };

  nuxtApp.hook("app:mounted", () => {
    showReminder();
    setInterval(showReminder, 5 * 60 * 1000); // Check every 5 minutes
  });

  return {
    provide: {
      remind: showReminder,
      markEntry: markEntryAdded,
      emitter,
    },
  };
});
