// plugins/inAppReminder.js
import mitt from "mitt";
import { getEmotionBarometerData } from "~/api/firebase/emotionBarometer";

export default defineNuxtPlugin((nuxtApp) => {
  const emitter = mitt();
  const REMINDER_TIME = "00:00";
  let notificationVisible = false;

  const firestore = nuxtApp.$firestore;
  const getUserId = nuxtApp.$userId;

  const getLastEntryDate = async () => {
    const userId = getUserId();
    if (!firestore || !userId) {
      console.warn("Firestore или userId недоступны");
      return null;
    }
    const response = await getEmotionBarometerData(firestore, userId);
    if (response.success && response.data.lastUpdated) {
      return new Date(response.data.lastUpdated); // Используем lastUpdated
    }
    return null;
  };

  const shouldRemind = async () => {
    if (notificationVisible || !getUserId()) return false;
    const lastEntryDate = await getLastEntryDate();
    const now = new Date();
    const today = now.toDateString();
    const isTodayEntered =
      lastEntryDate && lastEntryDate.toDateString() === today;
    if (isTodayEntered) return false;

    const [hours, minutes] = REMINDER_TIME.split(":");
    const reminderDate = new Date();
    reminderDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    return now >= reminderDate;
  };

  const showReminder = async () => {
    if (await shouldRemind()) {
      notificationVisible = true;
      emitter.emit("showNotification", {
        routePath: "/awareness-tools/emotional-compass",
        message:
          "Не забудь добавить запись в Эмоциональный компас сегодня! Отслеживай свои эмоции и оставайся в гармонии.",
      });
    }
  };

  const markEntryAdded = () => {
    notificationVisible = false;
  };

  nuxtApp.hook("app:mounted", () => {
    showReminder();
    setInterval(showReminder, 5 * 60 * 1000);
  });

  return {
    provide: {
      remind: showReminder,
      markEntry: markEntryAdded,
      emitter,
    },
  };
});
