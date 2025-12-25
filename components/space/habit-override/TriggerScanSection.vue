<template>
    <div
        class="trigger-scan-section bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-800">
        <h3 class="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center">
            <span
                class="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mr-3 text-sm">1</span>
            Сканирование Триггеров
        </h3>

        <div v-if="!isComplete" class="scan-flow">
            <div class="progress-bar w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full mb-6 overflow-hidden">
                <div class="h-full bg-cyan-500 transition-all duration-500 ease-out"
                    :style="{ width: `${(currentStep / triggers.length) * 100}%` }"></div>
            </div>

            <div class="trigger-card min-h-[300px] flex flex-col justify-center items-center text-center">
                <div class="icon text-4xl mb-4">{{ currentTrigger.icon }}</div>
                <h4 class="text-2xl font-bold text-slate-800 dark:text-white mb-2">{{ currentTrigger.name }}</h4>
                <p class="text-slate-600 dark:text-slate-400 mb-8 max-w-md">{{ currentTrigger.scenario }}</p>

                <!-- Audio Player -->
                <div class="audio-control mb-8">
                    <button @click="toggleAudio"
                        class="flex items-center space-x-3 px-4 py-2 rounded-full transition-all"
                        :class="isPlaying ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'">
                        <div class="w-8 h-8 rounded-full flex items-center justify-center bg-white/20">
                            <i :class="['fas', isPlaying ? 'fa-stop' : 'fa-play', 'text-xs']"></i>
                        </div>
                        <span class="text-sm font-medium">{{ isPlaying ? 'Остановить Звук' : 'Слушать Контекст'
                            }}</span>
                    </button>
                </div>

                <div class="rating-area w-full max-w-xs">
                    <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Интенсивность тяги: {{ currentRating }}/5
                    </label>
                    <input type="range" min="1" max="5" step="1" v-model.number="currentRating"
                        class="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500">
                    <div class="flex justify-between text-xs text-slate-400 mt-1">
                        <span>Нет</span>
                        <span>Сильная</span>
                    </div>
                </div>

                <button @click="nextStep"
                    class="mt-8 px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-medium transition-colors shadow-lg shadow-cyan-500/20">
                    {{ isLastStep ? 'Завершить' : 'Далее' }}
                </button>
            </div>
        </div>

        <div v-else class="results-view">
            <div class="text-center mb-6">
                <div class="inline-block p-3 rounded-full bg-emerald-500/10 text-emerald-500 mb-3">
                    <i class="fas fa-check text-xl"></i>
                </div>
                <h4 class="text-lg font-bold text-white">Сканирование Завершено</h4>
                <p class="text-slate-400 text-sm">Ваш профиль триггеров</p>
            </div>

            <div class="chart-container relative h-64 w-full mb-6">
                <canvas ref="radarChartEl"></canvas>
            </div>

            <div class="actions flex justify-center">
                <button @click="resetScan"
                    class="px-4 py-2 text-sm text-slate-500 hover:text-slate-300 transition-colors">
                    Пройти заново
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, onUnmounted } from 'vue';
import { Chart, registerables } from 'chart.js';
import * as Tone from 'tone';

Chart.register(...registerables);

const emit = defineEmits(['save']);

const triggers = [
    { id: 'stress', name: 'Стресс', icon: '⚡', scenario: 'Вы чувствуете давление дедлайна или личный конфликт.' },
    { id: 'boredom', name: 'Скука', icon: '🥱', scenario: 'Вам нечем заняться и вы чувствуете потребность в стимуляции.' },
    { id: 'emotional', name: 'Эмоции', icon: '😢', scenario: 'Вам грустно, одиноко или тревожно.' },
    { id: 'wait', name: 'Ожидание', icon: '⏳', scenario: 'Вы ждете чего-то (транспорт, загрузка) и теряете терпение.' },
    { id: 'social', name: 'Социум', icon: '👥', scenario: 'Вы находитесь в компании, где другие предаются этой привычке.' },
];

const currentStep = ref(0);
const ratings = ref({});
const currentRating = ref(1);
const isComplete = ref(false);
const radarChartEl = ref(null);
const isPlaying = ref(false);
let chartInstance = null;

// Audio Nodes
let noise = null;
let filter = null;
let lfo = null;
let osc = null;

const currentTrigger = computed(() => triggers[currentStep.value]);
const isLastStep = computed(() => currentStep.value === triggers.length - 1);

const stopAudio = () => {
    if (noise) { noise.stop(); noise.dispose(); noise = null; }
    if (osc) { osc.stop(); osc.dispose(); osc = null; }
    if (lfo) { lfo.stop(); lfo.dispose(); lfo = null; }
    if (filter) { filter.dispose(); filter = null; }
    isPlaying.value = false;
};

const toggleAudio = async () => {
    if (isPlaying.value) {
        stopAudio();
        return;
    }

    await Tone.start();
    isPlaying.value = true;

    const type = currentTrigger.value.id;

    if (type === 'stress') {
        // High pitched chaotic noise (simulating tinnitus/pressure)
        osc = new Tone.Oscillator(8000, "sine").toDestination();
        lfo = new Tone.LFO(10, 7800, 8200).start();
        lfo.connect(osc.frequency);
        osc.volume.value = -20;
        osc.start();
    } else if (type === 'boredom') {
        // Low drone, very static
        osc = new Tone.Oscillator(60, "sine").toDestination();
        osc.volume.value = -15;
        osc.start();
    } else if (type === 'emotional') {
        // Melancholic minor chord pad
        const synth = new Tone.PolySynth(Tone.Synth).toDestination();
        synth.volume.value = -15;
        synth.triggerAttack(["C3", "Eb3", "G3"]);
        // We need to keep reference to stop it
        osc = { stop: () => synth.releaseAll(), dispose: () => synth.dispose() };
    } else if (type === 'wait') {
        // Ticking clock
        const membrane = new Tone.MembraneSynth().toDestination();
        membrane.volume.value = -10;
        const loop = new Tone.Loop(time => {
            membrane.triggerAttackRelease("C2", "32n", time);
        }, "1n").start(0);
        Tone.Transport.start();
        osc = { stop: () => { loop.stop(); Tone.Transport.stop(); }, dispose: () => { loop.dispose(); membrane.dispose(); } };
    } else if (type === 'social') {
        // Pink noise (crowd-like texture)
        noise = new Tone.Noise("pink").start();
        filter = new Tone.AutoFilter(0.5).toDestination().start();
        noise.connect(filter);
        noise.volume.value = -15;
    }
};

const nextStep = () => {
    stopAudio();
    ratings.value[currentTrigger.value.id] = currentRating.value;

    if (isLastStep.value) {
        finishScan();
    } else {
        currentStep.value++;
        currentRating.value = 1; // Reset for next
    }
};

const finishScan = async () => {
    isComplete.value = true;
    emit('save', ratings.value);
    await nextTick();
    renderChart();
};

const resetScan = () => {
    isComplete.value = false;
    currentStep.value = 0;
    currentRating.value = 1;
    ratings.value = {};
};

const renderChart = () => {
    if (!radarChartEl.value) return;

    const ctx = radarChartEl.value.getContext('2d');

    // Destroy previous if exists (though we v-if the container, good practice)
    if (chartInstance) chartInstance.destroy();

    const dataValues = triggers.map(t => ratings.value[t.id] || 0);
    const labels = triggers.map(t => t.name);

    chartInstance = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Интенсивность',
                data: dataValues,
                backgroundColor: 'rgba(6, 182, 212, 0.2)', // cyan-500/20
                borderColor: '#06b6d4', // cyan-500
                pointBackgroundColor: '#06b6d4',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#06b6d4'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: {
                        color: 'rgba(148, 163, 184, 0.1)'
                    },
                    grid: {
                        color: 'rgba(148, 163, 184, 0.1)'
                    },
                    pointLabels: {
                        color: '#94a3b8',
                        font: {
                            size: 12
                        }
                    },
                    ticks: {
                        backdropColor: 'transparent',
                        color: 'transparent', // Hide numbers
                        stepSize: 1,
                        max: 5,
                        min: 0
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
};
</script>

