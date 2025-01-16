<template>
  <div
    class="transition-all duration-300 min-h-screen md:w-auto"
    :class="containerClasses"
  >
    <!-- Header Section -->
    <div class="space-y-4 mb-6">
      <div class="flex flex-col space-y-2">
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 break-words">
          Добро пожаловать, {{ userName }}!
        </h1>
        <p class="text-gray-600">
          {{ getCurrentTimeGreeting() }}
        </p>
      </div>
      <div class="flex justify-start sm:justify-end">
        <div>
          <p class="text-sm text-gray-500">Последний визит</p>
          <p class="text-gray-700">{{ formatDate(lastVisit) }}</p>
        </div>
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      <div
        class="bg-white rounded-xl shadow-sm p-4 border border-gray-100 w-full"
      >
        <div class="flex items-center justify-between">
          <div class="min-w-0 flex-1">
            <!-- Added min-w-0 to prevent text overflow -->
            <p class="text-sm font-medium text-gray-500 truncate">
              Активные курсы
            </p>
            <p class="text-xl sm:text-2xl font-semibold text-gray-900">
              {{ activeCourses }}
            </p>
          </div>
          <div class="bg-blue-50 p-2 sm:p-3 rounded-lg flex-shrink-0 ml-4">
            <i class="fas fa-book text-blue-500 text-lg"></i>
          </div>
        </div>
        <div class="mt-4">
          <div class="flex items-center flex-wrap gap-2">
            <span class="text-sm text-gray-500">Прогресс</span>
            <span class="text-sm text-green-500">+5% с прошлой недели</span>
          </div>
          <div class="w-full bg-gray-100 rounded-full h-2 mt-2">
            <div
              class="bg-blue-500 h-2 rounded-full"
              :style="{ width: '65%' }"
            ></div>
          </div>
        </div>
      </div>

      <div
        class="bg-white rounded-xl shadow-sm p-4 border border-gray-100 w-full"
      >
        <div class="flex items-center justify-between">
          <div class="min-w-0 flex-1">
            <p class="text-sm font-medium text-gray-500 truncate">
              Выполнено заданий
            </p>
            <p class="text-xl sm:text-2xl font-semibold text-gray-900">
              {{ completedTasks }}
            </p>
          </div>
          <div class="bg-green-50 p-2 sm:p-3 rounded-lg flex-shrink-0 ml-4">
            <i class="fas fa-check-circle text-green-500 text-lg"></i>
          </div>
        </div>
        <div class="mt-4">
          <div class="flex items-center flex-wrap gap-2">
            <span class="text-sm text-gray-500">На этой неделе</span>
            <span class="text-sm text-green-500">12 заданий</span>
          </div>
          <div class="w-full bg-gray-100 rounded-full h-2 mt-2">
            <div
              class="bg-green-500 h-2 rounded-full"
              :style="{ width: '75%' }"
            ></div>
          </div>
        </div>
      </div>

      <div
        class="bg-white rounded-xl shadow-sm p-4 border border-gray-100 w-full"
      >
        <div class="flex items-center justify-between">
          <div class="min-w-0 flex-1">
            <p class="text-sm font-medium text-gray-500 truncate">
              Часы обучения
            </p>
            <p class="text-xl sm:text-2xl font-semibold text-gray-900">
              {{ studyHours }}
            </p>
          </div>
          <div class="bg-purple-50 p-2 sm:p-3 rounded-lg flex-shrink-0 ml-4">
            <i class="fas fa-clock text-purple-500 text-lg"></i>
          </div>
        </div>
        <div class="mt-4">
          <div class="flex items-center flex-wrap gap-2">
            <span class="text-sm text-gray-500">Среднее в день</span>
            <span class="text-sm text-purple-500">2.5 часа</span>
          </div>
          <div class="w-full bg-gray-100 rounded-full h-2 mt-2">
            <div
              class="bg-purple-500 h-2 rounded-full"
              :style="{ width: '85%' }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <NuxtLink
        to="/personal-cabinet/courses"
        class="group relative bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition-all duration-200 w-full"
      >
        <div class="flex items-center">
          <div class="bg-blue-50 p-3 rounded-lg flex-shrink-0">
            <i class="fas fa-book text-blue-500 text-lg"></i>
          </div>
          <div class="min-w-0 flex-1 ml-4">
            <h2
              class="text-lg font-semibold text-gray-900 group-hover:text-blue-600 truncate"
            >
              Ваши курсы
            </h2>
            <p class="mt-1 text-sm text-gray-600 truncate">
              {{ activeCourses }} активных курсов ждут вашего внимания
            </p>
          </div>
          <div class="flex-shrink-0 ml-4">
            <span
              class="text-blue-500 group-hover:translate-x-1 transition-transform duration-200"
              >→</span
            >
          </div>
        </div>
      </NuxtLink>

      <NuxtLink
        to="/personal-cabinet/progress"
        class="group relative bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition-all duration-200 w-full"
      >
        <div class="flex items-center">
          <div class="bg-green-50 p-3 rounded-lg flex-shrink-0">
            <i class="fas fa-chart-line text-green-500 text-lg"></i>
          </div>
          <div class="min-w-0 flex-1 ml-4">
            <h2
              class="text-lg font-semibold text-gray-900 group-hover:text-green-600 truncate"
            >
              Ваш прогресс
            </h2>
            <p class="mt-1 text-sm text-gray-600 truncate">
              Отслеживайте свои достижения и результаты
            </p>
          </div>
          <div class="flex-shrink-0 ml-4">
            <span
              class="text-green-500 group-hover:translate-x-1 transition-transform duration-200"
              >→</span
            >
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

definePageMeta({
  layout: "personal-cabinet",
});

// Props
const props = defineProps({
  isSidebarCollapsed: {
    type: Boolean,
    default: false,
  },
});

// Computed
const containerClasses = computed(() => ({
  "px-4": true,
  "py-6": true,
}));

// Mock data - replace with real data from your API
const userName = ref("Иван Иванов");
const activeCourses = ref(3);
const completedTasks = ref(48);
const studyHours = ref(76);
const lastVisit = ref(new Date(Date.now() - 24 * 60 * 60 * 1000)); // yesterday

const getCurrentTimeGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Доброе утро! Готовы к новым знаниям?";
  if (hour < 17) return "Добрый день! Продолжим обучение?";
  return "Добрый вечер! Время для новых достижений!";
};

const formatDate = (date) => {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};
</script>
