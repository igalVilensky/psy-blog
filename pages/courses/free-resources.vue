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
                  >Бесплатные материалы</span
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
                <h1 class="text-3xl md:text-4xl font-bold text-white">
                  Бесплатные материалы
                </h1>
              </div>
            </div>
          </div>

          <!-- Enhanced Resource Types Navigation -->
          <nav class="relative" aria-label="Типы ресурсов">
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
                <span>{{ selectedType || "Все типы" }}</span>
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
                      v-for="type in resourceTypes"
                      :key="type"
                      @click="selectType(type)"
                      class="w-full px-4 py-3 text-left text-sm font-medium transition-colors duration-300"
                      :class="[
                        selectedType === type
                          ? 'text-white bg-[#0EA5E9]/20'
                          : 'text-slate-200 hover:text-white hover:bg-white/5',
                      ]"
                    >
                      <span class="flex items-center justify-between">
                        {{ type }}
                        <span
                          v-if="getTypeCount(type)"
                          class="ml-2 text-xs px-2 py-0.5 rounded-full bg-[#0EA5E9]/10 border border-[#0EA5E9]/20"
                        >
                          {{ getTypeCount(type) }}
                        </span>
                      </span>
                    </button>
                  </div>
                </div>
              </transition>
            </div>

            <!-- Desktop Navigation -->
            <ul class="hidden md:flex flex-wrap -mb-px relative">
              <li v-for="type in resourceTypes" :key="type" class="mr-2">
                <button
                  type="button"
                  @click="selectType(type)"
                  class="px-6 py-3 text-sm font-medium transition-all duration-300 relative group"
                  :class="[
                    selectedType === type
                      ? 'text-white'
                      : 'text-slate-200 hover:text-white',
                  ]"
                >
                  <span class="relative z-10">{{ type }}</span>
                  <span
                    v-if="getTypeCount(type)"
                    class="ml-2 text-xs px-2 py-0.5 rounded-full bg-[#0EA5E9]/10 border border-[#0EA5E9]/20"
                  >
                    {{ getTypeCount(type) }}
                  </span>
                  <!-- Active Indicator -->
                  <div
                    v-if="selectedType === type"
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

      <!-- Resources Grid -->
      <main class="container mx-auto max-w-6xl px-4 xl:px-0 pb-16 mt-4 sm:mt-8">
        <!-- Guides Section -->
        <div v-if="selectedType === 'Все' || selectedType === 'Гайды'">
          <h2 class="text-2xl font-bold text-white/90 mb-6">Гайды</h2>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <article
              v-for="guide in guides"
              :key="guide._id"
              class="group bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(14,165,233,0.3)]"
            >
              <!-- Image Container -->
              <div class="relative aspect-[4/3] overflow-hidden">
                <nuxt-img
                  v-if="guide.image"
                  :src="urlFor(guide.image).width(550).height(310).url()"
                  :alt="guide.title"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  width="550"
                  height="310"
                  loading="lazy"
                  format="webp"
                  quality="80"
                />
                <!-- Category Badge -->
                <span
                  :class="[
                    'absolute top-4 left-4 px-4 py-2 rounded-full text-sm font-medium shadow-md backdrop-blur-sm border border-white/10',
                    {
                      'bg-green-500/80': guide.category === 'Самопознание',
                      'bg-purple-500/80':
                        guide.category === 'Эмоциональный интеллект',
                      'bg-blue-500/80': guide.category === 'Отношения',
                      'bg-pink-500/80': guide.category === 'Карьерный рост',
                    },
                  ]"
                  class="text-white"
                >
                  {{ guide.category }}
                </span>
              </div>

              <!-- Guide Content -->
              <div class="p-8">
                <h2
                  class="text-xl font-bold text-white/90 mb-4 line-clamp-2 group-hover:text-[#0EA5E9] transition-colors duration-300"
                >
                  {{ guide.title }}
                </h2>
                <p class="text-slate-300 line-clamp-3 mb-4">
                  {{ guide.description }}
                </p>

                <!-- Icon and Description -->
                <div
                  class="flex items-center justify-between text-sm text-slate-400 pt-4 border-t border-white/10"
                >
                  <div class="flex items-center space-x-1.5">
                    <i
                      :class="
                        guide.category === 'Самопознание'
                          ? 'fas fa-star'
                          : guide.category === 'Эмоциональный интеллект'
                          ? 'fas fa-heart'
                          : guide.category === 'Отношения'
                          ? 'fas fa-users'
                          : 'fas fa-mountain'
                      "
                      class="text-[#0EA5E9]"
                    ></i>
                    <span>
                      {{
                        guide.category === "Самопознание"
                          ? "Упражнения для глубокого самоанализа"
                          : guide.category === "Эмоциональный интеллект"
                          ? "Техники для развития эмпатии и самоконтроля"
                          : guide.category === "Отношения"
                          ? "Инструменты для укрепления связи с близкими"
                          : "Стратегии для достижения карьерных и личных целей"
                      }}
                    </span>
                  </div>
                </div>

                <!-- Читать далее -->
                <NuxtLink
                  v-if="guide.slug?.current"
                  :to="`/courses/guides/${guide.slug.current}`"
                  class="mt-4 inline-flex justify-center items-center px-6 py-2 bg-gradient-to-r from-[#0EA5E9] to-[#22D3EE] text-white w-full font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  <i class="fas fa-book-open mr-2"></i>
                  {{ "Читать далее" }}
                </NuxtLink>
              </div>
            </article>
          </div>
        </div>

        <!-- Podcasts Section -->
        <div
          v-if="selectedType === 'Все' || selectedType === 'Подкасты'"
          class="mt-12"
        >
          <h2 class="text-2xl font-bold text-white/90 mb-6">Подкасты</h2>
          <div class="grid md:grid-cols-2 gap-8">
            <div
              v-for="podcast in podcasts"
              :key="podcast.id"
              class="group bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-[#0EA5E9]/20 overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(14,165,233,0.3)]"
            >
              <div class="flex flex-col md:flex-row h-full">
                <!-- Image Container -->
                <div
                  class="md:w-1/3 relative overflow-hidden aspect-[4/3] md:aspect-auto"
                >
                  <img
                    :src="podcast.image"
                    :alt="podcast.title"
                    class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <!-- Content Container -->
                <div
                  class="p-6 md:p-8 md:w-2/3 flex flex-col justify-between space-y-6"
                >
                  <!-- Header Section -->
                  <div class="space-y-4">
                    <div
                      class="flex flex-col sm:flex-row sm:items-start justify-between gap-4"
                    >
                      <h3
                        class="text-xl font-bold text-white/90 group-hover:text-[#0EA5E9] transition-colors duration-300 leading-tight"
                      >
                        {{ podcast.title }}
                      </h3>
                      <span
                        class="inline-block text-center bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] text-white px-4 py-1.5 rounded-full text-sm whitespace-nowrap backdrop-blur-sm"
                      >
                        {{ podcast.category }}
                      </span>
                    </div>
                    <p class="text-slate-300 line-clamp-2">
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
                      )}&color=%23507caf&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div
          role="status"
          aria-live="polite"
          v-if="filteredResources.length === 0"
          class="text-center py-16 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10"
        >
          <div class="text-[#0EA5E9] mb-4">
            <i class="fas fa-search text-4xl"></i>
          </div>
          <h3 class="text-xl font-semibold text-white/90 mb-2">
            Ресурсы не найдены
          </h3>
          <p class="text-slate-300">
            В данной категории пока нет ресурсов. Пожалуйста, выберите другую
            категорию.
          </p>
        </div>
        <!-- Email Capture CTA -->
        <div
          class="max-w-6xl mx-auto my-16 bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-[#0EA5E9]/20 p-6 sm:p-8 text-center transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(14,165,233,0.3)]"
        >
          <h2 class="text-2xl font-bold text-white/90 mb-4">
            Получайте бесплатные материалы первыми
          </h2>
          <p class="text-slate-300 mb-6 max-w-2xl mx-auto">
            Подпишитесь на нашу рассылку и будьте в курсе всех новых бесплатных
            ресурсов, которые помогут вам расти и развиваться.
          </p>
          <div
            class="max-w-md mx-auto flex flex-col sm:flex-row gap-3 sm:gap-0"
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
import { ref, computed, onMounted } from "vue";
import { fetchGuides } from "~/api/sanity/guides";
import { getImageUrl } from "~/api/sanity/client";
import { getFirestore } from "firebase/firestore";
import { subscribeUser } from "@/api/firebase/contact";
import podcastImage from "~/assets/images/podcasts/podcasts.jpeg";

// Fetch guides
const initialGuides = await fetchGuides();
const guides = ref(initialGuides.data || []);

// Fetch podcasts (replace with your actual podcast fetching logic)
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

// Email subscription
const email = ref("");
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
