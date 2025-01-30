<template>
  <div class="relative min-h-screen">
    <div class="relative z-10">
      <!-- Header Section -->
      <header class="pt-8 px-4 relative">
        <!-- Animated Background Gradient -->
        <div
          class="absolute -bottom-2 sm:bottom-0 inset-0 bg-gradient-to-r from-[#0EA5E9]/10 via-[#E879F9]/10 to-[#0EA5E9]/10 animate-gradient-x"
        ></div>

        <div class="container mx-auto max-w-6xl relative">
          <!-- Enhanced Breadcrumb -->
          <nav class="mb-6">
            <ol class="flex items-center space-x-2 text-sm">
              <li class="flex items-center group">
                <NuxtLink
                  to="/"
                  class="text-slate-300 hover:text-[#0EA5E9] transition-all duration-300 flex items-center"
                >
                  <i class="fas fa-home mr-2 text-[#0EA5E9]"></i>
                  <span
                    class="group-hover:translate-x-1 transition-transform duration-300"
                    >Главная</span
                  >
                </NuxtLink>
              </li>
              <li class="flex items-center">
                <i class="fas fa-chevron-right text-slate-400 mx-3 text-xs"></i>
                <span class="text-white font-medium" aria-current="page"
                  >Курсы</span
                >
              </li>
            </ol>
          </nav>

          <!-- Enhanced Title Section -->
          <div class="mb-6">
            <div class="md:inline-block w-full md:w-auto">
              <div
                class="bg-[#0EA5E9]/20 md:bg-transparent px-6 py-4 md:p-0 rounded-lg"
              >
                <h1 class="text-3xl md:text-4xl font-bold text-white">Курсы</h1>
              </div>
            </div>
          </div>

          <!-- Enhanced Category Navigation -->
          <nav class="relative" aria-label="Категории курсов">
            <!-- Gradient border -->
            <div
              class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
            ></div>

            <!-- Mobile Dropdown Button -->
            <div class="block md:hidden relative mb-4">
              <button
                type="button"
                @click="isOpen = !isOpen"
                class="w-full px-4 py-3 bg-white/5 rounded-lg text-white flex items-center justify-between border border-white/10"
              >
                <span>{{ selectedCategory || "Все категории" }}</span>
                <i
                  class="fas fa-chevron-down transition-transform duration-300"
                  :class="{ 'rotate-180': isOpen }"
                ></i>
              </button>

              <!-- Mobile Dropdown Menu -->
              <transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="transform scale-y-0 opacity-0"
                enter-to-class="transform scale-y-100 opacity-100"
                leave-active-class="transition duration-200 ease-in"
                leave-from-class="transform scale-y-100 opacity-100"
                leave-to-class="transform scale-y-0 opacity-0"
              >
                <div
                  v-if="isOpen"
                  class="absolute top-full left-0 right-0 z-20 mt-2 bg-[#1A1F35] border border-white/10 rounded-lg shadow-lg origin-top"
                >
                  <div class="py-2">
                    <button
                      v-for="category in categories"
                      :key="category"
                      @click="handleCategorySelect(category)"
                      class="w-full px-4 py-3 text-left text-sm font-medium transition-colors duration-300"
                      :class="[
                        selectedCategory === category
                          ? 'text-white bg-[#0EA5E9]/20'
                          : 'text-slate-200 hover:text-white hover:bg-white/5',
                      ]"
                    >
                      <span class="flex items-center justify-between">
                        {{ category }}
                        <span
                          v-if="getCategoryCount(category)"
                          class="ml-2 text-xs px-2 py-0.5 rounded-full bg-[#0EA5E9]/10 border border-[#0EA5E9]/20"
                        >
                          {{ getCategoryCount(category) }}
                        </span>
                      </span>
                    </button>
                  </div>
                </div>
              </transition>
            </div>

            <!-- Desktop Navigation -->
            <ul class="hidden md:flex flex-wrap -mb-px relative">
              <li v-for="category in categories" :key="category" class="mr-2">
                <button
                  type="button"
                  @click="selectCategory(category)"
                  class="px-6 py-3 text-sm font-medium transition-all duration-300 relative group"
                  :class="[
                    selectedCategory === category
                      ? 'text-white'
                      : 'text-slate-200 hover:text-white',
                  ]"
                >
                  <span class="relative z-10">{{ category }}</span>
                  <span
                    v-if="getCategoryCount(category)"
                    class="ml-2 text-xs px-2 py-0.5 rounded-full bg-[#0EA5E9]/10 border border-[#0EA5E9]/20"
                  >
                    {{ getCategoryCount(category) }}
                  </span>
                  <!-- Active Indicator -->
                  <div
                    v-if="selectedCategory === category"
                    class="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0EA5E9]"
                  ></div>
                  <!-- Hover Indicator -->
                  <div
                    v-else
                    class="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0EA5E9] opacity-0 transform scale-x-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-x-100"
                  ></div>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <!-- Rest of your existing content -->
      <main class="container mx-auto max-w-6xl px-4 sm:px-0 mt-4 sm:mt-8">
        <!-- Your existing course grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Your existing course cards -->
          <div
            v-for="course in filteredCourses"
            :key="course.id"
            class="group bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-[#0EA5E9]/20 overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(14,165,233,0.3)] flex flex-col"
          >
            <!-- Course Image -->
            <div class="relative overflow-hidden aspect-[4/3]">
              <img
                :src="course.image"
                :alt="course.title"
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <!-- Discount Badge -->
              <div v-if="course.discount" class="absolute top-4 right-4">
                <span
                  class="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm"
                >
                  -{{ course.discount }}%
                </span>
              </div>
            </div>

            <!-- Course Content -->
            <div class="p-6 sm:p-8 flex flex-col flex-grow">
              <!-- Rest of your course card content -->
              <h2
                class="text-xl font-bold text-white/90 group-hover:text-[#0EA5E9] transition-colors duration-300 line-clamp-2"
              >
                {{ course.title }}
              </h2>
              <p class="text-slate-300 line-clamp-3 mt-2">
                {{ course.description }}
              </p>
              <!-- Dynamic Icons Section -->
              <div class="flex items-center gap-4 mt-4">
                <div v-if="course.duration" class="flex items-center gap-2">
                  <i class="fas fa-clock text-[#0EA5E9]"></i>
                  <p class="text-slate-400 text-sm">{{ course.duration }}</p>
                </div>
                <div v-else-if="course.lessons" class="flex items-center gap-2">
                  <i class="fas fa-book text-[#0EA5E9]"></i>
                  <p class="text-slate-400 text-sm">
                    {{ course.lessons }} уроков
                  </p>
                </div>
                <div v-if="course.hasPractical" class="flex items-center gap-2">
                  <i class="fas fa-tasks text-[#0EA5E9]"></i>
                  <p class="text-slate-400 text-sm">Практические задания</p>
                </div>
              </div>
              <!-- Button Container -->
              <div class="mt-auto pt-6">
                <a
                  :href="course.link"
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
                    Подробнее
                  </span>
                  <span class="relative invisible">Подробнее</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-if="filteredCourses.length === 0"
          class="text-center py-16 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10"
        >
          <div class="text-[#0EA5E9] mb-4">
            <i class="fas fa-search text-4xl"></i>
          </div>
          <h3 class="text-xl font-semibold text-white/90 mb-2">
            Курсы не найдены
          </h3>
          <p class="text-slate-300">
            В данной категории пока нет курсов. Пожалуйста, выберите другую
            категорию.
          </p>
        </div>
      </main>

      <!-- Call to Action -->
      <div
        class="mt-16 bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-[#0EA5E9]/20 p-6 sm:p-8 text-center transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(14,165,233,0.3)]"
      >
        <!-- Your existing CTA content -->
        <h2 class="text-2xl font-bold text-white/90 mb-4">
          Подпишитесь на новые материалы
        </h2>
        <p class="text-slate-300 mb-6 max-w-2xl mx-auto">
          Получите доступ к эксклюзивным курсам, которые помогут вам в
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
import courseImage from "~/assets/images/courses/loveyourself.webp";
import { getFirestore } from "firebase/firestore";
import { subscribeUser } from "@/api/firebase/contact";

const isOpen = ref(false);

const handleCategorySelect = (category) => {
  selectCategory(category);
  isOpen.value = false;
};
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
    title: 'Курс "Исцеление детских травм"',
    description:
      "Исследуйте и исцелите свои детские травмы через 21 урок, включая теоретические и практические задания. Узнайте, как травмы влияют на вашу жизнь, и научитесь их преодолевать.",
    price: 4900,
    lessons: 21,
    hasPractical: true,
    participants: 250,
    category: "Саморазвитие",
    image: courseImage,
    discount: 20,
    link: "/courses/healing-childhood-traumas",
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

const getCategoryCount = (category) => {
  if (category === "Все") return courses.length;
  return courses.filter((course) => course.category === category).length;
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
@keyframes gradient-x {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.animate-gradient-x {
  animation: gradient-x 15s ease infinite;
  background-size: 200% 200%;
}
</style>
