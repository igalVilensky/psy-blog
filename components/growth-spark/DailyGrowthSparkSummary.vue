<template>
  <section
    class="daily-spark relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl max-w-6xl mx-auto mb-12"
  >
    <!-- Background subtle pattern -->
    <div class="absolute inset-0 opacity-10">
      <div
        class="absolute top-0 right-0 w-1/2 h-1/2 bg-indigo-500 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"
      ></div>
      <div
        class="absolute bottom-0 left-0 w-1/2 h-1/2 bg-emerald-500 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"
      ></div>
    </div>

    <div class="relative z-10 bg-white/5 backdrop-blur-lg p-6 sm:p-8">
      <!-- Loading State -->
      <div v-if="loading" class="flex flex-col items-center gap-3">
        <svg
          class="animate-spin h-10 w-10 text-indigo-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
          ></path>
        </svg>
        <p class="text-slate-300 text-base font-medium">Загрузка данных...</p>
      </div>

      <!-- No Data State -->
      <div v-else-if="!user || !hasData" class="text-center space-y-6">
        <h3
          class="text-2xl sm:text-3xl font-bold text-white bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
        >
          Ежедневная искра роста
        </h3>
        <p class="text-lg text-slate-300 max-w-2xl mx-auto">
          {{
            user
              ? "Вы еще не начали свой путь роста. Попробуйте прямо сейчас!"
              : "Войдите, чтобы начать свой путь роста!"
          }}
        </p>
        <div class="flex justify-center gap-4">
          <Button
            v-if="!user"
            text="Войти"
            iconClass="fas fa-sign-in-alt"
            customClass="px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-medium rounded-lg hover:from-indigo-500 hover:to-indigo-600 transition-all shadow-md hover:shadow-lg flex items-center"
            :isLink="true"
            to="/login"
          />
          <Button
            v-else
            text="Начать"
            iconClass="fas fa-play"
            customClass="px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-medium rounded-lg hover:from-indigo-500 hover:to-indigo-600 transition-all shadow-md hover:shadow-lg flex items-center"
            :isLink="false"
            @click="startDailySpark"
          />
        </div>
      </div>

      <!-- Data Display -->
      <div v-else class="space-y-8">
        <h3
          class="text-2xl sm:text-3xl font-bold text-white text-center bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
        >
          Ваш прогресс в Ежедневной искре роста
        </h3>

        <!-- Stats Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div
            class="bg-gradient-to-br from-indigo-900/60 to-indigo-800/40 backdrop-blur-sm rounded-xl p-5 border border-indigo-700/30 hover:border-indigo-500/50 transition-all shadow-lg group"
          >
            <div class="flex items-center mb-3">
              <div class="p-2 bg-indigo-500/20 rounded-lg mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-indigo-400"
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
                class="font-semibold text-indigo-300 group-hover:text-indigo-200 transition-colors"
              >
                Всего записей
              </h4>
            </div>
            <p
              class="text-3xl font-bold text-white group-hover:text-indigo-200 transition-colors"
            >
              {{ stats.totalEntries }}
            </p>
          </div>

          <div
            class="bg-gradient-to-br from-amber-900/60 to-amber-800/40 backdrop-blur-sm rounded-xl p-5 border border-amber-700/30 hover:border-amber-500/50 transition-all shadow-lg group"
          >
            <div class="flex items-center mb-3">
              <div class="p-2 bg-amber-500/20 rounded-lg mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-amber-400"
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
                class="font-semibold text-amber-300 group-hover:text-amber-200 transition-colors"
              >
                Серия дней
              </h4>
            </div>
            <p
              class="text-3xl font-bold text-white group-hover:text-amber-200 transition-colors"
            >
              {{ stats.longestStreak }}
            </p>
          </div>

          <div
            class="bg-gradient-to-br from-emerald-900/60 to-emerald-800/40 backdrop-blur-sm rounded-xl p-5 border border-emerald-700/30 hover:border-emerald-500/50 transition-all shadow-lg group"
          >
            <div class="flex items-center mb-3">
              <div class="p-2 bg-emerald-500/20 rounded-lg mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-emerald-400"
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
                class="font-semibold text-emerald-300 group-hover:text-emerald-200 transition-colors"
              >
                Очки
              </h4>
            </div>
            <p
              class="text-3xl font-bold text-white group-hover:text-emerald-200 transition-colors"
            >
              {{ stats.totalPoints }}
            </p>
          </div>
        </div>

        <!-- Energy Level -->
        <div
          class="bg-gradient-to-br from-purple-900/60 to-purple-800/40 backdrop-blur-sm rounded-xl p-5 border border-purple-700/30 hover:border-purple-500/50 transition-all shadow-lg group"
        >
          <div class="flex items-center mb-3">
            <div class="p-2 bg-purple-500/20 rounded-lg mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-purple-400"
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
              class="font-semibold text-purple-300 group-hover:text-purple-200 transition-colors"
            >
              Средний уровень энергии
            </h4>
          </div>
          <div class="flex items-center justify-center gap-2">
            <span class="text-2xl">{{
              getEnergyEmoji(stats.averageEnergyLevel)
            }}</span>
            <p class="text-white/80 text-sm">
              {{ stats.averageEnergyLevel.toFixed(1) }} / 10 -
              {{ getEnergyFeedback(stats.averageEnergyLevel) }}
            </p>
          </div>
        </div>

        <!-- Call to Action -->
        <div class="text-center">
          <Button
            text="Продолжить рост"
            iconClass="fas fa-arrow-right"
            customClass="px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-medium rounded-lg hover:from-indigo-500 hover:to-indigo-600 transition-all shadow-md hover:shadow-lg flex items-center mx-auto"
            :isLink="false"
            @click="startDailySpark"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDailyGrowthSparkStats } from "~/api/firebase/dailyGrowthSpark";
import Button from "~/components/base/Button.vue";

const auth = getAuth();
const db = getFirestore();
const user = ref(null);
const stats = ref(null);
const loading = ref(true);

// Computed property to check if there's data
const hasData = computed(() => {
  return stats.value && stats.value.totalEntries > 0;
});

// Fetch stats from Firebase
const fetchStats = async (userId) => {
  loading.value = true;
  const response = await getDailyGrowthSparkStats(db, userId);
  if (response.success) {
    stats.value = response.stats;
  } else {
    stats.value = null;
  }
  loading.value = false;
};

// Energy level helpers
const getEnergyEmoji = (level) => {
  if (level <= 2) return "😴";
  if (level <= 4) return "😌";
  if (level <= 6) return "😊";
  if (level <= 8) return "😃";
  return "🤩";
};

const getEnergyFeedback = (level) => {
  if (level <= 3) return "Низкая энергия";
  if (level <= 7) return "Стабильная энергия";
  return "Высокая энергия";
};

// Start Daily Spark action
const startDailySpark = () => {
  console.log("Starting Daily Growth Spark...");
  // Adjust this based on your app's structure (e.g., emit event or trigger modal)
};

// Authentication state listener
onMounted(() => {
  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser;
    if (currentUser) {
      fetchStats(currentUser.uid);
    } else {
      loading.value = false;
    }
  });
});
</script>
