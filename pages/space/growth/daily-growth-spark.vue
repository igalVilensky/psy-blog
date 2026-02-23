<template>
  <div
    class="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 transition-colors duration-500 font-sans selection:bg-cyan-500/30">
    <div class="container mx-auto px-6 max-w-6xl relative z-10 pt-12 pb-16 md:pb-24">
      <Breadcrumbs />

      <!-- Header Section -->
      <div class="text-center mb-16 mt-8">
        <h1
          class="text-3xl sm:text-6xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400 tracking-tight uppercase">
          Ежедневная Искра Роста
        </h1>
        <p
          class="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed px-4 text-base sm:text-lg font-medium">
          Отслеживайте свой прогресс, вдохновляйтесь сообществом и делитесь своими открытиями каждый день.
        </p>
      </div>

      <!-- Daily Growth Summary -->
      <section class="relative overflow-hidden rounded-[2.5rem] mb-20 shadow-2xl shadow-zinc-500/5">
        <div class="relative z-10 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 sm:p-12">

          <!-- Loading State -->
          <div v-if="loadingStats" class="flex flex-col items-center justify-center py-16 gap-8">
            <div class="loading-spinner-wrapper relative w-24 h-24">
              <div class="absolute inset-0 border-4 border-cyan-500/10 rounded-full"></div>
              <div class="absolute inset-0 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin">
              </div>
              <div class="absolute inset-0 flex items-center justify-center">
                <i class="fas fa-bolt text-2xl text-cyan-500"></i>
              </div>
            </div>
            <div class="text-center">
              <h3 class="text-lg font-black text-zinc-900 dark:text-white mb-2 uppercase tracking-tight">Синхронизация
              </h3>
              <p class="text-zinc-400 text-[10px] font-black uppercase tracking-[0.2em] animate-pulse">Анализ
                показателей...</p>
            </div>
          </div>

          <!-- No Data State -->
          <div v-else-if="!user || !hasData" class="text-center space-y-10 py-8">
            <div
              class="w-24 h-24 bg-zinc-50 dark:bg-zinc-800 rounded-[2rem] flex items-center justify-center mx-auto mb-4 text-zinc-300 dark:text-zinc-700 text-4xl">
              <i class="fas fa-rocket"></i>
            </div>
            <div>
              <h3 class="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white uppercase tracking-tight mb-4">
                Начните свой путь
              </h3>
              <p class="text-zinc-500 dark:text-zinc-400 max-w-md mx-auto font-medium leading-relaxed">
                {{ user ? `У вас пока нет записей в дневнике роста. Совершите свой первый шаг прямо сейчас!` : `Войдите
                в систему, чтобы фиксировать свой прогресс и получать персональные рекомендации.` }}
              </p>
            </div>
            <div class="flex justify-center gap-4">
              <button v-if="!user"
                class="px-10 py-5 bg-cyan-600 hover:bg-cyan-700 text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all shadow-xl shadow-cyan-500/25 active:scale-95 flex items-center gap-3"
                @click="redirectToLogin">
                <i class="fas fa-sign-in-alt"></i>
                Войти
              </button>
              <button v-else
                class="px-10 py-5 bg-gradient-to-r from-cyan-600 to-purple-600 hover:shadow-cyan-500/40 text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all shadow-xl flex items-center gap-3 active:scale-95"
                @click="openDailySparkModal">
                <i class="fas fa-plus-circle text-base"></i>
                Начать записи
              </button>
            </div>
          </div>

          <!-- Data Display -->
          <div v-else class="space-y-12">
            <div class="flex items-center justify-center gap-4">
              <div class="h-px flex-1 bg-zinc-200 dark:bg-zinc-800"></div>
              <h3 class="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400 whitespace-nowrap">
                Ваш профайл роста
              </h3>
              <div class="h-px flex-1 bg-zinc-200 dark:bg-zinc-800"></div>
            </div>

            <!-- Stats Grid -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
              <!-- Entries Card -->
              <div
                class="bg-zinc-50 dark:bg-zinc-800/40 rounded-3xl p-6 border border-zinc-100 dark:border-zinc-700/50 shadow-sm transition-transform hover:-translate-y-1">
                <div class="text-[10px] text-zinc-400 font-black uppercase tracking-widest mb-3">Записей</div>
                <div class="text-3xl font-black text-zinc-900 dark:text-white tracking-tighter">{{ stats.totalEntries }}
                </div>
              </div>

              <!-- Streak Card -->
              <div
                class="bg-zinc-50 dark:bg-zinc-800/40 rounded-3xl p-6 border border-zinc-100 dark:border-zinc-700/50 shadow-sm transition-transform hover:-translate-y-1">
                <div class="text-[10px] text-zinc-400 font-black uppercase tracking-widest mb-3">Серия</div>
                <div class="text-3xl font-black text-purple-600 dark:text-purple-400 tracking-tighter">{{
                  stats.longestStreak }}</div>
              </div>

              <!-- Points Card -->
              <div
                class="bg-zinc-50 dark:bg-zinc-800/40 rounded-3xl p-6 border border-zinc-100 dark:border-zinc-700/50 shadow-sm transition-transform hover:-translate-y-1">
                <div class="text-[10px] text-zinc-400 font-black uppercase tracking-widest mb-3">Очки</div>
                <div class="text-3xl font-black text-zinc-900 dark:text-white tracking-tighter truncate">{{
                  stats.totalPoints }}</div>
              </div>

              <!-- Energy Card -->
              <div
                class="bg-zinc-50 dark:bg-zinc-800/40 rounded-3xl p-6 border border-zinc-100 dark:border-zinc-700/50 shadow-sm transition-transform hover:-translate-y-1">
                <div class="text-[10px] text-zinc-400 font-black uppercase tracking-widest mb-3">Энергия</div>
                <div class="flex items-center gap-3">
                  <span class="text-2xl">{{ getEnergyEmoji(stats.averageEnergyLevel) }}</span>
                  <span class="text-3xl font-black text-cyan-600 dark:text-cyan-400 tracking-tighter">{{
                    stats.averageEnergyLevel.toFixed(1) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Shared Insights Section -->
      <section class="space-y-12">
        <div class="flex items-center justify-center gap-4">
          <div class="h-2 w-2 rounded-full bg-cyan-500"></div>
          <h2 class="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">
            Мудрость Сообщества
          </h2>
          <div class="h-2 w-2 rounded-full bg-purple-500"></div>
        </div>

        <!-- Category Filters -->
        <div class="flex flex-wrap gap-2 mb-12 justify-center">
          <button v-for="category in categories" :key="category" @click="selectedCategory = category" :class="[
            'px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 transform active:scale-95',
            selectedCategory === category
              ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xl'
              : 'bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600',
          ]">
            {{ category }}
          </button>
        </div>

        <!-- Loading State -->
        <div v-if="loadingInsights" class="flex flex-col items-center justify-center py-24 gap-6">
          <div class="w-16 h-16 border-4 border-purple-500/10 border-t-purple-500 rounded-full animate-spin"></div>
          <p class="text-[10px] font-black uppercase tracking-widest text-zinc-400 animate-pulse">Поиск идей...</p>
        </div>

        <!-- Insights Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div v-for="insight in filteredInsights" :key="insight.id"
            class="bg-white dark:bg-zinc-900/60 backdrop-blur-xl p-8 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 hover:border-cyan-500/50 shadow-sm hover:shadow-2xl hover:shadow-cyan-500/5 transition-all duration-500 group">
            <div class="flex items-center gap-5 mb-8">
              <div :style="`background-color: ${generateAvatarColor(insight.displayName || 'Anonymous')}`"
                class="h-14 w-14 rounded-2xl flex items-center justify-center text-white text-xl font-black shadow-lg shadow-black/10 transition-transform group-hover:scale-110">
                {{ (insight.isAnonymous ? "A" : insight.displayName?.[0] || "U").toUpperCase() }}
              </div>
              <div class="flex-grow">
                <p class="text-zinc-900 dark:text-white font-black uppercase tracking-tight text-sm">
                  {{ insight.isAnonymous ? "Анонимно" : insight.displayName || "Пользователь" }}
                </p>
                <p class="text-[10px] text-zinc-400 font-black uppercase tracking-widest mt-0.5">
                  {{ formatDate(insight.timestamp) }}
                </p>
              </div>
              <span
                class="px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest bg-zinc-50 dark:bg-zinc-800 text-zinc-500 border border-zinc-100 dark:border-zinc-700">
                {{ insight.category }}
              </span>
            </div>

            <div class="relative pl-6 border-l-4 border-cyan-500/20 group-hover:border-cyan-500/50 transition-colors">
              <p class="text-zinc-700 dark:text-zinc-300 text-lg font-medium italic leading-relaxed">
                {{ insight.text }}
              </p>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="!loadingInsights && filteredInsights.length === 0"
          class="bg-white dark:bg-zinc-900/50 backdrop-blur-lg p-16 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 text-center shadow-sm">
          <div
            class="w-20 h-20 mx-auto mb-8 bg-zinc-50 dark:bg-zinc-800 rounded-3xl flex items-center justify-center text-zinc-200 dark:text-zinc-700 text-3xl">
            <i class="fas fa-comment-slash"></i>
          </div>
          <h3 class="text-xl font-black text-zinc-900 dark:text-white mb-4 uppercase tracking-tight">Пока здесь пусто
          </h3>
          <p class="text-zinc-500 dark:text-zinc-400 mb-10 font-medium">Будьте первым, кто поделится вдохновением!</p>
          <button @click="openDailySparkModal"
            class="px-10 py-5 bg-cyan-600 hover:bg-cyan-700 text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all shadow-xl shadow-cyan-500/25 active:scale-95">
            Поделиться мыслью
          </button>
        </div>

        <!-- Load More Button -->
        <div v-if="insights.length >= limit && !loadingInsights" class="flex justify-center mt-12">
          <button @click="loadMore"
            class="px-8 py-4 bg-white dark:bg-zinc-900 text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-zinc-200 dark:border-zinc-800 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all shadow-sm hover:shadow-xl active:scale-95 flex items-center gap-4">
            <span>Загрузить еще</span>
            <i class="fas fa-chevron-down text-xs"></i>
          </button>
        </div>
      </section>

      <!-- Floating Action Button -->
      <div class="fixed bottom-10 right-10 z-50">
        <button @click="openDailySparkModal"
          class="bg-gradient-to-tr from-cyan-600 to-blue-600 text-white h-20 w-20 rounded-[2rem] shadow-2xl hover:shadow-cyan-500/40 transition-all flex items-center justify-center group transform hover:scale-110 active:scale-95"
          title="Добавить новую запись">
          <i class="fas fa-plus text-2xl group-hover:rotate-90 transition-transform duration-500"></i>
          <span
            class="absolute right-full mr-6 bg-zinc-900 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-2xl pointer-events-none border border-zinc-800">
            Новая запись
          </span>
        </button>
      </div>
    </div>

    <!-- Daily Growth Spark Modal -->
    <DailyGrowthSpark v-model="showModal" @close="handleModalClose" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {
  getDailyGrowthSparkStats,
  getSharedInsights,
} from "~/api/firebase/dailyGrowthSpark";
import Breadcrumbs from "~/components/ui/Breadcrumbs.vue";
import DailyGrowthSpark from "~/components/growth-spark/DailyGrowthSpark.vue";

definePageMeta({
  layout: "laboratory",
});

const auth = getAuth();
const db = getFirestore();
const user = ref(null);
const stats = ref(null);
const insights = ref([]);
const loadingStats = ref(true);
const loadingInsights = ref(true);
const showModal = ref(false);
const limit = ref(20);
const selectedCategory = ref("Все");

const categories = [
  "Все",
  "Работа",
  "Здоровье",
  "Осознанность",
  "Отношения",
  "Обучение",
];

// Computed Properties
const hasData = computed(() => {
  return stats.value && stats.value.totalEntries > 0;
});

const filteredInsights = computed(() => {
  let result = insights.value;
  if (selectedCategory.value && selectedCategory.value !== "Все") {
    result = result.filter(
      (insight) => insight.category === selectedCategory.value
    );
  }
  return result;
});

// Methods
const fetchStats = async (userId) => {
  loadingStats.value = true;
  const response = await getDailyGrowthSparkStats(db, userId);
  if (response.success) {
    stats.value = response.stats;
  } else {
    stats.value = null;
  }
  loadingStats.value = false;
};

const fetchInsights = async () => {
  loadingInsights.value = true;
  const response = await getSharedInsights(db, limit.value);
  if (response.success) {
    insights.value = response.data;
  }
  loadingInsights.value = false;
};

const loadMore = () => {
  limit.value += 20;
  fetchInsights();
};

const redirectToLogin = () => {
  // Redirect to login page
  window.location.href = "/login";
};

const getEnergyEmoji = (level) => {
  if (level <= 2) return "😴";
  if (level <= 4) return "😌";
  if (level <= 6) return "😊";
  if (level <= 8) return "😃";
  return "🤩";
};

const formatDate = (timestamp) => {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Сегодня";
  if (diffDays === 1) return "Вчера";
  if (diffDays < 7) return `${diffDays} дн. назад`;
  return date.toLocaleDateString();
};

const generateAvatarColor = (name) => {
  if (!name) return "#6366f1";
  const colors = [
    "#6366f1", // indigo
    "#8b5cf6", // violet
    "#ec4899", // pink
    "#ef4444", // red
    "#f97316", // orange
    "#f59e0b", // amber
    "#10b981", // emerald
    "#06b6d4", // cyan
    "#3b82f6", // blue
  ];
  const charCode = name
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[charCode % colors.length];
};

const openDailySparkModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  if (user.value) {
    fetchStats(user.value.uid);

    fetchInsights();
  }
};

const handleModalClose = () => {
  closeModal();
};

// Lifecycle
onMounted(() => {
  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser;
    if (currentUser) {
      fetchStats(currentUser.uid);
      fetchInsights();
    } else {
      loadingStats.value = false;
      loadingInsights.value = false;
    }
  });
});
</script>

<style scoped>
.transform {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover\:scale-102:hover {
  transform: scale(1.02);
}

/* Enhanced gradient animations */
@keyframes gradientFlow {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.bg-gradient-to-r {
  background-size: 200% 200%;
  animation: gradientFlow 15s ease infinite;
}

/* Subtle pulse animation for cards */
@keyframes subtle-pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.2);
  }

  70% {
    box-shadow: 0 0 0 10px rgba(99, 102, 241, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(99, 102, 241, 0);
  }
}

.daily-spark {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1),
    0 8px 10px -6px rgba(0, 0, 0, 0.1);
}

/* Loading State Styles */
.spinner-ring {
  @apply absolute inset-0 rounded-full border-4 border-transparent;
  animation: spin 3s linear infinite;
}

.spinner-ring-1 {
  @apply border-t-cyan-500;
  animation-duration: 2s;
}

.spinner-ring-2 {
  @apply border-r-purple-500;
  animation-duration: 3s;
  animation-direction: reverse;
}

.spinner-ring-3 {
  @apply border-b-pink-500;
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

.loading-progress {
  @apply w-64 h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden;
}

.progress-bar {
  @apply h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full;
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
