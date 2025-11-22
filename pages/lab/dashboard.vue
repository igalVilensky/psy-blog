<!-- pages/lab/dashboard.vue -->
<template>
  <div
    class="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 relative"
  >
    <!-- Loading State -->
    <div v-if="loading" class="fixed inset-0 z-50 bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
      <div class="loading-container">
        <div class="loading-spinner-wrapper">
          <div class="spinner-ring spinner-ring-1"></div>
          <div class="spinner-ring spinner-ring-2"></div>
          <div class="spinner-ring spinner-ring-3"></div>
          <div class="spinner-core">
            <i class="fas fa-brain text-3xl text-cyan-600 dark:text-cyan-400"></i>
          </div>
        </div>
        <div class="loading-text">
          <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">Загрузка лаборатории</h3>
          <p class="text-slate-600 dark:text-slate-400 text-sm">Анализируем ваши данные...</p>
        </div>
        <div class="loading-progress">
          <div class="progress-bar"></div>
        </div>
      </div>
    </div>

    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs />
      <!-- Dashboard Header -->
      <div class="mb-8">
        <div
          class="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h1
              class="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white font-montserrat mb-3 tracking-tight"
            >
              Нейро Анализ
            </h1>
            <p class="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              Картирование когнитивных функций и личностная оценка в реальном
              времени
            </p>
          </div>
          <div class="flex items-center space-x-3">
            <div
              class="bg-white dark:bg-slate-800/50 rounded-xl px-4 py-3 border border-slate-200 dark:border-cyan-500/20 backdrop-blur-sm shadow-sm dark:shadow-none"
            >
              <div class="text-cyan-600 dark:text-cyan-400/70 text-xs font-mono mb-1">ID СЕССИИ</div>
              <div class="text-slate-800 dark:text-white font-mono text-sm">{{ sessionId }}</div>
            </div>
          </div>
        </div>
      </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
      <!-- Cognitive Scan Card -->
      <div
        class="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800/50 dark:to-slate-800/30 rounded-xl p-6 border border-cyan-500/20 backdrop-blur-sm hover:border-cyan-500/40 transition-all duration-300 group relative overflow-hidden shadow-sm dark:shadow-none"
        @mouseenter="activeCard = 'cognitive'"
        @mouseleave="activeCard = null"
      >
        <div
          class="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        ></div>
        <div class="relative z-10">
          <div class="flex items-center justify-between mb-4">
            <div class="text-cyan-600 dark:text-cyan-400/70 text-xs font-mono tracking-wider">
              ЭМОЦИОНАЛЬНЫЙ АНАЛИЗ
            </div>
            <div
              class="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center transition-transform duration-300"
              :class="{ 'scale-110': activeCard === 'cognitive' }"
            >
              <i class="fas fa-brain text-cyan-600 dark:text-cyan-400 text-lg"></i>
            </div>
          </div>
          <div class="mb-3">
            <div class="text-3xl font-bold text-slate-900 dark:text-white mb-1 font-mono">
              {{ animatedStats.emotionEntries }}
            </div>
            <div class="text-slate-500 dark:text-slate-400 text-sm">Записей в барометре</div>
          </div>
          <div class="w-full bg-slate-200 dark:bg-slate-700/50 rounded-full h-2 overflow-hidden">
            <div
              class="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-1000"
              :style="{
                width: `${Math.min(
                  100,
                  (animatedStats.emotionEntries / 10) * 100
                )}%`,
              }"
            ></div>
          </div>
        </div>
      </div>

      <!-- Active Tests Card -->
      <div
        class="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800/50 dark:to-slate-800/30 rounded-xl p-6 border border-purple-500/20 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-300 group relative overflow-hidden shadow-sm dark:shadow-none"
        @mouseenter="activeCard = 'tests'"
        @mouseleave="activeCard = null"
      >
        <div
          class="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        ></div>
        <div class="relative z-10">
          <div class="flex items-center justify-between mb-4">
            <div class="text-purple-600 dark:text-purple-400/70 text-xs font-mono tracking-wider">
              АРХЕТИПЫ
            </div>
            <div
              class="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center transition-transform duration-300"
              :class="{ 'scale-110': activeCard === 'tests' }"
            >
              <i class="fas fa-vial text-purple-600 dark:text-purple-400 text-lg"></i>
            </div>
          </div>
          <div class="mb-3">
            <div class="text-3xl font-bold text-slate-900 dark:text-white mb-1 font-mono">
              {{ archetypeScores.length }}
            </div>
            <div class="text-slate-500 dark:text-slate-400 text-sm">
              Проанализированных архетипов
            </div>
          </div>
          <div class="flex space-x-1">
            <div
              v-for="i in 5"
              :key="i"
              class="flex-1 h-2 rounded-full transition-all duration-300"
              :class="
                i <= Math.min(5, archetypeScores.length)
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                  : 'bg-slate-200 dark:bg-slate-700/50'
              "
            ></div>
          </div>
        </div>
      </div>

      <!-- Data Points Card -->
      <div
        class="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800/50 dark:to-slate-800/30 rounded-xl p-6 border border-emerald-500/20 backdrop-blur-sm hover:border-emerald-500/40 transition-all duration-300 group relative overflow-hidden shadow-sm dark:shadow-none"
        @mouseenter="activeCard = 'data'"
        @mouseleave="activeCard = null"
      >
        <div
          class="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        ></div>
        <div class="relative z-10">
          <div class="flex items-center justify-between mb-4">
            <div class="text-emerald-600 dark:text-emerald-400/70 text-xs font-mono tracking-wider">
              СТАТИСТИКА
            </div>
            <div
              class="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center transition-transform duration-300"
              :class="{ 'scale-110': activeCard === 'data' }"
            >
              <i class="fas fa-database text-emerald-600 dark:text-emerald-400 text-lg"></i>
            </div>
          </div>
          <div class="mb-3">
            <div class="text-3xl font-bold text-slate-900 dark:text-white mb-1 font-mono">
              {{ animatedStats.averageIntensity.toFixed(1) }}
            </div>
            <div class="text-slate-500 dark:text-slate-400 text-sm">
              Средняя интенсивность эмоций
            </div>
          </div>
          <div class="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 text-sm">
            <i class="fas fa-heart text-xs"></i>
            <span class="font-mono">{{
              emotionBarometerStats.mostCommonEmotion
            }}</span>
            <span class="text-slate-500 dark:text-slate-500">частая эмоция</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Experiments -->
    <div v-if="!loading" class="mb-8">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-slate-900 dark:text-white font-montserrat">
          Последние Активности
        </h2>
        <button
          class="text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 text-sm font-medium flex items-center space-x-2 transition-colors"
        >
          <span>Посмотреть все</span>
          <i class="fas fa-arrow-right text-xs"></i>
        </button>
      </div>
      <div class="space-y-3">
        <!-- Emotion Barometer Activity -->
        <div
          v-if="emotionBarometerStats.totalEntries > 0"
          class="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:border-slate-300 dark:hover:border-slate-600/50 transition-all duration-300 group shadow-sm dark:shadow-none"
        >
          <div class="flex items-center space-x-4 flex-1 min-w-0">
            <div class="relative">
              <div class="w-3 h-3 rounded-full bg-emerald-400"></div>
            </div>
            <div
              class="w-12 h-12 rounded-lg flex items-center justify-center bg-emerald-500/10"
            >
              <i class="fas fa-heart-pulse text-emerald-600 dark:text-emerald-400 text-lg"></i>
            </div>
            <div class="flex-1 min-w-0">
              <div
                class="text-slate-900 dark:text-white font-medium mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors"
              >
                Эмоциональный Компас
              </div>
              <div class="text-slate-500 dark:text-slate-400 text-sm">
                {{ emotionBarometerStats.totalEntries }} записей, средняя
                интенсивность:
                {{ emotionBarometerStats.averageIntensity.toFixed(1) }}
              </div>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <div class="text-right hidden sm:block">
              <div class="text-slate-400 text-xs font-mono mb-1">Активно</div>
              <div class="text-xs font-medium text-emerald-600 dark:text-emerald-400">Завершено</div>
            </div>
            <NuxtLink
              to="/lab/experiments/emotional-compass"
              class="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-white transition-all"
            >
              <i class="fas fa-chevron-right text-xs"></i>
            </NuxtLink>
          </div>
        </div>

        <!-- Archetype Assessment Activity -->
        <div
          v-if="archetypeScores.length > 0"
          class="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:border-slate-300 dark:hover:border-slate-600/50 transition-all duration-300 group shadow-sm dark:shadow-none"
        >
          <div class="flex items-center space-x-4 flex-1 min-w-0">
            <div class="relative">
              <div class="w-3 h-3 rounded-full bg-amber-400"></div>
            </div>
            <div
              class="w-12 h-12 rounded-lg flex items-center justify-center bg-amber-500/10"
            >
              <i class="fas fa-brain text-amber-600 dark:text-amber-400 text-lg"></i>
            </div>
            <div class="flex-1 min-w-0">
              <div
                class="text-slate-900 dark:text-white font-medium mb-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors"
              >
                Анализ Архетипов
              </div>
              <div class="text-slate-500 dark:text-slate-400 text-sm">
                {{ archetypeScores.length }} архетипов проанализировано
              </div>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <div class="text-right hidden sm:block">
              <div class="text-slate-400 text-xs font-mono mb-1">Активно</div>
              <div class="text-xs font-medium text-amber-600 dark:text-amber-400">Завершено</div>
            </div>
            <button
              class="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-white transition-all"
              @click="viewArchetypes"
            >
              <i class="fas fa-chevron-right text-xs"></i>
            </button>
          </div>
        </div>

        <!-- User Profile Activity -->
        <div
          class="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:border-slate-300 dark:hover:border-slate-600/50 transition-all duration-300 group shadow-sm dark:shadow-none"
        >
          <div class="flex items-center space-x-4 flex-1 min-w-0">
            <div class="relative">
              <div class="w-3 h-3 rounded-full bg-cyan-400"></div>
            </div>
            <div
              class="w-12 h-12 rounded-lg flex items-center justify-center bg-cyan-500/10"
            >
              <i class="fas fa-user text-cyan-600 dark:text-cyan-400 text-lg"></i>
            </div>
            <div class="flex-1 min-w-0">
              <div
                class="text-slate-900 dark:text-white font-medium mb-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors"
              >
                Профиль Пользователя
              </div>
              <div class="text-slate-500 dark:text-slate-400 text-sm">
                {{ authStore.user?.displayName || "Пользователь" }} •
                {{ profession || "Профессия не указана" }}
              </div>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <div class="text-right hidden sm:block">
              <div class="text-slate-400 text-xs font-mono mb-1">Обновлено</div>
              <div class="text-xs font-medium text-cyan-600 dark:text-cyan-400">Активно</div>
            </div>
            <NuxtLink
              to="/profile"
              class="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-white transition-all"
            >
              <i class="fas fa-chevron-right text-xs"></i>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div v-if="!loading">
      <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6 font-montserrat">
        Быстрые Действия
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <NuxtLink
          to="/lab/experiments/emotional-compass"
          class="p-5 rounded-xl bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 hover:border-emerald-500/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-300 group text-left relative overflow-hidden shadow-sm dark:shadow-none"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          ></div>
          <div class="relative z-10">
            <div
              class="w-12 h-12 rounded-lg bg-emerald-500/10 group-hover:bg-emerald-500/20 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
            >
              <i class="fas fa-heart-pulse text-xl text-emerald-600 dark:text-emerald-400"></i>
            </div>
            <div
              class="text-slate-900 dark:text-white font-medium mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors"
            >
              Эмоциональный Компас
            </div>
            <div class="text-slate-500 dark:text-slate-400 text-sm">Запись эмоций и анализ</div>
          </div>
        </NuxtLink>

        <button
          @click="viewArchetypes"
          class="p-5 rounded-xl bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 hover:border-amber-500/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-300 group text-left relative overflow-hidden shadow-sm dark:shadow-none"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          ></div>
          <div class="relative z-10">
            <div
              class="w-12 h-12 rounded-lg bg-amber-500/10 group-hover:bg-amber-500/20 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
            >
              <i class="fas fa-brain text-xl text-amber-600 dark:text-amber-400"></i>
            </div>
            <div
              class="text-slate-900 dark:text-white font-medium mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors"
            >
              Архетипы
            </div>
            <div class="text-slate-500 dark:text-slate-400 text-sm">Просмотр результатов теста</div>
          </div>
        </button>

        <NuxtLink
          to="/profile"
          class="p-5 rounded-xl bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 hover:border-cyan-500/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-300 group text-left relative overflow-hidden shadow-sm dark:shadow-none"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          ></div>
          <div class="relative z-10">
            <div
              class="w-12 h-12 rounded-lg bg-cyan-500/10 group-hover:bg-cyan-500/20 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
            >
              <i class="fas fa-user text-xl text-cyan-600 dark:text-cyan-400"></i>
            </div>
            <div
              class="text-slate-900 dark:text-white font-medium mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors"
            >
              Профиль
            </div>
            <div class="text-slate-500 dark:text-slate-400 text-sm">Управление данными</div>
          </div>
        </NuxtLink>

        <button
          class="p-5 rounded-xl bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 hover:border-purple-500/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-300 group text-left relative overflow-hidden shadow-sm dark:shadow-none"
          @click="refreshData"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          ></div>
          <div class="relative z-10">
            <div
              class="w-12 h-12 rounded-lg bg-purple-500/10 group-hover:bg-purple-500/20 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
            >
              <i class="fas fa-sync text-xl text-purple-600 dark:text-purple-400"></i>
            </div>
            <div
              class="text-slate-900 dark:text-white font-medium mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors"
            >
              Обновить
            </div>
            <div class="text-slate-500 dark:text-slate-400 text-sm">Синхронизировать данные</div>
          </div>
        </button>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "~/stores/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getEmotionBarometerStats } from "~/api/firebase/emotionBarometer";
import { getLatestUserAssessment } from "~/api/firebase/assessments";
import Breadcrumbs from "~/components/ui/Breadcrumbs.vue";

definePageMeta({
  layout: "laboratory",
});

const router = useRouter();
const authStore = useAuthStore();

// Loading state
const loading = ref(true);

// Data from profile
const emotionBarometerStats = ref({
  totalEntries: 0,
  mostCommonEmotion: "",
  averageIntensity: 0,
  mostCommonTag: "",
  emotionDistribution: {},
});

const archetypeScores = ref([]);
const profession = ref("");

// UI state
const activeCard = ref(null);

// Animated stats
const animatedStats = reactive({
  emotionEntries: 0,
  averageIntensity: 0,
});

const sessionId = computed(() => {
  return `LAB-${Date.now().toString(36).toUpperCase()}`;
});

// Fetch user data
const fetchUserData = async () => {
  if (!authStore.user) return;

  try {
    // Fetch bio data
    const db = getFirestore();
    const userRef = doc(db, "users", authStore.user.uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const data = userSnap.data();
      profession.value = data.profession || "";
    }

    // Fetch emotion barometer stats
    const { success, stats } = await getEmotionBarometerStats(
      db,
      authStore.user.uid
    );
    if (success) {
      emotionBarometerStats.value = stats;
    }

    // Fetch archetype assessment
    const { success: assessmentSuccess, assessment } =
      await getLatestUserAssessment(db, authStore.user.uid);
    if (assessmentSuccess && assessment) {
      archetypeScores.value = Object.entries(assessment.scores).map(
        ([name, level]) => ({
          name,
          level: parseFloat(level),
        })
      );
    }
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
  } finally {
    loading.value = false;
    setTimeout(animateNumbers, 300);
  }
};

const viewArchetypes = () => {
  // Navigate to profile or archetypes section
  router.push("/profile#psychological-profile");
};

const refreshData = () => {
  loading.value = true;
  fetchUserData();
};

const animateNumbers = () => {
  const duration = 1500;
  const steps = 60;
  const interval = duration / steps;

  let currentStep = 0;

  const timer = setInterval(() => {
    currentStep++;
    const progress = currentStep / steps;

    animatedStats.emotionEntries = Math.floor(
      emotionBarometerStats.value.totalEntries * progress
    );
    animatedStats.averageIntensity =
      emotionBarometerStats.value.averageIntensity * progress;

    if (currentStep >= steps) {
      animatedStats.emotionEntries = emotionBarometerStats.value.totalEntries;
      animatedStats.averageIntensity =
        emotionBarometerStats.value.averageIntensity;
      clearInterval(timer);
    }
  }, interval);
};

onMounted(async () => {
  await authStore.initAuth();
  if (authStore.user) {
    await fetchUserData();
  } else {
    loading.value = false;
  }
});
</script>

<style scoped>
/* Loading State Styles */


.loading-container {
  @apply flex flex-col items-center gap-8;
}

.loading-spinner-wrapper {
  @apply relative w-32 h-32;
}

.spinner-ring {
  @apply absolute inset-0 rounded-full border-4 border-transparent;
  animation: spin 3s linear infinite;
}

.spinner-ring-1 {
  @apply border-t-cyan-500;
  animation-duration: 2s;
}

.spinner-ring-2 {
  @apply border-r-blue-500;
  animation-duration: 3s;
  animation-direction: reverse;
}

.spinner-ring-3 {
  @apply border-b-purple-500;
  animation-duration: 4s;
}

.spinner-core {
  @apply absolute inset-0 flex items-center justify-center;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.95);
  }
}

.loading-text {
  @apply text-center;
}

.loading-progress {
  @apply w-64 h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden;
}

.progress-bar {
  @apply h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full;
  animation: progress 2s ease-in-out infinite;
}

@keyframes progress {
  0% {
    width: 0%;
    margin-left: 0%;
  }
  50% {
    width: 75%;
    margin-left: 0%;
  }
  100% {
    width: 0%;
    margin-left: 100%;
  }
}
</style>
