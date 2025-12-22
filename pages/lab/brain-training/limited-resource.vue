<template>
    <div
        class="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-500 overflow-x-hidden">
        <!-- Progress Header -->
        <header
            class="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-950 backdrop-blur-xl border-b border-slate-200 dark:border-black/20 px-4 py-3 sm:px-6 sm:py-4">
            <div class="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
                <div class="flex items-center gap-4 w-full sm:w-auto">
                    <button @click="handleClose"
                        class="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                    <h1 class="text-base sm:text-lg font-semibold tracking-tight truncate">Ограниченный ресурс</h1>
                </div>
                <div
                    class="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 scrollbar-hide justify-center">
                    <div v-for="n in 9" :key="n"
                        class="h-1.5 min-w-[2rem] flex-1 sm:w-8 rounded-full transition-all duration-500"
                        :class="step >= n ? 'bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'bg-slate-200 dark:bg-slate-800/50'">
                    </div>
                </div>
            </div>
        </header>

        <main class="pt-24 pb-12 px-6 max-w-4xl mx-auto min-h-screen flex flex-col items-center justify-center">
            <Transition name="fade" mode="out-in">
                <!-- 1. Context Screen -->
                <div v-if="step === 1" :key="1" class="text-center space-y-8 animate-fade-in">
                    <div class="max-w-2xl mx-auto space-y-6">
                        <p class="text-xl sm:text-2xl font-light leading-relaxed">
                            Вы отвечаете за проект, который длится уже несколько месяцев.
                        </p>
                        <p class="text-xl sm:text-2xl font-light leading-relaxed">
                            Команда устала. Давление растет.
                        </p>
                        <p class="text-xl sm:text-2xl font-light leading-relaxed">
                            Есть шанс улучшить результат — но ресурсы ограничены.
                        </p>
                    </div>
                    <button @click="nextStep" class="btn-primary">Продолжить</button>
                </div>

                <!-- 2. State Fixation -->
                <div v-else-if="step === 2" :key="2" class="w-full max-w-xl space-y-12">
                    <div class="text-center space-y-2">
                        <p class="text-sm uppercase tracking-widest text-slate-500 dark:text-slate-400">Шаг 1/2:
                            Исходное состояние</p>
                        <p class="text-xs text-slate-400 dark:text-slate-500 italic">Выбирайте быстро. Не раздумывайте
                            слишком долго.
                        </p>
                    </div>

                    <div class="space-y-8">
                        <div v-for="param in parameters" :key="param.id" class="space-y-4">
                            <div class="flex justify-between items-center px-1">
                                <span class="text-sm font-medium">{{ param.label }}</span>
                                <span class="text-lg font-mono text-cyan-500">{{ state1[param.id] }}</span>
                            </div>
                            <input type="range" min="1" max="5" step="1" v-model.number="state1[param.id]"
                                class="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500">
                        </div>
                    </div>

                    <div class="flex justify-center pt-8">
                        <button @click="nextStep" class="btn-primary">Продолжить</button>
                    </div>
                </div>

                <!-- 3. Dilemma Screen -->
                <div v-else-if="step === 3" :key="3" class="w-full max-w-2xl space-y-12">
                    <div class="text-center space-y-6">
                        <p class="text-2xl font-light italic leading-relaxed">
                            У вас есть один дополнительный ресурс (время / бюджет / человек — абстрактно).<br>
                            Вы можете использовать его только одним способом.
                        </p>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button v-for="option in dilemmaOptions" :key="option.id" @click="handleChoice(option.id)"
                            class="dilemma-card group">
                            <span class="text-lg font-bold mb-3 block">{{ option.id }}. {{ option.title }}</span>
                            <ul class="text-sm text-slate-500 dark:text-slate-400 space-y-1">
                                <li v-for="trait in option.traits" :key="trait">{{ trait }}</li>
                            </ul>
                        </button>
                    </div>
                </div>

                <!-- 4. Immediate Consequences -->
                <div v-else-if="step === 4" :key="4" class="w-full max-w-md space-y-12 text-center">
                    <div class="space-y-8">
                        <h3 class="text-xl font-medium text-slate-500">Последствия</h3>
                        <div class="space-y-6">
                            <div v-for="effect in getActiveEffects()" :key="effect.label"
                                class="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                                <span class="font-medium">{{ effect.label }}</span>
                                <span :class="effect.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'"
                                    class="text-xl">
                                    {{ effect.trend === 'up' ? '↑' : '↓' }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <!-- Auto-advance after delay -->
                </div>

                <!-- 5. Pause Screen -->
                <div v-else-if="step === 5" :key="5"
                    class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-50 dark:bg-slate-950 transition-all duration-1000">
                    <p
                        class="text-xl sm:text-2xl font-light italic text-slate-400 dark:text-slate-500 opacity-0 animate-pulse-slow text-center px-6 max-w-lg">
                        Это было решение, принятое из текущего состояния.
                    </p>
                </div>

                <!-- 6. State Change -->
                <div v-else-if="step === 6" :key="6" class="w-full max-w-xl space-y-12">
                    <div class="text-center space-y-2">
                        <p class="text-sm uppercase tracking-widest text-slate-500 dark:text-slate-400">Шаг 2/2:
                            Повторение</p>
                        <p class="text-lg font-light">Значения состояний изменились.</p>
                    </div>

                    <div class="space-y-8 pointer-events-none">
                        <div v-for="param in parameters" :key="param.id" class="space-y-4">
                            <div class="flex justify-between items-center px-1">
                                <span class="text-sm font-medium">{{ param.label }}</span>
                                <div class="flex items-center gap-3">
                                    <span class="text-xs text-slate-400 line-through">{{ state1[param.id] }}</span>
                                    <span class="text-lg font-mono text-orange-500">{{ state2[param.id] }}</span>
                                </div>
                            </div>
                            <div class="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg overflow-hidden">
                                <div class="h-full bg-orange-500 transition-all duration-1000"
                                    :style="{ width: `${state2[param.id] * 20}%` }"></div>
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-center pt-8">
                        <button @click="nextStep" class="btn-primary">Продолжить</button>
                    </div>
                </div>

                <!-- 7. Same Dilemma Again -->
                <div v-else-if="step === 7" :key="7" class="w-full max-w-2xl space-y-12">
                    <div class="text-center space-y-6">
                        <p class="text-2xl font-light italic leading-relaxed">
                            У вас есть один дополнительный ресурс (время / бюджет / человек — абстрактно).<br>
                            Вы можете использовать его только одним способом.
                        </p>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button v-for="option in dilemmaOptions" :key="option.id" @click="handleChoice2(option.id)"
                            class="dilemma-card group">
                            <span class="text-lg font-bold mb-3 block">{{ option.id }}. {{ option.title }}</span>
                            <ul class="text-sm text-slate-500 dark:text-slate-400 space-y-1">
                                <li v-for="trait in option.traits" :key="trait">{{ trait }}</li>
                            </ul>
                        </button>
                    </div>
                </div>

                <!-- 8. Comparison Screen -->
                <div v-else-if="step === 8" :key="8" class="w-full max-w-5xl px-2 sm:px-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 pb-8">
                        <!-- Left Side: State 1 -->
                        <div
                            class="space-y-6 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-xl backdrop-blur-sm">
                            <h3 class="text-xs font-bold uppercase tracking-widest text-center text-slate-500">Выбор 1
                            </h3>
                            <div class="space-y-3">
                                <div v-for="param in parameters" :key="param.id"
                                    class="flex items-center justify-between text-xs sm:text-sm">
                                    <span class="text-slate-500">{{ param.label }}</span>
                                    <span class="font-mono text-cyan-500 font-bold">{{ state1[param.id] }}</span>
                                </div>
                            </div>
                            <div class="pt-6 border-t border-slate-100 dark:border-slate-800/50 text-center">
                                <p class="text-lg sm:text-xl font-bold">{{ choices[0] }}</p>
                            </div>
                        </div>

                        <!-- Right Side: State 2 -->
                        <div
                            class="space-y-6 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-xl backdrop-blur-sm">
                            <h3 class="text-sm font-bold uppercase tracking-widest text-center text-orange-500">Выбор 2
                            </h3>
                            <div class="space-y-3">
                                <div v-for="param in parameters" :key="param.id"
                                    class="flex items-center justify-between text-xs sm:text-sm">
                                    <span class="text-slate-500">{{ param.label }}</span>
                                    <span class="font-mono text-orange-500 font-bold">{{ state2[param.id] }}</span>
                                </div>
                            </div>
                            <div class="pt-6 border-t border-slate-100 dark:border-slate-800/50 text-center">
                                <p class="text-lg sm:text-xl font-bold"
                                    :class="choices[1] !== choices[0] ? 'text-orange-500' : ''">{{ choices[1] }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-center mt-4">
                        <button @click="nextStep" class="btn-primary">Финальный экран</button>
                    </div>
                </div>

                <!-- 9. Final Screen -->
                <div v-else-if="step === 9" :key="9"
                    class="text-center space-y-12 animate-fade-in w-full max-w-2xl px-4">
                    <p class="text-2xl sm:text-3xl font-light italic leading-relaxed">
                        Вы увидели, как состояние влияет на выбор.<br>
                        Выводы остаются за вами.
                    </p>
                    <button @click="handleClose"
                        class="btn-primary w-full sm:w-auto bg-slate-900 dark:bg-white text-white dark:text-slate-900">Закрыть</button>
                </div>
            </Transition>
        </main>

        <!-- Experimental Tag -->
        <div class="fixed bottom-6 right-6 pointer-events-none">
            <div
                class="px-3 py-1 rounded-full bg-slate-900/10 dark:bg-white/10 backdrop-blur-md border border-slate-900/20 dark:border-white/20 text-xs font-medium text-slate-500 uppercase tracking-widest">
                Экспериментальный модуль
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const step = ref(1);

const parameters = [
    { id: 'energy', label: 'Уровень энергии' },
    { id: 'tension', label: 'Внутреннее напряжение' },
    { id: 'clarity', label: 'Ясность' },
    { id: 'urgency', label: 'Чувство срочности' },
    { id: 'responsibility', label: 'Чувство ответственности' }
];

const state1 = reactive({
    energy: 3,
    tension: 3,
    clarity: 3,
    urgency: 3,
    responsibility: 3
});

const state2 = reactive({
    energy: 1,
    tension: 5,
    clarity: 2,
    urgency: 5,
    responsibility: 4
});

const dilemmaOptions = [
    { id: 'A', title: 'Улучшить качество', traits: ['Снижение рисков', 'Больше уверенности', 'Замедление темпов'] },
    { id: 'B', title: 'Ускорить сдачу', traits: ['Быстрый видимый прогресс', 'Высокая нагрузка', 'Больше технического долга'] },
    { id: 'C', title: 'Поддержать команду', traits: ['Снижение напряжения', 'Рост доверия', 'Отложенные результаты'] },
    { id: 'D', title: 'Ничего не предпринимать', traits: ['Сохранение контроля', 'Избегание новых рисков', 'Принятие ограничений'] }
];

const choices = ref([]);
const activeChoice = ref(null);

const effectsMap = {
    A: [
        { label: 'Качество', trend: 'up' },
        { label: 'Скорость', trend: 'down' },
        { label: 'Давление сроков', trend: 'up' },
        { label: 'Внешнее восприятие', trend: 'down' }
    ],
    B: [
        { label: 'Скорость', trend: 'up' },
        { label: 'Технический долг', trend: 'up' },
        { label: 'Усталость команды', trend: 'up' },
        { label: 'Риск ошибок', trend: 'up' }
    ],
    C: [
        { label: 'Доверие', trend: 'up' },
        { label: 'Риск выгорания', trend: 'down' },
        { label: 'Скорость проекта', trend: 'down' },
        { label: 'Сплоченность команды', trend: 'up' }
    ],
    D: [
        { label: 'Ресурсы', trend: 'up' }, // conserved
        { label: 'Инновации', trend: 'down' },
        { label: 'Упущенная выгода', trend: 'up' },
        { label: 'Профиль рисков', trend: 'stable' }
    ]
};

const nextStep = () => {
    step.value++;
};

const handleChoice = (id) => {
    activeChoice.value = id;
    choices.value[0] = dilemmaOptions.find(o => o.id === id).title;
    nextStep();
};

const handleChoice2 = (id) => {
    choices.value[1] = dilemmaOptions.find(o => o.id === id).title;
    nextStep();
};

const getActiveEffects = () => {
    return effectsMap[activeChoice.value] || [];
};

const handleClose = () => {
    router.push('/lab/brain-training');
};

watch(step, (newStep) => {
    if (newStep === 4) {
        setTimeout(() => {
            nextStep();
        }, 4000);
    }
    if (newStep === 5) {
        setTimeout(() => {
            nextStep();
        }, 4000);
    }
});

definePageMeta({
    layout: 'empty'
});
</script>

<style scoped>
.btn-primary {
    @apply px-8 py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/20 active:shadow-sm;
}

.dilemma-card {
    @apply p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left transition-all duration-300 hover:border-cyan-500/50 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:shadow-xl;
}

.fade-enter-active,
.fade-leave-active {
    transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(10px);
}

.animate-pulse-slow {
    animation: pulse-slow 3s infinite;
}

@keyframes pulse-slow {

    0%,
    100% {
        opacity: 0;
    }

    50% {
        opacity: 1;
    }
}

.animate-fade-in {
    animation: fade-in 1s ease-out forwards;
}

@keyframes fade-in {
    from {
        opacity: 0;
        transform: scale(0.98);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}

/* Custom range slider styling */
input[type=range]::-webkit-slider-thumb {
    @apply h-5 w-5 rounded-full bg-cyan-500 border-2 border-white dark:border-slate-950 appearance-none shadow-md transition-transform hover:scale-110;
}

input[type=range]::-moz-range-thumb {
    @apply h-5 w-5 rounded-full bg-cyan-500 border-2 border-white dark:border-slate-950 appearance-none shadow-md transition-transform hover:scale-110;
}
</style>
