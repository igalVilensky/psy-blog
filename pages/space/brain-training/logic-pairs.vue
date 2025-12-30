<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-8 font-sans transition-colors duration-500 overflow-x-hidden">
    <!-- Breadcrumbs -->
    <Breadcrumbs class="mb-8 max-w-4xl mx-auto" />

    <!-- Start Screen -->
    <div v-if="gameState === 'start'" class="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up pt-12">
      <div class="space-y-4">
        <div class="inline-flex p-3 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 mb-2">
          <i class="fas fa-th-large text-3xl"></i>
        </div>
        <h1 class="text-5xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
          Логические Пары
          <span class="block text-2xl font-medium text-indigo-600 dark:text-indigo-400 mt-2">Соответствие смыслов</span>
        </h1>
        <p class="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Тренируйте ассоциативное мышление и скорость обработки информации, находя логические связи между объектами.
        </p>
      </div>

      <div class="bg-white dark:bg-slate-900/80 rounded-[2.5rem] p-8 border border-slate-200 dark:border-white/10 shadow-2xl backdrop-blur-xl text-left max-w-md mx-auto relative overflow-hidden group">
        <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div class="relative z-10 space-y-6">
          <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <i class="fas fa-cog text-indigo-500"></i>
            Настройки игры
          </h3>

          <div class="space-y-4">
            <div class="space-y-2">
              <label class="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Сложность (кол-во пар)</label>
              <div class="grid grid-cols-3 gap-2">
                <button 
                  v-for="d in difficulties" 
                  :key="d.id"
                  @click="settings.difficulty = d.id"
                  :class="['py-3 rounded-xl font-bold transition-all border-2', settings.difficulty === d.id ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg' : 'bg-transparent border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-indigo-500/50']"
                >
                  {{ d.label }}
                </button>
              </div>
            </div>

            <div class="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5">
              <div class="flex flex-col">
                <span class="text-slate-700 dark:text-slate-200 font-medium font-bold">Время игры</span>
                <span class="text-xs text-slate-500 dark:text-slate-400">60 секунд на сессию</span>
              </div>
              <i class="fas fa-hourglass-half text-indigo-500"></i>
            </div>
          </div>

          <button @click="startGame" class="w-full py-5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:-translate-y-1 transition-all duration-300 active:scale-95 flex items-center justify-center gap-3">
            <span>Начать тренировку</span>
            <i class="fas fa-play"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Game Playing Screen -->
    <div v-else-if="gameState === 'playing'" class="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <!-- HUD -->
      <div class="flex justify-between items-center bg-white dark:bg-slate-900/80 p-5 rounded-2xl shadow-lg border border-slate-200 dark:border-white/5 backdrop-blur-md">
        <div class="flex gap-8 sm:gap-12">
          <div class="flex flex-col">
            <span class="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">Очки</span>
            <span class="text-3xl font-black text-indigo-600 dark:text-indigo-400 font-mono">{{ score }}</span>
          </div>
          <div class="flex flex-col">
            <span class="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">Время</span>
            <span :class="['text-3xl font-black font-mono', timeLeft <= 10 ? 'text-rose-500 animate-pulse' : 'text-slate-700 dark:text-slate-200']">
              {{ timeLeft }}s
            </span>
          </div>
        </div>
        <button @click="confirmEndGame" class="p-3 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors">
          <i class="fas fa-times text-xl"></i>
        </button>
      </div>

      <!-- Main Game Area -->
      <div class="flex flex-col items-center space-y-8 py-8">
        <div class="grid grid-cols-2 gap-8 w-full max-w-3xl">
          <!-- Left Column -->
          <div class="flex flex-col gap-4">
            <button 
              v-for="item in leftItems" 
              :key="item.id"
              @click="selectLeft(item)"
              :disabled="matchedIds.has(item.id)"
              :class="[
                'p-6 h-24 flex items-center justify-center text-center rounded-2xl text-lg font-bold transition-all transform shadow-md border-2 active:scale-95',
                matchedIds.has(item.id) 
                  ? 'bg-slate-100 dark:bg-slate-800/50 border-transparent text-slate-300 dark:text-slate-600 opacity-50 cursor-not-allowed'
                  : selectedLeft === item
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-indigo-500/50 scale-105'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:border-indigo-500/50'
              ]"
            >
              {{ item.text }}
            </button>
          </div>

          <!-- Right Column -->
          <div class="flex flex-col gap-4">
            <button 
              v-for="item in rightItems" 
              :key="item.id"
              @click="selectRight(item)"
              :disabled="matchedIds.has(item.id)"
              :class="[
                'p-6 h-24 flex items-center justify-center text-center rounded-2xl text-lg font-bold transition-all transform shadow-md border-2 active:scale-95',
                matchedIds.has(item.id) 
                  ? 'bg-slate-100 dark:bg-slate-800/50 border-transparent text-slate-300 dark:text-slate-600 opacity-50 cursor-not-allowed'
                  : selectedRight === item
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-indigo-500/50 scale-105'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:border-indigo-500/50'
              ]"
            >
              {{ item.text }}
            </button>
          </div>
        </div>
      </div>

      <!-- Feedback -->
      <div class="fixed inset-0 pointer-events-none flex items-center justify-center z-50 overflow-hidden">
        <Transition name="feedback-pop">
          <div v-if="feedback === 'correct'" class="bg-emerald-500/90 text-white px-12 py-6 rounded-[2rem] text-3xl font-black shadow-2xl flex items-center gap-4">
            <i class="fas fa-check-circle"></i>
            ВЕРНО!
          </div>
          <div v-else-if="feedback === 'wrong'" class="bg-rose-500/90 text-white px-12 py-6 rounded-[2rem] text-3xl font-black shadow-2xl flex items-center gap-4">
            <i class="fas fa-times-circle"></i>
            ОШИБКА
          </div>
        </Transition>
      </div>
    </div>

    <!-- Results Screen -->
    <div v-else-if="gameState === 'finished'" class="max-w-2xl mx-auto text-center space-y-8 animate-fade-in-up pt-12">
      <div class="bg-white dark:bg-slate-900 rounded-[3rem] p-10 border border-slate-200 dark:border-white/10 shadow-2xl relative overflow-hidden">
        <div class="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
        
        <h2 class="text-4xl font-black text-slate-900 dark:text-white mb-10">Ваш результат</h2>

        <div class="grid grid-cols-2 gap-8 mb-12">
          <div class="space-y-1">
            <div class="text-xs uppercase tracking-widest text-slate-500 font-bold">Итоговые очки</div>
            <div class="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              {{ score }}
            </div>
          </div>
          <div class="space-y-1">
            <div class="text-xs uppercase tracking-widest text-slate-500 font-bold">Пар собрано</div>
            <div class="text-6xl font-black text-slate-800 dark:text-slate-100 italic">
              {{ totalPairsMatched }}
            </div>
          </div>
        </div>

        <div v-if="!isLoggedIn" class="mb-10 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
          <p class="text-slate-600 dark:text-slate-300 mb-4 font-medium">Желаете сохранить прогресс и отслеживать когнитивный рост?</p>
          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <button @click="navigateTo('/auth/login')" class="px-6 py-2 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-semibold border border-slate-200 dark:border-slate-600 hover:bg-slate-50 transition">
              Войти
            </button>
            <button @click="navigateTo('/auth/register')" class="px-6 py-2 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition">
              Регистрация
            </button>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button @click="gameState = 'start'" class="px-8 py-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition">
            К настройкам
          </button>
          <button @click="startGame" class="px-8 py-4 rounded-xl bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition transform hover:-translate-y-0.5">
            Играть еще раз
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { useNuxtApp, navigateTo } from '#app';
import Breadcrumbs from "~/components/ui/Breadcrumbs.vue";
import { Howl } from 'howler';

definePageMeta({
  layout: "laboratory",
});

// --- Constants & Data ---
const difficulties = [
  { id: 'easy', label: '3 пары', count: 3 },
  { id: 'medium', label: '5 пар', count: 5 },
  { id: 'hard', label: '8 пар', count: 8 }
];

const pairBank = [
  { left: 'Огонь', right: 'Пламя' },
  { left: 'Вода', right: 'Океан' },
  { left: 'Холод', right: 'Лед' },
  { left: 'Жара', right: 'Солнце' },
  { left: 'Ночь', right: 'Луна' },
  { left: 'День', right: 'Свет' },
  { left: 'Лес', right: 'Дерево' },
  { left: 'Небо', right: 'Облако' },
  { left: 'Птица', right: 'Крыло' },
  { left: 'Рыба', right: 'Чешуя' },
  { left: 'Книга', right: 'Знание' },
  { left: 'Время', right: 'Часы' },
  { left: 'Зима', right: 'Снег' },
  { left: 'Лето', right: 'Песок' },
  { left: 'Музыка', right: 'Звук' },
  { left: 'Картина', right: 'Холст' },
  { left: 'Дорога', right: 'Путь' },
  { left: 'Гора', right: 'Пик' },
  { left: 'Сердце', right: 'Любовь' },
  { left: 'Глаз', right: 'Взгляд' },
  { left: 'Кошка', right: 'Мяу' },
  { left: 'Собака', right: 'Лай' },
  { left: 'Слон', right: 'Хобот' },
  { left: 'Школа', right: 'Учитель' },
  { left: 'Врач', right: 'Больница' },
  { left: 'Хлеб', right: 'Пекарь' },
  { left: 'Дом', right: 'Крыша' },
  { left: 'Колесо', right: 'Машина' },
  { left: 'Звезда', right: 'Космос' },
  { left: 'Гром', right: 'Молния' },
  { left: 'Кофе', right: 'Чашка' },
  { left: 'Кисть', right: 'Краски' },
  { left: 'Ручка', right: 'Бумага' },
  { left: 'Молоток', right: 'Гвоздь' },
  { left: 'Ключ', right: 'Замок' }
];

// --- State ---
const gameState = ref<'start' | 'playing' | 'finished'>('start');
const settings = ref({
  difficulty: 'easy'
});
const score = ref(0);
const timeLeft = ref(60);
const totalPairsMatched = ref(0);
const feedback = ref<null | 'correct' | 'wrong'>(null);
const leftItems = ref<any[]>([]);
const rightItems = ref<any[]>([]);
const selectedLeft = ref<any>(null);
const selectedRight = ref<any>(null);
const matchedIds = ref<Set<string>>(new Set());
const isLoggedIn = ref(false);

let timerInterval: any = null;
let sounds: any = {
  correct: null,
  wrong: null,
  finish: null
};

// --- Logic ---

const startGame = () => {
  score.value = 0;
  timeLeft.value = 60;
  totalPairsMatched.value = 0;
  gameState.value = 'playing';
  feedback.value = null;
  selectedLeft.value = null;
  selectedRight.value = null;
  matchedIds.value = new Set();
  
  if (!sounds.correct) {
    sounds.correct = new Howl({ src: ['/sounds/selection-correct.mp3'], volume: 0.5 });
    sounds.wrong = new Howl({ src: ['/sounds/selection-wrong.mp3'], volume: 0.4 });
    sounds.finish = new Howl({ src: ['/sounds/game-over.mp3'], volume: 0.5 });
  }

  generateBoard();
  startTimer();
};

const generateBoard = () => {
  const diff = difficulties.find(d => d.id === settings.value.difficulty);
  const count = diff ? diff.count : 5;
  
  // Pick random pairs
  const shuffledBank = [...pairBank].sort(() => Math.random() - 0.5);
  const selectedPairs = shuffledBank.slice(0, count);
  
  // Format items
  const left = selectedPairs.map((p, idx) => ({ id: `pair-${idx}`, text: p.left, pairId: `pair-${idx}` }));
  const right = selectedPairs.map((p, idx) => ({ id: `pair-${idx}`, text: p.right, pairId: `pair-${idx}` }));
  
  // Shuffle columns independently
  leftItems.value = [...left].sort(() => Math.random() - 0.5);
  
  // Advanced Shuffle for Right Column: Ensure not too many adjacent matches
  let shuffledRight = [...right].sort(() => Math.random() - 0.5);
  
  // Safeguard: if count is 3, try to avoid all 3 being matched horizontally
  if (count === 3) {
    let attempts = 0;
    const isTooEasy = () => {
      let matches = 0;
      for (let i = 0; i < count; i++) {
        if (leftItems.value[i].pairId === shuffledRight[i].pairId) matches++;
      }
      return matches >= 2; // Avoid 2 or 3 horizontal matches
    };

    while (isTooEasy() && attempts < 10) {
      shuffledRight.sort(() => Math.random() - 0.5);
      attempts++;
    }
  } else {
    // For larger counts, just ensure not more than 40% are horizontal matches initially
    let attempts = 0;
    const isTooEasy = () => {
      let matches = 0;
      for (let i = 0; i < count; i++) {
        if (leftItems.value[i].pairId === shuffledRight[i].pairId) matches++;
      }
      return matches > (count * 0.4);
    };

    while (isTooEasy() && attempts < 10) {
      shuffledRight.sort(() => Math.random() - 0.5);
      attempts++;
    }
  }
  
  rightItems.value = shuffledRight;
  
  selectedLeft.value = null;
  selectedRight.value = null;
  matchedIds.value = new Set();
};

const startTimer = () => {
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft.value--;
    if (timeLeft.value <= 0) {
      finishGame();
    }
  }, 1000);
};

const finishGame = () => {
  if (timerInterval) clearInterval(timerInterval);
  gameState.value = 'finished';
  if (sounds.finish) sounds.finish.play();
  saveResults();
};

const confirmEndGame = () => {
  if (confirm('Ваш прогресс будет утерян. Уверены?')) {
    finishGame();
  }
};

const selectLeft = (item: any) => {
  if (matchedIds.value.has(item.id)) return;
  selectedLeft.value = item;
  checkMatch();
};

const selectRight = (item: any) => {
  if (matchedIds.value.has(item.id)) return;
  selectedRight.value = item;
  checkMatch();
};

const checkMatch = () => {
  if (selectedLeft.value && selectedRight.value) {
    if (selectedLeft.value.pairId === selectedRight.value.pairId) {
      handleCorrect();
    } else {
      handleWrong();
    }
  }
};

const handleCorrect = () => {
  totalPairsMatched.value++;
  score.value += 50;
  feedback.value = 'correct';
  if (sounds.correct) sounds.correct.play();
  
  matchedIds.value.add(selectedLeft.value.id);
  
  const currentLeft = selectedLeft.value;
  const currentRight = selectedRight.value;
  
  selectedLeft.value = null;
  selectedRight.value = null;

  setTimeout(() => {
    feedback.value = null;
    // Check if board cleared
    if (matchedIds.value.size === leftItems.value.length) {
      setTimeout(() => {
        score.value += 100; // Bonus for clearing
        generateBoard();
      }, 500);
    }
  }, 400);
};

const handleWrong = () => {
  feedback.value = 'wrong';
  if (sounds.wrong) sounds.wrong.play();
  
  setTimeout(() => {
    feedback.value = null;
    selectedLeft.value = null;
    selectedRight.value = null;
  }, 600);
};

const saveResults = async () => {
  if (!isLoggedIn.value) return;

  try {
    const { $firestore, $auth } = useNuxtApp();
    const user = $auth.currentUser;
    if (!user) return;
    
    const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');
    await addDoc(collection($firestore, `users/${user.uid}/logicPairsResults`), {
      score: score.value,
      totalPairsMatched: totalPairsMatched.value,
      difficulty: settings.value.difficulty,
      timestamp: serverTimestamp(),
      appName: 'LogicPairs'
    });
  } catch (e) {
    console.error('Error saving logic pairs results:', e);
  }
};

// --- Lifecycle ---
onMounted(() => {
  const { $auth } = useNuxtApp();
  import('firebase/auth').then(({ onAuthStateChanged }) => {
    onAuthStateChanged($auth, (user) => {
      isLoggedIn.value = !!user;
    });
  });
});

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval);
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.feedback-pop-enter-active {
  animation: feedbackIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.feedback-pop-leave-active {
  animation: feedbackOut 0.3s ease-in;
}

@keyframes feedbackIn {
  0% { transform: scale(0.5); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
@keyframes feedbackOut {
  100% { transform: scale(1.5); opacity: 0; }
}
</style>
