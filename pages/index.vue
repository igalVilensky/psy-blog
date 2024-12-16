<template>
  <div class="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen py-12">
    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center h-screen">
      <div
        class="animate-spin rounded-full border-t-4 border-blue-500 border-solid w-16 h-16"
      ></div>
    </div>

    <div v-else class="container mx-auto px-4 max-w-6xl">
      <!-- Hero Section with Project Description -->
      <section class="text-center mb-16">
        <h1 class="text-4xl font-extrabold text-gray-800 mb-4">
          Ваш Путь к Личностному Росту
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Мы создаем уникальные образовательные программы, которые помогают
          раскрыть потенциал каждого человека через глубокое понимание себя и
          развитие personal skills.
        </p>
      </section>

      <!-- Popular Queries Section -->
      <section class="mb-16">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Популярные темы</h2>
        <div class="grid md:grid-cols-3 gap-6">
          <div
            v-for="(topic, index) in popularTopics"
            :key="index"
            class="bg-white shadow-lg rounded-2xl p-6 transform transition hover:scale-105"
          >
            <div class="flex items-center mb-4">
              <i :class="topic.icon" class="text-4xl mr-4 text-blue-500"></i>
              <h3 class="text-xl font-semibold text-gray-800">
                {{ topic.title }}
              </h3>
            </div>
            <p class="text-gray-600">{{ topic.description }}</p>
          </div>
        </div>
      </section>

      <!-- Discounted Courses Section -->
      <section class="mb-16">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">
          Курсы недели со скидкой
        </h2>
        <div class="grid md:grid-cols-2 gap-6">
          <div
            v-for="(course, index) in discountedCourses"
            :key="index"
            class="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-6 shadow-md"
          >
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-xl font-bold text-gray-800">
                {{ course.title }}
              </h3>
              <span
                class="bg-red-500 text-white px-3 py-1 rounded-full text-sm"
              >
                -{{ course.discount }}%
              </span>
            </div>
            <p class="text-gray-700 mb-4">{{ course.description }}</p>
            <div class="flex justify-between items-center">
              <span class="text-lg font-semibold text-blue-700">
                {{ course.price }} ₽
              </span>
              <button
                class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Записаться
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Testimonials Section -->
      <section class="bg-white rounded-2xl shadow-lg p-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">
          Отзывы наших участников
        </h2>
        <div class="grid md:grid-cols-3 gap-6">
          <div
            v-for="(testimonial, index) in testimonials"
            :key="index"
            class="bg-gray-100 rounded-2xl p-6"
          >
            <p class="text-gray-700 mb-4 italic">"{{ testimonial.text }}"</p>
            <div class="flex items-center">
              <div class="mr-4">
                <div
                  class="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center"
                >
                  {{ testimonial.name[0] }}
                </div>
              </div>
              <div>
                <h4 class="font-semibold text-gray-800">
                  {{ testimonial.name }}
                </h4>
                <p class="text-gray-600 text-sm">{{ testimonial.course }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const isLoading = ref(true);

const popularTopics = [
  {
    title: "Любовь и отношения",
    icon: "fas fa-heart text-red-500",
    description: "Глубокое понимание себя и построение гармоничных отношений",
  },
  {
    title: "Саморазвитие",
    icon: "fas fa-user-graduate text-green-500",
    description: "Техники личностного роста и преодоления внутренних барьеров",
  },
  {
    title: "Карьерный рост",
    icon: "fas fa-chart-line text-blue-500",
    description: "Стратегии профессионального развития и успеха",
  },
];

const discountedCourses = [
  {
    title: 'Курс "Эмоциональный интеллект"',
    description: "Научитесь управлять эмоциями и строить глубокие отношения",
    discount: 30,
    price: 4900,
  },
  {
    title: 'Тренинг "Личная эффективность"',
    description: "Раскройте свой потенциал и достигайте целей",
    discount: 25,
    price: 5700,
  },
];

const testimonials = [
  {
    name: "Анна К.",
    course: 'Курс "Эмоциональный интеллект"',
    text: "Невероятно полезный курс, который помог мне лучше понять себя и свои эмоции.",
  },
  {
    name: "Михаил П.",
    course: 'Тренинг "Личная эффективность"',
    text: "Получил массу практических инструментов для достижения целей и повышения продуктивности.",
  },
  {
    name: "Елена С.",
    course: "Курс по отношениям",
    text: "Курс открыл мне глаза на многие аспекты построения здоровых отношений.",
  },
];

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 500);
});
</script>
