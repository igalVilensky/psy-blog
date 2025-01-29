<template>
  <div class="w-full min-h-screen bg-gray-50/30">
    <div class="max-w-6xl mx-auto py-8 sm:py-12">
      <!-- Loading State -->
      <Loading v-if="loading" />

      <!-- Content when not loading -->
      <div v-else>
        <!-- Enhanced Header Section with Animation -->
        <div
          class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 space-y-4 sm:space-y-0"
        >
          <div class="flex-1">
            <h1
              class="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
            >
              Мои курсы
            </h1>
            <p class="text-gray-600 mt-2 text-lg">
              {{
                stats.totalCourses
                  ? "Отслеживайте и управляйте своим обучением"
                  : "Начните свой путь к обучению"
              }}
            </p>
          </div>
          <div class="flex flex-wrap gap-3">
            <button
              class="inline-flex items-center px-4 py-2.5 bg-white text-gray-700 rounded-xl hover:bg-gray-50 shadow-sm border border-gray-200 transition-all duration-200"
            >
              <i class="fas fa-sort-amount-down mr-2 text-gray-500"></i>
              Сортировать
            </button>
            <button
              class="inline-flex items-center px-4 py-2.5 bg-white text-gray-700 rounded-xl hover:bg-gray-50 shadow-sm border border-gray-200 transition-all duration-200"
            >
              <i class="fas fa-filter mr-2 text-gray-500"></i>
              Фильтр
            </button>
          </div>
        </div>

        <!-- Enhanced Stats Cards with Hover Effects -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div
            class="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300 group"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-500">Активные курсы</p>
                <p class="text-2xl font-bold text-gray-900 mt-1">
                  {{ stats.activeCourses }}
                </p>
                <p class="text-sm text-gray-500 mt-1">
                  + {{ stats.activeCourses }} на этой неделе
                </p>
              </div>
              <div
                class="bg-blue-50 p-4 rounded-xl group-hover:scale-110 transition-transform duration-300"
              >
                <i class="fas fa-book text-blue-500 text-xl"></i>
              </div>
            </div>
          </div>

          <div
            class="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300 group"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-500">Завершено</p>
                <p class="text-2xl font-bold text-gray-900 mt-1">
                  {{ stats.completedCourses }}
                </p>
                <p class="text-sm text-gray-500 mt-1">Отличная работа!</p>
              </div>
              <div
                class="bg-green-50 p-4 rounded-xl group-hover:scale-110 transition-transform duration-300"
              >
                <i class="fas fa-check-circle text-green-500 text-xl"></i>
              </div>
            </div>
          </div>

          <div
            class="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300 group"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-500">Всего часов</p>
                <p class="text-2xl font-bold text-gray-900 mt-1">
                  {{ stats.totalHours }}ч
                </p>
                <p class="text-sm text-gray-500 mt-1">В процессе обучения</p>
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
                <p class="text-sm font-medium text-gray-500">Сертификаты</p>
                <p class="text-2xl font-bold text-gray-900 mt-1">
                  {{ stats.certificates || 0 }}
                </p>
                <p class="text-sm text-gray-500 mt-1">Получено</p>
              </div>
              <div
                class="bg-yellow-50 p-4 rounded-xl group-hover:scale-110 transition-transform duration-300"
              >
                <i class="fas fa-certificate text-yellow-500 text-xl"></i>
              </div>
            </div>
          </div>
        </div>

        <!-- Enhanced Search and Filters -->
        <div class="flex flex-col lg:flex-row gap-4 mb-8">
          <div class="relative flex-grow">
            <i
              class="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            ></i>
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Поиск курсов..."
              class="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
            />
          </div>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="category in categories"
              :key="category.id"
              :class="[
                'px-6 py-3 rounded-xl transition-all duration-200 font-medium',
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
                  : 'bg-white text-gray-700 shadow-sm border border-gray-200 hover:bg-gray-50',
              ]"
              @click="selectedCategory = category.id"
            >
              <i :class="['mr-2', category.icon]"></i>
              {{ category.name }}
            </button>
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-if="!filteredCourses.length"
          class="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm"
        >
          <div class="max-w-sm mx-auto">
            <div
              class="bg-blue-50 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center"
            >
              <i class="fas fa-graduation-cap text-blue-500 text-4xl"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">
              Курсы не найдены
            </h3>
            <p class="text-gray-600 mb-6">
              {{
                searchQuery
                  ? "По вашему запросу ничего не найдено. Попробуйте изменить параметры поиска."
                  : "Начните свое обучение прямо сейчас! Выберите курс из нашего каталога."
              }}
            </p>
            <button
              class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 shadow-md"
            >
              <i class="fas fa-plus mr-2"></i>
              Найти новый курс
            </button>
          </div>
        </div>

        <!-- Enhanced Course Grid -->
        <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div
            v-for="course in filteredCourses"
            :key="course.id"
            class="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            <div class="relative">
              <img
                :src="getImageUrl(course.image)"
                :alt="course.title"
                class="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div
                class="absolute top-4 right-4 px-3 py-1.5 rounded-xl text-sm font-medium shadow-sm"
                :class="getStatusClass(course.status)"
              >
                {{ course.status === "purchased" ? "В процессе" : "Завершено" }}
              </div>
            </div>
            <div class="p-6">
              <h3
                class="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200"
              >
                {{ course.title }}
              </h3>
              <p class="mt-3 text-gray-600">{{ course.description }}</p>

              <div class="mt-6">
                <div
                  class="flex items-center justify-between text-sm text-gray-500 mb-2"
                >
                  <span>Прогресс курса</span>
                  <span class="font-medium"
                    >{{ course.progress.progressPercentage }}%</span
                  >
                </div>
                <div class="w-full bg-gray-100 rounded-full h-2.5">
                  <div
                    class="bg-blue-500 h-2.5 rounded-full transition-all duration-500"
                    :style="{ width: `${course.progress.progressPercentage}%` }"
                  ></div>
                </div>
              </div>

              <div class="mt-6 flex items-center justify-between">
                <div class="flex items-center gap-4">
                  <div class="flex items-center text-gray-500">
                    <i class="fas fa-book-open mr-2 text-blue-500"></i>
                    <span class="text-sm font-medium"
                      >{{ course.lessons }} уроков</span
                    >
                  </div>
                  <div class="flex items-center text-gray-500">
                    <i class="fas fa-clock mr-2 text-purple-500"></i>
                    <span class="text-sm font-medium"
                      >{{ course.duration }}ч</span
                    >
                  </div>
                </div>
                <NuxtLink
                  :to="`/personal-cabinet/courses/${course.slug}`"
                  class="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200"
                >
                  <i class="fas fa-arrow-right text-lg"></i>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <!-- Load More Button -->
        <div v-if="filteredCourses.length >= 6" class="text-center mt-8">
          <button
            class="inline-flex items-center px-6 py-3 bg-white text-gray-700 rounded-xl hover:bg-gray-50 shadow-sm border border-gray-200 transition-all duration-200"
          >
            <i class="fas fa-spinner mr-2"></i>
            Загрузить ещё
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Loading from "~/components/base/Loading.vue";
import { useAuthStore } from "~/stores/auth";
import { getPurchasedCourses } from "~/api/firebase/coursesApi";
import { course as healingChildhoodTraumasCourse } from "~/data/courses/healingChildhoodTraumas";

definePageMeta({
  layout: "personal-cabinet",
});

const authStore = useAuthStore();
const courses = ref([]); // Dynamic courses array
const searchQuery = ref("");
const selectedCategory = ref("all");
const loading = ref(true); // Loading state

// Fetch purchased courses on mounted
onMounted(async () => {
  if (authStore.user) {
    try {
      const { success, data } = await getPurchasedCourses(authStore.user.uid);
      if (success) {
        courses.value = data.map((course) => ({
          id: course.courseId,
          title: course.title || "Название курса",
          description: course.description || "Описание курса",
          image: course.image || "course-placeholder.jpg",
          status: course.status === "purchased" ? "purchased" : "completed",
          progress: {
            progressPercentage: course.progress?.progressPercentage || 0,
            completedLessons: course.progress?.completedLessons || [],
            totalLessons: course.progress?.totalLessons || 0,
          },
          lessons: course.lessons || 0,
          duration: parseInt(course.duration) || 0,
          slug: course.link?.replace("/courses/", "") || "default-slug",
          certificateEarned: course.certificateEarned || false,
        }));
      }
    } catch (error) {
      console.error("Ошибка при загрузке курсов:", error);
    } finally {
      loading.value = false; // Set loading to false after fetching
    }
  } else {
    loading.value = false; // Set loading to false if user is not authenticated
  }
});

// Calculate stats
const stats = computed(() => {
  const totalHours = courses.value.reduce(
    (sum, course) => sum + (course.duration || 0),
    0
  );

  return {
    activeCourses: courses.value.filter(
      (course) => course.status === "purchased"
    ).length,
    completedCourses: courses.value.filter(
      (course) => course.status === "completed"
    ).length,
    totalHours,
    certificates: courses.value.filter((course) => course.certificateEarned)
      .length,
    totalCourses: courses.value.length,
  };
});

// Categories for filtering
const categories = ref([
  { id: "all", name: "Все курсы", icon: "fas fa-th-large" },
  { id: "active", name: "Активные", icon: "fas fa-play-circle" },
  { id: "completed", name: "Завершённые", icon: "fas fa-check-circle" },
]);

// Filtered courses
const filteredCourses = computed(() => {
  return courses.value.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      course.description
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase());
    const matchesCategory =
      selectedCategory.value === "all" ||
      (selectedCategory.value === "active" && course.status === "purchased") ||
      (selectedCategory.value === "completed" && course.status === "completed");
    return matchesSearch && matchesCategory;
  });
});

// Helper function to get status class
const getStatusClass = (status) => {
  switch (status) {
    case "purchased":
      return "bg-blue-100 text-blue-800";
    case "completed":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getImageUrl = (imageName) => {
  return new URL(`/assets/images/courses/${imageName}`, import.meta.url).href;
};
</script>
