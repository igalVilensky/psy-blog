<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <aside
      :class="[
        'bg-gray-800 text-white fixed h-full overflow-y-auto transition-all duration-300 shadow-xl z-20',
        isSidebarCollapsed ? 'w-16' : 'w-64',
      ]"
      aria-label="Main navigation"
    >
      <div class="p-4">
        <!-- Collapse/Expand Button -->
        <button
          @click="toggleSidebar"
          class="w-full p-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          :aria-label="
            isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'
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
            :alt="`${userName}'s avatar`"
            class="w-10 h-10 rounded-full object-cover border-2 border-gray-600"
          />
          <div>
            <p class="font-semibold text-sm">{{ userName }}</p>
            <button
              @click="navigateToProfile"
              class="text-xs text-blue-300 hover:text-blue-200 transition-colors focus:outline-none focus:underline"
            >
              Edit Profile
            </button>
          </div>
        </div>

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
        class="absolute bottom-0 left-0 right-0 p-4 bg-gray-900"
      >
        <button
          @click="logout"
          class="w-full flex items-center p-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <i class="fas fa-sign-out-alt mr-2"></i>
          Logout
        </button>
      </div>
    </aside>

    <!-- Top Navigation Bar -->
    <div
      :class="[
        'fixed top-0 right-0 bg-white h-16 shadow-sm z-10 transition-all duration-300',
        isSidebarCollapsed ? 'left-16' : 'left-64',
      ]"
    >
      <div class="h-full px-6 flex justify-between items-center">
        <!-- Breadcrumb -->
        <nav
          aria-label="Breadcrumb"
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
              <component
                :is="crumb.link ? 'NuxtLink' : 'span'"
                :to="crumb.link"
                :class="[
                  crumb.link
                    ? 'text-gray-500 hover:text-gray-700'
                    : 'text-gray-900 font-medium',
                  'transition-colors',
                ]"
              >
                {{ crumb.text }}
              </component>
            </li>
          </ol>
        </nav>

        <!-- User Actions -->
        <div class="flex items-center space-x-4">
          <button
            class="p-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
            aria-label="Notifications"
          >
            <i class="fas fa-bell"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <main
      :class="[
        'flex-grow transition-all duration-300 bg-gray-50',
        isSidebarCollapsed ? 'ml-16' : 'ml-64',
        'mt-16 p-6',
      ]"
      role="main"
    >
      <!-- Page Content -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <!-- Use slot to render the page content -->
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
const userName = ref("John Doe");
const userAvatar = ref("https://ui-avatars.com/api/?name=John+Doe");

// Navigation items with Font Awesome icons
const navigationItems = [
  {
    name: "Courses",
    route: "/personal-cabinet/courses",
    icon: "fa-graduation-cap",
  },
  { name: "Guides", route: "/guides", icon: "fa-book-open" },
  { name: "Tools", route: "/tools", icon: "fa-tools" },
  { name: "Profile", route: "/profile", icon: "fa-user" },
  { name: "Progress", route: "/progress", icon: "fa-chart-line" },
  { name: "Settings", route: "/settings", icon: "fa-cog" },
];

// Computed
const breadcrumbs = computed(() => {
  const paths = route.path.split("/").filter(Boolean);
  return paths.map((path, index) => ({
    text: path.charAt(0).toUpperCase() + path.slice(1),
    link:
      index < paths.length - 1
        ? `/${paths.slice(0, index + 1).join("/")}`
        : null,
  }));
});

// Methods
const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
};

const isActiveRoute = (path) => {
  return route.path === path;
};

const navigateToProfile = () => {
  // Implement navigation logic
};

const logout = () => {
  // Implement logout logic
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
