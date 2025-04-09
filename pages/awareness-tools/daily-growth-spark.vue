<template>
  <div
    class="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-gray-100"
  >
    <div class="max-w-6xl mx-auto py-12 px-6 xl:px-0">
      <!-- Header Section with Improved Typography and Animation -->
      <div class="text-center mb-12">
        <div class="flex justify-center mb-4">
          <div class="relative">
            <div
              class="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-75 blur-lg"
            ></div>
            <div class="relative bg-gray-900 rounded-full p-3">
              <svg
                class="h-8 w-8 text-indigo-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 9.143l-5.714 2.714L13 21l-2.286-6.857L5 11.143l5.714-2.714L13 3z"
                />
              </svg>
            </div>
          </div>
        </div>
        <h1
          class="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 tracking-tight"
        >
          Ежедневная искра роста
        </h1>
        <p class="text-gray-300 max-w-2xl mx-auto text-lg">
          Отслеживайте свой прогресс, вдохновляйтесь сообществом и делитесь
          своими открытиями каждый день!
        </p>
      </div>

      <!-- Daily Growth Summary with Improved Card Design -->
      <section class="daily-spark relative overflow-hidden rounded-2xl mb-16">
        <div class="absolute inset-0">
          <div
            class="absolute top-0 right-0 w-1/2 h-1/2 bg-indigo-600 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3 opacity-10"
          ></div>
          <div
            class="absolute bottom-0 left-0 w-1/2 h-1/2 bg-emerald-600 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3 opacity-10"
          ></div>
        </div>

        <div
          class="relative z-10 bg-gray-900/60 backdrop-blur-xl p-8 sm:p-10 rounded-2xl border border-gray-700 shadow-xl"
        >
          <!-- Loading State with Improved Animation -->
          <div
            v-if="loadingStats"
            class="flex flex-col items-center gap-4 py-12"
          >
            <div class="relative">
              <div
                class="h-16 w-16 rounded-full border-t-2 border-b-2 border-l-2 border-indigo-500 animate-spin"
              ></div>
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="h-10 w-10 rounded-full bg-gray-900"></div>
              </div>
            </div>
            <p class="text-indigo-300 text-lg font-medium">
              Загрузка данных...
            </p>
          </div>

          <!-- No Data State with More Visual Appeal -->
          <div
            v-else-if="!user || !hasData"
            class="text-center space-y-8 py-12"
          >
            <div class="flex justify-center">
              <div class="relative">
                <div
                  class="absolute -inset-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-20 blur-xl animate-pulse"
                ></div>
                <svg
                  class="h-20 w-20 text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
            </div>
            <h3
              class="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent"
            >
              Начните свой путь роста
            </h3>
            <p class="text-xl text-gray-300 max-w-2xl mx-auto">
              {{
                user
                  ? "Вы еще не начали свой путь роста. Попробуйте прямо сейчас!"
                  : "Войдите, чтобы начать свой путь роста!"
              }}
            </p>
            <div class="flex justify-center gap-4">
              <button
                v-if="!user"
                class="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-medium rounded-xl hover:from-indigo-500 hover:to-purple-500 transition-all shadow-md hover:shadow-lg hover:shadow-indigo-500/20 flex items-center gap-2 transform hover:-translate-y-1"
                @click="redirectToLogin"
              >
                <svg
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                Войти
              </button>
              <button
                v-else
                class="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-medium rounded-xl hover:from-indigo-500 hover:to-purple-500 transition-all shadow-md hover:shadow-lg hover:shadow-indigo-500/20 flex items-center gap-2 transform hover:-translate-y-1"
                @click="openDailySparkModal"
              >
                <svg
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Начать
              </button>
            </div>
          </div>

          <!-- Data Display with Enhanced Visual Design -->
          <div v-else class="space-y-8">
            <div class="flex items-center justify-center gap-3 mb-2">
              <div class="h-2 w-2 rounded-full bg-indigo-500"></div>
              <h3
                class="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
              >
                Ваш прогресс
              </h3>
              <div class="h-2 w-2 rounded-full bg-indigo-500"></div>
            </div>

            <!-- Stats Grid with Improved Cards -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <!-- Entries Card -->
              <div
                class="bg-gradient-to-br from-indigo-900/80 to-indigo-800/40 backdrop-blur-sm rounded-xl p-6 border border-indigo-700/40 hover:border-indigo-500/70 transition-all shadow-lg group transform hover:-translate-y-1 hover:shadow-indigo-500/20"
              >
                <div class="flex items-center mb-4">
                  <div
                    class="p-3 bg-indigo-500/30 rounded-lg mr-4 group-hover:bg-indigo-500/40 transition-all"
                  >
                    <svg
                      class="h-6 w-6 text-indigo-300 group-hover:text-indigo-200 transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h4
                    class="font-semibold text-indigo-200 group-hover:text-indigo-100 transition-colors text-lg"
                  >
                    Записей
                  </h4>
                </div>
                <p
                  class="text-4xl font-bold text-white group-hover:text-indigo-100 transition-colors"
                >
                  {{ stats.totalEntries }}
                </p>
              </div>

              <!-- Streak Card -->
              <div
                class="bg-gradient-to-br from-amber-900/80 to-amber-800/40 backdrop-blur-sm rounded-xl p-6 border border-amber-700/40 hover:border-amber-500/70 transition-all shadow-lg group transform hover:-translate-y-1 hover:shadow-amber-500/20"
              >
                <div class="flex items-center mb-4">
                  <div
                    class="p-3 bg-amber-500/30 rounded-lg mr-4 group-hover:bg-amber-500/40 transition-all"
                  >
                    <svg
                      class="h-6 w-6 text-amber-300 group-hover:text-amber-200 transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                  <h4
                    class="font-semibold text-amber-200 group-hover:text-amber-100 transition-colors text-lg"
                  >
                    Серия
                  </h4>
                </div>
                <p
                  class="text-4xl font-bold text-white group-hover:text-amber-100 transition-colors"
                >
                  {{ stats.longestStreak }}
                </p>
              </div>

              <!-- Points Card -->
              <div
                class="bg-gradient-to-br from-emerald-900/80 to-emerald-800/40 backdrop-blur-sm rounded-xl p-6 border border-emerald-700/40 hover:border-emerald-500/70 transition-all shadow-lg group transform hover:-translate-y-1 hover:shadow-emerald-500/20"
              >
                <div class="flex items-center mb-4">
                  <div
                    class="p-3 bg-emerald-500/30 rounded-lg mr-4 group-hover:bg-emerald-500/40 transition-all"
                  >
                    <svg
                      class="h-6 w-6 text-emerald-300 group-hover:text-emerald-200 transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.519-4.674z"
                      />
                    </svg>
                  </div>
                  <h4
                    class="font-semibold text-emerald-200 group-hover:text-emerald-100 transition-colors text-lg"
                  >
                    Очки
                  </h4>
                </div>
                <p
                  class="text-4xl font-bold text-white group-hover:text-emerald-100 transition-colors"
                >
                  {{ stats.totalPoints }}
                </p>
              </div>

              <!-- Energy Card -->
              <div
                class="bg-gradient-to-br from-purple-900/80 to-purple-800/40 backdrop-blur-sm rounded-xl p-6 border border-purple-700/40 hover:border-purple-500/70 transition-all shadow-lg group transform hover:-translate-y-1 hover:shadow-purple-500/20"
              >
                <div class="flex items-center mb-4">
                  <div
                    class="p-3 bg-purple-500/30 rounded-lg mr-4 group-hover:bg-purple-500/40 transition-all"
                  >
                    <svg
                      class="h-6 w-6 text-purple-300 group-hover:text-purple-200 transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 9.143l-5.714 2.714L13 21l-2.286-6.857L5 11.143l5.714-2.714L13 3z"
                      />
                    </svg>
                  </div>
                  <h4
                    class="font-semibold text-purple-200 group-hover:text-purple-100 transition-colors text-lg"
                  >
                    Энергия
                  </h4>
                </div>
                <div class="flex items-center gap-3">
                  <span class="text-4xl">{{
                    getEnergyEmoji(stats.averageEnergyLevel)
                  }}</span>
                  <div>
                    <p class="text-2xl font-bold text-white">
                      {{ stats.averageEnergyLevel.toFixed(1) }}
                    </p>
                    <p class="text-purple-300 text-xs">Средний уровень</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="text-center pt-4">
              <button
                @click="openDailySparkModal"
                class="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-medium rounded-xl hover:from-indigo-500 hover:to-purple-500 transition-all shadow-md hover:shadow-lg hover:shadow-indigo-500/20 flex items-center gap-2 mx-auto transform hover:-translate-y-1"
              >
                <svg
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Продолжить рост
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Shared Insights Section with Improved UI -->
      <section class="mb-16">
        <div class="flex items-center justify-center gap-3 mb-8">
          <div
            class="h-1 w-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
          ></div>
          <h2 class="text-3xl font-bold text-white text-center">
            Вдохновение от сообщества
          </h2>
          <div
            class="h-1 w-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
          ></div>
        </div>

        <!-- Category Filters with Improved UI -->
        <div class="flex flex-wrap gap-3 mb-10 justify-center">
          <button
            v-for="category in categories"
            :key="category"
            @click="selectedCategory = category"
            :class="[
              'px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 transform',
              selectedCategory === category
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20 scale-105'
                : 'bg-gray-800/70 text-gray-300 border border-gray-700 hover:border-indigo-500/50 hover:bg-gray-700/80 hover:scale-105',
            ]"
          >
            {{ category }}
          </button>
        </div>

        <!-- Loading State with Improved Animation -->
        <div
          v-if="loadingInsights"
          class="flex flex-col items-center justify-center py-16"
        >
          <div class="relative mb-6">
            <div
              class="h-16 w-16 rounded-full border-t-2 border-r-2 border-indigo-500 animate-spin"
            ></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <div
                class="h-10 w-10 rounded-full bg-gray-900 flex items-center justify-center"
              >
                <div
                  class="h-6 w-6 rounded-full bg-indigo-500 animate-pulse"
                ></div>
              </div>
            </div>
          </div>
          <p class="text-indigo-300 font-medium text-lg">
            Загружаем вдохновение...
          </p>
        </div>

        <!-- Insights Grid with Improved Card Design -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            v-for="insight in filteredInsights"
            :key="insight.id"
            class="bg-gray-900/50 backdrop-blur-md p-6 rounded-xl border border-gray-800 hover:border-indigo-500/50 shadow-lg hover:shadow-xl hover:shadow-indigo-900/20 transition-all duration-300 transform hover:scale-102 hover:-translate-y-1"
          >
            <div class="flex items-start mb-5">
              <div
                :style="`background-color: ${generateAvatarColor(
                  insight.displayName || 'Anonymous'
                )}`"
                class="h-12 w-12 rounded-full flex items-center justify-center text-white text-lg font-bold mr-4 shadow-md"
              >
                {{
                  (insight.isAnonymous
                    ? "A"
                    : insight.displayName?.[0] || "U"
                  ).toUpperCase()
                }}
              </div>
              <div class="flex-grow">
                <p class="text-gray-200 font-medium">
                  {{
                    insight.isAnonymous
                      ? "Анонимно"
                      : insight.displayName || "Пользователь"
                  }}
                </p>
                <p class="text-xs text-gray-500">
                  {{ formatDate(insight.timestamp) }}
                </p>
              </div>
              <span
                class="ml-auto px-3 py-1 rounded-full text-xs font-medium bg-gray-800 text-indigo-300 border border-indigo-900/50 shadow-sm"
              >
                {{ insight.category }}
              </span>
            </div>
            <div class="relative">
              <svg
                class="absolute -top-4 -left-2 h-8 w-8 text-indigo-500/20"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"
                />
              </svg>
              <p
                class="text-white text-lg font-light italic leading-relaxed px-2 pt-2"
              >
                {{ insight.text }}
              </p>
              <svg
                class="absolute -bottom-4 -right-2 h-8 w-8 text-indigo-500/20 transform rotate-180"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"
                />
              </svg>
            </div>
          </div>
        </div>

        <!-- Empty State with Improved Visual Design -->
        <div
          v-if="!loadingInsights && filteredInsights.length === 0"
          class="bg-gray-900/60 backdrop-blur-lg p-12 rounded-xl border border-gray-800 text-center shadow-xl"
        >
          <div class="relative">
            <div
              class="absolute -inset-10 rounded-full bg-indigo-500/10 blur-3xl"
            ></div>
            <div class="relative text-7xl mb-6 flex justify-center">
              <span class="animate-bounce">✨</span>
            </div>
          </div>
          <h3 class="text-white text-2xl font-bold mb-3">Пока здесь пусто</h3>
          <p class="text-gray-300 mb-6 text-lg">
            Будьте первым, кто поделится вдохновением!
          </p>
          <button
            @click="openDailySparkModal"
            class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-500 hover:to-purple-500 transition-all font-medium shadow-lg hover:shadow-indigo-500/20 transform hover:-translate-y-1"
          >
            Поделиться мыслью
          </button>
        </div>

        <!-- Load More Button with Improved Design -->
        <div
          v-if="insights.length >= limit && !loadingInsights"
          class="flex justify-center mt-10"
        >
          <button
            @click="loadMore"
            class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-500 hover:to-purple-500 transition-all font-medium flex items-center gap-2 shadow-lg hover:shadow-indigo-500/20 transform hover:-translate-y-1"
          >
            <span>Загрузить еще</span>
            <svg
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <polyline points="19 12 12 19 5 12"></polyline>
            </svg>
          </button>
        </div>
      </section>

      <!-- Floating Action Button with Enhanced Animation and Accessibility -->
      <div class="fixed bottom-8 right-8 z-50">
        <button
          @click="openDailySparkModal"
          class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white h-16 w-16 rounded-full shadow-xl hover:shadow-2xl hover:shadow-indigo-500/30 transition-all flex items-center justify-center group transform hover:scale-110"
          title="Добавить новую запись"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <span
            class="absolute right-full mr-4 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg pointer-events-none"
          >
            Новая запись
          </span>
        </button>
      </div>
    </div>
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
