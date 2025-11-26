<template>
    <canvas ref="canvas" class="w-full h-full absolute inset-0"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const canvas = ref(null);
let ctx = null;
let animationId = null;
let particles = [];
let connections = [];

const props = defineProps({
    color: {
        type: String,
        default: '#06b6d4' // cyan-500
    }
});

class Particle {
    constructor(w, h) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        this.life = Math.random() * 100 + 100;
        this.maxLife = this.life;
    }

    update(w, h) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;

        this.life--;
    }

    draw(ctx) {
        const opacity = this.life / this.maxLife;
        // Darker color for light mode visibility if needed, but cyan is usually okay. 
        // Let's make it slightly more opaque.
        ctx.fillStyle = `rgba(6, 182, 212, ${opacity * 0.8})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

const init = () => {
    if (!canvas.value) return;
    const w = canvas.value.width;
    const h = canvas.value.height;

    particles = [];
    for (let i = 0; i < 80; i++) { // Increased particle count
        particles.push(new Particle(w, h));
    }
};

const animate = () => {
    if (!canvas.value) return;
    const w = canvas.value.width;
    const h = canvas.value.height;

    ctx.clearRect(0, 0, w, h);

    // Update and draw particles
    particles.forEach((p, index) => {
        p.update(w, h);
        if (p.life <= 0) {
            particles[index] = new Particle(w, h);
        }
        p.draw(ctx);
    });

    // Draw connections (synapses)
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 120) { // Increased connection distance
                const opacity = (1 - dist / 120) * 0.4; // Increased opacity
                ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`;
                ctx.lineWidth = 1.5; // Thicker lines
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();

                // Random "spark" traveling along the connection
                if (Math.random() < 0.01) { // More sparks
                    ctx.fillStyle = '#0ea5e9'; // Sky blue for sparks, visible on white
                    ctx.beginPath();
                    const t = Math.random();
                    const sx = particles[i].x + (particles[j].x - particles[i].x) * t;
                    const sy = particles[i].y + (particles[j].y - particles[i].y) * t;
                    ctx.arc(sx, sy, 3, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }
    }

    animationId = requestAnimationFrame(animate);
};

const handleResize = () => {
    if (canvas.value) {
        const parent = canvas.value.parentElement;
        canvas.value.width = parent.clientWidth;
        canvas.value.height = parent.clientHeight;
        init();
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
