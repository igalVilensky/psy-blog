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
                >Бесплатные материалы</span
              >
            </li>
          </ol>
        </nav>

        <!-- Title -->
        <div class="mb-8 animate-fade-in-up" style="animation-delay: 0.1s">
          <h1
            class="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400"
          >
            Бесплатные материалы
          </h1>
          <p class="text-slate-400 mt-3 text-base sm:text-lg">
            Гайды, подкасты и ресурсы для личностного роста
          </p>
        </div>

        <!-- Resource Types Navigation -->
        <nav
          class="relative animate-fade-in-up"
          style="animation-delay: 0.2s"
          aria-label="Типы ресурсов"
        >
          <!-- Mobile Dropdown -->
          <div class="block md:hidden relative">
            <button
              type="button"
              @click="isOpen = !isOpen"
              class="w-full px-4 py-3 bg-slate-800/60 backdrop-blur-sm rounded-xl text-white flex items-center justify-between border border-slate-700/60 hover:border-cyan-500/60 transition-all duration-300"
            >
              <span class="font-medium">{{ selectedType || "Все типы" }}</span>
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
                    v-for="type in resourceTypes"
                    :key="type"
                    @click="selectType(type)"
                    class="w-full px-4 py-3 text-left text-sm font-medium transition-all duration-300"
                    :class="[
                      selectedType === type
                        ? 'text-white bg-cyan-500/20 border-l-2 border-cyan-400'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700/50',
                    ]"
                  >
                    <span class="flex items-center justify-between">
                      {{ type }}
                      <span
                        v-if="getTypeCount(type)"
                        class="ml-2 text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                      >
                        {{ getTypeCount(type) }}
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
                <li v-for="type in resourceTypes" :key="type" class="mr-2">
                  <button
                    type="button"
                    @click="selectType(type)"
                    class="px-6 py-3 text-sm font-medium transition-all duration-300 relative group rounded-t-lg"
                    :class="[
                      selectedType === type
                        ? 'text-white bg-slate-800/40'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/20',
                    ]"
                  >
                    <span class="relative z-10">{{ type }}</span>
                    <span
                      v-if="getTypeCount(type)"
                      class="ml-2 text-xs px-2 py-0.5 rounded-full transition-colors duration-300"
                      :class="[
                        selectedType === type
                          ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                          : 'bg-slate-700/50 text-slate-400 border border-slate-600/30',
                      ]"
                    >
                      {{ getTypeCount(type) }}
                    </span>
                    <div
                      v-if="selectedType === type"
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

    <!-- Resources Grid -->
    <main class="container mx-auto max-w-6xl px-4 sm:px-0 pb-16 md:pb-24 mt-8">
      <!-- Guides Section -->
      <div v-if="selectedType === 'Все' || selectedType === 'Гайды'">
        <h2
          class="text-2xl sm:text-3xl font-bold text-white mb-6 animate-fade-in-up"
        >
          Гайды
        </h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
          <article
            v-for="(guide, index) in guides"
            :key="guide._id"
            class="guide-card group bg-gradient-to-br from-slate-900/60 via-slate-900/40 to-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-800/60 overflow-hidden transition-all duration-500 hover:border-cyan-500/60 hover:shadow-2xl hover:shadow-cyan-500/20 hover:scale-[1.02]"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <!-- Image -->
            <div class="relative aspect-[4/3] overflow-hidden">
              <nuxt-img
                v-if="guide.image"
                :src="urlFor(guide.image).width(550).height(310).url()"
                :alt="guide.title"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                width="550"
                height="310"
                loading="lazy"
                format="webp"
                quality="80"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              ></div>

              <!-- Category Badge -->
              <span
                class="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm border transition-all duration-300 group-hover:scale-110"
                :class="getCategoryStyle(guide.category)"
              >
                {{ guide.category }}
              </span>
            </div>

            <!-- Content -->
            <div class="p-6">
              <h3
                class="text-lg md:text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-cyan-400 transition-colors duration-300"
              >
                {{ guide.title }}
              </h3>

              <p class="text-slate-400 text-sm line-clamp-3 mb-4">
                {{ guide.description }}
              </p>

              <!-- Meta Info -->
              <div
                class="flex items-center text-xs text-slate-400 pt-4 mb-4 border-t border-slate-800/60"
              >
                <i
                  :class="getCategoryIcon(guide.category)"
                  class="text-cyan-400 mr-2"
                ></i>
                <span class="line-clamp-1">{{
                  getCategoryDescription(guide.category)
                }}</span>
              </div>

              <!-- Button -->
              <NuxtLink
                v-if="guide.slug?.current"
                :to="`/courses/guides/${guide.slug.current}`"
                class="inline-flex items-center justify-center w-full px-6 py-3 font-medium text-white transition-all duration-300 ease-out rounded-lg bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:shadow-lg hover:shadow-cyan-500/50"
              >
                <i class="fas fa-book-open mr-2"></i>
                Читать далее
              </NuxtLink>
            </div>
          </article>
        </div>
      </div>

      <!-- Podcasts Section -->
      <div
        v-if="selectedType === 'Все' || selectedType === 'Подкасты'"
        :class="{ 'mt-16': selectedType === 'Все' }"
      >
        <h2
          class="text-2xl sm:text-3xl font-bold text-white mb-6 animate-fade-in-up"
        >
          Подкасты
        </h2>
        <div class="grid md:grid-cols-2 gap-6 md:gap-8">
          <article
            v-for="(podcast, index) in podcasts"
            :key="podcast.id"
            class="podcast-card group bg-gradient-to-br from-slate-900/60 via-slate-900/40 to-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-800/60 overflow-hidden transition-all duration-500 hover:border-cyan-500/60 hover:shadow-2xl hover:shadow-cyan-500/20"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="flex flex-col md:flex-row h-full">
              <!-- Image Container -->
              <div
                class="md:w-1/3 relative overflow-hidden aspect-[4/3] md:aspect-auto"
              >
                <img
                  :src="podcast.image"
                  :alt="podcast.title"
                  class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>

              <!-- Content Container -->
              <div class="p-6 md:w-2/3 flex flex-col justify-between space-y-4">
                <!-- Header Section -->
                <div class="space-y-3">
                  <div
                    class="flex flex-col sm:flex-row sm:items-start justify-between gap-3"
                  >
                    <h3
                      class="text-lg md:text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300 leading-tight"
                    >
                      {{ podcast.title }}
                    </h3>
                    <span
                      class="inline-block self-start text-center bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs whitespace-nowrap"
                    >
                      {{ podcast.category }}
                    </span>
                  </div>
                  <p class="text-slate-400 text-sm line-clamp-2">
                    {{ podcast.description }}
                  </p>
                </div>

                <!-- SoundCloud Player -->
                <div class="w-full">
                  <iframe
                    width="100%"
                    height="166"
                    scrolling="no"
                    frameborder="no"
                    allow="autoplay"
                    :src="`https://w.soundcloud.com/player/?url=${encodeURIComponent(
                      podcast.soundcloudUrl
                    )}&color=%2322d3ee&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`"
                    class="rounded-lg"
                  ></iframe>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="filteredResources.length === 0"
        role="status"
        aria-live="polite"
        class="text-center py-20 bg-slate-900/40 backdrop-blur-xl rounded-3xl border border-slate-800/60"
      >
        <div class="text-cyan-400 mb-4">
          <i class="fas fa-search text-5xl"></i>
        </div>
        <h3 class="text-2xl font-semibold text-white mb-2">
          Ресурсы не найдены
        </h3>
        <p class="text-slate-400">
          В данной категории пока нет ресурсов. Попробуйте выбрать другую
          категорию.
        </p>
      </div>

      <!-- Email Capture CTA -->
      <div
        class="mt-16 bg-gradient-to-br from-slate-900/60 via-slate-900/40 to-slate-900/60 backdrop-blur-xl rounded-3xl border border-slate-800/60 p-8 sm:p-12 text-center transition-all duration-500 hover:border-cyan-500/60 hover:shadow-2xl hover:shadow-cyan-500/20"
      >
        <h2 class="text-2xl sm:text-3xl font-bold text-white mb-4">
          Получайте бесплатные материалы первыми
        </h2>
        <p class="text-slate-400 mb-8 max-w-2xl mx-auto">
          Подпишитесь на нашу рассылку и будьте в курсе всех новых бесплатных
          ресурсов, которые помогут вам расти и развиваться.
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
import { ref, computed, onMounted } from "vue";
import { fetchGuides } from "~/api/sanity/guides";
import { getImageUrl } from "~/api/sanity/client";
import { getFirestore } from "firebase/firestore";
import { subscribeUser } from "@/api/firebase/contact";

// Fetch guides
const initialGuides = await fetchGuides();
const guides = ref(initialGuides.data || []);

// Fetch podcasts
const podcasts = ref([
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
]);

// Image URL builder
const { projectId, dataset } = useSanity().client.config();
const urlFor = getImageUrl(projectId, dataset);

// Resource types
const resourceTypes = ["Все", "Гайды", "Подкасты"];
const selectedType = ref("Все");
const isOpen = ref(false);
const email = ref("");

// Filtered resources
const filteredResources = computed(() => {
  if (selectedType.value === "Все") {
    return [...guides.value, ...podcasts.value];
  } else if (selectedType.value === "Гайды") {
    return guides.value;
  } else if (selectedType.value === "Подкасты") {
    return podcasts.value;
  }
  return [];
});

// Get count of resources in each type
const getTypeCount = (type) => {
  if (type === "Все") return guides.value.length + podcasts.value.length;
  if (type === "Гайды") return guides.value.length;
  if (type === "Подкасты") return podcasts.value.length;
  return 0;
};

// Select type
const selectType = (type) => {
  selectedType.value = type;
  isOpen.value = false;
};

// Category styling
const getCategoryStyle = (category) => {
  const styles = {
    Самопознание: "bg-green-500/20 text-green-700 border-green-500/40",
    "Эмоциональный интеллект":
      "bg-purple-500/20 text-purple-700 border-purple-500/40",
    Отношения: "bg-blue-500/20 text-blue-300 border-blue-500/40",
    "Карьерный рост": "bg-pink-500/20 text-pink-300 border-pink-500/40",
  };
  return (
    styles[category] || "bg-slate-700/50 text-slate-300 border-slate-600/40"
  );
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
    Самопознание: "Упражнения для глубокого самоанализа",
    "Эмоциональный интеллект": "Техники для развития эмпатии",
    Отношения: "Инструменты для укрепления связи",
    "Карьерный рост": "Стратегии для достижения целей",
  };
  return descriptions[category] || "Полезные материалы";
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

.guide-card,
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
