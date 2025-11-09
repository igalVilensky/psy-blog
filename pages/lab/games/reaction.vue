<!-- pages/lab/games/reaction.vue -->
<template>
  <div
    class="reaction-station min-h-screen bg-slate-950 px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
  >
    <div class="max-w-5xl mx-auto">
      <!-- Header Section -->
      <div class="mb-8 sm:mb-12">
        <div class="text-center mb-6 sm:mb-8">
          <h1
            class="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight gradient-text mb-3 sm:mb-4"
          >
            СКОРОСТЬ РЕАКЦИИ
          </h1>
          <p
            class="text-cyan-300/80 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto px-4"
          >
            Измерьте время реакции на визуальный сигнал. 5 попыток. Чем меньше
            миллисекунд — тем лучше!
          </p>
        </div>

        <!-- Session Stats -->
        <div class="flex flex-wrap gap-3 sm:gap-4 justify-center">
          <div class="stat-card flex-1 min-w-[140px] sm:min-w-[160px]">
            <div
              class="text-2xl sm:text-3xl lg:text-4xl font-black text-cyan-400"
            >
              {{ formatTime(avgTime) }}
            </div>
            <div
              class="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 mt-1"
            >
              Среднее
            </div>
          </div>
          <div class="stat-card flex-1 min-w-[140px] sm:min-w-[160px]">
            <div
              class="text-2xl sm:text-3xl lg:text-4xl font-black text-emerald-400"
            >
              {{ formatTime(sessionBest) }}
            </div>
            <div
              class="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 mt-1"
            >
              Лучшее
            </div>
          </div>
          <div class="stat-card flex-1 min-w-[140px] sm:min-w-[160px]">
            <div
              class="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-400"
            >
              {{ times.length }} / {{ maxTrials }}
            </div>
            <div
              class="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 mt-1"
            >
              Попыток
            </div>
          </div>
        </div>
      </div>

      <!-- Instructions Section -->
      <div
        v-if="state === 'instructions'"
        class="text-center space-y-6 sm:space-y-8 max-w-2xl mx-auto mb-12"
      >
        <div class="space-y-4 sm:space-y-6">
          <h2 class="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">
            Как играть:
          </h2>
          <div
            class="grid sm:grid-cols-2 gap-4 text-left max-w-lg mx-auto px-4"
          >
            <div
              class="flex items-start gap-3 p-4 rounded-xl bg-slate-900/40 border border-slate-700/50"
            >
              <div
                class="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold"
              >
                1
              </div>
              <div>
                <div class="font-semibold text-white mb-1">Начните тест</div>
                <div class="text-sm text-slate-400">Нажмите кнопку старта</div>
              </div>
            </div>
            <div
              class="flex items-start gap-3 p-4 rounded-xl bg-slate-900/40 border border-slate-700/50"
            >
              <div
                class="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold"
              >
                2
              </div>
              <div>
                <div class="font-semibold text-white mb-1">Ждите сигнала</div>
                <div class="text-sm text-slate-400">Экран станет зелёным</div>
              </div>
            </div>
            <div
              class="flex items-start gap-3 p-4 rounded-xl bg-slate-900/40 border border-slate-700/50"
            >
              <div
                class="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold"
              >
                3
              </div>
              <div>
                <div class="font-semibold text-white mb-1">Кликните быстро</div>
                <div class="text-sm text-slate-400">
                  Как только увидите зелёный
                </div>
              </div>
            </div>
            <div
              class="flex items-start gap-3 p-4 rounded-xl bg-slate-900/40 border border-slate-700/50"
            >
              <div
                class="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 font-bold"
              >
                !
              </div>
              <div>
                <div class="font-semibold text-white mb-1">Не спешите</div>
                <div class="text-sm text-slate-400">
                  Клик до сигнала — штраф
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          @click="startTest"
          class="btn-primary px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg"
        >
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
            />
          </svg>
          Начать тест
        </button>
      </div>

      <!-- Trial Progress Bar -->
      <div
        v-if="['waiting', 'react', 'feedback'].includes(state)"
        class="mb-6 sm:mb-8"
      >
        <div class="max-w-md mx-auto">
          <div class="flex items-center justify-between mb-3">
            <span class="text-sm sm:text-base font-medium text-slate-300"
              >Попытка {{ times.length + 1 }} из {{ maxTrials }}</span
            >
            <span class="text-sm sm:text-base font-semibold text-cyan-400"
              >{{ Math.round((times.length / maxTrials) * 100) }}%</span
            >
          </div>
          <div class="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              class="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-500 ease-out"
              :style="{ width: `${(times.length / maxTrials) * 100}%` }"
            ></div>
          </div>
        </div>
      </div>

      <!-- Reaction Area -->
      <div v-if="state !== 'instructions'" class="reaction-container mb-8">
        <div
          @click="handleClick"
          @touchstart.prevent="handleClick"
          class="reaction-area relative rounded-2xl sm:rounded-3xl border-4 sm:border-8 transition-all duration-300 flex items-center justify-center overflow-hidden cursor-pointer select-none touch-none"
          :class="areaClasses"
          style="min-height: 50vh"
        >
          <!-- Content -->
          <div
            class="relative z-10 text-center w-full px-4 sm:px-8 py-8 sm:py-12"
          >
            <!-- Waiting State -->
            <div v-if="state === 'waiting'" class="space-y-4 sm:space-y-6">
              <div class="flex justify-center mb-4">
                <div
                  class="w-12 h-12 sm:w-16 sm:h-16 border-4 border-slate-600 border-t-cyan-400 rounded-full animate-spin"
                ></div>
              </div>
              <div
                class="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-200"
              >
                Приготовьтесь...
              </div>
              <p
                class="text-lg sm:text-xl lg:text-2xl text-slate-400 font-medium"
              >
                Ждите зелёного сигнала
              </p>
            </div>

            <!-- React State -->
            <div v-else-if="state === 'react'" class="space-y-4 sm:space-y-6">
              <div
                class="text-4xl sm:text-6xl lg:text-8xl font-black tracking-tight text-white drop-shadow-2xl animate-pulse-fast"
              >
                КЛИК!
              </div>
              <div
                class="text-xl sm:text-2xl lg:text-3xl font-bold text-white/90"
              >
                Нажимайте сейчас!
              </div>
            </div>

            <!-- Feedback State -->
            <div
              v-else-if="state === 'feedback'"
              class="space-y-4 sm:space-y-8"
            >
              <div class="space-y-2 sm:space-y-3">
                <div
                  class="text-5xl sm:text-6xl lg:text-7xl font-black drop-shadow-2xl animate-scale-in"
                  :class="feedbackClass"
                >
                  {{ feedbackText }}
                </div>
                <div
                  class="text-xl sm:text-2xl lg:text-3xl font-bold text-white/90"
                >
                  {{ feedbackMsg }}
                </div>
              </div>
              <!-- Mini improvement tip -->
              <div
                v-if="feedbackTime !== 9999 && feedbackTime > 0"
                class="mt-4 sm:mt-6"
              >
                <div
                  class="inline-block px-4 py-2 rounded-full bg-slate-900/60 border border-slate-700/50 text-xs sm:text-sm text-slate-300"
                >
                  {{ getImprovementTip(feedbackTime) }}
                </div>
              </div>
            </div>

            <!-- Results Preview -->
            <div v-else-if="state === 'results'" class="space-y-6 sm:space-y-8">
              <div class="text-3xl sm:text-4xl font-bold text-emerald-400">
                Тест завершен! 🎉
              </div>
              <p class="text-lg sm:text-xl text-slate-300">
                Смотрите результаты ниже
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Results Section -->
      <div
        v-if="state === 'results'"
        class="mt-8 sm:mt-12 space-y-8 sm:space-y-12"
      >
        <!-- Achievement Badge -->
        <div class="text-center">
          <div
            v-if="newRecord"
            class="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border-2 border-emerald-500/40 px-4 sm:px-6 py-3 sm:py-4 rounded-2xl mb-4 sm:mb-6 animate-scale-in"
          >
            <svg
              class="w-6 h-6 sm:w-8 sm:h-8 text-emerald-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            </svg>
            <span class="text-xl sm:text-2xl font-bold text-emerald-300"
              >Новый рекорд!</span
            >
          </div>
          <h2 class="text-3xl sm:text-4xl font-bold gradient-text mb-2">
            Ваши результаты
          </h2>
          <p class="text-slate-400 text-sm sm:text-base">
            {{ getPerformanceSummary() }}
          </p>
        </div>

        <!-- Main Stats Grid -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          <div class="stat-card-large">
            <div
              class="text-3xl sm:text-4xl lg:text-5xl font-black text-cyan-400"
            >
              {{ formatTime(avgTime) }}
            </div>
            <div
              class="text-xs sm:text-sm uppercase tracking-wider text-slate-400 mt-2"
            >
              Среднее время
            </div>
            <div class="mt-2 text-xs text-slate-500">
              {{ getComparisonText(avgTime) }}
            </div>
          </div>
          <div class="stat-card-large">
            <div
              class="text-3xl sm:text-4xl lg:text-5xl font-black text-emerald-400"
            >
              {{ formatTime(sessionBest) }}
            </div>
            <div
              class="text-xs sm:text-sm uppercase tracking-wider text-slate-400 mt-2"
            >
              Лучшее в серии
            </div>
            <div class="mt-2 text-xs text-slate-500">Ваш пик</div>
          </div>
          <div class="stat-card-large">
            <div
              class="text-3xl sm:text-4xl lg:text-5xl font-black text-purple-400"
            >
              {{ percentile }}
            </div>
            <div
              class="text-xs sm:text-sm uppercase tracking-wider text-slate-400 mt-2"
            >
              Уровень
            </div>
            <div class="mt-2 text-xs text-slate-500">Ваш рейтинг</div>
          </div>
          <div class="stat-card-large">
            <div
              class="text-3xl sm:text-4xl lg:text-5xl font-black text-yellow-400"
            >
              {{ formatTime(personalBest) }}
            </div>
            <div
              class="text-xs sm:text-sm uppercase tracking-wider text-slate-400 mt-2"
            >
              Личный рекорд
            </div>
            <div class="mt-2 text-xs text-slate-500">Всё время</div>
          </div>
        </div>

        <!-- Trials List -->
        <div>
          <h3
            class="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6 flex items-center gap-3 px-2"
          >
            <svg
              class="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path
                fill-rule="evenodd"
                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                clip-rule="evenodd"
              />
            </svg>
            Детали попыток
          </h3>
          <div class="space-y-2 sm:space-y-3">
            <div
              v-for="(time, index) in times"
              :key="index"
              class="flex items-center justify-between p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:border-cyan-500/30 transition-all group"
            >
              <div class="flex items-center gap-3 sm:gap-4">
                <div
                  class="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-700/50 flex items-center justify-center"
                >
                  <span
                    class="text-sm sm:text-base font-bold text-slate-300 group-hover:text-cyan-300 transition-colors"
                  >
                    {{ index + 1 }}
                  </span>
                </div>
                <div>
                  <div
                    class="text-xl sm:text-2xl font-bold"
                    :class="getTimeClass(time)"
                  >
                    {{ formatTime(time) }}
                  </div>
                  <div class="text-xs text-slate-500">
                    {{ getTrialFeedback(time) }}
                  </div>
                </div>
              </div>
              <div
                v-if="time === sessionBest && sessionBest !== Infinity"
                class="flex-shrink-0"
              >
                <svg
                  class="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div
          class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
        >
          <button
            @click="startTest"
            class="btn-primary px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto"
          >
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                clip-rule="evenodd"
              />
            </svg>
            Попробовать снова
          </button>
        </div>
      </div>

      <!-- Reference Norms -->
      <div
        v-if="state !== 'instructions'"
        class="mt-12 sm:mt-16 p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-900/60 to-slate-800/40 border border-cyan-500/20 backdrop-blur-sm"
      >
        <h4
          class="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6 flex items-center gap-2"
        >
          <svg
            class="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
          Нормы и уровни
        </h4>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-sm sm:text-base"
        >
          <div
            class="p-3 sm:p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30"
          >
            <div class="font-bold text-emerald-400 mb-1">&lt; 250 мс</div>
            <div class="text-slate-300">Отличная реакция</div>
            <div class="text-xs text-slate-500 mt-1">Топ 10%</div>
          </div>
          <div
            class="p-3 sm:p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30"
          >
            <div class="font-bold text-cyan-400 mb-1">250-350 мс</div>
            <div class="text-slate-300">Хорошая реакция</div>
            <div class="text-xs text-slate-500 mt-1">Топ 50%</div>
          </div>
          <div
            class="p-3 sm:p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30"
          >
            <div class="font-bold text-yellow-400 mb-1">350-450 мс</div>
            <div class="text-slate-300">Норма</div>
            <div class="text-xs text-slate-500 mt-1">Средний уровень</div>
          </div>
          <div
            class="p-3 sm:p-4 rounded-xl bg-orange-500/10 border border-orange-500/30"
          >
            <div class="font-bold text-orange-400 mb-1">&gt; 450 мс</div>
            <div class="text-slate-300">Есть потенциал</div>
            <div class="text-xs text-slate-500 mt-1">Тренируйтесь!</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

definePageMeta({
  layout: "laboratory",
});

// ===========================
// CONSTANTS
// ===========================
const maxTrials = 5;
const MIN_DELAY = 2000;
const MAX_DELAY = 5000;

// ===========================
// REACTIVE STATE
// ===========================
const state = ref("instructions"); // instructions | waiting | react | feedback | results
const times = ref([]);
const startTime = ref(0);
const feedbackTime = ref(0);
const personalBest = ref(999);
const newRecord = ref(false);
const windowHeight = ref(800);

// ===========================
// UTILITY FUNCTIONS
// ===========================
const randomDelay = (min = MIN_DELAY, max = MAX_DELAY) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const formatTime = (t) => {
  if (t === Infinity || t === 0) return "—";
  if (t === 9999) return "ШТРАФ";
  return Math.round(t) + " мс";
};

// ===========================
// COMPUTED PROPERTIES
// ===========================
const areaHeight = computed(() => {
  const vh = windowHeight.value;
  if (vh < 600) return "50vh";
  if (vh < 800) return "55vh";
  return "60vh";
});

const avgTime = computed(() => {
  if (times.value.length === 0) return 0;
  return Math.round(
    times.value.reduce((a, b) => a + b, 0) / times.value.length
  );
});

const sessionBest = computed(() => {
  if (times.value.length === 0) return Infinity;
  return Math.min(...times.value);
});

const percentile = computed(() => {
  const avg = avgTime.value;
  if (avg <= 200) return "Топ 1%";
  if (avg <= 225) return "Топ 5%";
  if (avg <= 250) return "Топ 10%";
  if (avg <= 300) return "Топ 25%";
  if (avg <= 350) return "Топ 50%";
  return "Топ 75%";
});

const areaClasses = computed(() => ({
  "bg-slate-900/80 border-slate-700/50": [
    "waiting",
    "feedback",
    "results",
  ].includes(state.value),
  "bg-gradient-to-br from-emerald-500 via-emerald-600 to-green-600 border-emerald-400 shadow-2xl shadow-emerald-500/30":
    state.value === "react",
}));

const feedbackText = computed(() => {
  if (feedbackTime.value === 9999) return "РАНО!";
  return formatTime(feedbackTime.value);
});

const feedbackClass = computed(() => {
  if (feedbackTime.value === 9999) return "text-red-400";
  if (feedbackTime.value < 250) return "text-emerald-400";
  if (feedbackTime.value < 350) return "text-cyan-400";
  return "text-yellow-400";
});

const feedbackMsg = computed(() => {
  if (feedbackTime.value === 9999) return "Дождитесь зелёного!";
  if (feedbackTime.value < 200) return "Невероятно! 🔥";
  if (feedbackTime.value < 250) return "Отлично! 🌟";
  if (feedbackTime.value < 300) return "Очень хорошо! ✨";
  if (feedbackTime.value < 350) return "Хорошо! 👍";
  return "Можно быстрее!";
});

// ===========================
// HELPER FUNCTIONS FOR FEEDBACK
// ===========================
const getTimeClass = (time) => {
  if (time < 250) return "text-emerald-400";
  if (time < 350) return "text-cyan-400";
  if (time < 450) return "text-yellow-400";
  return "text-orange-400";
};

const getTrialFeedback = (time) => {
  if (time < 200) return "Невероятно быстро";
  if (time < 250) return "Отличный результат";
  if (time < 350) return "Хорошая скорость";
  if (time < 450) return "Средний результат";
  return "Есть куда расти";
};

const getImprovementTip = (time) => {
  if (time < 250) return "💡 Вы на пике формы!";
  if (time < 350) return "💡 Попробуйте сфокусироваться ещё больше";
  return "💡 Расслабьтесь и концентрируйтесь на центре экрана";
};

const getComparisonText = (avg) => {
  if (avg < 250) return "Как профи!";
  if (avg < 350) return "Выше среднего";
  return "Средний уровень";
};

const getPerformanceSummary = () => {
  const avg = avgTime.value;
  if (avg < 250)
    return "Выдающийся результат! Ваша реакция на уровне спортсменов.";
  if (avg < 350) return "Отличная работа! Вы быстрее большинства людей.";
  if (avg < 450) return "Хороший результат! С тренировкой станет ещё лучше.";
  return "Продолжайте практиковаться для улучшения результатов!";
};

// ===========================
// CORE GAME LOGIC
// ===========================
const handleClick = () => {
  if (state.value === "react") {
    // User clicked during green screen - record time
    const rt = performance.now() - startTime.value;
    times.value.push(rt);
    feedbackTime.value = rt;
    state.value = "feedback";
    setTimeout(nextTrial, 1800);
  } else if (state.value === "waiting") {
    // User clicked too early - penalty
    feedbackTime.value = 9999;
    state.value = "feedback";
    setTimeout(nextTrial, 2200);
  }
};

const nextTrial = () => {
  if (times.value.length >= maxTrials) {
    // All trials completed - show results
    state.value = "results";
    const avg = avgTime.value;
    newRecord.value = avg > 0 && avg < personalBest.value;
    if (newRecord.value) {
      personalBest.value = avg;
      localStorage.setItem("mindq_reaction_best", avg);
    }
    return;
  }

  // Start next trial
  state.value = "waiting";
  const delay = randomDelay();
  setTimeout(() => {
    if (state.value === "waiting") {
      state.value = "react";
      startTime.value = performance.now();
    }
  }, delay);
};

const startTest = () => {
  times.value = [];
  state.value = "waiting";
  newRecord.value = false;
  nextTrial();
};

// ===========================
// LIFECYCLE HOOKS
// ===========================
const handleResize = () => {
  windowHeight.value = window.innerHeight;
};

onMounted(() => {
  // Load personal best from localStorage
  const saved = localStorage.getItem("mindq_reaction_best");
  if (saved) {
    personalBest.value = Number(saved);
  }

  // Setup resize listener for responsive height
  windowHeight.value = window.innerHeight;
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
/* ===========================
   CORE STYLES & UTILITIES
   =========================== */

.gradient-text {
  background: linear-gradient(135deg, #06b6d4 0%, #a855f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
}

/* ===========================
   STAT CARDS
   =========================== */

.stat-card {
  @apply text-center px-4 py-3 sm:px-6 sm:py-4 
         rounded-xl sm:rounded-2xl 
         bg-slate-900/60 border border-cyan-500/20 
         backdrop-blur-sm 
         transition-all duration-300
         hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/10;
}

.stat-card-large {
  @apply text-center px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8 
         rounded-xl sm:rounded-2xl 
         bg-slate-900/60 border border-cyan-500/20 
         backdrop-blur-sm 
         transition-all duration-300
         hover:border-cyan-500/40 hover:bg-slate-900/80
         hover:shadow-lg hover:shadow-cyan-500/10
         hover:-translate-y-0.5;
}

/* ===========================
   BUTTONS
   =========================== */

.btn-primary {
  @apply inline-flex items-center justify-center 
         px-6 py-3 rounded-xl 
         bg-gradient-to-r from-cyan-500 to-purple-500 
         text-white font-semibold 
         hover:from-cyan-600 hover:to-purple-600 
         transition-all duration-300 
         transform hover:scale-105 active:scale-95
         shadow-lg shadow-cyan-500/25 
         hover:shadow-xl hover:shadow-cyan-500/40
         disabled:opacity-50 disabled:cursor-not-allowed 
         disabled:hover:scale-100 disabled:hover:shadow-lg;
}

.btn-secondary {
  @apply inline-flex items-center justify-center 
         px-6 py-3 rounded-xl 
         bg-slate-800/50 border border-slate-600/50 
         text-slate-300 font-semibold 
         hover:bg-slate-700 hover:border-slate-400 
         transition-all duration-300 
         transform hover:scale-105 active:scale-95;
}

/* ===========================
   REACTION AREA
   =========================== */

.reaction-area {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform, background-color, border-color;
}

.reaction-area:active {
  transform: scale(0.98);
}

/* Prevent text selection and improve touch */
.reaction-area,
.reaction-area * {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-touch-callout: none;
}

/* ===========================
   ANIMATIONS
   =========================== */

/* Scale in animation for feedback */
@keyframes scale-in {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-scale-in {
  animation: scale-in 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Fast pulse for "КЛИК!" text */
@keyframes pulse-fast {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.02);
  }
}

.animate-pulse-fast {
  animation: pulse-fast 0.8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Smooth fade in */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.4s ease-out;
}

/* ===========================
   MOBILE OPTIMIZATIONS
   =========================== */

@media (max-width: 640px) {
  /* Remove tap highlight on mobile */
  .reaction-station {
    -webkit-tap-highlight-color: transparent;
  }

  /* Improve touch target sizes */
  .btn-primary,
  .btn-secondary {
    min-height: 48px;
    min-width: 48px;
  }

  /* Optimize reaction area for touch */
  .reaction-area {
    min-height: 50vh;
    touch-action: manipulation;
  }
}

/* ===========================
   TABLET OPTIMIZATIONS
   =========================== */

@media (min-width: 641px) and (max-width: 1024px) {
  .stat-card {
    padding: 1.25rem 1.5rem;
  }

  .stat-card-large {
    padding: 1.5rem 2rem;
  }
}

/* ===========================
   PERFORMANCE OPTIMIZATIONS
   =========================== */

/* GPU acceleration for animated elements */
.reaction-area,
.stat-card,
.stat-card-large,
.btn-primary {
  transform: translateZ(0);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

/* Smooth scrolling */
@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}

/* Respect reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* ===========================
   FOCUS STATES (Accessibility)
   =========================== */

.btn-primary:focus-visible,
.btn-secondary:focus-visible {
  @apply outline-none ring-2 ring-cyan-400 ring-offset-2 ring-offset-slate-950;
}

.reaction-area:focus-visible {
  @apply outline-none ring-4 ring-cyan-400/50;
}

/* ===========================
   PRINT STYLES
   =========================== */

@media print {
  .reaction-area {
    display: none;
  }

  .btn-primary,
  .btn-secondary {
    display: none;
  }
}

/* ===========================
   HIGH CONTRAST MODE
   =========================== */

@media (prefers-contrast: high) {
  .stat-card,
  .stat-card-large {
    border-width: 2px;
  }

  .btn-primary {
    border: 2px solid currentColor;
  }
}

/* ===========================
   DARK MODE ADJUSTMENTS
   =========================== */

@media (prefers-color-scheme: dark) {
  .gradient-text {
    filter: brightness(1.1);
  }
}
</style>
