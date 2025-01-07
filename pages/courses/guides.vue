<template>
  <div
    class="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-white py-16"
  >
    <div class="container mx-auto px-4 max-w-6xl">
      <!-- Hero Section -->
      <section class="text-center mb-20">
        <div
          class="inline-block px-4 py-2 bg-indigo-50 rounded-full text-indigo-600 font-medium mb-6"
        >
          Руководства
        </div>
        <h1 class="text-5xl font-bold text-gray-800 mb-6 tracking-tight">
          Руководства для Саморазвития
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Исследуйте практические руководства, которые помогут вам углубить
          самопознание, улучшить отношения и раскрыть внутренний потенциал.
        </p>
      </section>

      <!-- Filters Section -->
      <div class="mb-16">
        <div class="flex flex-wrap justify-center gap-4">
          <button
            v-for="category in categories"
            :key="category"
            @click="selectCategory(category)"
            :class="[
              'px-6 py-3 rounded-full transition-all duration-300 font-medium relative overflow-hidden group',
              selectedCategory === category
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                : 'bg-white text-gray-700 hover:bg-indigo-50 border border-gray-200 hover:text-white',
            ]"
          >
            <span class="relative z-10">{{ category }}</span>
            <div
              class="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
              :class="{ 'scale-x-100': selectedCategory === category }"
            ></div>
          </button>
        </div>
      </div>

      <!-- Guides Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="guide in filteredGuides"
          :key="guide.id"
          class="group bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
        >
          <!-- Guide Image -->
          <div class="relative overflow-hidden">
            <img
              :src="guide.image"
              :alt="guide.title"
              class="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <!-- Category Badge -->
            <span
              :class="[
                'absolute top-4 left-4 px-4 py-2 rounded-full text-sm font-medium shadow-md backdrop-blur-sm text-white',
                {
                  'bg-emerald-500/80 border border-emerald-200':
                    guide.category === 'Самопознание',
                  'bg-purple-500/80 border border-purple-200':
                    guide.category === 'Эмоциональный интеллект',
                  'bg-blue-500/80 border border-blue-200':
                    guide.category === 'Отношения',
                  'bg-pink-500/80 border border-pink-200':
                    guide.category === 'Карьерный рост',
                },
              ]"
            >
              {{ guide.category }}
            </span>
          </div>

          <!-- Guide Content -->
          <div class="p-8">
            <h2
              class="text-xl font-bold text-gray-800 mb-4 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-300"
            >
              {{ guide.title }}
            </h2>
            <p class="text-gray-600 mb-4 line-clamp-3">
              {{ guide.description }}
            </p>
            <div class="flex items-center gap-4 mb-4">
              <i :class="guide.icon" class="text-xl text-indigo-600" />
              <p class="text-gray-500 text-sm">{{ guide.iconDescription }}</p>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-500">{{ guide.date }}</span>
              <button
                class="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all"
              >
                Читать
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <div
        class="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-8 mt-16 text-center transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
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
            v-model="email"
            placeholder="Ваш email"
            class="w-full px-4 py-3 rounded-l-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            @click="subscribeEmail"
            class="bg-white text-indigo-600 px-6 py-3 rounded-r-lg hover:bg-gray-100 transition-all"
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
import { getFirestore } from "firebase/firestore";
import { subscribeUser } from "@/api/firebase/contact";

const db = getFirestore();
const email = ref("");
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

// Email subscription method
const subscribeEmail = async () => {
  if (email.value && validateEmail(email.value)) {
    const result = await subscribeUser(db, email.value);
    if (result.success) {
      alert(result.message);
    } else {
      alert(result.message);
    }
    email.value = ""; // Clear input after submission
  } else {
    alert("Пожалуйста, введите корректный email");
  }
};

// Simple email validation
const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};
</script>
<style scoped>
/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #94a3b8;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}
</style>
