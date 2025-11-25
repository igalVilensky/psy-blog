<template>
  <div
    class="min-h-screen bg-white dark:bg-slate-950 text-gray-900 dark:text-white overflow-hidden transition-colors duration-300">
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
              <NuxtLink to="/"
                class="text-gray-600 dark:text-slate-400 hover:text-cyan-400 transition-all duration-300 flex items-center">
                <i class="fas fa-home mr-2 text-cyan-400"></i>
                <span class="group-hover:translate-x-1 transition-transform duration-300">Главная</span>
              </NuxtLink>
            </li>
            <li class="flex items-center">
              <i class="fas fa-chevron-right text-gray-400 dark:text-slate-600 mx-3 text-xs"></i>
              <span class="text-gray-900 dark:text-white font-medium" aria-current="page">Блог</span>
            </li>
          </ol>
        </nav>

        <!-- Title -->
        <div class="mb-8 animate-fade-in-up" style="animation-delay: 0.1s">
          <h1
            class="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
            Блог
          </h1>
          <p class="text-gray-600 dark:text-slate-400 mt-3 text-base sm:text-lg">
            Статьи о личностном росте, психологии и саморазвитии
          </p>
        </div>

        <!-- Categories Navigation -->
        <nav class="relative animate-fade-in-up" style="animation-delay: 0.2s" aria-label="Категории блога">
          <!-- Mobile Dropdown -->
          <div class="block md:hidden relative">
            <button type="button" @click="isOpen = !isOpen"
              class="w-full px-4 py-3 bg-gray-100 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl text-gray-900 dark:text-white flex items-center justify-between border border-gray-300 dark:border-slate-700/60 hover:border-cyan-500/60 transition-all duration-300">
              <span class="font-medium">{{
                activeCategory || "Все категории"
                }}</span>
              <i class="fas fa-chevron-down transition-transform duration-300 text-cyan-400"
                :class="{ 'rotate-180': isOpen }"></i>
            </button>

            <transition enter-active-class="transition duration-200 ease-out"
              enter-from-class="transform scale-y-0 opacity-0" enter-to-class="transform scale-y-100 opacity-100"
              leave-active-class="transition duration-200 ease-in" leave-from-class="transform scale-y-100 opacity-100"
              leave-to-class="transform scale-y-0 opacity-0">
              <div v-if="isOpen"
                class="absolute top-full left-0 right-0 z-20 mt-2 bg-white dark:bg-slate-800/90 backdrop-blur-xl border border-gray-300 dark:border-slate-700/60 rounded-xl shadow-2xl origin-top">
                <div class="py-2">
                  <button v-for="category in categories" :key="category" @click="selectCategory(category)"
                    class="w-full px-4 py-3 text-left text-sm font-medium transition-all duration-300" :class="[
                      activeCategory === category
                        ? 'text-gray-900 dark:text-white bg-cyan-500/20 border-l-2 border-cyan-400'
                        : 'text-gray-700 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-700/50',
                    ]">
                    <span class="flex items-center justify-between">
                      <span>{{ category }}</span>
                      <span v-if="getCategoryCount(category)"
                        class="ml-2 text-xs px-2 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-400 border border-cyan-400 dark:border-cyan-500/30">
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
              <div class="absolute bottom-0 left-0 right-0 h-px bg-gray-200 dark:bg-slate-800/60"></div>
              <ul class="flex flex-wrap -mb-px relative">
                <li v-for="category in categories" :key="category" class="mr-2">
                  <button type="button" @click="setActiveCategory(category)"
                    class="px-6 py-3 text-sm font-medium transition-all duration-300 relative group rounded-t-lg"
                    :class="[
                      activeCategory === category
                        ? 'text-gray-900 dark:text-white bg-gray-100 dark:bg-slate-800/40'
                        : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-800/20',
                    ]">
                    <span class="relative z-10">{{ category }}</span>
                    <span v-if="getCategoryCount(category)"
                      class="ml-2 text-xs px-2 py-0.5 rounded-full transition-colors duration-300" :class="[
                        activeCategory === category
                          ? 'bg-cyan-100 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-400 border border-cyan-400 dark:border-cyan-500/30'
                          : 'bg-gray-200 dark:bg-slate-700/50 text-gray-600 dark:text-slate-400 border border-gray-400 dark:border-slate-600/30',
                      ]">
                      {{ getCategoryCount(category) }}
                    </span>
                    <div v-if="activeCategory === category"
                      class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400"></div>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>

    <!-- Blog Posts Grid -->
    <main class="container mx-auto max-w-6xl px-4 sm:px-0 pb-16 md:pb-24 mt-8">
      <!-- Loading State -->
      <div v-if="isLoading"
        class="text-center py-20 bg-gray-100 dark:bg-slate-900/40 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-slate-800/60">
        <div class="text-cyan-400 mb-4">
          <i class="fas fa-spinner fa-spin text-5xl"></i>
        </div>
        <h3 class="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Загрузка постов...
        </h3>
        <p class="text-gray-600 dark:text-slate-400">Пожалуйста, подождите</p>
      </div>

      <!-- Posts Grid -->
      <div v-else-if="filteredPosts.length > 0" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <article v-for="(post, index) in filteredPosts" :key="post._id"
          class="post-card group bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 dark:from-slate-900/60 dark:via-slate-900/40 dark:to-slate-900/60 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-slate-800/60 overflow-hidden transition-all duration-500 hover:border-cyan-500/60 hover:shadow-2xl hover:shadow-cyan-500/20 hover:scale-[1.02] cursor-pointer"
          :style="{ animationDelay: `${index * 0.1}s` }"> <!-- Image -->
          <div class="relative aspect-[4/3] overflow-hidden">
            <nuxt-img v-if="post.image" :src="urlFor(post.image).width(550).height(310).url()"
              :alt="post.title || 'Изображение поста'"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" width="550"
              height="310" loading="lazy" format="webp" quality="80" />
            <div
              class="absolute inset-0 bg-gradient-to-t from-gray-900 dark:from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            </div>

            <!-- Category Badge -->
            <span
              class="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm border transition-all duration-300 group-hover:scale-110"
              :class="getCategoryStyle(post.category)">
              {{ post.category }}
            </span>
          </div>

          <!-- Content -->
          <div class="p-6">
            <h2
              class="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-4 line-clamp-2 group-hover:text-cyan-400 transition-colors duration-300">
              {{ post.title }}
            </h2>

            <!-- Meta Info -->
            <div
              class="flex items-center justify-between text-xs text-gray-600 dark:text-slate-400 pt-4 border-t border-gray-200 dark:border-slate-800/60">
              <div class="flex items-center space-x-1.5 group/views">
                <i class="far fa-eye text-cyan-400 group-hover/views:scale-110 transition-transform duration-300"></i>
                <span>{{ post.views || 0 }}</span>
              </div>
              <div class="flex items-center space-x-1.5 group/time">
                <i
                  class="far fa-clock text-purple-400 group-hover/time:scale-110 transition-transform duration-300"></i>
                <span>{{ post.readtime }} мин</span>
              </div>
              <div class="flex items-center space-x-1.5 group/date">
                <i
                  class="far fa-calendar text-pink-400 group-hover/date:scale-110 transition-transform duration-300"></i>
                <span>{{
                  new Date(post.publishedAt).toLocaleDateString("ru-RU", {
                    day: "numeric",
                    month: "short",
                  })
                }}</span>
              </div>
            </div>
          </div>

          <NuxtLink :to="`/blog/${post.slug.current}`" class="absolute inset-0 z-10"
            @click="incrementViewCount(post._id)" :aria-label="`Читать: ${post.title}`"></NuxtLink>
        </article>
      </div>

      <!-- Empty State -->
      <div v-else role="status" aria-live="polite"
        class="text-center py-20 bg-gray-100 dark:bg-slate-900/40 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-slate-800/60">
        <div class="text-cyan-400 mb-4">
          <i class="fas fa-search text-5xl"></i>
        </div>
        <h3 class="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Публикации не найдены
        </h3>
        <p class="text-gray-600 dark:text-slate-400">
          В данной категории пока нет публикаций. Попробуйте выбрать другую
          категорию.
        </p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useAsyncData, useNuxtApp } from "#app";
import { fetchPosts } from "~/api/sanity/posts";
import { getImageUrl } from "~/api/sanity/client";
import { getPostViewCount, incrementPostViewCount } from "~/api/firebase/views";
import { useHead } from "@unhead/vue";

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

// Fetch posts (this runs on server and client)
const { data: fetchedPosts } = await useAsyncData("posts", fetchPosts);
posts.value = Array.isArray(fetchedPosts.value) ? fetchedPosts.value : [];
isLoading.value = false;

// Load view counts AFTER page is visible (non-blocking)
if (process.client) {
  // Use setTimeout to defer this until after initial render
  setTimeout(async () => {
    const fs = getClientFirestore();
    if (fs && posts.value.length > 0) {
      // Load view counts in background without blocking UI
      const viewPromises = posts.value.map(async (post) => {
        try {
          post.views = await getPostViewCount(fs, post._id);
        } catch (error) {
          console.warn(`Failed to load views for post ${post._id}:`, error);
          post.views = 0;
        }
      });

      // Don't await - let it load in background
      Promise.all(viewPromises).catch((err) => {
        console.warn("Some view counts failed to load:", err);
      });
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

// Category styling
const getCategoryStyle = (category) => {
  const styles = {
    "Личностный рост": "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
    Отношения: "bg-purple-500/20 text-purple-300 border-purple-500/40",
    Продуктивность: "bg-pink-500/20 text-pink-300 border-pink-500/40",
  };
  return (
    styles[category] || "bg-slate-700/50 text-slate-300 border-slate-600/40"
  );
};

// Firestore view count (non-blocking)
const incrementViewCount = async (postId) => {
  const fs = getClientFirestore();
  if (!fs) return;

  // Fire and forget - don't block navigation
  incrementPostViewCount(fs, postId).catch((err) => {
    console.warn("Failed to increment view count:", err);
  });
};

// SEO
useHead({
  title: "Блог о личностном росте и самопознании | MindQ Lab",
  link: [{ rel: "canonical", href: "https://www.mindqlab.com/blog" }],
  meta: [
    {
      name: "description",
      content:
        "Читайте статьи о личностном росте, психологии, продуктивности и отношениях на MindQ Lab.",
    },
    {
      name: "keywords",
      content:
        "личностный рост, психология, продуктивность, самопознание, блог, MindQ Lab",
    },
  ],
});
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

.post-card {
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
