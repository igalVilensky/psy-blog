<template>
  <Transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="transform opacity-0 translate-y-2"
    enter-to-class="transform opacity-100 translate-y-0"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="transform opacity-100 translate-y-0"
    leave-to-class="transform opacity-0 translate-y-2"
  >
    <div
      v-if="message"
      :class="[
        'fixed bottom-4 right-4 flex items-center gap-2 px-4 py-3 rounded-lg shadow-md',
        typeStyles[type].background,
        typeStyles[type].border,
        typeStyles[type].text,
      ]"
    >
      <i :class="[typeStyles[type].icon]"></i>
      {{ message }}
      <button
        @click="$emit('close')"
        class="ml-2 hover:opacity-70 transition-opacity"
      >
        <i class="fas fa-times"></i>
      </button>
    </div>
  </Transition>
</template>

<script setup>
const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "success",
    validator: (value) =>
      ["success", "error", "warning", "info"].includes(value),
  },
});

defineEmits(["close"]);

const typeStyles = {
  success: {
    background: "bg-green-100",
    border: "border border-green-300",
    text: "text-green-800",
    icon: "fas fa-check-circle",
  },
  error: {
    background: "bg-red-100",
    border: "border border-red-300",
    text: "text-red-800",
    icon: "fas fa-exclamation-circle",
  },
  warning: {
    background: "bg-yellow-100",
    border: "border border-yellow-300",
    text: "text-yellow-800",
    icon: "fas fa-exclamation-triangle",
  },
  info: {
    background: "bg-blue-100",
    border: "border border-blue-300",
    text: "text-blue-800",
    icon: "fas fa-info-circle",
  },
};

// In Notification.vue
onMounted(() => {
  console.log("Notification component mounted");
});
</script>
