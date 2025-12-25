<!-- pages/space/games/stroop.vue -->
<template>
  <div
    class="stroop-game min-h-screen bg-slate-50 dark:bg-slate-950 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 transition-colors duration-500"
  >
    <div class="max-w-5xl mx-auto">
      <!-- Header -->
      <div class="mb-8 sm:mb-12">
        <div class="text-center mb-6 sm:mb-8">
          <h1
            class="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-3 sm:mb-4 gradient-text"
          >
            ТЕСТ СТРУПА
          </h1>
          <p
            class="text-slate-600 dark:text-cyan-300/80 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto px-4"
          >
            Выберите ЦВЕТ текста, а не то, что написано. Тренируйте когнитивную
            гибкость!
          </p>
        </div>

        <!-- Stats -->
        <div class="flex flex-wrap gap-3 sm:gap-4 justify-center">
          <div class="stat-card flex-1 min-w-[120px] sm:min-w-[140px]">
            <div
              class="text-2xl sm:text-3xl lg:text-4xl font-black text-cyan-600 dark:text-cyan-400"
            >
              {{ score }}
            </div>
            <div
              class="text-[10px] sm:text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1"
            >
              Очки
            </div>
          </div>
          <div class="stat-card flex-1 min-w-[120px] sm:min-w-[140px]">
            <div
              class="text-2xl sm:text-3xl lg:text-4xl font-black text-emerald-600 dark:text-emerald-400"
            >
              {{ correct }}
            </div>
            <div
              class="text-[10px] sm:text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1"
            >
              Верно
            </div>
          </div>
          <div class="stat-card flex-1 min-w-[120px] sm:min-w-[140px]">
            <div
              class="text-2xl sm:text-3xl lg:text-4xl font-black text-red-600 dark:text-red-400"
            >
              {{ incorrect }}
            </div>
            <div
              class="text-[10px] sm:text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1"
            >
              Ошибки
            </div>
          </div>
          <div class="stat-card flex-1 min-w-[120px] sm:min-w-[140px]">
            <div
              class="text-2xl sm:text-3xl lg:text-4xl font-black text-purple-600 dark:text-purple-400"
            >
              {{ timeLeft }}
            </div>
            <div
              class="text-[10px] sm:text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1"
            >
              Секунд
            </div>
          </div>
        </div>
      </div>

      <!-- Instructions -->
      <div
        v-if="state === 'instructions'"
        class="text-center space-y-6 sm:space-y-8 max-w-2xl mx-auto"
      >
        <div class="space-y-4 sm:space-y-6">
          <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6">
            Как играть:
          </h2>

          <div
            class="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-cyan-500/20 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-sm dark:shadow-none"
          >
            <div class="space-y-4">
              <div class="flex items-start gap-4">
                <div
                  class="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-500/20 flex items-center justify-center"
                >
                  <span class="text-2xl">👁️</span>
                </div>
                <div class="text-left">
                  <div class="font-semibold text-slate-900 dark:text-white mb-1">
                    Смотрите на слово
                  </div>
                  <div class="text-sm text-slate-600 dark:text-slate-400">
                    Вы увидите название цвета
                  </div>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div
                  class="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center"
                >
                  <span class="text-2xl">🎨</span>
                </div>
                <div class="text-left">
                  <div class="font-semibold text-slate-900 dark:text-white mb-1">
                    Определите цвет
                  </div>
                  <div class="text-sm text-slate-600 dark:text-slate-400">
                    Нажмите кнопку с ЦВЕТОМ текста (не со значением слова!)
                  </div>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div
                  class="flex-shrink-0 w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center"
                >
                  <span class="text-2xl">⚡</span>
                </div>
                <div class="text-left">
                  <div class="font-semibold text-slate-900 dark:text-white mb-1">
                    Играйте на время
                  </div>
                  <div class="text-sm text-slate-600 dark:text-slate-400">
                    60 секунд — успейте набрать максимум очков!
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Example -->
          <div
            class="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/60 dark:to-slate-800/40 border border-yellow-500/30 rounded-2xl p-6 sm:p-8 shadow-sm dark:shadow-none"
          >
            <div class="text-sm text-yellow-600 dark:text-yellow-300/90 mb-4 font-semibold">
              Пример:
            </div>
            <div class="space-y-4">
              <div>
                <div class="text-lg sm:text-xl text-slate-600 dark:text-slate-300 mb-2">
                  Если видите:
                </div>
                <div class="text-4xl sm:text-5xl font-black text-red-600 dark:text-red-500 mb-3">
                  СИНИЙ
                </div>
                <div
                  class="text-base sm:text-lg text-emerald-600 dark:text-emerald-400 font-semibold"
                >
                  ✓ Нажмите КРАСНЫЙ (цвет текста)
                </div>
                <div class="text-sm sm:text-base text-red-600/80 dark:text-red-400/80 mt-1">
                  ✗ Не нажимайте СИНИЙ (значение слова)
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          @click="startGame"
          class="btn-primary px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg"
        >
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
            />
          </svg>
          Начать игру
        </button>
      </div>

      <!-- Game Area -->
      <div v-if="state === 'playing'" class="space-y-6 sm:space-y-8">
        <!-- Progress Bar -->
        <div class="max-w-md mx-auto">
          <div class="flex items-center justify-between mb-3">
            <span class="text-sm sm:text-base font-medium text-slate-600 dark:text-slate-300"
              >Прогресс</span
            >
            <span class="text-sm sm:text-base font-semibold text-cyan-600 dark:text-cyan-400"
              >{{ Math.round((timeLeft / gameDuration) * 100) }}%</span
            >
          </div>
          <div class="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              class="h-full transition-all duration-1000 ease-linear"
              :class="
                timeLeft <= 10
                  ? 'bg-gradient-to-r from-red-500 to-orange-500'
                  : 'bg-gradient-to-r from-cyan-500 to-purple-500'
              "
              :style="{ width: `${(timeLeft / gameDuration) * 100}%` }"
            ></div>
          </div>
        </div>

        <!-- Word Display -->
        <div class="game-card max-w-2xl mx-auto">
          <div class="text-center py-12 sm:py-16 lg:py-20">
            <div
              class="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight select-none transition-all duration-300"
              :style="{ color: currentColor }"
              :class="{ 'animate-pulse-once': showFeedback }"
            >
              {{ currentWord }}
            </div>

            <!-- Feedback overlay -->
            <div v-if="showFeedback" class="mt-6 sm:mt-8">
              <div
                class="inline-block px-6 py-3 rounded-full font-bold text-lg sm:text-xl animate-scale-in"
                :class="
                  lastCorrect
                    ? 'bg-emerald-100 dark:bg-emerald-500/20 border-2 border-emerald-500/50 text-emerald-700 dark:text-emerald-300'
                    : 'bg-red-100 dark:bg-red-500/20 border-2 border-red-500/50 text-red-700 dark:text-red-300'
                "
              >
                {{ lastCorrect ? "✓ Верно!" : "✗ Ошибка!" }}
              </div>
            </div>
          </div>
        </div>

        <!-- Color Buttons -->
        <div
          class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto"
        >
          <button
            v-for="color in colorOptions"
            :key="color.name"
            @click="checkAnswer(color.name)"
            class="color-btn group"
            :style="{
              backgroundColor: color.value + '20',
              borderColor: color.value + '60',
            }"
          >
            <div
              class="w-8 h-8 sm:w-10 sm:h-10 rounded-full mb-2 sm:mb-3 mx-auto transition-transform group-hover:scale-110"
              :style="{ backgroundColor: color.value }"
            ></div>
            <div class="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              {{ color.label }}
            </div>
          </button>
        </div>

        <!-- Hint -->
        <div class="text-center">
          <div
            class="inline-block px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/50 text-xs sm:text-sm text-slate-600 dark:text-slate-400"
          >
            💡 Совет: Фокусируйтесь на цвете, а не на значении слова
          </div>
        </div>
      </div>

      <!-- Results -->
      <div v-if="state === 'results'" class="space-y-8 sm:space-y-12">
        <div class="text-center">
          <div class="mb-6">
            <div
              class="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 dark:from-emerald-500/20 dark:to-cyan-500/20 border-2 border-emerald-500/40 px-4 sm:px-6 py-3 sm:py-4 rounded-2xl animate-scale-in"
            >
              <svg
                class="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600 dark:text-emerald-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="text-2xl sm:text-3xl font-bold text-emerald-700 dark:text-emerald-300"
                >Игра завершена!</span
              >
            </div>
          </div>
          <h2 class="text-3xl sm:text-4xl font-bold gradient-text mb-2">
            Ваши результаты
          </h2>
          <p class="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            {{ getPerformanceMessage() }}
          </p>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div class="stat-card-large">
            <div class="text-4xl sm:text-5xl font-black text-cyan-600 dark:text-cyan-400">
              {{ score }}
            </div>
            <div
              class="text-xs sm:text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-2"
            >
              Итоговый счет
            </div>
            <div class="mt-2 text-xs text-slate-500 dark:text-slate-500">
              {{ getScoreRating() }}
            </div>
          </div>

          <div class="stat-card-large">
            <div class="text-4xl sm:text-5xl font-black text-emerald-600 dark:text-emerald-400">
              {{ correct }}
            </div>
            <div
              class="text-xs sm:text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-2"
            >
              Правильно
            </div>
            <div class="mt-2 text-xs text-slate-500 dark:text-slate-500">
              {{ accuracy }}% точность
            </div>
          </div>

          <div class="stat-card-large">
            <div class="text-4xl sm:text-5xl font-black text-red-600 dark:text-red-400">
              {{ incorrect }}
            </div>
            <div
              class="text-xs sm:text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-2"
            >
              Ошибок
            </div>
            <div class="mt-2 text-xs text-slate-500 dark:text-slate-500">
              Всего попыток: {{ totalAttempts }}
            </div>
          </div>

          <div class="stat-card-large">
            <div class="text-4xl sm:text-5xl font-black text-purple-600 dark:text-purple-400">
              {{ avgResponseTime }}
            </div>
            <div
              class="text-xs sm:text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-2"
            >
              Среднее время
            </div>
            <div class="mt-2 text-xs text-slate-500 dark:text-slate-500">мс на ответ</div>
          </div>
        </div>

        <!-- Performance Analysis -->
        <div class="grid md:grid-cols-2 gap-4 sm:gap-6">
          <div
            class="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-cyan-500/20 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-sm dark:shadow-none"
          >
            <h3
              class="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2"
            >
              <svg
                class="w-5 h-5 sm:w-6 sm:h-6 text-cyan-600 dark:text-cyan-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"
                />
              </svg>
              Ваш уровень
            </h3>
            <div
              class="text-2xl sm:text-3xl font-bold mb-2"
              :class="getPerformanceColor()"
            >
              {{ getPerformanceLevel() }}
            </div>
            <div class="text-sm text-slate-600 dark:text-slate-400">
              {{ getPerformanceDescription() }}
            </div>
          </div>

          <div
            class="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-cyan-500/20 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-sm dark:shadow-none"
          >
            <h3
              class="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2"
            >
              <svg
                class="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 dark:text-emerald-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clip-rule="evenodd"
                />
              </svg>
              Когнитивная гибкость
            </h3>
            <div class="text-sm text-slate-600 dark:text-slate-300 space-y-2">
              <p>
                Тест Струпа измеряет вашу способность подавлять автоматические
                реакции и фокусироваться на нужной информации.
              </p>
              <p class="text-emerald-600 dark:text-emerald-400 font-semibold">
                {{ getCognitiveMessage() }}
              </p>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div
          class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
        >
          <button
            @click="startGame"
            class="btn-primary px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto"
          >
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                clip-rule="evenodd"
              />
            </svg>
            Играть снова
          </button>
        </div>
      </div>

      <!-- Info Panel -->
      <div
        v-if="state !== 'instructions'"
        class="mt-12 sm:mt-16 p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-gradient-to-br dark:from-slate-900/60 dark:to-slate-800/40 border border-slate-200 dark:border-cyan-500/20 backdrop-blur-sm shadow-sm dark:shadow-none"
      >
        <h4
          class="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white mb-4 sm:mb-6 flex items-center gap-2"
        >
          <svg
            class="w-5 h-5 sm:w-6 sm:h-6 text-cyan-600 dark:text-cyan-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd"
            />
          </svg>
          О тесте Струпа
        </h4>
        <div class="text-sm sm:text-base text-slate-600 dark:text-slate-300 space-y-3">
          <p>
            Эффект Струпа — классический феномен в психологии, открытый в 1935
            году. Он демонстрирует, как автоматические процессы (чтение) могут
            мешать выполнению другой задачи (определение цвета).
          </p>
          <p class="text-cyan-600 dark:text-cyan-300 font-semibold">Что тренирует:</p>
          <ul class="list-disc list-inside space-y-1 text-slate-500 dark:text-slate-400 ml-2">
            <li>Когнитивную гибкость и переключение внимания</li>
            <li>Способность подавлять автоматические реакции</li>
            <li>Скорость обработки информации</li>
            <li>Исполнительный контроль</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from "vue";

definePageMeta({
  layout: "laboratory",
});

// ===========================
// CONSTANTS & CONFIG
// ===========================
const gameDuration = 60; // seconds

const colorOptions = [
  { name: "red", value: "#ef4444", label: "КРАСНЫЙ" },
  { name: "blue", value: "#3b82f6", label: "СИНИЙ" },
  { name: "green", value: "#22c55e", label: "ЗЕЛЁНЫЙ" },
  { name: "yellow", value: "#eab308", label: "ЖЁЛТЫЙ" },
];

// ===========================
// REACTIVE STATE
// ===========================
const state = ref("instructions"); // instructions | playing | results
const score = ref(0);
const correct = ref(0);
const incorrect = ref(0);
const timeLeft = ref(gameDuration);
const currentWord = ref("");
const currentColor = ref("");
const correctAnswer = ref("");
const showFeedback = ref(false);
const lastCorrect = ref(false);
const timerInterval = ref(null);
const responseTimes = ref([]);
const questionStartTime = ref(0);

// ===========================
// COMPUTED PROPERTIES
// ===========================
const totalAttempts = computed(() => correct.value + incorrect.value);

const accuracy = computed(() => {
  if (totalAttempts.value === 0) return 0;
  return Math.round((correct.value / totalAttempts.value) * 100);
});

const avgResponseTime = computed(() => {
  if (responseTimes.value.length === 0) return 0;
  const avg =
    responseTimes.value.reduce((a, b) => a + b, 0) / responseTimes.value.length;
  return Math.round(avg);
});

// ===========================
// GAME LOGIC
// ===========================
const generateQuestion = () => {
  // Pick random word
  const wordColor =
    colorOptions[Math.floor(Math.random() * colorOptions.length)];
  // Pick random display color (can be different from word)
  const displayColor =
    colorOptions[Math.floor(Math.random() * colorOptions.length)];

  currentWord.value = wordColor.label;
  currentColor.value = displayColor.value;
  correctAnswer.value = displayColor.name;
  questionStartTime.value = performance.now();
};

const checkAnswer = (selectedColor) => {
  const responseTime = performance.now() - questionStartTime.value;
  responseTimes.value.push(responseTime);

  const isCorrect = selectedColor === correctAnswer.value;
  lastCorrect.value = isCorrect;

  if (isCorrect) {
    correct.value++;
    score.value += Math.max(100 - Math.floor(responseTime / 10), 10);
  } else {
    incorrect.value++;
    score.value = Math.max(0, score.value - 20);
  }

  showFeedback.value = true;

  setTimeout(() => {
    showFeedback.value = false;
    generateQuestion();
  }, 600);
};

const startTimer = () => {
  timerInterval.value = setInterval(() => {
    timeLeft.value--;

    if (timeLeft.value <= 0) {
      endGame();
    }
  }, 1000);
};

const startGame = () => {
  // Reset state
  state.value = "playing";
  score.value = 0;
  correct.value = 0;
  incorrect.value = 0;
  timeLeft.value = gameDuration;
  responseTimes.value = [];

  generateQuestion();
  startTimer();
};

const endGame = () => {
  clearInterval(timerInterval.value);
  state.value = "results";
};

// ===========================
// RESULTS HELPERS
// ===========================
const getPerformanceLevel = () => {
  if (accuracy.value >= 95) return "Превосходно";
  if (accuracy.value >= 85) return "Отлично";
  if (accuracy.value >= 75) return "Хорошо";
  if (accuracy.value >= 65) return "Средне";
  return "Требуется практика";
};

const getPerformanceColor = () => {
  if (accuracy.value >= 95) return "text-purple-600 dark:text-purple-400";
  if (accuracy.value >= 85) return "text-emerald-600 dark:text-emerald-400";
  if (accuracy.value >= 75) return "text-cyan-600 dark:text-cyan-400";
  if (accuracy.value >= 65) return "text-yellow-600 dark:text-yellow-400";
  return "text-orange-600 dark:text-orange-400";
};

const getPerformanceDescription = () => {
  if (accuracy.value >= 95) return "У вас выдающаяся когнитивная гибкость!";
  if (accuracy.value >= 85)
    return "Вы отлично справляетесь с подавлением автоматических реакций.";
  if (accuracy.value >= 75)
    return "Хороший результат! Продолжайте тренироваться.";
  if (accuracy.value >= 65) return "Неплохо, но есть куда расти.";
  return "Тест Струпа сложен для всех. Практика поможет!";
};

const getPerformanceMessage = () => {
  if (score.value >= 3000)
    return "Невероятный результат! Вы достигли мастерства!";
  if (score.value >= 2000)
    return "Отличная работа! Ваша концентрация впечатляет!";
  if (score.value >= 1000) return "Хороший результат! Вы на правильном пути!";
  return "Продолжайте практиковаться для улучшения результатов!";
};

const getScoreRating = () => {
  if (score.value >= 3000) return "Мастер";
  if (score.value >= 2000) return "Эксперт";
  if (score.value >= 1000) return "Профи";
  return "Новичок";
};

const getCognitiveMessage = () => {
  if (accuracy.value >= 90 && avgResponseTime.value < 800) {
    return "Отличное сочетание точности и скорости!";
  }
  if (accuracy.value >= 90) {
    return "Высокая точность! Попробуйте увеличить скорость.";
  }
  if (avgResponseTime.value < 800) {
    return "Хорошая скорость! Работайте над точностью.";
  }
  return "Сбалансированный результат. Продолжайте тренироваться!";
};

// ===========================
// LIFECYCLE
// ===========================
onUnmounted(() => {
  if (timerInterval.value) {
    clearInterval(timerInterval.value);
  }
});
</script>
<style scoped>
/* Core Styles */
.gradient-text {
  background: linear-gradient(135deg, #06b6d4 0%, #a855f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-card {
  @apply text-center px-4 py-3 sm:px-6 sm:py-4 
         rounded-xl sm:rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/50 
         backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/30 shadow-sm dark:shadow-none;
}

.stat-card-large {
  @apply text-center px-6 py-4 sm:px-8 sm:py-6 
         rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/50 
         backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/30 shadow-sm dark:shadow-none;
}

.game-card {
  @apply bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-cyan-500/20 rounded-3xl 
         backdrop-blur-sm shadow-lg dark:shadow-2xl shadow-cyan-500/5 dark:shadow-cyan-500/10;
}

.btn-primary {
  @apply inline-flex items-center justify-center 
         bg-gradient-to-r from-cyan-600 to-purple-600 
         hover:from-cyan-500 hover:to-purple-500 
         text-white font-bold rounded-2xl 
         transition-all duration-300 transform 
         hover:scale-105 active:scale-95 
         shadow-lg shadow-cyan-500/25 
         border border-cyan-400/20;
}

.color-btn {
  @apply flex flex-col items-center justify-center 
         py-4 sm:py-6 px-4 rounded-2xl 
         border-2 transition-all duration-300 
         transform hover:scale-105 active:scale-95 
         backdrop-blur-sm cursor-pointer
         hover:shadow-lg;
}

/* Animations */
.animate-pulse-once {
  animation: pulse-once 0.3s ease-in-out;
}

@keyframes pulse-once {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.animate-scale-in {
  animation: scale-in 0.4s ease-out;
}

@keyframes scale-in {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Responsive improvements */
@media (max-width: 640px) {
  .stroop-game {
    @apply px-3 py-4;
  }

  .stat-card {
    @apply min-w-[100px] px-3 py-2;
  }

  .color-btn {
    @apply py-3 px-2;
  }
}

/* Accessibility improvements */
.color-btn:focus {
  @apply outline-none ring-2 ring-cyan-400 ring-opacity-50;
}

.btn-primary:focus {
  @apply outline-none ring-2 ring-cyan-400 ring-opacity-50;
}

/* Smooth transitions for all interactive elements */
button {
  @apply transition-all duration-200;
}

/* Custom scrollbar for the page */
.stroop-game::-webkit-scrollbar {
  width: 6px;
}

.stroop-game::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.dark .stroop-game::-webkit-scrollbar-track {
  background: #0f172a;
}

.stroop-game::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.dark .stroop-game::-webkit-scrollbar-thumb {
  background: #1e293b;
  border-radius: 3px;
}

.stroop-game::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.dark .stroop-game::-webkit-scrollbar-thumb:hover {
  background: #334155;
}

/* Performance optimizations */
.game-card {
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000;
}

/* Loading states */
.btn-primary:disabled {
  @apply opacity-50 cursor-not-allowed transform scale-100;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .stat-card {
    @apply border-2 border-slate-600;
  }

  .color-btn {
    @apply border-2;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  .btn-primary,
  .color-btn {
    @apply transform-none;
  }
}
</style>

