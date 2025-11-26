<template>
    <canvas ref="canvas" class="w-full h-full rounded-xl bg-slate-900"></canvas>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';

const props = defineProps({
    isActive: {
        type: Boolean,
        default: false
    },
    mode: {
        type: String,
        default: 'waveform' // waveform, frequency, circle
    },
    color: {
        type: String,
        default: '#06b6d4' // cyan-500
    },
    speed: {
        type: Number,
        default: 1.0
    }
});

const canvas = ref(null);
let ctx = null;
let animationId = null;
let time = 0;

const drawWaveform = (width, height) => {
    ctx.beginPath();
    ctx.moveTo(0, height / 2);

    for (let i = 0; i < width; i++) {
        const amplitude = props.isActive ? 30 : 2;
        const frequency = 0.02;
        const y = height / 2 +
            Math.sin(i * frequency + time * props.speed) * amplitude * Math.sin(i * 0.01) +
            Math.sin(i * 0.05 + time * props.speed * 1.5) * (amplitude * 0.5);
        ctx.lineTo(i, y);
    }

    ctx.strokeStyle = props.color;
    ctx.lineWidth = 2;
    ctx.stroke();
};

const drawFrequency = (width, height) => {
    const barWidth = 10;
    const gap = 4;
    const count = Math.floor(width / (barWidth + gap));

    for (let i = 0; i < count; i++) {
        const x = i * (barWidth + gap);
        // Simulating frequency data
        const noise = Math.random() * 0.2;
        const signal = Math.sin(i * 0.2 + time * props.speed) * 0.5 + 0.5;
        const heightScale = props.isActive ? 0.8 : 0.1;
        const barHeight = (signal + noise) * height * heightScale;

        const y = height - barHeight;

        ctx.fillStyle = props.color;
        ctx.fillRect(x, y, barWidth, barHeight);
    }
};

const drawCircle = (width, height) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 4;

    ctx.beginPath();
    for (let i = 0; i <= 360; i++) {
        const angle = (i * Math.PI) / 180;
        const noise = props.isActive ? Math.sin(i * 10 + time * 5) * 10 : 0;
        const pulse = props.isActive ? Math.sin(time * props.speed) * 20 : 0;
        const r = radius + noise + pulse;

        const x = centerX + r * Math.cos(angle);
        const y = centerY + r * Math.sin(angle);

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = props.color;
    ctx.lineWidth = 3;
    ctx.stroke();

    // Inner glow
    if (props.isActive) {
        ctx.fillStyle = props.color + '33'; // Low opacity
        ctx.fill();
    }
};

const animate = () => {
    if (!canvas.value) return;

    const width = canvas.value.width;
    const height = canvas.value.height;

    ctx.clearRect(0, 0, width, height);

    if (props.mode === 'waveform') drawWaveform(width, height);
    else if (props.mode === 'frequency') drawFrequency(width, height);
    else if (props.mode === 'circle') drawCircle(width, height);

    time += 0.05;
    animationId = requestAnimationFrame(animate);
};

const handleResize = () => {
    if (canvas.value) {
        const parent = canvas.value.parentElement;
        canvas.value.width = parent.clientWidth;
        canvas.value.height = parent.clientHeight;
    }
};

onMounted(() => {
    if (canvas.value) {
        ctx = canvas.value.getContext('2d');
        handleResize();
        window.addEventListener('resize', handleResize);
        animate();
    }
});

onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
    cancelAnimationFrame(animationId);
});
</script>
