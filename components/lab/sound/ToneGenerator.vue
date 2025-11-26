<template>
    <div class="tone-generator hidden">
        <!-- No UI needed, this is a logic component -->
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, watch, ref } from 'vue';

const props = defineProps({
    frequency: {
        type: Number,
        default: 440
    },
    type: {
        type: String,
        default: 'sine' // sine, square, sawtooth, triangle
    },
    volume: {
        type: Number,
        default: 0.5
    },
    isPlaying: {
        type: Boolean,
        default: false
    },
    binauralBeat: {
        type: Number,
        default: 0 // If > 0, creates a second oscillator with freq + binauralBeat
    }
});

let audioContext = null;
let oscillator1 = null;
let oscillator2 = null;
let gainNode = null;
let merger = null;

const initAudioContext = () => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    if (!audioContext) {
        audioContext = new AudioContext();
    }

    gainNode = audioContext.createGain();
    gainNode.connect(audioContext.destination);
    gainNode.gain.value = props.volume;
};

const startOscillators = () => {
    if (!audioContext) initAudioContext();
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    stopOscillators(); // Ensure clean start

    // Oscillator 1 (Left or Main)
    oscillator1 = audioContext.createOscillator();
    oscillator1.type = props.type;
    oscillator1.frequency.setValueAtTime(props.frequency, audioContext.currentTime);

    if (props.binauralBeat > 0) {
        // Stereo setup for Binaural Beats
        merger = audioContext.createChannelMerger(2);

        // Left Channel
        const panner1 = audioContext.createStereoPanner();
        panner1.pan.value = -1;
        oscillator1.connect(panner1);
        panner1.connect(gainNode);

        // Right Channel (Oscillator 2)
        oscillator2 = audioContext.createOscillator();
        oscillator2.type = props.type;
        oscillator2.frequency.setValueAtTime(props.frequency + props.binauralBeat, audioContext.currentTime);

        const panner2 = audioContext.createStereoPanner();
        panner2.pan.value = 1;
        oscillator2.connect(panner2);
        panner2.connect(gainNode);

        oscillator2.start();
    } else {
        // Mono setup
        oscillator1.connect(gainNode);
    }

    oscillator1.start();
};

const stopOscillators = () => {
    if (oscillator1) {
        try {
            oscillator1.stop();
            oscillator1.disconnect();
        } catch (e) { }
        oscillator1 = null;
    }
    if (oscillator2) {
        try {
            oscillator2.stop();
            oscillator2.disconnect();
        } catch (e) { }
        oscillator2 = null;
    }
};

watch(() => props.isPlaying, (newVal) => {
    if (newVal) {
        startOscillators();
    } else {
        stopOscillators();
    }
});

watch(() => props.frequency, (newVal) => {
    if (oscillator1) {
        oscillator1.frequency.setValueAtTime(newVal, audioContext.currentTime);
    }
    if (oscillator2) {
        oscillator2.frequency.setValueAtTime(newVal + props.binauralBeat, audioContext.currentTime);
    }
});

watch(() => props.volume, (newVal) => {
    if (gainNode) {
        gainNode.gain.setTargetAtTime(newVal, audioContext.currentTime, 0.1);
    }
});

onUnmounted(() => {
    stopOscillators();
    if (audioContext) {
        audioContext.close();
    }
});
</script>
