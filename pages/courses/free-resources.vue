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
          Бесплатные материалы для вашего роста
        </h1>
        <p
          class="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
        >
          Откройте для себя инструменты личностного развития без каких-либо
          затрат. Каждый ресурс создан, чтобы вдохновить и поддержать вас на
          пути к себе.
        </p>
      </section>

      <!-- Resource Types Tabs -->
      <div class="mb-16">
        <div class="flex flex-wrap justify-center gap-3">
          <button
            v-for="type in resourceTypes"
            :key="type"
            @click="selectedType = type"
            :class="[
              'px-6 py-3 rounded-full transition-all duration-300 font-medium relative overflow-hidden group backdrop-blur-sm',
              selectedType === type
                ? 'bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] text-white'
                : 'bg-white/10 text-[#0EA5E9] border border-[#0EA5E9]/20 hover:text-white',
            ]"
          >
            <span class="relative z-10">{{ type }}</span>
            <div
              class="absolute inset-0 bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
              :class="{ 'scale-x-100': selectedType === type }"
            ></div>
          </button>
        </div>
      </div>

      <!-- Resources Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="resource in filteredResources"
          :key="resource.id"
          class="group bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-[#0EA5E9]/20 overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(14,165,233,0.3)] flex flex-col"
        >
          <!-- Resource Image -->
          <div class="relative overflow-hidden aspect-[4/3]">
            <img
              :src="resource.image"
              :alt="resource.title"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <!-- Type Badge -->
            <div
              class="absolute top-4 left-4 bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm"
            >
              {{ resource.type }}
            </div>
          </div>

          <!-- Resource Content -->
          <div class="p-6 flex flex-col flex-grow">
            <h2
              class="text-xl font-bold text-white/90 group-hover:text-[#0EA5E9] transition-colors duration-300 line-clamp-2"
            >
              {{ resource.title }}
            </h2>
            <p class="text-slate-300 line-clamp-3 mt-2">
              {{ resource.description }}
            </p>
            <div class="flex items-center gap-4 mt-4">
              <i :class="resource.icon" class="text-lg text-[#0EA5E9]" />
              <p class="text-slate-400 text-sm">{{ resource.duration }}</p>
            </div>
            <!-- Button Container -->
            <div class="mt-auto pt-6">
              <button
                @click="openResource(resource)"
                class="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium transition-all duration-300 ease-out rounded-lg group w-full"
              >
                <span
                  class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-500 group-hover:translate-x-0 ease"
                >
                  <i class="fas fa-download"></i>
                </span>
                <span
                  class="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform bg-gradient-to-r from-purple-500 to-cyan-500 group-hover:translate-x-full ease"
                >
                  <i class="fas fa-arrow-down mr-2"></i>
                  Получить
                </span>
                <span class="relative invisible">Получить</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Email Capture CTA -->
      <div
        class="mt-16 bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-[#0EA5E9]/20 p-8 text-center transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(14,165,233,0.3)]"
      >
        <h2 class="text-2xl font-bold text-white/90 mb-4">
          Получайте бесплатные материалы первыми
        </h2>
        <p class="text-slate-300 mb-6 max-w-2xl mx-auto">
          Подпишитесь на нашу рассылку и будьте в курсе всех новых бесплатных
          ресурсов, которые помогут вам расти и развиваться.
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
import courseImage from "~/assets/images/freeResourses/metCards.webp";
import { getFirestore } from "firebase/firestore";
import { subscribeUser } from "@/api/firebase/contact";

const db = getFirestore();
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
  alert(`Открытие ресурса: ${resource.title}`);
};

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
