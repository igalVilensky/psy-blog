<template>
  <div class="w-full min-h-screen bg-gray-50/30">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <!-- Course Header -->
      <div class="flex flex-col lg:flex-row items-start gap-8 mb-8">
        <div class="lg:w-2/3">
          <div class="flex items-center gap-3 mb-4">
            <h1
              class="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
            >
              Исцеление детских травм
            </h1>
          </div>
          <p class="text-gray-600 text-lg mb-6">
            Глубокое исследование и проработка детских травм через практические
            упражнения и теоретический материал. Курс поможет вам понять влияние
            прошлого на настоящее и научит техникам исцеления.
          </p>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div
          class="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300 group"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">Прогресс курса</p>
              <p class="text-2xl font-bold text-gray-900 mt-1">
                {{ progress }}%
              </p>
              <p class="text-sm text-gray-500 mt-1">
                {{ completedLessons }} из 21 уроков
              </p>
            </div>
            <div
              class="bg-blue-50 p-4 rounded-xl group-hover:scale-110 transition-transform duration-300"
            >
              <i class="fas fa-chart-line text-blue-500 text-xl"></i>
            </div>
          </div>
        </div>

        <div
          class="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300 group"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">Осталось времени</p>
              <p class="text-2xl font-bold text-gray-900 mt-1">
                {{ remainingTime }}
              </p>
              <p class="text-sm text-gray-500 mt-1">До завершения</p>
            </div>
            <div
              class="bg-purple-50 p-4 rounded-xl group-hover:scale-110 transition-transform duration-300"
            >
              <i class="fas fa-clock text-purple-500 text-xl"></i>
            </div>
          </div>
        </div>

        <div
          class="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300 group"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">Всего материала</p>
              <p class="text-2xl font-bold text-gray-900 mt-1">21</p>
              <p class="text-sm text-gray-500 mt-1">Видео-урок</p>
            </div>
            <div
              class="bg-green-50 p-4 rounded-xl group-hover:scale-110 transition-transform duration-300"
            >
              <i class="fas fa-video text-green-500 text-xl"></i>
            </div>
          </div>
        </div>

        <div
          class="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300 group"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">
                Общая длительность
              </p>
              <p class="text-2xl font-bold text-gray-900 mt-1">
                {{ totalDuration }}ч
              </p>
              <p class="text-sm text-gray-500 mt-1">Видео-контента</p>
            </div>
            <div
              class="bg-yellow-50 p-4 rounded-xl group-hover:scale-110 transition-transform duration-300"
            >
              <i class="fas fa-hourglass text-yellow-500 text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Next Lesson Card -->
      <div
        class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8"
      >
        <div class="p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-4">
            Продолжить обучение
          </h2>
          <div class="flex flex-col md:flex-row gap-6">
            <div class="md:w-1/3">
              <div class="aspect-video bg-gray-100 rounded-xl overflow-hidden">
                <img
                  src="data:image/jpeg;base64,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"
                  alt="Thumbnail"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
            <div class="md:w-2/3">
              <div class="flex items-center gap-3 mb-3">
                <span
                  class="px-4 py-1.5 rounded-xl bg-blue-50 text-blue-600 text-sm font-medium"
                >
                  Урок {{ nextLesson.number }}
                </span>
                <span
                  class="px-4 py-1.5 rounded-xl bg-gray-50 text-gray-600 text-sm"
                >
                  {{ nextLesson.duration }}
                </span>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">
                {{ nextLesson.title }}
              </h3>
              <p class="text-gray-600 mb-4">{{ nextLesson.description }}</p>
              <button
                class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 shadow-sm"
              >
                <i class="fas fa-play mr-2"></i>
                Продолжить обучение
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Course Modules -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 class="text-xl font-bold text-gray-900 mb-6">Структура курса</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="module in courseModules"
            :key="module.id"
            class="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-all duration-300"
          >
            <div
              class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4"
            >
              <i :class="[module.icon, 'text-blue-500 text-xl']"></i>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">
              {{ module.title }}
            </h3>
            <p class="text-gray-600 text-sm">{{ module.description }}</p>
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
