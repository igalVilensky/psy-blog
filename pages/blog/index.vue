<template>
  <div
    class="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-white font-sans transition-colors duration-500">

    <!-- Navigation -->
    <TopBar />

    <!-- Header Section -->
    <header class="relative pt-12 pb-8 px-6 border-b border-stone-200 dark:border-stone-800">
      <div class="container mx-auto max-w-7xl relative sm:px-8">
        <!-- Breadcrumb -->
        <nav class="mb-10" aria-label="Breadcrumb">
          <ol class="flex items-center space-x-3 text-xs font-bold uppercase tracking-widest">
            <li class="flex items-center group">
              <NuxtLink to="/"
                class="text-stone-400 hover:text-stone-900 dark:hover:text-white transition-all duration-300 flex items-center">
                <i class="fas fa-home mr-2"></i>
                <span>Главная</span>
              </NuxtLink>
            </li>
            <li class="flex items-center">
              <i class="fas fa-chevron-right text-stone-300 dark:text-stone-700 mx-2 text-[10px]"></i>
              <span class="text-stone-900 dark:text-white" aria-current="page">Блог</span>
            </li>
          </ol>
        </nav>

        <!-- Title -->
        <div class="mb-12">
          <h1 class="text-4xl md:text-6xl font-bold uppercase tracking-tight text-stone-900 dark:text-white mb-6">
            Блог
          </h1>
          <p
            class="text-sm font-medium text-stone-500 dark:text-stone-400 max-w-2xl uppercase tracking-wide leading-relaxed">
            Статьи о личностном росте, практической психологии и системном подходе к саморазвитию.
          </p>
        </div>

        <!-- Categories Navigation -->
        <nav class="relative" aria-label="Категории блога">
          <!-- Mobile Dropdown -->
          <div class="block md:hidden relative">
            <button type="button" @click="isOpen = !isOpen"
              class="w-full px-6 py-4 bg-white dark:bg-stone-900 text-stone-900 dark:text-white flex items-center justify-between border border-stone-200 dark:border-stone-800 hover:border-stone-400 transition-all duration-300">
              <span class="font-bold uppercase tracking-custom text-xs">{{ activeCategory || "Все категории" }}</span>
              <i class="fas fa-chevron-down transition-transform duration-300 text-stone-400"
                :class="{ 'rotate-180': isOpen }"></i>
            </button>

            <transition enter-active-class="transition duration-200 ease-out"
              enter-from-class="transform scale-y-0 opacity-0" enter-to-class="transform scale-y-100 opacity-100"
              leave-active-class="transition duration-200 ease-in" leave-from-class="transform scale-y-100 opacity-100"
              leave-to-class="transform scale-y-0 opacity-0">
              <div v-if="isOpen"
                class="absolute top-full left-0 right-0 z-20 mt-0 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xl origin-top overflow-hidden">
                <div class="py-1">
                  <button v-for="category in categories" :key="category" @click="selectCategory(category)"
                    class="w-full px-6 py-4 text-left text-xs font-bold uppercase tracking-wider transition-all duration-300"
                    :class="[
                      activeCategory === category
                        ? 'text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-900'
                        : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-50 dark:hover:bg-stone-800',
                    ]">
                    <span class="flex items-center justify-between">
                      <span>{{ category }}</span>
                      <span v-if="getCategoryCount(category)" class="text-[10px] opacity-60">{{
                        getCategoryCount(category) }}</span>
                    </span>
                  </button>
                </div>
              </div>
            </transition>
          </div>

          <!-- Desktop Tabs -->
          <div class="hidden md:block">
            <div class="flex items-center space-x-2">
              <button v-for="category in categories" :key="category" @click="setActiveCategory(category)"
                class="px-6 py-3 text-xs font-bold uppercase tracking-wider transition-all duration-300 border" :class="[
                  activeCategory === category
                    ? 'bg-stone-900 text-white border-stone-900 dark:bg-white dark:text-stone-900 dark:border-white'
                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-600',
                ]">
                {{ category }}
                <span v-if="getCategoryCount(category)" class="ml-2 text-[10px] opacity-60">{{
                  getCategoryCount(category) }}</span>
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>

    <!-- Blog Posts Grid -->
    <main class="container mx-auto max-w-7xl px-6 pb-24 pt-12 sm:px-8">
      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-32 flex flex-col items-center">
        <div class="w-12 h-12 border-4 border-stone-200 border-t-stone-900 rounded-full animate-spin mb-6">
        </div>
        <h3 class="text-lg font-bold uppercase tracking-widest text-stone-900 dark:text-white mb-2">Загрузка...</h3>
      </div>

      <!-- Posts Grid -->
      <div v-else-if="filteredPosts.length > 0" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        <article v-for="(post, index) in filteredPosts" :key="post._id"
          class="group flex flex-col bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 transition-all duration-500 hover:border-stone-400 dark:hover:border-stone-600">

          <!-- Image -->
          <NuxtLink :to="`/blog/${post.slug.current}`"
            class="relative aspect-[16/10] overflow-hidden bg-stone-100 dark:bg-stone-800"
            @click="incrementViewCount(post._id)">
            <nuxt-img v-if="post.image" :src="urlFor(post.image).width(600).height(375).url()"
              :alt="post.title || 'Изображение поста'"
              class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" width="600"
              height="375" loading="lazy" format="webp" quality="85" />
            <div v-else class="w-full h-full flex items-center justify-center text-stone-300">
              <i class="fas fa-image text-4xl"></i>
            </div>
            <div class="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/10 transition-colors duration-500">
            </div>

            <!-- Category Badge -->
            <span
              class="absolute top-4 left-4 px-3 py-1 bg-white dark:bg-stone-900 text-stone-900 dark:text-white text-[10px] font-bold uppercase tracking-widest border border-stone-200 dark:border-stone-800">
              {{ post.category }}
            </span>
          </NuxtLink>

          <!-- Content -->
          <div class="p-8 flex flex-col flex-grow">
            <h2
              class="text-lg font-bold uppercase tracking-tight mb-4 line-clamp-2 text-stone-900 dark:text-white transition-colors duration-300 group-hover:text-stone-600 dark:group-hover:text-stone-300 leading-snug">
              {{ post.title }}
            </h2>

            <p v-if="post.excerpt"
              class="text-xs font-medium text-stone-500 dark:text-stone-400 line-clamp-3 mb-6 uppercase tracking-wide leading-relaxed">
              {{ post.excerpt }}
            </p>

            <div
              class="mt-auto pt-6 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-stone-400">
              <div class="flex items-center space-x-4">
                <span class="flex items-center">
                  <i class="far fa-eye mr-2 text-stone-300"></i>
                  {{ post.views || 0 }}
                </span>
                <span class="flex items-center">
                  <i class="far fa-clock mr-2 text-stone-300"></i>
                  {{ post.readtime }} мин
                </span>
              </div>
              <span>{{ new Date(post.publishedAt).toLocaleDateString("ru-RU", { day: "numeric", month: "short" })
              }}</span>
            </div>
          </div>
        </article>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-32 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
        <i class="fas fa-feather-alt text-4xl text-stone-300 dark:text-stone-700 mb-6 block"></i>
        <h3 class="text-xl font-bold uppercase tracking-widest text-stone-900 dark:text-white mb-2">СКОРО</h3>
        <p class="text-xs font-bold uppercase tracking-wide text-stone-500 dark:text-stone-400">
          В данной категории мы скоро опубликуем новые материалы.
        </p>
      </div>
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useAsyncData, useNuxtApp } from "#app";
import { fetchPosts } from "~/api/sanity/posts";
import { getImageUrl } from "~/api/sanity/client";
import { getPostViewCount, incrementPostViewCount } from "~/api/firebase/views";
import { useHead } from "@unhead/vue";
import TopBar from '~/components/navigation/TopBar.vue';
import Footer from '~/components/ui/Footer.vue';

// Reactive state
const posts = ref([]);
const categories = ref([
  "Все",
  "Личностный рост",
  "Отношения",
  "Продуктивность",
]);
const activeCategory = ref("Все");
const isOpen = ref(false);
const isLoading = ref(true);

// Sanity image builder
const { projectId, dataset } = useSanity().client.config();
const urlFor = getImageUrl(projectId, dataset);

// Nuxt plugin Firestore
const getClientFirestore = () => {
  if (!process.client) return null;
  const nuxtApp = useNuxtApp();
  return nuxtApp.$firestore;
};

// Fetch posts
const { data: fetchedPosts } = await useAsyncData("posts", fetchPosts);
posts.value = Array.isArray(fetchedPosts.value) ? fetchedPosts.value : [];
isLoading.value = false;

// Load view counts in background
if (process.client) {
  setTimeout(async () => {
    const fs = getClientFirestore();
    if (fs && posts.value.length > 0) {
      const viewPromises = posts.value.map(async (post) => {
        try {
          post.views = await getPostViewCount(fs, post._id);
        } catch (error) {
          post.views = 0;
        }
      });
      Promise.all(viewPromises).catch(() => { });
    }
  }, 0);
}

// Computed filtered posts
const filteredPosts = computed(() => {
  if (!posts.value) return [];
  if (activeCategory.value === "Все") return posts.value;
  return posts.value.filter((p) => p.category === activeCategory.value);
});

// Helpers
const setActiveCategory = (category) => (activeCategory.value = category);
const selectCategory = (category) => {
  setActiveCategory(category);
  isOpen.value = false;
};
const getCategoryCount = (category) => {
  if (!posts.value) return 0;
  if (category === "Все") return posts.value.length;
  return posts.value.filter((p) => p.category === category).length;
};

// Increment view count
const incrementViewCount = async (postId) => {
  const fs = getClientFirestore();
  if (!fs) return;
  incrementPostViewCount(fs, postId).catch(() => { });
};

// SEO
useHead({
  title: "Блог | MindQLab — Развитие через данные и практику",
  meta: [
    { name: "description", content: "Читайте статьи о личностном росте, психологии, продуктивности и отношениях. Переводим теорию в понятные инструменты развития." },
  ],
});
</script>

<style scoped>
/* Custom Scrollbar for stone-palette */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  @apply bg-stone-50 dark:bg-stone-900;
}

::-webkit-scrollbar-thumb {
  @apply bg-stone-300 dark:bg-stone-700;
}
</style>
