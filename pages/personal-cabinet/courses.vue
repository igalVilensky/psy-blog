<template>
  <div class="w-full">
    <div class="mx-auto px-4 py-8">
      <!-- Header Section -->
      <div
        class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6"
      >
        <div>
          <h1 class="text-2xl font-bold text-gray-800">Мои курсы</h1>
          <p class="text-gray-600 mt-2">
            Отслеживайте и управляйте своим обучением
          </p>
        </div>
        <div class="flex space-x-2 mt-4 sm:mt-0">
          <button
            class="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200"
          >
            <i class="fas fa-sort-amount-down mr-2"></i>
            Сортировать
          </button>
          <button
            class="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200"
          >
            <i class="fas fa-filter mr-2"></i>
            Фильтр
          </button>
        </div>
      </div>

      <!-- Course Stats -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div class="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">Активные курсы</p>
              <p class="text-xl font-semibold text-gray-900">
                {{ stats.activeCourses }}
              </p>
            </div>
            <div class="bg-blue-50 p-3 rounded-lg">
              <i class="fas fa-book text-blue-500"></i>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">Завершено</p>
              <p class="text-xl font-semibold text-gray-900">
                {{ stats.completedCourses }}
              </p>
            </div>
            <div class="bg-green-50 p-3 rounded-lg">
              <i class="fas fa-check-circle text-green-500"></i>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">Всего часов</p>
              <p class="text-xl font-semibold text-gray-900">
                {{ stats.totalHours }}ч
              </p>
            </div>
            <div class="bg-purple-50 p-3 rounded-lg">
              <i class="fas fa-clock text-purple-500"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Search and Category Filter -->
      <div class="flex flex-col sm:flex-row gap-4 mb-6">
        <div class="relative flex-grow">
          <i
            class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          ></i>
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Поиск курсов..."
            class="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div class="flex flex-col sm:flex-row gap-2">
          <button
            v-for="category in categories"
            :key="category.id"
            :class="[
              'px-4 py-2 rounded-lg transition-colors duration-200',
              selectedCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
            ]"
            @click="selectedCategory = category.id"
          >
            <i :class="['mr-2', category.icon]"></i>
            {{ category.name }}
          </button>
        </div>
      </div>

      <!-- Course Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div
          v-for="course in filteredCourses"
          :key="course.id"
          class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200"
        >
          <div class="relative">
            <img
              :src="course.image"
              :alt="course.title"
              class="w-full h-48 object-cover"
            />
            <div
              class="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium"
              :class="getStatusClass(course.status)"
            >
              {{ course.status === "In Progress" ? "В процессе" : "Завершено" }}
            </div>
          </div>
          <div class="p-6">
            <h3 class="text-lg font-semibold text-gray-900">
              {{ course.title }}
            </h3>
            <p class="mt-2 text-gray-600 text-sm">{{ course.description }}</p>

            <div class="mt-4">
              <div
                class="flex items-center justify-between text-sm text-gray-500 mb-2"
              >
                <span>Прогресс</span>
                <span>{{ course.progress }}%</span>
              </div>
              <div class="w-full bg-gray-100 rounded-full h-2">
                <div
                  class="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  :style="{ width: `${course.progress}%` }"
                ></div>
              </div>
            </div>

            <div class="mt-4 flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <div class="flex items-center text-gray-500">
                  <i class="fas fa-book-open mr-2"></i>
                  <span class="text-sm">{{ course.lessons }} уроков</span>
                </div>
                <div class="flex items-center text-gray-500">
                  <i class="fas fa-clock mr-2"></i>
                  <span class="text-sm">{{ course.duration }}ч</span>
                </div>
              </div>
              <button class="text-blue-600 hover:text-blue-700">
                <i class="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import courseImage from "~/assets/images/courses/loveyourself.webp";
import guideImage from "~/assets/images/podcasts/podcasts.jpeg";

definePageMeta({
  layout: "personal-cabinet",
});

// Mock data - replace with actual data from your API
const stats = ref({
  activeCourses: 4,
  completedCourses: 2,
  totalHours: 45,
});

const categories = ref([
  { id: "all", name: "Все", icon: "fas fa-th-large" },
  { id: "active", name: "Активные", icon: "fas fa-play-circle" },
  { id: "completed", name: "Завершённые", icon: "fas fa-check-circle" },
]);

const courses = ref([
  {
    id: 1,
    title: "Исцеление детских травм",
    description:
      "Исследуйте и исцелите свои детские травмы через 21 урок, включая теоретические и практические задания. Узнайте, как травмы влияют на вашу жизнь, и научитесь их преодолевать.",
    image: courseImage,
    progress: 75,
    status: "In Progress",
    lessons: 12,
    duration: 8,
    category: "active",
  },
  {
    id: 2,
    title: "Идеальные отношения",
    description: "Инструменты для построения гармоничных и здоровых отношений.",
    image: guideImage,
    progress: 100,
    status: "Completed",
    lessons: 15,
    duration: 10,
    category: "completed",
  },
  // Add more courses as needed
]);

const searchQuery = ref("");
const selectedCategory = ref("all");

const filteredCourses = computed(() => {
  return courses.value.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      course.description
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase());
    const matchesCategory =
      selectedCategory.value === "all" ||
      course.category === selectedCategory.value;
    return matchesSearch && matchesCategory;
  });
});

const getStatusClass = (status) => {
  switch (status) {
    case "In Progress":
      return "bg-blue-100 text-blue-800";
    case "Completed":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
</script>
