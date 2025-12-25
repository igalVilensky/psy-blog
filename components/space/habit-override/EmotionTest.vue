<template>
    <div
        class="emotion-test-section bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-800">
        <h3 class="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center">
            <span
                class="w-8 h-8 rounded-full bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center mr-3 text-sm">2</span>
            Тест Эмоционального Отклика
        </h3>
        <p class="text-slate-600 dark:text-slate-400 mb-6 text-sm">
            Послушайте звук и оцените интенсивность эмоции и желание действовать.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="(emotion, index) in emotions" :key="emotion.id"
                class="emotion-card p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 transition-all hover:border-purple-500/30">
                <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center space-x-3">
                        <span class="text-2xl">{{ emotion.icon }}</span>
                        <span class="font-medium text-slate-700 dark:text-slate-200">{{ emotion.name }}</span>
                    </div>
                    <button @click="togglePlay(index)"
                        class="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                        :class="playingIndex === index ? 'bg-purple-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500 hover:bg-purple-500/20 hover:text-purple-500'">
                        <i :class="playingIndex === index ? 'fas fa-stop' : 'fas fa-play'" class="text-xs"></i>
                    </button>
                </div>

                <div class="space-y-3">
                    <div>
                        <div class="flex justify-between text-xs text-slate-500 mb-1">
                            <span>Интенсивность эмоции</span>
                            <span>{{ emotion.emotionRating }}/5</span>
                        </div>
                        <input type="range" min="0" max="5" v-model.number="emotion.emotionRating"
                            class="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500">
                    </div>
                    <div>
                        <div class="flex justify-between text-xs text-slate-500 mb-1">
                            <span>Тяга к действию</span>
                            <span>{{ emotion.urgeRating }}/5</span>
                        </div>
                        <input type="range" min="0" max="5" v-model.number="emotion.urgeRating"
                            class="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-red-500">
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-6 flex justify-end">
            <button @click="saveResults"
                class="px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-colors text-sm shadow-lg shadow-purple-500/20">
                Сохранить Результаты
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['save']);

const emotions = ref([
    { id: 'anxiety', name: 'Тревога', icon: '😰', emotionRating: 0, urgeRating: 0 },
    { id: 'sadness', name: 'Грусть', icon: '🌧️', emotionRating: 0, urgeRating: 0 },
    { id: 'excitement', name: 'Возбуждение', icon: '🤩', emotionRating: 0, urgeRating: 0 },
    { id: 'anger', name: 'Гнев', icon: '😡', emotionRating: 0, urgeRating: 0 },
]);

const playingIndex = ref(-1);
let audioCtx = null;
let oscillator = null;
let gainNode = null;

const togglePlay = (index) => {
    if (playingIndex.value === index) {
        stopSound();
    } else {
        if (playingIndex.value !== -1) stopSound();
        playSound(index);
    }
};

const playSound = (index) => {
    playingIndex.value = index;

    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    // Resume context if suspended (browser policy)
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    oscillator = audioCtx.createOscillator();
    gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    // Improved sound design for emotions
    const now = audioCtx.currentTime;

    if (index === 0) { // Anxiety: Dissonant, fast pulsing
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(300, now);
        oscillator.frequency.linearRampToValueAtTime(310, now + 0.1);
        // Tremolo effect manually
        gainNode.gain.setValueAtTime(0.05, now);
    } else if (index === 1) { // Sadness: Low, slow sine
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(150, now);
        oscillator.frequency.exponentialRampToValueAtTime(100, now + 2);
        gainNode.gain.setValueAtTime(0.1, now);
    } else if (index === 2) { // Excitement: High, rising
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(400, now);
        oscillator.frequency.linearRampToValueAtTime(600, now + 0.5);
        gainNode.gain.setValueAtTime(0.08, now);
    } else { // Anger: Low square, harsh
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(80, now);
        gainNode.gain.setValueAtTime(0.05, now);
    }

    oscillator.start();

    // Auto stop after 3s
    setTimeout(() => {
        if (playingIndex.value === index) stopSound();
    }, 3000);
};

const stopSound = () => {
    if (oscillator) {
        try {
            // Fade out to avoid click
            if (gainNode) {
                gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
            }
            setTimeout(() => {
                oscillator.stop();
                oscillator = null;
            }, 100);
        } catch (e) { }
    }
    playingIndex.value = -1;
};

const saveResults = () => {
    const results = emotions.value.map(e => ({
        id: e.id,
        emotionRating: e.emotionRating,
        urgeRating: e.urgeRating
    }));
    emit('save', results);
};
</script>

