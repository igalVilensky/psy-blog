<template>
  <div class="min-h-screen bg-slate-950 text-white overflow-hidden">
    <!-- Header Section -->
    <header class="relative pt-8 pb-6 px-4 sm:px-0">
      <!-- Subtle top glow -->
      <div
        class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
      ></div>

      <div class="container mx-auto max-w-6xl relative">
        <!-- Breadcrumb -->
        <nav class="mb-6 animate-fade-in-up" aria-label="Breadcrumb">
          <ol class="flex items-center space-x-2 text-sm">
            <li class="flex items-center group">
              <NuxtLink
                to="/"
                class="text-slate-400 hover:text-cyan-400 transition-all duration-300 flex items-center"
              >
                <i class="fas fa-home mr-2 text-cyan-400"></i>
                <span
                  class="group-hover:translate-x-1 transition-transform duration-300"
                  >Главная</span
                >
              </NuxtLink>
            </li>
            <li class="flex items-center">
              <i class="fas fa-chevron-right text-slate-600 mx-3 text-xs"></i>
              <span class="text-white font-medium" aria-current="page"
                >Подкасты</span
              >
            </li>
          </ol>
        </nav>

        <!-- Title -->
        <div class="mb-8 animate-fade-in-up" style="animation-delay: 0.1s">
          <h1
            class="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400"
          >
            Вдохновляющие Подкасты
          </h1>
          <p class="text-slate-400 mt-3 text-base sm:text-lg">
            Психологические беседы для личностного роста и саморазвития
          </p>
        </div>

        <!-- Category Navigation -->
        <nav
          class="relative animate-fade-in-up"
          style="animation-delay: 0.2s"
          aria-label="Категории подкастов"
        >
          <!-- Mobile Dropdown -->
          <div class="block md:hidden relative">
            <button
              type="button"
              @click="isOpen = !isOpen"
              class="w-full px-4 py-3 bg-slate-800/60 backdrop-blur-sm rounded-xl text-white flex items-center justify-between border border-slate-700/60 hover:border-cyan-500/60 transition-all duration-300"
            >
              <span class="font-medium">{{
                selectedCategory || "Все категории"
              }}</span>
              <i
                class="fas fa-chevron-down transition-transform duration-300 text-cyan-400"
                :class="{ 'rotate-180': isOpen }"
              ></i>
            </button>

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
                class="absolute top-full left-0 right-0 z-20 mt-2 bg-slate-800/90 backdrop-blur-xl border border-slate-700/60 rounded-xl shadow-2xl origin-top"
              >
                <div class="py-2">
                  <button
                    v-for="category in categories"
                    :key="category"
                    @click="selectCategory(category)"
                    class="w-full px-4 py-3 text-left text-sm font-medium transition-all duration-300"
                    :class="[
                      selectedCategory === category
                        ? 'text-white bg-cyan-500/20 border-l-2 border-cyan-400'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700/50',
                    ]"
                  >
                    <span class="flex items-center justify-between">
                      {{ category }}
                      <span
                        v-if="getCategoryCount(category)"
                        class="ml-2 text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                      >
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
              <div
                class="absolute bottom-0 left-0 right-0 h-px bg-slate-800/60"
              ></div>
              <ul class="flex flex-wrap -mb-px relative">
                <li v-for="category in categories" :key="category" class="mr-2">
                  <button
                    type="button"
                    @click="selectCategory(category)"
                    class="px-6 py-3 text-sm font-medium transition-all duration-300 relative group rounded-t-lg"
                    :class="[
                      selectedCategory === category
                        ? 'text-white bg-slate-800/40'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/20',
                    ]"
                  >
                    <span class="relative z-10">{{ category }}</span>
                    <span
                      v-if="getCategoryCount(category)"
                      class="ml-2 text-xs px-2 py-0.5 rounded-full transition-colors duration-300"
                      :class="[
                        selectedCategory === category
                          ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                          : 'bg-slate-700/50 text-slate-400 border border-slate-600/30',
                      ]"
                    >
                      {{ getCategoryCount(category) }}
                    </span>
                    <div
                      v-if="selectedCategory === category"
                      class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400"
                    ></div>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>

    <!-- Podcasts Grid -->
    <main class="container mx-auto max-w-6xl px-4 sm:px-0 pb-16 md:pb-24 mt-8">
      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div
          class="w-12 h-12 rounded-full border-4 border-cyan-500/20 border-t-cyan-400 animate-spin"
        ></div>
      </div>

      <!-- Podcasts Grid -->
      <div v-else class="grid md:grid-cols-2 gap-6 md:gap-8">
        <article
          v-for="(podcast, index) in filteredPodcasts"
          :key="podcast.id"
          class="podcast-card group bg-gradient-to-br from-slate-900/60 via-slate-900/40 to-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-800/60 overflow-hidden transition-all duration-500 hover:border-cyan-500/60 hover:shadow-2xl hover:shadow-cyan-500/20"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="flex flex-col md:flex-row h-full">
            <!-- Image Container -->
            <div
              class="md:w-2/5 relative overflow-hidden aspect-[4/3] md:aspect-auto"
            >
              <img
                :src="podcast.image"
                :alt="podcast.title"
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              ></div>

              <!-- Category Badge -->
              <span
                class="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm border border-cyan-500/40 bg-cyan-500/20 text-cyan-300 transition-all duration-300 group-hover:scale-110"
              >
                {{ podcast.category }}
              </span>

              <!-- Description Overlay -->
              <p
                class="absolute bottom-4 left-4 right-4 text-xs text-white/90 line-clamp-2 z-10"
              >
                {{ podcast.description }}
              </p>
            </div>

            <!-- Content Container -->
            <div class="p-6 md:w-3/5 flex flex-col justify-between space-y-4">
              <!-- Header Section -->
              <div class="space-y-3">
                <!-- Meta Info -->
                <div class="flex items-center text-xs text-slate-400">
                  <span class="flex items-center">
                    <i class="fas fa-user-circle mr-1.5 text-cyan-400"></i>
                    Анастасия Гельмут
                  </span>
                  <span class="mx-2">•</span>
                  <span class="flex items-center">
                    <i class="far fa-calendar-alt mr-1.5 text-cyan-400"></i>
                    15 фев 2025
                  </span>
                </div>

                <!-- Title -->
                <h3
                  class="text-lg md:text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300 leading-tight"
                >
                  {{ podcast.title }}
                </h3>
              </div>

              <!-- SoundCloud Player -->
              <div
                class="w-full rounded-lg overflow-hidden bg-slate-800/60 border border-slate-700/60"
              >
                <iframe
                  width="100%"
                  height="80"
                  scrolling="no"
                  frameborder="no"
                  allow="autoplay"
                  :src="`https://w.soundcloud.com/player/?url=${encodeURIComponent(
                    podcast.soundcloudUrl
                  )}&color=%2322d3ee&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=false`"
                  class="rounded"
                ></iframe>
              </div>

              <!-- Action Bar -->
              <div
                class="flex items-center justify-between pt-3 border-t border-slate-800/60"
              >
                <div class="flex space-x-3">
                  <button
                    class="text-slate-400 hover:text-cyan-400 transition-colors duration-300"
                    title="Поделиться"
                  >
                    <i class="fas fa-share-alt text-sm"></i>
                  </button>
                  <button
                    class="text-slate-400 hover:text-cyan-400 transition-colors duration-300"
                    title="Добавить в избранное"
                  >
                    <i class="far fa-heart text-sm"></i>
                  </button>
                  <button
                    @click="showMoreOptions(podcast.id)"
                    class="text-slate-400 hover:text-cyan-400 transition-colors duration-300"
                    title="Дополнительные опции"
                  >
                    <i class="fas fa-ellipsis-v text-sm"></i>
                  </button>
                </div>

                <!-- Show Notes Button -->
                <button
                  @click="toggleShowNotes(podcast.id)"
                  class="flex items-center gap-1.5 text-sm font-medium text-white bg-cyan-500/20 hover:bg-cyan-500/40 transition-all duration-300 px-4 py-1.5 rounded-full border border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/20"
                >
                  <i class="fas fa-info-circle text-xs"></i>
                  <span>Подробности</span>
                </button>
              </div>

              <!-- Show Notes Section -->
              <transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="transform scale-y-0 opacity-0"
                enter-to-class="transform scale-y-100 opacity-100"
                leave-active-class="transition duration-200 ease-in"
                leave-from-class="transform scale-y-100 opacity-100"
                leave-to-class="transform scale-y-0 opacity-0"
              >
                <div
                  v-if="showNotesPodcastId === podcast.id"
                  class="mt-3 text-sm text-slate-300 bg-slate-800/40 p-3 rounded-lg border border-slate-700/60 backdrop-blur-sm"
                >
                  {{ podcast.description }}
                </div>
              </transition>
            </div>
          </div>
        </article>
      </div>

      <!-- Empty State -->
      <div
        v-if="!loading && filteredPodcasts.length === 0"
        role="status"
        aria-live="polite"
        class="text-center py-20 bg-slate-900/40 backdrop-blur-xl rounded-3xl border border-slate-800/60"
      >
        <div class="text-cyan-400 mb-4">
          <i class="fas fa-search text-5xl"></i>
        </div>
        <h3 class="text-2xl font-semibold text-white mb-2">
          Подкасты не найдены
        </h3>
        <p class="text-slate-400">
          В данной категории пока нет подкастов. Попробуйте выбрать другую
          категорию.
        </p>
      </div>

      <!-- Subscribe Section -->
      <div
        class="mt-16 bg-gradient-to-br from-slate-900/60 via-slate-900/40 to-slate-900/60 backdrop-blur-xl rounded-3xl border border-slate-800/60 p-8 sm:p-12 text-center transition-all duration-500 hover:border-cyan-500/60 hover:shadow-2xl hover:shadow-cyan-500/20"
      >
        <h2 class="text-2xl sm:text-3xl font-bold text-white mb-4">
          Не пропускайте новые выпуски
        </h2>
        <p class="text-slate-400 mb-8 max-w-2xl mx-auto">
          Подпишитесь на уведомления о новых подкастах и получайте эксклюзивный
          доступ к дополнительным материалам.
        </p>
        <div class="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            v-model="email"
            placeholder="Ваш email"
            class="flex-1 px-6 py-3 rounded-lg sm:rounded-l-lg sm:rounded-r-none bg-slate-800/60 border border-slate-700/60 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
          />
          <button
            @click="subscribeEmail"
            class="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-white transition-all duration-300 ease-out rounded-lg sm:rounded-l-none sm:rounded-r-lg group/btn bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:shadow-lg hover:shadow-cyan-500/50"
          >
            <span
              class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 group-hover/btn:translate-x-0 ease"
            >
              <i class="fas fa-bell"></i>
            </span>
            <span
              class="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover/btn:translate-x-full ease"
            >
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
import { getFirestore } from "firebase/firestore";
import { subscribeUser } from "@/api/firebase/contact";

const db = getFirestore();
const email = ref("");
const selectedCategory = ref("Все");
const isOpen = ref(false);
const loading = ref(false);
const showNotesPodcastId = ref(null);

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
    title: "Эмоции и чувства: Часть 1",
    description:
      "Разбираем эмоции и чувства: как они влияют на нас, помогают или мешают, и что с этим делать.",
    category: "Личностный рост",
    image:
      "https://cdn.pixabay.com/photo/2016/07/16/01/35/smilies-1520867_640.jpg",
    soundcloudUrl: "https://api.soundcloud.com/tracks/1301040925",
  },
  {
    id: 2,
    title: "Эмоции и чувства: Часть 2",
    description:
      "Разбираем эмоции и чувства: как они влияют на нас, помогают или мешают, и что с этим делать.",
    category: "Личностный рост",
    image:
      "https://cdn.pixabay.com/photo/2016/07/16/01/35/smilies-1520867_640.jpg",
    soundcloudUrl: "https://api.soundcloud.com/tracks/1300415452",
  },
  {
    id: 3,
    title: "Эмоции и чувства: Часть 3",
    description:
      "Разбираем эмоции и чувства: как они влияют на нас, помогают или мешают, и что с этим делать.",
    category: "Личностный рост",
    image:
      "https://cdn.pixabay.com/photo/2016/07/16/01/35/smilies-1520867_640.jpg",
    soundcloudUrl: "https://api.soundcloud.com/tracks/1303757872",
  },
];

const selectCategory = (category) => {
  selectedCategory.value = category;
  isOpen.value = false;
};

const filteredPodcasts = computed(() => {
  return selectedCategory.value === "Все"
    ? podcasts
    : podcasts.filter((p) => p.category === selectedCategory.value);
});

const getCategoryCount = (category) => {
  if (category === "Все") return podcasts.length;
  return podcasts.filter((p) => p.category === category).length;
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

const toggleShowNotes = (podcastId) => {
  showNotesPodcastId.value =
    showNotesPodcastId.value === podcastId ? null : podcastId;
};

const showMoreOptions = (podcastId) => {
  console.log(`More options clicked for podcast ID: ${podcastId}`);
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

.podcast-card {
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
