<template>
  <div
    class="digit-span-test min-h-screen bg-slate-950 px-4 sm:px-6 lg:px-8 py-8"
  >
    <div class="max-w-4xl mx-auto">
      <!-- Intro Screen -->
      <div v-if="phase === 'intro'" class="text-center">
        <div class="mb-8">
          <div class="inline-block relative">
            <div
              class="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center mb-6 animate-pulse-slow"
            >
              <i class="fas fa-brain text-white text-5xl"></i>
            </div>
            <div
              class="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center"
            >
              <i class="fas fa-check text-white text-sm"></i>
            </div>
          </div>
        </div>

        <h1
          class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight gradient-text"
        >
          ТЕСТ ОБЪЕМА ПАМЯТИ
        </h1>
        <p
          class="text-cyan-300/80 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-8"
        >
          Digit Span Test — классический тест рабочей памяти, используемый в
          нейропсихологии и оценке IQ
        </p>

        <div class="grid md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
          <div class="info-card-small">
            <div
              class="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-3 mx-auto"
            >
              <i class="fas fa-clock text-cyan-400 text-xl"></i>
            </div>
            <div class="text-2xl font-bold text-cyan-400 mb-1">5-8 мин</div>
            <div class="text-sm text-slate-400">Длительность</div>
          </div>
          <div class="info-card-small">
            <div
              class="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-3 mx-auto"
            >
              <i class="fas fa-layer-group text-purple-400 text-xl"></i>
            </div>
            <div class="text-2xl font-bold text-purple-400 mb-1">2 этапа</div>
            <div class="text-sm text-slate-400">Прямой + Обратный</div>
          </div>
          <div class="info-card-small">
            <div
              class="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-3 mx-auto"
            >
              <i class="fas fa-chart-line text-emerald-400 text-xl"></i>
            </div>
            <div class="text-2xl font-bold text-emerald-400 mb-1">Научно</div>
            <div class="text-sm text-slate-400">Валидирован</div>
          </div>
        </div>

        <div class="info-card max-w-2xl mx-auto mb-8">
          <div class="flex items-start gap-4">
            <div
              class="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0"
            >
              <i class="fas fa-info-circle text-cyan-400"></i>
            </div>
            <div class="text-left">
              <h3 class="text-lg font-semibold text-white mb-2">
                Что измеряет этот тест?
              </h3>
              <p class="text-slate-300 text-sm leading-relaxed">
                Digit Span Test оценивает объем вашей
                <strong class="text-cyan-400">рабочей памяти</strong> —
                способность временно удерживать и манипулировать информацией.
                Этот показатель коррелирует с общими когнитивными способностями
                и используется в тестах IQ (WAIS, Wechsler).
              </p>
            </div>
          </div>
        </div>

        <button
          @click="phase = 'instructions'"
          class="btn-primary text-lg px-10 py-5"
        >
          <i class="fas fa-play mr-2"></i>
          Начать тест
          <i class="fas fa-arrow-right ml-2"></i>
        </button>
      </div>

      <!-- Instructions Screen -->
      <div v-if="phase === 'instructions'" class="max-w-2xl mx-auto">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-white mb-4 gradient-text">
            Инструкция
          </h2>
          <p class="text-slate-300">Внимательно прочитайте перед началом</p>
        </div>

        <div class="space-y-6 mb-8">
          <div class="instruction-card">
            <div class="flex items-start gap-4">
              <div
                class="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0"
              >
                <span class="text-white font-bold">1</span>
              </div>
              <div class="text-left flex-1">
                <h3 class="text-lg font-semibold text-white mb-2">
                  Запоминайте последовательность
                </h3>
                <p class="text-slate-300 text-sm leading-relaxed">
                  На экране будут появляться цифры по одной. Постарайтесь
                  запомнить их порядок.
                </p>
              </div>
            </div>
          </div>

          <div class="instruction-card">
            <div class="flex items-start gap-4">
              <div
                class="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0"
              >
                <span class="text-white font-bold">2</span>
              </div>
              <div class="text-left flex-1">
                <h3 class="text-lg font-semibold text-white mb-2">
                  Два режима тестирования
                </h3>
                <p class="text-slate-300 text-sm leading-relaxed mb-3">
                  <strong class="text-cyan-400">Прямой порядок:</strong> Вводите
                  цифры в том же порядке, как они появились<br />
                  <strong class="text-purple-400">Обратный порядок:</strong>
                  Вводите цифры в обратном порядке
                </p>
                <div class="bg-slate-800/50 p-3 rounded-lg">
                  <div class="text-xs text-slate-400 mb-1">
                    Пример (обратный):
                  </div>
                  <div class="text-sm text-white">
                    Показали: <span class="text-cyan-400">3 → 7 → 2</span>
                  </div>
                  <div class="text-sm text-white">
                    Вы вводите: <span class="text-purple-400">2 → 7 → 3</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="instruction-card">
            <div class="flex items-start gap-4">
              <div
                class="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0"
              >
                <span class="text-white font-bold">3</span>
              </div>
              <div class="text-left flex-1">
                <h3 class="text-lg font-semibold text-white mb-2">
                  Прогрессивная сложность
                </h3>
                <p class="text-slate-300 text-sm leading-relaxed">
                  Тест начинается с 3 цифр и становится сложнее. У вас есть 2
                  попытки на каждом уровне. Тест заканчивается после двух ошибок
                  подряд.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          class="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-2xl p-6 mb-8"
        >
          <div class="flex items-start gap-3">
            <i class="fas fa-lightbulb text-yellow-400 text-xl mt-1"></i>
            <div>
              <h4 class="text-white font-semibold mb-1">Совет</h4>
              <p class="text-slate-300 text-sm">
                Проходите тест в тихом месте, когда вы отдохнувши и
                сосредоточены. Это даст наиболее точные результаты.
              </p>
            </div>
          </div>
        </div>

        <div class="flex gap-4 justify-center">
          <button @click="phase = 'intro'" class="btn-secondary">
            <i class="fas fa-arrow-left mr-2"></i>
            Назад
          </button>
          <button @click="startTest" class="btn-primary text-lg px-8">
            Понятно, начинаем!
            <i class="fas fa-arrow-right ml-2"></i>
          </button>
        </div>
      </div>

      <!-- Test Screen -->
      <div v-if="phase === 'test'" class="max-w-3xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-8">
          <div
            class="inline-flex items-center gap-3 px-6 py-3 bg-slate-900/60 border border-cyan-500/20 rounded-xl mb-4"
          >
            <div
              :class="
                testMode === 'forward' ? 'text-cyan-400' : 'text-purple-400'
              "
            >
              <i
                :class="
                  testMode === 'forward'
                    ? 'fas fa-arrow-right'
                    : 'fas fa-arrow-left'
                "
                class="mr-2"
              ></i>
              {{
                testMode === "forward" ? "ПРЯМОЙ ПОРЯДОК" : "ОБРАТНЫЙ ПОРЯДОК"
              }}
            </div>
            <span class="text-slate-600">•</span>
            <div class="text-slate-300">
              Уровень:
              <span class="font-bold text-white">{{ currentLevel }}</span>
            </div>
            <span class="text-slate-600">•</span>
            <div class="text-slate-300">
              Попытка:
              <span class="font-bold text-white"
                >{{ attempts.current + 1 }}/{{ attempts.max }}</span
              >
            </div>
          </div>
        </div>

        <!-- Display Area -->
        <div class="mb-12">
          <!-- Showing Sequence -->
          <div v-if="showingSequence" class="text-center">
            <div class="mb-8">
              <div class="text-slate-400 text-sm mb-4 uppercase tracking-wide">
                Запоминайте...
              </div>
              <div class="digit-display">
                {{ sequence[displayIndex] }}
              </div>
            </div>
            <div class="flex justify-center gap-2">
              <div
                v-for="(_, index) in sequence"
                :key="index"
                class="w-3 h-3 rounded-full transition-all duration-300"
                :class="
                  index === displayIndex
                    ? 'bg-cyan-400 scale-125'
                    : index < displayIndex
                    ? 'bg-cyan-400/30'
                    : 'bg-slate-700'
                "
              ></div>
            </div>
          </div>

          <!-- Input Phase -->
          <div v-else class="text-center">
            <div class="mb-6">
              <div class="text-slate-400 text-sm mb-4 uppercase tracking-wide">
                {{
                  testMode === "forward"
                    ? "Введите цифры в прямом порядке"
                    : "Введите цифры в обратном порядке"
                }}
              </div>
              <input
                ref="inputRef"
                v-model="userInput"
                type="text"
                inputmode="numeric"
                pattern="[0-9]*"
                maxlength="20"
                class="digit-input"
                :placeholder="'_ '.repeat(currentLevel).trim()"
                @keyup.enter="submitAnswer"
                autofocus
              />
              <div class="mt-4 text-slate-500 text-xs">
                Введите {{ currentLevel }}
                {{
                  currentLevel === 1
                    ? "цифру"
                    : currentLevel < 5
                    ? "цифры"
                    : "цифр"
                }}
                и нажмите Enter или кнопку ниже
              </div>
            </div>

            <button
              @click="submitAnswer"
              class="btn-primary"
              :disabled="userInput.length !== currentLevel"
            >
              <i class="fas fa-check mr-2"></i>
              Проверить ответ
            </button>
          </div>
        </div>

        <!-- Progress Indicator -->
        <div class="info-card">
          <div class="flex items-center justify-between text-sm">
            <div class="text-slate-400">Ваш текущий результат:</div>
            <div class="flex gap-4">
              <div>
                <span class="text-cyan-400 font-semibold">Прямой:</span>
                <span class="text-white font-bold ml-2">{{
                  results.forward
                }}</span>
              </div>
              <div>
                <span class="text-purple-400 font-semibold">Обратный:</span>
                <span class="text-white font-bold ml-2">{{
                  results.backward
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Results Screen -->
      <div v-if="phase === 'result'" class="max-w-3xl mx-auto">
        <div class="text-center mb-12">
          <div class="inline-block mb-6">
            <div
              class="w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center animate-bounce-slow"
            >
              <i class="fas fa-trophy text-white text-5xl"></i>
            </div>
          </div>
          <h2 class="text-4xl font-bold text-white mb-4 gradient-text">
            Тест завершен! 🎉
          </h2>
          <p class="text-slate-300 text-lg">
            Вот ваши результаты по тесту объема памяти
          </p>
        </div>

        <!-- Main Results -->
        <div class="grid md:grid-cols-2 gap-6 mb-8">
          <div class="result-card">
            <div class="flex items-center gap-3 mb-4">
              <div
                class="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center"
              >
                <i class="fas fa-arrow-right text-white text-xl"></i>
              </div>
              <div class="text-left">
                <div class="text-sm text-slate-400">Прямой порядок</div>
                <div class="text-2xl font-bold text-cyan-400">
                  {{ results.forward }} цифр
                </div>
              </div>
            </div>
            <div class="text-sm text-slate-300 leading-relaxed">
              {{ getForwardInterpretation() }}
            </div>
          </div>

          <div class="result-card">
            <div class="flex items-center gap-3 mb-4">
              <div
                class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center"
              >
                <i class="fas fa-arrow-left text-white text-xl"></i>
              </div>
              <div class="text-left">
                <div class="text-sm text-slate-400">Обратный порядок</div>
                <div class="text-2xl font-bold text-purple-400">
                  {{ results.backward }} цифр
                </div>
              </div>
            </div>
            <div class="text-sm text-slate-300 leading-relaxed">
              {{ getBackwardInterpretation() }}
            </div>
          </div>
        </div>

        <!-- Total Score -->
        <div class="mb-8">
          <div class="performance-card">
            <div class="text-center mb-6">
              <div class="text-sm text-slate-400 uppercase tracking-wide mb-2">
                Общий показатель
              </div>
              <div
                class="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400"
              >
                {{ totalScore }}
              </div>
              <div class="text-lg text-slate-300 mt-2">
                {{ getTotalRating() }}
              </div>
            </div>
            <div class="relative h-3 bg-slate-800 rounded-full overflow-hidden">
              <div
                class="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-1000"
                :style="{ width: `${Math.min((totalScore / 20) * 100, 100)}%` }"
              ></div>
            </div>
          </div>
        </div>

        <!-- Interpretation -->
        <div class="info-card mb-8">
          <div class="flex items-start gap-4">
            <div
              class="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0"
            >
              <i class="fas fa-brain text-emerald-400"></i>
            </div>
            <div class="text-left flex-1">
              <h3 class="text-lg font-semibold text-white mb-3">
                Что означают ваши результаты?
              </h3>
              <div class="space-y-3 text-sm text-slate-300 leading-relaxed">
                <p>
                  <strong class="text-cyan-400">Прямой порядок</strong> отражает
                  вашу способность удерживать информацию в краткосрочной памяти.
                  Средний показатель взрослого человека — 7±2 цифры (закон
                  Миллера).
                </p>
                <p>
                  <strong class="text-purple-400">Обратный порядок</strong>
                  требует не только запоминания, но и манипуляции информацией,
                  что является показателем исполнительных функций и рабочей
                  памяти.
                </p>
                <p>
                  <strong class="text-emerald-400">Общий показатель</strong>
                  коррелирует с общим интеллектом и используется в батарее
                  тестов WAIS (шкала интеллекта Векслера).
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Normative Data -->
        <div class="grid md:grid-cols-3 gap-4 mb-8">
          <div class="stat-comparison">
            <div class="text-xs text-slate-400 mb-2">Средний показатель</div>
            <div class="text-2xl font-bold text-slate-300">12-14</div>
            <div class="text-xs text-slate-500 mt-1">Общая популяция</div>
          </div>
          <div class="stat-comparison">
            <div class="text-xs text-slate-400 mb-2">Ваш результат</div>
            <div class="text-2xl font-bold text-cyan-400">{{ totalScore }}</div>
            <div class="text-xs" :class="getComparisonClass()">
              {{ getComparison() }}
            </div>
          </div>
          <div class="stat-comparison">
            <div class="text-xs text-slate-400 mb-2">Отличный показатель</div>
            <div class="text-2xl font-bold text-emerald-400">16+</div>
            <div class="text-xs text-slate-500 mt-1">Топ 10%</div>
          </div>
        </div>

        <!-- Recommendations -->
        <div class="info-card mb-8">
          <div class="flex items-start gap-4">
            <div
              class="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0"
            >
              <i class="fas fa-lightbulb text-purple-400"></i>
            </div>
            <div class="text-left flex-1">
              <h3 class="text-lg font-semibold text-white mb-3">
                Рекомендации для улучшения
              </h3>
              <ul class="space-y-2 text-sm text-slate-300">
                <li class="flex items-start gap-2">
                  <i class="fas fa-check text-cyan-400 mt-1 text-xs"></i>
                  <span
                    >Тренируйте рабочую память с помощью N-back тестов и
                    головоломок</span
                  >
                </li>
                <li class="flex items-start gap-2">
                  <i class="fas fa-check text-cyan-400 mt-1 text-xs"></i>
                  <span
                    >Практикуйте мнемонические техники (метод локусов,
                    ассоциации)</span
                  >
                </li>
                <li class="flex items-start gap-2">
                  <i class="fas fa-check text-cyan-400 mt-1 text-xs"></i>
                  <span
                    >Регулярные аэробные упражнения улучшают когнитивные
                    функции</span
                  >
                </li>
                <li class="flex items-start gap-2">
                  <i class="fas fa-check text-cyan-400 mt-1 text-xs"></i>
                  <span
                    >Качественный сон критически важен для консолидации
                    памяти</span
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button @click="restartTest" class="btn-primary px-8 py-4 text-lg">
            <i class="fas fa-redo mr-2"></i>
            Пройти снова
          </button>
          <button @click="shareResults" class="btn-secondary px-8 py-4 text-lg">
            <i class="fas fa-share mr-2"></i>
            Поделиться
          </button>
          <NuxtLink
            to="/lab/tests"
            class="btn-secondary px-8 py-4 text-lg text-center inline-flex items-center justify-center"
          >
            <i class="fas fa-arrow-left mr-2"></i>
            К тестам
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, nextTick } from "vue";

definePageMeta({
  layout: "laboratory",
});

const phase = ref("intro"); // intro, instructions, test, result
const testMode = ref("forward"); // forward, backward
const currentLevel = ref(3);
const sequence = ref([]);
const displayIndex = ref(0);
const userInput = ref("");
const showingSequence = ref(false);
const results = ref({ forward: 0, backward: 0 });
const attempts = ref({ current: 0, max: 2 });
const inputRef = ref(null);

const totalScore = computed(
  () => results.value.forward + results.value.backward
);

const generateSequence = (length) => {
  const seq = [];
  for (let i = 0; i < length; i++) {
    seq.push(Math.floor(Math.random() * 9) + 1);
  }
  return seq;
};

const startTest = () => {
  phase.value = "test";
  testMode.value = "forward";
  currentLevel.value = 3;
  results.value = { forward: 0, backward: 0 };
  attempts.value = { current: 0, max: 2 };
  showNextSequence();
};

const showNextSequence = async () => {
  sequence.value = generateSequence(currentLevel.value);
  userInput.value = "";
  showingSequence.value = true;
  displayIndex.value = 0;

  // Show digits one by one
  for (let i = 0; i < sequence.value.length; i++) {
    displayIndex.value = i;
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  // Wait a bit after last digit
  await new Promise((resolve) => setTimeout(resolve, 500));

  showingSequence.value = false;

  // Focus input
  await nextTick();
  if (inputRef.value) {
    inputRef.value.focus();
  }
};

const submitAnswer = () => {
  if (userInput.value.length !== currentLevel.value) return;

  const userSequence = userInput.value.split("").map(Number);
  const correctSequence =
    testMode.value === "forward"
      ? sequence.value
      : [...sequence.value].reverse();

  const isCorrect =
    JSON.stringify(userSequence) === JSON.stringify(correctSequence);

  if (isCorrect) {
    // Correct answer - move to next level
    if (testMode.value === "forward") {
      results.value.forward = currentLevel.value;
    } else {
      results.value.backward = currentLevel.value;
    }
    currentLevel.value++;
    attempts.value.current = 0;
    showNextSequence();
  } else {
    // Wrong answer
    attempts.value.current++;

    if (attempts.value.current >= attempts.value.max) {
      // Failed twice - move to next mode or end test
      if (testMode.value === "forward") {
        // Switch to backward mode
        testMode.value = "backward";
        currentLevel.value = 3;
        attempts.value.current = 0;
        showNextSequence();
      } else {
        // Test complete
        saveResults();
        phase.value = "result";
      }
    } else {
      // Try again at same level
      showNextSequence();
    }
  }
};

const saveResults = () => {
  const previousResults = JSON.parse(
    localStorage.getItem("digitSpanResults") || "[]"
  );
  const newResult = {
    date: new Date().toISOString(),
    forward: results.value.forward,
    backward: results.value.backward,
    total: totalScore.value,
  };
  previousResults.push(newResult);
  localStorage.setItem("digitSpanResults", JSON.stringify(previousResults));
};

const getForwardInterpretation = () => {
  const score = results.value.forward;
  if (score >= 9)
    return "Выдающийся результат! Ваша краткосрочная память работает отлично.";
  if (score >= 7)
    return "Отличный результат. Вы в пределах средней нормы (7±2).";
  if (score >= 5) return "Хороший результат. Есть потенциал для улучшения.";
  return "Рабочая память нуждается в тренировке. Регулярная практика поможет!";
};

const getBackwardInterpretation = () => {
  const score = results.value.backward;
  if (score >= 8)
    return "Превосходно! Ваши исполнительные функции на высоком уровне.";
  if (score >= 6)
    return "Очень хорошо. Вы умеете эффективно манипулировать информацией.";
  if (score >= 4) return "Нормальный результат. Можно улучшить с практикой.";
  return "Исполнительные функции требуют развития. Попробуйте когнитивные тренировки.";
};

const getTotalRating = () => {
  const total = totalScore.value;
  if (total >= 17) return "Выдающийся результат! 🏆";
  if (total >= 14) return "Отличный результат! ⭐";
  if (total >= 11) return "Хороший результат! 👍";
  if (total >= 8) return "Средний результат";
  return "Есть над чем работать";
};

const getComparison = () => {
  const total = totalScore.value;
  if (total >= 17) return "🎯 Топ 5%";
  if (total >= 15) return "🎯 Топ 15%";
  if (total >= 13) return "📊 Выше среднего";
  if (total >= 11) return "📊 Средний";
  return "📊 Ниже среднего";
};

const getComparisonClass = () => {
  const total = totalScore.value;
  if (total >= 16) return "text-emerald-400";
  if (total >= 13) return "text-cyan-400";
  if (total >= 10) return "text-yellow-400";
  return "text-orange-400";
};

const restartTest = () => {
  phase.value = "intro";
  testMode.value = "forward";
  currentLevel.value = 3;
  sequence.value = [];
  displayIndex.value = 0;
  userInput.value = "";
  showingSequence.value = false;
  results.value = { forward: 0, backward: 0 };
  attempts.value = { current: 0, max: 2 };
};

const shareResults = () => {
  const text = `🧠 Я прошёл Digit Span Test в MindQ Lab!\n\n📊 Мои результаты:\n• Прямой порядок: ${results.value.forward} цифр\n• Обратный порядок: ${results.value.backward} цифр\n• Общий показатель: ${totalScore.value}\n\nПопробуй и ты! mindqlab.com`;

  if (navigator.share) {
    navigator
      .share({
        title: "Digit Span Test - MindQ Lab",
        text: text,
        url: window.location.href,
      })
      .catch(() => {});
  } else {
    navigator.clipboard.writeText(text);
    alert("Результаты скопированы в буфер обмена!");
  }
};
</script>
<style scoped>
.gradient-text {
  background: linear-gradient(135deg, #06b6d4 0%, #a855f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.btn-primary {
  @apply inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 
         text-white font-semibold hover:from-cyan-600 hover:to-purple-600 
         transition-all duration-300 transform hover:scale-105 
         shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40
         disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none;
}

.btn-secondary {
  @apply inline-flex items-center justify-center px-6 py-3 rounded-xl bg-slate-800/50 border border-slate-600/50 
         text-slate-300 font-semibold hover:bg-slate-700 hover:border-slate-500 
         transition-all duration-300 transform hover:scale-105;
}

.info-card {
  @apply p-6 rounded-2xl bg-slate-900/50 border border-cyan-500/10 backdrop-blur-sm;
}

.info-card-small {
  @apply p-5 rounded-xl bg-slate-900/40 border border-cyan-500/10 text-center;
}

.instruction-card {
  @apply p-5 rounded-xl bg-slate-900/40 border border-cyan-500/10 hover:border-cyan-500/30 transition-all duration-300;
}

.result-card {
  @apply p-6 rounded-2xl bg-slate-900/50 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300;
}

.performance-card {
  @apply p-8 rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-cyan-500/30;
}

.stat-comparison {
  @apply p-4 rounded-xl bg-slate-900/40 border border-slate-700/50 text-center;
}

.digit-display {
  @apply text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400
         animate-pulse-slow;
}

.digit-input {
  @apply w-full max-w-md mx-auto px-6 py-5 text-4xl md:text-5xl font-bold text-center
         bg-slate-900/50 border-2 border-cyan-500/30 rounded-2xl text-white
         focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20
         placeholder-slate-700 transition-all duration-300 tracking-widest;
}

@keyframes bounce-slow {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes pulse-slow {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-bounce-slow {
  animation: bounce-slow 2s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 2s ease-in-out infinite;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .digit-display {
    @apply text-7xl;
  }

  .digit-input {
    @apply text-3xl px-4 py-4;
  }

  .info-card,
  .result-card,
  .performance-card {
    @apply p-4;
  }
}

/* Remove number input spinners */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>
