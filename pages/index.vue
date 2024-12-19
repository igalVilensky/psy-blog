<template>
  <div class="bg-gradient-to-br from-pink-50 to-white min-h-screen py-12">
    <div class="container mx-auto px-4 max-w-6xl">
      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center h-screen">
        <div
          class="animate-spin rounded-full border-t-4 border-pink-500 border-solid w-16 h-16"
        ></div>
      </div>

      <div v-else>
        <!-- Hero Section with Project Description -->
        <section
          class="relative text-center mb-16 flex flex-col items-center justify-center sm:py-24 py-12"
        >
          <!-- Background Image -->
          <div
            class="absolute inset-0 bg-cover bg-center opacity-30"
            :style="{ backgroundImage: `url(${profileImage})` }"
          ></div>

          <div class="relative z-10">
            <h1
              class="text-5xl md:text-6xl font-extrabold text-gray-800 mb-4 tracking-tight leading-tight"
            >
              Ваш Путь к Личностному Росту
            </h1>
            <p
              class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6 px-4"
            >
              Мы создаем уникальные образовательные программы, которые помогают
              раскрыть потенциал каждого человека через глубокое понимание себя
              и развитие
              <span class="font-bold text-pink-500">personal skills</span>.
            </p>

            <!-- CTA Button -->
            <NuxtLink
              to="/courses/courses"
              class="inline-block bg-gradient-to-br from-pink-500 to-purple-500 text-white text-lg font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition duration-300 shadow-lg"
            >
              Начать обучение
            </NuxtLink>
          </div>
        </section>

        <!-- Popular Topics Section -->
        <section class="mb-16">
          <div class="text-center mb-12">
            <h3 class="text-3xl font-bold text-gray-800 mb-4">
              Популярные темы
            </h3>
          </div>

          <div class="grid md:grid-cols-3 gap-8">
            <div
              v-for="(topic, index) in popularTopics"
              :key="index"
              class="bg-white rounded-2xl p-6 shadow-lg transform transition hover:scale-105 hover:shadow-xl"
            >
              <div class="mb-4">
                <i :class="topic.icon" class="text-3xl text-pink-500 mb-4"></i>
                <h4 class="text-xl font-semibold text-gray-800 mb-3">
                  {{ topic.title }}
                </h4>
              </div>
              <p class="text-gray-600">
                {{ topic.description }}
              </p>
            </div>
          </div>
        </section>

        <!-- Discounted Courses Section -->
        <section class="mb-16">
          <div class="text-center mb-12">
            <h3 class="text-3xl font-bold text-gray-800 mb-4">
              Курсы недели со скидкой
            </h3>
          </div>

          <div class="grid md:grid-cols-2 gap-8">
            <div
              v-for="(course, index) in discountedCourses"
              :key="index"
              class="bg-gradient-to-br from-pink-100 to-purple-200 rounded-2xl p-6 shadow-lg"
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
                <span class="text-lg font-semibold text-pink-700">
                  {{ course.price }} ₽
                </span>
                <NuxtLink
                  to="/signup"
                  class="inline-block bg-pink-500 text-white text-sm font-semibold py-2 px-4 rounded-lg hover:bg-pink-600 transition"
                >
                  Записаться
                </NuxtLink>
              </div>
            </div>
          </div>
        </section>

        <!-- Testimonials Section -->
        <section
          class="bg-gradient-to-r from-pink-400 to-purple-500 rounded-2xl p-12 text-center"
        >
          <h4 class="text-3xl font-bold text-white mb-6">
            Отзывы наших участников
          </h4>
          <div class="grid md:grid-cols-3 gap-6">
            <div
              v-for="(testimonial, index) in testimonials"
              :key="index"
              class="bg-white rounded-2xl p-6"
            >
              <p class="text-gray-700 mb-4 italic">"{{ testimonial.text }}"</p>
              <div class="flex items-center">
                <div class="mr-4">
                  <div
                    class="w-12 h-12 bg-pink-200 rounded-full flex items-center justify-center"
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
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import profileImage from "@/assets/images/profile.jpg";
const isLoading = ref(true);

const popularTopics = [
  {
    title: "Любовь и отношения",
    icon: "fas fa-heart",
    description: "Глубокое понимание себя и построение гармоничных отношений",
  },
  {
    title: "Саморазвитие",
    icon: "fas fa-user-graduate",
    description: "Техники личностного роста и преодоления внутренних барьеров",
  },
  {
    title: "Карьерный рост",
    icon: "fas fa-chart-line",
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
