<!-- components/Notification.vue -->
<template>
  <div>
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform opacity-0 translate-y-2"
      enter-to-class="transform opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform opacity-100"
      leave-to-class="transform opacity-0"
    >
      <div
        v-if="visible"
        :class="[
          'fixed px-4 py-3 rounded-lg shadow-lg border backdrop-blur-sm',
          positionClass,
          typeStyles[type].background,
          typeStyles[type].border,
          typeStyles[type].text,
          'z-50',
        ]"
        role="alert"
      >
        <div class="flex items-center gap-3 mb-3">
          <!-- Icon (for all notification types) -->
          <div
            v-if="typeStyles[type].icon"
            :class="['flex-shrink-0', typeStyles[type].iconColor]"
          >
            <i :class="[typeStyles[type].icon, 'text-xl']"></i>
          </div>

          <!-- Content -->
          <div class="flex-1 text-sm font-medium">
            <div v-if="title" class="font-bold mb-0.5">{{ title }}</div>
            <div>{{ message }}</div>
          </div>
        </div>

        <!-- Action Buttons (Now below the text) -->
        <div class="flex justify-end gap-2">
          <!-- CTA Button (for reminder type) -->
          <button
            v-if="type === 'reminder' && routePath"
            @click="goToRoute"
            class="flex-shrink-0 px-2 py-1 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors bg-transparent border-none focus:outline-none"
          >
            {{ ctaText || "Добавить запись" }}
          </button>

          <!-- Close Button -->
          <button
            @click="closeNotification"
            class="flex-shrink-0 px-2 py-1 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors bg-transparent border-none focus:outline-none"
          >
            Закрыть
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "success",
    validator: (value) =>
      ["success", "error", "warning", "info", "reminder"].includes(value),
  },
  routePath: {
    type: String,
    default: null, // Navigation path for reminder type
  },
  ctaText: {
    type: String,
    default: "Добавить запись", // Customizable CTA button text
  },
  duration: {
    type: Number,
    default: 0, // 0 means persistent, otherwise milliseconds
  },
});

const emit = defineEmits(["close"]);
const visible = ref(true);
const router = useRouter();
let autoCloseTimer = null;

// Type-specific styles - maintaining colorful backgrounds and icons for ALL types
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
  reminder: {
    background: "bg-white",
    border: "border-gray-300",
    text: "text-gray-800",
    icon: "fas fa-bell", // Added icon for reminder type
    iconColor: "text-blue-400",
  },
};

// Dynamic position based on type - preserving your original logic
const positionClass = computed(() => {
  if (props.type === "reminder") {
    return "bottom-4 left-1/2 -translate-x-1/2 w-[90%] sm:right-4 sm:top-20 sm:left-auto sm:translate-x-0 sm:w-[400px] sm:max-h-32";
  }
  // Original positioning logic: bottom on mobile, top-right on desktop
  return "bottom-4 left-1/2 -translate-x-1/2 w-[90%] sm:right-4 sm:top-20 sm:left-auto sm:translate-x-0 sm:w-[400px] sm:max-h-16";
});

// Close notification
const closeNotification = () => {
  visible.value = false;
  emit("close");
};

// Navigate to route (for reminder type)
const goToRoute = () => {
  if (props.routePath) {
    router.push(props.routePath);
    visible.value = false;
    emit("close");
  }
};

// Set up auto-close timer if duration is provided
onMounted(() => {
  if (props.duration > 0) {
    autoCloseTimer = setTimeout(() => {
      closeNotification();
    }, props.duration);
  }
});

// Clean up timer on unmount
onUnmounted(() => {
  if (autoCloseTimer) {
    clearTimeout(autoCloseTimer);
  }
});
</script>
