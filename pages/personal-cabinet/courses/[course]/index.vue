<template>
  <div class="relative min-h-screen bg-slate-900">
    <!-- Background gradients -->
    <div class="fixed inset-0">
      <div class="absolute top-0 left-0 w-full h-full bg-slate-900">
        <div
          class="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-slow-drift"
        ></div>
        <div
          class="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-slow-pulse"
        ></div>
      </div>
    </div>

    <div class="container mx-auto px-4 py-12 relative z-10">
      <!-- Course Header -->
      <div
        class="bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-blue-500/20 p-8 mb-8"
      >
        <div class="flex flex-col lg:flex-row gap-8">
          <!-- Course Info -->
          <div class="lg:w-2/3">
            <div class="flex items-center gap-4 mb-4">
              <span
                class="px-4 py-1.5 rounded-full bg-blue-500/20 text-cyan-300 text-sm font-medium"
              >
                21 уроков
              </span>
              <span
                class="px-4 py-1.5 rounded-full bg-purple-500/20 text-purple-300 text-sm font-medium"
              >
                {{ totalDuration }} часов
              </span>
            </div>
            <h1 class="text-3xl lg:text-4xl font-bold text-white mb-4">
              Исцеление детских травм
            </h1>
            <p class="text-gray-300 text-lg mb-6 leading-relaxed">
              Глубокое исследование и проработка детских травм через
              практические упражнения и теоретический материал. Курс поможет вам
              понять влияние прошлого на настоящее и научит техникам исцеления.
            </p>
            <div class="flex flex-wrap gap-4">
              <button
                class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors"
              >
                <i class="fas fa-play-circle"></i>
                Продолжить обучение
              </button>
              <button
                class="inline-flex items-center gap-2 px-6 py-3 bg-slate-700/50 hover:bg-slate-700/70 text-white rounded-xl transition-colors"
              >
                <i class="fas fa-book"></i>
                Материалы курса
              </button>
            </div>
          </div>

          <!-- Progress Card -->
          <div class="lg:w-1/3">
            <div
              class="bg-slate-700/50 rounded-xl p-6 border border-blue-500/20"
            >
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold text-white">Ваш прогресс</h3>
                <span class="text-2xl font-bold text-cyan-300"
                  >{{ progress }}%</span
                >
              </div>
              <!-- Progress Bar -->
              <div class="w-full h-3 bg-slate-600 rounded-full mb-6">
                <div
                  class="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                  :style="{ width: `${progress}%` }"
                ></div>
              </div>
              <!-- Stats -->
              <div class="grid grid-cols-2 gap-4">
                <div class="bg-slate-800/50 rounded-lg p-4">
                  <div class="text-gray-400 text-sm mb-1">Завершено</div>
                  <div class="text-white font-semibold">
                    {{ completedLessons }} из 21
                  </div>
                </div>
                <div class="bg-slate-800/50 rounded-lg p-4">
                  <div class="text-gray-400 text-sm mb-1">Осталось</div>
                  <div class="text-white font-semibold">
                    {{ remainingTime }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Next Lesson Section -->
      <div
        class="bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-blue-500/20 p-8 mb-8"
      >
        <h2 class="text-2xl font-bold text-white mb-6">Следующий урок</h2>
        <div class="flex flex-col md:flex-row gap-6 items-center">
          <div class="md:w-1/3">
            <div class="aspect-video bg-slate-700 rounded-xl overflow-hidden">
              <img
                :src="nextLesson.thumbnail"
                alt="Thumbnail"
                class="w-full h-full object-cover"
              />
            </div>
          </div>
          <div class="md:w-2/3">
            <div class="flex items-center gap-3 mb-3">
              <span
                class="px-4 py-1.5 rounded-full bg-blue-500/20 text-cyan-300 text-sm font-medium"
              >
                Урок {{ nextLesson.number }}
              </span>
              <span
                class="px-4 py-1.5 rounded-full bg-slate-700/50 text-gray-300 text-sm"
              >
                {{ nextLesson.duration }}
              </span>
            </div>
            <h3 class="text-xl font-bold text-white mb-3">
              {{ nextLesson.title }}
            </h3>
            <p class="text-gray-300 mb-4">{{ nextLesson.description }}</p>
            <button
              class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors"
            >
              <i class="fas fa-play"></i>
              Начать урок
            </button>
          </div>
        </div>
      </div>

      <!-- Course Structure -->
      <div
        class="bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-blue-500/20 p-8"
      >
        <h2 class="text-2xl font-bold text-white mb-6">Структура курса</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="module in courseModules"
            :key="module.id"
            class="bg-slate-700/50 rounded-xl p-6 border border-blue-500/20"
          >
            <div
              class="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4"
            >
              <i :class="module.icon" class="text-cyan-300 text-xl"></i>
            </div>
            <h3 class="text-lg font-semibold text-white mb-2">
              {{ module.title }}
            </h3>
            <p class="text-gray-300 text-sm">{{ module.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

definePageMeta({
  layout: "personal-cabinet",
});

// Course progress
const progress = ref(35);
const completedLessons = ref(7);
const remainingTime = ref("5ч 15мин");
const totalDuration = ref(8);

// Next lesson data
const nextLesson = ref({
  number: 8,
  title: "Травма Изгнания из общества",
  description:
    "В этом уроке мы рассмотрим влияние травмы изгнания на формирование личности и социальные взаимодействия.",
  duration: "28 минут",
  thumbnail: "/images/lessons/lesson-8-thumbnail.jpg",
});

// Course structure
const courseModules = ref([
  {
    id: 1,
    title: "Основы и теория",
    description:
      "Базовые концепции детских травм и их влияние на развитие личности",
    icon: "fas fa-book",
  },
  {
    id: 2,
    title: "Типы травм",
    description:
      "Исследование различных видов травм и их специфических проявлений",
    icon: "fas fa-brain",
  },
  {
    id: 3,
    title: "Практика исцеления",
    description: "Техники и методики для проработки и исцеления травм",
    icon: "fas fa-heart",
  },
  {
    id: 4,
    title: "Интеграция",
    description: "Применение полученных знаний в повседневной жизни",
    icon: "fas fa-puzzle-piece",
  },
  {
    id: 5,
    title: "Отношения",
    description: "Влияние травм на построение здоровых отношений",
    icon: "fas fa-users",
  },
  {
    id: 6,
    title: "Самоподдержка",
    description: "Инструменты для поддержания долгосрочных результатов",
    icon: "fas fa-seedling",
  },
]);
</script>
<style scoped>
@keyframes slow-drift {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(20px, 20px);
  }
  100% {
    transform: translate(0, 0);
  }
}

@keyframes slow-pulse {
  0% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.3;
  }
  100% {
    transform: scale(1);
    opacity: 0.5;
  }
}

.animate-slow-drift {
  animation: slow-drift 20s infinite;
}

.animate-slow-pulse {
  animation: slow-pulse 15s infinite;
}
</style>
