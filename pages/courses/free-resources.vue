<template>
  <div
    class="bg-gradient-to-br from-pink-50 via-rose-50 to-white min-h-screen py-12"
  >
    <div class="container mx-auto px-4 max-w-6xl">
      <!-- Hero Section -->
      <section class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">
          Бесплатные материалы для вашего роста
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Откройте для себя инструменты личностного развития без каких-либо
          затрат. Каждый ресурс создан, чтобы вдохновить и поддержать вас на
          пути к себе.
        </p>
      </section>

      <!-- Resource Types Tabs -->
      <div class="flex flex-wrap justify-center gap-4 mb-12">
        <button
          v-for="type in resourceTypes"
          :key="type"
          @click="selectedType = type"
          :class="[
            'px-4 py-2 rounded-full transition-all duration-300',
            selectedType === type
              ? 'bg-purple-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-purple-100',
          ]"
        >
          {{ type }}
        </button>
      </div>

      <!-- Resources Grid -->
      <div class="grid md:grid-cols-3 gap-8">
        <div
          v-for="resource in filteredResources"
          :key="resource.id"
          class="bg-white rounded-2xl shadow-lg overflow-hidden transform transition hover:scale-105 hover:shadow-xl"
        >
          <div class="relative">
            <img
              :src="resource.image"
              :alt="resource.title"
              class="w-full h-48 object-cover"
            />
            <div
              class="absolute top-4 left-4 bg-purple-500 text-white px-3 py-1 rounded-full text-sm"
            >
              {{ resource.type }}
            </div>
          </div>

          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-800 mb-4">
              {{ resource.title }}
            </h3>

            <p class="text-gray-600 mb-4">{{ resource.description }}</p>

            <div class="flex justify-between items-center">
              <div class="flex items-center text-gray-600">
                <i :class="resource.icon" class="mr-2 text-purple-500"></i>
                <span>{{ resource.duration }}</span>
              </div>

              <button
                class="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition"
                @click="openResource(resource)"
              >
                Получить
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Email Capture CTA -->
      <div
        class="bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl p-8 mt-12 text-center"
      >
        <h2 class="text-3xl font-bold text-white mb-4">
          Получайте бесплатные материалы первыми
        </h2>
        <p class="text-white mb-6 max-w-2xl mx-auto">
          Подпишитесь на нашу рассылку и будьте в курсе всех новых бесплатных
          ресурсов, которые помогут вам расти и развиваться.
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
            class="bg-white text-purple-600 px-6 py-3 rounded-r-lg hover:bg-gray-100"
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
import courseImage from "~/assets/images/freeResourses/metCards.webp";

const email = ref("");
const selectedType = ref("Все");

const resourceTypes = [
  "Все",
  "Мини-курсы",
  "Гайды",
  "Подкасты",
  "Метафорические карты",
];

const resources = [
  {
    id: 1,
    title: 'Базовый курс "Любовь к себе"',
    description: "Введение в практики самопринятия и саморазвития",
    type: "Мини-курсы",
    duration: "7 дней",
    image: courseImage,
    icon: "fas fa-graduation-cap",
  },
  {
    id: 2,
    title: 'Гайд "Управление эмоциями"',
    description:
      "Практические упражнения для осознанности и эмоционального интеллекта",
    type: "Гайды",
    duration: "14 страниц",
    image: courseImage,
    icon: "fas fa-book",
  },
  {
    id: 3,
    title: 'Подкаст "Путь к себе"',
    description:
      "Откровенные разговоры о личностном росте и преодолении страхов",
    type: "Подкасты",
    duration: "45 минут",
    image: courseImage,
    icon: "fas fa-podcast",
  },
  {
    id: 4,
    title: 'Метафорические карты "Внутренний диалог"',
    description: "Набор карт для глубокой работы с собой и своими состояниями",
    type: "Метафорические карты",
    duration: "20 карт",
    image: courseImage,
    icon: "fas fa-square",
  },
];

const filteredResources = computed(() => {
  return selectedType.value === "Все"
    ? resources
    : resources.filter((r) => r.type === selectedType.value);
});

const openResource = (resource) => {
  // Implement resource opening logic
  // Could be a modal, download, or navigation to a specific resource page
  alert(`Открытие ресурса: ${resource.title}`);
};

const subscribeEmail = () => {
  if (email.value && validateEmail(email.value)) {
    alert(`Спасибо за подписку: ${email.value}`);
    email.value = "";
  } else {
    alert("Пожалуйста, введите корректный email");
  }
};

const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};
</script>
