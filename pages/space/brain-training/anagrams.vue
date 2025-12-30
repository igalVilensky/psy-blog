<template>
  <div
    class="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-8 font-sans transition-colors duration-500 overflow-x-hidden">
    <!-- Breadcrumbs -->
    <Breadcrumbs class="mb-8 max-w-4xl mx-auto" />

    <!-- Start Screen -->
    <div v-if="gameState === 'start'" class="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up pt-12">
      <div class="space-y-4">
        <div class="inline-flex p-3 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 mb-2">
          <i class="fas fa-font text-3xl"></i>
        </div>
        <h1 class="text-5xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
          Анаграммы
          <span class="block text-2xl font-medium text-cyan-600 dark:text-cyan-400 mt-2">Магия слов</span>
        </h1>
        <p class="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Развивайте вербальный интеллект и гибкость мышления, составляя слова из перемешанных букв.
        </p>
      </div>

      <div
        class="bg-white dark:bg-slate-900/80 rounded-[2.5rem] p-8 border border-slate-200 dark:border-white/10 shadow-2xl backdrop-blur-xl text-left max-w-md mx-auto relative overflow-hidden group">
        <div
          class="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        </div>

        <div class="relative z-10 space-y-6">
          <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <i class="fas fa-cog text-cyan-500"></i>
            Настройки игры
          </h3>

          <div class="space-y-4">
            <div class="space-y-2">
              <label class="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Сложность
                (длина слов)</label>
              <div class="grid grid-cols-3 gap-2">
                <button v-for="d in difficulties" :key="d.id" @click="settings.difficulty = d.id"
                  :class="['py-3 rounded-xl font-bold transition-all border-2', settings.difficulty === d.id ? 'bg-cyan-600 border-cyan-600 text-white shadow-lg' : 'bg-transparent border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-cyan-500/50']">
                  {{ d.label }}
                </button>
              </div>
            </div>

            <div
              class="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5">
              <div class="flex flex-col">
                <span class="text-slate-700 dark:text-slate-200 font-medium font-bold">Время игры</span>
                <span class="text-xs text-slate-500 dark:text-slate-400">60 секунд на раунд</span>
              </div>
              <i class="fas fa-hourglass-half text-cyan-500"></i>
            </div>
          </div>

          <button @click="startGame"
            class="w-full py-5 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-lg shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:-translate-y-1 transition-all duration-300 active:scale-95 flex items-center justify-center gap-3">
            <span>Начать тренировку</span>
            <i class="fas fa-play"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Game Playing Screen -->
    <div v-else-if="gameState === 'playing'" class="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <!-- HUD -->
      <div
        class="flex justify-between items-center bg-white dark:bg-slate-900/80 p-5 rounded-2xl shadow-lg border border-slate-200 dark:border-white/5 backdrop-blur-md">
        <div class="flex gap-8 sm:gap-12">
          <div class="flex flex-col">
            <span class="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">Счет</span>
            <span class="text-3xl font-black text-cyan-600 dark:text-cyan-400 font-mono">{{ score }}</span>
          </div>
          <div class="flex flex-col">
            <span class="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">Время</span>
            <span
              :class="['text-3xl font-black font-mono', timeLeft <= 10 ? 'text-rose-500 animate-pulse' : 'text-slate-700 dark:text-slate-200']">
              {{ timeLeft }}s
            </span>
          </div>
        </div>
        <button @click="confirmEndGame"
          class="p-3 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors">
          <i class="fas fa-times text-xl"></i>
        </button>
      </div>

      <!-- Main Game Area -->
      <div class="flex flex-col items-center space-y-12 py-12">
        <!-- Scrambled Word -->
        <div class="flex flex-wrap justify-center gap-3">
          <div v-for="(letter, index) in scrambledLetters" :key="`scrambled-${index}`"
            class="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center bg-white dark:bg-slate-800 rounded-2xl text-2xl sm:text-3xl font-black text-slate-800 dark:text-white shadow-lg border border-slate-200 dark:border-white/10 select-none transform transition-transform hover:scale-110 active:scale-95"
            @click="addLetter(letter)">
            {{ letter }}
          </div>
        </div>

        <!-- Input Area -->
        <div class="w-full flex flex-col items-center space-y-6">
          <div
            class="min-w-[300px] h-20 flex items-center justify-center gap-2 border-b-4 border-slate-200 dark:border-slate-800 transition-colors"
            :class="{ 'border-cyan-500': userInput.length > 0 }">
            <TransitionGroup name="letter-pop" tag="div" class="flex gap-2">
              <div v-for="(letter, index) in userInput" :key="`input-${index}`"
                class="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl bg-cyan-600 text-white text-xl sm:text-2xl font-bold shadow-md">
                {{ letter }}
              </div>
            </TransitionGroup>
            <div v-if="userInput.length === 0" class="text-slate-400 dark:text-slate-600 italic text-lg select-none">
              Начинайте вводить...
            </div>
          </div>

          <div class="flex gap-4">
            <button @click="backspace"
              class="w-16 h-14 flex items-center justify-center rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700 transition"
              :disabled="userInput.length === 0">
              <i class="fas fa-backspace text-xl"></i>
            </button>
            <button @click="clearInput"
              class="px-6 h-14 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-300 dark:hover:bg-slate-700 transition"
              :disabled="userInput.length === 0">
              Сброс
            </button>
            <button @click="submit"
              class="px-10 h-14 rounded-xl bg-cyan-600 text-white font-bold shadow-lg shadow-cyan-500/20 hover:opacity-90 active:scale-95 transition"
              :disabled="userInput.length === 0">
              Готово
            </button>
          </div>
        </div>
      </div>

      <!-- Feedback -->
      <div class="fixed inset-0 pointer-events-none flex items-center justify-center z-50 overflow-hidden">
        <Transition name="feedback-pop">
          <div v-if="feedback === 'correct'"
            class="bg-emerald-500/90 text-white px-12 py-6 rounded-[2rem] text-3xl font-black shadow-2xl flex items-center gap-4">
            <i class="fas fa-check-circle"></i>
            ВЕРНО!
          </div>
          <div v-else-if="feedback === 'wrong'"
            class="bg-rose-500/90 text-white px-12 py-6 rounded-[2rem] text-3xl font-black shadow-2xl flex items-center gap-4">
            <i class="fas fa-times-circle"></i>
            МИНУС
          </div>
        </Transition>
      </div>
    </div>

    <!-- Results Screen -->
    <div v-else-if="gameState === 'finished'" class="max-w-2xl mx-auto text-center space-y-8 animate-fade-in-up pt-12">
      <div
        class="bg-white dark:bg-slate-900 rounded-[3rem] p-10 border border-slate-200 dark:border-white/10 shadow-2xl relative overflow-hidden">
        <div class="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500"></div>

        <h2 class="text-4xl font-black text-slate-900 dark:text-white mb-10">Ваш результат</h2>

        <div class="grid grid-cols-2 gap-8 mb-12">
          <div class="space-y-1">
            <div class="text-xs uppercase tracking-widest text-slate-500 font-bold">Итоговый счет</div>
            <div
              class="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400">
              {{ score }}
            </div>
          </div>
          <div class="space-y-1">
            <div class="text-xs uppercase tracking-widest text-slate-500 font-bold">Слов решено</div>
            <div class="text-6xl font-black text-slate-800 dark:text-slate-100 italic">
              {{ wordsSolved }}
            </div>
          </div>
        </div>

        <div v-if="!isLoggedIn"
          class="mb-10 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
          <p class="text-slate-600 dark:text-slate-300 mb-4 font-medium">Желаете сохранить прогресс и отслеживать
            когнитивный рост?</p>
          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <button @click="navigateTo('/auth/login')"
              class="px-6 py-2 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-semibold border border-slate-200 dark:border-slate-600 hover:bg-slate-50 transition">
              Войти
            </button>
            <button @click="navigateTo('/auth/register')"
              class="px-6 py-2 rounded-xl bg-cyan-600 text-white font-semibold hover:bg-cyan-700 transition">
              Регистрация
            </button>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button @click="gameState = 'start'"
            class="px-8 py-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition">
            К настройкам
          </button>
          <button @click="startGame"
            class="px-8 py-4 rounded-xl bg-cyan-600 text-white font-bold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition transform hover:-translate-y-0.5">
            Играть еще раз
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useNuxtApp } from '#app';
import Breadcrumbs from "~/components/ui/Breadcrumbs.vue";
import { Howl } from 'howler';

definePageMeta({
  layout: "laboratory",
});

// --- Constants & Data ---
const difficulties = [
  { id: 'easy', label: '3-4 буквы', lengths: [3, 4] },
  { id: 'medium', label: '5-6 букв', lengths: [5, 6] },
  { id: 'hard', label: '7-8 букв', lengths: [7, 8] }
];

const wordBank: Record<number, string[]> = {
  3: ['КОТ', 'РОТ', 'МАК', 'СОН', 'ЛОМ', 'ВАЛ', 'МИР', 'ШАР', 'БОК', 'ЛУК'],
  4: ['КРАБ', 'МОСТ', 'СТОЛ', 'СТУЛ', 'ЛУНА', 'ВОЛК', 'ГОРА', 'РЕКА', 'НЕБО', 'ЗИМА', 'ЛЕТО', 'ВЕРА'],
  5: ['КНИГА', 'ЭКРАН', 'ПТИЦА', 'МЕТРО', 'ПОЕЗД', 'РАДУГА', 'ОКЕАН', 'ФОКУС', 'ГРУППА', 'ШКОЛА', 'ГОРОД'],
  6: ['СОЛНЦЕ', 'ЯБЛОКО', 'ТЕТРАДЬ', 'ГИТАРА', 'ФИЗИКА', 'ПРАВДА', 'УЛЫБКА', 'ДОРОГА', 'МАШИНА', 'ЗВЕЗДА'],
  7: ['КАРТИНА', 'ПЛАНЕТА', 'КУЛЬТУРА', 'ТЕЛЕФОН', 'ПРИРОДА', 'ЧЕЛОВЕК', 'ДОБРОТА', 'ЭНЕРГИЯ', 'ОБЛАКО'],
  8: ['ТЕЛЕВИЗОР', 'ЗДОРОВЬЕ', 'ДВИЖЕНИЕ', 'КОМПЬЮТЕР', 'КАЛЕНДАРЬ', 'ВНИМАНИЕ', 'ШОКОЛАД']
};

// --- State ---
const gameState = ref<'start' | 'playing' | 'finished'>('start');
const settings = ref({
  difficulty: 'easy'
});
const score = ref(0);
const timeLeft = ref(60);
const wordsSolved = ref(0);
const feedback = ref<null | 'correct' | 'wrong'>(null);
const currentWord = ref('');
const scrambledLetters = ref<string[]>([]);
const userInput = ref<string[]>([]);
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
  wordsSolved.value = 0;
  gameState.value = 'playing';
  feedback.value = null;

  if (!sounds.correct) {
    sounds.correct = new Howl({ src: ['/sounds/selection-correct.mp3'], volume: 0.5 });
    sounds.wrong = new Howl({ src: ['/sounds/selection-wrong.mp3'], volume: 0.4 });
    sounds.finish = new Howl({ src: ['/sounds/game-over.mp3'], volume: 0.5 });
  }

  generateNextWord();
  startTimer();
};

const generateNextWord = () => {
  const diff = difficulties.find(d => d.id === settings.value.difficulty);
  if (!diff) return;

  const length = diff.lengths[Math.floor(Math.random() * diff.lengths.length)];
  const words = wordBank[length];
  currentWord.value = words[Math.floor(Math.random() * words.length)];

  // Scramble letters
  const letters = currentWord.value.split('');
  let scrambled = [...letters];

  // Ensure it's actually scrambled (if length > 1)
  if (letters.length > 1) {
    let attempts = 0;
    while (scrambled.join('') === currentWord.value && attempts < 10) {
      scrambled = [...letters].sort(() => Math.random() - 0.5);
      attempts++;
    }
  }

  scrambledLetters.value = scrambled;
  userInput.value = [];
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

const addLetter = (letter: string) => {
  if (userInput.value.length < currentWord.value.length) {
    userInput.value.push(letter);
  }
};

const backspace = () => {
  userInput.value.pop();
};

const clearInput = () => {
  userInput.value = [];
};

const submit = () => {
  const attempt = userInput.value.join('');
  if (attempt === currentWord.value) {
    handleCorrect();
  } else {
    handleWrong();
  }
};

const handleCorrect = () => {
  wordsSolved.value++;
  const points = currentWord.value.length * 10;
  score.value += points;
  feedback.value = 'correct';
  if (sounds.correct) sounds.correct.play();

  setTimeout(() => {
    feedback.value = null;
    generateNextWord();
  }, 600);
};

const handleWrong = () => {
  feedback.value = 'wrong';
  if (sounds.wrong) sounds.wrong.play();

  setTimeout(() => {
    feedback.value = null;
    userInput.value = [];
  }, 600);
};

const saveResults = async () => {
  if (!isLoggedIn.value) return;

  try {
    const { $firestore, $auth } = useNuxtApp();
    const user = $auth.currentUser;
    if (!user) return;

    const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');
    await addDoc(collection($firestore, `users/${user.uid}/anagramResults`), {
      score: score.value,
      wordsSolved: wordsSolved.value,
      difficulty: settings.value.difficulty,
      timestamp: serverTimestamp(),
      appName: 'Anagrams'
    });
  } catch (e) {
    console.error('Error saving anagram results:', e);
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

  // Key listeners
  window.addEventListener('keydown', handleKey);
});

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval);
  window.removeEventListener('keydown', handleKey);
});

const handleKey = (e: KeyboardEvent) => {
  if (gameState.value !== 'playing') return;

  if (e.key === 'Backspace') {
    backspace();
  } else if (e.key === 'Enter') {
    submit();
  } else if (e.key === 'Escape') {
    clearInput();
  } else {
    const char = e.key.toUpperCase();
    // Simple Cyrillic check or match with scrambled letters
    if (scrambledLetters.value.includes(char)) {
      // We can allow typing but only from available letters
      // To keep it simple and consistent with UI, let's just let them type if it's a letter
      if (/^[А-ЯЁ]$/.test(char)) {
        addLetter(char);
      }
    }
  }
};
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
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

.letter-pop-enter-active {
  animation: letterIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.letter-pop-leave-active {
  animation: letterOut 0.2s ease-in;
}

@keyframes letterIn {
  0% {
    transform: scale(0);
    opacity: 0;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes letterOut {
  100% {
    transform: scale(0);
    opacity: 0;
  }
}

.feedback-pop-enter-active {
  animation: feedbackIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.feedback-pop-leave-active {
  animation: feedbackOut 0.3s ease-in;
}

@keyframes feedbackIn {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes feedbackOut {
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}
</style>
