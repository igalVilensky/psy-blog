<template>
    <div
        class="mini-games-section bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-800">
        <h3 class="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center">
            <span
                class="w-8 h-8 rounded-full bg-orange-500/20 text-orange-600 dark:text-orange-400 flex items-center justify-center mr-3 text-sm">3</span>
            Когнитивная Тренировка
        </h3>

        <div class="tabs flex space-x-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl mb-6">
            <button v-for="tab in ['impulse', 'delay']" :key="tab" @click="activeTab = tab"
                class="flex-1 py-2 text-sm font-medium rounded-lg transition-all"
                :class="activeTab === tab ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'">
                {{ tab === 'impulse' ? 'Контроль Импульсов' : 'Задержка Реакции' }}
            </button>
        </div>

        <!-- Impulse Game -->
        <div v-if="activeTab === 'impulse'"
            class="game-container min-h-[300px] flex flex-col items-center justify-center relative overflow-hidden bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
            <div v-if="!gameActive && !gameFinished" class="text-center p-6">
                <div class="text-4xl mb-4">🛑</div>
                <h4 class="text-lg font-bold mb-2 text-slate-800 dark:text-white">Стоп-Сигнал</h4>
                <p class="text-sm text-slate-500 mb-6">Нажимайте на ЗЕЛЕНЫЙ. НЕ нажимайте на КРАСНЫЙ.</p>
                <button @click="startGame('impulse')"
                    class="px-6 py-2 bg-orange-500 text-white rounded-lg">Начать</button>
            </div>

            <div v-else-if="gameActive" class="w-full h-full flex items-center justify-center cursor-pointer"
                @click="handleImpulseClick">
                <div class="target w-24 h-24 rounded-full transition-all duration-200 transform active:scale-95 shadow-xl"
                    :class="impulseColor === 'green' ? 'bg-emerald-500 shadow-emerald-500/50' : 'bg-red-500 shadow-red-500/50'">
                </div>
            </div>

            <div v-else class="text-center">
                <h4 class="text-xl font-bold mb-2 text-slate-800 dark:text-white">Счет: {{ score }}</h4>
                <button @click="resetGame" class="text-orange-500 hover:underline">Играть снова</button>
            </div>
        </div>

        <!-- Delay Game -->
        <div v-if="activeTab === 'delay'"
            class="game-container min-h-[300px] flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
            <div v-if="!gameActive && !gameFinished" class="text-center p-6">
                <div class="text-4xl mb-4">⏳</div>
                <h4 class="text-lg font-bold mb-2 text-slate-800 dark:text-white">Правило 10 Секунд</h4>
                <p class="text-sm text-slate-500 mb-6">Удерживайте кнопку, пока таймер не заполнится. Если отпустите -
                    проиграете.
                </p>
                <button @click="startGame('delay')" class="px-6 py-2 bg-blue-500 text-white rounded-lg">Готов</button>
            </div>

            <div v-else-if="gameActive" class="text-center w-full max-w-xs">
                <div class="mb-8 text-2xl font-mono font-bold text-slate-800 dark:text-white">{{ (delayProgress /
                    10).toFixed(1) }}s</div>
                <button @mousedown="startHolding" @touchstart.prevent="startHolding" @mouseup="stopHolding"
                    @touchend.prevent="stopHolding" @mouseleave="stopHolding"
                    class="w-24 h-24 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 active:scale-95 transition-transform select-none">
                    ЖМИТЕ
                </button>
                <div class="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full mt-8 overflow-hidden">
                    <div class="h-full bg-blue-500 transition-all duration-100" :style="{ width: `${delayProgress}%` }">
                    </div>
                </div>
            </div>

            <div v-else class="text-center">
                <h4 class="text-xl font-bold mb-2" :class="score === 100 ? 'text-emerald-500' : 'text-red-500'">
                    {{ score === 100 ? 'Успех!' : 'Провал' }}
                </h4>
                <button @click="resetGame" class="text-blue-500 hover:underline">Попробовать снова</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['save']);

const activeTab = ref('impulse');
const gameActive = ref(false);
const gameFinished = ref(false);
const score = ref(0);

// Impulse Game State
const impulseColor = ref('green');
let impulseTimer = null;
let impulseRounds = 0;
const maxRounds = 5;

// Delay Game State
const delayProgress = ref(0);
let delayInterval = null;

const startGame = (type) => {
    gameActive.value = true;
    gameFinished.value = false;
    score.value = 0;

    if (type === 'impulse') {
        impulseRounds = 0;
        nextImpulseRound();
    } else {
        delayProgress.value = 0;
    }
};

const nextImpulseRound = () => {
    if (impulseRounds >= maxRounds) {
        endGame();
        return;
    }

    impulseRounds++;
    // Randomly choose color, weighted towards green
    impulseColor.value = Math.random() > 0.3 ? 'green' : 'red';

    // Auto-fail or next round if no click after 2s (only for green)
    // Actually, for simplicity: just change color every 1-2s
    // If user clicks red -> fail round (minus score or no points)
    // If user clicks green -> points

    // Let's make it simpler: Reaction time.
    // Wait random time then show color.
    // But for now, just static for MVP.
};

const handleImpulseClick = () => {
    if (impulseColor.value === 'green') {
        score.value += 20;
        // Flash success feedback?
    } else {
        score.value -= 10;
        // Flash error feedback?
    }
    nextImpulseRound();
};

const startHolding = () => {
    if (!gameActive.value) return;

    if (delayInterval) clearInterval(delayInterval);

    delayInterval = setInterval(() => {
        delayProgress.value += 1; // 1% every 100ms = 10s total? No. 100% in 10s.
        // 10s = 10000ms. 
        // Interval 100ms -> 100 steps. 
        // +1 per step.

        if (delayProgress.value >= 100) {
            score.value = 100;
            endGame();
        }
    }, 100);
};

const stopHolding = () => {
    if (delayInterval) {
        clearInterval(delayInterval);
        delayInterval = null;
        if (delayProgress.value < 100 && gameActive.value) {
            score.value = 0;
            endGame();
        }
    }
};

const endGame = () => {
    gameActive.value = false;
    gameFinished.value = true;
    if (delayInterval) clearInterval(delayInterval);

    emit('save', {
        game: activeTab.value,
        score: score.value,
        timestamp: new Date().toISOString()
    });
};

const resetGame = () => {
    gameFinished.value = false;
    score.value = 0;
};
</script>

