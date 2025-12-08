<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-4">
    
    <!-- Header / Progress -->
    <div v-if="gameState !== 'idle' && gameState !== 'completed'" class="w-full max-w-2xl mb-8 flex justify-between items-center animate-fade-in-up">
      <div class="text-slate-500 dark:text-slate-400 font-medium">
        Задание {{ currentTaskIndex + 1 }} / {{ totalTasks }}
      </div>
      <div class="flex items-center gap-4">
        <div class="px-3 py-1 rounded-full bg-slate-200 dark:bg-white/10 text-xs font-bold text-slate-600 dark:text-slate-300 uppercase">
            {{ currentDifficulty }}
        </div>
      </div>
    </div>

    <!-- IDLE STATE (Start Screen) -->
    <div v-if="gameState === 'idle'" class="max-w-md text-center animate-fade-in-up">
      <div class="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-xl shadow-indigo-500/30">
        <i class="fas fa-shapes text-3xl text-white"></i>
      </div>
      <h1 class="text-3xl font-bold text-slate-900 dark:text-white mb-4">
        Pattern Detection Mini
      </h1>
      <p class="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
        Тренировка логического мышления и способности находить закономерности. Вам предстоит продолжить последовательность, выбрав правильный вариант.
      </p>

      <div class="space-y-4">
        <button @click="startGame('easy')" class="w-full py-4 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-white/10 hover:border-green-500 dark:hover:border-green-400 group transition-all text-left px-6 shadow-sm hover:shadow-md">
            <span class="block text-lg font-bold text-slate-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400">Легкий уровень</span>
            <span class="text-sm text-slate-500">Простые арифметические и визуальные паттерны</span>
        </button>
        <button @click="startGame('medium')" class="w-full py-4 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-white/10 hover:border-yellow-500 dark:hover:border-yellow-400 group transition-all text-left px-6 shadow-sm hover:shadow-md">
            <span class="block text-lg font-bold text-slate-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400">Средний уровень</span>
            <span class="text-sm text-slate-500">Комбинированные правила</span>
        </button>
        <button @click="startGame('hard')" class="w-full py-4 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-white/10 hover:border-red-500 dark:hover:border-red-400 group transition-all text-left px-6 shadow-sm hover:shadow-md">
            <span class="block text-lg font-bold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400">Сложный уровень</span>
            <span class="text-sm text-slate-500">Изменяющиеся правила и сложные последовательности</span>
        </button>
      </div>
    </div>

    <!-- GAME STATE -->
    <div v-else-if="gameState === 'showingTask' || gameState === 'feedback'" class="w-full max-w-2xl animate-fade-in-up">
        
        <!-- Sequence Display -->
        <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 mb-8 border border-slate-100 dark:border-white/5 min-h-[160px] flex items-center justify-center gap-4 flex-wrap">
             <div v-for="(item, idx) in currentTask?.sequence" :key="idx" 
                class="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-xl text-3xl sm:text-4xl font-bold transition-all transform hover:scale-105"
                :class="[
                    item === null 
                        ? 'bg-slate-100 dark:bg-slate-700 text-slate-400 border-2 border-dashed border-slate-300 dark:border-slate-600 animate-pulse' 
                        : 'bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-slate-700 dark:to-slate-600 text-slate-800 dark:text-white shadow-sm'
                ]"
             >
                {{ item === null ? '?' : item }}
             </div>
        </div>

        <!-- Options -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <button 
                v-for="option in currentTask?.options" 
                :key="option"
                @click="onSelectAnswer(option)"
                :disabled="gameState === 'feedback'"
                class="h-20 rounded-xl text-xl sm:text-2xl font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center"
                :class="getOptionClass(option)"
            >
                {{ option }}
            </button>
        </div>

        <!-- Explanation / Feedback -->
        <div v-if="gameState === 'feedback'" class="mt-8 p-6 rounded-xl animate-fade-in-up" 
            :class="isLastAnswerCorrect ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/40' : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/40'">
            <div class="flex items-center gap-3 mb-2">
                <i :class="['fas text-xl', isLastAnswerCorrect ? 'fa-check-circle text-green-500' : 'fa-times-circle text-red-500']"></i>
                <h3 class="font-bold text-lg" :class="isLastAnswerCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'">
                    {{ isLastAnswerCorrect ? 'Верно!' : 'Неверно' }}
                </h3>
            </div>
            <p class="text-slate-600 dark:text-slate-300 mb-4">
                {{ currentTask?.logicDescription }}
            </p>
            <button @click="nextTask" class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Далее <i class="fas fa-arrow-right ml-2"></i>
            </button>
        </div>
    </div>

    <!-- COMPLETED STATE -->
    <div v-else-if="gameState === 'completed'" class="max-w-xl w-full text-center animate-fade-in-up">
        <div class="mb-8">
            <div class="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 shadow-2xl shadow-green-500/30 mb-6">
                <i class="fas fa-trophy text-4xl text-white"></i>
            </div>
            <h2 class="text-4xl font-bold text-slate-900 dark:text-white mb-2">Тренировка завершена!</h2>
            <p class="text-slate-500 dark:text-slate-400">Отличная работа над когнитивными навыками</p>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-8">
            <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-white/5">
                <div class="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">{{ Math.round((score / totalTasks) * 100) }}%</div>
                <div class="text-xs text-slate-500 uppercase tracking-wider font-semibold">Точность</div>
            </div>
            <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-white/5">
                <div class="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">{{ Math.round(avgReactionTime) }}мс</div>
                <div class="text-xs text-slate-500 uppercase tracking-wider font-semibold">Ср. время реакции</div>
            </div>
        </div>

        <!-- AUTH CTA -->
        <div v-if="!authStore.user" class="mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
            <p class="mb-4 font-medium text-lg">Создайте аккаунт, чтобы сохранять прогресс и отслеживать улучшение ваших когнитивных навыков.</p>
            <div class="flex gap-4 justify-center">
                <NuxtLink to="/login" class="px-6 py-2 bg-white text-indigo-600 font-bold rounded-lg hover:bg-indigo-50 transition">
                    Войти
                </NuxtLink>
                <NuxtLink to="/register" class="px-6 py-2 bg-indigo-800/50 text-white font-bold rounded-lg hover:bg-indigo-800 transition backdrop-blur-sm border border-white/20">
                    Регистрация
                </NuxtLink>
            </div>
        </div>

        <div class="flex flex-col gap-3">
             <button @click="gameState = 'idle'" class="w-full py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition">
                Вернуться в меню
            </button>
            <NuxtLink to="/lab/exercises" class="text-indigo-500 hover:text-indigo-600 font-medium text-sm">
                К списку упражнений
            </NuxtLink>
        </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from '~/stores/auth';
import type { PatternTask, Difficulty } from '~/utils/patternDetectionEngine';
import { generateTask, validateAnswer } from '~/utils/patternDetectionEngine';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

definePageMeta({
  layout: 'laboratory'
});

// State
type GameState = 'idle' | 'showingTask' | 'feedback' | 'completed';
const gameState = ref<GameState>('idle');
const currentTask = ref<PatternTask | null>(null);
const currentDifficulty = ref<Difficulty>('easy');
const currentTaskIndex = ref(0);
const score = ref(0);
const totalTasks = 10;
const isLastAnswerCorrect = ref(false);
const userAnswers = ref<any[]>([]);

// Timing
const taskStartTime = ref(0);
const reactionTimes = ref<number[]>([]);
const avgReactionTime = computed(() => {
    if (reactionTimes.value.length === 0) return 0;
    return reactionTimes.value.reduce((a, b) => a + b, 0) / reactionTimes.value.length;
});

const authStore = useAuthStore();
const { $firestore } = useNuxtApp();

// Actions
const startGame = (difficulty: Difficulty) => {
    currentDifficulty.value = difficulty;
    currentTaskIndex.value = 0;
    score.value = 0;
    reactionTimes.value = [];
    userAnswers.value = [];
    gameState.value = 'showingTask';
    loadNextTask();
};

const loadNextTask = () => {
    currentTask.value = generateTask(currentDifficulty.value);
    taskStartTime.value = Date.now();
    gameState.value = 'showingTask';
};

const onSelectAnswer = (answer: string | number) => {
    if (gameState.value !== 'showingTask' || !currentTask.value) return;

    const reactionTime = Date.now() - taskStartTime.value;
    reactionTimes.value.push(reactionTime);
    
    const isCorrect = validateAnswer(currentTask.value, answer);
    isLastAnswerCorrect.value = isCorrect;
    if (isCorrect) score.value++;

    userAnswers.value.push({
        taskId: currentTask.value.id,
        answer: answer,
        correct: isCorrect,
        reactionTime: reactionTime
    });

    gameState.value = 'feedback';
};

const getOptionClass = (option: string | number) => {
    if (gameState.value === 'showingTask') {
        return 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white border-2 border-slate-100 dark:border-slate-600 hover:border-indigo-500 dark:hover:border-indigo-400';
    }
    // Feedback state
    if (option === currentTask.value?.answer) {
        return 'bg-green-500 text-white border-2 border-green-600';
    }
    // Highlight wrong selection if user clicked it
    // Note: We don't store "selected option" in ref for simplicity in this pure view, 
    // but ideally we'd show the user's wrong choice in red. 
    // Given the prompt asks for "immediate correct/incorrect feedback", showing the Correct one is key.
    return 'bg-white dark:bg-slate-700 text-slate-300 dark:text-slate-500 border-2 border-slate-100 dark:border-slate-800 opacity-50';
};

const nextTask = async () => {
    if (currentTaskIndex.value < totalTasks - 1) {
        currentTaskIndex.value++;
        loadNextTask();
    } else {
        await finishSession();
    }
};

const finishSession = async () => {
    gameState.value = 'completed';
    
    // Save to Firestore if authenticated
    if (authStore.user) {
        try {
            const resultData = {
                sessionId: `sess-${Date.now()}`,
                tasks: userAnswers.value,
                score: score.value,
                difficulty: currentDifficulty.value,
                timestamp: serverTimestamp(),
                avgReactionTime: avgReactionTime.value
            };
            
            await addDoc(collection($firestore, `users/${authStore.user.uid}/patternDetectionResults`), resultData);
            // console.log("Result saved!");
        } catch (e) {
            console.error("Error saving result:", e);
        }
    }
}
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
</style>
