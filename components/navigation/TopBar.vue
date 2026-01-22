<template>
  <nav
    class="sticky top-0 left-0 right-0 z-50 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 transition-colors duration-500 w-full">

    <!-- Container -->
    <div class="container max-w-7xl px-6 mx-auto flex justify-between items-center h-20 relative z-10">
      <!-- Logo -->
      <NuxtLink to="/" class="group relative flex items-center gap-3" @click="closeDropdown">
        <div class="relative">
          <div
            class="w-10 h-10 bg-stone-900 dark:bg-white flex items-center justify-center overflow-hidden border border-stone-200 dark:border-stone-800 transition-colors">
            <img src="/mindqlab-logo.png" alt="MindQLab Logo" class="relative w-full h-full object-cover" />
          </div>
        </div>
        <span
          class="text-lg font-bold uppercase tracking-widest text-stone-900 dark:text-white transition-colors duration-300">
          MindQLab
        </span>
      </NuxtLink>

      <!-- Desktop Menu -->
      <div class="hidden lg:flex items-center space-x-1">
        <!-- Центр Развития Dropdown -->
        <div class="relative group">
          <NuxtLink to="/space"
            class="flex items-center space-x-2 px-4 py-2 text-xs font-bold uppercase tracking-widest text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white transition-all duration-200 border border-transparent hover:border-stone-200 dark:hover:border-stone-800"
            :class="{ 'text-stone-900 dark:text-white border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800': isLabRouteActive }"
            @click="closeDropdown">
            <i class="fas fa-cubes"></i>
            <span>Центр Развития</span>
            <i class="fas fa-chevron-down text-[10px] opacity-50 group-hover:rotate-180 transition-transform"></i>
          </NuxtLink>
          <div
            class="absolute top-full left-0 mt-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
            <div
              class="bg-white dark:bg-stone-900 shadow-xl border border-stone-200 dark:border-stone-800 min-w-[240px] py-2">
              <NuxtLink to="/space/tests"
                class="flex items-center space-x-3 px-6 py-3 text-xs font-bold uppercase tracking-wider text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
                exact-active-class="text-stone-900 dark:text-white bg-stone-50 dark:bg-stone-800"
                @click="closeDropdown">
                <i class="fas fa-brain w-5 text-center"></i>
                <span>Тесты</span>
              </NuxtLink>
              <NuxtLink to="/space/brain-training"
                class="flex items-center space-x-3 px-6 py-3 text-xs font-bold uppercase tracking-wider text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
                exact-active-class="text-stone-900 dark:text-white bg-stone-50 dark:bg-stone-800"
                @click="closeDropdown">
                <i class="fas fa-chess w-5 text-center"></i>
                <span>Тренировка Мозга</span>
              </NuxtLink>
              <NuxtLink to="/space/psychology"
                class="flex items-center space-x-3 px-6 py-3 text-xs font-bold uppercase tracking-wider text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
                exact-active-class="text-stone-900 dark:text-white bg-stone-50 dark:bg-stone-800"
                @click="closeDropdown">
                <i class="fas fa-book-open w-5 text-center"></i>
                <span>Психология</span>
              </NuxtLink>
              <NuxtLink to="/space/mindfulness"
                class="flex items-center space-x-3 px-6 py-3 text-xs font-bold uppercase tracking-wider text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
                exact-active-class="text-stone-900 dark:text-white bg-stone-50 dark:bg-stone-800"
                @click="closeDropdown">
                <i class="fas fa-spa w-5 text-center"></i>
                <span>Медитация</span>
              </NuxtLink>
              <div class="h-px bg-stone-100 dark:bg-stone-800 mx-4 my-2"></div>
              <NuxtLink to="/space/dashboard"
                class="flex items-center space-x-3 px-6 py-3 text-xs font-bold uppercase tracking-wider text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
                exact-active-class="text-stone-900 dark:text-white bg-stone-50 dark:bg-stone-800"
                @click="closeDropdown">
                <i class="fas fa-chart-pie w-5 text-center"></i>
                <span>Дашборд</span>
              </NuxtLink>
              <NuxtLink to="/space/growth"
                class="flex items-center space-x-3 px-6 py-3 text-xs font-bold uppercase tracking-wider text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
                exact-active-class="text-stone-900 dark:text-white bg-stone-50 dark:bg-stone-800"
                @click="closeDropdown">
                <i class="fas fa-seedling w-5 text-center"></i>
                <span>Саморазвитие</span>
              </NuxtLink>
              <NuxtLink to="/space/experiments/voice-structure"
                class="flex items-center space-x-3 px-6 py-3 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/10 transition-colors"
                exact-active-class="bg-amber-50 dark:bg-amber-900/20" @click="closeDropdown">
                <i class="fas fa-microphone-alt w-5 text-center"></i>
                <span>Голос &rarr; Структура</span>
              </NuxtLink>
              <NuxtLink to="/space/community"
                class="flex items-center space-x-3 px-6 py-3 text-xs font-bold uppercase tracking-wider text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
                exact-active-class="text-stone-900 dark:text-white bg-stone-50 dark:bg-stone-800"
                @click="closeDropdown">
                <i class="fas fa-users w-5 text-center"></i>
                <span>Сообщество</span>
              </NuxtLink>
            </div>
          </div>
        </div>

        <NuxtLink to="/blog"
          class="px-4 py-2 text-xs font-bold uppercase tracking-widest text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white transition-all duration-200 border border-transparent hover:border-stone-200 dark:hover:border-stone-800"
          exact-active-class="text-stone-900 dark:text-white border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800"
          @click="closeDropdown">
          Блог
        </NuxtLink>

        <NuxtLink to="/about"
          class="px-4 py-2 text-xs font-bold uppercase tracking-widest text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white transition-all duration-200 border border-transparent hover:border-stone-200 dark:hover:border-stone-800"
          exact-active-class="text-stone-900 dark:text-white border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800"
          @click="closeDropdown">
          О проекте
        </NuxtLink>

        <!-- Profile / Auth Section -->
        <div class="flex items-center pl-4 ml-4 border-l-2 border-stone-200 dark:border-stone-800 h-8">
          <button @click="themeStore.toggleTheme()"
            class="w-10 h-10 flex items-center justify-center text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors mr-2">
            <i class="fas" :class="themeStore.theme === 'dark' ? 'fa-moon' : 'fa-sun'"></i>
          </button>

          <ClientOnly>
            <template #fallback>
              <div class="w-24 h-10 bg-stone-100 dark:bg-stone-800 animate-pulse"></div>
            </template>

            <div v-if="auth.loading" class="w-24 h-10 bg-stone-100 dark:bg-stone-800 animate-pulse"></div>

            <!-- Logged-in State -->
            <div v-else-if="auth.user" class="relative group">
              <button
                class="flex items-center space-x-3 px-3 py-1 border border-transparent hover:border-stone-200 dark:hover:border-stone-700 transition-all bg-stone-50 dark:bg-stone-900">
                <div
                  class="w-8 h-8 bg-stone-200 dark:bg-stone-800 flex items-center justify-center text-stone-600 dark:text-stone-300 font-bold text-xs uppercase">
                  {{ getUserInitials }}
                </div>
                <span
                  class="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-white max-w-[100px] truncate hidden xl:block">
                  {{ auth.user.displayName || auth.user.email }}
                </span>
                <i
                  class="fas fa-chevron-down text-[10px] opacity-50 group-hover:rotate-180 transition-transform dark:text-white"></i>
              </button>

              <div
                class="absolute top-full right-0 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div
                  class="bg-white dark:bg-stone-900 shadow-xl border border-stone-200 dark:border-stone-800 min-w-[200px] py-2">
                  <NuxtLink to="/profile"
                    class="flex items-center space-x-3 px-6 py-3 text-xs font-bold uppercase tracking-wider text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
                    @click="closeDropdown">
                    <i class="fas fa-user-circle text-center w-5"></i>
                    <span>Профиль</span>
                  </NuxtLink>
                  <NuxtLink to="/personal-cabinet"
                    class="flex items-center space-x-3 px-6 py-3 text-xs font-bold uppercase tracking-wider text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
                    @click="closeDropdown">
                    <i class="fas fa-tachometer-alt text-center w-5"></i>
                    <span>Кабинет</span>
                  </NuxtLink>
                  <div class="h-px bg-stone-100 dark:bg-stone-800 mx-4 my-2"></div>
                  <!-- Coach Link -->
                  <NuxtLink v-if="auth.user.isCoach" to="/coach"
                    class="flex items-center space-x-3 px-6 py-3 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/10 transition-colors"
                    @click="closeDropdown">
                    <i class="fas fa-user-tie text-center w-5"></i>
                    <span>Дашборд Коуча</span>
                  </NuxtLink>
                  <div v-if="auth.user.isCoach" class="h-px bg-stone-100 dark:bg-stone-800 mx-4 my-2"></div>
                  <button @click="logoutUser"
                    class="w-full flex items-center space-x-3 px-6 py-3 text-xs font-bold uppercase tracking-wider text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                    <i class="fas fa-sign-out-alt text-center w-5"></i>
                    <span>Выйти</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Logged-out State -->
            <div v-else class="flex items-center space-x-4">
              <NuxtLink to="/login"
                class="text-xs font-bold uppercase tracking-widest text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white transition-colors">
                Войти
              </NuxtLink>
              <NuxtLink to="/register"
                class="px-6 py-2 bg-stone-900 dark:bg-white text-white dark:text-stone-900 hover:bg-stone-700 dark:hover:bg-stone-200 transition-colors text-xs font-bold uppercase tracking-widest">
                Начать
              </NuxtLink>
            </div>
          </ClientOnly>
        </div>
      </div>

      <!-- Mobile Controls -->
      <div class="lg:hidden flex items-center space-x-4">
        <button @click="themeStore.toggleTheme()"
          class="w-10 h-10 flex items-center justify-center text-stone-500 hover:text-stone-900 dark:hover:text-white transition-colors">
          <i class="fas" :class="themeStore.theme === 'dark' ? 'fa-moon' : 'fa-sun'"></i>
        </button>
        <button @click="toggleDropdown"
          class="w-10 h-10 flex items-center justify-center text-stone-900 dark:text-white hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          aria-label="Toggle Menu">
          <i class="fas" :class="isDropdownOpen ? 'fa-times' : 'fa-bars'"></i>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div data-menu="mobile" :class="[
        'lg:hidden absolute top-full left-0 right-0 bg-white dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800 transition-all duration-300 overflow-y-auto',
        isDropdownOpen
          ? 'translate-y-0 opacity-100 visible max-h-[calc(100vh-80px)] shadow-2xl'
          : '-translate-y-2 opacity-0 invisible max-h-0',
      ]">
        <div class="px-6 py-8 space-y-6">
          <!-- Auth Section Mobile -->
          <div class="pb-6 border-b border-stone-200 dark:border-stone-800">
            <ClientOnly>
              <div v-if="auth.user" class="flex items-center space-x-4">
                <div
                  class="w-12 h-12 bg-stone-200 dark:bg-stone-800 flex items-center justify-center text-stone-900 dark:text-white font-bold uppercase">
                  {{ getUserInitials }}
                </div>
                <div class="flex-1 min-w-0">
                  <div class="text-stone-900 dark:text-white font-bold uppercase tracking-wide truncate">{{
                    auth.user.displayName ||
                    auth.user.email
                  }}</div>
                  <button @click="logoutUser"
                    class="text-xs uppercase tracking-wider text-red-500 font-bold mt-1">Выйти</button>
                </div>
              </div>
              <div v-else class="flex flex-col space-y-3">
                <NuxtLink to="/login"
                  class="w-full py-3 text-center border border-stone-300 dark:border-stone-700 font-bold uppercase tracking-widest text-xs text-stone-900 dark:text-white hover:bg-stone-50 dark:hover:bg-stone-900"
                  @click="closeDropdown">Войти</NuxtLink>
                <NuxtLink to="/register"
                  class="w-full py-3 text-center bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-bold uppercase tracking-widest text-xs hover:bg-stone-800 dark:hover:bg-stone-200"
                  @click="closeDropdown">Начать</NuxtLink>
              </div>
            </ClientOnly>
          </div>

          <!-- Links Mobile -->
          <div class="space-y-1">
            <h4 class="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4 px-2">Разделы</h4>

            <NuxtLink to="/space"
              class="flex items-center space-x-4 p-3 hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors text-stone-900 dark:text-white"
              @click="closeDropdown">
              <i class="fas fa-cubes text-stone-400 w-6 text-center"></i>
              <span class="font-bold uppercase tracking-wider text-xs">Центр Развития</span>
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
                class="flex items-center space-x-3 p-2 text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white"
                :class="{ 'text-indigo-600 dark:text-indigo-400': link.coach }" @click="closeDropdown">
                <i :class="['fas', link.icon, 'w-5 text-center']"></i>
                <span>{{ link.label }}</span>
              </NuxtLink>
            </div>

            <NuxtLink to="/blog"
              class="flex items-center space-x-4 p-3 hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors text-stone-900 dark:text-white"
              @click="closeDropdown">
              <i class="fas fa-book-open text-stone-400 w-6 text-center"></i>
              <span class="font-bold uppercase tracking-wider text-xs">Блог</span>
            </NuxtLink>

            <NuxtLink to="/about"
              class="flex items-center space-x-4 p-3 hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors text-stone-900 dark:text-white"
              @click="closeDropdown">
              <i class="fas fa-info-circle text-stone-400 w-6 text-center"></i>
              <span class="font-bold uppercase tracking-wider text-xs">О проекте</span>
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
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spin-slow 3s linear infinite;
}

/* Custom indicator for active links similar to footer if needed */
.router-link-active:not(.group) {
  position: relative;
}
</style>
