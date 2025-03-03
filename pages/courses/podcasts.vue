<template>
  <div class="relative min-h-screen">
    <div class="relative z-10">
      <!-- Enhanced Header Section (Unchanged) -->
      <header class="pt-8 px-4 relative">
        <div
          class="absolute -bottom-2 sm:bottom-0 inset-0 bg-gradient-to-r from-[#0EA5E9]/10 via-[#E879F9]/10 to-[#0EA5E9]/10 animate-gradient-x"
        ></div>
        <div class="container mx-auto max-w-6xl relative">
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
                  >Подкасты</span
                >
              </li>
            </ol>
          </nav>
          <div class="mb-6">
            <div class="md:inline-block w-full md:w-auto">
              <div
                class="bg-[#0EA5E9]/20 md:bg-transparent px-6 py-4 md:p-0 rounded-lg"
              >
                <h1 class="text-3xl md:text-4xl font-bold text-white">
                  Вдохновляющие Подкасты
                </h1>
              </div>
            </div>
          </div>
          <nav class="relative" aria-label="Категории подкастов">
            <div
              class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
            ></div>
            <div class="block md:hidden relative">
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
                      @click="selectCategory(category)"
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
                  <div
                    v-if="selectedCategory === category"
                    class="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0EA5E9]"
                  ></div>
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

      <!-- Podcasts Grid -->
      <main class="container mx-auto max-w-6xl px-4 sm:px-0 pb-16 mt-4 sm:mt-8">
        <div v-if="loading" class="flex justify-center items-center py-12">
          <div
            class="w-12 h-12 rounded-full border-4 border-[#0EA5E9]/20 border-t-[#0EA5E9] animate-spin"
          ></div>
        </div>

        <div v-else class="grid md:grid-cols-2 gap-8">
          <div
            v-for="podcast in filteredPodcasts"
            :key="podcast.id"
            class="group bg-gradient-to-b from-[#111827]/80 to-[#1E293B]/90 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-[#0EA5E9]/50 hover:shadow-lg hover:shadow-[#0EA5E9]/20"
          >
            <div class="flex flex-col md:flex-row h-full">
              <!-- Image Container with Overlay -->
              <div
                class="md:w-2/5 relative overflow-hidden aspect-[4/3] md:aspect-auto"
              >
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"
                ></div>
                <img
                  :src="podcast.image"
                  :alt="podcast.title"
                  class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span
                  class="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-md text-xs font-medium tracking-wider uppercase bg-black/60 backdrop-blur-sm border border-white/10 text-white group-hover:bg-[#0EA5E9]/80 transition-all duration-300"
                >
                  {{ podcast.category }}
                </span>
                <!-- Replaced Episode Count with Description -->
                <p
                  class="absolute bottom-4 left-4 right-4 z-20 text-xs text-white/90 line-clamp-2"
                >
                  {{ podcast.description }}
                </p>
              </div>

              <!-- Content Container -->
              <div
                class="p-6 md:p-7 md:w-3/5 flex flex-col justify-between space-y-5"
              >
                <!-- Header Section -->
                <div class="space-y-3">
                  <div class="flex items-start justify-between">
                    <div class="flex items-center text-xs text-slate-400 mb-2">
                      <span class="flex items-center">
                        <i class="fas fa-user-circle mr-1.5 text-[#0EA5E9]"></i>
                        Анастасия Гельмут
                      </span>
                      <span class="mx-2">•</span>
                      <span class="flex items-center">
                        <i
                          class="far fa-calendar-alt mr-1.5 text-[#0EA5E9]"
                        ></i>
                        15 фев 2025
                      </span>
                    </div>
                  </div>

                  <h3
                    class="text-xl font-bold text-white group-hover:text-[#0EA5E9] transition-colors duration-300 leading-tight"
                  >
                    {{ podcast.title }}
                  </h3>
                  <!-- Description removed from here since it's now in the image overlay -->
                </div>

                <!-- SoundCloud Player -->
                <div
                  class="w-full rounded-lg overflow-hidden bg-black/30 border border-white/5 p-0.5"
                >
                  <iframe
                    width="100%"
                    height="80"
                    scrolling="no"
                    frameborder="no"
                    allow="autoplay"
                    :src="`https://w.soundcloud.com/player/?url=${encodeURIComponent(
                      podcast.soundcloudUrl
                    )}&color=%230EA5E9&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=false`"
                    class="rounded"
                  ></iframe>
                </div>

                <!-- Bottom Action Bar -->
                <div
                  class="flex items-center justify-between pt-2 border-t border-white/10"
                >
                  <div class="flex space-x-3">
                    <button
                      class="text-slate-400 hover:text-white transition-colors"
                    >
                      <i class="fas fa-share-alt"></i>
                    </button>
                    <button
                      class="text-slate-400 hover:text-white transition-colors"
                    >
                      <i class="far fa-heart"></i>
                    </button>
                    <!-- Replaced Download with More Options -->
                    <button
                      @click="showMoreOptions(podcast.id)"
                      class="text-slate-400 hover:text-white transition-colors"
                    >
                      <i class="fas fa-ellipsis-v"></i>
                    </button>
                  </div>

                  <!-- Replaced Listen with Show Notes -->
                  <button
                    @click="toggleShowNotes(podcast.id)"
                    class="flex items-center gap-1.5 text-sm font-medium text-white bg-[#0EA5E9]/20 hover:bg-[#0EA5E9]/70 transition-colors duration-300 px-4 py-1.5 rounded-full group-hover:shadow-md"
                  >
                    <i class="fas fa-info-circle text-xs"></i>
                    <span>Подробности</span>
                  </button>
                </div>

                <!-- Show Notes Section (Collapsible) -->
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
                    class="mt-4 text-sm text-slate-300 bg-white/5 p-3 rounded-lg border border-white/10"
                  >
                    {{ podcast.description }}
                    <!-- You can expand this with more details later -->
                  </div>
                </transition>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State  -->
        <div
          role="status"
          aria-live="polite"
          v-if="!loading && filteredPodcasts.length === 0"
          class="text-center py-16 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10"
        >
          <div class="text-[#0EA5E9] mb-4">
            <i class="fas fa-search text-4xl"></i>
          </div>
          <h3 class="text-xl font-semibold text-white/90 mb-2">
            Подкасты не найдены
          </h3>
          <p class="text-slate-300">
            В данной категории пока нет подкастов. Пожалуйста, выберите другую
            категорию.
          </p>
        </div>
        <!-- Subscribe Section (Unchanged) -->
        <div
          class="mb-16 mt-8 max-w-6xl mx-auto bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-[#0EA5E9]/20 p-4 sm:p-8 text-center transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(14,165,233,0.3)]"
        >
          <h2 class="text-2xl font-bold text-white/90 mb-4">
            Не пропускайте новые выпуски
          </h2>
          <p class="text-slate-300 mb-6 max-w-2xl mx-auto px-2">
            Подпишитесь на уведомления о новых подкастах и получайте
            эксклюзивный доступ к дополнительным материалам.
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
      </main>
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
const isOpen = ref(false);
const loading = ref(false);
const showNotesPodcastId = ref(null); // Track which podcast's notes are visible

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
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0.9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};

// New Methods for Show Notes and More Options
const toggleShowNotes = (podcastId) => {
  showNotesPodcastId.value =
    showNotesPodcastId.value === podcastId ? null : podcastId;
};

const showMoreOptions = (podcastId) => {
  console.log(`More options clicked for podcast ID: ${podcastId}`);
  // Add your logic here (e.g., open a dropdown, modal, etc.)
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
