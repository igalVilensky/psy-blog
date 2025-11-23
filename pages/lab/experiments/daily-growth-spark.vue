<template>
  <div class="min-h-screen text-slate-800 dark:text-slate-200">
    <div class="container mx-auto px-4 xl:px-0 max-w-6xl relative z-10 pt-12 pb-8 md:pb-12">
      <Breadcrumbs />
      <!-- Header Section -->
      <div class="text-center mb-12">
        <h1
          class="text-4xl sm:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 tracking-tight font-mono">
          ЕЖЕДНЕВНАЯ ИСКРА РОСТА
        </h1>
        <p class="text-slate-600 dark:text-cyan-100/70 max-w-2xl mx-auto leading-relaxed px-2 text-lg">
          Отслеживайте свой прогресс, вдохновляйтесь сообществом и делитесь
          своими открытиями каждый день!
        </p>
      </div>

      <!-- Daily Growth Summary -->
      <section class="relative overflow-hidden rounded-2xl mb-16">
        <div
          class="relative z-10 bg-white/80 dark:bg-slate-900/50 backdrop-blur-xl p-8 sm:p-10 rounded-2xl border border-cyan-500/30 shadow-lg dark:shadow-[0_0_50px_-12px_rgba(6,182,212,0.25)]">
          <!-- Loading State -->
          <div v-if="loadingStats" class="flex flex-col items-center gap-4 py-12">
            <div class="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
            <p class="text-cyan-400 font-mono animate-pulse">
              ЗАГРУЗКА МОДУЛЕЙ...
            </p>
          </div>

          <!-- No Data State -->
          <div v-else-if="!user || !hasData" class="text-center space-y-8 py-12">
            <h3
              class="text-3xl sm:text-4xl font-bold font-mono bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              НАЧНИТЕ СВОЙ ПУТЬ РОСТА
            </h3>
            <p class="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              {{
                user
                  ? "Вы еще не начали свой путь роста. Попробуйте прямо сейчас!"
                  : "Войдите, чтобы начать свой путь роста!"
              }}
            </p>
            <div class="flex justify-center gap-4">
              <button v-if="!user"
                class="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-mono font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] flex items-center gap-3"
                @click="redirectToLogin">
                <i class="fas fa-sign-in-alt"></i>
                ВОЙТИ
              </button>
              <button v-else
                class="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-mono font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] flex items-center gap-3"
                @click="openDailySparkModal">
                <i class="fas fa-plus-circle"></i>
                НАЧАТЬ
              </button>
            </div>
          </div>

          <!-- Data Display -->
          <div v-else class="space-y-8">
            <div class="flex items-center justify-center gap-3 mb-2">
              <div class="h-2 w-2 rounded-full bg-cyan-500"></div>
              <h3 class="text-2xl font-mono font-bold text-cyan-600 dark:text-cyan-300">
                ВАШ ПРОГРЕСС
              </h3>
              <div class="h-2 w-2 rounded-full bg-cyan-500"></div>
            </div>

            <!-- Stats Grid with Improved Cards -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <!-- Entries Card -->
              <div
                class="bg-white dark:bg-slate-800/30 rounded-xl p-4 border border-cyan-500/20 shadow-sm dark:shadow-none">
                <div class="text-2xl font-bold text-slate-900 dark:text-white mb-1 font-mono">
                  {{ stats.totalEntries }}
                </div>
                <div class="text-slate-500 dark:text-slate-400 text-xs">ЗАПИСЕЙ</div>
              </div>

              <!-- Streak Card -->
              <div
                class="bg-white dark:bg-slate-800/30 rounded-xl p-4 border border-purple-500/20 shadow-sm dark:shadow-none">
                <div class="text-2xl font-bold text-slate-900 dark:text-white mb-1 font-mono">
                  {{ stats.longestStreak }}
                </div>
                <div class="text-slate-500 dark:text-slate-400 text-xs">СЕРИЯ</div>
              </div>

              <!-- Points Card -->
              <div
                class="bg-white dark:bg-slate-800/30 rounded-xl p-4 border border-cyan-500/20 shadow-sm dark:shadow-none">
                <div class="text-2xl font-bold text-slate-900 dark:text-white mb-1 font-mono">
                  {{ stats.totalPoints }}
                </div>
                <div class="text-slate-500 dark:text-slate-400 text-xs">ОЧКИ</div>
              </div>

              <!-- Energy Card -->
              <div
                class="bg-white dark:bg-slate-800/30 rounded-xl p-4 border border-purple-500/20 shadow-sm dark:shadow-none">
                <div class="text-2xl font-bold text-slate-900 dark:text-white mb-1 font-mono flex items-center gap-2">
                  <span>{{ getEnergyEmoji(stats.averageEnergyLevel) }}</span>
                  <span>{{ stats.averageEnergyLevel.toFixed(1) }}</span>
                </div>
                <div class="text-slate-500 dark:text-slate-400 text-xs">ЭНЕРГИЯ</div>
                <div class="text-purple-600 dark:text-purple-300 text-[10px] mt-1">Средний уровень</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Shared Insights Section -->
      <section class="mb-16">
        <div class="flex items-center justify-center gap-3 mb-8">
          <div class="h-1 w-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"></div>
          <h2 class="text-2xl font-mono font-bold text-cyan-600 dark:text-cyan-300 text-center">
            ВДОХНОВЕНИЕ ОТ СООБЩЕСТВА
          </h2>
          <div class="h-1 w-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"></div>
        </div>

        <!-- Category Filters -->
        <div class="flex flex-wrap gap-3 mb-10 justify-center">
          <button v-for="category in categories" :key="category" @click="selectedCategory = category" :class="[
            'px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 transform',
            selectedCategory === category
              ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white shadow-lg shadow-cyan-500/20 scale-105'
              : 'bg-white/80 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border border-cyan-500/30 dark:border-slate-700 hover:border-cyan-500/50 hover:bg-slate-100 dark:hover:bg-slate-700/80 hover:scale-105',
          ]">
            {{ category }}
          </button>
        </div>

        <!-- Loading State -->
        <div v-if="loadingInsights" class="flex flex-col items-center justify-center py-16">
          <div class="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mb-6"></div>
          <p class="text-cyan-400 font-mono">
            ЗАГРУЗКА ВДОХНОВЕНИЯ...
          </p>
        </div>

        <!-- Insights Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div v-for="insight in filteredInsights" :key="insight.id"
            class="bg-white/80 dark:bg-slate-900/50 backdrop-blur-md p-6 rounded-xl border border-cyan-500/30 hover:border-cyan-400 shadow-lg hover:shadow-xl dark:hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-300 transform hover:scale-102 hover:-translate-y-1">
            <div class="flex items-start mb-5">
              <div :style="`background-color: ${generateAvatarColor(
                insight.displayName || 'Anonymous'
              )}`"
                class="h-12 w-12 rounded-full flex items-center justify-center text-white text-lg font-bold mr-4 shadow-md">
                {{
                  (insight.isAnonymous
                    ? "A"
                    : insight.displayName?.[0] || "U"
                  ).toUpperCase()
                }}
              </div>
              <div class="flex-grow">
                <p class="text-slate-900 dark:text-slate-200 font-medium">
                  {{
                    insight.isAnonymous
                      ? "Анонимно"
                      : insight.displayName || "Пользователь"
                  }}
                </p>
                <p class="text-xs text-slate-500 dark:text-slate-400">
                  {{ formatDate(insight.timestamp) }}
                </p>
              </div>
              <span
                class="ml-auto px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 shadow-sm">
                {{ insight.category }}
              </span>
            </div>
            <div class="relative">
              <svg class="absolute -top-4 -left-2 h-8 w-8 text-cyan-500/20 dark:text-cyan-500/10" fill="currentColor"
                viewBox="0 0 24 24">
                <path
                  d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p class="text-slate-900 dark:text-white text-lg font-light italic leading-relaxed px-2 pt-2">
                {{ insight.text }}
              </p>
              <svg
                class="absolute -bottom-4 -right-2 h-8 w-8 text-cyan-500/20 dark:text-cyan-500/10 transform rotate-180"
                fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="!loadingInsights && filteredInsights.length === 0"
          class="bg-white/80 dark:bg-slate-900/50 backdrop-blur-lg p-12 rounded-xl border border-cyan-500/30 text-center shadow-xl">
          <div class="text-7xl mb-6 flex justify-center">
            <span class="animate-bounce">✨</span>
          </div>
          <h3 class="text-slate-900 dark:text-white text-2xl font-bold font-mono mb-3">ПОКА ЗДЕСЬ ПУСТО</h3>
          <p class="text-slate-600 dark:text-slate-400 mb-6 text-lg">
            Будьте первым, кто поделится вдохновением!
          </p>
          <button @click="openDailySparkModal"
            class="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-3 rounded-lg font-mono font-bold transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]">
            ПОДЕЛИТЬСЯ МЫСЛЬЮ
          </button>
        </div>

        <!-- Load More Button -->
        <div v-if="insights.length >= limit && !loadingInsights" class="flex justify-center mt-10">
          <button @click="loadMore"
            class="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-3 rounded-lg font-mono font-bold transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] flex items-center gap-2">
            <span>ЗАГРУЗИТЬ ЕЩЕ</span>
            <i class="fas fa-chevron-down"></i>
          </button>
        </div>
      </section>

      <!-- Floating Action Button -->
      <div class="fixed bottom-8 right-8 z-50">
        <button @click="openDailySparkModal"
          class="bg-gradient-to-r from-cyan-600 to-purple-600 text-white h-16 w-16 rounded-full shadow-xl hover:shadow-2xl hover:shadow-cyan-500/30 transition-all flex items-center justify-center group transform hover:scale-110"
          title="Добавить новую запись">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <span
            class="absolute right-full mr-4 bg-slate-900 dark:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg pointer-events-none">
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
</style>
