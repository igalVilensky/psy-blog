<template>
  <div
    class="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white overflow-hidden transition-colors duration-500 relative">

    <!-- Background Visualizer -->
    <div class="absolute inset-0 z-0 pointer-events-none opacity-40 md:opacity-100">
      <NeuralRewireVisualizer />
      <div
        class="absolute inset-0 bg-gradient-to-b from-slate-50/80 via-slate-50/20 to-slate-50/80 dark:from-slate-950/80 dark:via-slate-950/20 dark:to-slate-950/80">
      </div>
    </div>

    <!-- Main Content -->
    <main class="container mx-auto max-w-6xl px-4 sm:px-0 py-12 lg:py-16 relative z-10">
      <div class="max-w-3xl mx-auto">
        <!-- Enhanced Petri Dish -->
        <div class="text-center w-full mb-8">
          <div class="relative inline-block">
            <div
              class="petri-dish w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 flex items-center justify-center relative overflow-hidden mx-auto group cursor-pointer shadow-2xl hover:shadow-cyan-500/50 transition-all duration-500"
              @mouseenter="labActive = true" @mouseleave="labActive = false">
              <!-- Glow effect -->
              <div
                class="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              </div>

              <!-- Rotating ring -->
              <div class="absolute inset-2 border-2 border-cyan-400/30 rounded-full animate-spin-slow"></div>

              <!-- Flask icon -->
              <i
                class="fas fa-flask text-white text-5xl sm:text-6xl md:text-7xl relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"></i>

              <!-- Pulse ring on hover -->
              <div v-if="labActive" class="absolute inset-0 border-4 border-cyan-400/60 rounded-full animate-ping">
              </div>

              <!-- Enhanced floating particles -->
              <div class="absolute inset-0 overflow-hidden pointer-events-none">
                <div v-for="i in 6" :key="i" class="particle" :style="`top: ${Math.random() * 100}%; left: ${Math.random() * 100
                  }%; animation-delay: ${i * 0.5}s;`"></div>
              </div>
            </div>

            <!-- Floating badges -->
            <div
              class="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-gradient-to-br from-green-500 to-emerald-600 text-white text-xs sm:text-sm font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-lg animate-bounce-slow">
              🎯 Научно
            </div>
            <div
              class="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 bg-gradient-to-br from-pink-500 to-rose-600 text-white text-xs sm:text-sm font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-lg animate-bounce-slow"
              style="animation-delay: 0.5s">
              ✨ Эффективно
            </div>
          </div>
        </div>

        <!-- Enhanced Title (matching main index style) -->
        <h1
          class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white text-center mb-6 leading-tight">
          MindQ Lab —
          <span
            class="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 via-blue-600 to-fuchsia-600 dark:from-cyan-400 dark:via-blue-400 dark:to-fuchsia-400 animate-gradient">
            Твоя лаборатория осознанного роста
          </span>
        </h1>

        <!-- Enhanced Description (matching main index style) -->
        <p
          class="text-slate-600 dark:text-slate-300 text-center text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
          Исследуй себя с помощью тестов и интерактивных инструментов, получай
          персональные рекомендации и обучающие программы — всё в одном месте.
        </p>



        <!-- Enhanced CTA Buttons (matching main index style) -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center mb-6">
          <NuxtLink to="/lab/tests"
            class="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-2xl font-semibold text-white text-base sm:text-lg shadow-2xl hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300">
            <i class="fas fa-vial group-hover:rotate-12 transition-transform duration-300"></i>
            <span>Пройти тест бесплатно</span>
            <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform duration-300"></i>
          </NuxtLink>

          <NuxtLink to="/lab/builder"
            class="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/60 dark:bg-slate-800/60 border-2 border-purple-500/40 rounded-2xl text-slate-700 dark:text-slate-200 font-semibold text-base sm:text-lg hover:bg-purple-500/10 dark:hover:bg-purple-500/20 hover:border-purple-500/60 hover:scale-105 transition-all duration-300">
            <i
              class="fas fa-puzzle-piece group-hover:rotate-12 transition-transform duration-300 text-purple-600 dark:text-purple-400"></i>
            <span>Конструктор Лаборатории</span>
          </NuxtLink>
        </div>

        <!-- Enhanced Quick Links (matching main index style) -->
        <div class="text-center mb-12">
          <div
            class="inline-flex items-center gap-3 px-6 py-3 bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm border border-slate-200 dark:border-slate-800/40 rounded-xl">
            <span class="text-slate-500 dark:text-slate-400 text-sm">Или сразу:</span>
            <NuxtLink to="/lab"
              class="text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 font-medium text-sm hover:underline transition-colors">
              Войти в лабораторию
            </NuxtLink>
            <span class="text-slate-400 dark:text-slate-600">•</span>
            <NuxtLink to="/courses"
              class="text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300 font-medium text-sm hover:underline transition-colors">
              Курсы и гайды
            </NuxtLink>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "~/stores/auth";
import NeuralRewireVisualizer from "~/components/lab/habit-override/NeuralRewireVisualizer.vue";

definePageMeta({
  layout: "laboratory",
});

const labActive = ref(false);
const auth = useAuthStore();
</script>

<style scoped>
/* Enhanced Animations */
@keyframes gradient {

  0%,
  100% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }
}

@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes bounce-slow {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

@keyframes float {

  0%,
  100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.4;
  }

  50% {
    transform: translate(var(--float-x, 10px), var(--float-y, -15px)) scale(1.3);
    opacity: 0.8;
  }
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out forwards;
}

.animate-gradient {
  background-size: 200% auto;
  animation: gradient 4s ease infinite;
}

.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}

.animate-bounce-slow {
  animation: bounce-slow 2s ease-in-out infinite;
}

/* Floating particles */
.particle {
  position: absolute;
  width: 6px;
  height: 6px;
  background: radial-gradient(circle, rgba(34, 211, 238, 0.8), transparent);
  border-radius: 50%;
  animation: float 4s infinite ease-in-out;
  --float-x: 15px;
  --float-y: -20px;
}

/* Enhanced focus states for accessibility */
a:focus-visible,
button:focus-visible {
  outline: 2px solid theme("colors.cyan.400");
  outline-offset: 4px;
  border-radius: 0.5rem;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
