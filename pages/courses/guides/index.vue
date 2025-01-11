<template>
  <div class="relative min-h-screen">
    <!-- Animated Background -->
    <div class="fixed inset-0 -z-1">
      <div class="absolute top-0 left-0 w-full h-full bg-[#1A1F35]">
        <!-- Enhanced Gradient Orbs -->
        <div
          class="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-[#0EA5E9]/10 to-[#22D3EE]/10 rounded-full blur-3xl animate-slow-drift opacity-60"
        ></div>
        <div
          class="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gradient-to-r from-[#F59E0B]/10 to-[#F97316]/10 rounded-full blur-3xl animate-slow-pulse opacity-40"
        ></div>
        <div
          class="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-r from-[#E879F9]/10 to-[#C084FC]/10 rounded-full blur-3xl animate-slow-float opacity-50"
        ></div>
      </div>
    </div>

    <div class="container mx-auto px-4 max-w-6xl relative z-10 pb-12 pt-12">
      <!-- Hero Section -->
      <section class="text-center mb-12">
        <h1
          class="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#0EA5E9] to-[#22D3EE] tracking-tight mb-6"
        >
          Руководства для Саморазвития
        </h1>
        <p
          class="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
        >
          Исследуйте практические руководства, которые помогут вам углубить
          самопознание, улучшить отношения и раскрыть внутренний потенциал.
        </p>
      </section>

      <!-- Filters Section -->
      <div class="mb-16">
        <div class="flex flex-wrap justify-center gap-3">
          <button
            v-for="category in categories"
            :key="category"
            @click="selectCategory(category)"
            :class="[
              'px-6 py-3 rounded-full transition-all duration-300 font-medium relative overflow-hidden group backdrop-blur-sm',
              selectedCategory === category
                ? 'bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] text-white'
                : 'bg-white/10 text-[#0EA5E9] border border-[#0EA5E9]/20 hover:text-white',
            ]"
          >
            <span class="relative z-10">{{ category }}</span>
            <div
              class="absolute inset-0 bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
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
          class="group bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-[#0EA5E9]/20 overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(14,165,233,0.3)] flex flex-col"
        >
          <!-- Guide Image -->
          <div class="relative overflow-hidden aspect-[4/3]">
            <img
              :src="guide.image"
              :alt="guide.title"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <!-- Category Badge -->
            <span
              :class="[
                'absolute top-4 left-4 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm text-white',
                {
                  'bg-green-500/80 border border-green-200':
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
          <div class="p-6 flex flex-col flex-grow">
            <h2
              class="text-xl font-bold text-white/90 group-hover:text-[#0EA5E9] transition-colors duration-300 line-clamp-2"
            >
              {{ guide.title }}
            </h2>
            <p class="text-slate-300 line-clamp-3 mt-2">
              {{ guide.description }}
            </p>
            <div class="flex items-center gap-4 mt-4">
              <i :class="guide.icon" class="text-lg text-[#0EA5E9]" />
              <p class="text-slate-400 text-sm">{{ guide.iconDescription }}</p>
            </div>
            <!-- Button Container -->
            <div class="mt-auto pt-6">
              <a
                :href="guide.link"
                class="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium transition-all duration-300 ease-out rounded-lg group w-full"
              >
                <span
                  class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-500 group-hover:translate-x-0 ease"
                >
                  <i class="fas fa-book-open"></i>
                </span>
                <span
                  class="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform bg-gradient-to-r from-purple-500 to-cyan-500 group-hover:translate-x-full ease"
                >
                  <i class="fas fa-arrow-right mr-2"></i>
                  Читать
                </span>
                <span class="relative invisible">Читать</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <div
        class="mt-16 bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-[#0EA5E9]/20 p-8 text-center transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(14,165,233,0.3)]"
      >
        <h2 class="text-2xl font-bold text-white/90 mb-4">
          Подпишитесь на новые материалы
        </h2>
        <p class="text-slate-300 mb-6 max-w-2xl mx-auto">
          Получите доступ к эксклюзивным руководствам, которые помогут вам в
          путешествии к самопознанию.
        </p>
        <div class="max-w-md mx-auto flex flex-col sm:flex-row gap-3 sm:gap-0">
          <input
            type="email"
            v-model="email"
            placeholder="Ваш email"
            class="w-full px-6 py-3 rounded-lg sm:rounded-l-lg sm:rounded-r-none bg-white/5 border border-[#0EA5E9]/20 text-white placeholder-slate-400/50 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
          />
          <button
            @click="subscribeEmail"
            class="relative inline-flex items-center justify-center min-w-[160px] overflow-hidden font-medium transition-all duration-300 ease-out rounded-lg sm:rounded-l-none sm:rounded-r-lg group"
          >
            <span
              class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-500 group-hover:translate-x-0 ease"
            >
              <i class="fas fa-bell text-lg"></i>
            </span>
            <span
              class="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform bg-gradient-to-r from-purple-500 to-cyan-500 group-hover:translate-x-full ease"
            >
              <i class="fas fa-envelope text-lg mr-2"></i>
              Подписаться
            </span>
            <span class="relative invisible px-8 py-3">Подписаться</span>
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
@keyframes slow-drift {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-200px, 300px);
  }
}

@keyframes slow-pulse {
  0%,
  100% {
    opacity: 0.1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes slow-float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-200px);
  }
}

.animate-slow-drift {
  animation: slow-drift 15s ease-in-out infinite;
}

.animate-slow-pulse {
  animation: slow-pulse 12s ease-in-out infinite;
}

.animate-slow-float {
  animation: slow-float 15s ease-in-out infinite;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1a1f35;
}

::-webkit-scrollbar-thumb {
  background: #0ea5e9;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #22d3ee;
}
</style>
