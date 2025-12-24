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
    'rgba(99,102,241,1)', // Indigo
    'rgba(6,182,212,1)',  // Cyan
    'rgba(16,185,129,1)', // Emerald
];

class Particle {
    constructor(w, h) {
        this.homeX = Math.random() * w;
        this.homeY = Math.random() * h;
        this.x = this.homeX;
        this.y = this.homeY;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.ax = 0;
        this.ay = 0;
        this.size = Math.random() * 2 + 1.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update(w, h) {
        // Spring back to home
        const k = 0.005; // home spring
        this.ax += (this.homeX - this.x) * k;
        this.ay += (this.homeY - this.y) * k;

        // Cursor attraction
        if (mouse.x !== null && mouse.y !== null) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const radius = 250;
            if (dist < radius) {
                const force = (1 - dist / radius) * 0.05;
                this.ax += dx * force;
                this.ay += dy * force;
            }
        }

        // Update velocity & position with damping
        this.vx += this.ax;
        this.vy += this.ay;
        this.vx *= 0.9; // damping
        this.vy *= 0.9;
        this.x += this.vx;
        this.y += this.vy;

        // Reset acceleration
        this.ax = 0;
        this.ay = 0;
    }
}

const init = () => {
    if (!canvas.value) return;
    const w = canvas.value.width;
    const h = canvas.value.height;
    particles = [];
    const count = Math.floor((w * h) / 10000) + 80;
    for (let i = 0; i < count; i++) particles.push(new Particle(w, h));
};

const animate = () => {
    if (!canvas.value) return;
    const w = canvas.value.width;
    const h = canvas.value.height;
    ctx.clearRect(0, 0, w, h);

    const connectionRadius = 160;

    particles.forEach(p => {
        p.update(w, h);

        // Draw node with subtle cursor scaling
        let size = p.size;
        if (mouse.x !== null && mouse.y !== null) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 200) size += (1 - dist / 200) * 2;
        }

        ctx.fillStyle = p.color.replace('1)', '0.8)');
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
    });

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < connectionRadius) {
                let alpha = 1 - dist / connectionRadius;

                // fade further from cursor
                if (mouse.x !== null && mouse.y !== null) {
                    const midX = (particles[i].x + particles[j].x) / 2;
                    const midY = (particles[i].y + particles[j].y) / 2;
                    const mdx = midX - mouse.x;
                    const mdy = midY - mouse.y;
                    const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
                    if (mDist > 250) alpha *= 0.2;
                    else alpha *= (1 - mDist / 250);
                }

                ctx.strokeStyle = particles[i].color.replace('1)', `${alpha})`);
                ctx.lineWidth = 0.7;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
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
const handleMouseLeave = () => { mouse.x = null; mouse.y = null; };
const handleResize = () => {
    if (!canvas.value) return;
    const parent = canvas.value.parentElement;
    canvas.value.width = parent.clientWidth;
    canvas.value.height = parent.clientHeight;
    init();
};

onMounted(() => {
    if (!canvas.value) return;
    ctx = canvas.value.getContext('2d');
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    canvas.value.parentElement.addEventListener('mouseleave', handleMouseLeave);
    animate();
});

onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('mousemove', handleMouseMove);
    cancelAnimationFrame(animationId);
});
</script>
