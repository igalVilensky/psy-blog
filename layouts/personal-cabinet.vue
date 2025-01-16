<template>
  <div class="flex min-h-[100dvh] bg-gray-50">
    <!-- Sidebar -->
    <aside
      :class="[
        'bg-gray-800 text-white fixed h-full overflow-y-auto transition-all duration-300 shadow-xl z-20',
      ]"
      :style="{ width: isSidebarCollapsed ? '4rem' : '16rem' }"
    >
      <div class="p-4">
        <!-- Collapse/Expand Button -->
        <button
          @click="toggleSidebar"
          class="w-full p-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
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
              'text-xl',
            ]"
          ></i>
        </button>

        <!-- User Profile Section -->
        <div
          v-if="!isSidebarCollapsed"
          class="flex items-center space-x-3 my-6 p-3 bg-gray-700 rounded-lg"
        >
          <img
            :src="userAvatar"
            :alt="`Аватар ${userName}`"
            class="w-10 h-10 rounded-full object-cover border-2 border-gray-600"
          />
          <div>
            <p class="font-semibold text-sm">{{ userName }}</p>
            <button
              @click="navigateToProfile"
              class="text-xs text-blue-300 hover:text-blue-200 transition-colors focus:outline-none focus:underline"
            >
              Редактировать профиль
            </button>
          </div>
        </div>

        <!-- Collapsed Avatar (Small Icon) -->
        <img
          v-else
          :src="userAvatar"
          :alt="`Аватар ${userName}`"
          class="w-6 h-6 rounded-full object-cover border-2 border-gray-600 mx-auto mt-6"
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
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-700 text-gray-300 hover:text-white',
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

      <!-- Bottom Section -->
      <div
        v-if="!isSidebarCollapsed"
        class="fixed bottom-0 left-0 p-4 bg-gray-900"
        :style="{ width: isSidebarCollapsed ? '64px' : '256px' }"
      >
        <button
          @click="logout"
          class="w-full flex items-center p-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <i class="fas fa-sign-out-alt mr-2"></i>
          Выйти
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main
      class="flex-grow transition-all duration-300 bg-gray-50"
      :style="{ marginLeft: isSidebarCollapsed ? '4rem' : '16rem' }"
    >
      <!-- Top Navigation Bar -->
      <div
        class="fixed top-0 right-0 bg-white h-16 shadow-sm z-10"
        :class="topNavWidth"
      >
        <div class="h-full px-6 flex justify-between items-center">
          <!-- Breadcrumb -->
          <nav
            aria-label="Хлебные крошки"
            class="flex items-center space-x-2 text-sm"
          >
            <ol class="flex items-center space-x-2">
              <li>
                <NuxtLink
                  to="/"
                  class="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <i class="fas fa-home"></i>
                </NuxtLink>
              </li>
              <li v-for="(crumb, index) in breadcrumbs" :key="index">
                <span class="text-gray-400 mx-2">/</span>
                <NuxtLink
                  v-if="crumb.link"
                  :to="crumb.link"
                  class="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {{ crumb.text }}
                </NuxtLink>
                <span v-else class="text-gray-900 font-medium">
                  {{ crumb.text }}
                </span>
              </li>
            </ol>
          </nav>

          <!-- User Actions -->
          <div class="flex items-center space-x-4">
            <button
              class="p-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
              aria-label="Уведомления"
            >
              <i class="fas fa-bell"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Page Content -->
      <div class="mt-16 py-6">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";

// State
const isSidebarCollapsed = ref(false);
const route = useRoute();

// User data (replace with your auth system)
const userName = ref("Иван Иванов");
const userAvatar = ref("https://ui-avatars.com/api/?name=Иван+Иванов");

// Navigation items with Font Awesome icons
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
  { name: "Прогресс", route: "/progress", icon: "fa-chart-line" },
  { name: "Настройки", route: "/settings", icon: "fa-cog" },
];

// Computed properties
const topNavWidth = computed(() => {
  return isSidebarCollapsed.value ? "left-16" : "left-64";
});

const breadcrumbs = computed(() => {
  const paths = route.path.split("/").filter(Boolean); // Split the path and remove empty strings
  return paths.map((path, index) => {
    const text = path
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "); // Convert "course-1" to "Course 1"
    const link = `/${paths.slice(0, index + 1).join("/")}`; // Generate the full path
    return {
      text,
      link: index < paths.length - 1 ? link : null, // Only add link for non-last items
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
  // Логика перехода к профилю
};

const logout = () => {
  // Логика выхода
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
