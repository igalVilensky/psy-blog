import { ref } from "vue";

export function useNotification() {
  const notificationMessage = ref("");
  const notificationType = ref("success");
  const notificationVisible = ref(false);
  const notificationRoute = ref(null);
  const notificationCta = ref("");
  const notificationDuration = ref(3000);
  const notificationFlowId = ref(null);

  const showNotification = (message, type = "success", options = {}) => {
    notificationMessage.value = message;
    notificationType.value = type;
    notificationVisible.value = true;

    // Handle options
    const duration = options.duration !== undefined ? options.duration : 3000;
    notificationRoute.value = options.routePath || null;
    notificationCta.value = options.ctaText || "";
    notificationDuration.value = duration;
    notificationFlowId.value = options.flowId || null;

    if (duration > 0) {
      setTimeout(() => {
        hideNotification();
      }, duration);
    }
  };

  const hideNotification = () => {
    notificationVisible.value = false;
    notificationMessage.value = "";
    notificationRoute.value = null;
    notificationCta.value = "";
    notificationDuration.value = 3000;
    notificationFlowId.value = null;
  };

  return {
    notificationMessage,
    notificationType,
    notificationVisible,
    notificationRoute,
    notificationCta,
    notificationDuration,
    notificationFlowId,
    showNotification,
    hideNotification,
  };
}
