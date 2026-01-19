<template>
  <div class="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-white flex">
    <!-- Sidebar -->
    <LabSidebar class="hidden lg:block w-64 flex-none bg-white dark:bg-stone-900" />

    <!-- Mobile Header -->
    <div
      class="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white dark:bg-stone-900 border-b-2 border-stone-900 dark:border-white z-40 px-4 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="w-7 h-7 bg-stone-900 dark:bg-white flex items-center justify-center">
          <i class="fas fa-flask text-white dark:text-stone-900 text-xs"></i>
        </div>
        <span class="font-bold text-stone-900 dark:text-white text-sm">MindQLab</span>
      </div>
      <button @click="isSidebarOpen = true"
        class="p-2 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white">
        <i class="fas fa-bars text-lg"></i>
      </button>
    </div>

    <!-- Mobile Sidebar Overlay -->
    <Transition name="fade">
      <div v-if="isSidebarOpen" @click="isSidebarOpen = false" class="lg:hidden fixed inset-0 bg-stone-900/60 z-50">
      </div>
    </Transition>

    <!-- Mobile Sidebar -->
    <Transition name="slide">
      <LabSidebar v-if="isSidebarOpen" @close="isSidebarOpen = false"
        class="lg:hidden fixed inset-y-0 left-0 w-64 z-50 shadow-2xl bg-white dark:bg-stone-900" />
    </Transition>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col min-w-0">
      <!-- Desktop Header -->
      <header
        class="hidden lg:flex h-16 bg-white dark:bg-stone-900 border-b-2 border-stone-900 dark:border-white items-center justify-between px-6 sticky top-0 z-30">
        <div class="flex items-center gap-4">
          <h2 class="text-sm font-bold text-stone-900 dark:text-white uppercase tracking-wide">
            {{ pageTitle }}
          </h2>
          <!-- System Status Indicator (Mini) -->
          <div class="flex items-center gap-2 px-3 py-1 bg-stone-100 dark:bg-stone-800 rounded text-[10px] font-mono">
            <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span class="text-stone-500 dark:text-stone-400">ONLINE</span>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <!-- Clock -->
          <div class="hidden md:block font-mono text-xs text-stone-500 dark:text-stone-400">
            {{ currentTime }}
          </div>

          <!-- User Profile -->
          <ClientOnly>
            <div class="flex items-center gap-3">
              <div class="text-right hidden sm:block">
                <div class="text-xs font-bold text-stone-900 dark:text-white">
                  {{ authStore.user?.displayName || 'Исследователь' }}
                </div>
                <div class="text-[9px] text-stone-500 dark:text-stone-400 uppercase font-semibold tracking-wide">
                  {{ authStore.user?.isCoach ? 'Коуч' : 'Пользователь' }}
                </div>
              </div>
              <div
                class="w-9 h-9 bg-stone-900 dark:bg-white flex items-center justify-center text-white dark:text-stone-900 font-bold text-sm">
                {{ authStore.user?.displayName?.[0]?.toUpperCase() || 'U' }}
              </div>
            </div>
            <template #fallback>
              <div class="flex items-center gap-3 opacity-50">
                <div class="w-9 h-9 bg-stone-200 dark:bg-stone-800 animate-pulse"></div>
              </div>
            </template>
          </ClientOnly>
        </div>
      </header>

      <!-- Content Area -->
      <div class="flex-1 pt-14 lg:pt-0 overflow-y-auto">
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
</style>
