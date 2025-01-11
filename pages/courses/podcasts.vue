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
      <section class="text-center mb-10">
        <h1
          class="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#0EA5E9] to-[#22D3EE] tracking-tight mb-6"
        >
          Вдохновляющие Подкасты
        </h1>
        <p
          class="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
        >
          Слушайте истории успеха, практические советы и глубокие размышления о
          личностном росте в любое удобное время.
        </p>
      </section>

      <!-- Categories Menu -->
      <div class="mb-12">
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

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div
          class="w-12 h-12 rounded-full border-4 border-[#0EA5E9]/20 border-t-[#0EA5E9] animate-spin"
        ></div>
      </div>

      <!-- Podcasts Grid -->
      <div v-else class="grid md:grid-cols-2 gap-8">
        <div
          v-for="podcast in filteredPodcasts"
          :key="podcast.id"
          class="group bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-[#0EA5E9]/20 overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(14,165,233,0.3)]"
        >
          <div class="flex flex-col md:flex-row h-full">
            <!-- Image Container -->
            <div
              class="md:w-1/3 relative overflow-hidden aspect-[4/3] md:aspect-auto"
            >
              <img
                :src="podcast.image"
                :alt="podcast.title"
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            <!-- Content Container -->
            <div
              class="p-6 md:p-8 md:w-2/3 flex flex-col justify-between space-y-6"
            >
              <!-- Header Section -->
              <div class="space-y-4">
                <div
                  class="flex flex-col sm:flex-row sm:items-start justify-between gap-4"
                >
                  <h3
                    class="text-xl font-bold text-white/90 group-hover:text-[#0EA5E9] transition-colors duration-300 leading-tight"
                  >
                    {{ podcast.title }}
                  </h3>
                  <span
                    class="inline-block bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] text-white px-4 py-1.5 rounded-full text-sm whitespace-nowrap backdrop-blur-sm"
                  >
                    {{ podcast.category }}
                  </span>
                </div>
                <p class="text-slate-300 line-clamp-2">
                  {{ podcast.description }}
                </p>
              </div>

              <!-- Meta Information -->
              <div class="space-y-6">
                <!-- Stats -->
                <div class="flex flex-wrap items-center gap-6">
                  <div class="flex items-center whitespace-nowrap">
                    <i class="fas fa-clock text-[#0EA5E9] text-lg mr-3"></i>
                    <span class="text-slate-400">{{ podcast.duration }}</span>
                  </div>
                  <div class="flex items-center whitespace-nowrap">
                    <i
                      class="fas fa-headphones text-[#0EA5E9] text-lg mr-3"
                    ></i>
                    <span class="text-slate-400"
                      >{{ podcast.listens }} прослушиваний</span
                    >
                  </div>
                </div>

                <!-- Bottom Section -->
                <div
                  class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                >
                  <div class="flex items-center">
                    <img
                      :src="podcast.hostImage"
                      :alt="podcast.host"
                      class="w-10 h-10 rounded-full mr-3 border-2 border-[#0EA5E9]/20"
                    />
                    <span class="text-slate-300 font-medium">{{
                      podcast.host
                    }}</span>
                  </div>

                  <!-- Play Button -->
                  <NuxtLink
                    to="/podcast-player"
                    class="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium transition-all duration-300 ease-out rounded-lg group w-full sm:w-auto"
                  >
                    <span
                      class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-500 group-hover:translate-x-0 ease"
                    >
                      <i class="fas fa-play ml-2"></i>
                    </span>
                    <span
                      class="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform bg-gradient-to-r from-purple-500 to-cyan-500 group-hover:translate-x-full ease"
                    >
                      <i class="fas fa-headphones mr-2"></i>
                      Слушать
                    </span>
                    <span class="relative invisible">Слушать</span>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Subscribe Section -->
      <div
        class="mt-16 bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-[#0EA5E9]/20 p-4 sm:p-8 text-center transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(14,165,233,0.3)]"
      >
        <h2 class="text-2xl font-bold text-white/90 mb-4">
          Не пропускайте новые выпуски
        </h2>
        <p class="text-slate-300 mb-6 max-w-2xl mx-auto px-2">
          Подпишитесь на уведомления о новых подкастах и получайте эксклюзивный
          доступ к дополнительным материалам.
        </p>
        <div
          class="max-w-md mx-auto flex flex-col sm:flex-row gap-3 sm:gap-0 px-4 sm:px-0"
        >
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
import podcastImage from "~/assets/images/podcasts/podcasts.jpeg";
import hostImage from "~/assets/images/podcasts/podcasts.jpeg";
import { getFirestore } from "firebase/firestore";
import { subscribeUser } from "@/api/firebase/contact";

const db = getFirestore();
const email = ref("");

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
