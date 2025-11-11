<template>
  <div class="min-h-screen bg-slate-950 text-white pt-2 sm:pt-4">
    <!-- System Header / Status Bar -->

    <!-- Main Content -->
    <main class="container mx-auto max-w-6xl px-4 py-8 md:py-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <!-- Left: Hero / Intro -->
        <section class="relative order-2 lg:order-1">
          <div class="petri-hero">
            <!-- Animated Petri Dish -->
            <div
              class="petri-dish w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 flex items-center justify-center relative overflow-hidden mx-auto mb-6 group cursor-pointer shadow-2xl"
              @mouseenter="labActive = true"
              @mouseleave="labActive = false"
            >
              <div
                class="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-purple-500/10 transition-opacity duration-300"
                :class="{ 'opacity-60': labActive }"
              ></div>
              <i
                class="fas fa-flask text-white text-3xl sm:text-4xl relative z-10 transition-transform duration-300"
                :class="{ 'scale-110 rotate-6': labActive }"
              ></i>
              <div
                v-if="labActive"
                class="absolute inset-0 border-2 border-cyan-400/40 rounded-full animate-ping"
              ></div>

              <!-- Floating particles effect -->
              <div class="absolute inset-0 overflow-hidden pointer-events-none">
                <div class="particle particle-1"></div>
                <div class="particle particle-2"></div>
                <div class="particle particle-3"></div>
              </div>
            </div>

            <!-- Title -->
            <h1
              class="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-4 leading-tight"
            >
              MindQ Lab —
              <span
                class="block sm:inline bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-fuchsia-400 animate-gradient"
              >
                Твоя лаборатория осознанного роста
              </span>
            </h1>

            <!-- Description -->
            <p
              class="text-slate-300 text-center text-sm sm:text-base max-w-2xl mx-auto mb-6 leading-relaxed"
            >
              Исследуй себя с помощью тестов и интерактивных инструментов,
              получай персональные рекомендации и обучающие программы — всё в
              одном месте.
            </p>

            <!-- CTA Buttons -->
            <div
              class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center"
            >
              <NuxtLink
                to="/lab/tests"
                class="inline-flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-medium shadow-lg hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300"
              >
                <i class="fas fa-vial"></i>
                <span class="text-sm sm:text-base">Пройти тест бесплатно</span>
                <i class="fas fa-arrow-right text-xs sm:text-sm"></i>
              </NuxtLink>

              <NuxtLink
                v-if="!isLoggedIn"
                to="/register"
                class="inline-flex items-center justify-center gap-2 sm:gap-3 px-5 py-3 border border-cyan-500/30 rounded-xl text-slate-200 hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-all duration-300"
              >
                <i class="fas fa-user-plus"></i>
                <span class="text-sm sm:text-base">Создать профиль</span>
              </NuxtLink>

              <NuxtLink
                v-else
                to="/home"
                class="inline-flex items-center justify-center gap-2 sm:gap-3 px-5 py-3 border border-purple-500/30 rounded-xl text-slate-200 hover:bg-purple-500/10 hover:border-purple-500/50 transition-all duration-300"
              >
                <i class="fas fa-home"></i>
                <span class="text-sm sm:text-base">Перейти в кабинет</span>
              </NuxtLink>
            </div>

            <!-- Quick Links -->
            <div class="mt-6 text-center text-slate-400 text-xs sm:text-sm">
              <span>Или сразу:</span>
              <NuxtLink
                to="/lab"
                class="ml-2 sm:ml-3 text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
              >
                Войти в лабораторию
              </NuxtLink>
              <span class="mx-2">•</span>
              <NuxtLink
                to="/courses/courses"
                class="text-purple-400 hover:text-purple-300 hover:underline transition-colors"
              >
                Курсы и гайды
              </NuxtLink>
            </div>
          </div>
        </section>

        <!-- Right: Features / Quick Access -->
        <aside class="order-1 lg:order-2">
          <div
            class="bg-slate-900/40 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-slate-800/40 shadow-xl hover:border-slate-700/60 transition-all duration-300"
          >
            <div class="flex items-center mb-5">
              <div
                class="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center mr-3"
              >
                <i class="fas fa-brain text-cyan-400 text-xl"></i>
              </div>
              <h2 class="text-lg sm:text-xl font-semibold">
                Исследовательские станции
              </h2>
            </div>

            <ul class="space-y-2.5 sm:space-y-3">
              <li
                v-for="(station, index) in stations"
                :key="station.name"
                class="group station-item"
                :style="{ animationDelay: `${index * 0.1}s` }"
              >
                <NuxtLink
                  :to="station.link"
                  class="flex items-center justify-between p-3 sm:p-4 rounded-lg bg-slate-800/40 hover:bg-slate-800/70 border border-slate-700/30 hover:border-cyan-500/40 transition-all duration-300 hover:translate-x-1"
                >
                  <div class="flex items-center space-x-3 flex-1 min-w-0">
                    <div
                      class="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/10 to-purple-500/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                    >
                      <i :class="station.icon + ' text-cyan-400 text-sm'" />
                    </div>
                    <span class="text-sm sm:text-base truncate">{{
                      station.name
                    }}</span>
                  </div>
                  <i
                    class="fas fa-arrow-right text-xs text-slate-500 group-hover:text-cyan-400 transition-colors ml-2 flex-shrink-0"
                  ></i>
                </NuxtLink>
              </li>
            </ul>

            <!-- Stats Summary (optional enhancement) -->
            <div class="mt-6 pt-5 border-t border-slate-800/40">
              <div class="grid grid-cols-3 gap-3 sm:gap-4 text-center">
                <div class="bg-slate-800/30 rounded-lg p-3">
                  <div class="text-lg sm:text-2xl font-bold text-cyan-400">
                    12+
                  </div>
                  <div class="text-xs text-slate-400">Тестов</div>
                </div>
                <div class="bg-slate-800/30 rounded-lg p-3">
                  <div class="text-lg sm:text-2xl font-bold text-purple-400">
                    8+
                  </div>
                  <div class="text-xs text-slate-400">Игр</div>
                </div>
                <div class="bg-slate-800/30 rounded-lg p-3">
                  <div class="text-lg sm:text-2xl font-bold text-pink-400">
                    25+
                  </div>
                  <div class="text-xs text-slate-400">Курсов</div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <!-- Additional Features Section -->
      <section class="mt-12 sm:mt-16 md:mt-20">
        <h2 class="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">
          Почему <span class="text-cyan-400">MindQ Lab</span>?
        </h2>

        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          <div
            v-for="(feature, index) in features"
            :key="feature.title"
            class="feature-card bg-slate-900/40 backdrop-blur-sm rounded-xl p-5 sm:p-6 border border-slate-800/40 hover:border-cyan-500/40 transition-all duration-300 hover:transform hover:-translate-y-1"
            :style="{ animationDelay: `${index * 0.15}s` }"
          >
            <div
              class="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center mb-4"
            >
              <i :class="feature.icon + ' text-2xl text-cyan-400'"></i>
            </div>
            <h3 class="text-lg font-semibold mb-2">{{ feature.title }}</h3>
            <p class="text-sm text-slate-400 leading-relaxed">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer
      class="container mx-auto max-w-6xl px-4 py-8 mt-12 border-t border-slate-800/40"
    >
      <div class="text-center text-slate-400 text-sm">
        <p>© 2024 MindQ Lab. Все права защищены.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useAuthStore } from "~/stores/auth";
import { useRuntimeConfig, useSeoMeta } from "#app";

// --- AUTH STATE ---
const authStore = useAuthStore();
const isLoggedIn = computed(() => !!authStore.user);
const userName = computed(() => authStore.user?.displayName || "Гость");

// --- UI STATE ---
const labActive = ref(false);
const nowString = ref("00:00:00");

const updateClock = () => {
  const now = new Date();
  nowString.value = now.toLocaleTimeString("ru-RU", { hour12: false });
};

onMounted(() => {
  updateClock();
  setInterval(updateClock, 1000);
});

// --- STATIONS (quick links) ---
const stations = [
  { name: "Когнитивные тесты", link: "/lab/tests", icon: "fas fa-vial" },
  { name: "Развивающие игры", link: "/lab/games", icon: "fas fa-gamepad" },
  { name: "Психология", link: "/lab/psychology", icon: "fas fa-brain" },
  { name: "Медитация", link: "/lab/meditation", icon: "fas fa-infinity" },
  {
    name: "Обсерватория роста",
    link: "/lab/growth",
    icon: "fas fa-chart-line",
  },
  { name: "Сообщество", link: "/community", icon: "fas fa-users" },
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

const title = "MindQLab — Твоя лаборатория осознанного роста";
const description =
  "Исследуй себя, проходи тесты, развивай мышление и личность с MindQLab — психологической лабораторией нового поколения.";
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
/* Animations */
.petri-hero {
  animation: fadeIn 1.2s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.station-item {
  animation: slideIn 0.6s ease-out backwards;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.feature-card {
  animation: fadeInUp 0.8s ease-out backwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Gradient animation */
@keyframes gradient {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.animate-gradient {
  background-size: 200% auto;
  animation: gradient 3s ease infinite;
}

/* Floating particles */
.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(34, 211, 238, 0.6);
  border-radius: 50%;
  animation: float 3s infinite ease-in-out;
}

.particle-1 {
  top: 20%;
  left: 20%;
  animation-delay: 0s;
}

.particle-2 {
  top: 60%;
  right: 20%;
  animation-delay: 1s;
}

.particle-3 {
  bottom: 20%;
  left: 60%;
  animation-delay: 2s;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) scale(1);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-10px) scale(1.2);
    opacity: 1;
  }
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .petri-dish {
    box-shadow: 0 10px 40px rgba(6, 182, 212, 0.3);
  }
}
</style>
