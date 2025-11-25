<template>
  <div
    class="trail-making-test min-h-screen bg-slate-50 dark:bg-slate-950 px-4 sm:px-6 lg:px-8 py-8 transition-colors duration-500">
    <div class="max-w-6xl mx-auto">
      <Breadcrumbs />
      <!-- Intro Screen -->
      <div v-if="phase === 'intro'" class="text-center max-w-4xl mx-auto">
        <div class="mb-8">
          <div class="inline-block relative">
            <div
              class="w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center mb-6 animate-pulse-slow">
              <i class="fas fa-route text-white text-5xl"></i>
            </div>
            <div
              class="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center animate-bounce-slow">
              <i class="fas fa-pencil-alt text-white text-sm"></i>
            </div>
          </div>
        </div>

        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
          TRAIL MAKING TEST
        </h1>
        <p class="text-slate-600 dark:text-emerald-300/80 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-8">
          Классический нейропсихологический тест на скорость обработки
          информации и переключение внимания
        </p>

        <div class="grid md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
          <div class="info-card-small">
            <div class="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-3 mx-auto">
              <i class="fas fa-stopwatch text-emerald-400 text-xl"></i>
            </div>
            <div class="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">3-5 мин</div>
            <div class="text-sm text-slate-500 dark:text-slate-400">Длительность</div>
          </div>
          <div class="info-card-small">
            <div class="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center mb-3 mx-auto">
              <i class="fas fa-exchange-alt text-teal-400 text-xl"></i>
            </div>
            <div class="text-2xl font-bold text-teal-600 dark:text-teal-400 mb-1">2 части</div>
            <div class="text-sm text-slate-500 dark:text-slate-400">A + B</div>
          </div>
          <div class="info-card-small">
            <div class="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-3 mx-auto">
              <i class="fas fa-certificate text-cyan-400 text-xl"></i>
            </div>
            <div class="text-2xl font-bold text-cyan-600 dark:text-cyan-400 mb-1">Научно</div>
            <div class="text-sm text-slate-500 dark:text-slate-400">Валидирован</div>
          </div>
        </div>

        <div class="info-card max-w-2xl mx-auto mb-8">
          <div class="flex items-start gap-4">
            <div
              class="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
              <i class="fas fa-info-circle text-emerald-600 dark:text-emerald-400"></i>
            </div>
            <div class="text-left">
              <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Что измеряет этот тест?
              </h3>
              <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Trail Making Test оценивает
                <strong class="text-emerald-600 dark:text-emerald-400">скорость обработки информации</strong>, <strong
                  class="text-teal-600 dark:text-teal-400">визуальное внимание</strong> и
                <strong class="text-cyan-600 dark:text-cyan-400">исполнительные функции</strong>.
                Часть B особенно чувствительна к когнитивной гибкости и
                способности переключаться между задачами.
              </p>
            </div>
          </div>
        </div>

        <button @click="phase = 'instructions'" class="btn-primary text-lg px-10 py-5">
          <i class="fas fa-play mr-2"></i>
          Начать тест
          <i class="fas fa-arrow-right ml-2"></i>
        </button>
      </div>

      <!-- Instructions Screen -->
      <div v-if="phase === 'instructions'" class="max-w-2xl mx-auto">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Инструкция
          </h2>
          <p class="text-slate-600 dark:text-slate-300">Соединяйте точки в правильном порядке</p>
        </div>

        <div class="space-y-6 mb-8">
          <div class="instruction-card">
            <div class="flex items-start gap-4">
              <div
                class="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0">
                <span class="text-white font-bold">A</span>
              </div>
              <div class="text-left flex-1">
                <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  Часть A: Только цифры
                </h3>
                <p class="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-3">
                  Соединяйте кружки с цифрами по порядку:
                  <span class="text-emerald-600 dark:text-emerald-400 font-mono">1 → 2 → 3 → 4...</span>
                </p>
                <div class="flex items-center gap-2 p-3 bg-slate-100 dark:bg-slate-800/50 rounded-lg">
                  <div class="flex items-center gap-2">
                    <div
                      class="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-sm font-bold">
                      1
                    </div>
                    <i class="fas fa-arrow-right text-emerald-400"></i>
                    <div
                      class="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-sm font-bold">
                      2
                    </div>
                    <i class="fas fa-arrow-right text-emerald-400"></i>
                    <div
                      class="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-sm font-bold">
                      3
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="instruction-card">
            <div class="flex items-start gap-4">
              <div
                class="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                <span class="text-white font-bold">B</span>
              </div>
              <div class="text-left flex-1">
                <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  Часть B: Цифры и буквы
                </h3>
                <p class="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-3">
                  Чередуйте цифры и буквы:
                  <span class="text-cyan-600 dark:text-cyan-400 font-mono">1 → A → 2 → B → 3 → C...</span>
                </p>
                <div class="flex items-center gap-2 p-3 bg-slate-100 dark:bg-slate-800/50 rounded-lg">
                  <div class="flex items-center gap-2">
                    <div
                      class="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white text-sm font-bold">
                      1
                    </div>
                    <i class="fas fa-arrow-right text-cyan-400"></i>
                    <div
                      class="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white text-sm font-bold">
                      A
                    </div>
                    <i class="fas fa-arrow-right text-cyan-400"></i>
                    <div
                      class="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white text-sm font-bold">
                      2
                    </div>
                    <i class="fas fa-arrow-right text-cyan-400"></i>
                    <div
                      class="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white text-sm font-bold">
                      B
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="instruction-card">
            <div class="flex items-start gap-4">
              <div
                class="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                <i class="fas fa-lightbulb text-white"></i>
              </div>
              <div class="text-left flex-1">
                <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-2">Правила</h3>
                <ul class="text-slate-700 dark:text-slate-300 text-sm space-y-2">
                  <li class="flex items-start gap-2">
                    <i class="fas fa-check text-emerald-600 dark:text-emerald-400 mt-1 text-xs"></i>
                    <span>Кликайте или касайтесь кружков по порядку</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <i class="fas fa-check text-emerald-600 dark:text-emerald-400 mt-1 text-xs"></i>
                    <span>Линия соединения появится автоматически</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <i class="fas fa-check text-emerald-600 dark:text-emerald-400 mt-1 text-xs"></i>
                    <span>При ошибке вы получите подсказку</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <i class="fas fa-check text-emerald-600 dark:text-emerald-400 mt-1 text-xs"></i>
                    <span>Работайте максимально быстро, но без ошибок!</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div
          class="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-2xl p-6 mb-8">
          <div class="flex items-start gap-3">
            <i class="fas fa-trophy text-yellow-500 dark:text-yellow-400 text-xl mt-1"></i>
            <div>
              <h4 class="text-slate-900 dark:text-white font-semibold mb-1">Цель</h4>
              <p class="text-slate-700 dark:text-slate-300 text-sm">
                Завершите каждую часть как можно быстрее. Время завершения —
                ключевой показатель. Средний взрослый проходит часть A за 29
                секунд, часть B за 75 секунд.
              </p>
            </div>
          </div>
        </div>

        <div class="flex gap-4 justify-center">
          <button @click="phase = 'intro'" class="btn-secondary">
            <i class="fas fa-arrow-left mr-2"></i>
            Назад
          </button>
          <button @click="startPartA" class="btn-primary text-lg px-8">
            Понятно, начинаем!
            <i class="fas fa-arrow-right ml-2"></i>
          </button>
        </div>
      </div>

      <!-- Test Screen -->
      <div v-if="phase === 'test'" class="max-w-5xl mx-auto">
        <!-- Header -->
        <div class="mb-6">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-4">
              <div class="part-badge" :class="currentPart === 'A'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                : 'bg-gradient-to-r from-cyan-500 to-blue-500'
                ">
                ЧАСТЬ {{ currentPart }}
              </div>
              <div class="text-slate-300 text-sm">
                {{ currentPart === "A" ? "Только цифры" : "Цифры и буквы" }}
              </div>
            </div>
            <div class="timer-display">
              <i class="fas fa-stopwatch mr-2"></i>
              {{ formatTime(timer) }}
            </div>
          </div>

          <!-- Progress -->
          <div class="flex items-center gap-3 text-sm text-slate-400">
            <span>Соединено:
              <strong class="text-white">{{ connectedNodes.length }}</strong> из
              <strong class="text-white">{{ totalNodes }}</strong></span>
            <span v-if="errors > 0" class="text-orange-400">• Ошибок: {{ errors }}</span>
          </div>
        </div>

        <!-- Canvas Area -->
        <div class="canvas-container">
          <svg ref="svgCanvas" class="trail-canvas" :viewBox="`0 0 ${canvasWidth} ${canvasHeight}`"
            @click="handleCanvasClick">
            <!-- Grid background (optional) -->
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(100,116,139,0.1)" stroke-width="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            <!-- Trails (lines) -->
            <path v-for="(trail, index) in trails" :key="`trail-${index}`" :d="trail.path" :stroke="trail.color"
              stroke-width="3" fill="none" stroke-linecap="round" class="trail-line" />

            <!-- Nodes (circles) -->
            <g v-for="node in nodes" :key="node.id">
              <circle :cx="node.x" :cy="node.y" :r="node.radius" :class="getNodeClass(node)" class="node-circle"
                @click.stop="handleNodeClick(node)" />
              <text :x="node.x" :y="node.y" class="node-text" :class="{ 'node-text-completed': node.completed }"
                text-anchor="middle" dominant-baseline="central">
                {{ node.label }}
              </text>
            </g>

            <!-- Current target indicator -->
            <g v-if="nextNode">
              <circle :cx="nextNode.x" :cy="nextNode.y" :r="nextNode.radius + 8" class="target-pulse" />
            </g>
          </svg>
        </div>

        <!-- Helper text -->
        <div class="mt-6 text-center">
          <div v-if="nextNode" class="text-lg text-slate-300">
            Нажмите на:
            <span class="text-2xl font-bold" :class="currentPart === 'A' ? 'text-emerald-400' : 'text-cyan-400'
              ">{{ nextNode.label }}</span>
          </div>
          <div v-if="showError" class="text-red-400 text-sm mt-2 animate-shake">
            ❌ Неправильно! Нажмите {{ nextNode?.label }}
          </div>
        </div>
      </div>

      <!-- Between Parts Screen -->
      <div v-if="phase === 'between'" class="text-center max-w-2xl mx-auto">
        <div class="mb-8">
          <div class="text-6xl mb-4">🎉</div>
          <h2 class="text-4xl font-bold text-slate-900 dark:text-white mb-4 gradient-text">
            Часть A завершена!
          </h2>
          <div class="text-3xl font-bold text-emerald-400 mb-2">
            {{ formatTime(partATime) }}
          </div>
          <p class="text-slate-800 mb-4">
            {{ getBARatioFeedback() }}
          </p>
        </div>

        <div class="info-card mb-8">
          <p class="text-slate-800 text-sm">
            Готовьтесь к части B. Теперь вам нужно будет чередовать цифры и
            буквы: <span class="text-cyan-400 font-mono">1→A→2→B→3→C</span>
          </p>
        </div>

        <button @click="startPartB" class="btn-primary text-lg px-10 py-5">
          <i class="fas fa-play mr-2"></i>
          Начать часть B
          <i class="fas fa-arrow-right ml-2"></i>
        </button>
      </div>

      <!-- Results Screen -->
      <div v-if="phase === 'result'" class="max-w-3xl mx-auto">
        <div class="text-center mb-12">
          <div class="inline-block mb-6">
            <div
              class="w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center animate-bounce-slow">
              <i class="fas fa-trophy text-white text-5xl"></i>
            </div>
          </div>
          <h2 class="text-4xl font-bold text-white mb-4 gradient-text">
            Тест завершен! 🏆
          </h2>
          <p class="text-slate-300 text-lg">
            Вот ваши результаты по Trail Making Test
          </p>
        </div>

        <!-- Time Results -->
        <div class="grid md:grid-cols-2 gap-6 mb-8">
          <div class="result-card">
            <div class="flex items-center gap-3 mb-4">
              <div
                class="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <span class="text-white text-xl font-bold">A</span>
              </div>
              <div class="text-left">
                <div class="text-sm text-slate-400">Часть A (цифры)</div>
                <div class="text-3xl font-bold text-emerald-400">
                  {{ formatTime(partATime) }}
                </div>
              </div>
            </div>
            <div class="text-sm text-slate-300 mb-2">
              {{ getPartAFeedback() }}
            </div>
            <div class="text-xs text-slate-400">Средняя норма: ~29 секунд</div>
          </div>

          <div class="result-card">
            <div class="flex items-center gap-3 mb-4">
              <div
                class="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <span class="text-white text-xl font-bold">B</span>
              </div>
              <div class="text-left">
                <div class="text-sm text-slate-400">Часть B (чередование)</div>
                <div class="text-3xl font-bold text-cyan-400">
                  {{ formatTime(partBTime) }}
                </div>
              </div>
            </div>
            <div class="text-sm text-slate-300 mb-2">
              {{ getPartBFeedback() }}
            </div>
            <div class="text-xs text-slate-400">Средняя норма: ~75 секунд</div>
          </div>
        </div>

        <!-- B/A Ratio -->
        <div class="mb-8">
          <div class="performance-card text-center">
            <div class="text-sm text-slate-400 uppercase tracking-wide mb-2">
              Коэффициент B/A
            </div>
            <div
              class="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-2">
              {{ baRatio }}
            </div>
            <div class="text-lg text-slate-300 mb-4">
              {{ getBARatioFeedback() }}
            </div>
            <div class="text-sm text-slate-400">
              Отношение времени части B к части A. Норма: 2.0-3.0
            </div>
          </div>
        </div>

        <!-- Error Stats -->
        <div class="grid md:grid-cols-2 gap-4 mb-8">
          <div class="stat-comparison">
            <div class="text-xs text-slate-400 mb-2">Ошибки часть A</div>
            <div class="text-3xl font-bold" :class="partAErrors === 0 ? 'text-emerald-400' : 'text-orange-400'
              ">
              {{ partAErrors }}
            </div>
          </div>
          <div class="stat-comparison">
            <div class="text-xs text-slate-400 mb-2">Ошибки часть B</div>
            <div class="text-3xl font-bold" :class="partBErrors === 0 ? 'text-emerald-400' : 'text-orange-400'
              ">
              {{ partBErrors }}
            </div>
          </div>
        </div>

        <!-- Interpretation -->
        <div class="info-card mb-8">
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
              <i class="fas fa-brain text-emerald-400"></i>
            </div>
            <div class="text-left flex-1">
              <h3 class="text-lg font-semibold text-white mb-3">
                Что означают ваши результаты?
              </h3>
              <div class="space-y-3 text-sm text-slate-300 leading-relaxed">
                <p>
                  <strong class="text-emerald-400">Часть A</strong> оценивает
                  скорость обработки информации и визуально-моторную
                  координацию.
                </p>
                <p>
                  <strong class="text-cyan-400">Часть B</strong> требует
                  когнитивной гибкости и способности переключаться между
                  задачами — ключевой компонент исполнительных функций.
                </p>
                <p>
                  <strong class="text-teal-400">Коэффициент B/A</strong>
                  показывает эффективность переключения внимания. Высокий
                  коэффициент (>3.5) может указывать на трудности с когнитивной
                  гибкостью.
                </p>
              </div>
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
          <NuxtLink to="/lab/tests"
            class="btn-secondary px-8 py-4 text-lg text-center inline-flex items-center justify-center">
            <i class="fas fa-arrow-left mr-2"></i>
            К тестам
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import Breadcrumbs from "~/components/ui/Breadcrumbs.vue";

definePageMeta({
  layout: "laboratory",
});

// Canvas dimensions
const canvasWidth = 800;
const canvasHeight = 600;

// Game state
const phase = ref("intro"); // intro, instructions, test, between, result
const currentPart = ref("A"); // A or B
const nodes = ref([]);
const trails = ref([]);
const connectedNodes = ref([]);
const nextNode = ref(null);
const timer = ref(0);
const timerInterval = ref(null);
const errors = ref(0);
const showError = ref(false);
const svgCanvas = ref(null);

// Results
const partATime = ref(0);
const partBTime = ref(0);
const partAErrors = ref(0);
const partBErrors = ref(0);

const totalNodes = computed(() => nodes.value.length);

const baRatio = computed(() => {
  if (partATime.value === 0) return 0;
  return (partBTime.value / partATime.value).toFixed(2);
});

// Generate random positions for nodes
const generateNodePositions = (labels) => {
  const positions = [];
  const padding = 80;
  const minDistance = 100;
  const nodeRadius = 30;

  for (let i = 0; i < labels.length; i++) {
    let x, y, valid;
    let attempts = 0;

    do {
      valid = true;
      x = padding + Math.random() * (canvasWidth - 2 * padding);
      y = padding + Math.random() * (canvasHeight - 2 * padding);

      // Check distance from other nodes
      for (const pos of positions) {
        const dx = x - pos.x;
        const dy = y - pos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < minDistance) {
          valid = false;
          break;
        }
      }

      attempts++;
      if (attempts > 100) {
        // Fallback to grid if random fails
        const cols = Math.ceil(Math.sqrt(labels.length));
        const row = Math.floor(i / cols);
        const col = i % cols;
        x =
          padding +
          (col * (canvasWidth - 2 * padding)) / cols +
          Math.random() * 50;
        y =
          padding +
          (row * (canvasHeight - 2 * padding)) /
          Math.ceil(labels.length / cols) +
          Math.random() * 50;
        valid = true;
      }
    } while (!valid);

    positions.push({
      id: i,
      label: labels[i],
      x,
      y,
      radius: nodeRadius,
      completed: false,
      isNumber: !isNaN(labels[i]),
    });
  }

  return positions;
};

const startPartA = () => {
  phase.value = "test";
  currentPart.value = "A";
  const labels = Array.from({ length: 25 }, (_, i) => (i + 1).toString());
  nodes.value = generateNodePositions(labels);
  connectedNodes.value = [];
  trails.value = [];
  errors.value = 0;
  nextNode.value = nodes.value[0];
  startTimer();
};

const startPartB = () => {
  phase.value = "test";
  currentPart.value = "B";
  const numbers = Array.from({ length: 13 }, (_, i) => (i + 1).toString());
  const letters = Array.from({ length: 12 }, (_, i) =>
    String.fromCharCode(65 + i)
  );
  const labels = [];
  for (let i = 0; i < 13; i++) {
    labels.push(numbers[i]);
    if (i < 12) labels.push(letters[i]);
  }
  nodes.value = generateNodePositions(labels);
  connectedNodes.value = [];
  trails.value = [];
  errors.value = 0;
  nextNode.value = nodes.value[0];
  startTimer();
};

const startTimer = () => {
  timer.value = 0;
  if (timerInterval.value) clearInterval(timerInterval.value);
  timerInterval.value = setInterval(() => {
    timer.value++;
  }, 1000);
};

const stopTimer = () => {
  if (timerInterval.value) {
    clearInterval(timerInterval.value);
    timerInterval.value = null;
  }
};

const handleNodeClick = (node) => {
  if (node.completed) return;

  // Check if this is the correct next node
  const expectedIndex = connectedNodes.value.length;
  const expectedNode = nodes.value[expectedIndex];

  if (node.id === expectedNode.id) {
    // Correct!
    node.completed = true;

    // Add trail from previous node
    if (connectedNodes.value.length > 0) {
      const prevNode = connectedNodes.value[connectedNodes.value.length - 1];
      trails.value.push({
        path: `M ${prevNode.x} ${prevNode.y} L ${node.x} ${node.y}`,
        color:
          currentPart.value === "A"
            ? "rgba(16, 185, 129, 0.6)" // emerald
            : "rgba(6, 182, 212, 0.6)", // cyan
      });
    }

    connectedNodes.value.push(node);

    // Update next node
    if (connectedNodes.value.length < nodes.value.length) {
      nextNode.value = nodes.value[connectedNodes.value.length];
    } else {
      // Completed!
      nextNode.value = null;
      completeTest();
    }
  } else {
    // Wrong node!
    errors.value++;
    showError.value = true;
    setTimeout(() => {
      showError.value = false;
    }, 1500);
  }
};

const handleCanvasClick = (event) => {
  // This is for handling clicks outside nodes
  // Could add error feedback here
};

const completeTest = () => {
  stopTimer();

  if (currentPart.value === "A") {
    partATime.value = timer.value;
    partAErrors.value = errors.value;
    phase.value = "between";
  } else {
    partBTime.value = timer.value;
    partBErrors.value = errors.value;
    saveResults();
    phase.value = "result";
  }
};

const saveResults = () => {
  const previousResults = JSON.parse(
    localStorage.getItem("trailMakingResults") || "[]"
  );
  const newResult = {
    date: new Date().toISOString(),
    partA: partATime.value,
    partB: partBTime.value,
    baRatio: parseFloat(baRatio.value),
    errorsA: partAErrors.value,
    errorsB: partBErrors.value,
  };
  previousResults.push(newResult);
  localStorage.setItem("trailMakingResults", JSON.stringify(previousResults));
};

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return mins > 0 ? `${mins}:${secs.toString().padStart(2, "0")}` : `${secs}s`;
};

const getPartAFeedback = () => {
  if (partATime.value <= 20) return "Превосходно! Очень высокая скорость 🚀";
  if (partATime.value <= 29) return "Отлично! В пределах нормы ⭐";
  if (partATime.value <= 40) return "Хорошо! Немного выше среднего ✓";
  return "Есть потенциал для улучшения";
};

const getPartBFeedback = () => {
  if (partBTime.value <= 60) return "Выдающийся результат! 🏆";
  if (partBTime.value <= 75) return "Отлично! В норме ⭐";
  if (partBTime.value <= 90) return "Хорошо! Чуть выше среднего ✓";
  return "Требуется практика";
};

const getBARatioFeedback = () => {
  const ratio = parseFloat(baRatio.value);
  if (ratio <= 2.5) return "Отличная когнитивная гибкость! 🧠";
  if (ratio <= 3.0) return "Хорошее переключение внимания ✓";
  if (ratio <= 3.5) return "В пределах нормы";
  return "Переключение внимания требует тренировки";
};

const getNodeClass = (node) => {
  if (node.completed) {
    return currentPart.value === "A"
      ? "node-completed-a"
      : node.isNumber
        ? "node-completed-b-number"
        : "node-completed-b-letter";
  }
  if (node.id === nextNode.value?.id) {
    return "node-next";
  }
  return currentPart.value === "A"
    ? "node-default-a"
    : node.isNumber
      ? "node-default-b-number"
      : "node-default-b-letter";
};

const restartTest = () => {
  phase.value = "intro";
  currentPart.value = "A";
  nodes.value = [];
  trails.value = [];
  connectedNodes.value = [];
  nextNode.value = null;
  timer.value = 0;
  errors.value = 0;
  partATime.value = 0;
  partBTime.value = 0;
  partAErrors.value = 0;
  partBErrors.value = 0;
  stopTimer();
};

const shareResults = () => {
  const text = `🔗 Я прошёл Trail Making Test в MindQ Lab!\n\n⏱️ Мои результаты:\n• Часть A: ${formatTime(
    partATime.value
  )}\n• Часть B: ${formatTime(partBTime.value)}\n• Коэффициент B/A: ${baRatio.value
    }\n\nПопробуй и ты! mindqlab.com`;

  if (navigator.share) {
    navigator
      .share({
        title: "Trail Making Test - MindQ Lab",
        text: text,
        url: window.location.href,
      })
      .catch(() => { });
  } else {
    navigator.clipboard.writeText(text);
    alert("Результаты скопированы в буфер обмена!");
  }
};

onUnmounted(() => {
  stopTimer();
});
</script>
<style scoped>
.btn-primary {
  @apply inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white font-semibold hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none;
}

.btn-secondary {
  @apply inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-600/50 text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 transition-all duration-300 transform hover:scale-105 shadow-sm dark:shadow-none;
}

.info-card {
  @apply p-6 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-emerald-500/10 backdrop-blur-sm shadow-sm dark:shadow-none;
}

.info-card-small {
  @apply p-5 rounded-xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-emerald-500/10 text-center shadow-sm dark:shadow-none;
}

.instruction-card {
  @apply p-5 rounded-xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-emerald-500/10 hover:border-emerald-500/30 transition-all duration-300 shadow-sm dark:shadow-none;
}

.result-card {
  @apply p-6 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 shadow-sm dark:shadow-none;
}

.performance-card {
  @apply p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-white dark:from-slate-900/80 dark:to-slate-800/80 border border-slate-200 dark:border-emerald-500/30 shadow-sm dark:shadow-none;
}

.stat-comparison {
  @apply p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700/50 text-center;
}

.part-badge {
  @apply px-4 py-2 rounded-lg text-white font-bold text-sm shadow-lg;
}

.timer-display {
  @apply px-6 py-3 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-cyan-500/20 text-2xl font-mono font-bold text-cyan-600 dark:text-cyan-400 shadow-sm dark:shadow-none;
}

.canvas-container {
  @apply relative rounded-2xl overflow-hidden bg-white dark:bg-slate-900/50 border-2 border-slate-200 dark:border-emerald-500/20 shadow-xl shadow-slate-200/50 dark:shadow-emerald-500/10;
}

.trail-canvas {
  @apply w-full h-auto;
  max-height: 600px;
}

/* Node styles */
.node-circle {
  @apply cursor-pointer transition-all duration-200;
}

.node-default-a {
  @apply fill-white dark:fill-slate-800 stroke-emerald-500;
  stroke-width: 3;
}

.node-default-a:hover {
  @apply fill-emerald-50 dark:fill-slate-700 stroke-emerald-400;
  stroke-width: 4;
}

.node-default-b-number {
  @apply fill-white dark:fill-slate-800 stroke-cyan-500;
  stroke-width: 3;
}

.node-default-b-number:hover {
  @apply fill-cyan-50 dark:fill-slate-700 stroke-cyan-400;
  stroke-width: 4;
}

.node-default-b-letter {
  @apply fill-white dark:fill-slate-800 stroke-teal-500;
  stroke-width: 3;
}

.node-default-b-letter:hover {
  @apply fill-teal-50 dark:fill-slate-700 stroke-teal-400;
  stroke-width: 4;
}

.node-completed-a {
  @apply fill-emerald-500 stroke-emerald-400;
  stroke-width: 2;
  cursor: default;
}

.node-completed-b-number {
  @apply fill-cyan-500 stroke-cyan-400;
  stroke-width: 2;
  cursor: default;
}

.node-completed-b-letter {
  @apply fill-teal-500 stroke-teal-400;
  stroke-width: 2;
  cursor: default;
}

.node-next {
  @apply fill-yellow-400 stroke-yellow-300;
  stroke-width: 5;
  animation: pulse-glow 1.5s ease-in-out infinite;
}

.node-text {
  @apply text-2xl font-black fill-slate-800 dark:fill-white pointer-events-none select-none;
}

.node-text-completed {
  @apply fill-white;
}

.trail-line {
  animation: drawLine 0.3s ease-out;
}

.target-pulse {
  @apply fill-none stroke-yellow-400;
  stroke-width: 3;
  animation: pulse-ring 1.5s ease-out infinite;
}

@keyframes pulse-glow {

  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }

  50% {
    opacity: 0.7;
    transform: scale(1.05);
  }
}

@keyframes pulse-ring {
  0% {
    opacity: 1;
    stroke-width: 3;
  }

  100% {
    opacity: 0;
    stroke-width: 0;
    r: 50;
  }
}

@keyframes drawLine {
  from {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
  }

  to {
    stroke-dasharray: 1000;
    stroke-dashoffset: 0;
  }
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

@keyframes shake {

  0%,
  100% {
    transform: translateX(0);
  }

  25% {
    transform: translateX(-10px);
  }

  75% {
    transform: translateX(10px);
  }
}

.animate-bounce-slow {
  animation: bounce-slow 2s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 2s ease-in-out infinite;
}

.animate-shake {
  animation: shake 0.5s ease-out;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .node-text {
    @apply text-xl;
  }

  .timer-display {
    @apply px-4 py-2 text-xl;
  }

  .canvas-container {
    @apply border;
  }

  .info-card,
  .result-card,
  .performance-card {
    @apply p-4;
  }
}

/* Touch feedback */
@media (hover: none) {
  .node-circle:active {
    transform: scale(0.95);
  }
}
</style>
