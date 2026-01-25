<template>
  <div
    class="min-h-screen bg-gradient-to-br from-zinc-50 to-white dark:from-black dark:to-zinc-950 text-zinc-900 dark:text-white flex">
    <!-- Sidebar -->
    <LabSidebar class="hidden lg:block fixed top-0 left-0 w-64 h-screen z-40" />

    <!-- Mobile Header -->
    <div
      class="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800 z-40 px-4 sm:px-6 flex items-center justify-between">
      <NuxtLink to="/" class="flex items-center gap-3 group">
        <div class="relative w-8 h-8">
          <img src="/mindqlab-logo.png" alt="MindQLab Logo"
            class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" />
        </div>
        <span
          class="font-bold text-zinc-900 dark:text-white text-sm group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">MindQLab</span>
      </NuxtLink>
      <button @click="isSidebarOpen = true"
        class="p-2 text-zinc-600 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
        <i class="fas fa-bars text-lg"></i>
      </button>
    </div>

    <!-- Mobile Sidebar Overlay -->
    <Transition name="fade">
      <div v-if="isSidebarOpen" @click="isSidebarOpen = false" class="lg:hidden fixed inset-0 bg-black/60 z-50">
      </div>
    </Transition>

    <!-- Mobile Sidebar -->
    <Transition name="slide">
      <LabSidebar v-if="isSidebarOpen" @close="isSidebarOpen = false"
        class="lg:hidden fixed inset-y-0 left-0 w-64 z-50 shadow-2xl bg-white dark:bg-black" />
    </Transition>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col min-w-0 lg:ml-64">
      <!-- Desktop Header -->
      <header
        class="hidden lg:flex h-16 bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800 items-center justify-between px-6 sticky top-0 z-30 backdrop-blur-sm">
        <div class="flex items-center gap-4">
          <h2 class="text-base font-medium text-zinc-900 dark:text-white">
            {{ pageTitle }}
          </h2>
          <!-- System Status Indicator -->
          <div
            class="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 dark:border-cyan-500/30 rounded-lg text-xs font-medium">
            <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span class="text-cyan-600 dark:text-cyan-400">Система активна</span>
          </div>
        </div>

        <div class="flex items-center gap-6">
          <!-- Clock -->
          <div class="hidden md:block font-mono text-sm text-zinc-500 dark:text-zinc-400">
            {{ currentTime }}
          </div>

          <!-- User Profile -->
          <ClientOnly>
            <div class="flex items-center gap-3">
              <div class="text-right hidden sm:block">
                <div class="text-sm font-medium text-zinc-900 dark:text-white">
                  {{ authStore.user?.displayName || 'Исследователь' }}
                </div>
                <div class="text-xs text-zinc-500 dark:text-zinc-400">
                  {{ authStore.user?.isCoach ? 'Коуч' : 'Пользователь' }}
                </div>
              </div>
              <div
                class="w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400 font-bold text-sm rounded-lg border border-cyan-500/30">
                {{ authStore.user?.displayName?.[0]?.toUpperCase() || 'U' }}
              </div>
            </div>
            <template #fallback>
              <div class="flex items-center gap-3 opacity-50">
                <div class="w-10 h-10 bg-zinc-100 dark:bg-zinc-800 animate-pulse rounded-lg"></div>
              </div>
            </template>
          </ClientOnly>
        </div>
      </header>

      <!-- Content Area -->
      <div
        class="flex-1 pt-14 lg:pt-0 overflow-y-auto bg-gradient-to-b from-zinc-50/50 to-white dark:from-zinc-950/50 dark:to-black">
        <NuxtPage />
      </div>
    </main>

    <!-- Global Notification -->
    <Notification v-if="notificationVisible" :message="notificationMessage" :type="notificationType"
      :route-path="notificationRoute" :cta-text="notificationCta" :duration="notificationDuration"
      :flow-id="notificationFlowId" :show-close-button="true" @close="hideNotification"
      @execute-flow="handleExecuteFlow" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useAuthStore } from "~/stores/auth";
import { useScheduler } from "~/composables/useScheduler";
import { useNotification } from "~/composables/useNotification";
import Notification from "~/components/base/Notification.vue";
import LabSidebar from '~/components/space/LabSidebar.vue';

const authStore = useAuthStore();
const route = useRoute();
const { notificationMessage, notificationType, notificationVisible, notificationRoute, notificationCta, notificationDuration, notificationFlowId, showNotification, hideNotification } = useNotification();
const { checkSchedules } = useScheduler(showNotification);

const isSidebarOpen = ref(false);
const currentTime = ref("");

const pageTitle = computed(() => {
  const stationMap = {
    "/space": "Лаборатория",
    "/space/dashboard": "Центр Управления",
    "/space/growth": "Саморазвитие",
    "/space/community": "Сообщество",
    "/profile": "Профиль",
    "/space/tests": "Когнитивные Тесты",
    "/space/brain-training": "Тренировка Мозга",
    "/space/brain-training/reaction": "Тест Реакции",
    "/space/brain-training/memory": "Тест Памяти",
    "/space/brain-training/stroop": "Цветовой Струп",
    "/space/psychology": "Психология",
    "/space/mindfulness": "Медитация",
    "/space/growth/wheel-of-life": "Колесо Баланса",
  };
  // Handle specific sub-routes if needed, or default
  return stationMap[route.path] || "Исследовательская Станция";
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
  if (!authStore.user) return;

  try {
    const { $firestore } = useNuxtApp();
    const { collection, query, where, getDocs } = await import("firebase/firestore");

    const flowsRef = collection($firestore, "labFlows");
    const q = query(flowsRef, where("userId", "==", authStore.user.uid));
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
  if (flowId) {
    window.dispatchEvent(new CustomEvent('execute-scheduled-flow', { detail: { flowId } }));
  }
};

onMounted(async () => {
  updateTime();
  timeInterval = setInterval(updateTime, 1000);

  // Initialize scheduler
  if (authStore.user) {
    await fetchAndCheckSchedules();
    // Check schedules every minute
    scheduleInterval = setInterval(fetchAndCheckSchedules, 60000);
  }
});

onUnmounted(() => {
  if (timeInterval) clearInterval(timeInterval);
  if (scheduleInterval) clearInterval(scheduleInterval);
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}

/* Custom scrollbar for content area */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.dark ::-webkit-scrollbar-track {
  background: #0f172a;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

.dark ::-webkit-scrollbar-thumb {
  background: #475569;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}
</style>