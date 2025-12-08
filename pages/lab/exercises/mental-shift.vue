<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-4">
    
    <!-- Header / Progress -->
    <div v-if="gameState !== 'idle' && gameState !== 'completed'" class="w-full max-w-3xl mb-8 flex justify-between items-center animate-fade-in-up">
      <div class="text-slate-500 dark:text-slate-400 font-medium">
        Раунд {{ currentRoundIndex + 1 }} / {{ totalRounds }}
      </div>
      <div class="flex items-center gap-4">
        <div class="px-3 py-1 rounded-full bg-slate-200 dark:bg-white/10 text-xs font-bold text-slate-600 dark:text-slate-300 uppercase">
          Уровень {{ difficultyLevel }}
        </div>
      </div>
    </div>

    <!-- IDLE STATE (Start Screen with Tutorial) -->
    <div v-if="gameState === 'idle'" class="max-w-3xl text-center animate-fade-in-up">
      <div class="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 shadow-xl shadow-purple-500/30">
        <i class="fas fa-brain text-3xl text-white"></i>
      </div>
      <h1 class="text-3xl font-bold text-slate-900 dark:text-white mb-4">
        Mental Shift
      </h1>
      <p class="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed text-lg">
        Тренировка когнитивной гибкости — способности быстро переключаться между разными правилами мышления.
      </p>

      <!-- How It Works -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 mb-6 text-left border border-slate-200 dark:border-white/5">
        <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <i class="fas fa-info-circle text-purple-500"></i>
          Как это работает
        </h2>
        <div class="space-y-3 text-slate-600 dark:text-slate-300">
          <p><strong>1. Цвет фона</strong> подсказывает, какое правило сейчас активно</p>
          <p><strong>2. Вы видите</strong> число, фигуру или цветное слово</p>
          <p><strong>3. Нажимаете</strong> ВЛЕВО или ВПРАВО согласно правилу</p>
          <p><strong>4. Правила меняются</strong> каждые 3-6 раундов — будьте внимательны!</p>
        </div>
      </div>

      <!-- Rules Explanation -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 mb-6 text-left border border-slate-200 dark:border-white/5">
        <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-4">
          4 Правила (следите за цветом фона!)
        </h2>
        <div class="space-y-4">
          <!-- Rule 1 -->
          <div class="p-4 rounded-lg" style="background: hsl(210, 70%, 55%)">
            <div class="font-bold text-white mb-2">🔵 СИНИЙ ФОН — Чётность числа</div>
            <div class="text-white/90 text-sm">Чётное (2, 4, 6, 8) → ВЛЕВО | Нечётное (1, 3, 5, 7, 9) → ВПРАВО</div>
          </div>

          <!-- Rule 2 -->
          <div class="p-4 rounded-lg" style="background: hsl(45, 70%, 55%)">
            <div class="font-bold text-white mb-2">🟡 ЖЁЛТЫЙ ФОН — Величина числа</div>
            <div class="text-white/90 text-sm">Меньше 5 (1, 2, 3, 4) → ВЛЕВО | 5 и больше (5, 6, 7, 8, 9) → ВПРАВО</div>
          </div>

          <!-- Rule 3 -->
          <div class="p-4 rounded-lg" style="background: hsl(120, 50%, 45%)">
            <div class="font-bold text-white mb-2">🟢 ЗЕЛЁНЫЙ ФОН — Форма фигуры</div>
            <div class="text-white/90 text-sm mb-1">Острые углы (◼️▲◆⭐⬡) → ВЛЕВО | Округлые (⭕🥚❤️🌙) → ВПРАВО</div>
            <div class="text-white/80 text-xs">Квадрат/Треугольник/Ромб/Звезда/Шестиугольник vs Круг/Овал/Сердце/Полумесяц</div>
          </div>

          <!-- Rule 4 -->
          <div class="p-4 rounded-lg" style="background: hsl(0, 70%, 65%)">
            <div class="font-bold text-white mb-2">🔴 КРАСНЫЙ ФОН — Цвет текста (НЕ слово!)</div>
            <div class="text-white/90 text-sm">
              <span style="color: #ef4444">КРАСНЫЙ</span> текст → ВЛЕВО | 
              <span style="color: #22c55e">ЗЕЛЁНЫЙ</span> или 
              <span style="color: #3b82f6">СИНИЙ</span> текст → ВПРАВО
            </div>
            <div class="text-white/80 text-xs mt-2">⚠️ Игнорируйте значение слова, смотрите только на ЦВЕТ БУКВ!</div>
          </div>
        </div>
      </div>

      <!-- Difficulty Selection -->
      <div class="space-y-4">
        <h3 class="text-lg font-bold text-slate-900 dark:text-white">Выберите уровень сложности:</h3>
        <button @click="startGame(1)" class="w-full py-4 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-white/10 hover:border-green-500 dark:hover:border-green-400 group transition-all text-left px-6 shadow-sm hover:shadow-md">
          <span class="block text-lg font-bold text-slate-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400">Уровень 1-2 (Лёгкий)</span>
          <span class="text-sm text-slate-500">40 раундов — медленнее переключения</span>
        </button>
        <button @click="startGame(3)" class="w-full py-4 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-white/10 hover:border-yellow-500 dark:hover:border-yellow-400 group transition-all text-left px-6 shadow-sm hover:shadow-md">
          <span class="block text-lg font-bold text-slate-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400">Уровень 3-4 (Средний)</span>
          <span class="text-sm text-slate-500">50 раундов — умеренный темп</span>
        </button>
        <button @click="startGame(5)" class="w-full py-4 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-white/10 hover:border-red-500 dark:hover:border-red-400 group transition-all text-left px-6 shadow-sm hover:shadow-md">
          <span class="block text-lg font-bold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400">Уровень 5 (Сложный)</span>
          <span class="text-sm text-slate-500">60 раундов — быстрые переключения</span>
        </button>
      </div>
    </div>

    <!-- GAME STATE -->
    <div v-else-if="gameState === 'playing' || gameState === 'feedback'" class="w-full max-w-3xl animate-fade-in-up">
      
      <!-- Rule Change Notification -->
      <div v-if="showRuleChange" class="mb-6 p-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center font-bold animate-bounce-in shadow-lg">
        <i class="fas fa-exchange-alt mr-2"></i>
        Новое правило: {{ currentRuleName }}
      </div>

      <!-- Stimulus Display -->
      <div 
        class="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-12 mb-8 border border-slate-100 dark:border-white/5 min-h-[300px] flex items-center justify-center transition-all duration-500"
        :style="{ backgroundColor: currentStimulus?.background }"
      >
        <!-- Number Display -->
        <div v-if="currentStimulus?.type === 'number'" 
          class="text-8xl font-black text-white drop-shadow-lg">
          {{ currentStimulus.value }}
        </div>

        <!-- Shape Display -->
        <div v-else-if="currentStimulus?.type === 'shape'" 
          class="text-9xl">
          {{ getShapeEmoji(currentStimulus.value) }}
        </div>

        <!-- Stroop Word Display -->
        <div v-else-if="currentStimulus?.type === 'colorWord'" 
          class="text-8xl font-black drop-shadow-lg"
          :style="{ color: currentStimulus.displayColor }">
          {{ currentStimulus.value }}
        </div>
      </div>

      <!-- Rule Description -->
      <div class="mb-6 text-center p-3 rounded-lg bg-slate-100 dark:bg-slate-700/50 text-sm text-slate-600 dark:text-slate-300">
        <i class="fas fa-info-circle mr-2"></i>
        {{ currentRuleDescription }}
      </div>

      <!-- Response Buttons -->
      <div class="grid grid-cols-2 gap-6">
        <button 
          @click="onSelectAnswer('LEFT')"
          :disabled="gameState === 'feedback'"
          class="h-24 rounded-xl text-2xl font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center"
          :class="getButtonClass('LEFT')"
        >
          <i class="fas fa-arrow-left mr-3"></i>
          ВЛЕВО
        </button>
        <button 
          @click="onSelectAnswer('RIGHT')"
          :disabled="gameState === 'feedback'"
          class="h-24 rounded-xl text-2xl font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center"
          :class="getButtonClass('RIGHT')"
        >
          ВПРАВО
          <i class="fas fa-arrow-right ml-3"></i>
        </button>
      </div>

      <!-- Feedback -->
      <div v-if="gameState === 'feedback'" class="mt-6 p-4 rounded-xl animate-fade-in-up text-center" 
        :class="isLastAnswerCorrect ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/40' : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/40'">
        <div class="flex items-center justify-center gap-3 mb-2">
          <i :class="['fas text-2xl', isLastAnswerCorrect ? 'fa-check-circle text-green-500' : 'fa-times-circle text-red-500']"></i>
          <h3 class="font-bold text-xl" :class="isLastAnswerCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'">
            {{ isLastAnswerCorrect ? 'Верно!' : 'Неверно' }}
          </h3>
        </div>
        <p class="text-slate-600 dark:text-slate-300 text-sm">
          Время реакции: {{ lastReactionTime }}мс
        </p>
      </div>
    </div>

    <!-- COMPLETED STATE -->
    <div v-else-if="gameState === 'completed'" class="max-w-2xl w-full text-center animate-fade-in-up">
      <div class="mb-8">
        <div class="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 shadow-2xl shadow-green-500/30 mb-6">
          <i class="fas fa-trophy text-4xl text-white"></i>
        </div>
        <h2 class="text-4xl font-bold text-slate-900 dark:text-white mb-2">Тренировка завершена!</h2>
        <p class="text-slate-500 dark:text-slate-400">Отличная работа над когнитивной гибкостью</p>
      </div>

      <!-- Metrics Grid with Explanations -->
      <div class="grid grid-cols-2 gap-4 mb-8">
        <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-white/5">
          <div class="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-1">{{ sessionMetrics.score }}</div>
          <div class="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2">Итоговый балл</div>
          <div class="text-xs text-slate-400">Комплексная оценка (0-100) на основе точности, скорости и гибкости</div>
        </div>
        <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-white/5">
          <div class="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">{{ sessionMetrics.accuracy }}%</div>
          <div class="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2">Точность</div>
          <div class="text-xs text-slate-400">Процент правильных ответов из всех раундов</div>
        </div>
        <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-white/5">
          <div class="text-4xl font-bold text-cyan-600 dark:text-cyan-400 mb-1">{{ sessionMetrics.avgRT }}мс</div>
          <div class="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2">Среднее время</div>
          <div class="text-xs text-slate-400">Средняя скорость реакции по всем раундам</div>
        </div>
        <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-white/5">
          <div class="text-4xl font-bold text-pink-600 dark:text-pink-400 mb-1">{{ sessionMetrics.switchCost }}мс</div>
          <div class="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2">Цена переключения</div>
          <div class="text-xs text-slate-400">Насколько медленнее вы реагируете при смене правила (чем меньше, тем лучше)</div>
        </div>
      </div>

      <!-- Detailed Stats with Explanations -->
      <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-white/5 mb-8">
        <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <i class="fas fa-chart-line text-purple-500"></i>
          Детальная статистика
        </h3>
        <div class="space-y-4">
          <div class="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-700/30 rounded-lg">
            <div>
              <div class="font-semibold text-slate-900 dark:text-white">Обычные раунды</div>
              <div class="text-xs text-slate-500 dark:text-slate-400">Время реакции когда правило не менялось</div>
            </div>
            <div class="text-2xl font-bold text-slate-900 dark:text-white">{{ sessionMetrics.normalRT }}мс</div>
          </div>
          <div class="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-700/30 rounded-lg">
            <div>
              <div class="font-semibold text-slate-900 dark:text-white">Раунды с переключением</div>
              <div class="text-xs text-slate-500 dark:text-slate-400">Время реакции сразу после смены правила</div>
            </div>
            <div class="text-2xl font-bold text-slate-900 dark:text-white">{{ sessionMetrics.switchRT }}мс</div>
          </div>
          <div class="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
            <div class="text-sm text-purple-900 dark:text-purple-200">
              <strong>💡 Что такое "Цена переключения"?</strong><br>
              Это разница между временем реакции при переключении правила и обычным временем. 
              Она показывает, насколько сложно вашему мозгу адаптироваться к новому правилу. 
              Чем меньше эта цифра, тем лучше ваша когнитивная гибкость!
            </div>
          </div>
        </div>
      </div>

      <!-- AUTH CTA -->
      <div v-if="!authStore.user" class="mb-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white shadow-xl">
        <p class="mb-4 font-medium text-lg">Создайте аккаунт, чтобы сохранять прогресс и отслеживать улучшение когнитивной гибкости.</p>
        <div class="flex gap-4 justify-center">
          <NuxtLink to="/login" class="px-6 py-2 bg-white text-purple-600 font-bold rounded-lg hover:bg-purple-50 transition">
            Войти
          </NuxtLink>
          <NuxtLink to="/register" class="px-6 py-2 bg-purple-800/50 text-white font-bold rounded-lg hover:bg-purple-800 transition backdrop-blur-sm border border-white/20">
            Регистрация
          </NuxtLink>
        </div>
      </div>

      <div class="flex flex-col gap-3">
        <button @click="gameState = 'idle'" class="w-full py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition">
          Вернуться в меню
        </button>
        <NuxtLink to="/lab/exercises" class="text-purple-500 hover:text-purple-600 font-medium text-sm">
          К списку упражнений
        </NuxtLink>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from '~/stores/auth';
import type { 
  MentalShiftRound, 
  MentalShiftRoundResult, 
  Stimulus,
  RuleType,
  MentalShiftSessionMetrics
} from '~/utils/mentalShiftEngine';
import { 
  generateMentalShiftTaskSequence,
  computeMentalShiftScore,
  validateMentalShiftResponse,
  getRuleDescription,
  getRuleName
} from '~/utils/mentalShiftEngine';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

definePageMeta({
  layout: 'laboratory'
});

// State
type GameState = 'idle' | 'playing' | 'feedback' | 'completed';
const gameState = ref<GameState>('idle');
const difficultyLevel = ref(1);
const taskSequence = ref<MentalShiftRound[]>([]);
const currentRoundIndex = ref(0);
const roundResults = ref<MentalShiftRoundResult[]>([]);
const isLastAnswerCorrect = ref(false);
const showRuleChange = ref(false);
const lastReactionTime = ref(0);

// Timing
const roundStartTime = ref(0);

// Computed
const authStore = useAuthStore();
const { $firestore } = useNuxtApp();

const totalRounds = computed(() => taskSequence.value.length);
const currentRound = computed(() => taskSequence.value[currentRoundIndex.value]);
const currentStimulus = computed(() => currentRound.value?.stimulus);
const currentRule = computed(() => currentRound.value?.rule);
const currentRuleDescription = computed(() => 
  currentRule.value ? getRuleDescription(currentRule.value) : ''
);
const currentRuleName = computed(() => 
  currentRule.value ? getRuleName(currentRule.value) : ''
);

const sessionMetrics = ref<MentalShiftSessionMetrics>({
  accuracy: 0,
  avgRT: 0,
  normalRT: 0,
  switchRT: 0,
  switchCost: 0,
  score: 0
});

// Actions
const startGame = (level: number) => {
  difficultyLevel.value = level;
  taskSequence.value = generateMentalShiftTaskSequence(level);
  currentRoundIndex.value = 0;
  roundResults.value = [];
  gameState.value = 'playing';
  startRound();
};

const startRound = () => {
  roundStartTime.value = Date.now();
  gameState.value = 'playing';
  
  // Show rule change notification if this is a switch round
  if (currentRound.value?.isSwitch) {
    showRuleChange.value = true;
    setTimeout(() => {
      showRuleChange.value = false;
    }, 2000);
  }
};

const onSelectAnswer = (answer: string) => {
  if (gameState.value !== 'playing' || !currentRound.value) return;

  const reactionTime = Date.now() - roundStartTime.value;
  lastReactionTime.value = reactionTime;
  
  const isCorrect = answer === currentRound.value.correctResponse;
  isLastAnswerCorrect.value = isCorrect;

  // Record result
  const result: MentalShiftRoundResult = {
    round: currentRoundIndex.value + 1,
    stimulus: currentRound.value.stimulus,
    rule: currentRound.value.rule,
    userResponse: answer,
    correctResponse: currentRound.value.correctResponse,
    correct: isCorrect,
    rt: reactionTime,
    isSwitch: currentRound.value.isSwitch
  };

  roundResults.value.push(result);
  gameState.value = 'feedback';

  // Auto-advance after feedback
  setTimeout(() => {
    nextRound();
  }, 800);
};

const nextRound = () => {
  if (currentRoundIndex.value < totalRounds.value - 1) {
    currentRoundIndex.value++;
    startRound();
  } else {
    finishSession();
  }
};

const finishSession = async () => {
  // Calculate metrics
  sessionMetrics.value = computeMentalShiftScore(roundResults.value);
  gameState.value = 'completed';
  
  // Save to Firestore if authenticated
  if (authStore.user && (authStore.user as any).uid) {
    try {
      const rulesUsed = [...new Set(roundResults.value.map(r => r.rule))];
      
      const sessionData = {
        sessionId: `ms-${Date.now()}`,
        createdAt: serverTimestamp(),
        totalRounds: totalRounds.value,
        accuracy: sessionMetrics.value.accuracy,
        avgRT: sessionMetrics.value.avgRT,
        normalRT: sessionMetrics.value.normalRT,
        switchRT: sessionMetrics.value.switchRT,
        switchCost: sessionMetrics.value.switchCost,
        score: sessionMetrics.value.score,
        difficultyLevel: difficultyLevel.value,
        rulesUsed: rulesUsed,
        rawData: roundResults.value
      };
      
      await addDoc(collection($firestore as any, `users/${(authStore.user as any).uid}/mentalShiftResults`), sessionData);
    } catch (e) {
      console.error("Error saving result:", e);
    }
  }
};

const getButtonClass = (button: string) => {
  if (gameState.value === 'playing') {
    return 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white border-2 border-slate-100 dark:border-slate-600 hover:border-purple-500 dark:hover:border-purple-400';
  }
  // Feedback state
  if (button === currentRound.value?.correctResponse) {
    return 'bg-green-500 text-white border-2 border-green-600';
  }
  return 'bg-white dark:bg-slate-700 text-slate-300 dark:text-slate-500 border-2 border-slate-100 dark:border-slate-800 opacity-50';
};

const getShapeEmoji = (shape: string): string => {
  const shapeMap: { [key: string]: string } = {
    // Sharp-edged shapes (LEFT)
    'square': '◼️',      // Solid black square (sharp corners)
    'triangle': '▲',    // Solid triangle (sharp)
    'diamond': '◆',     // Solid diamond (sharp)
    'star': '⭐',       // Star (sharp points)
    'hexagon': '⬡',     // Hexagon outline (sharp)
    // Curved shapes (RIGHT)
    'circle': '⭕',     // Circle outline
    'oval': '🥚',       // Egg (oval)
    'heart': '❤️',      // Heart (curved)
    'crescent': '🌙'    // Crescent moon (curved)
  };
  return shapeMap[shape] || '⭕';
};
</script>

<style scoped>
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

.animate-bounce-in {
  animation: bounceIn 0.6s ease-out forwards;
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}
</style>
