<template>
  <section class="relative min-h-[90vh] bg-slate-900 overflow-hidden">
    <!-- Advanced Gradient Background with Animation -->
    <div class="absolute inset-0">
      <div
        class="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-900/20"
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
    <div class="container mx-auto px-6 xl:px-0 relative z-10 py-16 sm:py-24">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <!-- Left Column - Main Content -->
        <div class="space-y-10">
          <!-- Main Value Proposition with Enhanced Typography -->
          <div class="space-y-6">
            <div class="overflow-hidden">
              <span
                class="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-600/30 to-indigo-600/30 text-blue-400 rounded-full text-sm font-medium backdrop-blur-sm border border-blue-500/20 shadow-lg shadow-blue-900/20 transform hover:-translate-y-1 transition-all duration-300"
              >
                Научно обоснованные инструменты роста
              </span>
            </div>

            <h1
              class="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight tracking-tight"
            >
              <span
                class="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200"
              >
                Узнайте себя глубже и откройте новые возможности
              </span>
            </h1>

            <p class="text-lg text-slate-300 max-w-xl leading-relaxed">
              Пройдите научно обоснованный тест, чтобы выявить свои сильные
              стороны, скрытые таланты и зоны роста. Получите персональные
              рекомендации для развития.
            </p>
          </div>

          <!-- Enhanced Primary CTAs with Animation -->
          <div class="flex flex-col sm:flex-row gap-4">
            <NuxtLink
              to="/test"
              class="group px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-xl font-medium text-center transition-all duration-300 shadow-lg shadow-blue-900/30 relative overflow-hidden"
            >
              <span class="relative z-10">Пройти бесплатный тест</span>
              <span
                class="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400 to-indigo-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
              ></span>
            </NuxtLink>

            <NuxtLink
              to="/register"
              class="group px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium text-center border border-slate-700 transition-all duration-300 shadow-lg shadow-slate-900/50 relative overflow-hidden"
            >
              <span class="relative z-10">Создать аккаунт</span>
              <span
                class="absolute inset-0 w-full h-full bg-gradient-to-r from-slate-600 to-slate-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
              ></span>
            </NuxtLink>
          </div>

          <!-- Enhanced Curiosity Effect with Custom Design -->
          <div
            class="bg-slate-800/30 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50 shadow-lg shadow-slate-900/30 transform hover:scale-102 transition-all duration-300"
          >
            <p class="text-sm text-slate-400 flex items-center">
              <span class="text-blue-400 mr-2 text-xl">🧠</span>
              Узнайте свой личностный профиль всего за 2 минуты. Полные
              результаты доступны после создания аккаунта.
            </p>
          </div>

          <!-- Enhanced Key Features with Icons and Cards -->
          <div class="space-y-6 pt-6">
            <h3 class="text-xl font-semibold text-white flex items-center">
              <span class="bg-blue-600/20 h-8 w-1 mr-3 rounded-full"></span>
              Что вас ждет:
            </h3>

            <div class="grid sm:grid-cols-2 gap-4">
              <div
                class="bg-slate-800/30 backdrop-blur-sm p-4 rounded-lg border border-slate-700/50 transform hover:translate-y-1 transition-all duration-300"
              >
                <div class="flex items-start">
                  <span class="text-2xl mr-3">🔑</span>
                  <p class="text-slate-300">
                    Эмоциональный компас для самоотслеживания
                  </p>
                </div>
              </div>

              <div
                class="bg-slate-800/30 backdrop-blur-sm p-4 rounded-lg border border-slate-700/50 transform hover:translate-y-1 transition-all duration-300"
              >
                <div class="flex items-start">
                  <span class="text-2xl mr-3">📊</span>
                  <p class="text-slate-300">
                    Тесты по большой пятерке и открытию архетипа жизни
                  </p>
                </div>
              </div>

              <div
                class="bg-slate-800/30 backdrop-blur-sm p-4 rounded-lg border border-slate-700/50 transform hover:translate-y-1 transition-all duration-300"
              >
                <div class="flex items-start">
                  <span class="text-2xl mr-3">🎓</span>
                  <p class="text-slate-300">
                    Курсы, гайды и подкасты для развития
                  </p>
                </div>
              </div>

              <div
                class="bg-slate-800/30 backdrop-blur-sm p-4 rounded-lg border border-slate-700/50 transform hover:translate-y-1 transition-all duration-300"
              >
                <div class="flex items-start">
                  <span class="text-2xl mr-3">🧘‍♂️</span>
                  <p class="text-slate-300">
                    Персонализированные рекомендации для роста
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - Enhanced Visual Element -->
        <div class="relative">
          <div
            class="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl blur-xl"
          ></div>
          <div
            class="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/80 shadow-xl shadow-slate-900/50 transform hover:scale-102 transition-all duration-500"
          >
            <div
              class="absolute -right-3 -top-3 w-24 h-24 bg-blue-500/10 rounded-full blur-xl"
            ></div>
            <img
              :src="mainImage"
              alt="Пример результата теста"
              class="w-full h-auto rounded-lg shadow-lg"
            />

            <div
              class="absolute -top-4 -right-4 bg-slate-900/90 backdrop-blur-sm rounded-lg p-4 border border-slate-700/80 shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              <p class="text-sm text-slate-300 flex items-center">
                <span class="text-yellow-500 mr-2">🔐</span>
                Бесплатный тест без регистрации. Полные результаты – в вашем
                профиле.
              </p>
            </div>
          </div>

          <!-- Added floating elements for visual interest -->
          <div
            class="hidden lg:block absolute -bottom-6 -left-12 w-24 h-24 bg-blue-500/10 rounded-full blur-xl animate-pulse-slow"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import mainImage from "@/assets/images/hero-image.webp";
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
