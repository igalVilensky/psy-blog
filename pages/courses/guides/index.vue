<template>
  <div class="relative min-h-screen">
    <div class="relative z-10">
      <!-- Header Section -->
      <header class="pt-8 px-4 relative">
        <!-- Animated Background Gradient -->
        <div
          class="absolute -bottom-2 sm:bottom-0 inset-0 bg-gradient-to-r from-[#0EA5E9]/10 via-[#E879F9]/10 to-[#0EA5E9]/10 animate-gradient-x"
        ></div>

        <div class="container mx-auto max-w-6xl relative">
          <!-- Breadcrumb -->
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
                  >Руководства</span
                >
              </li>
            </ol>
          </nav>

          <!-- Title Section -->
          <div class="mb-6">
            <div class="md:inline-block w-full md:w-auto">
              <div
                class="bg-[#0EA5E9]/20 md:bg-transparent px-6 py-4 md:p-0 rounded-lg"
              >
                <h1 class="text-3xl md:text-4xl font-bold text-white">
                  Руководства для Саморазвития
                </h1>
              </div>
            </div>
          </div>

          <!-- Category Navigation -->
          <nav class="relative" aria-label="Категории руководств">
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
                <span>{{ selectedCategory || "Все категории" }}</span>
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

            <!-- Desktop Navigation -->
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
                  <!-- Active Indicator -->
                  <div
                    v-if="selectedCategory === category"
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

      <!-- Guides Grid -->
      <main class="container mx-auto max-w-6xl px-4 sm:px-0 pb-24 mt-4 sm:mt-8">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article
            v-for="guide in filteredGuides"
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

        <!-- Empty State -->
        <div
          role="status"
          aria-live="polite"
          v-if="filteredGuides?.length === 0"
          class="text-center py-16 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10"
        >
          <div class="text-[#0EA5E9] mb-4">
            <i class="fas fa-search text-4xl"></i>
          </div>
          <h3 class="text-xl font-semibold text-white/90 mb-2">
            Руководства не найдены
          </h3>
          <p class="text-slate-300">
            В данной категории пока нет руководств. Пожалуйста, выберите другую
            категорию.
          </p>
        </div>
        <!-- Call to Action -->
        <div
          class="mt-16 bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-[#0EA5E9]/20 p-8 text-center transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(14,165,233,0.3)]"
        >
          <h2 class="text-2xl font-bold text-white/90 mb-4">
            Подпишитесь на новые материалы
          </h2>
          <p class="text-slate-300 mb-6 max-w-2xl mx-auto">
            Получите доступ к эксклюзивным руководствам, которые помогут вам в
            путешествии к самопознанию.
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
const isOpen = ref(false);

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

// Select category
const selectCategory = (category) => {
  selectedCategory.value = category;
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
