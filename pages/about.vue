<template>
  <div class="min-h-screen bg-slate-950 text-white pt-2 sm:pt-4 pb-10">
    <!-- Main Content -->
    <main class="container mx-auto max-w-6xl px-4 py-8 md:py-12">
      <!-- Hero Section -->
      <section class="text-center mb-16">
        <div class="petri-hero mb-8">
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
            О MindQ Lab —
            <span
              class="block sm:inline bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-fuchsia-400 animate-gradient"
            >
              Лаборатория осознанного роста
            </span>
          </h1>

          <!-- Description -->
          <p
            class="text-slate-300 text-center text-sm sm:text-base max-w-4xl mx-auto mb-6 leading-relaxed"
          >
            MindQ Lab — это инновационная платформа для исследования сознания и
            личностного роста, объединяющая современную психологию, нейронауки и
            интерактивные технологии.
          </p>
        </div>
      </section>

      <!-- Mission Section -->
      <section class="mb-16">
        <div
          class="bg-slate-900/40 backdrop-blur-sm rounded-2xl p-8 border border-slate-800/40 shadow-xl"
        >
          <div class="flex items-center mb-6">
            <div
              class="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center mr-4"
            >
              <i class="fas fa-bullseye text-cyan-400 text-xl"></i>
            </div>
            <h2 class="text-2xl font-semibold">Наша миссия</h2>
          </div>
          <p class="text-slate-300 text-lg leading-relaxed">
            Сделать инструменты самопознания и развития доступными для каждого.
            Мы создаем безопасное цифровое пространство, где вы можете
            исследовать свои мысли, эмоции и поведение через научно обоснованные
            тесты, игры и практики.
          </p>
        </div>
      </section>

      <!-- Approach Section -->
      <section class="mb-16">
        <h2 class="text-3xl font-bold text-center mb-12">
          Наш подход: <span class="text-cyan-400">Лаборатория роста</span>
        </h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Features Card -->
          <div
            class="bg-slate-900/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-800/40 shadow-xl"
          >
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div
                v-for="(feature, index) in features"
                :key="index"
                class="feature-card bg-slate-800/30 rounded-xl p-4 border border-slate-700/30 hover:border-cyan-500/40 transition-all duration-300"
              >
                <div
                  class="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center mb-3"
                >
                  <i :class="feature.icon + ' text-cyan-400 text-lg'"></i>
                </div>
                <h3 class="text-lg font-semibold mb-2 text-white">
                  {{ feature.title }}
                </h3>
                <p class="text-sm text-slate-400 leading-relaxed">
                  {{ feature.description }}
                </p>
              </div>
            </div>
          </div>

          <!-- Stats Card -->
          <div
            class="bg-slate-900/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-800/40 shadow-xl"
          >
            <div class="flex items-center mb-6">
              <div
                class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mr-4"
              >
                <i class="fas fa-chart-bar text-purple-400 text-xl"></i>
              </div>
              <h2 class="text-2xl font-semibold">В цифрах</h2>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="text-center p-4 bg-slate-800/30 rounded-lg">
                <div class="text-2xl font-bold text-cyan-400">12+</div>
                <div
                  class="text-xs text-slate-400 sm:uppercase sm:tracking-wide"
                >
                  Психологических тестов
                </div>
              </div>
              <div class="text-center p-4 bg-slate-800/30 rounded-lg">
                <div class="text-2xl font-bold text-purple-400">8+</div>
                <div
                  class="text-xs text-slate-400 sm:uppercase sm:tracking-wide"
                >
                  Развивающих игр
                </div>
              </div>
              <div class="text-center p-4 bg-slate-800/30 rounded-lg">
                <div class="text-2xl font-bold text-pink-400">25+</div>
                <div
                  class="text-xs text-slate-400 sm:uppercase sm:tracking-wide"
                >
                  Образовательных курсов
                </div>
              </div>
              <div class="text-center p-4 bg-slate-800/30 rounded-lg">
                <div class="text-2xl font-bold text-green-400">5+</div>
                <div
                  class="text-xs text-slate-400 sm:uppercase sm:tracking-wide"
                >
                  Интерактивных инструментов
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Team Section -->
      <section class="mb-16">
        <h2 class="text-3xl font-bold text-center mb-12">
          Команда <span class="text-cyan-400">лаборатории</span>
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Team Member 1 -->
          <div
            class="bg-slate-900/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-800/40 shadow-xl hover:border-cyan-500/40 transition-all duration-300"
          >
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0">
                <img
                  src="/assets/images/profile.jpg"
                  alt="Анастасия Гельмут"
                  class="w-24 h-24 z-20 rounded-full border-4 border-[#1E293B] object-cover shadow-lg transition-all duration-500 group-hover:scale-105"
                />
              </div>
              <div>
                <h3 class="text-xl font-semibold text-cyan-400 mb-1">
                  Анастасия Гельмут
                </h3>
                <p class="text-sm text-purple-400 font-medium mb-3">
                  Руководитель по психологии и контенту
                </p>
                <p class="text-slate-300 text-sm leading-relaxed">
                  Создает психологическую основу MindQ Lab, объединяя
                  современные методики и научные подходы в области когнитивной
                  психологии и личностного роста.
                </p>
              </div>
            </div>
          </div>

          <!-- Team Member 2 -->
          <div
            class="bg-slate-900/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-800/40 shadow-xl hover:border-purple-500/40 transition-all duration-300"
          >
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0">
                <img
                  src="/assets/images/igal.avif"
                  alt="Игаль Виленский"
                  class="w-24 h-24 rounded-full border-4 border-[#1E293B] object-cover shadow-lg transition-all duration-500 group-hover:scale-105"
                />
              </div>
              <div>
                <h3 class="text-xl font-semibold text-purple-400 mb-1">
                  Игаль Виленский
                </h3>
                <p class="text-sm text-pink-400 font-medium mb-3">
                  Технический руководитель
                </p>
                <p class="text-slate-300 text-sm leading-relaxed">
                  Отвечает за техническую реализацию MindQ Lab, включая
                  интерактивные инструменты, тесты и игровые механики для
                  вовлечения пользователей.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section>
        <div
          class="bg-slate-900/40 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20 shadow-xl text-center"
        >
          <h2 class="text-2xl sm:text-3xl font-bold mb-4">
            Начните исследовать себя
          </h2>
          <p class="text-slate-300 mb-6 max-w-2xl mx-auto">
            Присоединяйтесь к MindQ Lab, чтобы открыть свой потенциал через
            научные тесты, развивающие игры и поддерживающее сообщество.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink
              to="/lab/tests"
              class="inline-flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-medium shadow-lg hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300"
            >
              <i class="fas fa-vial"></i>
              <span>Начать с тестов</span>
            </NuxtLink>
            <NuxtLink
              to="/courses/courses"
              class="inline-flex items-center justify-center gap-3 px-6 py-3 border border-purple-500/30 rounded-xl text-slate-200 hover:bg-purple-500/10 hover:border-purple-500/50 transition-all duration-300"
            >
              <i class="fas fa-graduation-cap"></i>
              <span>Изучить курсы</span>
            </NuxtLink>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

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

// --- FEATURES ---
const features = [
  {
    title: "Научный подход",
    description:
      "Все методики основаны на современных психологических исследованиях и нейронауках",
    icon: "fas fa-microscope",
  },
  {
    title: "Интерактивные инструменты",
    description:
      "Практические упражнения для развития эмоционального интеллекта и самопознания",
    icon: "fas fa-tools",
  },
  {
    title: "Геймификация",
    description:
      "Увлекательные тесты и игры делают процесс развития интересным и мотивирующим",
    icon: "fas fa-gamepad",
  },
  {
    title: "Персонализация",
    description:
      "Индивидуальные рекомендации на основе ваших результатов и прогресса",
    icon: "fas fa-user-cog",
  },
];
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
