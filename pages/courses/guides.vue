<template>
  <div
    class="bg-gradient-to-br from-pink-50 via-rose-50 to-white min-h-screen py-12"
  >
    <div class="container mx-auto px-4 max-w-6xl">
      <!-- Hero Section -->
      <section class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">
          Руководства для Саморазвития
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Исследуйте практические руководства, которые помогут вам углубить
          самопознание, улучшить отношения и раскрыть внутренний потенциал.
        </p>
      </section>

      <!-- Filters Section -->
      <div class="mb-12">
        <div class="flex flex-wrap justify-center gap-4">
          <button
            v-for="category in categories"
            :key="category"
            @click="selectCategory(category)"
            :class="[
              'px-4 py-2 rounded-full transition-all duration-300',
              selectedCategory === category
                ? 'bg-pink-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-pink-100',
            ]"
          >
            {{ category }}
          </button>
        </div>
      </div>

      <!-- Guides Grid -->
      <div class="grid md:grid-cols-3 gap-8">
        <div
          v-for="guide in filteredGuides"
          :key="guide.id"
          class="bg-white rounded-2xl shadow-lg overflow-hidden transform transition hover:scale-105 hover:shadow-xl"
        >
          <!-- Guide Image -->
          <img
            :src="guide.image"
            :alt="guide.title"
            class="w-full h-48 object-cover"
          />
          <!-- Guide Content -->
          <div class="p-6">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-xl font-bold text-gray-800">{{ guide.title }}</h3>
              <span
                class="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm text-center"
              >
                {{ guide.category }}
              </span>
            </div>
            <p class="text-gray-600 mb-4">{{ guide.description }}</p>
            <div class="flex items-center gap-4 mb-4">
              <!-- Icon -->

              <i :class="guide.icon" class="text-xl text-pink-600" />

              <!-- Icon Description -->
              <p class="text-gray-500 text-sm">{{ guide.iconDescription }}</p>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-500">{{ guide.date }}</span>
              <button
                class="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition"
              >
                Читать
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <div
        class="bg-gradient-to-r from-pink-400 to-purple-500 rounded-2xl p-8 mt-12 text-center"
      >
        <h2 class="text-3xl font-bold text-white mb-4">
          Подпишитесь на новые материалы
        </h2>
        <p class="text-white mb-6 max-w-2xl mx-auto">
          Получите доступ к эксклюзивным руководствам, которые помогут вам в
          путешествии к самопознанию.
        </p>
        <div class="max-w-md mx-auto flex">
          <input
            type="email"
            placeholder="Ваш email"
            class="w-full px-4 py-3 rounded-l-lg text-gray-800"
          />
          <button
            class="bg-white text-pink-600 px-6 py-3 rounded-r-lg hover:bg-gray-100"
          >
            Подписаться
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import guideImage from "~/assets/images/podcasts/podcasts.jpeg";

const selectedCategory = ref("Все");

const categories = [
  "Все",
  "Самопознание",
  "Эмоциональный интеллект",
  "Отношения",
  "Карьерный рост",
];

const guides = [
  {
    id: 1,
    title: "Практики Осознанности",
    description:
      "Узнайте, как внедрить простые практики осознанности в повседневную жизнь.",
    date: "15 декабря 2024",
    category: "Самопознание",
    image: guideImage,
    icon: "fas fa-seedling", // Example Font Awesome icon
    iconDescription: "Подходы для внутреннего роста и баланса.",
  },
  {
    id: 2,
    title: "Управление Эмоциями",
    description:
      "Эффективные техники для работы с эмоциями и улучшения эмоционального интеллекта.",
    date: "10 декабря 2024",
    category: "Эмоциональный интеллект",
    image: guideImage,
    icon: "fas fa-heart", // Example Font Awesome icon
    iconDescription: "Техники для развития эмпатии и самоконтроля.",
  },
  {
    id: 3,
    title: "Гармоничные Отношения",
    description:
      "Понимание ваших и чужих потребностей для создания доверительных отношений.",
    date: "5 декабря 2024",
    category: "Отношения",
    image: guideImage,
    icon: "fas fa-users", // Example Font Awesome icon
    iconDescription: "Инструменты для укрепления связи с близкими.",
  },
  {
    id: 4,
    title: "Мотивация и Цели",
    description:
      "Найдите свой источник мотивации и научитесь ставить реалистичные цели.",
    date: "1 декабря 2024",
    category: "Карьерный рост",
    image: guideImage,
    icon: "fas fa-mountain", // Example Font Awesome icon
    iconDescription: "Стратегии для достижения карьерных и личных целей.",
  },
];

const selectCategory = (category) => {
  selectedCategory.value = category;
};

const filteredGuides = computed(() => {
  return selectedCategory.value === "Все"
    ? guides
    : guides.filter((guide) => guide.category === selectedCategory.value);
});
</script>
