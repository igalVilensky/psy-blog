<template>
    <div
        class="min-h-screen bg-slate-950 text-slate-100 font-sans transition-colors duration-500 overflow-x-hidden selection:bg-cyan-500/30">
        <!-- Progress Dots -->
        <div class="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex gap-2">
            <div v-for="n in 10" :key="n" class="h-1 w-4 sm:w-6 rounded-full transition-all duration-300"
                :class="step >= n ? 'bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]' : 'bg-slate-800'">
            </div>
        </div>

        <!-- HUD Overlay Icons (Mini Status) -->
        <div class="fixed top-6 right-6 z-50 flex gap-3 opacity-60 pointer-events-none">
            <div v-for="param in parameters" :key="param.id" class="flex flex-col items-center">
                <span class="text-sm sm:text-lg">{{ param.icon }}</span>
            </div>
        </div>

        <main class="min-h-screen flex flex-col items-center justify-center p-6 relative">
            <Transition name="glitch" mode="out-in">
                <!-- 1. START SCREEN -->
                <div v-if="step === 1" :key="1" class="text-center space-y-8 max-w-lg">
                    <h1
                        class="text-5xl sm:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-500 animate-pulse uppercase">
                        Один Ресурс
                    </h1>
                    <p class="text-sm sm:text-base text-slate-500 uppercase tracking-[0.3em] font-light">
                        Вы не можете сделать всё.
                    </p>
                    <div class="pt-8">
                        <button @click="nextStep" class="game-btn text-xl px-12 py-4 uppercase">Играть</button>
                    </div>
                </div>

                <!-- 2. STATE SNAPSHOT -->
                <div v-else-if="step === 2" :key="2"
                    class="w-full max-w-lg space-y-10 bg-slate-900/40 p-8 sm:p-10 rounded-[2rem] border border-slate-800 backdrop-blur-xl">
                    <div class="text-center space-y-2">
                        <h2 class="text-2xl font-bold tracking-tight">Ваше текущее состояние</h2>
                        <div class="h-1 w-12 bg-cyan-500 mx-auto rounded-full"></div>
                    </div>

                    <div class="grid grid-cols-5 gap-2 sm:gap-4 py-8">
                        <div v-for="param in parameters" :key="param.id" class="flex flex-col items-center space-y-4">
                            <span class="text-2xl sm:text-3xl filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">{{
                                param.icon }}</span>
                            <div class="w-full bg-slate-800 h-24 sm:h-32 rounded-2xl relative overflow-hidden">
                                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-cyan-600 to-cyan-400 transition-all duration-1000 ease-out"
                                    :style="{ height: `${state1[param.id] * 20}%` }">
                                    <div class="absolute top-0 left-0 right-0 h-1 bg-white/40"></div>
                                </div>
                            </div>
                            <span
                                class="text-[10px] sm:text-xs font-bold text-slate-500 text-center leading-tight h-8 flex items-center">{{
                                    param.labelShort }}</span>
                        </div>
                    </div>

                    <button @click="nextStep" class="game-btn w-full py-4 uppercase tracking-widest">Продолжить</button>
                </div>

                <!-- 3. GAME SCENE -->
                <div v-else-if="step === 3" :key="3"
                    class="text-center space-y-4 max-w-lg animate-in zoom-in-95 duration-500">
                    <h2 class="text-3xl sm:text-4xl font-bold tracking-tight">У вас есть один дополнительный ход.</h2>
                    <p class="text-slate-500 uppercase tracking-widest text-sm">Выберите, куда его направить.</p>
                    <div class="pt-12">
                        <button @click="nextStep" class="game-btn-outline px-10 py-3 uppercase">Далее</button>
                    </div>
                </div>

                <!-- 4. CHOICE AS CARDS -->
                <div v-else-if="step === 4" :key="4" class="w-full max-w-5xl space-y-10">
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        <button v-for="option in gameOptions" :key="option.id" @click="handleChoice(option.id)"
                            class="choice-card group">
                            <div
                                class="absolute -top-3 -left-3 w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center font-bold text-slate-500 group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                                {{ option.id }}
                            </div>
                            <h3 class="text-lg font-bold mb-4 uppercase tracking-tighter leading-tight break-words">{{
                                option.title }}</h3>
                            <div class="space-y-4">
                                <div v-for="trait in option.traits" :key="trait"
                                    class="flex flex-col space-y-1 text-[10px] font-black tracking-widest">
                                    <span class="text-slate-500 uppercase">{{ trait.label }}</span>
                                    <span
                                        :class="trait.value.includes('↑') ? 'text-emerald-500' : trait.value.includes('↓') ? 'text-rose-500' : 'text-slate-400'">
                                        {{ trait.value }}
                                    </span>
                                </div>
                            </div>
                            <div class="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <i class="fas fa-chevron-right text-cyan-500"></i>
                            </div>
                        </button>
                    </div>
                </div>

                <!-- 5. SYSTEM REACTION -->
                <div v-else-if="step === 5" :key="5" class="w-full max-w-md space-y-12">
                    <div class="grid grid-cols-5 gap-4">
                        <div v-for="param in parameters" :key="param.id" class="flex flex-col items-center space-y-6">
                            <span class="text-3xl">{{ param.icon }}</span>
                            <div
                                class="w-full bg-slate-800 h-48 rounded-full relative overflow-hidden shadow-inner border border-slate-700/50">
                                <div class="absolute bottom-0 left-0 right-0 bg-cyan-400 transition-all duration-700 ease-elastic h-0"
                                    :class="reactionActive ? 'reaction-active' : ''"
                                    :style="{ height: `${state1[param.id] * 20}%` }">
                                </div>
                            </div>
                        </div>
                    </div>
                    <Transition name="fade">
                        <div v-if="showNextBtn" class="flex justify-center pt-8">
                            <button @click="nextStep"
                                class="game-btn px-12 py-3 uppercase tracking-tighter">Далее</button>
                        </div>
                    </Transition>
                </div>

                <!-- 6. FREEZE MOMENT -->
                <div v-else-if="step === 6" :key="6" class="text-center">
                    <p class="text-2xl font-bold tracking-widest text-slate-700 animate-pulse uppercase italic">Решение
                        зафиксировано.</p>
                </div>

                <!-- 7. STATE GLITCH -->
                <div v-else-if="step === 7" :key="7"
                    class="w-full max-w-lg space-y-12 bg-red-500/5 p-8 sm:p-10 rounded-[2rem] border border-red-500/20 backdrop-blur-xl relative overflow-hidden">
                    <div class="glitch-line absolute inset-0 opacity-20 pointer-events-none"></div>

                    <div class="text-center space-y-2 relative z-10">
                        <h2 class="text-3xl font-black text-red-500 animate-glitch-text uppercase">Состояние изменилось.
                        </h2>
                        <p class="text-[10px] text-red-400 uppercase tracking-[0.4em] font-bold">Вы не выбирали этого.
                        </p>
                    </div>

                    <div class="grid grid-cols-5 gap-2 sm:gap-4 relative z-10">
                        <div v-for="param in parameters" :key="param.id" class="flex flex-col items-center space-y-4">
                            <span class="text-2xl opacity-50">{{ param.icon }}</span>
                            <div
                                class="w-full bg-slate-800/50 h-32 rounded-2xl relative overflow-hidden border border-slate-700">
                                <!-- Old state shadow -->
                                <div class="absolute bottom-0 left-0 right-0 bg-slate-700/30 transition-all duration-1000"
                                    :style="{ height: `${state1[param.id] * 20}%` }"></div>
                                <!-- New state -->
                                <div class="absolute bottom-0 right-0 left-0 bg-orange-500 transition-all duration-1000 delay-300"
                                    :style="{ height: `${state2[param.id] * 20}%` }"></div>
                            </div>
                            <span class="text-[9px] font-bold text-slate-600 text-center uppercase">{{ param.labelShort
                            }}</span>
                        </div>
                    </div>

                    <button @click="nextStep"
                        class="game-btn bg-orange-600 hover:bg-orange-500 border-orange-700/50 w-full py-4 uppercase">Продолжить</button>
                </div>

                <!-- 8. SAME ROUND AGAIN -->
                <div v-else-if="step === 8" :key="8" class="w-full max-w-5xl space-y-10">
                    <div class="text-center mb-10">
                        <h2 class="text-3xl font-bold tracking-tight text-orange-500 uppercase italic">Ситуация
                            повторяется</h2>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        <button v-for="option in gameOptions" :key="option.id" @click="handleChoice2(option.id)"
                            class="choice-card group border-orange-500/20 hover:border-orange-500/50">
                            <div
                                class="absolute -top-3 -left-3 w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center font-bold text-slate-500 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                                {{ option.id }}
                            </div>
                            <h3 class="text-lg font-bold mb-4 uppercase tracking-tighter leading-tight break-words">{{
                                option.title }}</h3>
                            <div class="space-y-4">
                                <div v-for="trait in option.traits" :key="trait"
                                    class="flex flex-col space-y-1 text-[10px] font-black tracking-widest">
                                    <span class="text-slate-500 uppercase">{{ trait.label }}</span>
                                    <span
                                        :class="trait.value.includes('↑') ? 'text-emerald-500' : trait.value.includes('↓') ? 'text-rose-500' : 'text-slate-400'">
                                        {{ trait.value }}
                                    </span>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>

                <!-- 9. RESULT SCREEN -->
                <div v-else-if="step === 9" :key="9" class="w-full max-w-5xl px-4 flex flex-col items-center">
                    <h2 class="text-2xl font-black tracking-widest uppercase mb-12 text-slate-500">Сравнение выборов
                    </h2>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 w-full mb-16">
                        <!-- Round 1 Pane -->
                        <div class="result-panel flex flex-col h-full">
                            <div class="flex justify-between items-center mb-10 pb-6 border-b border-white/5">
                                <h3 class="text-sm font-black uppercase tracking-widest text-slate-500">Раунд 1</h3>
                                <div class="px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
                                    <span class="text-lg font-black italic text-cyan-500">{{ choices[0]?.id }}</span>
                                </div>
                            </div>

                            <div class="flex-grow space-y-6 mb-10">
                                <div v-for="param in parameters" :key="param.id" class="space-y-2 group/param">
                                    <div
                                        class="flex justify-between items-center text-[10px] font-black tracking-widest text-slate-500 group-hover/param:text-slate-300 transition-colors">
                                        <div class="flex items-center gap-2">
                                            <span>{{ param.icon }}</span>
                                            <span>{{ param.labelLong }}</span>
                                        </div>
                                        <span class="font-mono text-cyan-500">{{ state1[param.id] }}/5</span>
                                    </div>
                                    <div class="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                        <div class="h-full bg-cyan-500 transition-all duration-1000"
                                            :style="{ width: `${state1[param.id] * 20}%` }"></div>
                                    </div>
                                </div>
                            </div>

                            <div
                                class="mt-auto px-6 py-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/10 text-center">
                                <p class="text-sm font-black text-cyan-500 uppercase">{{ choices[0]?.title }}</p>
                            </div>
                        </div>

                        <!-- Round 2 Pane -->
                        <div class="result-panel flex flex-col h-full"
                            :class="choices[0]?.id !== choices[1]?.id ? 'border-orange-500/30' : ''">
                            <div class="flex justify-between items-center mb-10 pb-6 border-b border-white/5">
                                <h3 class="text-sm font-black uppercase tracking-widest text-orange-500">Раунд 2</h3>
                                <div class="px-4 py-1.5 rounded-full transition-colors"
                                    :class="choices[0]?.id !== choices[1]?.id ? 'bg-orange-500/20 border border-orange-500/30' : 'bg-slate-800 border border-slate-700'">
                                    <span class="text-lg font-black italic"
                                        :class="choices[0]?.id !== choices[1]?.id ? 'text-orange-500' : 'text-slate-500'">{{
                                            choices[1]?.id }}</span>
                                </div>
                            </div>

                            <div class="flex-grow space-y-6 mb-10">
                                <div v-for="param in parameters" :key="param.id" class="space-y-2 group/param">
                                    <div
                                        class="flex justify-between items-center text-[10px] font-black tracking-widest text-slate-500 group-hover/param:text-slate-300 transition-colors">
                                        <div class="flex items-center gap-2">
                                            <span>{{ param.icon }}</span>
                                            <span>{{ param.labelLong }}</span>
                                        </div>
                                        <span class="font-mono"
                                            :class="state2[param.id] !== state1[param.id] ? 'text-orange-500 font-bold underline' : 'text-slate-500'">
                                            {{ state2[param.id] }}/5
                                        </span>
                                    </div>
                                    <div class="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                        <div class="h-full transition-all duration-1000"
                                            :class="state2[param.id] !== state1[param.id] ? 'bg-orange-500' : 'bg-slate-600'"
                                            :style="{ width: `${state2[param.id] * 20}%` }"></div>
                                    </div>
                                </div>
                            </div>

                            <div class="mt-auto px-6 py-4 rounded-2xl border transition-colors"
                                :class="choices[0]?.id !== choices[1]?.id ? 'bg-orange-500/10 border-orange-500/20' : 'bg-slate-800/30 border-slate-700/50'">
                                <p class="text-sm font-black uppercase"
                                    :class="choices[0]?.id !== choices[1]?.id ? 'text-orange-500' : 'text-slate-500'">
                                    {{ choices[1]?.title }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <p class="text-xs uppercase tracking-[0.6em] text-slate-600 mb-10 text-center leading-loose">Одна и
                        та же ситуация.<br>Разные внутренние состояния.</p>
                    <button @click="nextStep" class="game-btn px-16 py-4 uppercase">Продолжить</button>
                </div>

                <!-- 10. END SCREEN -->
                <div v-else-if="step === 10" :key="10" class="text-center space-y-12 animate-in fade-in duration-1000">
                    <div class="space-y-4">
                        <h2 class="text-6xl sm:text-7xl font-black tracking-tighter italic uppercase">Состояние Важно.
                        </h2>
                        <div class="h-1 w-24 bg-cyan-500 mx-auto rounded-full"></div>
                    </div>
                    <p class="text-slate-500 max-w-md mx-auto leading-relaxed">Эксперимент завершен. Вы увидели, как
                        изменение внутренних параметров влияет на фокус вашего внимания.</p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <button @click="restartGame" class="game-btn px-12 py-4 group uppercase">
                            Ещё раз
                            <i class="fas fa-redo ml-2 group-hover:rotate-180 transition-transform duration-500"></i>
                        </button>
                        <button @click="handleClose"
                            class="game-btn-outline px-12 py-4 border-slate-700 text-slate-400 hover:text-white uppercase transition-colors">Закрыть</button>
                    </div>
                </div>
            </Transition>
        </main>

        <!-- Experimental Label -->
        <div class="fixed bottom-6 left-6 pointer-events-none z-50">
            <div
                class="px-4 py-1.5 bg-cyan-500 text-slate-950 text-[10px] font-black uppercase tracking-[0.2em] rounded-sm skew-x-[-15deg] shadow-[5px_5px_0px_rgba(6,182,212,0.2)]">
                Playable Experiment
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const step = ref(1);

const parameters = [
    { id: 'energy', labelShort: 'ЭНЕРГИЯ', labelLong: 'Уровень энергии', icon: '🔋' },
    { id: 'tension', labelShort: 'НАПРЯЖЕНИЕ', labelLong: 'Внутреннее напряжение', icon: '⚡' },
    { id: 'focus', labelShort: 'ФОКУС', labelLong: 'Ясность и фокус', icon: '👁' },
    { id: 'urgency', labelShort: 'СРОЧНОСТЬ', labelLong: 'Чувство срочности', icon: '⏱' },
    { id: 'control', labelShort: 'КОНТРОЛЬ', labelLong: 'Ощущение контроля', icon: '🎯' }
];

const generateRandomState = () => ({
    energy: Math.floor(Math.random() * 3) + 2,
    tension: Math.floor(Math.random() * 3) + 2,
    focus: Math.floor(Math.random() * 3) + 2,
    urgency: Math.floor(Math.random() * 3) + 2,
    control: Math.floor(Math.random() * 3) + 2
});

const state1 = reactive(generateRandomState());
const state2 = reactive({ ...state1 });

const gameOptions = [
    {
        id: 'A',
        title: 'Улучшать',
        icon: '⬆',
        traits: [
            { label: 'Качество', value: '↑' },
            { label: 'Скорость', value: '↓' }
        ]
    },
    {
        id: 'B',
        title: 'Ускорять',
        icon: '⏩',
        traits: [
            { label: 'Скорость', value: '↑' },
            { label: 'Нагрузка', value: '↑' }
        ]
    },
    {
        id: 'C',
        title: 'Стабилизировать',
        icon: '🛠',
        traits: [
            { label: 'Напряжение', value: '↓' },
            { label: 'Результат', value: 'позже' }
        ]
    },
    {
        id: 'D',
        title: 'Удерживать',
        icon: '⏸',
        traits: [
            { label: 'Изменения', value: 'нет' },
            { label: 'Риски', value: '0' }
        ]
    }
];

const choices = ref([]);
const reactionActive = ref(false);
const showNextBtn = ref(false);

const nextStep = () => {
    step.value++;
};

const handleChoice = (id) => {
    choices.value[0] = gameOptions.find(o => o.id === id);
    nextStep();
};

const handleChoice2 = (id) => {
    choices.value[1] = gameOptions.find(o => o.id === id);
    nextStep();
};

const restartGame = () => {
    Object.assign(state1, generateRandomState());
    Object.assign(state2, { ...state1 });
    choices.value = [];
    step.value = 2; // Jump to state snapshot
};

const handleClose = () => {
    router.push('/lab/brain-training');
};

watch(step, (newStep) => {
    if (newStep === 5) {
        setTimeout(() => {
            reactionActive.value = true;
            setTimeout(() => {
                showNextBtn.value = true;
            }, 1000);
        }, 500);
    }

    if (newStep === 6) {
        setTimeout(() => {
            nextStep();
        }, 1500);
    }

    if (newStep === 7) {
        // Apply glitch changes to state 2
        state2.energy = Math.max(1, state1.energy - 2);
        state2.tension = Math.min(5, state1.tension + 2);
        state2.urgency = Math.min(5, state1.urgency + 2);
        state2.focus = Math.max(1, state1.focus - 1);
        state2.control = Math.max(1, state1.control - 1);
    }
});

definePageMeta({
    layout: 'empty'
});
</script>

<style scoped>
.game-btn {
    @apply relative overflow-hidden transition-all duration-300 transform font-black tracking-widest border-2 border-cyan-500 bg-transparent text-cyan-500 hover:bg-cyan-500 hover:text-slate-950 hover:scale-105 active:scale-95;
}

.game-btn:hover {
    box-shadow: 0 0 20px rgba(6, 182, 212, 0.4);
}

.game-btn-outline {
    @apply border-2 border-slate-800 bg-transparent text-slate-500 font-black tracking-widest transition-all hover:border-white hover:text-white;
}

.choice-card {
    @apply relative p-8 sm:p-10 rounded-3xl bg-slate-900/50 border-2 border-slate-800 text-left transition-all duration-500 hover:border-cyan-500/50 hover:bg-slate-900 hover:shadow-2xl hover:-translate-y-2;
}

.result-panel {
    @apply p-6 sm:p-10 rounded-[2.5rem] bg-slate-900/40 border-2 border-slate-800 transition-all duration-700 hover:border-slate-600 hover:bg-slate-900/60;
}

.glitch-enter-active,
.glitch-leave-active {
    transition: opacity 0.5s, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.glitch-enter-from,
.glitch-leave-to {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
}

.reaction-active {
    animation: reaction-bounce 1s ease-out forwards;
}

@keyframes reaction-bounce {
    0% {
        transform: scaleY(0);
    }

    60% {
        transform: scaleY(1.1);
    }

    80% {
        transform: scaleY(0.95);
    }

    100% {
        transform: scaleY(1);
    }
}

.animate-pulse {
    animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {

    0%,
    100% {
        opacity: 1;
        filter: brightness(1);
    }

    50% {
        opacity: 0.8;
        filter: brightness(1.2);
    }
}

.animate-glitch-text {
    animation: glitch-text 0.3s infinite;
}

@keyframes glitch-text {
    0% {
        transform: translate(0);
        text-shadow: 2px 2px #ff0000, -2px -2px #00ff00;
    }

    25% {
        transform: translate(-1px, 1px);
    }

    50% {
        transform: translate(1px, -1px);
    }

    75% {
        transform: translate(-2px, -1px);
    }

    100% {
        transform: translate(1px, 1px);
        text-shadow: -1px -1px #ff0000, 1px 1px #00ff00;
    }
}

.glitch-line {
    background: repeating-linear-gradient(transparent 0%,
            rgba(255, 0, 0, 0.05) 0.5%,
            transparent 1%);
    animation: scanline 10s linear infinite;
}

@keyframes scanline {
    0% {
        transform: translateY(0);
    }

    100% {
        transform: translateY(100%);
    }
}
</style>
