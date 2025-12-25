<template>
  <div class="relative w-full h-full overflow-hidden rounded-2xl">
    <canvas ref="canvas" class="w-full h-full absolute inset-0"></canvas>
    <!-- Overlay gradient for better text readability if needed -->
    <div class="absolute inset-0 bg-gradient-to-b from-slate-950/20 to-slate-950/60 pointer-events-none"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  isActive: {
    type: Boolean,
    default: false
  },
  intensity: {
    type: Number,
    default: 0.5
  }
});

const canvas = ref(null);
let ctx = null;
let animationFrame = null;
let time = 0;
let width = 0;
let height = 0;
let currentEffect = null;

// --- Effect Classes ---

// 1. Mandala Effect (Original - slightly refined)
class MandalaEffect {
  constructor() {
    this.particles = [];
    this.init();
  }

  init() {
    this.particles = [];
    const layers = 6; // Reduced layers for clarity
    const particlesPerLayer = 16;
    
    for (let i = 0; i < layers; i++) {
      const radius = 30 + i * 35;
      const speed = (i % 2 === 0 ? 1 : -1) * (0.5 + Math.random() * 0.5);
      const size = 1.5 + Math.random() * 2;
      const hue = 170 + i * 10 + Math.random() * 20; 
      const color = `hsla(${hue}, 80%, 70%, 0.8)`; // Brighter
      
      for (let j = 0; j < particlesPerLayer; j++) {
        const angle = (j / particlesPerLayer) * Math.PI * 2;
        this.particles.push({
          angle,
          radius,
          baseRadius: radius,
          speed,
          size,
          color,
          oscillationOffset: Math.random() * Math.PI * 2
        });
      }
    }
  }

  draw(ctx, width, height, time) {
    const centerX = width / 2;
    const centerY = height / 2;

    // Draw connecting lines
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = 'rgba(45, 212, 191, 0.15)';

    this.particles.forEach(p => {
      // Update
      const breath = Math.sin(time * 0.8) * 15; // Faster breath
      p.radius = p.baseRadius + breath + Math.sin(time * 2 + p.oscillationOffset) * 8;
      p.angle += p.speed * 0.005; // Faster rotation

      // Draw
      const x = centerX + Math.cos(p.angle) * p.radius;
      const y = centerY + Math.sin(p.angle) * p.radius;
      
      ctx.beginPath();
      ctx.arc(x, y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = p.color;
      ctx.fill();
      ctx.shadowBlur = 0;
    });
  }
}

// 2. Gentle Waves Effect (Fixed & Improved)
class WaveEffect {
  constructor() {
    this.waves = [];
    this.init();
  }

  init() {
    this.waves = [];
    const count = 6;
    for (let i = 0; i < count; i++) {
      this.waves.push({
        y: (Math.random() - 0.5) * 50, // Vertical offset
        amplitude: 30 + Math.random() * 40,
        frequency: 0.005 + Math.random() * 0.005,
        speed: 0.05 + Math.random() * 0.05, // Increased speed
        offset: Math.random() * Math.PI * 2,
        color: `hsla(${180 + i * 15}, 70%, 60%, 0.2)`
      });
    }
  }

  draw(ctx, width, height, time) {
    const centerY = height / 2;
    
    // Use composite operation for glowing overlap
    ctx.globalCompositeOperation = 'screen';

    this.waves.forEach((wave, i) => {
      ctx.beginPath();
      ctx.moveTo(0, height); // Start from bottom corners to fill
      
      for (let x = 0; x <= width; x += 10) {
        // Complex wave equation
        const y = centerY + wave.y +
                  Math.sin(x * wave.frequency + time * wave.speed * 20 + wave.offset) * wave.amplitude +
                  Math.sin(x * wave.frequency * 2 + time * wave.speed * 15) * (wave.amplitude * 0.5);
        ctx.lineTo(x, y);
      }
      
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      
      // Gradient fill
      const gradient = ctx.createLinearGradient(0, centerY - 100, 0, height);
      gradient.addColorStop(0, wave.color);
      gradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = gradient;
      ctx.fill();
    });
    
    ctx.globalCompositeOperation = 'source-over';
  }
}

// 3. Ethereal Orbs (Replaces Ripples)
class OrbEffect {
  constructor() {
    this.orbs = [];
    this.init();
  }

  init() {
    const count = 15;
    for (let i = 0; i < count; i++) {
      this.orbs.push({
        x: Math.random(), // Normalized 0-1
        y: Math.random(),
        radius: 20 + Math.random() * 60,
        vx: (Math.random() - 0.5) * 0.002,
        vy: (Math.random() - 0.5) * 0.002,
        hue: 160 + Math.random() * 60, // Teal to Purple
        pulseSpeed: 0.02 + Math.random() * 0.03,
        pulseOffset: Math.random() * Math.PI * 2
      });
    }
  }

  draw(ctx, width, height, time) {
    ctx.globalCompositeOperation = 'screen'; // Blending for glow

    this.orbs.forEach(orb => {
      // Move
      orb.x += orb.vx;
      orb.y += orb.vy;
      
      // Wrap around
      if (orb.x < -0.2) orb.x = 1.2;
      if (orb.x > 1.2) orb.x = -0.2;
      if (orb.y < -0.2) orb.y = 1.2;
      if (orb.y > 1.2) orb.y = -0.2;

      const x = orb.x * width;
      const y = orb.y * height;
      
      // Pulse
      const currentRadius = orb.radius + Math.sin(time * 2 + orb.pulseOffset) * 10;
      
      // Draw soft glow
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, currentRadius);
      gradient.addColorStop(0, `hsla(${orb.hue}, 80%, 70%, 0.4)`);
      gradient.addColorStop(0.5, `hsla(${orb.hue}, 80%, 70%, 0.1)`);
      gradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, currentRadius, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.globalCompositeOperation = 'source-over';
  }
}

// --- Main Logic ---

const resize = () => {
  if (!canvas.value) return;
  const parent = canvas.value.parentElement;
  width = parent.clientWidth;
  height = parent.clientHeight;
  
  const dpr = window.devicePixelRatio || 1;
  canvas.value.width = width * dpr;
  canvas.value.height = height * dpr;
  ctx.scale(dpr, dpr);
};

const animate = () => {
  if (!ctx) return;

  ctx.clearRect(0, 0, width, height);

  // Update time
  if (props.isActive) {
    time += 0.01 + (props.intensity * 0.01);
  } else {
    time += 0.002;
  }

  if (currentEffect) {
    currentEffect.draw(ctx, width, height, time);
  }

  animationFrame = requestAnimationFrame(animate);
};

onMounted(() => {
  if (canvas.value) {
    ctx = canvas.value.getContext('2d');
    resize();
    window.addEventListener('resize', resize);
    
    // Randomly select effect
    const effects = [MandalaEffect, WaveEffect, OrbEffect];
    const RandomEffect = effects[Math.floor(Math.random() * effects.length)];
    currentEffect = new RandomEffect();
    console.log("✨ Selected meditation visual:", RandomEffect.name);
    
    animate();
  }
});

onUnmounted(() => {
  window.removeEventListener('resize', resize);
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
  }
});
</script>

<style scoped>
canvas {
  filter: blur(1px); /* Increased blur for dreamier look */
}
</style>
