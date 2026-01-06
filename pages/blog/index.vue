<template>
  <div
    class="min-h-screen bg-mindqlab-calm-bg dark:bg-mindqlab-calm-dark-bg text-stone-900 dark:text-stone-100 font-sans transition-colors duration-500">

    <!-- Navigation -->
    <TopBar />

    <!-- Header Section -->
    <header class="relative pt-12 pb-8 px-6 border-b border-stone-100 dark:border-stone-800/50">
      <div class="container mx-auto max-w-7xl relative sm:px-8">
        <!-- Breadcrumb -->
        <nav class="mb-10 animate-fade-up" aria-label="Breadcrumb">
          <ol class="flex items-center space-x-3 text-sm">
            <li class="flex items-center group">
              <NuxtLink to="/"
                class="text-stone-400 dark:text-stone-500 hover:text-mindqlab-calm-accent transition-all duration-300 flex items-center">
                <i class="fas fa-home mr-2 text-xs"></i>
                <span>Главная</span>
              </NuxtLink>
            </li>
            <li class="flex items-center">
              <i class="fas fa-chevron-right text-stone-300 dark:text-stone-700 mx-2 text-[10px]"></i>
              <span class="text-stone-900 dark:text-white font-medium" aria-current="page">Блог</span>
            </li>
          </ol>
        </nav>

        <!-- Title -->
        <div class="mb-12 animate-fade-up" style="animation-delay: 0.1s">
          <h1 class="text-4xl md:text-6xl font-light tracking-tight text-stone-900 dark:text-white mb-6">
            Блог
          </h1>
          <p class="text-lg text-stone-500 dark:text-stone-400 max-w-2xl font-light leading-relaxed">
            Статьи о личностном росте, практической психологии и системном подходе к саморазвитию.
          </p>
        </div>

        <!-- Categories Navigation -->
        <nav class="relative animate-fade-up" style="animation-delay: 0.2s" aria-label="Категории блога">
          <!-- Mobile Dropdown -->
          <div class="block md:hidden relative">
            <button type="button" @click="isOpen = !isOpen"
              class="w-full px-6 py-4 bg-white dark:bg-stone-900/40 rounded-2xl text-stone-900 dark:text-white flex items-center justify-between border border-stone-100 dark:border-stone-800 hover:border-mindqlab-calm-accent/40 transition-all duration-300">
              <span class="font-medium text-sm">{{ activeCategory || "Все категории" }}</span>
              <i class="fas fa-chevron-down transition-transform duration-300 text-mindqlab-calm-accent text-xs"
                :class="{ 'rotate-180': isOpen }"></i>
            </button>

            <transition enter-active-class="transition duration-200 ease-out"
              enter-from-class="transform scale-y-0 opacity-0" enter-to-class="transform scale-y-100 opacity-100"
              leave-active-class="transition duration-200 ease-in" leave-from-class="transform scale-y-100 opacity-100"
              leave-to-class="transform scale-y-0 opacity-0">
              <div v-if="isOpen"
                class="absolute top-full left-0 right-0 z-20 mt-2 bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-2xl shadow-xl origin-top overflow-hidden">
                <div class="py-1">
                  <button v-for="category in categories" :key="category" @click="selectCategory(category)"
                    class="w-full px-6 py-4 text-left text-sm transition-all duration-300" :class="[
                      activeCategory === category
                        ? 'text-mindqlab-calm-accent bg-stone-50 dark:bg-stone-800/50 font-medium'
                        : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-50 dark:hover:bg-stone-800/30',
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
            <div class="flex items-center space-x-1">
              <button v-for="category in categories" :key="category" @click="setActiveCategory(category)"
                class="px-6 py-3 text-sm transition-all duration-300 rounded-full border" :class="[
                  activeCategory === category
                    ? 'bg-mindqlab-calm-accent text-white border-mindqlab-calm-accent'
                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white border-transparent hover:bg-stone-50 dark:hover:bg-stone-900/40',
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
    <main class="container mx-auto max-w-7xl px-6 pb-24 pt-12 px-8">
      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-32 flex flex-col items-center">
        <div class="w-12 h-12 border-2 border-mindqlab-calm-accent border-t-transparent rounded-full animate-spin mb-6">
        </div>
        <h3 class="text-xl font-light text-stone-900 dark:text-white mb-2 italic">Подбираем лучшее...</h3>
      </div>

      <!-- Posts Grid -->
      <div v-else-if="filteredPosts.length > 0" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        <article v-for="(post, index) in filteredPosts" :key="post._id"
          class="group flex flex-col bg-white dark:bg-stone-900/40 rounded-3xl border border-stone-100 dark:border-stone-800 overflow-hidden transition-all duration-500 hover:border-mindqlab-calm-accent/30 hover:shadow-xl hover:shadow-stone-200/20 dark:hover:shadow-none reveal-up"
          :style="{ animationDelay: `${index * 0.1}s` }">

          <!-- Image -->
          <NuxtLink :to="`/blog/${post.slug.current}`" class="relative aspect-[16/10] overflow-hidden"
            @click="incrementViewCount(post._id)">
            <nuxt-img v-if="post.image" :src="urlFor(post.image).width(600).height(375).url()"
              :alt="post.title || 'Изображение поста'"
              class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" width="600"
              height="375" loading="lazy" format="webp" quality="85" />
            <div class="absolute inset-0 bg-stone-900/5 group-hover:bg-stone-900/0 transition-colors duration-500">
            </div>

            <!-- Category Badge -->
            <span
              class="absolute top-4 left-4 px-4 py-1.5 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-mindqlab-calm-accent border border-stone-100/50 dark:border-stone-800/50 transition-all duration-500 group-hover:-translate-y-1">
              {{ post.category }}
            </span>
          </NuxtLink>

          <!-- Content -->
          <div class="p-8 flex flex-col flex-grow">
            <h2
              class="text-xl font-light mb-4 line-clamp-2 text-stone-900 dark:text-white transition-colors duration-300 group-hover:text-mindqlab-calm-accent leading-snug">
              {{ post.title }}
            </h2>

            <p v-if="post.excerpt"
              class="text-sm text-stone-500 dark:text-stone-400 line-clamp-3 mb-6 font-light leading-relaxed">
              {{ post.excerpt }}
            </p>

            <div
              class="mt-auto pt-6 border-t border-stone-100 dark:border-stone-800/50 flex items-center justify-between text-[11px] font-medium uppercase tracking-wider text-stone-400">
              <div class="flex items-center space-x-3">
                <span class="flex items-center">
                  <i class="far fa-eye mr-1.5 text-mindqlab-calm-accent opacity-70"></i>
                  {{ post.views || 0 }}
                </span>
                <span class="flex items-center">
                  <i class="far fa-clock mr-1.5 text-mindqlab-calm-accent opacity-70"></i>
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
      <div v-else
        class="text-center py-32 bg-white dark:bg-stone-900/40 rounded-[3rem] border border-stone-100 dark:border-stone-800">
        <i class="fas fa-feather-alt text-4xl text-stone-200 dark:text-stone-800 mb-6 block"></i>
        <h3 class="text-2xl font-light text-stone-900 dark:text-white mb-2">Статьи на подходе</h3>
        <p class="text-stone-500 dark:text-stone-400 font-light italic">
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
.animate-fade-up {
  animation: fadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.reveal-up {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Custom Scrollbar for stone-palette */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  @apply bg-stone-50 dark:bg-stone-900;
}

::-webkit-scrollbar-thumb {
  @apply bg-stone-200 dark:bg-stone-800 rounded-full;
}
</style>
