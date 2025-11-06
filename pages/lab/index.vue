<!-- pages/lab/index.vue -->
<template>
  <div class="min-h-[80vh] flex items-center justify-center">
    <div class="text-center max-w-3xl mx-auto px-6">
      <!-- Main Petri Dish Icon -->
      <div class="mb-8 relative">
        <div
          class="petri-dish w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 flex items-center justify-center relative overflow-hidden mx-auto mb-8 cursor-pointer group"
          @mouseenter="activateLab"
          @mouseleave="deactivateLab"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 transition-opacity duration-300"
            :class="{ 'opacity-50': isActive }"
          ></div>
          <i
            class="fas fa-flask text-white text-4xl relative z-10 transition-transform duration-300"
            :class="{ 'scale-110 rotate-12': isActive }"
          ></i>
          <div
            v-if="isActive"
            class="absolute inset-0 border-2 border-cyan-400/50 rounded-full animate-ping"
          ></div>
        </div>

        <!-- Floating Particles -->
        <div v-if="isActive" class="absolute inset-0 pointer-events-none">
          <div
            v-for="i in 6"
            :key="i"
            class="particle absolute w-2 h-2 bg-cyan-400 rounded-full animate-float-particle"
            :style="getParticleStyle(i)"
          ></div>
        </div>
      </div>

      <!-- Welcome Text -->
      <h1
        class="text-5xl md:text-6xl font-bold text-white font-montserrat mb-6 transition-all duration-300"
        :class="{ 'scale-105': isActive }"
      >
        Добро пожаловать в<br />
        <span
          class="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent"
        >
          Mind Q Lab
        </span>
      </h1>

      <p
        class="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-4 leading-relaxed"
      >
        Экспериментальный интерфейс для когнитивных исследований и личностного
        развития
      </p>

      <p class="text-slate-400 text-sm md:text-base mb-10">
        Исследуйте свой разум, отслеживайте прогресс и развивайтесь вместе с
        сообществом
      </p>

      <!-- CTA Buttons -->
      <div class="space-y-4">
        <NuxtLink
          to="/lab/dashboard"
          class="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-700 rounded-xl text-white font-medium transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 group"
        >
          <i class="fas fa-play text-sm"></i>
          <span>Войти в лабораторию</span>
          <i
            class="fas fa-arrow-right text-sm group-hover:translate-x-1 transition-transform"
          ></i>
        </NuxtLink>

        <div class="flex items-center justify-center space-x-6 text-sm">
          <NuxtLink
            to="/"
            class="text-slate-400 hover:text-cyan-400 transition-colors flex items-center space-x-2"
          >
            <i class="fas fa-arrow-left text-xs"></i>
            <span>Вернуться на главную</span>
          </NuxtLink>
          <span class="text-slate-600">|</span>
          <button
            @click="showInfo = !showInfo"
            class="text-slate-400 hover:text-cyan-400 transition-colors flex items-center space-x-2"
          >
            <i class="fas fa-info-circle text-xs"></i>
            <span>О лаборатории</span>
          </button>
        </div>
      </div>

      <!-- Info Panel -->
      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-4"
      >
        <div
          v-if="showInfo"
          class="mt-8 p-6 rounded-xl bg-slate-800/50 border border-cyan-500/20 backdrop-blur-sm"
        >
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div class="space-y-2">
              <div class="flex items-center space-x-2 text-cyan-400 mb-2">
                <i class="fas fa-brain-circuit"></i>
                <h3 class="font-semibold">Нейро Анализ</h3>
              </div>
              <p class="text-slate-400 text-sm">
                Профилирование личности и когнитивное картирование
              </p>
            </div>
            <div class="space-y-2">
              <div class="flex items-center space-x-2 text-purple-400 mb-2">
                <i class="fas fa-atom"></i>
                <h3 class="font-semibold">Эксперименты</h3>
              </div>
              <p class="text-slate-400 text-sm">
                Психологические тесты и инструменты саморазвития
              </p>
            </div>
            <div class="space-y-2">
              <div class="flex items-center space-x-2 text-emerald-400 mb-2">
                <i class="fas fa-chart-network"></i>
                <h3 class="font-semibold">Аналитика</h3>
              </div>
              <p class="text-slate-400 text-sm">
                Отслеживание прогресса и визуализация роста
              </p>
            </div>
          </div>
        </div>
      </transition>

      <!-- Stats Bar -->
      <div class="mt-12 pt-8 border-t border-slate-800">
        <div class="grid grid-cols-3 gap-6">
          <div class="text-center">
            <div
              class="text-2xl md:text-3xl font-bold text-cyan-400 mb-1 font-mono"
            >
              {{ animatedStats.researchers }}
            </div>
            <div class="text-slate-500 text-xs md:text-sm">Исследователей</div>
          </div>
          <div class="text-center">
            <div
              class="text-2xl md:text-3xl font-bold text-purple-400 mb-1 font-mono"
            >
              {{ animatedStats.experiments }}
            </div>
            <div class="text-slate-500 text-xs md:text-sm">Экспериментов</div>
          </div>
          <div class="text-center">
            <div
              class="text-2xl md:text-3xl font-bold text-emerald-400 mb-1 font-mono"
            >
              {{ animatedStats.insights }}
            </div>
            <div class="text-slate-500 text-xs md:text-sm">Инсайтов</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";

definePageMeta({
  layout: "laboratory",
});

const isActive = ref(false);
const showInfo = ref(false);

const animatedStats = reactive({
  researchers: 0,
  experiments: 0,
  insights: 0,
});

const targetStats = {
  researchers: 247,
  experiments: 42,
  insights: 1893,
};

const activateLab = () => {
  isActive.value = true;
};

const deactivateLab = () => {
  isActive.value = false;
};

const getParticleStyle = (index) => {
  const angles = [0, 60, 120, 180, 240, 300];
  const angle = angles[index - 1];
  const distance = 80;
  const x = Math.cos((angle * Math.PI) / 180) * distance;
  const y = Math.sin((angle * Math.PI) / 180) * distance;

  return {
    left: `calc(50% + ${x}px)`,
    top: `calc(50% + ${y}px)`,
    animationDelay: `${index * 0.1}s`,
  };
};

const animateStats = () => {
  const duration = 2000;
  const steps = 60;
  const interval = duration / steps;

  let currentStep = 0;

  const timer = setInterval(() => {
    currentStep++;
    const progress = currentStep / steps;

    animatedStats.researchers = Math.floor(targetStats.researchers * progress);
    animatedStats.experiments = Math.floor(targetStats.experiments * progress);
    animatedStats.insights = Math.floor(targetStats.insights * progress);

    if (currentStep >= steps) {
      animatedStats.researchers = targetStats.researchers;
      animatedStats.experiments = targetStats.experiments;
      animatedStats.insights = targetStats.insights;
      clearInterval(timer);
    }
  }, interval);
};

onMounted(() => {
  setTimeout(animateStats, 500);
});
</script>

<style scoped>
@keyframes float-particle {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1.5);
  }
}

.animate-float-particle {
  animation: float-particle 2s ease-out infinite;
}
</style>
