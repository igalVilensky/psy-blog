<!-- error.vue -->
<template>
  <div
    class="min-h-screen bg-slate-950 relative overflow-hidden flex items-center justify-center px-4 sm:px-0 pt-12 sm:pt-20"
  >
    <!-- Animated Background -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <!-- Gradient Orbs -->
      <div
        class="absolute top-20 left-20 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-float"
      ></div>
      <div
        class="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-float-delayed"
      ></div>
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl animate-pulse-slow"
      ></div>

      <!-- Neural Network Grid -->
      <svg
        class="absolute inset-0 w-full h-full opacity-[0.015]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="neural-grid"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="50"
              cy="50"
              r="1"
              fill="currentColor"
              class="text-cyan-400"
            />
            <line
              x1="50"
              y1="50"
              x2="150"
              y2="50"
              stroke="currentColor"
              stroke-width="0.5"
              class="text-cyan-400/30"
            />
            <line
              x1="50"
              y1="50"
              x2="50"
              y2="150"
              stroke="currentColor"
              stroke-width="0.5"
              class="text-cyan-400/30"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#neural-grid)" />
      </svg>

      <!-- Floating Particles -->
      <div
        v-for="i in 20"
        :key="i"
        class="particle"
        :style="getParticleStyle(i)"
      ></div>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 max-w-4xl mx-auto text-center">
      <!-- 404 Illustration -->
      <div class="mb-8 sm:mb-12">
        <div class="relative inline-block">
          <!-- Large 404 Number -->
          <div class="error-number mb-6">
            <span
              class="gradient-text text-8xl sm:text-9xl md:text-[12rem] font-black tracking-tighter"
            >
              404
            </span>
          </div>

          <!-- Floating Icons Around 404 -->
          <div class="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div class="floating-icon icon-1">
              <div
                class="icon-wrapper bg-cyan-500/10 border border-cyan-500/30"
              >
                <i class="fas fa-brain text-cyan-400"></i>
              </div>
            </div>
            <div class="floating-icon icon-2">
              <div
                class="icon-wrapper bg-purple-500/10 border border-purple-500/30"
              >
                <i class="fas fa-flask text-purple-400"></i>
              </div>
            </div>
            <div class="floating-icon icon-3">
              <div
                class="icon-wrapper bg-pink-500/10 border border-pink-500/30"
              >
                <i class="fas fa-atom text-pink-400"></i>
              </div>
            </div>
            <div class="floating-icon icon-4">
              <div
                class="icon-wrapper bg-emerald-500/10 border border-emerald-500/30"
              >
                <i class="fas fa-microscope text-emerald-400"></i>
              </div>
            </div>
          </div>
        </div>

        <!-- Glitch Effect Line -->
        <div class="glitch-line mx-auto"></div>
      </div>

      <!-- Error Message -->
      <div class="mb-8 sm:mb-10">
        <h1
          class="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4"
        >
          Страница не найдена
        </h1>
        <p
          class="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed px-4"
        >
          Похоже, эта страница отправилась в параллельное измерение. Но не
          волнуйтесь — наша лаборатория всегда готова помочь вам найти нужный
          путь.
        </p>
      </div>

      <!-- Action Buttons -->
      <div
        class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 px-4"
      >
        <NuxtLink to="/" class="btn-primary w-full sm:w-auto">
          <i class="fas fa-home mr-2"></i>
          Вернуться на главную
        </NuxtLink>
        <NuxtLink to="/lab" class="btn-secondary w-full sm:w-auto">
          <i class="fas fa-flask mr-2"></i>
          Перейти в лабораторию
        </NuxtLink>
      </div>

      <!-- Quick Links -->
      <div class="quick-links-section">
        <h2
          class="text-sm font-mono text-cyan-400 mb-4 uppercase tracking-wider"
        >
          Популярные разделы
        </h2>
        <div
          class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4"
        >
          <NuxtLink
            v-for="link in quickLinks"
            :key="link.path"
            :to="link.path"
            class="quick-link-card group"
          >
            <div class="icon-container" :style="{ background: link.gradient }">
              <i :class="link.icon" class="text-white text-xl"></i>
            </div>
            <span
              class="text-xs sm:text-sm text-slate-300 group-hover:text-white transition-colors duration-300"
            >
              {{ link.label }}
            </span>
          </NuxtLink>
        </div>
      </div>

      <!-- Help Section -->
      <div
        class="mt-12 p-6 rounded-2xl bg-slate-900/50 border border-cyan-500/10 backdrop-blur-sm max-w-2xl mx-auto"
      >
        <div
          class="flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          <div
            class="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center flex-shrink-0"
          >
            <i class="fas fa-question-circle text-cyan-400 text-xl"></i>
          </div>
          <div class="flex-1 text-left">
            <h3 class="text-white font-semibold mb-2">Нужна помощь?</h3>
            <p class="text-sm text-slate-400">
              Если вы считаете, что эта страница должна существовать,
              пожалуйста,
              <NuxtLink
                to="/contact"
                class="text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                свяжитесь с нами </NuxtLink
              >.
            </p>
          </div>
        </div>
      </div>

      <!-- Error Code -->
      <div class="mt-8 text-xs font-mono text-slate-600">
        ERROR_CODE: {{ errorCode }} | TIME: {{ currentTime }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

// Props from Nuxt error
const props = defineProps({
  error: Object,
});

// SEO Meta
useHead({
  title: "404 - Страница не найдена",
  meta: [
    {
      name: "description",
      content:
        "Страница не найдена. Вернитесь на главную страницу или перейдите в лабораторию.",
    },
    { name: "robots", content: "noindex, nofollow" },
  ],
});

// Error code
const errorCode = computed(() => props.error?.statusCode || 404);

// Current time
const currentTime = ref("");

const updateTime = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  currentTime.value = `${hours}:${minutes}:${seconds}`;
};

let timeInterval;
onMounted(() => {
  updateTime();
  timeInterval = setInterval(updateTime, 1000);
});

onUnmounted(() => {
  if (timeInterval) clearInterval(timeInterval);
});

// Quick links
const quickLinks = [
  {
    path: "/lab/games",
    icon: "fas fa-gamepad",
    label: "Игры",
    gradient: "linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)",
  },
  {
    path: "/lab/tests",
    icon: "fas fa-brain",
    label: "Тесты",
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
  },
  {
    path: "/lab/experiments",
    icon: "fas fa-flask",
    label: "Эксперименты",
    gradient: "linear-gradient(135deg, #10b981 0%, #06b6d4 100%)",
  },
  {
    path: "/lab/analysis",
    icon: "fas fa-chart-line",
    label: "Анализ",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
  },
  {
    path: "/lab/community",
    icon: "fas fa-users",
    label: "Сообщество",
    gradient: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
  },
  {
    path: "/",
    icon: "fas fa-home",
    label: "Главная",
    gradient: "linear-gradient(135deg, #06b6d4 0%, #10b981 100%)",
  },
];

// Particle animation
const getParticleStyle = (index) => {
  const left = Math.random() * 100;
  const animationDelay = Math.random() * 5;
  const animationDuration = 10 + Math.random() * 10;

  return {
    left: `${left}%`,
    animationDelay: `${animationDelay}s`,
    animationDuration: `${animationDuration}s`,
  };
};
</script>

<style scoped>
@keyframes float {
  0%,
  100% {
    transform: translateY(0px) translateX(0px);
  }
  33% {
    transform: translateY(-20px) translateX(10px);
  }
  66% {
    transform: translateY(10px) translateX(-10px);
  }
}

@keyframes float-delayed {
  0%,
  100% {
    transform: translateY(0px) translateX(0px);
  }
  33% {
    transform: translateY(15px) translateX(-15px);
  }
  66% {
    transform: translateY(-10px) translateX(10px);
  }
}

@keyframes pulse-slow {
  0%,
  100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.6;
  }
}

@keyframes float-icon {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

@keyframes particle-float {
  0% {
    transform: translateY(100vh) scale(0);
    opacity: 0;
  }
  10% {
    opacity: 0.5;
  }
  90% {
    opacity: 0.5;
  }
  100% {
    transform: translateY(-100vh) scale(1);
    opacity: 0;
  }
}

@keyframes glitch {
  0%,
  100% {
    transform: translateX(0);
  }
  20% {
    transform: translateX(-5px);
  }
  40% {
    transform: translateX(5px);
  }
  60% {
    transform: translateX(-5px);
  }
  80% {
    transform: translateX(5px);
  }
}

.animate-float {
  animation: float 20s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 25s ease-in-out infinite;
  animation-delay: 2s;
}

.animate-pulse-slow {
  animation: pulse-slow 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.gradient-text {
  background: linear-gradient(135deg, #06b6d4 0%, #a855f7 50%, #ec4899 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
}

.error-number {
  position: relative;
  filter: drop-shadow(0 0 40px rgba(6, 182, 212, 0.3));
}

.glitch-line {
  height: 2px;
  width: 200px;
  background: linear-gradient(90deg, transparent, #06b6d4, transparent);
  animation: glitch 2s infinite;
}

.floating-icon {
  position: absolute;
  animation: float-icon 3s ease-in-out infinite;
}

.icon-1 {
  top: -10%;
  left: -5%;
  animation-delay: 0s;
}

.icon-2 {
  top: -5%;
  right: -5%;
  animation-delay: 0.5s;
}

.icon-3 {
  bottom: 10%;
  left: 0%;
  animation-delay: 1s;
}

.icon-4 {
  bottom: 15%;
  right: 5%;
  animation-delay: 1.5s;
}

.icon-wrapper {
  @apply w-12 h-12 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center;
}

.icon-wrapper i {
  @apply text-lg sm:text-2xl;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: linear-gradient(135deg, #06b6d4, #a855f7);
  border-radius: 50%;
  animation: particle-float linear infinite;
  opacity: 0;
}

.btn-primary {
  @apply px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 
         text-white font-medium hover:from-cyan-600 hover:to-purple-600 
         transition-all duration-300 transform hover:scale-105 
         shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40
         flex items-center justify-center;
}

.btn-secondary {
  @apply px-6 py-3 rounded-xl bg-slate-800/80 border border-cyan-500/30
         text-cyan-300 font-medium hover:bg-slate-800 hover:border-cyan-500/50
         transition-all duration-300 transform hover:scale-105
         flex items-center justify-center;
}

.quick-link-card {
  @apply p-4 rounded-xl bg-slate-900/50 border border-slate-700/50 
         hover:border-cyan-500/30 transition-all duration-300 
         flex flex-col items-center gap-3 cursor-pointer
         hover:bg-slate-900/70 hover:transform hover:-translate-y-1;
}

.icon-container {
  @apply w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0;
}

@media (max-width: 640px) {
  .error-number span {
    font-size: 5rem !important;
  }

  .floating-icon {
    display: none;
  }

  .glitch-line {
    width: 120px;
  }
}

@media (min-width: 641px) and (max-width: 768px) {
  .error-number span {
    font-size: 7rem !important;
  }
}
</style>
