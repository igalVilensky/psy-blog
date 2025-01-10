<template>
  <div class="relative min-h-screen">
    <!-- Animated Background -->
    <div class="fixed inset-0 -z-1">
      <div class="absolute top-0 left-0 w-full h-full bg-[#1A1F35]">
        <!-- Gradient Orbs -->
        <div
          class="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-[#0EA5E9]/10 to-[#22D3EE]/10 rounded-full blur-3xl animate-slow-drift"
        ></div>
        <div
          class="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gradient-to-r from-[#F59E0B]/10 to-[#F97316]/10 rounded-full blur-3xl animate-slow-pulse"
        ></div>
        <div
          class="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-r from-[#E879F9]/10 to-[#C084FC]/10 rounded-full blur-3xl animate-slow-float"
        ></div>
      </div>
    </div>

    <div class="container mx-auto px-4 max-w-6xl relative z-10 pb-12 pt-12">
      <!-- Hero Section -->
      <section class="text-center mb-12">
        <h1
          class="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#0EA5E9] to-[#22D3EE] tracking-tight mb-6"
        >
          Ваш Путь к Личностному Расцвету
        </h1>
        <p
          class="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
        >
          Откройте для себя инструменты трансформации и личностного роста.
          Каждый курс - это путешествие к лучшей версии себя.
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
                ? 'bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] text-white'
                : 'bg-white/10 text-[#0EA5E9] border border-[#0EA5E9]/20',
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

      <!-- Courses Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="course in filteredCourses"
          :key="course.id"
          class="group bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-[#0EA5E9]/20 overflow-hidden transform transition-all duration-300 hover:-translate-y-2"
        >
          <!-- Course Image -->
          <div class="relative overflow-hidden">
            <img
              :src="course.image"
              :alt="course.title"
              class="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <!-- Discount Badge -->
            <div v-if="course.discount" class="absolute top-4 right-4">
              <span
                class="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md backdrop-blur-sm"
              >
                -{{ course.discount }}%
              </span>
            </div>
          </div>

          <!-- Course Content -->
          <div class="p-8">
            <h2
              class="text-xl font-bold text-white/90 mb-4 line-clamp-2 group-hover:text-[#0EA5E9] transition-colors duration-300"
            >
              {{ course.title }}
            </h2>
            <p class="text-slate-300 mb-4 line-clamp-3">
              {{ course.description }}
            </p>
            <div class="flex items-center gap-4 mb-4">
              <i class="fas fa-clock text-[#0EA5E9]" />
              <p class="text-slate-400 text-sm">{{ course.duration }}</p>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-slate-400"
                >{{ course.participants }} участниц</span
              >
              <a
                :href="course.link"
                class="bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all"
              >
                Подробнее
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <div
        class="mt-16 bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-[#0EA5E9]/20 p-8 text-center transform transition-all duration-300 hover:-translate-y-2"
      >
        <h2 class="text-2xl font-bold text-white/90 mb-4">
          Подпишитесь на новые материалы
        </h2>
        <p class="text-slate-300 mb-6 max-w-2xl mx-auto">
          Получите доступ к эксклюзивным курсам, которые помогут вам в
          путешествии к самопознанию.
        </p>
        <div class="max-w-md mx-auto flex">
          <input
            type="email"
            v-model="email"
            placeholder="Ваш email"
            class="w-full px-4 py-3 rounded-l-lg bg-white/5 border border-[#0EA5E9]/20 text-white placeholder-slate-400/50 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
          />
          <button
            @click="subscribeEmail"
            class="bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] text-white px-6 py-3 rounded-r-lg hover:opacity-90 transition-all"
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
import { subscribeUser } from "@/api/firebase/contact";

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

const courses = [
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
    link: "/courses/love-yourself",
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
    link: "/courses/perfect-relationships",
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
    link: "/courses/emotional-intelligence",
  },
];

const selectCategory = (category) => {
  selectedCategory.value = category;
};

const filteredCourses = computed(() => {
  return selectedCategory.value === "Все"
    ? courses
    : courses.filter((course) => course.category === selectedCategory.value);
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
