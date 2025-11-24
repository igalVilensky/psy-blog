<template>
  <div class="min-h-screen bg-slate-950 text-white overflow-hidden">
    <!-- Animated Background -->
    <div class="fixed inset-0 pointer-events-none">
      <div class="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
        style="animation-delay: 1s"></div>
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl animate-pulse"
        style="animation-delay: 2s"></div>
    </div>

    <!-- Main Content -->
    <main class="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-0 py-12 lg:py-16 relative">
      <!-- Hero Section -->
      <section class="text-center mb-16 md:mb-24">
        <div class="hero-content">
          <!-- Animated Petri Dish with Enhanced Effects -->
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
                class="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 bg-gradient-to-br from-green-500 to-emerald-600 text-white text-xs sm:text-sm font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-lg animate-bounce-slow">
                🎯 Научно
              </div>
              <div
                class="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-gradient-to-br from-pink-500 to-rose-600 text-white text-xs sm:text-sm font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-lg animate-bounce-slow"
                style="animation-delay: 0.5s">
                ✨ Интересно
              </div>
            </div>
          </div>

          <!-- Enhanced Title with Better Typography -->
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-6 leading-tight">
            О MindQ Lab —
            <span
              class="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-fuchsia-400 animate-gradient">
              Лаборатория осознанного роста
            </span>
          </h1>

          <!-- Enhanced Description -->
          <p class="text-slate-300 text-base sm:text-lg md:text-xl max-w-4xl mx-auto mb-8 leading-relaxed px-4 animate-fade-in-up"
            style="animation-delay: 0.2s">
            MindQ Lab — это инновационная платформа для исследования сознания и
            личностного роста, объединяющая современную психологию, нейронауки и
            интерактивные технологии.
          </p>

          <!-- Key Benefits Pills -->
          <div class="flex flex-wrap justify-center gap-3 mb-8 px-4 animate-fade-in-up" style="animation-delay: 0.4s">
            <span
              class="px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-300 text-sm font-medium hover:bg-cyan-500/20 transition-colors duration-300">
              🧠 Нейронауки
            </span>
            <span
              class="px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-300 text-sm font-medium hover:bg-purple-500/20 transition-colors duration-300">
              🎮 Геймификация
            </span>
            <span
              class="px-4 py-2 bg-pink-500/10 border border-pink-500/30 rounded-full text-pink-300 text-sm font-medium hover:bg-pink-500/20 transition-colors duration-300">
              📊 Персонализация
            </span>
          </div>
        </div>
      </section>

      <!-- Mission Section with Enhanced Design -->
      <section class="mb-16 md:mb-24 animate-fade-in-up" style="animation-delay: 0.6s">
        <div
          class="bg-gradient-to-br from-slate-900/60 via-slate-900/40 to-slate-900/60 backdrop-blur-xl rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-800/60 shadow-2xl hover:border-cyan-500/30 transition-all duration-500 hover:shadow-cyan-500/20">
          <div class="flex flex-col sm:flex-row items-start sm:items-center mb-6 gap-4">
            <div
              class="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
              <i class="fas fa-bullseye text-cyan-400 text-2xl sm:text-3xl"></i>
            </div>
            <h2
              class="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
              Наша миссия
            </h2>
          </div>
          <p class="text-slate-300 text-lg sm:text-xl leading-relaxed">
            Сделать инструменты самопознания и развития доступными для каждого.
            Мы создаем безопасное цифровое пространство, где вы можете
            исследовать свои мысли, эмоции и поведение через научно обоснованные
            тесты, игры и практики.
          </p>
        </div>
      </section>

      <!-- Approach Section with Improved Layout -->
      <section class="mb-16 md:mb-24">
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 md:mb-16 animate-fade-in-up">
          Наш подход:
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">Лаборатория
            роста</span>
        </h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <!-- Features Card with Enhanced Interactions -->
          <div
            class="bg-gradient-to-br from-slate-900/60 via-slate-900/40 to-slate-900/60 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-800/60 shadow-2xl animate-fade-in-left">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div v-for="(feature, index) in features" :key="index"
                class="feature-card group bg-slate-800/40 rounded-2xl p-5 md:p-6 border border-slate-700/40 hover:border-cyan-500/60 hover:bg-slate-800/60 transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer"
                :style="`animation-delay: ${index * 0.1}s;`">
                <div
                  class="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <i :class="feature.icon + ' text-cyan-400 text-xl md:text-2xl'"></i>
                </div>
                <h3
                  class="text-lg md:text-xl font-semibold mb-3 text-white group-hover:text-cyan-400 transition-colors duration-300">
                  {{ feature.title }}
                </h3>
                <p
                  class="text-sm md:text-base text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                  {{ feature.description }}
                </p>
              </div>
            </div>
          </div>

          <!-- Stats Card with Enhanced Animations -->
          <div
            class="bg-gradient-to-br from-slate-900/60 via-slate-900/40 to-slate-900/60 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-800/60 shadow-2xl animate-fade-in-right">
            <div class="flex items-center mb-6 md:mb-8">
              <div
                class="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mr-4 flex-shrink-0">
                <i class="fas fa-chart-bar text-purple-400 text-2xl sm:text-3xl"></i>
              </div>
              <h2
                class="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                В цифрах
              </h2>
            </div>

            <div class="grid grid-cols-2 gap-4 md:gap-6">
              <div v-for="(stat, index) in stats" :key="index"
                class="stat-card group text-center p-4 md:p-6 bg-slate-800/40 rounded-2xl border border-slate-700/40 hover:border-purple-500/60 hover:bg-slate-800/60 transition-all duration-300 hover:scale-105 cursor-pointer"
                :style="`animation-delay: ${index * 0.1}s;`">
                <div
                  :class="`text-3xl md:text-4xl font-bold mb-2 ${stat.color} group-hover:scale-110 transition-transform duration-300`">
                  {{ stat.value }}
                </div>
                <div
                  class="text-xs md:text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300 uppercase tracking-wide">
                  {{ stat.label }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Team Section with Enhanced Cards -->
      <section class="mb-16 md:mb-24">
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 md:mb-16 animate-fade-in-up">
          Команда
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">лаборатории</span>
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <!-- Team Member 1 -->
          <div
            class="team-card group bg-gradient-to-br from-slate-900/60 via-slate-900/40 to-slate-900/60 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-800/60 shadow-2xl hover:border-cyan-500/60 hover:shadow-cyan-500/20 transition-all duration-500 hover:scale-[1.02] animate-fade-in-left">
            <div class="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
              <div class="flex-shrink-0 relative">
                <div
                  class="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-blue-500/30 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500">
                </div>
                <img src="/assets/images/profile.jpg" alt="Анастасия Гельмут"
                  class="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-slate-800 object-cover shadow-2xl relative z-10 group-hover:scale-110 group-hover:border-cyan-500/50 transition-all duration-500" />
                <div
                  class="absolute -bottom-2 -right-2 bg-gradient-to-br from-cyan-500 to-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-20">
                  🧠 Психолог
                </div>
              </div>
              <div class="flex-1 text-center sm:text-left">
                <h3
                  class="text-2xl sm:text-3xl font-bold text-cyan-400 mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                  Анастасия Гельмут
                </h3>
                <p class="text-sm sm:text-base text-purple-400 font-semibold mb-4">
                  Руководитель по психологии и контенту
                </p>
                <p
                  class="text-slate-300 text-sm sm:text-base leading-relaxed group-hover:text-white transition-colors duration-300">
                  Создает психологическую основу MindQ Lab, объединяя
                  современные методики и научные подходы в области когнитивной
                  психологии и личностного роста.
                </p>
              </div>
            </div>
          </div>

          <!-- Team Member 2 -->
          <div
            class="team-card group bg-gradient-to-br from-slate-900/60 via-slate-900/40 to-slate-900/60 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-800/60 shadow-2xl hover:border-purple-500/60 hover:shadow-purple-500/20 transition-all duration-500 hover:scale-[1.02] animate-fade-in-right">
            <div class="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
              <div class="flex-shrink-0 relative">
                <div
                  class="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500">
                </div>
                <img src="/assets/images/igal.avif" alt="Игаль Виленский"
                  class="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-slate-800 object-cover shadow-2xl relative z-10 group-hover:scale-110 group-hover:border-purple-500/50 transition-all duration-500" />
                <div
                  class="absolute -bottom-2 -right-2 bg-gradient-to-br from-purple-500 to-pink-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-20">
                  💻 Tech Lead
                </div>
              </div>
              <div class="flex-1 text-center sm:text-left">
                <h3
                  class="text-2xl sm:text-3xl font-bold text-purple-400 mb-2 group-hover:text-purple-300 transition-colors duration-300">
                  Игаль Виленский
                </h3>
                <p class="text-sm sm:text-base text-pink-400 font-semibold mb-4">
                  Технический руководитель
                </p>
                <p
                  class="text-slate-300 text-sm sm:text-base leading-relaxed group-hover:text-white transition-colors duration-300">
                  Отвечает за техническую реализацию MindQ Lab, включая
                  интерактивные инструменты, тесты и игровые механики для
                  вовлечения пользователей.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Enhanced CTA Section -->
      <section class="animate-fade-in-up" style="animation-delay: 0.8s">
        <div
          class="relative bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-900/80 backdrop-blur-xl rounded-3xl p-8 sm:p-10 md:p-12 border border-cyan-500/30 shadow-2xl text-center overflow-hidden">
          <!-- Decorative elements -->
          <div class="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"></div>
          <div class="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>

          <div class="relative z-10">
            <h2
              class="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
              Начните исследовать себя
            </h2>
            <p class="text-slate-300 text-base sm:text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Присоединяйтесь к MindQ Lab, чтобы открыть свой потенциал через
              научные тесты, развивающие игры и поддерживающее сообщество.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <NuxtLink to="/lab/tests"
                class="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-2xl font-semibold text-base sm:text-lg shadow-2xl hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300 w-full sm:w-auto">
                <i class="fas fa-vial group-hover:rotate-12 transition-transform duration-300"></i>
                <span>Начать с тестов</span>
                <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform duration-300"></i>
              </NuxtLink>
              <NuxtLink to="/courses"
                class="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-slate-800/60 border-2 border-purple-500/40 rounded-2xl text-slate-200 font-semibold text-base sm:text-lg hover:bg-purple-500/20 hover:border-purple-500/60 hover:scale-105 transition-all duration-300 w-full sm:w-auto">
                <i class="fas fa-graduation-cap group-hover:-rotate-12 transition-transform duration-300"></i>
                <span>Изучить курсы</span>
                <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform duration-300"></i>
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";

const labActive = ref(false);

const features = [
  {
    icon: "fas fa-microscope",
    title: "Научный подход",
    description:
      "Все методики основаны на проверенных психологических исследованиях",
  },
  {
    icon: "fas fa-user-cog",
    title: "Персонализация",
    description: "Индивидуальные рекомендации на основе ваших результатов",
  },
  {
    icon: "fas fa-trophy",
    title: "Геймификация",
    description: "Увлекательные игры для развития когнитивных способностей",
  },
  {
    icon: "fas fa-chart-bar",
    title: "Отслеживание",
    description: "Визуализация вашего роста и достижений",
  },
];

const stats = [
  { value: "12+", label: "Тестов", color: "text-cyan-400" },
  { value: "8+", label: "Игр", color: "text-purple-400" },
  { value: "25+", label: "Курсов", color: "text-pink-400" },
  { value: "247+", label: "Участников", color: "text-emerald-400" },
];
</script>

<style scoped>
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
  from {
    opacity: 0;
    transform: translateY(40px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-40px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(40px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
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

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out backwards;
}

.animate-fade-in-left {
  animation: fadeInLeft 0.8s ease-out backwards;
}

.animate-fade-in-right {
  animation: fadeInRight 0.8s ease-out backwards;
}

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

a:focus-visible,
button:focus-visible {
  outline: 2px solid theme("colors.cyan.400");
  outline-offset: 4px;
  border-radius: 0.5rem;
}

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
