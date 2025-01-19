<template>
  <div class="w-full min-h-screen bg-gray-50/30">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <!-- Enhanced Header Section -->
      <div
        class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8"
      >
        <div class="flex-1">
          <h1
            class="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
          >
            Ваш прогресс обучения
          </h1>
          <p class="text-gray-600 mt-3 text-lg max-w-2xl">
            Отслеживайте свой путь к успеху. Здесь вы можете видеть прогресс по
            всем курсам и достижения.
          </p>
        </div>

        <!-- Overall Progress Card -->
        <div
          class="mt-6 sm:mt-0 sm:ml-8 p-6 bg-white rounded-2xl shadow-sm border border-gray-100"
        >
          <div class="flex items-center space-x-4">
            <div class="bg-blue-50 p-4 rounded-xl">
              <i class="fas fa-chart-line text-blue-500 text-2xl"></i>
            </div>
            <div>
              <p class="text-sm text-gray-500">Общий прогресс</p>
              <p class="text-2xl font-bold text-gray-900">
                {{ calculateOverallProgress() }}%
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State with Skeleton -->
      <div v-if="loading" class="grid gap-6 md:grid-cols-2">
        <div
          v-for="n in 2"
          :key="n"
          class="bg-white rounded-2xl shadow-sm p-6 border border-gray-100"
        >
          <div class="animate-pulse">
            <div class="flex items-center justify-between mb-4">
              <div class="space-y-3">
                <div class="h-4 bg-gray-200 rounded w-48"></div>
                <div class="h-3 bg-gray-200 rounded w-32"></div>
              </div>
              <div class="w-12 h-12 bg-gray-200 rounded-xl"></div>
            </div>
            <div class="space-y-3">
              <div class="h-2 bg-gray-200 rounded"></div>
              <div class="h-2 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced Course Progress List -->
      <div v-else class="grid gap-6 md:grid-cols-2">
        <div
          v-for="course in courses"
          :key="course.id"
          class="group bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300"
        >
          <!-- Course Header -->
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <h2
                class="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors"
              >
                {{ course.title }}
              </h2>
              <div class="flex items-center mt-2 space-x-4">
                <p class="text-sm text-gray-500">
                  <i class="fas fa-calendar-alt mr-2"></i>
                  {{ formatDate(course.purchaseDate) }}
                </p>
                <p class="text-sm text-gray-500">
                  <i class="fas fa-book-open mr-2"></i>
                  {{ course.totalLessons }} уроков
                </p>
              </div>
            </div>
            <div
              class="bg-blue-50 p-4 rounded-xl group-hover:bg-blue-100 transition-colors"
            >
              <i class="fas fa-graduation-cap text-blue-500 text-xl"></i>
            </div>
          </div>

          <!-- Enhanced Progress Section -->
          <div class="mt-6">
            <div class="flex justify-between items-center mb-2">
              <p class="text-sm font-medium text-gray-700">Прогресс курса</p>
              <span class="text-sm font-bold text-blue-600">
                {{ calculateCourseProgress(course).toFixed(1) }}%
              </span>
            </div>
            <div class="relative w-full bg-gray-100 rounded-full h-3">
              <div
                class="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                :style="{ width: `${calculateCourseProgress(course)}%` }"
              ></div>
            </div>
          </div>

          <!-- Lesson Progress -->
          <div class="mt-6">
            <div class="flex justify-between items-center mb-3">
              <p class="text-sm font-medium text-gray-700">
                Завершено уроков:
                {{ course.progress?.completedLessons?.length || 0 }} из
                {{ course.totalLessons }}
              </p>
              <button
                @click="toggleLessonList(course.id)"
                class="text-blue-500 hover:text-blue-600 text-sm font-medium focus:outline-none"
              >
                {{
                  expandedCourses.includes(course.id) ? "Скрыть" : "Показать"
                }}
              </button>
            </div>

            <!-- Completed Lessons List -->
            <transition
              enter-active-class="transition-all duration-300 ease-in-out"
              leave-active-class="transition-all duration-300 ease-in-out"
              enter-from-class="opacity-0 max-h-0"
              enter-to-class="opacity-100 max-h-96"
              leave-from-class="opacity-100 max-h-96"
              leave-to-class="opacity-0 max-h-0"
            >
              <ul
                v-if="expandedCourses.includes(course.id)"
                class="mt-3 space-y-2 overflow-hidden"
              >
                <li
                  v-for="(lesson, index) in course.progress?.completedLessons"
                  :key="index"
                  class="flex items-center text-sm text-gray-600 bg-gray-50 p-2 rounded-lg"
                >
                  <i class="fas fa-check-circle text-green-500 mr-2"></i>
                  {{ lesson }}
                </li>
              </ul>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "~/stores/auth";
import { getPurchasedCourses } from "~/api/firebase/coursesApi";

definePageMeta({
  layout: "personal-cabinet",
});

const authStore = useAuthStore();
const courses = ref([]);
const loading = ref(true);
const expandedCourses = ref([]); // Track expanded course lists

// Toggle lesson list visibility
const toggleLessonList = (courseId) => {
  const index = expandedCourses.value.indexOf(courseId);
  if (index === -1) {
    expandedCourses.value.push(courseId);
  } else {
    expandedCourses.value.splice(index, 1);
  }
};

// Calculate overall progress across all courses
const calculateOverallProgress = () => {
  if (!courses.value.length) return 0;

  const totalProgress = courses.value.reduce((acc, course) => {
    return acc + calculateCourseProgress(course);
  }, 0);

  return Math.round(totalProgress / courses.value.length);
};

const calculateCourseProgress = (course) => {
  const { progress } = course;
  const { completedLessons } = progress || {};

  const lessonsCompleted = completedLessons?.length || 0;
  const totalLessons = course.totalLessons || 1;

  const progressPercentage = (lessonsCompleted / totalLessons) * 100;
  return Math.min(progressPercentage, 100);
};

const formatDate = (timestamp) => {
  if (!timestamp) return "Дата недоступна";

  const date = timestamp.toDate();
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

const fetchPurchasedCourses = async () => {
  if (authStore.user) {
    try {
      const { success, data } = await getPurchasedCourses(authStore.user.uid);
      if (success) {
        courses.value = data;
      }
    } catch (error) {
      console.error("Ошибка при загрузке данных курсов:", error);
    } finally {
      loading.value = false;
    }
  }
};

onMounted(async () => {
  await fetchPurchasedCourses();
});
</script>
