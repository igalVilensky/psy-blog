<template>
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" @click="close"></div>

        <div
            class="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col max-h-[90vh]">
            <!-- Header -->
            <div class="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <h3 class="font-bold text-lg text-slate-800 dark:text-white">Протокол Вмешательства</h3>
                <button @click="close" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <!-- Content -->
            <div class="p-6 flex-1 overflow-y-auto">
                <!-- Step 1: Audio -->
                <div v-if="step === 1" class="text-center space-y-6">
                    <div
                        class="w-20 h-20 mx-auto bg-cyan-500/10 rounded-full flex items-center justify-center animate-pulse">
                        <i class="fas fa-headphones text-3xl text-cyan-500"></i>
                    </div>
                    <h4 class="text-xl font-bold">Фаза 1: Звуковая Перезагрузка</h4>
                    <p class="text-slate-500">Слушайте этот тон в течение 20 секунд. Сфокусируйтесь только на звуке.</p>

                    <div class="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div class="h-full bg-cyan-500 transition-all duration-1000 ease-linear"
                            :style="{ width: `${(timer / 20) * 100}%` }"></div>
                    </div>
                </div>

                <!-- Step 2: Breathing -->
                <div v-if="step === 2" class="text-center space-y-6">
                    <div class="relative w-32 h-32 mx-auto flex items-center justify-center">
                        <div class="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping"></div>
                        <div
                            class="relative w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center border-2 border-emerald-500/50">
                            <span class="text-emerald-500 font-bold">Дышите</span>
                        </div>
                    </div>
                    <h4 class="text-xl font-bold">Фаза 2: Квадратное Дыхание</h4>
                    <p class="text-slate-500">Вдох... Задержка... Выдох...</p>

                    <div class="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div class="h-full bg-emerald-500 transition-all duration-1000 ease-linear"
                            :style="{ width: `${(timer / 15) * 100}%` }"></div>
                    </div>
                </div>

                <!-- Step 3: Cognitive Task -->
                <div v-if="step === 3" class="text-center space-y-6">
                    <h4 class="text-xl font-bold">Фаза 3: Когнитивный Сдвиг</h4>
                    <p class="text-slate-500">Назовите 3 предмета СИНЕГО цвета, которые вы видите прямо сейчас.</p>
                    <div
                        class="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                        <input type="text" placeholder="Предмет 1"
                            class="w-full mb-2 bg-transparent border-b border-slate-300 dark:border-slate-600 focus:outline-none focus:border-cyan-500 px-2 py-1">
                        <input type="text" placeholder="Предмет 2"
                            class="w-full mb-2 bg-transparent border-b border-slate-300 dark:border-slate-600 focus:outline-none focus:border-cyan-500 px-2 py-1">
                        <input type="text" placeholder="Предмет 3"
                            class="w-full bg-transparent border-b border-slate-300 dark:border-slate-600 focus:outline-none focus:border-cyan-500 px-2 py-1">
                    </div>
                    <button @click="nextStep" class="w-full py-3 bg-cyan-500 text-white rounded-xl">Готово</button>
                </div>

                <!-- Step 4: Rating -->
                <div v-if="step === 4" class="text-center space-y-6">
                    <h4 class="text-xl font-bold">Фаза 4: Проверка</h4>
                    <p class="text-slate-500">Оцените интенсивность тяги сейчас.</p>

                    <div class="text-3xl font-bold text-cyan-500 mb-2">{{ finalRating }}/5</div>
                    <input type="range" min="1" max="5" v-model.number="finalRating"
                        class="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500">

                    <button @click="complete" class="w-full py-3 bg-cyan-500 text-white rounded-xl mt-4">Завершить
                        Протокол</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue';
import * as Tone from 'tone';

const props = defineProps({
    isOpen: Boolean
});

const emit = defineEmits(['close', 'complete']);

const step = ref(1);
const timer = ref(0);
const finalRating = ref(3);
let interval = null;
let osc = null;

const startTimer = (duration, next) => {
    timer.value = 0;
    clearInterval(interval);
    interval = setInterval(() => {
        timer.value++;
        if (timer.value >= duration) {
            clearInterval(interval);
            if (next) next();
        }
    }, 1000);
};

const startAudio = async () => {
    await Tone.start();
    // Binaural beat-ish tone for focus (Alpha waves ~10Hz diff)
    // Left ear 400Hz, Right ear 410Hz
    const pannerL = new Tone.Panner(-1).toDestination();
    const pannerR = new Tone.Panner(1).toDestination();

    const oscL = new Tone.Oscillator(400, "sine").connect(pannerL);
    const oscR = new Tone.Oscillator(410, "sine").connect(pannerR);

    oscL.volume.value = -15;
    oscR.volume.value = -15;

    oscL.start();
    oscR.start();

    osc = { stop: () => { oscL.stop(); oscR.stop(); oscL.dispose(); oscR.dispose(); } };
};

const stopAudio = () => {
    if (osc) {
        osc.stop();
        osc = null;
    }
};

watch(() => props.isOpen, (newVal) => {
    if (newVal) {
        step.value = 1;
        startAudio();
        startTimer(20, () => {
            stopAudio();
            step.value = 2;
            startTimer(15, () => { // Breathing phase auto-advance or manual? Let's make it manual for breathing usually, but here auto for flow
                // Actually breathing usually requires user interaction or just visual guide. 
                // Let's keep it auto for 15s demo
                step.value = 3;
            });
        });
    } else {
        stopAudio();
        clearInterval(interval);
    }
});

const nextStep = () => {
    step.value++;
};

const complete = () => {
    emit('complete', { rating: finalRating.value });
    emit('close');
};

const close = () => {
    stopAudio();
    clearInterval(interval);
    emit('close');
};

onUnmounted(() => {
    stopAudio();
    clearInterval(interval);
});
</script>

