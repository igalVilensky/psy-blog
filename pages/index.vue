<template>
  <div
    class="min-h-screen bg-slate-50 px-4 dark:bg-slate-950 text-slate-900 dark:text-white overflow-hidden transition-colors duration-500 relative">

    <!-- Background Visualizer -->
    <div class="fixed inset-0 z-0 pointer-events-none opacity-40 md:opacity-100">
      <NeuralRewireVisualizer />
      <div
        class="absolute inset-0 bg-gradient-to-b from-slate-50/80 via-slate-50/20 to-slate-50/80 dark:from-slate-950/80 dark:via-slate-950/20 dark:to-slate-950/80">
      </div>
    </div>

    <!-- Main Content -->
    <main class="container mx-auto max-w-6xl px-4  py-12 lg:py-16 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start mb-16 md:mb-24">
        <!-- Left: Hero / Intro -->
        <section class="relative order-2 lg:order-1 animate-fade-in-left">
          <div class="hero-content text-center lg:text-left">
            <!-- Enhanced Petri Dish -->
            <div class="relative inline-block mb-8 mx-auto lg:mx-0">
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

            <!-- Enhanced Title -->
            <h1
              class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white text-center lg:text-left mb-6 leading-tight">
              MindQ Lab —
              <span class="block mt-2 text-indigo-600 dark:text-indigo-400">
                Твоя лаборатория осознанного роста
              </span>
            </h1>

            <!-- Enhanced Description -->
            <p
              class="text-slate-600 dark:text-slate-300 text-center lg:text-left text-base sm:text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Исследуй себя с помощью тестов и интерактивных инструментов,
              получай персональные рекомендации и обучающие программы — всё в
              одном месте.
            </p>

            <!-- Enhanced CTA Buttons -->
            <div
              class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-stretch sm:items-center mb-6">
              <NuxtLink to="/lab/tests"
                class="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-semibold text-base sm:text-lg shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all duration-300">
                <i class="fas fa-vial group-hover:rotate-12 transition-transform duration-300"></i>
                <span>Пройти тест бесплатно</span>
                <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform duration-300"></i>
              </NuxtLink>

              <NuxtLink v-if="!isLoggedIn" to="/register"
                class="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-2xl font-semibold text-base sm:text-lg hover:border-indigo-500/50 hover:text-indigo-600 dark:hover:text-indigo-400 hover:-translate-y-0.5 transition-all duration-300">
                <i class="fas fa-user-plus group-hover:scale-110 transition-transform duration-300"></i>
                <span>Создать профиль</span>
              </NuxtLink>

              <NuxtLink v-else to="/home"
                class="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-2xl font-semibold text-base sm:text-lg hover:border-indigo-500/50 hover:text-indigo-600 dark:hover:text-indigo-400 hover:-translate-y-0.5 transition-all duration-300">
                <i class="fas fa-home group-hover:scale-110 transition-transform duration-300"></i>
                <span>Перейти в кабинет</span>
              </NuxtLink>
            </div>

            <!-- Enhanced Quick Links -->
            <div class="text-center lg:text-left">
              <div
                class="inline-flex items-center gap-3 px-6 py-3 bg-white/60 dark:bg-slate-900/40 backdrop-blur-sm border border-slate-200 dark:border-slate-800/40 rounded-xl shadow-sm dark:shadow-none">
                <span class="text-slate-500 dark:text-slate-400 text-sm">Или сразу:</span>
                <NuxtLink to="/lab"
                  class="text-cyan-400 hover:text-cyan-300 font-medium text-sm hover:underline transition-colors">
                  Войти в лабораторию
                </NuxtLink>
                <span class="text-slate-600">•</span>
                <NuxtLink to="/courses"
                  class="text-purple-400 hover:text-purple-300 font-medium text-sm hover:underline transition-colors">
                  Курсы и гайды
                </NuxtLink>
              </div>
            </div>
          </div>
        </section>

        <!-- Right: Enhanced Features / Quick Access -->
        <aside class="order-1 lg:order-2 animate-fade-in-right hidden lg:block">
          <div
            class="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800/60 shadow-xl dark:shadow-2xl hover:border-cyan-500/30 transition-all duration-500">
            <div class="flex items-center mb-6">
              <div
                class="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mr-4 flex-shrink-0">
                <i class="fas fa-brain text-slate-700 dark:text-white text-2xl sm:text-3xl"></i>
              </div>
              <h2 class="text-xl sm:text-2xl font-bold text-slate-700 dark:text-white">
                Исследовательские станции
              </h2>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <NuxtLink v-for="(station, index) in stations" :key="station.name" :to="station.link"
                class="group flex flex-col items-center p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800/70 border border-slate-200 dark:border-slate-700/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg text-center"
                :class="station.hoverBorder" :style="{ animationDelay: `${index * 0.1}s` }">
                <div
                  class="w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
                  :class="`bg-gradient-to-br from-${station.gradientFrom} to-${station.gradientTo}`">
                  <i :class="[station.icon, 'text-white text-lg']" />
                </div>
                <div class="w-full">
                  <div
                    class="text-sm font-bold text-slate-900 dark:text-white mb-1 truncate group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
                    {{ station.name }}
                  </div>
                  <div class="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {{ station.subtitle }}
                  </div>
                </div>
              </NuxtLink>
            </div>

            <!-- Enhanced Stats Summary -->
            <div class="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800/60">
              <div class="grid grid-cols-3 gap-4">
                <div
                  class="stats-card group text-center p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/40 hover:border-cyan-500/60 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all duration-300 hover:scale-105 cursor-pointer">
                  <div
                    class="text-2xl sm:text-3xl font-bold text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                    12+
                  </div>
                  <div
                    class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300 uppercase tracking-wide">
                    Тестов
                  </div>
                </div>
                <div
                  class="stats-card group text-center p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/40 hover:border-purple-500/60 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all duration-300 hover:scale-105 cursor-pointer"
                  style="animation-delay: 0.1s">
                  <div
                    class="text-2xl sm:text-3xl font-bold text-purple-400 group-hover:scale-110 transition-transform duration-300">
                    8+
                  </div>
                  <div
                    class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300 uppercase tracking-wide">
                    Игр
                  </div>
                </div>
                <div
                  class="stats-card group text-center p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/40 hover:border-pink-500/60 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all duration-300 hover:scale-105 cursor-pointer"
                  style="animation-delay: 0.2s">
                  <div
                    class="text-2xl sm:text-3xl font-bold text-pink-400 group-hover:scale-110 transition-transform duration-300">
                    25+
                  </div>
                  <div
                    class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300 uppercase tracking-wide">
                    Курсов
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <!-- Enhanced Additional Features Section -->
      <section class="mb-16 md:mb-24">
        <h2
          class="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 md:mb-16 animate-fade-in-up text-slate-900 dark:text-white">
          Почему
          <span class="text-slate-900 dark:text-white">MindQ Lab</span>?
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <div v-for="(feature, index) in features" :key="feature.title"
            class="feature-card group bg-white dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800/60 hover:border-cyan-500/60 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer"
            :style="{ animationDelay: `${index * 0.1}s` }">
            <div
              class="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              <i :class="feature.icon + ' text-2xl md:text-3xl text-cyan-400'"></i>
            </div>
            <h3 class="text-xl md:text-2xl font-bold mb-3 group-hover:text-cyan-400 transition-colors duration-300">
              {{ feature.title }}
            </h3>
            <p
              class="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed group-hover:text-slate-800 dark:group-hover:text-slate-300 transition-colors duration-300">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useAuthStore } from "~/stores/auth";
import { useRuntimeConfig, useSeoMeta } from "#app";
import NeuralRewireVisualizer from "~/components/lab/habit-override/NeuralRewireVisualizer.vue";

// --- AUTH STATE ---
const authStore = useAuthStore();
const isLoggedIn = computed(() => !!authStore.user);

// --- UI STATE ---
const labActive = ref(false);

// --- STATIONS (quick links) ---
const stations = [
  {
    name: "Тесты",
    subtitle: "Оценка функций",
    link: "/lab/tests",
    icon: "fas fa-brain",
    gradientFrom: "blue-500",
    gradientTo: "indigo-600",
    hoverBorder: "hover:border-blue-500/60",
  },
  {
    name: "Развивающие игры",
    subtitle: "Логика и память",
    link: "/lab/brain-training",
    icon: "fas fa-chess",
    gradientFrom: "green-500",
    gradientTo: "emerald-600",
    hoverBorder: "hover:border-green-500/60",
  },
  {
    name: "Когнитивные Модели",
    subtitle: "Ментальные схемы",
    link: "/lab/brain-training",
    icon: "fas fa-project-diagram",
    gradientFrom: "indigo-500",
    gradientTo: "purple-600",
    hoverBorder: "hover:border-indigo-500/60",
  },
  {
    name: "Психология",
    subtitle: "Теории и техники",
    link: "/lab/psychology",
    icon: "fas fa-book-open",
    gradientFrom: "purple-500",
    gradientTo: "pink-600",
    hoverBorder: "hover:border-purple-500/60",
  },
  {
    name: "Медитация",
    subtitle: "Аудио и видео",
    link: "/lab/mindfulness",
    icon: "fas fa-spa",
    gradientFrom: "teal-500",
    gradientTo: "cyan-600",
    hoverBorder: "hover:border-teal-500/60",
  },
  {
    name: "Звукотерапия",
    subtitle: "Бинауральные ритмы",
    link: "/lab/sound-therapy",
    icon: "fas fa-music",
    gradientFrom: "indigo-500",
    gradientTo: "purple-600",
    hoverBorder: "hover:border-indigo-500/60",
  },
  {
    name: "Перепрошивка",
    subtitle: "Работа с привычками",
    link: "/lab/psychology/habit-override",
    icon: "fas fa-sync-alt",
    gradientFrom: "cyan-500",
    gradientTo: "blue-600",
    hoverBorder: "hover:border-cyan-500/60",
  },
  {
    name: "Карта Мозга",
    subtitle: "Интерактивная",
    link: "/lab/brain-map",
    icon: "fas fa-map",
    gradientFrom: "orange-500",
    gradientTo: "red-600",
    hoverBorder: "hover:border-orange-500/60",
  },
  {
    name: "Нейро Анализ",
    subtitle: "Картирование мозга",
    link: "/lab/dashboard",
    icon: "fas fa-microchip",
    gradientFrom: "cyan-500",
    gradientTo: "blue-600",
    hoverBorder: "hover:border-cyan-500/60",
  },
  {
    name: "Эксперименты",
    subtitle: "Инструменты и тесты",
    link: "/lab/experiments",
    icon: "fas fa-atom",
    gradientFrom: "purple-500",
    gradientTo: "pink-600",
    hoverBorder: "hover:border-purple-500/60",
  },
  {
    name: "Обсерватория роста",
    subtitle: "Прогресс и аналитика",
    link: "/lab/analysis",
    icon: "fas fa-chart-line",
    gradientFrom: "emerald-500",
    gradientTo: "green-600",
    hoverBorder: "hover:border-emerald-500/60",
  },
  {
    name: "Сообщество",
    subtitle: "Исследователи онлайн",
    link: "/lab/community",
    icon: "fas fa-users",
    gradientFrom: "orange-500",
    gradientTo: "amber-600",
    hoverBorder: "hover:border-orange-500/60",
  },
];

// --- FEATURES ---
const features = [
  {
    title: "Научный подход",
    description:
      "Все тесты и методики основаны на проверенных психологических исследованиях",
    icon: "fas fa-microscope",
  },
  {
    title: "Персонализация",
    description:
      "Индивидуальные рекомендации на основе ваших результатов и прогресса",
    icon: "fas fa-user-cog",
  },
  {
    title: "Геймификация",
    description:
      "Увлекательные игры и челленджи для развития когнитивных способностей",
    icon: "fas fa-trophy",
  },
  {
    title: "Отслеживание прогресса",
    description: "Визуализация вашего роста и достижений в удобном формате",
    icon: "fas fa-chart-bar",
  },
  {
    title: "Сообщество",
    description: "Обменивайтесь опытом с единомышленниками на пути к развитию",
    icon: "fas fa-users",
  },
  {
    title: "Доступность",
    description: "Бесплатный доступ к базовым функциям на всех устройствах",
    icon: "fas fa-mobile-alt",
  },
];

// --- SEO META TAGS ---
const {
  public: { siteUrl },
} = useRuntimeConfig();

const title = "MindQLab – Твоя лаборатория осознанного роста";
const description =
  "Исследуй себя, проходи тесты, развивай мышление и личность с MindQLab – психологической лабораторией нового поколения.";
const imageUrl = `${siteUrl}/mindqlab-social-card.png`;

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: imageUrl,
  ogUrl: siteUrl,
  ogType: "website",
  ogSiteName: "MindQLab",
  twitterCard: "summary_large_image",
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: imageUrl,
});
</script>

<style scoped>
/* Enhanced Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
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

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

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

/* Animation classes */
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out backwards;
}

.animate-fade-in-left {
  animation: fadeInLeft 0.8s ease-out backwards;
}

.animate-fade-in-right {
  animation: fadeInRight 0.8s ease-out backwards;
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

/* Station items and feature cards */
.station-item {
  animation: slideIn 0.6s ease-out backwards;
}

.feature-card {
  animation: fadeInUp 0.8s ease-out backwards;
}

.stats-card {
  animation: fadeInUp 0.8s ease-out backwards;
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

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
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
