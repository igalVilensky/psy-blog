<template>
  <div class="w-full min-h-screen bg-gray-50/30">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <!-- Loading State -->
      <Loading v-if="loading" />

      <!-- Content when not loading -->
      <div v-else>
        <!-- Course Header -->
        <div class="flex flex-col lg:flex-row items-start gap-8 mb-8">
          <div class="lg:w-2/3">
            <div class="flex items-center gap-3 mb-4">
              <h1
                class="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
              >
                {{ course.title }}
              </h1>
            </div>
            <p class="text-gray-600 text-lg mb-6">
              {{ course.description }}
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
                  {{ completedLessons.length }} из {{ lessons.length }} уроков
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
                <p class="text-sm font-medium text-gray-500">
                  Осталось времени
                </p>
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
                <p class="text-2xl font-bold text-gray-900 mt-1">
                  {{ lessons.length }}
                </p>
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
                  {{ course.duration }}ч
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
                <div
                  class="aspect-video bg-gray-100 rounded-xl overflow-hidden"
                >
                  <img
                    :src="getImageUrl(course.image)"
                    :alt="nextLesson.title"
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
                <NuxtLink
                  :to="`/personal-cabinet/courses/healing-childhood-traumas/${nextLesson.slug}`"
                  class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200"
                >
                  <i class="fas fa-play mr-2"></i>
                  Начать урок
                </NuxtLink>
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
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "~/stores/auth";
import { getFirestore } from "firebase/firestore";
import {
  getPurchasedCourses,
  updateCourseProgress,
} from "~/api/firebase/courses";
import { course, lessons } from "~/data/courses/healingChildhoodTraumas";

definePageMeta({
  layout: "personal-cabinet",
});

const authStore = useAuthStore();
const db = getFirestore();

const completedLessons = ref([]); // Completed lessons from Firebase
const loading = ref(true);

// Fetch progress data from Firebase
const fetchProgressData = async () => {
  if (!authStore.user) return;

  try {
    const response = await getPurchasedCourses(db, authStore.user.uid);
    if (response.success && response.data.length > 0) {
      completedLessons.value =
        response.data[0].progress?.completedLessons || [];
    }
  } catch (error) {
    console.error("Ошибка при получении данных прогресса:", error);
  } finally {
    loading.value = false;
  }
};

// Course progress
const progress = computed(() => {
  const totalLessons = lessons.length;
  const completed = completedLessons.value.length;
  return Math.round((completed / totalLessons) * 100);
});

const remainingTime = computed(() => {
  const remainingLessons = lessons.length - completedLessons.value.length;
  const averageDuration = 30; // Average duration of a lesson in minutes
  const totalMinutes = remainingLessons * averageDuration;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}ч ${minutes}мин`;
});

// Next lesson is the first incomplete lesson or the first lesson
const nextLesson = computed(() => {
  const firstIncompleteLesson = lessons.find(
    (lesson) => !completedLessons.value.includes(lesson.slug)
  );
  return firstIncompleteLesson || lessons[0]; // Fallback to the first lesson
});

// Function to dynamically resolve image URLs
const getImageUrl = (imageName) => {
  return new URL(`/assets/images/courses/${imageName}`, import.meta.url).href;
};

// Mark lesson as completed
const markLessonAsCompleted = async (lessonSlug) => {
  if (!authStore.user) return;

  try {
    const response = await updateCourseProgress(
      db,
      authStore.user.uid,
      "course_1", // Hardcoded course ID
      lessonSlug // Lesson ID (slug)
    );

    if (response.success) {
      // Update local state
      completedLessons.value.push(lessonSlug);
    }
  } catch (error) {
    console.error("Ошибка при обновлении прогресса:", error);
  }
};

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

onMounted(async () => {
  await fetchProgressData();
});
</script>
