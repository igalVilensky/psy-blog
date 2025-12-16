<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs />

      <!-- Header Section -->
      <div class="mb-12 text-center relative mt-8">
        <div
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl -z-10">
        </div>

        <span
          class="inline-block px-4 py-1.5 rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 text-sm font-medium mb-6 border border-cyan-200 dark:border-cyan-700/50">
          Библиотека знаний
        </span>

        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
          Руководства для Саморазвития
        </h1>

        <p class="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Практические гайды и упражнения для личностного роста, эмоционального интеллекта и построения отношений.
        </p>
      </div>

      <!-- Category Navigation -->
      <div class="flex flex-wrap justify-center gap-2 mb-12">
        <button v-for="category in categories" :key="category" @click="selectedCategory = category"
          class="px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 border" :class="[
            selectedCategory === category
              ? 'bg-cyan-500 text-white border-cyan-500 shadow-lg shadow-cyan-500/25'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-cyan-500/50 hover:text-cyan-500 dark:hover:text-cyan-400'
          ]">
          {{ category }}
          <span v-if="getCategoryCount(category)"
            class="ml-2 text-xs opacity-80 bg-white/20 px-1.5 py-0.5 rounded-full">
            {{ getCategoryCount(category) }}
          </span>
        </button>
      </div>

      <!-- Guides Grid -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <article v-for="(guide, index) in filteredGuides" :key="guide._id"
          class="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:border-cyan-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10">

          <!-- Glow Effect -->
          <div
            class="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          </div>

          <div class="relative z-10">
            <!-- Image -->
            <div class="relative aspect-[4/3] overflow-hidden">
              <nuxt-img v-if="guide.image" :src="urlFor(guide.image).width(550).height(310).url()" :alt="guide.title"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" width="550"
                height="310" loading="lazy" format="webp" quality="80" />
              <div
                class="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              </div>

              <!-- Category Badge -->
              <span
                class="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg backdrop-blur-md border transition-all duration-300 group-hover:scale-105"
                :class="getCategoryStyle(guide.category)">
                {{ guide.category }}
              </span>
            </div>

            <!-- Content -->
            <div class="p-6">
              <h3
                class="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-blue-500 transition-all duration-300">
                {{ guide.title }}
              </h3>

              <p class="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 mb-6 leading-relaxed">
                {{ guide.description }}
              </p>

              <!-- Footer -->
              <div class="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                <div class="flex items-center text-xs text-slate-500 dark:text-slate-400">
                  <i :class="getCategoryIcon(guide.category)" class="text-cyan-500 mr-2"></i>
                  <span>{{ getCategoryDescription(guide.category) }}</span>
                </div>

                <NuxtLink v-if="guide.slug?.current" :to="`/lab/psychology/guides/${guide.slug.current}`"
                  class="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-blue-500 group-hover:text-white transition-all duration-300 group-hover:shadow-lg group-hover:shadow-cyan-500/25">
                  <i class="fas fa-arrow-right group-hover:translate-x-0.5 transition-transform"></i>
                </NuxtLink>
              </div>
            </div>
          </div>
        </article>
      </div>

      <!-- Empty State -->
      <div v-if="filteredGuides?.length === 0"
        class="text-center py-20 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div
          class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 mb-6 group">
          <i
            class="fas fa-book-open text-4xl text-slate-400 dark:text-slate-500 group-hover:text-cyan-500 transition-colors duration-300"></i>
        </div>
        <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-3">
          Руководства не найдены
        </h3>
        <p class="text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
          В данной категории пока нет материалов. Попробуйте выбрать другую тему или загляните позже.
        </p>
      </div>

      <!-- Subscription Section -->
      <div class="mt-16 relative overflow-hidden rounded-3xl">
        <!-- Background with gradient and noise -->
        <div class="absolute inset-0 bg-slate-900 dark:bg-black"></div>
        <div class="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-slate-900/50 to-purple-900/20"></div>
        <div
          class="absolute inset-0 bg-[url('https://toomanyadapters.com/wp-content/uploads/2022/04/White-noise.jpg')] opacity-[0.05] mix-blend-overlay">
        </div>

        <!-- Decorative elements -->
        <div
          class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent">
        </div>
        <div
          class="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent">
        </div>

        <div class="relative z-10 px-6 py-16 sm:px-12 text-center">
          <div
            class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-white/10 mb-8 backdrop-blur-sm">
            <i class="fas fa-envelope text-2xl text-cyan-400"></i>
          </div>

          <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
            Подпишитесь на новые материалы
          </h2>
          <p class="text-slate-400 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
            Получайте эксклюзивные руководства и материалы для саморазвития прямо на почту. Начните путь к самопознанию
            уже сегодня.
          </p>

          <div class="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <div class="flex-1 relative group">
              <div
                class="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              </div>
              <input type="email" v-model="email" placeholder="Ваш email"
                class="relative w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm" />
            </div>
            <button @click="subscribeEmail"
              class="px-8 py-4 rounded-xl bg-white text-slate-900 font-bold hover:bg-cyan-50 transition-all duration-300 shadow-lg shadow-white/5 hover:shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98]">
              Подписаться
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "laboratory",
});
import { ref, computed } from "vue";
import { fetchGuides } from "~/api/sanity/guides";
import { getImageUrl } from "~/api/sanity/client";
import { getFirestore } from "firebase/firestore";
import { subscribeUser } from "@/api/firebase/contact";
import Breadcrumbs from "~/components/ui/Breadcrumbs.vue";

// Fetch guides
const initialGuides = await fetchGuides();
const guides = ref(initialGuides.data || []);

// Image URL builder
const { projectId, dataset } = useSanity().client.config();
const urlFor = getImageUrl(projectId, dataset);

// Categories
const categories = [
  "Все",
  "Самопознание",
  "Эмоциональный интеллект",
  "Отношения",
  "Карьерный рост",
];

// Selected category
const selectedCategory = ref("Все");
const email = ref("");

// Filtered guides
const filteredGuides = computed(() => {
  return selectedCategory.value === "Все"
    ? guides.value
    : guides.value.filter((guide) => guide.category === selectedCategory.value);
});

// Get count of guides in each category
const getCategoryCount = (category) => {
  if (category === "Все") return guides.value?.length;
  return guides.value?.filter((guide) => guide.category === category)?.length;
};

// Category styling
const getCategoryStyle = (category) => {
  const styles = {
    Самопознание: "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-200 border-green-200 dark:border-green-700/50",
    "Эмоциональный интеллект": "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-200 border-purple-200 dark:border-purple-700/50",
    Отношения: "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-700/50",
    "Карьерный рост": "bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-400 border-pink-200 dark:border-pink-700/50",
  };
  return styles[category] || "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700";
};

const getCategoryIcon = (category) => {
  const icons = {
    Самопознание: "fas fa-star",
    "Эмоциональный интеллект": "fas fa-heart",
    Отношения: "fas fa-users",
    "Карьерный рост": "fas fa-mountain",
  };
  return icons[category] || "fas fa-star";
};

const getCategoryDescription = (category) => {
  const descriptions = {
    Самопознание: "Самоанализ",
    "Эмоциональный интеллект": "Эмпатия",
    Отношения: "Связи",
    "Карьерный рост": "Цели",
  };
  return descriptions[category] || "Материалы";
};

// Email subscription
const db = getFirestore();

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
