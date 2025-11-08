<template>
  <section class="relative min-h-screen bg-slate-900 overflow-hidden">
    <!-- Background with Animated Elements -->
    <div class="absolute inset-0">
      <div
        class="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900/20"
      ></div>
      <!-- Animated Particles (SVG) -->
      <div class="absolute inset-0 opacity-40">
        <svg width="100%" height="100%" class="particles">
          <!-- Large particles -->
          <circle
            cx="10%"
            cy="10%"
            r="3"
            fill="#60A5FA"
            class="animate-float"
          />
          <circle
            cx="70%"
            cy="20%"
            r="4"
            fill="#93C5FD"
            class="animate-float-reverse"
          />
          <circle
            cx="45%"
            cy="70%"
            r="3"
            fill="#60A5FA"
            class="animate-float-slow"
          />
          <circle
            cx="20%"
            cy="60%"
            r="5"
            fill="#93C5FD"
            class="animate-float-reverse-slow"
          />
          <circle
            cx="80%"
            cy="80%"
            r="4"
            fill="#60A5FA"
            class="animate-float"
          />

          <!-- Medium particles -->
          <circle
            cx="30%"
            cy="25%"
            r="2.5"
            fill="#3B82F6"
            class="animate-float-reverse"
          />
          <circle
            cx="50%"
            cy="15%"
            r="2"
            fill="#93C5FD"
            class="animate-float-slow"
          />
          <circle
            cx="75%"
            cy="55%"
            r="2.5"
            fill="#3B82F6"
            class="animate-float"
          />
          <circle
            cx="15%"
            cy="85%"
            r="2"
            fill="#93C5FD"
            class="animate-float-reverse-slow"
          />
          <circle
            cx="65%"
            cy="40%"
            r="2.5"
            fill="#3B82F6"
            class="animate-float-slow"
          />

          <!-- Smaller particles with glow effect -->
          <circle
            cx="25%"
            cy="35%"
            r="1.5"
            fill="#60A5FA"
            class="animate-pulse-glow"
            filter="url(#glow)"
          />
          <circle
            cx="55%"
            cy="45%"
            r="1.5"
            fill="#93C5FD"
            class="animate-pulse-glow-slow"
            filter="url(#glow)"
          />
          <circle
            cx="85%"
            cy="65%"
            r="1.5"
            fill="#60A5FA"
            class="animate-pulse-glow"
            filter="url(#glow)"
          />
          <circle
            cx="40%"
            cy="90%"
            r="1.5"
            fill="#93C5FD"
            class="animate-pulse-glow-slow"
            filter="url(#glow)"
          />
          <circle
            cx="90%"
            cy="30%"
            r="1.5"
            fill="#60A5FA"
            class="animate-pulse-glow"
            filter="url(#glow)"
          />

          <!-- SVG filters for glow effect -->
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-6 sm:px-0 relative z-10 py-16 sm:py-24">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <!-- Left Content -->
        <div class="space-y-8">
          <span
            class="inline-block px-4 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm font-medium"
          >
            Откройте свой архетип
          </span>
          <h1 class="text-4xl lg:text-5xl font-bold text-white leading-tight">
            Познайте себя глубже и найдите путь к гармонии
          </h1>
          <p class="text-lg text-slate-300 max-w-xl">
            Пройдите научно обоснованный тест, чтобы раскрыть свои сильные
            стороны, ценности и жизненный путь.
          </p>
          <div class="flex gap-4">
            <NuxtLink
              to="/test"
              class="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg shadow-lg transition-all"
            >
              Пройти тест
            </NuxtLink>
            <NuxtLink
              to="/register"
              class="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-700 transition-all"
            >
              Создать аккаунт
            </NuxtLink>
          </div>
        </div>

        <!-- Right Content - Image -->
        <div class="relative">
          <div
            class="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/80 shadow-xl"
          >
            <img
              :src="mainImage"
              alt="Архетипы тест"
              class="w-full rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import mainImage from "@/assets/images/archeptypes.webp";
</script>

<style scoped>
/* Improved animation styles */
.animate-float {
  animation: float 8s ease-in-out infinite;
}

.animate-float-reverse {
  animation: float 10s ease-in-out infinite reverse;
}

.animate-float-slow {
  animation: float 12s ease-in-out infinite;
}

.animate-float-reverse-slow {
  animation: float 14s ease-in-out infinite reverse;
}

.animate-pulse-glow {
  animation: pulseGlow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-pulse-glow-slow {
  animation: pulseGlow 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) translateX(0);
  }
  25% {
    transform: translateY(-10px) translateX(5px);
  }
  50% {
    transform: translateY(0) translateX(10px);
  }
  75% {
    transform: translateY(10px) translateX(5px);
  }
}

@keyframes pulseGlow {
  0%,
  100% {
    opacity: 0.8;
    r: 1.5;
  }
  50% {
    opacity: 0.4;
    r: 2.5;
  }
}
</style>
