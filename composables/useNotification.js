import { ref } from "vue";

export function useNotification() {
  const notificationMessage = ref("");
  const notificationType = ref("success");
  const notificationVisible = ref(false);

  const showNotification = (message, type = "success", duration = 3000) => {
    notificationMessage.value = message;
    notificationType.value = type;
    notificationVisible.value = true;

    if (duration > 0) {
      setTimeout(() => {
        hideNotification();
      }, duration);
    }
  };

  const hideNotification = () => {
    notificationVisible.value = false;
    notificationMessage.value = "";
  };

  return {
    notificationMessage,
    notificationType,
    notificationVisible,
    showNotification,
    hideNotification,
  };
}
