<template>
  <div class="w-full min-h-screen bg-gray-50/30">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <!-- Header Section -->
      <div
        class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 space-y-4 sm:space-y-0"
      >
        <div class="flex-1">
          <h1
            class="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
          >
            Добро пожаловать, {{ userName }}!
          </h1>
          <p class="text-gray-600 mt-2 text-lg">
            {{ getCurrentTimeGreeting() }}
          </p>
        </div>
        <div class="flex flex-wrap gap-3">
          <div class="text-right">
            <p class="text-sm text-gray-500">Последний визит</p>
            <p class="text-gray-700">{{ formatDate(lastVisit) }}</p>
          </div>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div
          class="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300 group"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">Активные курсы</p>
              <p class="text-2xl font-bold text-gray-900 mt-1">
                {{ activeCourses }}
              </p>
              <p class="text-sm text-gray-500 mt-1">+5% с прошлой недели</p>
            </div>
            <div
              class="bg-blue-50 p-4 rounded-xl group-hover:scale-110 transition-transform duration-300"
            >
              <i class="fas fa-book text-blue-500 text-xl"></i>
            </div>
          </div>
          <div class="mt-4">
            <div class="w-full bg-gray-100 rounded-full h-2.5">
              <div
                class="bg-blue-500 h-2.5 rounded-full"
                :style="{ width: '65%' }"
              ></div>
            </div>
          </div>
        </div>

        <div
          class="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300 group"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">Выполнено заданий</p>
              <p class="text-2xl font-bold text-gray-900 mt-1">
                {{ completedTasks }}
              </p>
              <p class="text-sm text-gray-500 mt-1">
                12 заданий на этой неделе
              </p>
            </div>
            <div
              class="bg-green-50 p-4 rounded-xl group-hover:scale-110 transition-transform duration-300"
            >
              <i class="fas fa-check-circle text-green-500 text-xl"></i>
            </div>
          </div>
          <div class="mt-4">
            <div class="w-full bg-gray-100 rounded-full h-2.5">
              <div
                class="bg-green-500 h-2.5 rounded-full"
                :style="{ width: '75%' }"
              ></div>
            </div>
          </div>
        </div>

        <div
          class="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300 group"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">Часы обучения</p>
              <p class="text-2xl font-bold text-gray-900 mt-1">
                {{ studyHours }}ч
              </p>
              <p class="text-sm text-gray-500 mt-1">Среднее 2.5 часа в день</p>
            </div>
            <div
              class="bg-purple-50 p-4 rounded-xl group-hover:scale-110 transition-transform duration-300"
            >
              <i class="fas fa-clock text-purple-500 text-xl"></i>
            </div>
          </div>
          <div class="mt-4">
            <div class="w-full bg-gray-100 rounded-full h-2.5">
              <div
                class="bg-purple-500 h-2.5 rounded-full"
                :style="{ width: '85%' }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <NuxtLink
          to="/personal-cabinet/courses"
          class="group bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-lg transition-all duration-300"
        >
          <div class="flex items-center">
            <div
              class="bg-blue-50 p-4 rounded-xl group-hover:scale-110 transition-transform duration-300"
            >
              <i class="fas fa-book text-blue-500 text-xl"></i>
            </div>
            <div class="ml-6 flex-1">
              <h2
                class="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200"
              >
                Ваши курсы
              </h2>
              <p class="mt-2 text-gray-600">
                {{ activeCourses }} активных курсов ждут вашего внимания
              </p>
            </div>
            <div
              class="text-blue-500 group-hover:translate-x-2 transition-transform duration-200"
            >
              <i class="fas fa-arrow-right text-xl"></i>
            </div>
          </div>
        </NuxtLink>

        <NuxtLink
          to="/personal-cabinet/progress"
          class="group bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-lg transition-all duration-300"
        >
          <div class="flex items-center">
            <div
              class="bg-green-50 p-4 rounded-xl group-hover:scale-110 transition-transform duration-300"
            >
              <i class="fas fa-chart-line text-green-500 text-xl"></i>
            </div>
            <div class="ml-6 flex-1">
              <h2
                class="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-200"
              >
                Ваш прогресс
              </h2>
              <p class="mt-2 text-gray-600">
                Отслеживайте свои достижения и результаты
              </p>
            </div>
            <div
              class="text-green-500 group-hover:translate-x-2 transition-transform duration-200"
            >
              <i class="fas fa-arrow-right text-xl"></i>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

definePageMeta({
  layout: "personal-cabinet",
});

// Mock data
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
