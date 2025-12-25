<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-8 font-sans transition-colors duration-500">
    <div class="max-w-4xl mx-auto">
      
      <!-- Start Screen -->
      <div v-if="gameState === 'start'" class="text-center space-y-8 animate-fade-in-up">
        <div class="space-y-4">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white mb-4 shadow-lg shadow-cyan-500/30">
            <i class="fas fa-shapes text-3xl"></i>
          </div>
          <h1 class="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
            Pattern Detection Mini
          </h1>
          <p class="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Развитие навыков выявления закономерностей и логического мышления. Найдите скрытое правило!
          </p>
        </div>

        <div class="bg-white dark:bg-slate-900/50 rounded-3xl p-8 border border-slate-200 dark:border-white/10 shadow-xl backdrop-blur-sm text-left max-w-2xl mx-auto">
          <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-4">Как играть:</h3>
          <ul class="space-y-3 mb-8 text-slate-700 dark:text-slate-300">
            <li class="flex items-start gap-3">
              <i class="fas fa-check-circle text-cyan-500 mt-1"></i>
              <span>Вы увидите последовательность элементов с одним пропуском.</span>
            </li>
            <li class="flex items-start gap-3">
              <i class="fas fa-check-circle text-cyan-500 mt-1"></i>
              <span>Элементы могут менять форму, цвет, количество или поворот.</span>
            </li>
             <li class="flex items-start gap-3">
              <i class="fas fa-check-circle text-cyan-500 mt-1"></i>
              <span>Выберите правильный элемент из 4 вариантов, который продолжает логику.</span>
            </li>
          </ul>
          
          <div class="grid sm:grid-cols-1 gap-4 mt-8">
             <button v-for="level in difficulties" :key="level.id" @click="startGame(level.id)" class="group relative p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 hover:border-cyan-500 dark:hover:border-cyan-500 transition-all text-left">
                <div class="flex items-center justify-between">
                    <div>
                        <div :class="['font-bold text-lg mb-1', level.color]">{{ level.label }}</div>
                        <div class="text-sm text-slate-600 dark:text-slate-400">{{ level.sub }}</div>
                    </div>
                    <i class="fas fa-arrow-right text-slate-300 group-hover:text-cyan-500 transition-colors"></i>
                </div>
             </button>
          </div>
          
          <!-- Removed single start button in favor of levels -->
        </div>
      </div>

       <!-- Game Running State -->
      <div v-else-if="gameState === 'running'" class="max-w-2xl mx-auto">
         <!-- Progress -->
         <div class="mb-6 flex justify-between items-center text-slate-600 dark:text-slate-400 font-medium">
           <span>Вопрос {{ currentRound + 1 }} из {{ totalRounds }}</span>
           <span class="text-cyan-600 dark:text-cyan-400">Счет: {{ score }}</span>
         </div>

         <!-- Question Card -->
         <div class="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xl mb-8">
            <div class="flex flex-wrap justify-center items-center gap-4 sm:gap-6 min-h-[120px]">
              
              <!-- Sequence Items -->
              <div v-for="(item, idx) in currentQuestion.sequence" :key="idx" 
                   class="w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center text-3xl sm:text-4xl transition-all"
                   :class="item === '?' ? 'bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-600 animate-pulse' : 'bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-sm'"
              >
                 <span v-if="item !== '?'">{{ item }}</span>
                 <i v-else class="fas fa-question text-slate-400"></i>
              </div>

            </div>
         </div>

         <!-- Options -->
         <div class="grid grid-cols-2 gap-4">
           <button 
              v-for="(option, idx) in currentQuestion.options" 
              :key="idx"
              @click="handleAnswer(option)"
              :disabled="feedback !== null"
              class="h-24 rounded-2xl border-2 flex items-center justify-center text-3xl sm:text-4xl transition-all duration-200 relative overflow-hidden"
              :class="getOptionClass(option)"
           >
              {{ option }}
           </button>
         </div>
      </div>

       <!-- Results State -->
       <div v-else-if="gameState === 'finished'" class="text-center space-y-8 animate-fade-in-up">
          <div class="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-white/10 shadow-2xl max-w-xl mx-auto">
            <div class="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/30">
              <i class="fas fa-trophy text-4xl text-white"></i>
            </div>
            
            <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-2">Результат</h2>
            <div class="text-5xl font-black text-cyan-600 dark:text-cyan-400 mb-6">
              {{ Math.round((score / totalRounds) * 100) }}%
            </div>
            
            <p class="text-slate-600 dark:text-slate-400 mb-8">
              Вы правильно решили {{ score }} из {{ totalRounds }} паттернов.
            </p>

            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button @click="gameState = 'start'" class="px-8 py-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition">
                Меню
              </button>
              <button @click="startGame" class="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold hover:shadow-lg hover:shadow-cyan-500/25 transition transform hover:-translate-y-1">
                Повторить
              </button>
            </div>
          </div>
       </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

definePageMeta({
  layout: "laboratory",
});

// GAME CONFIG
const LEVELS = {
  easy: { rounds: 10, time: 20 },
  medium: { rounds: 15, time: 15 },
  hard: { rounds: 20, time: 10 }
};

const difficulties = [
  { id: 'easy', label: 'Легкий уровень', sub: 'Простые арифметические и визуальные паттерны', color: 'text-emerald-500' },
  { id: 'medium', label: 'Средний уровень', sub: 'Комбинированные правила', color: 'text-yellow-500' },
  { id: 'hard', label: 'Сложный уровень', sub: 'Изменяющиеся правила и сложные последовательности', color: 'text-red-500' }
];

const gameState = ref('start');
const currentRound = ref(0);
const totalRounds = ref(10);
const score = ref(0);
const feedback = ref(null); // null, 'correct', 'wrong'
const selectedAnswer = ref(null);
const startTime = ref(0);
const rawData = ref([]);

const selectedDifficulty = ref('easy');

const allQuestions = [
  // EASY - Simple Arithmetic & Visual
  { difficulty: 'easy', sequence: ['1', '3', '5', '?', '9'], options: ['6', '7', '8', '4'], answer: '7' },
  { difficulty: 'easy', sequence: ['2', '4', '8', '?', '32'], options: ['12', '16', '24', '14'], answer: '16' },
  { difficulty: 'easy', sequence: ['10', '20', '30', '?', '50'], options: ['35', '40', '45', '25'], answer: '40' },
  { difficulty: 'easy', sequence: ['⬛', '⬜', '⬛', '?', '⬛'], options: ['⬛', '⬜', '🟥', '🔷'], answer: '⬜' },
  { difficulty: 'easy', sequence: ['⬆️', '➡️', '⬇️', '?', '⬆️'], options: ['⬅️', '↗️', '⬇️', '↖️'], answer: '⬅️' },
  { difficulty: 'easy', sequence: ['5', '10', '15', '?', '25'], options: ['18', '20', '22', '24'], answer: '20' },
  { difficulty: 'easy', sequence: ['A', 'A', 'B', 'B', '?'], options: ['A', 'B', 'C', 'D'], answer: 'C' },
  { difficulty: 'easy', sequence: ['⭐', '⭐', '🌙', '🌙', '?'], options: ['⭐', '🌙', '☀️', '☁️'], answer: '⭐' },
  { difficulty: 'easy', sequence: ['100', '90', '80', '?', '60'], options: ['75', '70', '65', '85'], answer: '70' },
  
  // MEDIUM - Combined Logic
  { difficulty: 'medium', sequence: ['A', 'C', 'E', '?', 'I'], options: ['F', 'G', 'H', 'D'], answer: 'G' }, // +2 letters
  { difficulty: 'medium', sequence: ['1', '1', '2', '3', '?', '8'], options: ['4', '5', '6', '7'], answer: '5' }, // Fibonacci
  { difficulty: 'medium', sequence: ['🔴', '🔵', '🔴', '🔵', '?'], options: ['🔴', '🔵', '🟢', '🟡'], answer: '🔴' }, // Color pattern
  { difficulty: 'medium', sequence: ['1', '4', '9', '?', '25'], options: ['12', '16', '20', '14'], answer: '16' }, // Squares
  { difficulty: 'medium', sequence: ['Z', 'X', 'V', '?', 'R'], options: ['T', 'S', 'U', 'W'], answer: 'T' }, // -2 letters
  { difficulty: 'medium', sequence: ['🌑', '🌒', '🌓', '?', '🌕'], options: ['🌔', '🌖', '🌗', '🌘'], answer: '🌔' }, // Moon phases
  { difficulty: 'medium', sequence: ['3', '6', '12', '?', '48'], options: ['24', '21', '36', '18'], answer: '24' }, // x2
  { difficulty: 'medium', sequence: ['⚠️', '⛔', '⚠️', '⛔', '?'], options: ['⚠️', '⛔', '✅', '❌'], answer: '⚠️' },
  
  // HARD - Complex/Changing
  { difficulty: 'hard', sequence: ['2', '3', '5', '7', '?'], options: ['9', '11', '13', '15'], answer: '11' }, // Primes
  { difficulty: 'hard', sequence: ['1', '2', '6', '24', '?'], options: ['100', '120', '48', '96'], answer: '120' }, // Factorials
  { difficulty: 'hard', sequence: ['M', 'T', 'W', 'T', '?', 'S'], options: ['F', 'S', 'M', 'T'], answer: 'F' }, // Days of week
  { difficulty: 'hard', sequence: ['J', 'F', 'M', 'A', '?'], options: ['M', 'J', 'J', 'A'], answer: 'M' }, // Months
  { difficulty: 'hard', sequence: ['❤️', '💙', '💛', '❤️', '?', '💛'], options: ['❤️', '💙', '💛', '💚'], answer: '💙' },
  { difficulty: 'hard', sequence: ['1', '8', '27', '?', '125'], options: ['36', '64', '81', '49'], answer: '64' }, // Cubes
  { difficulty: 'hard', sequence: ['A1', 'B2', 'C3', '?', 'E5'], options: ['D3', 'D4', 'C4', 'E4'], answer: 'D4' },
  { difficulty: 'hard', sequence: ['⬆️', '↗️', '➡️', '↘️', '?'], options: ['⬇️', '↙️', '⬅️', '↖️'], answer: '⬇️' } // Clockwise rotation
];

const currentQuestion = computed(() => {
  if (gameState.value !== 'running') return { sequence: [], options: [] };
  const filtered = allQuestions.filter(q => q.difficulty === selectedDifficulty.value);
  // Fallback to simple modulo if not enough questions, or random
  return filtered[currentRound.value % filtered.length];
});

const startGame = (difficulty = 'easy') => {
  selectedDifficulty.value = difficulty;
  score.value = 0;
  currentRound.value = 0;
  totalRounds.value = LEVELS[difficulty].rounds;
  gameState.value = 'running';
  feedback.value = null;
  selectedAnswer.value = null;
  rawData.value = [];
  startTime.value = performance.now();
};

const handleAnswer = (option) => {
  if (feedback.value) return;

  const rt = performance.now() - startTime.value;
  selectedAnswer.value = option;
  const isCorrect = option === currentQuestion.value.answer;
  
  if (isCorrect) score.value++;
  feedback.value = isCorrect ? 'correct' : 'wrong';

  // Add to rawData - strictly typed for PatternDetectionSession
  rawData.value.push({
      round: currentRound.value + 1,
      sequence: currentQuestion.value.sequence,
      options: currentQuestion.value.options,
      correctAnswer: currentQuestion.value.answer,
      userAnswer: option,
      isCorrect: isCorrect,
      rt: Math.round(rt),
      difficulty: selectedDifficulty.value
  });

  setTimeout(() => {
    if (currentRound.value < totalRounds.value - 1) {
      currentRound.value++;
      feedback.value = null;
      selectedAnswer.value = null;
      startTime.value = performance.now(); // Reset timer for next question
    } else {
      finishGame();
    }
  }, 1000);
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
            console.error('User not authenticated - cannot save results');
            return;
        }

        const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');
        
        const difficultyMap = { 'easy': 1, 'medium': 3, 'hard': 5 };
        
        // Calculate avgRT
        const totalRT = rawData.value.reduce((acc, curr) => acc + curr.rt, 0);
        const avgRTVal = rawData.value.length > 0 ? Math.round(totalRT / rawData.value.length) : 0;

        // Strict Schema Match
        const sessionData = {
            sessionId: `pd-${Date.now()}`,
            createdAt: serverTimestamp(),
            totalRounds: totalRounds.value,
            score: score.value,
            accuracy: Math.round((score.value / totalRounds.value) * 100),
            avgRT: avgRTVal,
            difficultyLevel: difficultyMap[selectedDifficulty.value] || 1,
            rawData: rawData.value,
            exerciseId: 'pattern-detection-mini' // Keeping this as identifier, but schema is primary
        };

        const docRef = await addDoc(collection($firestore, `users/${user.uid}/patternDetectionResults`), sessionData);
        console.log('Results saved successfully to', docRef.path);
    } catch (e) {
        console.error('Error saving results:', e);
    }
};

const getOptionClass = (option) => {
  if (feedback.value && option === currentQuestion.value.answer) {
    return 'bg-emerald-100 dark:bg-emerald-900/30 border-emerald-500 text-emerald-700 dark:text-emerald-400';
  }
  if (feedback.value && option === selectedAnswer.value && option !== currentQuestion.value.answer) {
    return 'bg-red-100 dark:bg-red-900/30 border-red-500 text-red-700 dark:text-red-400 opacity-60';
  }
  if (!feedback.value) {
    return 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-cyan-500 dark:hover:border-cyan-500 hover:shadow-md cursor-pointer text-slate-700 dark:text-slate-200';
  }
  return 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 opacity-50 text-slate-400';
};

</script>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out forwards;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>

