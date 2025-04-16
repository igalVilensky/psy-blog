<!-- pages/blog/index.vue -->
<template>
  <div class="relative min-h-screen">
    <div class="relative z-10">
      <!-- Enhanced Header Section -->
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
                  >Блог</span
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
                <h1 class="text-3xl md:text-4xl font-bold text-white">Блог</h1>
              </div>
            </div>
          </div>

          <!-- Enhanced Category Navigation -->
          <nav class="relative" aria-label="Категории блога">
            <!-- Gradient border -->
            <div
              class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
            ></div>

            <!-- Mobile Dropdown Button -->
            <div class="block md:hidden relative">
              <button
                type="button"
                @click="isOpen = !isOpen"
                class="w-full px-4 py-3 bg-white/5 rounded-lg text-white flex items-center justify-between border border-white/10"
              >
                <span>{{ activeCategory || "Все категории" }}</span>
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
                      @click="selectCategory(category)"
                      class="w-full px-4 py-3 text-left text-sm font-medium transition-colors duration-300"
                      :class="[
                        activeCategory === category
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
                  @click="setActiveCategory(category)"
                  class="px-6 py-3 text-sm font-medium transition-all duration-300 relative group"
                  :class="[
                    activeCategory === category
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
                    v-if="activeCategory === category"
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

      <!-- Blog Posts Grid -->
      <main class="container mx-auto max-w-6xl px-4 xl:px-0 pb-24 mt-4 sm:mt-8">
        <!-- Loading State -->
        <div
          v-if="isLoading"
          class="text-center py-16 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10"
        >
          <div class="text-[#0EA5E9] mb-4">
            <i class="fas fa-spinner fa-spin text-4xl"></i>
          </div>
          <h3 class="text-xl font-semibold text-white/90 mb-2">Загрузка...</h3>
          <p class="text-slate-300">
            Пожалуйста, подождите, пока загружаются посты.
          </p>
        </div>

        <!-- Posts Grid with CTA Card -->
        <div
          v-else-if="filteredPosts.length > 0"
          class="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <template v-for="(post, index) in filteredPosts" :key="post._id">
            <!-- Blog Post Card -->
            <article
              class="group bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(14,165,233,0.3)]"
            >
              <!-- Image Container -->
              <div class="relative aspect-[4/3] overflow-hidden">
                <nuxt-img
                  v-if="post.image"
                  :src="urlFor(post.image).width(550).height(310).url()"
                  :alt="post.title || 'Изображение поста'"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  width="550"
                  height="310"
                  loading="lazy"
                  format="webp"
                  quality="80"
                />
                <span
                  :class="[
                    'absolute top-4 left-4 px-4 py-2 rounded-full text-sm font-medium shadow-md backdrop-blur-sm border border-white/10',
                    {
                      'bg-[#0EA5E9]/80': post.category === 'Личностный рост',
                      'bg-[#F59E0B]/80': post.category === 'Отношения',
                      'bg-[#E879F9]/80': post.category === 'Продуктивность',
                      'bg-gray-500/80': !post.category,
                    },
                  ]"
                  class="text-white"
                >
                  {{ post.category }}
                </span>
              </div>

              <div class="p-8">
                <h2
                  class="text-xl font-bold text-white/90 mb-4 line-clamp-2 group-hover:text-[#0EA5E9] transition-colors duration-300"
                >
                  {{ post.title }}
                </h2>

                <div
                  class="flex items-center justify-between text-sm text-slate-400 pt-4 border-t border-white/10"
                >
                  <div class="flex items-center space-x-1.5">
                    <i class="far fa-eye text-[#0EA5E9]"></i>
                    <span>{{ post.views || 0 }}</span>
                  </div>
                  <div class="flex items-center space-x-1.5">
                    <i class="far fa-clock text-[#F59E0B]"></i>
                    <span>{{ post.readtime }} мин</span>
                  </div>
                  <div class="flex items-center space-x-1.5">
                    <i class="far fa-calendar text-[#E879F9]"></i>
                    <span>{{
                      new Date(post.publishedAt).toLocaleDateString("ru-RU", {
                        day: "numeric",
                        month: "short",
                      })
                    }}</span>
                  </div>
                </div>
              </div>

              <NuxtLink
                :to="`/blog/${post.slug.current}`"
                class="absolute inset-0 z-10"
                @click="incrementViewCount(post._id)"
              ></NuxtLink>
            </article>

            <!-- CTA Card (After Second Post) -->
            <div
              v-if="index === 0"
              class="group bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(14,165,233,0.3)]"
            >
              <!-- Image Container with Overlay -->
              <div class="relative aspect-[4/3] overflow-hidden">
                <img
                  :src="emCompasImage"
                  alt="Эмоциональный компас"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <!-- Gradient Overlay -->
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-70"
                ></div>

                <!-- Quick Stats -->
                <div
                  class="absolute bottom-4 left-4 right-4 flex justify-between text-xs text-white"
                >
                  <div
                    class="flex items-center space-x-1.5 bg-black/40 backdrop-blur-sm px-2 py-1 rounded"
                  >
                    <i class="far fa-user text-[#0EA5E9]"></i>
                    <span>5,000+ пользователей</span>
                  </div>
                  <div
                    class="flex items-center space-x-1.5 bg-black/40 backdrop-blur-sm px-2 py-1 rounded"
                  >
                    <i class="far fa-clock text-[#F59E0B]"></i>
                    <span>5 мин</span>
                  </div>
                </div>
              </div>

              <div class="p-6">
                <!-- Dynamic Heading Based on Category -->
                <h2
                  class="text-xl font-bold text-white/90 mb-3 group-hover:text-[#0EA5E9] transition-colors duration-300"
                >
                  {{
                    activeCategory === "Отношения"
                      ? "Проблемы в отношениях? Решение есть!"
                      : activeCategory === "Личностный рост"
                      ? "Раскрой потенциал своих эмоций!"
                      : activeCategory === "Продуктивность"
                      ? "Найди эмоциональный баланс в работе!"
                      : "Узнай свои истинные эмоции!"
                  }}
                </h2>

                <!-- Dynamic Description Based on Category -->
                <p class="text-slate-300 mb-4">
                  {{
                    activeCategory === "Отношения"
                      ? "Эмоциональный компас поможет распознать истинные чувства и улучшить взаимопонимание в отношениях."
                      : activeCategory === "Личностный рост"
                      ? "Используй эмоциональный компас для глубокого понимания своих эмоций и личностного роста."
                      : activeCategory === "Продуктивность"
                      ? "Эмоциональный компас поможет найти идеальный баланс между работой и эмоциональным состоянием."
                      : "Научись лучше понимать свои чувства и управлять ими."
                  }}
                </p>

                <!-- Benefits List -->
                <div class="grid grid-cols-2 gap-2 mb-4">
                  <div
                    class="flex items-center space-x-1.5 text-xs text-white/80"
                  >
                    <i
                      :class="[
                        activeCategory === 'Отношения'
                          ? 'fas fa-heart text-[#E879F9]'
                          : activeCategory === 'Личностный рост'
                          ? 'fas fa-brain text-[#0EA5E9]'
                          : activeCategory === 'Продуктивность'
                          ? 'fas fa-chart-line text-[#10B981]'
                          : 'fas fa-lightbulb text-[#0EA5E9]',
                      ]"
                    ></i>
                    <span>{{
                      activeCategory === "Отношения"
                        ? "Улучшит взаимопонимание"
                        : activeCategory === "Личностный рост"
                        ? "Развивает самосознание"
                        : activeCategory === "Продуктивность"
                        ? "Повышает эффективность"
                        : "Улучшает самопонимание"
                    }}</span>
                  </div>
                  <div
                    class="flex items-center space-x-1.5 text-xs text-white/80"
                  >
                    <i class="fas fa-check-circle text-[#10B981]"></i>
                    <span>5-минутная оценка</span>
                  </div>
                </div>

                <!-- Action Button -->
                <div class="flex items-center space-x-2">
                  <NuxtLink
                    to="/awareness-tools/emotional-compass"
                    :class="[
                      activeCategory === 'Отношения'
                        ? 'bg-[#E879F9]'
                        : activeCategory === 'Личностный рост'
                        ? 'bg-[#0EA5E9]'
                        : activeCategory === 'Продуктивность'
                        ? 'bg-[#10B981]'
                        : 'bg-[#0EA5E9]',
                      'flex-grow text-center py-3 px-4 text-white rounded-lg hover:opacity-90 transition-all duration-300 flex items-center justify-center group-hover:shadow-lg',
                    ]"
                  >
                    <i class="fas fa-compass mr-2"></i>
                    <span>Открыть компас</span>
                  </NuxtLink>
                </div>
              </div>

              <!-- Full card link -->
              <NuxtLink
                to="/awareness-tools/emotional-compass"
                class="absolute inset-0 z-10"
              ></NuxtLink>
            </div>
          </template>
        </div>

        <!-- Empty State -->
        <div
          v-else
          role="status"
          aria-live="polite"
          class="text-center py-16 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10"
        >
          <div class="text-[#0EA5E9] mb-4">
            <i class="fas fa-search text-4xl"></i>
          </div>
          <h3 class="text-xl font-semibold text-white/90 mb-2">
            Публикации не найдены
          </h3>
          <p class="text-slate-300">
            В данной категории пока нет публикаций. Пожалуйста, выберите другую
            категорию.
          </p>
        </div>

        <!-- End of Content CTA -->
        <div
          v-if="filteredPosts.length > 0"
          class="mt-16 p-8 rounded-2xl bg-gradient-to-r from-[#0EA5E9]/30 via-[#E879F9]/30 to-[#0EA5E9]/30 animate-gradient-x border border-white/10 text-center"
        >
          <h3 class="text-2xl font-bold text-white mb-4">
            Понравились статьи?
          </h3>
          <p class="text-slate-300 mb-6 max-w-2xl mx-auto">
            Продолжите свой путь самопознания с нашими инструментами! Узнайте
            свой архетип личности или используйте эмоциональный компас для
            лучшего понимания себя.
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <NuxtLink
              to="/awareness-tools/life-purpose-archetype"
              class="px-6 py-3 bg-[#0EA5E9] text-white rounded-lg hover:bg-[#0EA5E9]/80 transition-colors duration-300"
            >
              <i class="fas fa-map-signs mr-2"></i>
              Узнать свой архетип
            </NuxtLink>
            <NuxtLink
              to="/awareness-tools/emotional-compass"
              class="px-6 py-3 bg-[#E879F9] text-white rounded-lg hover:bg-[#E879F9]/80 transition-colors duration-300"
            >
              <i class="fas fa-compass mr-2"></i>
              Открыть эмоциональный компас
            </NuxtLink>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useFirestore } from "~/plugins/firebase";
import { fetchPosts } from "~/api/sanity/posts";
import { getImageUrl } from "~/api/sanity/client";
import { incrementPostViewCount, getPostViewCount } from "~/api/firebase/views";
import { useHead } from "@unhead/vue";
import emCompasImage from "@/assets/images/awarenessTools/em_compass.png";
const firestore = useFirestore();
const { projectId, dataset } = useSanity().client.config();
const urlFor = getImageUrl(projectId, dataset);

const isOpen = ref(false);
const posts = ref([]);
const isLoading = ref(true);

const categories = ref([
  "Все",
  "Личностный рост",
  "Отношения",
  "Продуктивность",
]);
const activeCategory = ref("Все");

const incrementViewCount = async (postId) => {
  await incrementPostViewCount(firestore, postId);
};

const setActiveCategory = (category) => {
  activeCategory.value = category;
};

const selectCategory = (category) => {
  setActiveCategory(category);
  isOpen.value = false;
};

const filteredPosts = computed(() => {
  if (activeCategory.value === "Все") {
    return posts.value;
  }
  return posts.value.filter((post) => post.category === activeCategory.value);
});

const shouldShowEmotionalCompass = computed(() => {
  if (activeCategory.value === "Отношения") return true;
  return filteredPosts.value.some(
    (post) =>
      post.title?.toLowerCase().includes("эмоци") ||
      post.title?.toLowerCase().includes("чувств") ||
      post.title?.toLowerCase().includes("стресс")
  );
});

const getCategoryCount = (category) => {
  if (category === "Все") return posts.value.length;
  return posts.value.filter((post) => post.category === category).length;
};

const loadPosts = async () => {
  try {
    isLoading.value = true;
    const fetchedPosts = await fetchPosts();
    posts.value = Array.isArray(fetchedPosts) ? fetchedPosts : [];
    if (posts.value.length > 0) {
      await Promise.all(
        posts.value.map(async (post) => {
          post.views = await getPostViewCount(firestore, post._id);
        })
      );
    }
  } catch (error) {
    console.error("Error loading posts:", error);
    posts.value = [];
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadPosts();
});

// SEO with useHead
useHead({
  title: "Блог о личностном росте и самопознании",
  meta: [
    {
      name: "description",
      content:
        "Читайте статьи о личностном росте, психологии, продуктивности и отношениях. Узнайте, как раскрыть свой потенциал с помощью наших инструментов самопознания.",
    },
    {
      name: "keywords",
      content:
        "личностный рост, психология, продуктивность, самопознание, блог",
    },
    { name: "robots", content: "index, follow" },
    { property: "og:title", content: "Блог о личностном росте и самопознании" },
    {
      property: "og:description",
      content:
        "Полезные статьи и инструменты для личностного роста, психологии и отношений. Начните свой путь самопознания!",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://yourwebsite.com/blog" }, // Replace with your domain
    { property: "og:image", content: "/images/blog-og-image.webp" }, // Replace with a real image
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Блог о личностном росте и самопознании",
    },
    {
      name: "twitter:description",
      content:
        "Полезные статьи и инструменты для личностного роста, психологии и отношений. Начните свой путь самопознания!",
    },
    { name: "twitter:image", content: "/images/blog-og-image.webp" }, // Replace with a real image
  ],
});
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
