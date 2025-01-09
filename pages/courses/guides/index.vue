<template>
  <div class="relative min-h-screen">
    <!-- Animated Background -->
    <div class="fixed inset-0 -z-1">
      <div class="absolute top-0 left-0 w-full h-full bg-[#0F172A]">
        <!-- Gradient Orbs -->
        <div
          class="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] animate-float"
        ></div>
        <div
          class="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] animate-float-delay"
        ></div>
        <!-- Animated Grid -->
        <div
          class="absolute inset-0 bg-gradient-to-b from-transparent to-[#0F172A]/80"
        >
          <div class="absolute inset-0 bg-grid-white/[0.02] animate-grid"></div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 max-w-6xl relative z-10 pb-12 pt-12">
      <!-- Hero Section -->
      <section class="text-center mb-12">
        <!-- <div
          class="inline-block px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full text-white font-medium mb-6 backdrop-blur-sm border border-white/10"
        >
          Руководства
        </div> -->
        <h1
          class="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80 tracking-tight mb-6"
        >
          Руководства для Саморазвития
        </h1>
        <p
          class="text-lg sm:text-xl text-indigo-200/80 max-w-2xl mx-auto leading-relaxed"
        >
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
              'px-6 py-3 rounded-full transition-all duration-300 font-medium relative overflow-hidden group backdrop-blur-sm',
              selectedCategory === category
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                : 'bg-white/10 text-indigo-200 border border-indigo-500/20',
            ]"
          >
            <span class="relative z-10">{{ category }}</span>
            <div
              class="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
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
          class="group bg-gradient-to-b from-[#1E1B4B]/40 to-[#1E1B4B]/60 backdrop-blur-xl rounded-2xl border border-indigo-500/20 overflow-hidden transform transition-all duration-300 hover:-translate-y-2"
        >
          <!-- Guide Image -->
          <div class="relative overflow-hidden">
            <img
              :src="guide.image"
              :alt="guide.title"
              class="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
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
              class="text-xl font-bold text-white/90 mb-4 line-clamp-2 group-hover:text-indigo-300 transition-colors duration-300"
            >
              {{ guide.title }}
            </h2>
            <p class="text-indigo-200/80 mb-4 line-clamp-3">
              {{ guide.description }}
            </p>
            <div class="flex items-center gap-4 mb-4">
              <i :class="guide.icon" class="text-xl text-indigo-400" />
              <p class="text-indigo-200/60 text-sm">
                {{ guide.iconDescription }}
              </p>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-indigo-200/60">{{ guide.date }}</span>
              <a
                :href="guide.link"
                class="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all"
              >
                Читать
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <div
        class="mt-16 bg-gradient-to-b from-[#1E1B4B]/40 to-[#1E1B4B]/60 backdrop-blur-xl rounded-2xl border border-indigo-500/20 p-8 text-center transform transition-all duration-300 hover:-translate-y-2"
      >
        <h2 class="text-2xl font-bold text-white/90 mb-4">
          Подпишитесь на новые материалы
        </h2>
        <p class="text-indigo-200/80 mb-6 max-w-2xl mx-auto">
          Получите доступ к эксклюзивным руководствам, которые помогут вам в
          путешествии к самопознанию.
        </p>
        <div class="max-w-md mx-auto flex">
          <input
            type="email"
            v-model="email"
            placeholder="Ваш email"
            class="w-full px-4 py-3 rounded-l-lg bg-white/5 border border-indigo-500/20 text-white placeholder-indigo-200/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            @click="subscribeEmail"
            class="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-r-lg hover:opacity-90 transition-all"
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
import selfguideImage from "~/assets/images/self-love.webp";
import courseImage from "~/assets/images/courses/loveyourself.webp";

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
    title: "Самооценка: Путешествие в мир себя",
    description:
      "Практики для укрепления самоценности, улучшения внутреннего диалога и самопринятия.",
    date: "12 января 2025",
    category: "Самопознание",
    image: selfguideImage,
    icon: "fas fa-star",
    iconDescription: "Упражнения для глубокого самоанализа.",
    link: "guides/self-assessment-guide",
  },
  {
    id: 3,
    title: "Управление Эмоциями",
    description:
      "Эффективные техники для работы с эмоциями и улучшения эмоционального интеллекта.",
    date: "10 декабря 2024",
    category: "Эмоциональный интеллект",
    image: courseImage,
    icon: "fas fa-heart",
    iconDescription: "Техники для развития эмпатии и самоконтроля.",
  },
  {
    id: 4,
    title: "Гармоничные Отношения",
    description:
      "Понимание ваших и чужих потребностей для создания доверительных отношений.",
    date: "5 декабря 2024",
    category: "Отношения",
    image: guideImage,
    icon: "fas fa-users",
    iconDescription: "Инструменты для укрепления связи с близкими.",
  },
  {
    id: 5,
    title: "Мотивация и Цели",
    description:
      "Найдите свой источник мотивации и научитесь ставить реалистичные цели.",
    date: "1 декабря 2024",
    category: "Карьерный рост",
    image: guideImage,
    icon: "fas fa-mountain",
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

const subscribeEmail = async () => {
  if (!validateEmail(email.value)) {
    alert("Пожалуйста, введите корректный email");
    return;
  }

  const result = await subscribeUser(db, email.value);
  if (result.success) {
    alert(result.message);
    email.value = "";
  } else {
    alert(result.message);
  }
};

const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};
</script>

<style scoped>
.bg-grid-white {
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.1) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes grid {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-20px);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delay {
  animation: float 6s ease-in-out infinite;
  animation-delay: -3s;
}

.animate-grid {
  animation: grid 20s linear infinite;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1e1b4b;
}

::-webkit-scrollbar-thumb {
  background: #4f46e5;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #6366f1;
}
</style>
