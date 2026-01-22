<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-8 font-sans transition-colors duration-500">
    <div class="max-w-4xl mx-auto">

      <!-- Header / Instructions State -->
      <div v-if="gameState === 'start'" class="text-center space-y-8 animate-fade-in-up">
        <div class="space-y-4">
          <div
            class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white mb-4 shadow-lg shadow-indigo-500/30">
            <i class="fas fa-random text-3xl"></i>
          </div>
          <h1 class="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
            Mental Shift
          </h1>
          <p class="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Тренировка когнитивной гибкости — способности быстро переключаться между разными правилами мышления.
          </p>
        </div>

        <div
          class="bg-white dark:bg-slate-900/50 rounded-3xl p-8 border border-slate-200 dark:border-white/10 shadow-xl backdrop-blur-sm text-left">
          <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <i class="fas fa-info-circle text-cyan-500"></i> Как это работает
          </h3>

          <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <div class="p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-500/20">
              <div
                class="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold mb-3 shadow">
                1</div>
              <p class="text-sm text-slate-700 dark:text-slate-300">Цвет фона подсказывает, какое правило сейчас активно
              </p>
            </div>
            <div
              class="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-500/20">
              <div
                class="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold mb-3 shadow">
                2</div>
              <p class="text-sm text-slate-700 dark:text-slate-300">Вы видите число, фигуру или цветное слово</p>
            </div>
            <div
              class="p-4 rounded-2xl bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-500/20">
              <div
                class="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold mb-3 shadow">
                3</div>
              <p class="text-sm text-slate-700 dark:text-slate-300">Нажимаете ВЛЕВО или ВПРАВО согласно правилу</p>
            </div>
            <div class="p-4 rounded-2xl bg-pink-50 dark:bg-pink-900/20 border border-pink-100 dark:border-pink-500/20">
              <div
                class="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold mb-3 shadow">
                !</div>
              <p class="text-sm text-slate-700 dark:text-slate-300">Правила меняются каждые 3-6 раундов — будьте
                внимательны!</p>
            </div>
          </div>

          <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-4">4 Правила (следите за цветом фона!)</h3>
          <div class="space-y-3 mb-8">
            <div
              class="flex items-center gap-4 p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700/50">
              <div class="w-4 h-4 rounded-full bg-blue-500 shadow flex-shrink-0 animate-pulse"></div>
              <div class="flex-1">
                <span class="font-bold text-blue-800 dark:text-blue-300 block">СИНИЙ ФОН — Чётность числа</span>
                <span class="text-sm text-slate-600 dark:text-slate-400">Чётное (2, 4, 6, 8) → <b>ВЛЕВО</b> | Нечётное
                  (1, 3, 5, 7, 9) → <b>ВПРАВО</b></span>
              </div>
            </div>
            <div
              class="flex items-center gap-4 p-3 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700/50">
              <div class="w-4 h-4 rounded-full bg-yellow-500 shadow flex-shrink-0 animate-pulse"></div>
              <div class="flex-1">
                <span class="font-bold text-yellow-800 dark:text-yellow-300 block">ЖЁЛТЫЙ ФОН — Величина числа</span>
                <span class="text-sm text-slate-600 dark:text-slate-400">Меньше 5 (1, 2, 3, 4) → <b>ВЛЕВО</b> | 5 и
                  больше (5, 6, 7, 8, 9) → <b>ВПРАВО</b></span>
              </div>
            </div>
            <div
              class="flex items-center gap-4 p-3 rounded-xl bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-700/50">
              <div class="w-4 h-4 rounded-full bg-green-500 shadow flex-shrink-0 animate-pulse"></div>
              <div class="flex-1">
                <span class="font-bold text-green-800 dark:text-green-300 block">ЗЕЛЁНЫЙ ФОН — Форма фигуры</span>
                <span class="text-sm text-slate-600 dark:text-slate-400">Острые углы (◼️▲◆⭐⬡) → <b>ВЛЕВО</b> | Округлые
                  (⭕🥚❤️🌙) → <b>ВПРАВО</b></span>
              </div>
            </div>
            <div
              class="flex items-center gap-4 p-3 rounded-xl bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-700/50">
              <div class="w-4 h-4 rounded-full bg-red-500 shadow flex-shrink-0 animate-pulse"></div>
              <div class="flex-1">
                <span class="font-bold text-red-800 dark:text-red-300 block">КРАСНЫЙ ФОН — Цвет текста (НЕ
                  слово!)</span>
                <span class="text-sm text-slate-600 dark:text-slate-400">КРАСНЫЙ текст → <b>ВЛЕВО</b> | ЗЕЛЁНЫЙ или
                  СИНИЙ текст → <b>ВПРАВО</b></span>
                <div class="text-xs text-red-600 dark:text-red-400 font-bold mt-1">⚠️ Игнорируйте значение слова,
                  смотрите только на ЦВЕТ БУКВ!</div>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <h4 class="font-bold text-slate-900 dark:text-white">Выберите уровень сложности:</h4>
            <div class="grid sm:grid-cols-3 gap-4">
              <button @click="selectLevel('easy')" class="difficulty-card group">
                <div class="text-lg font-bold text-emerald-600 dark:text-emerald-400 mb-1">Уровень 1-2</div>
                <div class="text-sm text-slate-600 dark:text-slate-400">40 раундов</div>
                <div class="text-xs text-slate-500 dark:text-slate-500 mt-2">Медленнее переключения</div>
                <div
                  class="absolute inset-0 border-2 border-transparent group-hover:border-emerald-500/50 rounded-xl transition-all">
                </div>
              </button>
              <button @click="selectLevel('medium')" class="difficulty-card group">
                <div class="text-lg font-bold text-yellow-600 dark:text-yellow-400 mb-1">Уровень 3-4</div>
                <div class="text-sm text-slate-600 dark:text-slate-400">50 раундов</div>
                <div class="text-xs text-slate-500 dark:text-slate-500 mt-2">Умеренный темп</div>
                <div
                  class="absolute inset-0 border-2 border-transparent group-hover:border-yellow-500/50 rounded-xl transition-all">
                </div>
              </button>
              <button @click="selectLevel('hard')" class="difficulty-card group">
                <div class="text-lg font-bold text-red-600 dark:text-red-400 mb-1">Уровень 5</div>
                <div class="text-sm text-slate-600 dark:text-slate-400">60 раундов</div>
                <div class="text-xs text-slate-500 dark:text-slate-500 mt-2">Быстрый темп</div>
                <div
                  class="absolute inset-0 border-2 border-transparent group-hover:border-red-500/50 rounded-xl transition-all">
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Game Running State -->
      <div v-else-if="gameState === 'running'"
        class="flex flex-col h-[80vh] items-center justify-center relative rounded-3xl overflow-hidden transition-colors duration-500 border-4 border-slate-200 dark:border-transparent shadow-2xl"
        :class="currentRule.bgClass">

        <!-- Progress Bar -->
        <div class="absolute top-0 left-0 right-0 h-2 bg-black/10">
          <div class="h-full bg-white/50 transition-all duration-300"
            :style="{ width: `${(currentRound / totalRounds) * 100}%` }"></div>
        </div>

        <!-- Timer/Stats -->
        <div
          class="absolute top-6 left-6 right-6 flex justify-between text-black/60 dark:text-white/80 font-bold text-xl mix-blend-overlay">
          <span>Раунд {{ currentRound }} / {{ totalRounds }}</span>
          <span>Ошибки: {{ errors }}</span>
        </div>

        <!-- Stimulus -->
        <div class="relative z-10 transform transition-all duration-200" :key="currentStimulus.id"
          :class="{ 'scale-110': feedback === 'correct', 'scale-90 shake': feedback === 'wrong' }">
          <!-- Text Stimulus (Number/Word) -->
          <div v-if="currentStimulus.type === 'text'" class="text-7xl sm:text-9xl font-black drop-shadow-xl select-none"
            :style="{ color: currentStimulus.color }">
            {{ currentStimulus.value }}
          </div>
          <!-- Icon Stimulus -->
          <div v-else-if="currentStimulus.type === 'icon'"
            class="text-8xl sm:text-[10rem] drop-shadow-xl select-none animate-bounce-slight"
            :style="{ color: currentStimulus.color }">
            {{ currentStimulus.value }}
          </div>
        </div>

        <!-- Feedback Overlay -->
        <div v-if="feedback" class="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <i v-if="feedback === 'correct'"
            class="fas fa-check text-8xl text-white/80 drop-shadow-lg animate-scale-in"></i>
          <i v-if="feedback === 'wrong'" class="fas fa-times text-8xl text-red-500/80 drop-shadow-lg animate-shake"></i>
        </div>

        <!-- Controls Hint -->
        <!-- Controls Hint (Clickable for Mobile) -->
        <div class="absolute bottom-10 left-0 right-0 flex justify-between px-10 sm:px-20 opacity-80 z-30">
          <button @click.stop="handleInput('left')"
            class="text-center group active:scale-95 transition-transform p-4 rounded-xl hover:bg-white/10">
            <div class="text-4xl mb-2 group-hover:-translate-x-1 transition-transform">⬅️</div>
            <div
              class="font-bold uppercase tracking-widest text-sm bg-white/20 px-3 py-1 rounded-lg backdrop-blur shadow-sm">
              Влево</div>
            <div class="text-xs mt-1 font-medium bg-black/20 text-white px-2 py-1 rounded inline-block">{{ getLeftHint()
              }}</div>
          </button>
          <button @click.stop="handleInput('right')"
            class="text-center group active:scale-95 transition-transform p-4 rounded-xl hover:bg-white/10">
            <div class="text-4xl mb-2 group-hover:translate-x-1 transition-transform">➡️</div>
            <div
              class="font-bold uppercase tracking-widest text-sm bg-white/20 px-3 py-1 rounded-lg backdrop-blur shadow-sm">
              Вправо</div>
            <div class="text-xs mt-1 font-medium bg-black/20 text-white px-2 py-1 rounded inline-block">{{
              getRightHint() }}</div>
          </button>
        </div>
      </div>

      <!-- Results State -->
      <div v-else-if="gameState === 'finished'" class="text-center space-y-8 animate-fade-in-up">
        <div
          class="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-white/10 shadow-2xl max-w-2xl mx-auto">
          <div
            class="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/30">
            <i class="fas fa-flag-checkered text-4xl text-white"></i>
          </div>

          <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-2">Тренировка завершена!</h2>
          <p class="text-slate-600 dark:text-slate-400 mb-8">Отличная работа над когнитивной гибкостью.</p>

          <div class="grid grid-cols-2 gap-4 mb-8">
            <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800">
              <div class="text-sm text-slate-500 dark:text-slate-400 mb-1">Точность</div>
              <div class="text-3xl font-black text-slate-900 dark:text-white">{{ accuracy }}%</div>
            </div>
            <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800">
              <div class="text-sm text-slate-500 dark:text-slate-400 mb-1">Среднее время</div>
              <div class="text-3xl font-black text-slate-900 dark:text-white">{{ avgTime }}мс</div>
            </div>
            <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800">
              <div class="text-sm text-slate-500 dark:text-slate-400 mb-1">Ошибки</div>
              <div class="text-3xl font-black text-red-500">{{ errors }}</div>
            </div>
            <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800">
              <div class="text-sm text-slate-500 dark:text-slate-400 mb-1">Цена переключения</div>
              <div class="text-3xl font-black text-purple-500">{{ switchCost }}мс</div>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button @click="gameState = 'start'"
              class="px-8 py-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition">
              Меню
            </button>
            <button @click="startGame"
              class="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:shadow-lg hover:shadow-indigo-500/25 transition transform hover:-translate-y-1">
              Повторить
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

definePageMeta({
  layout: "laboratory",
});

// TYPES
const LEVELS = {
  easy: { rounds: 40, switchFreq: 6 },
  medium: { rounds: 50, switchFreq: 4 },
  hard: { rounds: 60, switchFreq: 3 }
};

const RULES = {
  PARITY: { id: 'parity', name: 'Чётность', bgClass: 'bg-blue-500', left: 'Чётное', right: 'Нечётное' },
  MAGNITUDE: { id: 'magnitude', name: 'Величина', bgClass: 'bg-yellow-400', left: '< 5', right: '>= 5' },
  SHAPE: { id: 'shape', name: 'Форма', bgClass: 'bg-emerald-500', left: 'Острые', right: 'Округлые' },
  COLOR: { id: 'color', name: 'Цвет', bgClass: 'bg-red-500', left: 'Красный', right: 'Зеленый/Синий' }
};

// STATE
const gameState = ref('start'); // start, running, finished
const difficulty = ref('medium');
const currentRound = ref(0);
const totalRounds = ref(0);
const errors = ref(0);
const times = ref([]);
const startTime = ref(0);
const feedback = ref(null);

const currentRule = ref(RULES.PARITY);
const currentStimulus = ref({});
const previousRuleId = ref(null);
const switchTrials = ref([]); // Stores times for trials where rule changed
const repeatTrials = ref([]); // Stores times for trials where rule stayed same
const rawData = ref([]); // Stores detailed round info

// LOGIC
const selectLevel = (level) => {
  difficulty.value = level;
  startGame();
};

const startGame = () => {
  gameState.value = 'running';
  currentRound.value = 0;
  errors.value = 0;
  times.value = [];
  switchTrials.value = [];
  repeatTrials.value = [];
  rawData.value = []; // Reset raw data
  totalRounds.value = LEVELS[difficulty.value].rounds;
  generateRound();
};

const generateRound = () => {
  // Determine if we switch rules
  // Simple logic: Change rule every N rounds based on difficulty
  const freq = LEVELS[difficulty.value].switchFreq;
  const shouldSwitch = currentRound.value > 0 && currentRound.value % freq === 0;

  previousRuleId.value = currentRule.value.id;

  if (shouldSwitch || currentRound.value === 0) {
    // Pick a random new rule
    const ruleKeys = Object.keys(RULES).filter(k => RULES[k].id !== currentRule.value.id);
    const nextKey = ruleKeys[Math.floor(Math.random() * ruleKeys.length)];
    currentRule.value = RULES[nextKey];
  }

  // Generate Stimulus based on current Rule
  currentStimulus.value = createStimulus(currentRule.value);

  startTime.value = performance.now();
  currentRound.value++;
};

const createStimulus = (rule) => {
  const id = Math.random().toString(36).substring(7);
  // Default text color black/white unless Color rule
  let color = 'white';

  // Generate Stimulus based on current Rule
  // Match rule IDs directly (parity, magnitude, shape, color)
  if (rule.id === 'parity') {
    // Generate number 1-9
    const val = Math.floor(Math.random() * 9) + 1;
    return { id, type: 'text', value: val, answer: val % 2 === 0 ? 'left' : 'right', color, background: 'hsl(210, 70%, 55%)' };
  }

  if (rule.id === 'magnitude') {
    const val = Math.floor(Math.random() * 9) + 1;
    return { id, type: 'text', value: val, answer: val < 5 ? 'left' : 'right', color, background: 'hsl(45, 70%, 55%)' };
  }

  if (rule.id === 'shape') {
    const sharp = ['◼️', '▲', '◆', '⭐', '⬡'];
    const round = ['⭕', '🥚', '❤️', '🌙'];
    const isSharp = Math.random() > 0.5;
    const arr = isSharp ? sharp : round;
    const val = arr[Math.floor(Math.random() * arr.length)];
    return { id, type: 'icon', value: val, answer: isSharp ? 'left' : 'right', color, background: 'hsl(120, 50%, 45%)' };
  }

  if (rule.id === 'color') {
    // RED vs GREEN/BLUE text. Word meaning should be incongruent if possible (Stroop)
    const colors = [
      { name: 'КРАСНЫЙ', css: '#ef4444', isRed: true },
      { name: 'ЗЕЛЁНЫЙ', css: '#22c55e', isRed: false },
      { name: 'СИНИЙ', css: '#3b82f6', isRed: false }
    ];

    const ink = colors[Math.floor(Math.random() * colors.length)];
    // Pick a random word that might conflict
    const word = colors[Math.floor(Math.random() * colors.length)].name;

    return {
      id,
      type: 'text',
      value: word,
      answer: ink.isRed ? 'left' : 'right',
      color: ink.css,
      background: 'hsl(0, 70%, 65%)'
    };
  }

  return { id, type: 'text', value: '?', answer: 'left', background: 'gray' };
};

const handleInput = (direction) => {
  if (gameState.value !== 'running') return;
  if (feedback.value) return; // Wait for animation

  const rt = performance.now() - startTime.value;
  const isCorrect = direction === currentStimulus.value.answer;
  const isSwitch = previousRuleId.value !== currentRule.value.id && currentRound.value > 1;

  // Record stats
  if (isCorrect) {
    if (isSwitch) {
      switchTrials.value.push(rt);
    } else {
      repeatTrials.value.push(rt);
    }
  } else {
    errors.value++;
  }

  // Add to rawData
  rawData.value.push({
    round: currentRound.value,
    stimulus: {
      type: currentStimulus.value.type,
      value: typeof currentStimulus.value.value === 'number' ? currentStimulus.value.value.toString() : currentStimulus.value.value,
      background: currentStimulus.value.background,
      ...(currentStimulus.value.color !== 'white' ? { displayColor: currentStimulus.value.color } : {})
    },
    rule: currentRule.value.id,
    userResponse: direction === 'left' ? 'LEFT' : 'RIGHT',
    correctResponse: currentStimulus.value.answer === 'left' ? 'LEFT' : 'RIGHT',
    correct: isCorrect,
    rt: Math.round(rt),
    isSwitch: isSwitch
  });

  // Feedback Animation
  feedback.value = isCorrect ? 'correct' : 'wrong';

  setTimeout(() => {
    feedback.value = null;
    if (currentRound.value >= totalRounds.value) {
      finishGame();
    } else {
      generateRound();
    }
  }, 400); // 400ms delay for feedback
};

const finishGame = async () => {
  gameState.value = 'finished';
  await saveResults();
};

const saveResults = async () => {
  try {
    const { $firestore, $auth } = useNuxtApp();
    const user = $auth.currentUser;

    if (!user) {
      console.error('User not authenticated - cannot save mental shift');
      return;
    }

    const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');

    // Calculate derived stats
    const normalRTVal = repeatTrials.value.length > 0
      ? Math.round(repeatTrials.value.reduce((a, b) => a + b, 0) / repeatTrials.value.length)
      : 0;

    const switchRTVal = switchTrials.value.length > 0
      ? Math.round(switchTrials.value.reduce((a, b) => a + b, 0) / switchTrials.value.length)
      : 0;

    // Basic score calculation
    const scoreVal = Math.max(0, Math.round(
      (accuracy.value * 0.5 +
        (1 - Math.min(1, avgTime.value / 2000)) * 25 +
        (1 - Math.min(1, Math.max(0, switchCost.value) / 1000)) * 25
      ) * 10
    ));

    const difficultyMap = { 'easy': 1, 'medium': 3, 'hard': 5 };

    // Match expected SCHEMA exactly
    const sessionData = {
      sessionId: `ms-${Date.now()}`,
      createdAt: serverTimestamp(),
      totalRounds: totalRounds.value,
      accuracy: accuracy.value,
      avgRT: avgTime.value,
      normalRT: normalRTVal, // Computed correctly
      switchRT: switchRTVal, // Computed correctly
      switchCost: switchCost.value,
      score: scoreVal,
      difficultyLevel: difficultyMap[difficulty.value] || 1,
      rulesUsed: [...new Set(rawData.value.map(r => r.rule))],
      rawData: rawData.value // Full history
    };

    const docRef = await addDoc(collection($firestore, `users/${user.uid}/mentalShiftResults`), sessionData);
  } catch (e) {
    console.error('Error saving results:', e);
  }
};

// KEYBOARD CONTROLS
const handleKey = (e) => {
  if (e.key === 'ArrowLeft') handleInput('left');
  if (e.key === 'ArrowRight') handleInput('right');
};

onMounted(() => {
  window.addEventListener('keydown', handleKey);
});
onUnmounted(() => {
  window.removeEventListener('keydown', handleKey);
});

// COMPUTED STATS
const accuracy = computed(() => {
  if (totalRounds.value === 0) return 0;
  return Math.round(((totalRounds.value - errors.value) / totalRounds.value) * 100);
});

const avgTime = computed(() => {
  const all = [...switchTrials.value, ...repeatTrials.value];
  if (all.length === 0) return 0;
  return Math.round(all.reduce((a, b) => a + b, 0) / all.length);
});

const switchCost = computed(() => {
  if (switchTrials.value.length === 0 || repeatTrials.value.length === 0) return 0;
  const avgSwitch = switchTrials.value.reduce((a, b) => a + b, 0) / switchTrials.value.length;
  const avgRepeat = repeatTrials.value.reduce((a, b) => a + b, 0) / repeatTrials.value.length;
  return Math.round(avgSwitch - avgRepeat);
});

const getLeftHint = () => currentRule.value ? currentRule.value.left : '';
const getRightHint = () => currentRule.value ? currentRule.value.right : '';

</script>

<style scoped>
.difficulty-card {
  @apply relative p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 hover:-translate-y-1 hover:shadow-lg transition-all text-left overflow-hidden;
}

.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shake {

  0%,
  100% {
    transform: translateX(0);
  }

  25% {
    transform: translateX(-5px);
  }

  75% {
    transform: translateX(5px);
  }
}

.animate-shake {
  animation: shake 0.3s ease-in-out;
}

.animate-scale-in {
  animation: scaleIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes scaleIn {
  from {
    transform: scale(0);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}

.shake {
  animation: shake 0.4s ease-in-out;
}
</style>
