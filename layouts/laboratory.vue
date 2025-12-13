<template>
  <div
    class="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white flex flex-col lg:grid lg:grid-cols-[280px_1fr] relative overflow-hidden transition-colors duration-500">
    <!-- Animated Background -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden z-0">


      <!-- Neural Network Grid -->
      <svg class="absolute inset-0 w-full h-full opacity-[0.03] dark:opacity-[0.015]"
        xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="neural-grid" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="50" cy="50" r="1" fill="currentColor" class="text-cyan-600 dark:text-cyan-400" />
            <line x1="50" y1="50" x2="150" y2="50" stroke="currentColor" stroke-width="0.5"
              class="text-cyan-600/30 dark:text-cyan-400/30" />
            <line x1="50" y1="50" x2="50" y2="150" stroke="currentColor" stroke-width="0.5"
              class="text-cyan-600/30 dark:text-cyan-400/30" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#neural-grid)" />
      </svg>
    </div>

    <!-- Laboratory Control Panel -->
    <LabControlPanel :user="auth.user" class="relative z-10" />

    <!-- Main Lab Workspace -->
    <main class="lab-workspace relative z-10 flex-1">
      <div class="workspace-container min-h-screen">
        <!-- Lab Header -->
        <div
          class="lab-header border-b border-cyan-500/10 dark:border-cyan-500/20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-20 transition-colors duration-500">
          <div class="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
            <div class="flex justify-between items-center">
              <div class="neural-activity flex items-center space-x-2 sm:space-x-4">
                <div class="flex items-center space-x-2">
                  <div
                    class="pulse-dot w-2 h-2 sm:w-3 sm:h-3 bg-emerald-500 dark:bg-emerald-400 rounded-full animate-pulse relative">
                    <div
                      class="absolute inset-0 w-2 h-2 sm:w-3 sm:h-3 bg-emerald-500/30 dark:bg-emerald-400/30 rounded-full animate-ping">
                    </div>
                  </div>
                  <span class="status-text text-xs sm:text-sm font-mono text-emerald-600 dark:text-emerald-300">СИСТЕМА:
                    АКТИВНА</span>
                </div>
                <div class="hidden md:flex items-center space-x-2">
                  <div class="w-2 h-2 bg-cyan-500 dark:bg-cyan-400 rounded-full"></div>
                  <span class="text-xs font-mono text-slate-500 dark:text-slate-400">
                    {{ currentTime }}
                  </span>
                </div>
              </div>
              <div class="user-station flex items-center space-x-3">
                <span
                  class="station-id text-[10px] sm:text-xs font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-cyan-500/20">
                  {{ currentStation }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <Notification v-if="notificationVisible" :message="notificationMessage" :type="notificationType"
          :route-path="notificationRoute" :cta-text="notificationCta" :duration="notificationDuration"
          :flow-id="notificationFlowId" :show-close-button="true" @close="hideNotification"
          @execute-flow="handleExecuteFlow" />
        <!-- Experiment Area -->
        <div class="experiment-area">
          <NuxtPage />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useAuthStore } from "~/stores/auth";
import { useThemeStore } from "~/stores/theme";
import { useScheduler } from "~/composables/useScheduler";
import { useNotification } from "~/composables/useNotification";
import Notification from "~/components/base/Notification.vue";

const auth = useAuthStore();
const themeStore = useThemeStore();
const { notificationMessage, notificationType, notificationVisible, notificationRoute, notificationCta, notificationDuration, notificationFlowId, showNotification, hideNotification } = useNotification();
const { checkSchedules } = useScheduler(showNotification);

const route = useRoute();

const currentTime = ref("");

const currentStation = computed(() => {
  const stationMap = {
    "/lab": "ГЛАВНЫЙ_КОНТРОЛЬ",
    "/lab/dashboard": "ЦЕНТР_УПРАВЛЕНИЯ",
    "/lab/growth": "ЭКСПЕРИМЕНТАЛЬНАЯ",
    "/lab/community": "СООБЩЕСТВО",
    "/profile": "ПРОФИЛЬ",
    "/lab/tests": "КОГНИТИВНЫЕ_ТЕСТЫ",
    "/lab/tests": "КОГНИТИВНЫЕ_ТЕСТЫ",
    "/lab/brain-training": "ТРЕНИРОВКА_МОЗГА",
    "/lab/brain-training/reaction": "ТЕСТ_РЕАКЦИИ",
    "/lab/brain-training/memory": "ТЕСТ_ПАМЯТИ",
    "/lab/brain-training/stroop": "Цветовой Струп",
    "/lab/psychology": "ПСИХОЛОГИЯ",

    "/lab/mindfulness": "МЕДИТАЦИЯ",


    "/lab/growth/wheel-of-life": "КОЛЕСО_БАЛАНСА",
  };
  return stationMap[route.path] || "ИССЛЕДОВАТЕЛЬСКАЯ_СТАНЦИЯ";
});

const updateTime = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  currentTime.value = `${hours}:${minutes}:${seconds}`;
};

let timeInterval;
let scheduleInterval;

const fetchAndCheckSchedules = async () => {
  if (!auth.user) return;

  try {
    const { $firestore } = useNuxtApp();
    const { collection, query, where, getDocs } = await import("firebase/firestore");

    const flowsRef = collection($firestore, "labFlows");
    const q = query(flowsRef, where("userId", "==", auth.user.uid));
    const snapshot = await getDocs(q);

    const flows = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    await checkSchedules(flows);
  } catch (error) {
    console.error("Error checking schedules:", error);
  }
};

const handleExecuteFlow = (flowId) => {
  // Emit a custom event that the builder page can listen to
  if (flowId) {
    window.dispatchEvent(new CustomEvent('execute-scheduled-flow', { detail: { flowId } }));
  }
};

onMounted(async () => {
  updateTime();
  timeInterval = setInterval(updateTime, 1000);

  // Initialize scheduler
  if (auth.user) {
    await fetchAndCheckSchedules();
    // Check schedules every minute
    scheduleInterval = setInterval(fetchAndCheckSchedules, 60000);
  }
});

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval);
  }
  if (scheduleInterval) {
    clearInterval(scheduleInterval);
  }
});
</script>

<style scoped>
@keyframes float {

  0%,
  100% {
    transform: translateY(0px) translateX(0px);
  }

  33% {
    transform: translateY(-20px) translateX(10px);
  }

  66% {
    transform: translateY(10px) translateX(-10px);
  }
}

@keyframes float-delayed {

  0%,
  100% {
    transform: translateY(0px) translateX(0px);
  }

  33% {
    transform: translateY(15px) translateX(-15px);
  }

  66% {
    transform: translateY(-10px) translateX(10px);
  }
}

.animate-float {
  animation: float 20s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 25s ease-in-out infinite;
  animation-delay: 2s;
}

.animate-pulse-slow {
  animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.lab-workspace {
  background: linear-gradient(to bottom,
      rgba(6, 182, 212, 0.05) 0%,
      transparent 100%);
}

.dark .lab-workspace {
  background: linear-gradient(to bottom,
      rgba(6, 182, 212, 0.02) 0%,
      transparent 100%);
}
</style>
