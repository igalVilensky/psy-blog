<template>
  <div class="min-h-screen" style="background-color: #161c2e">
    <div class="max-w-6xl mx-auto py-12 px-6 xl:px-0">
      <!-- Header Section -->
      <div class="text-center mb-10">
        <h1 class="text-3xl md:text-5xl font-bold text-white mb-4">
          Стена вдохновения
        </h1>
        <p class="text-gray-300 max-w-2xl mx-auto">
          Здесь собраны открытия и советы от пользователей. Вдохновляйтесь и
          делитесь своими мыслями через Ежедневную искру роста!
        </p>
      </div>

      <!-- Search Bar -->
      <div class="mb-8">
        <div class="relative max-w-md mx-auto">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Поиск по вдохновляющим мыслям..."
            class="w-full bg-gray-800 bg-opacity-50 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-30 transition-all pl-10"
          />
          <div class="absolute left-3 top-3.5 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>
      </div>

      <!-- Category Filters -->
      <div class="flex flex-wrap gap-2 mb-8 justify-center">
        <button
          v-for="category in categories"
          :key="category"
          @click="selectedCategory = category"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
            selectedCategory === category
              ? 'bg-indigo-600 text-white border border-indigo-500 shadow-md shadow-indigo-500/20'
              : 'bg-gray-800 text-gray-300 border border-gray-700 hover:border-indigo-500 hover:bg-gray-700',
          ]"
        >
          {{ category }}
        </button>
      </div>

      <!-- Loading State -->
      <div
        v-if="loading"
        class="flex flex-col items-center justify-center py-12"
      >
        <div
          class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mb-4"
        ></div>
        <p class="text-indigo-300 font-medium">Загружаем вдохновение...</p>
      </div>

      <!-- Insights Cards Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div
          v-for="insight in filteredInsights"
          :key="insight.id"
          class="bg-gray-800 bg-opacity-50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-indigo-500 shadow-lg hover:shadow-indigo-900/20 transition-all duration-300 transform hover:scale-102 hover:-translate-y-1"
        >
          <div class="flex items-start mb-4">
            <div
              :style="`background-color: ${generateAvatarColor(
                insight.displayName || 'Anonymous'
              )}`"
              class="h-10 w-10 rounded-full flex items-center justify-center text-white font-bold mr-3 shadow-md"
            >
              {{
                (insight.isAnonymous
                  ? "A"
                  : insight.displayName?.[0] || "U"
                ).toUpperCase()
              }}
            </div>
            <div>
              <p class="text-gray-300 text-sm font-medium">
                {{
                  insight.isAnonymous
                    ? "Анонимно"
                    : insight.displayName || "Пользователь"
                }}
              </p>
              <p class="text-xs text-gray-500">
                {{ formatDate(insight.timestamp) }}
              </p>
            </div>
            <span
              class="ml-auto bg-gray-900 px-3 py-1 rounded-full text-xs text-indigo-300 border border-indigo-900"
            >
              {{ insight.category }}
            </span>
          </div>

          <p class="text-white text-lg font-light italic leading-relaxed">
            "{{ insight.text }}"
          </p>

          <!-- Engagement Actions -->
          <div class="flex items-center mt-4 pt-4 border-t border-gray-700">
            <button
              class="flex items-center text-gray-400 hover:text-indigo-400 transition-colors mr-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="mr-1"
              >
                <path
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                ></path>
              </svg>
              {{ randomLikes(insight.id) }}
            </button>
            <button
              class="flex items-center text-gray-400 hover:text-indigo-400 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="mr-1"
              >
                <path
                  d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                ></path>
              </svg>
              Комментировать
            </button>
            <button
              class="flex items-center text-gray-400 hover:text-indigo-400 transition-colors ml-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                <polyline points="16 6 12 2 8 6"></polyline>
                <line x1="12" y1="2" x2="12" y2="15"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="!loading && filteredInsights.length === 0"
        class="bg-gray-800 bg-opacity-50 p-8 rounded-xl border border-gray-700 text-center"
      >
        <div class="text-6xl mb-4">✨</div>
        <h3 class="text-white text-xl mb-2">Пока здесь пусто</h3>
        <p class="text-gray-400 mb-4">
          Будьте первым, кто поделится вдохновением!
        </p>
        <button
          class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all"
        >
          Поделиться мыслью
        </button>
      </div>

      <!-- Load More Button -->
      <div
        v-if="insights.length >= limit && !loading"
        class="flex justify-center mt-8"
      >
        <button
          @click="loadMore"
          class="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-all font-medium flex items-center"
        >
          <span>Загрузить еще</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="ml-2"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
        </button>
      </div>

      <!-- Floating Action Button (Use Case 1) -->
      <FloatingButton
        @click="addNewItem"
        tooltip-text="Добавить вдохновение"
        :pulse-animation="true"
        color="primary"
        size="lg"
      />
      <!-- <FloatingButton
        :menu-items="menuItems"
        tooltip-text="Действия"
        color="success"
        size="md"
        menu-position="top"
        position="bottom-right"
        @menu-item-click="handleMenuAction"
      /> -->

      <FloatingButton
        @click="scrollToTop"
        :custom-color="'#10b981'"
        tooltip-text="Наверх"
        :tooltip-trigger="isMobile ? 'click' : 'hover'"
        size="sm"
        position="bottom-left"
        icon="chevron-up"
      />
      <!-- <FloatingButton
        :menu-items="mobileMenuItems"
        tooltip-text="Меню"
        color="danger"
        size="xl"
        :show-backdrop="true"
        position="bottom-left"
        @menu-item-click="handleMenuAction"
      /> -->
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import FloatingButton from "~/components/base/FloatingButton.vue";
import { getFirestore } from "firebase/firestore";
import { getSharedInsights } from "~/api/firebase/dailyGrowthSpark";

const db = getFirestore();
const insights = ref([]);
const limit = ref(20);
const selectedCategory = ref(null);
const loading = ref(true);
const searchQuery = ref("");

const categories = [
  "Все",
  "Работа",
  "Здоровье",
  "Осознанность",
  "Отношения",
  "Обучение",
];

const sortByDate = () => {
  insights.value.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  alert("Sorted by date!");
};
const shareWall = () => {
  alert("Sharing the inspiration wall!");
};
// Method for Use Case 1: Add New Inspiration
const addNewItem = () => {
  alert("Opening form to add a new inspiration!");
  // Add logic to open a modal or form here
};
// Methods for Use Case 2: Menu Actions
const handleMenuAction = (item) => {
  alert(`Action: ${item.label}`);
  if (typeof item.action === "function") {
    item.action();
  }
};
// Menu items for Use Case 2 (Floating Button with Menu)
const menuItems = ref([
  { label: "Добавить вдохновение", action: addNewItem, icon: "svg-plus" },
  { label: "Сортировать по дате", action: sortByDate, icon: "svg-calendar" },
  { label: "Поделиться стеной", action: shareWall, icon: "svg-share" },
]);
const fetchInsights = async () => {
  loading.value = true;
  try {
    // Simulate network delay for loading state demo
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const response = await getSharedInsights(db, limit.value);
    if (response.success) {
      insights.value = response.data;
    } else {
      console.error(response.message);
    }
  } catch (error) {
    console.error("Error fetching insights:", error);
  } finally {
    loading.value = false;
  }
};

const filteredInsights = computed(() => {
  let result = insights.value;

  if (selectedCategory.value && selectedCategory.value !== "Все") {
    result = result.filter(
      (insight) => insight.category === selectedCategory.value
    );
  }

  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (insight) =>
        insight.text.toLowerCase().includes(query) ||
        (insight.displayName &&
          insight.displayName.toLowerCase().includes(query))
    );
  }

  return result;
});

// Utility to load more insights
const loadMore = () => {
  limit.value += 20;
  fetchInsights();
};
const isMobile = ref(false);
// Format date for display
const formatDate = (timestamp) => {
  if (!timestamp) return "";

  const date = new Date(timestamp);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "Сегодня";
  } else if (diffDays === 1) {
    return "Вчера";
  } else if (diffDays < 7) {
    return `${diffDays} дн. назад`;
  } else {
    return date.toLocaleDateString();
  }
};

// Check if mobile view
const checkMobile = () => {
  isMobile.value = window.innerWidth < 640;
};
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
// Generate consistent colors for user avatars
const generateAvatarColor = (name) => {
  if (!name) return "#6366f1"; // Default indigo

  const colors = [
    "#6366f1", // Indigo
    "#8b5cf6", // Violet
    "#ec4899", // Pink
    "#ef4444", // Red
    "#f97316", // Orange
    "#f59e0b", // Amber
    "#10b981", // Emerald
    "#06b6d4", // Cyan
    "#3b82f6", // Blue
  ];

  const charCode = name
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[charCode % colors.length];
};

// Generate random like counts for demo
const randomLikes = (id) => {
  const hash = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return (hash % 50) + 1;
};

onMounted(() => {
  selectedCategory.value = "Все";
  fetchInsights();
  checkMobile();
  window.addEventListener("resize", checkMobile);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkMobile);
});
</script>

<style scoped>
.transform {
  transition: transform 0.3s ease;
}
.hover\:scale-102:hover {
  transform: scale(1.02);
}
</style>
