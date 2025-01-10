<template>
  <div>
    <TransitionGroup
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform opacity-0 translate-y-2"
      enter-to-class="transform opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform opacity-100"
      leave-to-class="transform opacity-0"
    >
      <div
        v-if="show"
        :class="[
          'fixed flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border backdrop-blur-sm',
          'bottom-4 left-1/2 -translate-x-1/2 w-[90%]', // Mobile defaults
          'sm:right-4 sm:top-20 sm:left-auto sm:translate-x-0 sm:w-[400px] sm:max-h-16', // Reset mobile properties on desktop
          typeStyles[type].background,
          typeStyles[type].border,
          typeStyles[type].text,
          'z-50',
        ]"
      >
        <!-- Icon -->
        <div :class="['flex-shrink-0', typeStyles[type].iconColor]">
          <i :class="[typeStyles[type].icon, 'text-xl']"></i>
        </div>

        <!-- Content -->
        <div class="flex-1 text-sm font-medium">
          {{ message }}
        </div>

        <!-- Close button -->
        <button
          @click="closeNotification"
          class="flex-shrink-0 ml-4 hover:opacity-70 transition-opacity focus:outline-none"
          aria-label="Close notification"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
    </TransitionGroup>
  </div>
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
  duration: {
    type: Number,
    default: 5000,
  },
  show: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["close"]);

const typeStyles = {
  success: {
    background: "bg-green-500/10",
    border: "border-green-500/20",
    text: "text-green-400",
    icon: "fas fa-check-circle",
    iconColor: "text-green-400",
  },
  error: {
    background: "bg-red-500/10",
    border: "border-red-500/20",
    text: "text-red-400",
    icon: "fas fa-exclamation-circle",
    iconColor: "text-red-400",
  },
  warning: {
    background: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    text: "text-yellow-400",
    icon: "fas fa-exclamation-triangle",
    iconColor: "text-yellow-400",
  },
  info: {
    background: "bg-[#0EA5E9]/10",
    border: "border-[#0EA5E9]/20",
    text: "text-[#0EA5E9]",
    icon: "fas fa-info-circle",
    iconColor: "text-[#0EA5E9]",
  },
};

const closeNotification = () => {
  emit("close");
};

// Auto-close timer
onMounted(() => {
  if (props.duration > 0) {
    setTimeout(() => {
      emit("close");
    }, props.duration);
  }
});
</script>
