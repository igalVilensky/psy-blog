<template>
  <div class="bg-gradient-to-br from-pink-50 to-white min-h-screen py-12">
    <div class="container mx-auto px-4 max-w-6xl">
      <!-- Hero Section -->
      <section class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">
          Вдохновляющие Подкасты
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Слушайте истории успеха, практические советы и глубокие размышления о
          личностном росте в любое удобное время.
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

      <!-- Podcasts Grid -->
      <div class="grid md:grid-cols-2 gap-8">
        <div
          v-for="podcast in filteredPodcasts"
          :key="podcast.id"
          class="bg-white rounded-2xl shadow-lg overflow-hidden transform transition hover:scale-105 hover:shadow-xl"
        >
          <div class="flex flex-col md:flex-row">
            <div class="md:w-1/3">
              <img
                :src="podcast.image"
                :alt="podcast.title"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="p-6 md:w-2/3">
              <div class="flex justify-between items-start mb-4">
                <h3 class="text-xl font-bold text-gray-800">
                  {{ podcast.title }}
                </h3>
                <span
                  class="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm"
                >
                  {{ podcast.category }}
                </span>
              </div>

              <p class="text-gray-600 mb-4">{{ podcast.description }}</p>

              <div class="flex items-center gap-4 mb-4">
                <div class="flex items-center">
                  <i class="fas fa-clock text-pink-500 mr-2"></i>
                  <span class="text-gray-600">{{ podcast.duration }}</span>
                </div>
                <div class="flex items-center">
                  <i class="fas fa-headphones text-pink-500 mr-2"></i>
                  <span class="text-gray-600"
                    >{{ podcast.listens }} прослушиваний</span
                  >
                </div>
              </div>

              <div class="flex justify-between items-center">
                <div class="flex items-center">
                  <img
                    :src="podcast.hostImage"
                    :alt="podcast.host"
                    class="w-8 h-8 rounded-full mr-2"
                  />
                  <span class="text-gray-700">{{ podcast.host }}</span>
                </div>

                <button
                  class="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition"
                >
                  Слушать
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Subscribe Section -->
      <div
        class="bg-gradient-to-r from-pink-400 to-purple-500 rounded-2xl p-8 mt-12 text-center"
      >
        <h2 class="text-3xl font-bold text-white mb-4">
          Не пропускайте новые выпуски
        </h2>
        <p class="text-white mb-6 max-w-2xl mx-auto">
          Подпишитесь на уведомления о новых подкастах и получайте эксклюзивный
          доступ к дополнительным материалам.
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
import podcastImage from "~/assets/images/podcasts/podcasts.jpeg";
import hostImage from "~/assets/images/podcasts/podcasts.jpeg";

const selectedCategory = ref("Все");

const categories = [
  "Все",
  "Личностный рост",
  "Отношения",
  "Карьера",
  "Психология",
];

const podcasts = [
  {
    id: 1,
    title: "Путь к уверенности",
    description:
      "Как преодолеть самосомнения и развить уверенность в себе. Практические техники и реальные истории.",
    duration: "45 минут",
    listens: 1240,
    category: "Личностный рост",
    host: "Анна Петрова",
    image: podcastImage,
    hostImage: hostImage,
  },
  {
    id: 2,
    title: "Гармония в отношениях",
    description:
      "Секреты построения здоровых отношений. Разбор типичных проблем и способы их решения.",
    duration: "38 минут",
    listens: 890,
    category: "Отношения",
    host: "Мария Иванова",
    image: podcastImage,
    hostImage: hostImage,
  },
  {
    id: 3,
    title: "Карьерный взлёт",
    description:
      "Стратегии профессионального роста и развития. Советы от успешных предпринимателей.",
    duration: "52 минуты",
    listens: 1560,
    category: "Карьера",
    host: "Елена Соколова",
    image: podcastImage,
    hostImage: hostImage,
  },
  {
    id: 4,
    title: "Эмоциональный баланс",
    description:
      "Как управлять эмоциями и использовать их для личностного роста. Техники самоконтроля.",
    duration: "41 минута",
    listens: 980,
    category: "Психология",
    host: "Ольга Романова",
    image: podcastImage,
    hostImage: hostImage,
  },
];

const selectCategory = (category) => {
  selectedCategory.value = category;
};

const filteredPodcasts = computed(() => {
  return selectedCategory.value === "Все"
    ? podcasts
    : podcasts.filter((p) => p.category === selectedCategory.value);
});
</script>
