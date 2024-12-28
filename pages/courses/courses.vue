<template>
  <div
    class="bg-gradient-to-br from-pink-50 via-rose-50 to-white min-h-screen py-12"
  >
    <div class="container mx-auto px-4 max-w-6xl">
      <!-- Hero Section -->
      <section class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">
          Ваш Путь к Личностному Расцвету
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Откройте для себя инструменты трансформации и личностного роста.
          Каждый курс - это путешествие к лучшей версии себя.
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

      <!-- Products Grid -->
      <div class="grid md:grid-cols-3 gap-8">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="bg-white rounded-2xl shadow-lg overflow-hidden transform transition hover:scale-105 hover:shadow-xl"
        >
          <div class="relative">
            <img
              :src="product.image"
              :alt="product.title"
              class="w-full h-48 object-cover"
            />
            <div v-if="product.discount" class="absolute top-4 right-4">
              <span
                class="bg-red-500 text-white px-3 py-1 rounded-full text-sm"
              >
                -{{ product.discount }}%
              </span>
            </div>
          </div>

          <div class="p-6">
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-xl font-bold text-gray-800">
                {{ product.title }}
              </h3>
              <span class="text-lg font-semibold text-pink-600 min-w-20">
                {{ formatPrice(product.price) }} ₽
              </span>
            </div>

            <p class="text-gray-600 mb-4">{{ product.description }}</p>

            <div class="flex items-center mb-4">
              <i class="fas fa-clock text-pink-500 mr-2"></i>
              <span class="text-gray-600">{{ product.duration }}</span>
            </div>

            <div class="flex justify-between items-center">
              <div class="flex items-center">
                <i class="fas fa-users text-pink-500 mr-2"></i>
                <span class="text-gray-600"
                  >{{ product.participants }} участниц</span
                >
              </div>

              <button
                class="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition"
              >
                Подробнее
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Subscription CTA -->
      <div
        class="bg-gradient-to-r from-pink-400 to-purple-500 rounded-2xl p-8 mt-12 text-center"
      >
        <h2 class="text-3xl font-bold text-white mb-4">
          Постоянное развитие - ваш ключ к успеху
        </h2>
        <p class="text-white mb-6 max-w-2xl mx-auto">
          Подпишитесь на наши ежемесячные рассылки с личными инсайтами,
          практическими заданиями и вдохновляющими историями успеха.
        </p>
        <div class="max-w-md mx-auto flex">
          <input
            type="email"
            v-model="email"
            placeholder="Ваш email"
            class="w-full px-4 py-3 rounded-l-lg text-gray-800"
          />
          <button
            @click="subscribeEmail"
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
import courseImage from "~/assets/images/courses/loveyourself.webp";
import { getFirestore } from "firebase/firestore";
import { subscribeUser } from "../api/firebase/contact";

const db = getFirestore();
const email = ref("");

const selectedCategory = ref("Все");

const categories = [
  "Все",
  "Отношения",
  "Саморазвитие",
  "Эмоциональный интеллект",
  "Карьера",
];

const products = [
  {
    id: 1,
    title: 'Курс "Любовь к себе"',
    description:
      "Глубокое погружение в себя. Научитесь принимать и ценить себя.",
    price: 4900,
    duration: "4 недели",
    participants: 250,
    category: "Саморазвитие",
    image: courseImage,
    discount: 20,
  },
  {
    id: 2,
    title: 'Гайд "Идеальные отношения"',
    description: "Инструменты для построения гармоничных и здоровых отношений.",
    price: 2500,
    duration: "2 недели",
    participants: 180,
    category: "Отношения",
    image: courseImage,
  },
  {
    id: 3,
    title: 'Курс "Эмоциональный интеллект"',
    description: "Развитие навыков управления эмоциями и коммуникацией.",
    price: 5900,
    duration: "6 недель",
    participants: 320,
    category: "Эмоциональный интеллект",
    image: courseImage,
    discount: 15,
  },
];

const selectCategory = (category) => {
  selectedCategory.value = category;
};

const filteredProducts = computed(() => {
  return selectedCategory.value === "Все"
    ? products
    : products.filter((p) => p.category === selectedCategory.value);
});

const formatPrice = (price) => {
  return price.toLocaleString("ru-RU");
};

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
