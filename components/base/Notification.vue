<!-- components/Notification.vue -->
<template>
  <div>
    <transition enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform opacity-0 translate-y-2 scale-95"
      enter-to-class="transform opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-200 ease-in" leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95">
      <div v-if="visible" :class="[
        'fixed px-5 py-4 rounded-xl shadow-2xl border backdrop-blur-md',
        positionClass,
        typeStyles[type].background,
        typeStyles[type].border,
        typeStyles[type].text,
        'z-50',
      ]" role="alert">
        <div class="flex items-start gap-3">
          <!-- Icon -->
          <div v-if="typeStyles[type].icon" :class="['flex-shrink-0 mt-0.5', typeStyles[type].iconColor]">
            <i :class="[typeStyles[type].icon, 'text-xl']"></i>
          </div>

          <!-- Content -->
          <div class="flex-1 min-w-0">
            <div v-if="title" class="font-bold font-mono text-sm mb-1 tracking-wide uppercase">{{ title }}</div>
            <div class="text-sm leading-relaxed">{{ message }}</div>

            <!-- Action Buttons -->
            <div v-if="type === 'reminder' || showCloseButton" class="flex gap-3 mt-3">
              <!-- CTA Button (for reminder type) -->
              <button v-if="type === 'reminder' && routePath" @click="goToRoute"
                class="px-3 py-1.5 text-xs font-medium rounded-lg transition-all bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30">
                {{ ctaText || "Добавить запись" }}
              </button>

              <!-- Close Button -->
              <button v-if="showCloseButton" @click="closeNotification"
                class="px-3 py-1.5 text-xs font-medium rounded-lg transition-all bg-slate-700/50 hover:bg-slate-700 text-slate-300 border border-slate-600/50">
                Закрыть
              </button>
            </div>
          </div>

          <!-- Close Icon (always visible) -->
          <button @click="closeNotification" class="flex-shrink-0 text-slate-400 hover:text-white transition-colors">
            <i class="fas fa-times text-sm"></i>
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
    default: null,
  },
  ctaText: {
    type: String,
    default: "Добавить запись",
  },
  duration: {
    type: Number,
    default: 4000, // 4 seconds default
  },
  showCloseButton: {
    type: Boolean,
    default: false,
  },
  flowId: {
    type: String,
    default: null,
  },
});

const emit = defineEmits(["close", "execute-flow"]);
const visible = ref(true);
const router = useRouter();
let autoCloseTimer = null;

// Lab-themed styles with cyan/blue color scheme
const typeStyles = {
  success: {
    background: "bg-slate-900/95 dark:bg-slate-800/95",
    border: "border-cyan-500/30",
    text: "text-white",
    icon: "fas fa-check-circle",
    iconColor: "text-cyan-400",
  },
  error: {
    background: "bg-slate-900/95 dark:bg-slate-800/95",
    border: "border-red-500/30",
    text: "text-white",
    icon: "fas fa-exclamation-circle",
    iconColor: "text-red-400",
  },
  warning: {
    background: "bg-slate-900/95 dark:bg-slate-800/95",
    border: "border-yellow-500/30",
    text: "text-white",
    icon: "fas fa-exclamation-triangle",
    iconColor: "text-yellow-400",
  },
  info: {
    background: "bg-slate-900/95 dark:bg-slate-800/95",
    border: "border-blue-500/30",
    text: "text-white",
    icon: "fas fa-info-circle",
    iconColor: "text-blue-400",
  },
  reminder: {
    background: "bg-slate-900/95 dark:bg-slate-800/95",
    border: "border-purple-500/30",
    text: "text-white",
    icon: "fas fa-bell",
    iconColor: "text-purple-400",
  },
};

// Position: bottom-right on desktop, bottom-center on mobile
const positionClass = computed(() => {
  return "bottom-6 left-1/2 -translate-x-1/2 w-[90%] sm:right-6 sm:bottom-6 sm:left-auto sm:translate-x-0 sm:w-[420px]";
});

// Close notification
const closeNotification = () => {
  visible.value = false;
  emit("close");
};

// Navigate to route (for reminder type)
const goToRoute = () => {

  // If there's a flowId, emit execute-flow event instead of navigating
  if (props.flowId) {
    emit('execute-flow', props.flowId);
    visible.value = false;
    emit("close");
    return;
  }

  // Otherwise navigate to the route
  if (props.routePath) {
    // Force navigation even if already on the route
    router.push(props.routePath).catch(() => {
      // If already on route, force a reload by going away and back
      router.push('/space').then(() => {
        router.push(props.routePath);
      });
    });
    visible.value = false;
    emit("close");
  } else {
    console.warn('No routePath or flowId provided');
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
