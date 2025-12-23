<template>
    <canvas ref="canvas" class="w-full h-full absolute inset-0 pointer-events-none"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const canvas = ref(null);
let ctx = null;
let animationId = null;
let particles = [];
const mouse = { x: null, y: null };

const colors = [
    'rgba(99, 102, 241, 1)',   // Indigo-500
    'rgba(168, 85, 247, 1)',   // Purple-500
    'rgba(6, 182, 212, 1)',    // Cyan-500
    'rgba(59, 130, 246, 1)',   // Blue-500
];

class Particle {
    constructor(w, h) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 3 + 2; // Bigger nodes
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update(w, h) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
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
    const particleCount = Math.floor((w * h) / 10000) + 70; // More particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(w, h));
    }
};

const animate = () => {
    if (!canvas.value) return;
    const w = canvas.value.width;
    const h = canvas.value.height;
    ctx.clearRect(0, 0, w, h);

    particles.forEach(p => {
        p.update(w, h);
        // Base low-alpha draw for all particles
        ctx.fillStyle = p.color.replace('1)', '0.15)');
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    });

    // Connections logic
    const connectionRadius = 180;
    const mouseRadius = 280;

    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < connectionRadius) {
                // Only draw if near mouse
                if (mouse.x !== null && mouse.y !== null) {
                    const mdx = (particles[i].x + particles[j].x) / 2 - mouse.x;
                    const mdy = (particles[i].y + particles[j].y) / 2 - mouse.y;
                    const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

                    if (mDist < mouseRadius) {
                        // Much higher opacity and thickness for active area
                        const opacity = (1 - dist / connectionRadius) * (1 - mDist / mouseRadius) * 2;
                        const alpha = Math.min(opacity, 0.9);
                        ctx.strokeStyle = particles[i].color.replace('1)', `${alpha})`);
                        ctx.lineWidth = 1.2;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();

                        // Glow particles when connected
                        ctx.fillStyle = particles[i].color.replace('1)', `${Math.min(alpha + 0.3, 1)})`);
                        ctx.beginPath();
                        ctx.arc(particles[i].x, particles[i].y, particles[i].size * 1.5, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
            }
        }
    }

    animationId = requestAnimationFrame(animate);
};

const handleMouseMove = (e) => {
    const rect = canvas.value.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
};

const handleMouseLeave = () => {
    mouse.x = null;
    mouse.y = null;
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
        window.addEventListener('mousemove', handleMouseMove);
        canvas.value.parentElement.addEventListener('mouseleave', handleMouseLeave);
        animate();
    }
});

onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('mousemove', handleMouseMove);
    cancelAnimationFrame(animationId);
});
</script>
