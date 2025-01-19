<template>
  <div class="flex min-h-[100dvh] bg-gray-50">
    <!-- Sidebar -->
    <aside
      :class="[
        'fixed h-full overflow-y-auto transition-all duration-300 shadow-xl z-20 bg-gradient-to-b from-[#1A1F35] to-[#1E293B]',
      ]"
      :style="{ width: isSidebarCollapsed ? '4rem' : '16rem' }"
    >
      <div class="p-4">
        <!-- Collapse/Expand Button -->
        <button
          @click="toggleSidebar"
          class="w-full p-2 rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          :aria-label="
            isSidebarCollapsed
              ? 'Развернуть боковую панель'
              : 'Свернуть боковую панель'
          "
        >
          <i
            :class="[
              'fas',
              isSidebarCollapsed ? 'fa-chevron-right' : 'fa-chevron-left',
              'text-xl text-white',
            ]"
          ></i>
        </button>

        <!-- User Profile Section -->
        <div
          v-if="!isSidebarCollapsed"
          class="flex items-center space-x-3 my-6 p-3 bg-white/10 rounded-lg"
        >
          <img
            :src="userAvatar"
            :alt="`Аватар ${userName}`"
            class="w-10 h-10 rounded-full object-cover border-2 border-white/20"
          />
          <div>
            <p class="font-semibold text-sm text-white">{{ userName }}</p>
            <button
              @click="navigateToProfile"
              class="text-xs text-blue-300 hover:text-blue-200 transition-colors focus:outline-none focus:underline"
            >
              Редактировать профиль
            </button>
          </div>
        </div>

        <!-- Collapsed Avatar -->
        <img
          v-else
          :src="userAvatar"
          :alt="`Аватар ${userName}`"
          class="w-6 h-6 rounded-full object-cover border-2 border-white/20 mx-auto mt-6"
        />

        <!-- Navigation Links -->
        <nav class="mt-6">
          <ul class="space-y-2">
            <li v-for="item in navigationItems" :key="item.name">
              <NuxtLink
                :to="item.route"
                :title="isSidebarCollapsed ? item.name : ''"
                class="flex items-center p-3 rounded-lg transition-colors relative"
                :class="[
                  isActiveRoute(item.route)
                    ? 'bg-white/20 text-white'
                    : 'text-white hover:bg-white/10',
                  isSidebarCollapsed ? 'justify-center' : '',
                ]"
              >
                <i
                  :class="[
                    'fas',
                    item.icon,
                    isSidebarCollapsed ? 'text-center w-5' : 'mr-3 w-5',
                  ]"
                ></i>
                <span v-if="!isSidebarCollapsed" class="text-sm">
                  {{ item.name }}
                </span>
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </aside>

    <!-- Main Content -->
    <main
      class="flex-grow transition-all duration-300 bg-gray-50"
      :style="{ marginLeft: isSidebarCollapsed ? '4rem' : '16rem' }"
    >
      <!-- Breadcrumbs -->
      <div class="relative bg-white border-b border-gray-200 py-3">
        <nav class="px-4">
          <ol class="flex flex-wrap items-center gap-2 text-sm">
            <li>
              <NuxtLink
                to="/"
                class="text-gray-600 hover:text-gray-900 transition-colors inline-flex items-center"
              >
                <i class="fas fa-home text-gray-400 hover:text-gray-600"></i>
                <span class="ml-2 hidden sm:inline">Главная</span>
              </NuxtLink>
            </li>
            <template v-for="(crumb, index) in breadcrumbs" :key="index">
              <li>
                <i class="fas fa-chevron-right mx-2 text-gray-400 text-xs"></i>
              </li>
              <li>
                <NuxtLink
                  v-if="crumb.link"
                  :to="crumb.link"
                  class="text-gray-600 hover:text-gray-900 transition-colors truncate"
                  :title="crumb.text"
                >
                  {{ crumb.text }}
                </NuxtLink>
                <span
                  v-else
                  class="text-gray-900 font-medium truncate"
                  :title="crumb.text"
                >
                  {{ crumb.text }}
                </span>
              </li>
            </template>
          </ol>
        </nav>
      </div>

      <!-- Page Content -->
      <div>
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "~/stores/auth";

definePageMeta({
  layout: "personal-cabinet",
});

const authStore = useAuthStore();

// State
const isSidebarCollapsed = ref(false);
const route = useRoute();

// User data
const userName = ref(authStore.user?.displayName || "Гость");
const userAvatar = ref("https://ui-avatars.com/api/?name=Иван+Иванов");

// Navigation items
const navigationItems = [
  {
    name: "Главная",
    route: "/personal-cabinet",
    icon: "fa-home",
  },
  {
    name: "Курсы",
    route: "/personal-cabinet/courses",
    icon: "fa-graduation-cap",
  },
  { name: "Гайды", route: "/guides", icon: "fa-book-open" },
  { name: "Инструменты", route: "/tools", icon: "fa-tools" },
  { name: "Профиль", route: "/profile", icon: "fa-user" },
  {
    name: "Прогресс",
    route: "/personal-cabinet/progress",
    icon: "fa-chart-line",
  },
  { name: "Настройки", route: "/settings", icon: "fa-cog" },
];

// Computed properties
const topNavWidth = computed(() => {
  return isSidebarCollapsed.value ? "left-16" : "left-64";
});

const breadcrumbs = computed(() => {
  const paths = route.path.split("/").filter(Boolean);
  return paths.map((path, index) => {
    const text = path
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    const link = `/${paths.slice(0, index + 1).join("/")}`;
    return {
      text,
      link: index < paths.length - 1 ? link : null,
    };
  });
});

// Methods
const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
};

const isActiveRoute = (path) => {
  return route.path === path;
};

const navigateToProfile = () => {
  // Navigation logic
};

// Responsive behavior
const checkScreenSize = () => {
  isSidebarCollapsed.value = window.innerWidth < 768;
};

// Lifecycle hooks
onMounted(() => {
  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkScreenSize);
});
</script>
