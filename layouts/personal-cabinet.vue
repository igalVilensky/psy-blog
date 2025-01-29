<template>
  <div class="min-h-[100dvh] bg-gray-50">
    <!-- Fixed Top Navbar -->
    <nav
      class="fixed top-0 left-0 right-0 bg-gradient-to-r from-[#1A1F35] to-[#1E293B] z-50"
    >
      <div class="mx-auto max-w-6xl px-4">
        <div class="flex justify-between items-center h-16">
          <!-- Left side - Logo/User -->
          <div class="flex items-center space-x-3">
            <NuxtLink
              to="/profile"
              class="flex items-center hover:opacity-80 transition-opacity"
            >
              <img
                :src="userAvatar"
                :alt="`Аватар ${userName}`"
                class="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border-2 border-white/20"
              />
            </NuxtLink>
            <div class="text-white hidden md:block">
              <p class="font-semibold text-sm">{{ userName }}</p>
              <NuxtLink
                to="/profile"
                class="text-xs text-blue-400 hover:text-white transition-colors"
              >
                Редактировать профиль
              </NuxtLink>
            </div>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-1">
            <NuxtLink
              v-for="item in navigationItems"
              :key="item.name"
              :to="item.route"
              class="px-4 py-2 rounded-lg text-white text-sm transition-colors relative group"
              :class="{
                'bg-white/10': isRouteActive(item.route),
                'hover:bg-white/5': !isRouteActive(item.route),
              }"
            >
              <div class="flex items-center gap-2">
                <i :class="['fas', item.icon]"></i>
                <span>{{ item.name }}</span>
              </div>
              <!-- Hover/Active indicator -->
              <div
                class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform"
                :class="{ 'scale-x-100': isRouteActive(item.route) }"
              ></div>
            </NuxtLink>
          </div>

          <!-- Mobile Menu Button -->
          <button
            @click="toggleMobileMenu"
            class="md:hidden p-2 rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            <i
              :class="[
                'fas',
                isMobileMenuOpen ? 'fa-times' : 'fa-bars',
                'text-xl text-white',
              ]"
            ></i>
          </button>
        </div>
      </div>
    </nav>

    <!-- Mobile Navigation Menu -->
    <div
      v-if="isMobileMenuOpen"
      class="fixed inset-0 bg-black bg-opacity-50 z-40"
      @click="closeMobileMenu"
    >
      <div
        class="absolute right-0 top-16 w-64 max-h-[calc(100vh-4rem)] overflow-y-auto bg-gradient-to-b from-[#1A1F35] to-[#1E293B] shadow-xl"
        @click.stop
      >
        <!-- Mobile User Profile -->
        <div class="p-4 border-b border-white/10">
          <div class="flex items-center space-x-3">
            <NuxtLink
              to="/profile"
              class="flex items-center hover:opacity-80 transition-opacity"
            >
              <img
                :src="userAvatar"
                :alt="`Аватар ${userName}`"
                class="w-10 h-10 rounded-full object-cover border-2 border-white/20"
              />
            </NuxtLink>
            <div class="text-white">
              <p class="font-semibold text-sm">{{ userName }}</p>
              <NuxtLink
                to="/profile"
                class="text-xs text-blue-400 hover:text-white transition-colors"
                @click="closeMobileMenu"
              >
                Редактировать профиль
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Mobile Navigation Links -->
        <div class="py-2">
          <NuxtLink
            v-for="item in navigationItems"
            :key="item.name"
            :to="item.route"
            class="flex items-center space-x-3 px-4 py-3 text-white transition-colors relative"
            :class="{
              'bg-white/10': isRouteActive(item.route),
              'hover:bg-white/5': !isRouteActive(item.route),
            }"
            @click="closeMobileMenu"
          >
            <i :class="['fas', item.icon, 'w-5']"></i>
            <span>{{ item.name }}</span>
            <!-- Active indicator -->
            <div
              v-if="isRouteActive(item.route)"
              class="absolute left-0 top-0 bottom-0 w-1 bg-blue-400"
            ></div>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Breadcrumbs - adjusted for fixed header -->
    <div class="bg-white border-b border-gray-200 mt-16">
      <div class="mx-auto max-w-6xl px-4">
        <nav class="py-3 overflow-hidden">
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
              <li class="min-w-0">
                <NuxtLink
                  v-if="crumb.link"
                  :to="crumb.link"
                  class="text-gray-600 hover:text-gray-900 transition-colors block truncate max-w-[120px] sm:max-w-[200px] md:max-w-xs"
                  :title="crumb.text"
                >
                  {{ formatBreadcrumbText(crumb.text) }}
                </NuxtLink>
                <span
                  v-else
                  class="text-gray-900 font-medium block truncate max-w-[120px] sm:max-w-[200px] md:max-w-xs"
                  :title="crumb.text"
                >
                  {{ formatBreadcrumbText(crumb.text) }}
                </span>
              </li>
            </template>
          </ol>
        </nav>
      </div>
    </div>

    <!-- Page Content - adjusted for fixed header -->
    <main class="p-4 mx-auto max-w-6xl">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "~/stores/auth";

definePageMeta({
  layout: "personal-cabinet",
});

const authStore = useAuthStore();
const route = useRoute();
const isMobileMenuOpen = ref(false);

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
  { name: "Гайды", route: "/courses/guides", icon: "fa-book-open" },
  { name: "Инструменты", route: "/awareness-tools", icon: "fa-tools" },
  {
    name: "Прогресс",
    route: "/personal-cabinet/progress",
    icon: "fa-chart-line",
  },
  { name: "Настройки", route: "/profile/settings", icon: "fa-cog" },
];

// Fix for route active state
const isRouteActive = (itemRoute) => {
  if (itemRoute === "/personal-cabinet" && route.path !== "/personal-cabinet") {
    return false;
  }
  return route.path.startsWith(itemRoute);
};

// Format breadcrumb text - decode URI components and handle Cyrillic
const formatBreadcrumbText = (text) => {
  try {
    const decodedText = decodeURIComponent(text);
    return decodedText
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  } catch (e) {
    return text;
  }
};

const breadcrumbs = computed(() => {
  const paths = route.path.split("/").filter(Boolean);
  return paths.map((path, index) => {
    const link = `/${paths.slice(0, index + 1).join("/")}`;
    return {
      text: path,
      link: index < paths.length - 1 ? link : null,
    };
  });
});

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

// Close mobile menu on route change
watch(route, () => {
  isMobileMenuOpen.value = false;
});
</script>
