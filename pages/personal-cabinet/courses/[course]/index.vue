<template>
  <div class="w-full min-h-screen bg-gray-50/30">
    <div class="max-w-6xl mx-auto py-8 sm:py-12">
      <!-- Loading State -->
      <Loading v-if="loading" />

      <!-- Content when not loading -->
      <div v-else>
        <!-- Course Header -->
        <div class="flex flex-col lg:flex-row items-start gap-8 mb-8">
          <div class="lg:w-2/3">
            <div class="flex items-center gap-3 mb-4">
              <h1 class="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                {{ course?.title }}
              </h1>
            </div>
            <p class="text-gray-600 text-lg mb-6">
              {{ course?.description }}
            </p>
          </div>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div
            class="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300 group">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-500">Прогресс курса</p>
                <p class="text-2xl font-bold text-gray-900 mt-1">
                  {{ progress }}%
                </p>
                <p class="text-sm text-gray-500 mt-1">
                  {{ completedLessons?.length }} из
                  {{ course?.lessons?.length }} уроков
                </p>
              </div>
              <div class="bg-blue-50 p-4 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <i class="fas fa-chart-line text-blue-500 text-xl"></i>
              </div>
            </div>
          </div>

          <div
            class="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300 group">
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
              <div class="bg-purple-50 p-4 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <i class="fas fa-clock text-purple-500 text-xl"></i>
              </div>
            </div>
          </div>

          <div
            class="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300 group">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-500">Всего материала</p>
                <p class="text-2xl font-bold text-gray-900 mt-1">
                  {{ course?.lessons?.length }}
                </p>
                <p class="text-sm text-gray-500 mt-1">Видео-урок</p>
              </div>
              <div class="bg-green-50 p-4 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <i class="fas fa-video text-green-500 text-xl"></i>
              </div>
            </div>
          </div>

          <div
            class="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300 group">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-500">
                  Общая длительность
                </p>
                <p class="text-2xl font-bold text-gray-900 mt-1">
                  {{ course?.duration }}ч
                </p>
                <p class="text-sm text-gray-500 mt-1">Видео-контента</p>
              </div>
              <div class="bg-yellow-50 p-4 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <i class="fas fa-hourglass text-yellow-500 text-xl"></i>
              </div>
            </div>
          </div>
        </div>

        <!-- Next Lesson Card -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div class="p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-4">
              Продолжить обучение
            </h2>
            <div class="flex flex-col md:flex-row gap-6">
              <div class="md:w-1/3">
                <div class="aspect-video bg-gray-100 rounded-xl overflow-hidden">
                  <img :src="getImageUrl(course?.image)" :alt="nextLesson?.title" class="w-full h-full object-cover" />
                </div>
              </div>
              <div class="md:w-2/3">
                <div class="flex items-center gap-3 mb-3">
                  <span class="px-4 py-1.5 rounded-xl bg-blue-50 text-blue-600 text-sm font-medium">
                    Урок {{ nextLesson?.number }}
                  </span>
                  <span class="px-4 py-1.5 rounded-xl bg-gray-50 text-gray-600 text-sm">
                    {{ nextLesson?.duration }}
                  </span>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-3">
                  {{ nextLesson?.title }}
                </h3>
                <p class="text-gray-600 mb-4">{{ nextLesson?.description }}</p>
                <NuxtLink :to="`/personal-cabinet/courses/${course?.slug}/${nextLesson?.slug}`"
                  class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200">
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
            <div v-for="module in course.modules" :key="module.id"
              class="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-all duration-300">
              <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
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
import { useRoute } from "vue-router";
import { useAuthStore } from "~/stores/auth";
import { getPurchasedCourses } from "~/api/firebase/coursesApi";

definePageMeta({
  layout: "personal-cabinet",
});

const route = useRoute();
const authStore = useAuthStore();

const course = ref({}); // Combined course data (backend + static)
const completedLessons = ref([]); // Completed lessons from backend
const loading = ref(true);

// Fetch course data from backend and combine with static data
const fetchCourseData = async () => {
  const courseSlug = route.params.course;

  try {
    // Fetch purchased courses from backend
    const { success, data } = await getPurchasedCourses(authStore.user.uid);

    if (success) {
      // Fetch static course data from data/courses folder
      try {
        const courseModule = await import(`~/data/courses/${courseSlug}.js`);

        if (!courseModule || !courseModule.course) {
          throw new Error(
            "Static course data is undefined or not exported correctly."
          );
        }

        const staticCourse = courseModule.course;

        // Find the corresponding backend course using courseId or another unique identifier
        const backendCourse = data.find((c) => c.courseId === staticCourse.id);

        if (backendCourse) {
          // Combine backend and static data
          course.value = {
            ...staticCourse,
            progress: {
              progressPercentage:
                backendCourse.progress?.progressPercentage || 0,
              completedLessons: backendCourse.progress?.completedLessons || [],
              totalLessons: staticCourse.lessons.length,
            },
            status: backendCourse.status || "purchased",
            certificateEarned: backendCourse.certificateEarned || false,
          };

          // Set completed lessons
          completedLessons.value =
            backendCourse.progress?.completedLessons || [];
        } else {
          console.error(
            "No matching backend course found for static course ID:",
            staticCourse.id
          );
          // Fallback: Use static data only if no backend data is found
          course.value = {
            ...staticCourse,
            progress: {
              progressPercentage: 0,
              completedLessons: [],
              totalLessons: staticCourse.lessons.length,
            },
            status: "purchased",
            certificateEarned: false,
          };
        }
      } catch (error) {
        console.error("Ошибка при загрузке статических данных курса:", error);
        // Fallback: Use backend data only if static data fails to load
        const backendCourse = data.find((c) => c.courseId === courseSlug); // Fallback to courseSlug as ID
        if (backendCourse) {
          course.value = {
            ...backendCourse,
            lessons: [], // No static lessons available
          };
        } else {
          console.error(
            "No backend or static data found for course:",
            courseSlug
          );
        }
      }
    }
  } catch (error) {
    console.error("Ошибка при загрузке данных курса:", error);
  } finally {
    loading.value = false;
  }
};

// Course progress
const progress = computed(() => {
  const totalLessons = course.value.lessons?.length || 0;
  const completed = completedLessons.value.length;
  return totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;
});

const remainingTime = computed(() => {
  const parseDuration = (duration) => {
    const hoursMatch = duration.match(/(\d+)\s*час/);
    const minutesMatch = duration.match(/(\d+)\s*минут/);
    const hours = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;
    const minutes = minutesMatch ? parseInt(minutesMatch[1], 10) : 0;
    return hours * 60 + minutes;
  };

  const totalMinutes =
    course.value.lessons
      ?.filter((lesson) => !completedLessons.value.includes(lesson.slug))
      .reduce((sum, lesson) => sum + parseDuration(lesson.duration), 0) || 0;

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0) {
    return `${hours}ч ${minutes}мин`;
  } else {
    return `${minutes}мин`;
  }
});

// Next lesson is the first incomplete lesson or the first lesson
const nextLesson = computed(() => {
  if (!course.value.lessons) return null;

  const firstIncompleteLesson = course.value.lessons.find(
    (lesson) => !completedLessons.value.includes(lesson.slug)
  );
  return firstIncompleteLesson || course.value.lessons[0];
});

// Function to dynamically resolve image URLs
const getImageUrl = (imageName) => {
  return new URL(`/assets/images/courses/${imageName}`, import.meta.url).href;
};

onMounted(async () => {
  await fetchCourseData();
});
</script>
