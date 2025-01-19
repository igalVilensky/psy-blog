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

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-8">
        <i class="fas fa-spinner fa-spin text-2xl text-blue-500"></i>
        <p class="mt-2 text-gray-600">Загрузка данных...</p>
      </div>

      <!-- Quick Stats -->
      <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
      >
        <div
          class="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300 group"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">Активные курсы</p>
              <p class="text-2xl font-bold text-gray-900 mt-1">
                {{ activeCourses }}
              </p>
              <p class="text-sm text-gray-500 mt-1">
                Прогресс: {{ lastWeekProgress.progressPercentage.toFixed(1) }}%
              </p>
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
                :style="{ width: `${lastWeekProgress.progressPercentage}%` }"
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
                {{ completedTasks }} заданий на этой неделе
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
      <div v-if="!loading" class="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
import { ref, computed, onMounted } from "vue";
import { getFirestore } from "firebase/firestore";
import { useAuthStore } from "~/stores/auth";
import { getPurchasedCourses } from "~/api/firebase/coursesApi";

definePageMeta({
  layout: "personal-cabinet",
});

const authStore = useAuthStore();
const db = getFirestore(); // Initialize Firestore
const userName = ref(authStore.user?.displayName || "Гость");
const activeCourses = ref(0);
const completedTasks = ref(0);
const studyHours = ref(0);
const lastVisit = ref(new Date());
const loading = ref(true); // Add a loading state
const course = ref(null); // Add a course ref to store course data

// Fetch purchased courses and update stats
const fetchPurchasedCourses = async () => {
  if (authStore.user) {
    try {
      const { success, data } = await getPurchasedCourses(authStore.user.uid);

      if (success) {
        activeCourses.value = data.length;
        completedTasks.value = data.reduce(
          (acc, course) =>
            acc + (course.progress?.completedLessons?.length || 0),
          0
        );
        studyHours.value = data.reduce(
          (acc, course) => acc + parseInt(course.progress?.timeSpent || 0),
          0
        );

        // Ensure lastVisit is a valid date
        const lastAccessed = data[0]?.lastAccessed;
        lastVisit.value =
          lastAccessed && !isNaN(new Date(lastAccessed))
            ? new Date(lastAccessed)
            : new Date(); // Fallback to current date

        // Store all course data for progress calculation
        course.value = data; // Updated to store all courses

        // Debugging: Log the lastAccessed value and lastVisit
        console.log("Fetched Data:", data);
        console.log("Last Accessed:", lastAccessed);
        console.log("Last Visit:", lastVisit.value);
      }
    } catch (error) {
      console.error("Ошибка при загрузке данных курсов:", error);
    } finally {
      loading.value = false; // Set loading to false after fetching
    }
  }
};

// Greeting based on time of day
const getCurrentTimeGreeting = () => {
  const hour = new Date().getHours();
  if (hour >= 22 || hour < 6)
    return "Доброй ночи! Самое время для отдыха и восстановления.";
  if (hour < 12) return "Доброе утро! Готовы к новым знаниям?";
  if (hour < 17) return "Добрый день! Продолжим обучение?";
  return "Добрый вечер! Время для новых достижений!";
};

// Format date for display
const formatDate = (date) => {
  if (!date || !(date instanceof Date) || isNaN(date)) {
    return "Дата недоступна"; // Fallback message for invalid dates
  }
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

// Calculate progress for the last week
// Calculate progress for the last week across all courses
const lastWeekProgress = computed(() => {
  console.log("Calculating lastWeekProgress...");

  // Check if course data exists
  if (!course.value || !Array.isArray(course.value)) {
    console.error("Course data is missing or invalid.");
    return { progressPercentage: 0 };
  }

  let totalLessonsCompleted = 0;
  let totalLessons = 0;

  // Iterate through all courses to calculate total progress
  course.value.forEach((course) => {
    const { progress } = course;
    const { completedLessons } = progress || {};

    // Sum up completed lessons and total lessons
    totalLessonsCompleted += completedLessons?.length || 0;
    totalLessons += course.totalLessons || 0;
  });

  console.log("Total Lessons Completed:", totalLessonsCompleted);
  console.log("Total Lessons Across All Courses:", totalLessons);

  // Calculate the progress percentage
  const progressPercentage =
    totalLessons > 0 ? (totalLessonsCompleted / totalLessons) * 100 : 0;
  console.log("Overall Progress Percentage:", progressPercentage);

  return {
    progressPercentage: Math.min(progressPercentage, 100), // Ensure it doesn't exceed 100%
  };
});

// Fetch data on mounted
onMounted(async () => {
  await fetchPurchasedCourses();
});
</script>
