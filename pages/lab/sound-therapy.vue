<template>
    <div class="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 pb-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
            <Breadcrumbs />

            <!-- HERO SECTION -->
            <div class="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-8 md:p-12">
                <div class="absolute inset-0 z-0 opacity-30">
                    <AudioVisualizer :isActive="true" mode="waveform" color="#6366f1" :speed="0.5" />
                </div>
                <div class="relative z-10 max-w-2xl">
                    <h1 class="text-4xl md:text-6xl font-bold mb-4 font-montserrat tracking-tight">
                        Sound Therapy Lab
                    </h1>
                    <p class="text-lg md:text-xl text-slate-300 mb-8">
                        Исследуйте влияние звука на ваш фокус, эмоции и когнитивное состояние.
                        Создавайте свои миксы и находите идеальный резонанс.
                    </p>
                    <div class="flex flex-wrap gap-4">
                        <button @click="scrollTo('diagnostic')" class="btn-primary">
                            <i class="fas fa-stethoscope mr-2"></i>
                            Начать диагностику
                        </button>
                        <button @click="scrollTo('mixer')"
                            class="btn-secondary bg-white/10 hover:bg-white/20 border-white/20 text-white">
                            <i class="fas fa-sliders-h mr-2"></i>
                            Создать микс
                        </button>
                    </div>
                </div>
            </div>

            <!-- QUICK DIAGNOSTIC -->
            <section id="diagnostic" class="scroll-mt-24">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-2xl font-bold text-slate-900 dark:text-white">
                        <i class="fas fa-heart-pulse text-rose-500 mr-2"></i>
                        Аудио Диагностика
                    </h2>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <!-- Test Area -->
                    <div
                        class="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div v-if="!diagnosticCompleted">
                            <h3 class="text-lg font-semibold mb-4 dark:text-white">Оцените звуки</h3>
                            <div class="space-y-6">
                                <div
                                    class="flex items-center justify-between bg-slate-50 dark:bg-slate-800 p-4 rounded-xl">
                                    <div class="flex items-center gap-4">
                                        <button @click="playDiagnosticSample(currentDiagnosticStep)"
                                            class="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center text-white hover:bg-indigo-600 transition-colors">
                                            <i :class="['fas', isDiagnosticPlaying ? 'fa-pause' : 'fa-play']"></i>
                                        </button>
                                        <div>
                                            <div class="font-medium dark:text-white">Образец {{ currentDiagnosticStep +
                                                1 }}</div>
                                            <div class="text-xs text-slate-500">Прослушайте и оцените</div>
                                        </div>
                                    </div>
                                    <div class="text-sm font-mono text-indigo-500">
                                        {{ diagnosticSamples[currentDiagnosticStep].name }}
                                    </div>
                                </div>

                                <div class="space-y-4">
                                    <div>
                                        <label class="text-sm text-slate-600 dark:text-slate-400 mb-2 block">Успокоение
                                            (1-5)</label>
                                        <div class="flex justify-between gap-2">
                                            <button v-for="n in 5" :key="n" @click="rateSample('calmness', n)"
                                                :class="['flex-1 py-2 rounded-lg border transition-all',
                                                    currentRatings.calmness === n
                                                        ? 'bg-indigo-500 text-white border-indigo-500'
                                                        : 'border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:text-slate-300']">
                                                {{ n }}
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <label class="text-sm text-slate-600 dark:text-slate-400 mb-2 block">Приятность
                                            (1-5)</label>
                                        <div class="flex justify-between gap-2">
                                            <button v-for="n in 5" :key="n" @click="rateSample('pleasantness', n)"
                                                :class="['flex-1 py-2 rounded-lg border transition-all',
                                                    currentRatings.pleasantness === n
                                                        ? 'bg-rose-500 text-white border-rose-500'
                                                        : 'border-slate-200 dark:border-slate-700 hover:border-rose-300 dark:text-slate-300']">
                                                {{ n }}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <button @click="nextDiagnosticStep" :disabled="!canProceedDiagnostic"
                                    class="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed">
                                    {{ currentDiagnosticStep < diagnosticSamples.length - 1 ? 'Следующий образец'
                                        : 'Завершить диагностику' }} </button>
                            </div>
                        </div>

                        <div v-else class="text-center py-8">
                            <div
                                class="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i class="fas fa-check text-2xl text-emerald-600 dark:text-emerald-400"></i>
                            </div>
                            <h3 class="text-xl font-bold dark:text-white mb-2">Диагностика завершена!</h3>
                            <p class="text-slate-600 dark:text-slate-400 mb-6">Ваш звуковой профиль сформирован.</p>
                            <button @click="resetDiagnostic" class="text-indigo-500 hover:text-indigo-600 text-sm">
                                Пройти заново
                            </button>
                        </div>
                    </div>

                    <!-- Results / Radar -->
                    <div
                        class="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center relative overflow-hidden">
                        <div v-if="!diagnosticCompleted"
                            class="absolute inset-0 flex items-center justify-center bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm z-10">
                            <p class="text-slate-500 font-medium">Результаты появятся здесь</p>
                        </div>
                        <canvas ref="radarCanvas" class="max-w-xs max-h-xs w-full"></canvas>
                    </div>
                </div>
            </section>

            <!-- EXPERIMENTS GRID -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">

                <!-- FOCUS EXPERIMENT -->
                <section
                    class="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div class="flex items-center gap-3 mb-6">
                        <div class="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                            <i class="fas fa-bullseye text-amber-600 dark:text-amber-400"></i>
                        </div>
                        <h2 class="text-xl font-bold dark:text-white">Тест Фокуса</h2>
                    </div>

                    <div class="space-y-6">
                        <p class="text-slate-600 dark:text-slate-400 text-sm">
                            Проверьте, как разные звуки влияют на вашу скорость реакции.
                        </p>

                        <div class="flex gap-2 mb-4 overflow-x-auto pb-2">
                            <button v-for="sound in focusSounds" :key="sound.id" @click="selectFocusSound(sound)"
                                :class="['px-4 py-2 rounded-full text-sm whitespace-nowrap border transition-all',
                                    selectedFocusSound?.id === sound.id
                                        ? 'bg-amber-500 text-white border-amber-500'
                                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400']">
                                <i :class="['fas mr-2', sound.icon]"></i>
                                {{ sound.name }}
                            </button>
                        </div>

                        <div
                            class="bg-slate-100 dark:bg-slate-800 rounded-xl p-4 h-64 flex flex-col items-center justify-center relative overflow-hidden">
                            <!-- Mini Reaction Game -->
                            <div v-if="!gameActive" class="text-center z-10">
                                <div class="text-3xl font-bold dark:text-white mb-2">{{ lastReactionScore ?
                                    lastReactionScore + ' мс' : 'Готовы?' }}</div>
                                <button @click="startGame" class="btn-primary bg-amber-500 hover:bg-amber-600">
                                    Старт
                                </button>
                            </div>

                            <div v-else @click="handleGameClick" :class="['absolute inset-0 cursor-pointer flex items-center justify-center transition-colors duration-100',
                                gameState === 'waiting' ? 'bg-slate-200 dark:bg-slate-700' :
                                    gameState === 'react' ? 'bg-emerald-500' : 'bg-red-500']">
                                <span v-if="gameState === 'react'" class="text-white text-4xl font-bold">ЖМИ!</span>
                                <span v-if="gameState === 'early'" class="text-white text-2xl font-bold">РАНО!</span>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- BRAINWAVE EXPLORER -->
                <section
                    class="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div class="flex items-center gap-3 mb-6">
                        <div class="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                            <i class="fas fa-brain text-purple-600 dark:text-purple-400"></i>
                        </div>
                        <h2 class="text-xl font-bold dark:text-white">Генератор Волн</h2>
                    </div>

                    <div class="space-y-6">
                        <div class="flex justify-between gap-2">
                            <button v-for="wave in brainwaves" :key="wave.name" @click="setBrainwave(wave)"
                                :class="['flex-1 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all border',
                                    currentWave.name === wave.name
                                        ? 'bg-purple-500 text-white border-purple-500'
                                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 dark:text-slate-300']">
                                {{ wave.name }}
                            </button>
                        </div>

                        <div class="h-40 bg-slate-900 rounded-xl overflow-hidden relative border border-slate-800">
                            <AudioVisualizer :isActive="isWavePlaying" mode="circle" color="#a855f7"
                                :speed="currentWave.freq / 20" />
                            <div class="absolute bottom-4 left-4 text-white text-xs font-mono">
                                {{ currentWave.freq }} Hz | {{ currentWave.desc }}
                            </div>
                        </div>

                        <div class="flex items-center gap-4">
                            <button @click="toggleWave" :class="['w-14 h-14 rounded-full flex items-center justify-center text-xl transition-all shadow-lg',
                                isWavePlaying
                                    ? 'bg-red-500 text-white hover:bg-red-600'
                                    : 'bg-purple-500 text-white hover:bg-purple-600']">
                                <i :class="['fas', isWavePlaying ? 'fa-stop' : 'fa-play']"></i>
                            </button>
                            <div class="flex-1">
                                <label class="text-xs text-slate-500 mb-1 block">Громкость</label>
                                <input type="range" v-model="waveVolume" min="0" max="100"
                                    class="w-full accent-purple-500">
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <!-- MIX BUILDER -->
            <section id="mixer"
                class="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm scroll-mt-24">
                <div class="flex items-center justify-between mb-8">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                            <i class="fas fa-sliders-h text-cyan-600 dark:text-cyan-400"></i>
                        </div>
                        <h2 class="text-xl font-bold dark:text-white">Конструктор Атмосферы</h2>
                    </div>
                    <button @click="toggleMixer" :class="['px-6 py-2 rounded-full font-medium transition-all flex items-center gap-2',
                        isMixerPlaying
                            ? 'bg-red-500/10 text-red-600 border border-red-500/20'
                            : 'bg-cyan-500/10 text-cyan-600 border border-cyan-500/20']">
                        <i :class="['fas', isMixerPlaying ? 'fa-pause' : 'fa-play']"></i>
                        {{ isMixerPlaying ? 'Пауза' : 'Воспроизвести все' }}
                    </button>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div v-for="track in mixTracks" :key="track.id"
                        class="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700 transition-all hover:border-cyan-500/30">
                        <div class="flex items-center justify-between mb-4">
                            <div class="flex items-center gap-3">
                                <i
                                    :class="['fas text-lg', track.icon, track.active ? 'text-cyan-500' : 'text-slate-400']"></i>
                                <span class="font-medium dark:text-white">{{ track.name }}</span>
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" v-model="track.active" class="sr-only peer">
                                <div
                                    class="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-cyan-500">
                                </div>
                            </label>
                        </div>
                        <input type="range" v-model="track.volume" :disabled="!track.active"
                            class="w-full accent-cyan-500 disabled:opacity-50">
                    </div>
                </div>
            </section>

            <!-- HIDDEN AUDIO COMPONENTS -->
            <SoundPlayer v-if="currentDiagnosticVideo" :key="currentDiagnosticVideo" :videoId="currentDiagnosticVideo"
                :isPlaying="isDiagnosticPlaying" :volume="70" :loop="false" @state-change="onDiagnosticStateChange" />

            <SoundPlayer v-if="selectedFocusSound && selectedFocusSound.videoId" :videoId="selectedFocusSound.videoId"
                :isPlaying="gameActive || focusSoundPlaying" :volume="50" :loop="true" />

            <div v-for="track in mixTracks" :key="'player-' + track.id">
                <SoundPlayer v-if="track.active" :videoId="track.videoId" :isPlaying="isMixerPlaying"
                    :volume="Number(track.volume)" :loop="true" />
            </div>

            <ToneGenerator :isPlaying="isWavePlaying" :frequency="currentWave.freq" :volume="waveVolume / 100"
                :binauralBeat="currentWave.binaural" />

        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue';
import Breadcrumbs from "~/components/ui/Breadcrumbs.vue";
import SoundPlayer from "~/components/lab/sound/SoundPlayer.vue";
import ToneGenerator from "~/components/lab/sound/ToneGenerator.vue";
import AudioVisualizer from "~/components/lab/sound/AudioVisualizer.vue";
import Chart from 'chart.js/auto';

definePageMeta({
    layout: "laboratory",
});

// ===========================
// SCROLL HELPER
// ===========================
const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
};

// ===========================
// DIAGNOSTIC LOGIC
// ===========================
const diagnosticSamples = [
    { name: "Шум дождя", videoId: "mPZkdNFkNps" }, // Rain
    { name: "Тихая река", videoId: "02lqB8QFcq0" }, // River (Relaxing White Noise)
    { name: "Белый шум", videoId: "nMfPqeZjc2c" }, // White Noise
    { name: "Космос", videoId: "gpvznAiKblU" } // Space (Relaxing White Noise)
];

const currentDiagnosticStep = ref(0);
const isDiagnosticPlaying = ref(false);
const diagnosticCompleted = ref(false);
const currentRatings = reactive({ calmness: 0, pleasantness: 0 });
const diagnosticResults = ref([]);
const radarCanvas = ref(null);
let radarChart = null;

const currentDiagnosticVideo = computed(() =>
    diagnosticSamples[currentDiagnosticStep.value]?.videoId
);

const canProceedDiagnostic = computed(() =>
    currentRatings.calmness > 0 && currentRatings.pleasantness > 0
);

const playDiagnosticSample = () => {
    isDiagnosticPlaying.value = !isDiagnosticPlaying.value;
};

const onDiagnosticStateChange = (state) => {
    if (state === 0) isDiagnosticPlaying.value = false; // Ended
};

const rateSample = (type, value) => {
    currentRatings[type] = value;
};

const nextDiagnosticStep = () => {
    // Save result
    diagnosticResults.value.push({
        sample: diagnosticSamples[currentDiagnosticStep.value].name,
        ...currentRatings
    });

    // Reset for next
    isDiagnosticPlaying.value = false;
    currentRatings.calmness = 0;
    currentRatings.pleasantness = 0;

    if (currentDiagnosticStep.value < diagnosticSamples.length - 1) {
        currentDiagnosticStep.value++;
    } else {
        finishDiagnostic();
    }
};

const finishDiagnostic = () => {
    diagnosticCompleted.value = true;
    setTimeout(renderRadarChart, 100);
};

const resetDiagnostic = () => {
    currentDiagnosticStep.value = 0;
    diagnosticCompleted.value = false;
    diagnosticResults.value = [];
};

const renderRadarChart = () => {
    if (!radarCanvas.value) return;

    if (radarChart) radarChart.destroy();

    const labels = diagnosticResults.value.map(r => r.sample);
    const dataCalm = diagnosticResults.value.map(r => r.calmness);
    const dataPleasant = diagnosticResults.value.map(r => r.pleasantness);

    radarChart = new Chart(radarCanvas.value, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Успокоение',
                    data: dataCalm,
                    fill: true,
                    backgroundColor: 'rgba(99, 102, 241, 0.2)',
                    borderColor: 'rgb(99, 102, 241)',
                    pointBackgroundColor: 'rgb(99, 102, 241)',
                },
                {
                    label: 'Приятность',
                    data: dataPleasant,
                    fill: true,
                    backgroundColor: 'rgba(244, 63, 94, 0.2)',
                    borderColor: 'rgb(244, 63, 94)',
                    pointBackgroundColor: 'rgb(244, 63, 94)',
                }
            ]
        },
        options: {
            elements: { line: { borderWidth: 3 } },
            scales: {
                r: {
                    angleLines: { color: 'rgba(128, 128, 128, 0.2)' },
                    grid: { color: 'rgba(128, 128, 128, 0.2)' },
                    pointLabels: {
                        color: document.documentElement.classList.contains('dark') ? '#e2e8f0' : '#475569',
                        font: { size: 12, weight: 'bold' }
                    },
                    suggestedMin: 0,
                    suggestedMax: 5,
                    ticks: {
                        backdropColor: 'transparent',
                        color: document.documentElement.classList.contains('dark') ? '#94a3b8' : '#64748b'
                    }
                }
            }
        }
    });
};

// ===========================
// FOCUS EXPERIMENT LOGIC
// ===========================
const focusSounds = [
    { id: 'silence', name: 'Тишина', icon: 'fa-volume-mute', videoId: null },
    { id: 'white', name: 'Белый шум', icon: 'fa-wind', videoId: 'nMfPqeZjc2c' },
    { id: 'nature', name: 'Река', icon: 'fa-water', videoId: '02lqB8QFcq0' }
];

const selectedFocusSound = ref(focusSounds[0]);
const focusSoundPlaying = ref(false);
const gameActive = ref(false);
const gameState = ref('idle'); // idle, waiting, react, early
const lastReactionScore = ref(null);
let gameTimer = null;
let reactionStart = 0;

const selectFocusSound = (sound) => {
    selectedFocusSound.value = sound;
};

const startGame = () => {
    gameActive.value = true;
    gameState.value = 'waiting';
    focusSoundPlaying.value = true;

    const delay = 2000 + Math.random() * 3000;

    gameTimer = setTimeout(() => {
        if (gameState.value === 'waiting') {
            gameState.value = 'react';
            reactionStart = performance.now();
        }
    }, delay);
};

const handleGameClick = () => {
    if (gameState.value === 'waiting') {
        // Early click
        gameState.value = 'early';
        clearTimeout(gameTimer);
        setTimeout(() => {
            gameActive.value = false;
            focusSoundPlaying.value = false;
        }, 1000);
    } else if (gameState.value === 'react') {
        // Success
        const score = Math.round(performance.now() - reactionStart);
        lastReactionScore.value = score;
        gameActive.value = false;
        focusSoundPlaying.value = false;
    }
};

// ===========================
// BRAINWAVE LOGIC
// ===========================
const brainwaves = [
    { name: 'Delta', freq: 100, binaural: 2, desc: 'Глубокий сон (0.5-4Hz)' },
    { name: 'Theta', freq: 200, binaural: 6, desc: 'Медитация (4-8Hz)' },
    { name: 'Alpha', freq: 300, binaural: 10, desc: 'Расслабление (8-13Hz)' },
    { name: 'Beta', freq: 400, binaural: 20, desc: 'Концентрация (13-30Hz)' }
];

const currentWave = ref(brainwaves[2]); // Alpha default
const isWavePlaying = ref(false);
const waveVolume = ref(50);

const setBrainwave = (wave) => {
    currentWave.value = wave;
};

const toggleWave = () => {
    isWavePlaying.value = !isWavePlaying.value;
};

// ===========================
// MIXER LOGIC
// ===========================
const mixTracks = reactive([
    { id: 1, name: 'Дождь', icon: 'fa-cloud-rain', videoId: 'mPZkdNFkNps', active: false, volume: 50 },
    { id: 2, name: 'Огонь', icon: 'fa-fire', videoId: 'L_LUpnjgPso', active: false, volume: 50 },
    { id: 3, name: 'Река', icon: 'fa-water', videoId: '02lqB8QFcq0', active: false, volume: 50 },
    { id: 4, name: 'Ночь', icon: 'fa-moon', videoId: '4vIQON2fDWM', active: false, volume: 50 }
]);

const isMixerPlaying = ref(false);

const toggleMixer = () => {
    isMixerPlaying.value = !isMixerPlaying.value;
};

// Auto-play mixer when a track is activated
watch(() => mixTracks.map(t => t.active), (newVal, oldVal) => {
    const isAnyActive = newVal.some(v => v);
    const wasAnyActive = oldVal ? oldVal.some(v => v) : false;

    // If we went from no tracks active to some tracks active, start playing
    if (isAnyActive && !isMixerPlaying.value) {
        isMixerPlaying.value = true;
    }

    // Optional: If we turn off all tracks, maybe stop playing?
    // User might want to keep "Playing" state but just silence all, so we'll leave it.
}, { deep: true });

</script>

<style scoped>
.btn-primary {
    @apply px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold transition-all shadow-lg shadow-indigo-500/30 flex items-center justify-center;
}

.btn-secondary {
    @apply px-6 py-3 rounded-xl border font-semibold transition-all flex items-center justify-center;
}
</style>
