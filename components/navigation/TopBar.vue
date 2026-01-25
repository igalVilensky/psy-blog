<template>
  <nav
    class="sticky top-0 left-0 right-0 z-50 bg-white/95 dark:bg-black/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 shadow-sm transition-colors duration-500 w-full">

    <!-- Container -->
    <div class="container max-w-7xl px-4 sm:px-6 mx-auto flex justify-between items-center h-16 relative z-10">
      <!-- Logo -->
      <NuxtLink to="/" class="group relative flex items-center gap-3" @click="closeDropdown">
        <div class="relative w-10 h-10">
          <img src="/mindqlab-logo.png" alt="MindQLab Logo"
            class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" />
        </div>
        <span
          class="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300">
          MindQLab
        </span>
      </NuxtLink>

      <!-- Desktop Menu -->
      <div class="hidden lg:flex items-center space-x-6">
        <!-- Центр Развития Dropdown -->
        <div class="relative group">
          <NuxtLink to="/space"
            class="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200 border border-transparent hover:border-cyan-500/50 rounded-lg"
            :class="{ 'text-cyan-600 dark:text-cyan-400 border-cyan-500/50 bg-cyan-500/10': isLabRouteActive }"
            @click="closeDropdown">
            <i class="fas fa-cubes"></i>
            <span>Центр Развития</span>
            <i class="fas fa-chevron-down text-xs opacity-50 group-hover:rotate-180 transition-transform"></i>
          </NuxtLink>
          <div
            class="absolute top-full left-0 mt-2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div
              class="bg-white dark:bg-zinc-900 shadow-xl border border-zinc-200 dark:border-zinc-800 rounded-xl min-w-[240px] py-2">
              <NuxtLink to="/space/tests"
                class="flex items-center space-x-3 px-6 py-3 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors"
                exact-active-class="text-cyan-600 dark:text-cyan-400 bg-cyan-500/10" @click="closeDropdown">
                <i class="fas fa-brain w-5 text-center"></i>
                <span>Тесты</span>
              </NuxtLink>
              <NuxtLink to="/space/brain-training"
                class="flex items-center space-x-3 px-6 py-3 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors"
                exact-active-class="text-cyan-600 dark:text-cyan-400 bg-cyan-500/10" @click="closeDropdown">
                <i class="fas fa-chess w-5 text-center"></i>
                <span>Тренировка Мозга</span>
              </NuxtLink>
              <NuxtLink to="/space/psychology"
                class="flex items-center space-x-3 px-6 py-3 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors"
                exact-active-class="text-cyan-600 dark:text-cyan-400 bg-cyan-500/10" @click="closeDropdown">
                <i class="fas fa-book-open w-5 text-center"></i>
                <span>Психология</span>
              </NuxtLink>
              <NuxtLink to="/space/mindfulness"
                class="flex items-center space-x-3 px-6 py-3 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors"
                exact-active-class="text-cyan-600 dark:text-cyan-400 bg-cyan-500/10" @click="closeDropdown">
                <i class="fas fa-spa w-5 text-center"></i>
                <span>Медитация</span>
              </NuxtLink>
              <div class="h-px bg-zinc-200 dark:bg-zinc-800 mx-4 my-2"></div>
              <NuxtLink to="/space/dashboard"
                class="flex items-center space-x-3 px-6 py-3 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors"
                exact-active-class="text-cyan-600 dark:text-cyan-400 bg-cyan-500/10" @click="closeDropdown">
                <i class="fas fa-chart-pie w-5 text-center"></i>
                <span>Дашборд</span>
              </NuxtLink>
              <NuxtLink to="/space/growth"
                class="flex items-center space-x-3 px-6 py-3 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors"
                exact-active-class="text-cyan-600 dark:text-cyan-400 bg-cyan-500/10" @click="closeDropdown">
                <i class="fas fa-seedling w-5 text-center"></i>
                <span>Саморазвитие</span>
              </NuxtLink>
              <NuxtLink to="/space/experiments/voice-structure"
                class="flex items-center space-x-3 px-6 py-3 text-sm font-medium text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 hover:bg-amber-500/10 transition-colors"
                exact-active-class="bg-amber-500/20" @click="closeDropdown">
                <i class="fas fa-microphone-alt w-5 text-center"></i>
                <span>Голос &rarr; Структура</span>
              </NuxtLink>
              <NuxtLink to="/space/community"
                class="flex items-center space-x-3 px-6 py-3 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors"
                exact-active-class="text-cyan-600 dark:text-cyan-400 bg-cyan-500/10" @click="closeDropdown">
                <i class="fas fa-users w-5 text-center"></i>
                <span>Сообщество</span>
              </NuxtLink>
            </div>
          </div>
        </div>

        <NuxtLink to="/blog"
          class="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200 border border-transparent hover:border-cyan-500/50 rounded-lg"
          exact-active-class="text-cyan-600 dark:text-cyan-400 border-cyan-500/50 bg-cyan-500/10"
          @click="closeDropdown">
          Блог
        </NuxtLink>

        <NuxtLink to="/about"
          class="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200 border border-transparent hover:border-cyan-500/50 rounded-lg"
          exact-active-class="text-cyan-600 dark:text-cyan-400 border-cyan-500/50 bg-cyan-500/10"
          @click="closeDropdown">
          О проекте
        </NuxtLink>

        <!-- Profile / Auth Section -->
        <div class="flex items-center pl-4 ml-4 border-l-2 border-zinc-200 dark:border-zinc-800 h-8">
          <button @click="themeStore.toggleTheme()"
            class="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center hover:scale-110 transition-transform mr-2">
            <span v-if="themeStore.theme === 'dark'" class="text-sm">☀️</span>
            <span v-else class="text-sm">🌙</span>
          </button>

          <ClientOnly>
            <template #fallback>
              <div class="w-24 h-10 bg-zinc-100 dark:bg-zinc-800 animate-pulse rounded-lg"></div>
            </template>

            <div v-if="auth.loading" class="w-24 h-10 bg-zinc-100 dark:bg-zinc-800 animate-pulse rounded-lg"></div>

            <!-- Logged-in State -->
            <div v-else-if="auth.user" class="relative group">
              <button
                class="flex items-center space-x-3 px-3 py-1 border border-transparent hover:border-cyan-500/50 transition-all bg-zinc-50 dark:bg-zinc-900 rounded-lg">
                <div
                  class="w-8 h-8 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400 font-bold text-xs uppercase">
                  {{ getUserInitials }}
                </div>
                <span class="text-sm font-medium text-zinc-900 dark:text-white max-w-[100px] truncate hidden xl:block">
                  {{ auth.user.displayName || auth.user.email }}
                </span>
                <i
                  class="fas fa-chevron-down text-xs opacity-50 group-hover:rotate-180 transition-transform dark:text-white"></i>
              </button>

              <div
                class="absolute top-full right-0 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div
                  class="bg-white dark:bg-zinc-900 shadow-xl border border-zinc-200 dark:border-zinc-800 rounded-xl min-w-[200px] py-2">
                  <NuxtLink to="/profile"
                    class="flex items-center space-x-3 px-6 py-3 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors"
                    @click="closeDropdown">
                    <i class="fas fa-user-circle text-center w-5"></i>
                    <span>Профиль</span>
                  </NuxtLink>
                  <NuxtLink to="/personal-cabinet"
                    class="flex items-center space-x-3 px-6 py-3 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors"
                    @click="closeDropdown">
                    <i class="fas fa-tachometer-alt text-center w-5"></i>
                    <span>Кабинет</span>
                  </NuxtLink>
                  <div class="h-px bg-zinc-200 dark:bg-zinc-800 mx-4 my-2"></div>
                  <!-- Coach Link -->
                  <NuxtLink v-if="auth.user.isCoach" to="/coach"
                    class="flex items-center space-x-3 px-6 py-3 text-sm font-medium text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/10 transition-colors"
                    @click="closeDropdown">
                    <i class="fas fa-user-tie text-center w-5"></i>
                    <span>Дашборд Коуча</span>
                  </NuxtLink>
                  <div v-if="auth.user.isCoach" class="h-px bg-zinc-200 dark:bg-zinc-800 mx-4 my-2"></div>
                  <button @click="logoutUser"
                    class="w-full flex items-center space-x-3 px-6 py-3 text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors">
                    <i class="fas fa-sign-out-alt text-center w-5"></i>
                    <span>Выйти</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Logged-out State -->
            <div v-else class="flex items-center space-x-4">
              <NuxtLink to="/login"
                class="text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                Войти
              </NuxtLink>
              <NuxtLink to="/register"
                class="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all">
                Начать
              </NuxtLink>
            </div>
          </ClientOnly>
        </div>
      </div>

      <!-- Mobile Controls -->
      <div class="lg:hidden flex items-center space-x-3">
        <button @click="themeStore.toggleTheme()"
          class="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center hover:scale-110 transition-transform">
          <span v-if="themeStore.theme === 'dark'" class="text-sm">☀️</span>
          <span v-else class="text-sm">🌙</span>
        </button>
        <button @click="toggleDropdown"
          class="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center hover:scale-110 transition-transform"
          aria-label="Toggle Menu">
          <i class="fas" :class="isDropdownOpen ? 'fa-times' : 'fa-bars'"></i>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div data-menu="mobile" :class="[
        'lg:hidden absolute top-full left-0 right-0 bg-white dark:bg-black border-t border-zinc-200 dark:border-zinc-800 transition-all duration-300 overflow-y-auto',
        isDropdownOpen
          ? 'translate-y-0 opacity-100 visible max-h-[calc(100vh-64px)] shadow-2xl'
          : '-translate-y-2 opacity-0 invisible max-h-0',
      ]">
        <div class="px-6 py-6 space-y-6">
          <!-- Auth Section Mobile -->
          <div class="pb-6 border-b border-zinc-200 dark:border-zinc-800">
            <ClientOnly>
              <div v-if="auth.user" class="flex items-center space-x-4">
                <div
                  class="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400 font-bold uppercase rounded-lg">
                  {{ getUserInitials }}
                </div>
                <div class="flex-1 min-w-0">
                  <div class="text-zinc-900 dark:text-white font-medium truncate">{{
                    auth.user.displayName ||
                    auth.user.email
                  }}</div>
                  <button @click="logoutUser" class="text-sm text-red-500 font-medium mt-1">Выйти</button>
                </div>
              </div>
              <div v-else class="flex flex-col space-y-3">
                <NuxtLink to="/login"
                  class="w-full py-3 text-center border border-zinc-200 dark:border-zinc-800 font-medium text-sm text-zinc-900 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-lg"
                  @click="closeDropdown">Войти</NuxtLink>
                <NuxtLink to="/register"
                  class="w-full py-3 text-center bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium text-sm hover:shadow-lg transition-all rounded-lg"
                  @click="closeDropdown">Начать</NuxtLink>
              </div>
            </ClientOnly>
          </div>

          <!-- Links Mobile -->
          <div class="space-y-1">
            <h4 class="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-4 px-2">Разделы</h4>

            <NuxtLink to="/space"
              class="flex items-center space-x-4 p-3 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors text-zinc-900 dark:text-white rounded-lg"
              @click="closeDropdown">
              <i class="fas fa-cubes text-zinc-400 w-6 text-center"></i>
              <span class="font-medium text-sm">Центр Развития</span>
            </NuxtLink>

            <div class="pl-10 space-y-1 pt-1 mb-4">
              <NuxtLink v-for="link in [
                { label: 'Тесты', to: '/space/tests', icon: 'fa-brain' },
                { label: 'Тренировка Мозга', to: '/space/brain-training', icon: 'fa-chess' },
                { label: 'Психология', to: '/space/psychology', icon: 'fa-book-open' },
                { label: 'Медитация', to: '/space/mindfulness', icon: 'fa-spa' },
                { label: 'Дашборд', to: '/space/dashboard', icon: 'fa-chart-pie' },
                { label: 'Саморазвитие', to: '/space/growth', icon: 'fa-seedling' },
                { label: 'Голос → Структура', to: '/space/experiments/voice-structure', icon: 'fa-microphone-alt' },
                { label: 'Сообщество', to: '/space/community', icon: 'fa-users' },
                ...(auth.user?.isCoach ? [{ label: 'Дашборд Коуча', to: '/coach', icon: 'fa-user-tie', coach: true }] : [])
              ]" :key="link.to" :to="link.to"
                class="flex items-center space-x-3 p-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-cyan-400"
                :class="{ 'text-cyan-600 dark:text-cyan-400': link.coach }" @click="closeDropdown">
                <i :class="['fas', link.icon, 'w-5 text-center']"></i>
                <span>{{ link.label }}</span>
              </NuxtLink>
            </div>

            <NuxtLink to="/blog"
              class="flex items-center space-x-4 p-3 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors text-zinc-900 dark:text-white rounded-lg"
              @click="closeDropdown">
              <i class="fas fa-book-open text-zinc-400 w-6 text-center"></i>
              <span class="font-medium text-sm">Блог</span>
            </NuxtLink>

            <NuxtLink to="/about"
              class="flex items-center space-x-4 p-3 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors text-zinc-900 dark:text-white rounded-lg"
              @click="closeDropdown">
              <i class="fas fa-info-circle text-zinc-400 w-6 text-center"></i>
              <span class="font-medium text-sm">О проекте</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "~/stores/auth";
import { useThemeStore } from "~/stores/theme";

const auth = useAuthStore();
const themeStore = useThemeStore();
const route = useRoute();
const router = useRouter();

const isDropdownOpen = ref(false);
const mobileSubmenuStates = ref({
  lab: false,
  tools: false,
});

// Computed properties for active route highlighting
const isLabRouteActive = computed(() => {
  const labRoutes = [
    "/space/tests",
    "/space/brain-training",
    "/space/psychology",
    "/space/mindfulness",
    "/space/growth",
    "/space/dashboard",
    "/space/community"
  ];
  return labRoutes.some(path => route.path.startsWith(path));
});

// Get user initials for avatar
const getUserInitials = computed(() => {
  if (!auth.user?.displayName) return "U";
  return auth.user.displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
});

onMounted(() => {
  document.addEventListener("click", handleOutsideClick);
});

onUnmounted(() => {
  document.removeEventListener("click", handleOutsideClick);
});

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const closeDropdown = () => {
  isDropdownOpen.value = false;
};

const handleOutsideClick = (event) => {
  const mobileMenu = document.querySelector('[data-menu="mobile"]');
  const mobileMenuButton = document.querySelector('[aria-label="Toggle Menu"]');
  if (
    mobileMenu &&
    !mobileMenu.contains(event.target) &&
    mobileMenuButton &&
    !mobileMenuButton.contains(event.target)
  ) {
    closeDropdown();
  }
};

const logoutUser = async () => {
  await auth.logout();
  router.push("/login");
  closeDropdown();
};
</script>

<style scoped>
/* Custom indicator for active links */
.router-link-active:not(.group) {
  position: relative;
}
</style>