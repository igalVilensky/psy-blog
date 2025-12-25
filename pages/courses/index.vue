<template>
  <div class="min-h-screen bg-slate-950 text-white overflow-hidden">
    <!-- Header Section -->
    <header class="relative pt-8 pb-6 px-4 sm:px-0">
      <!-- Subtle top glow -->
      <div
        class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent">
      </div>

      <div class="container mx-auto max-w-6xl relative">
        <!-- Breadcrumb -->
        <nav class="mb-6 animate-fade-in-up" aria-label="Breadcrumb">
          <ol class="flex items-center space-x-2 text-sm">
            <li class="flex items-center group">
              <NuxtLink to="/" class="text-slate-400 hover:text-cyan-400 transition-all duration-300 flex items-center">
                <i class="fas fa-home mr-2 text-cyan-400"></i>
                <span class="group-hover:translate-x-1 transition-transform duration-300">Главная</span>
              </NuxtLink>
            </li>
            <li class="flex items-center">
              <i class="fas fa-chevron-right text-slate-600 mx-3 text-xs"></i>
              <span class="text-white font-medium" aria-current="page">Курсы</span>
            </li>
          </ol>
        </nav>

        <!-- Title -->
        <div class="mb-8 animate-fade-in-up" style="animation-delay: 0.1s">
          <h1
            class="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
            Курсы
          </h1>
          <p class="text-slate-400 mt-3 text-base sm:text-lg">
            Программы для личностного роста и самопознания
          </p>
        </div>

        <!-- Categories Navigation -->
        <nav class="relative animate-fade-in-up" style="animation-delay: 0.2s" aria-label="Категории курсов">
          <!-- Mobile Dropdown -->
          <div class="block md:hidden relative">
            <button type="button" @click="isOpen = !isOpen"
              class="w-full px-4 py-3 bg-slate-800/60 backdrop-blur-sm rounded-xl text-white flex items-center justify-between border border-slate-700/60 hover:border-cyan-500/60 transition-all duration-300">
              <span class="font-medium">{{
                selectedCategory || "Все категории"
              }}</span>
              <i class="fas fa-chevron-down transition-transform duration-300 text-cyan-400"
                :class="{ 'rotate-180': isOpen }"></i>
            </button>

            <transition enter-active-class="transition duration-200 ease-out"
              enter-from-class="transform scale-y-0 opacity-0" enter-to-class="transform scale-y-100 opacity-100"
              leave-active-class="transition duration-200 ease-in" leave-from-class="transform scale-y-100 opacity-100"
              leave-to-class="transform scale-y-0 opacity-0">
              <div v-if="isOpen"
                class="absolute top-full left-0 right-0 z-20 mt-2 bg-slate-800/90 backdrop-blur-xl border border-slate-700/60 rounded-xl shadow-2xl origin-top">
                <div class="py-2">
                  <button v-for="category in categories" :key="category" @click="handleCategorySelect(category)"
                    class="w-full px-4 py-3 text-left text-sm font-medium transition-all duration-300" :class="[
                      selectedCategory === category
                        ? 'text-white bg-cyan-500/20 border-l-2 border-cyan-400'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700/50',
                    ]">
                    <span class="flex items-center justify-between">
                      {{ category }}
                      <span v-if="getCategoryCount(category)"
                        class="ml-2 text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                        {{ getCategoryCount(category) }}
                      </span>
                    </span>
                  </button>
                </div>
              </div>
            </transition>
          </div>

          <!-- Desktop Tabs -->
          <div class="hidden md:block">
            <div class="relative">
              <div class="absolute bottom-0 left-0 right-0 h-px bg-slate-800/60"></div>
              <ul class="flex flex-wrap -mb-px relative">
                <li v-for="category in categories" :key="category" class="mr-2">
                  <button type="button" @click="selectCategory(category)"
                    class="px-6 py-3 text-sm font-medium transition-all duration-300 relative group rounded-t-lg"
                    :class="[
                      selectedCategory === category
                        ? 'text-white bg-slate-800/40'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/20',
                    ]">
                    <span class="relative z-10">{{ category }}</span>
                    <span v-if="getCategoryCount(category)"
                      class="ml-2 text-xs px-2 py-0.5 rounded-full transition-colors duration-300" :class="[
                        selectedCategory === category
                          ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                          : 'bg-slate-700/50 text-slate-400 border border-slate-600/30',
                      ]">
                      {{ getCategoryCount(category) }}
                    </span>
                    <div v-if="selectedCategory === category"
                      class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400"></div>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>

    <!-- Courses Grid -->
    <main class="container mx-auto max-w-6xl px-4 sm:px-0 pb-16 md:pb-24 mt-8">
      <div v-if="filteredCourses.length > 0" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <article v-for="(course, index) in filteredCourses" :key="course.id"
          class="course-card group bg-gradient-to-br from-slate-900/60 via-slate-900/40 to-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-800/60 overflow-hidden transition-all duration-500 hover:border-cyan-500/60 hover:shadow-2xl hover:shadow-cyan-500/20 hover:scale-[1.02] flex flex-col"
          :style="{ animationDelay: `${index * 0.1}s` }">
          <!-- Image -->
          <div class="relative aspect-[4/3] overflow-hidden">
            <img :src="course.image" :alt="course.title"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy" />
            <div
              class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            </div>

            <!-- Discount Badge -->
            <span v-if="course.discount"
              class="absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-semibold bg-red-500/90 text-white shadow-lg backdrop-blur-sm border border-red-400/30 transition-all duration-300 group-hover:scale-110">
              -{{ course.discount }}%
            </span>

            <!-- Category Badge -->
            <span
              class="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm border transition-all duration-300 group-hover:scale-110"
              :class="getCategoryStyle(course.category)">
              {{ course.category }}
            </span>
          </div>

          <!-- Content -->
          <div class="p-6 flex flex-col flex-grow">
            <h2
              class="text-lg md:text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-cyan-400 transition-colors duration-300">
              {{ course.title }}
            </h2>

            <p class="text-slate-400 text-sm line-clamp-3 mb-4">
              {{ course.description }}
            </p>

            <!-- Course Info -->
            <div class="flex flex-wrap items-center gap-3 mb-4 text-xs text-slate-400">
              <div v-if="course.duration" class="flex items-center space-x-1.5 group/duration">
                <i
                  class="far fa-clock text-cyan-400 group-hover/duration:scale-110 transition-transform duration-300"></i>
                <span>{{ course.duration }}</span>
              </div>
              <div v-else-if="course.lessons" class="flex items-center space-x-1.5 group/lessons">
                <i
                  class="far fa-book text-purple-400 group-hover/lessons:scale-110 transition-transform duration-300"></i>
                <span>{{ course.lessons }} уроков</span>
              </div>
              <div v-if="course.hasPractical" class="flex items-center space-x-1.5 group/practical">
                <i
                  class="far fa-tasks text-pink-400 group-hover/practical:scale-110 transition-transform duration-300"></i>
                <span>Практика</span>
              </div>
            </div>

            <!-- Button -->
            <div class="mt-auto">
              <a :href="course.link"
                class="relative inline-flex items-center justify-center w-full px-6 py-3 overflow-hidden font-medium text-white transition-all duration-300 ease-out rounded-lg group/btn bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:shadow-lg hover:shadow-cyan-500/50">
                <span
                  class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 group-hover/btn:translate-x-0 ease">
                  <i class="fas fa-book-open"></i>
                </span>
                <span
                  class="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover/btn:translate-x-full ease">
                  <i class="fas fa-arrow-right mr-2"></i>
                  Подробнее
                </span>
                <span class="relative invisible">Подробнее</span>
              </a>
            </div>
          </div>
        </article>
      </div>

      <!-- Empty State -->
      <div v-else role="status" aria-live="polite"
        class="text-center py-20 bg-slate-900/40 backdrop-blur-xl rounded-3xl border border-slate-800/60">
        <div class="text-cyan-400 mb-4">
          <i class="fas fa-search text-5xl"></i>
        </div>
        <h3 class="text-2xl font-semibold text-white mb-2">Курсы не найдены</h3>
        <p class="text-slate-400">
          В данной категории пока нет курсов. Попробуйте выбрать другую
          категорию.
        </p>
      </div>

      <!-- Call to Action -->
      <div
        class="mt-16 bg-gradient-to-br from-slate-900/60 via-slate-900/40 to-slate-900/60 backdrop-blur-xl rounded-3xl border border-slate-800/60 p-8 sm:p-12 text-center transition-all duration-500 hover:border-cyan-500/60 hover:shadow-2xl hover:shadow-cyan-500/20">
        <h2 class="text-2xl sm:text-3xl font-bold text-white mb-4">
          Подпишитесь на новые материалы
        </h2>
        <p class="text-slate-400 mb-8 max-w-2xl mx-auto">
          Получите доступ к эксклюзивным курсам, которые помогут вам в
          путешествии к самопознанию.
        </p>
        <div class="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
          <input type="email" v-model="email" placeholder="Ваш email"
            class="flex-1 px-6 py-3 rounded-lg sm:rounded-l-lg sm:rounded-r-none bg-slate-800/60 border border-slate-700/60 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300" />
          <button @click="subscribeEmail"
            class="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-white transition-all duration-300 ease-out rounded-lg sm:rounded-l-none sm:rounded-r-lg group/btn bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:shadow-lg hover:shadow-cyan-500/50">
            <span
              class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 group-hover/btn:translate-x-0 ease">
              <i class="fas fa-bell"></i>
            </span>
            <span
              class="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover/btn:translate-x-full ease">
              <i class="fas fa-envelope mr-2"></i>
              Подписаться
            </span>
            <span class="relative invisible">Подписаться</span>
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const isOpen = ref(false);
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
    image:
      "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&h=600&fit=crop",
    discount: 20,
    link: "/space/psychology/healing-childhood-traumas",
  },
  {
    id: 2,
    title: 'Курс "Здоровые отношения"',
    description:
      "Научитесь строить крепкие и гармоничные отношения. Разберитесь в паттернах поведения и создайте счастливую личную жизнь.",
    lessons: 15,
    hasPractical: true,
    category: "Отношения",
    image:
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=600&fit=crop",
    link: "/courses",
  },
  {
    id: 3,
    title: 'Курс "Эмоциональный интеллект"',
    description:
      "Развивайте свой эмоциональный интеллект и научитесь лучше понимать себя и других. Управляйте эмоциями эффективно.",
    duration: "8 недель",
    hasPractical: true,
    category: "Эмоциональный интеллект",
    image:
      "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=800&h=600&fit=crop",
    link: "/courses",
  },
];

const selectCategory = (category) => {
  selectedCategory.value = category;
};

const handleCategorySelect = (category) => {
  selectCategory(category);
  isOpen.value = false;
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

const getCategoryStyle = (category) => {
  const styles = {
    Саморазвитие: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
    Отношения: "bg-purple-500/20 text-purple-700 border-purple-500/40",
    "Эмоциональный интеллект":
      "bg-pink-500/20 text-pink-300 border-pink-500/40",
    Карьера: "bg-blue-500/20 text-blue-300 border-blue-500/40",
  };
  return (
    styles[category] || "bg-slate-700/50 text-slate-300 border-slate-600/40"
  );
};

const subscribeEmail = () => {
  if (!validateEmail(email.value)) {
    alert("Пожалуйста, введите корректный email");
    return;
  }
  alert("Спасибо за подписку! Мы отправим вам информацию о новых курсах.");
  email.value = "";
};

const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out backwards;
}

.course-card {
  animation: fadeInUp 0.8s ease-out backwards;
}

/* Enhanced focus states for accessibility */
a:focus-visible,
button:focus-visible {
  outline: 2px solid theme("colors.cyan.400");
  outline-offset: 4px;
  border-radius: 0.75rem;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>

