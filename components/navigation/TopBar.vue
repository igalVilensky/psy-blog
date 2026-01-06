<template>
  <nav
    class="sticky top-0 left-0 right-0 z-50 bg-mindqlab-calm-bg/80 dark:bg-mindqlab-calm-dark-bg/80 backdrop-blur-md border-b border-stone-100 dark:border-stone-800/50 transition-colors duration-500 w-full">

    <!-- Container -->
    <div class="container max-w-6xl px-6 mx-auto flex justify-between items-center h-20 relative z-10">
      <!-- Logo -->
      <NuxtLink to="/" class="group relative flex items-center space-x-3" @click="closeDropdown">
        <div class="relative">
          <div
            class="w-10 h-10 rounded-xl bg-white dark:bg-stone-900 flex items-center justify-center overflow-hidden border border-stone-200 dark:border-stone-800 transition-colors group-hover:border-mindqlab-calm-accent/50">
            <img src="/mindqlab-logo.png" alt="MindQLab Logo"
              class="relative w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
          </div>
          <div
            class="absolute -inset-1 bg-mindqlab-calm-accent/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          </div>
        </div>
        <span
          class="text-xl font-light text-stone-900 dark:text-white font-montserrat tracking-tight group-hover:text-mindqlab-calm-accent transition-colors duration-300">
          <span class="font-medium">MindQLab</span>
        </span>
      </NuxtLink>

      <!-- Desktop Menu -->
      <div class="hidden lg:flex items-center space-x-2">
        <!-- Центр Развития Dropdown -->
        <div class="relative group">
          <NuxtLink to="/space"
            class="flex items-center space-x-2 px-4 py-2 rounded-full text-[15px] font-medium text-stone-600 dark:text-stone-300 hover:text-mindqlab-calm-accent hover:bg-stone-100 dark:hover:bg-stone-800 transition-all duration-200"
            :class="{ 'bg-stone-100 dark:bg-stone-800 text-mindqlab-calm-accent': isLabRouteActive }"
            @click="closeDropdown">
            <i class="fas fa-cubes"></i>
            <span>Центр Развития</span>
            <i class="fas fa-chevron-down text-[10px] opacity-50 group-hover:rotate-180 transition-transform"></i>
          </NuxtLink>
          <div
            class="absolute top-full left-0 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
            <div
              class="bg-white dark:bg-stone-900 rounded-2xl shadow-xl border border-stone-100 dark:border-stone-800 min-w-[240px] py-2 overflow-hidden">
              <NuxtLink to="/space/tests"
                class="flex items-center space-x-3 px-4 py-3 text-[15px] text-stone-600 dark:text-stone-300 hover:text-mindqlab-calm-accent hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
                exact-active-class="text-mindqlab-calm-accent bg-stone-50 dark:bg-stone-800/50 font-semibold"
                @click="closeDropdown">
                <i class="fas fa-brain w-5 text-center text-mindqlab-calm-accent/70"></i>
                <span>Тесты</span>
              </NuxtLink>
              <NuxtLink to="/space/brain-training"
                class="flex items-center space-x-3 px-4 py-3 text-[15px] text-stone-600 dark:text-stone-300 hover:text-mindqlab-calm-accent hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
                exact-active-class="text-mindqlab-calm-accent bg-stone-50 dark:bg-stone-800/50 font-semibold"
                @click="closeDropdown">
                <i class="fas fa-chess w-5 text-center text-mindqlab-calm-accent/70"></i>
                <span>Тренировка Мозга</span>
              </NuxtLink>
              <NuxtLink to="/space/psychology"
                class="flex items-center space-x-3 px-4 py-3 text-[15px] text-stone-600 dark:text-stone-300 hover:text-mindqlab-calm-accent hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
                exact-active-class="text-mindqlab-calm-accent bg-stone-50 dark:bg-stone-800/50 font-semibold"
                @click="closeDropdown">
                <i class="fas fa-book-open w-5 text-center text-mindqlab-calm-accent/70"></i>
                <span>Психология</span>
              </NuxtLink>
              <NuxtLink to="/space/mindfulness"
                class="flex items-center space-x-3 px-4 py-3 text-[15px] text-stone-600 dark:text-stone-300 hover:text-mindqlab-calm-accent hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
                exact-active-class="text-mindqlab-calm-accent bg-stone-50 dark:bg-stone-800/50 font-semibold"
                @click="closeDropdown">
                <i class="fas fa-spa w-5 text-center text-mindqlab-calm-accent/70"></i>
                <span>Медитация</span>
              </NuxtLink>
              <div class="h-px bg-stone-100 dark:bg-stone-800 mx-4 my-2"></div>
              <NuxtLink to="/space/dashboard"
                class="flex items-center space-x-3 px-4 py-3 text-[15px] text-stone-600 dark:text-stone-300 hover:text-mindqlab-calm-accent hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
                exact-active-class="text-mindqlab-calm-accent bg-stone-50 dark:bg-stone-800/50 font-semibold"
                @click="closeDropdown">
                <i class="fas fa-chart-pie w-5 text-center text-mindqlab-calm-accent/70"></i>
                <span>Дашборд</span>
              </NuxtLink>
              <NuxtLink to="/space/growth"
                class="flex items-center space-x-3 px-4 py-3 text-[15px] text-stone-600 dark:text-stone-300 hover:text-mindqlab-calm-accent hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
                exact-active-class="text-mindqlab-calm-accent bg-stone-50 dark:bg-stone-800/50 font-semibold"
                @click="closeDropdown">
                <i class="fas fa-seedling w-5 text-center text-mindqlab-calm-accent/70"></i>
                <span>Саморазвитие</span>
              </NuxtLink>
              <NuxtLink to="/space/community"
                class="flex items-center space-x-3 px-4 py-3 text-[15px] text-stone-600 dark:text-stone-300 hover:text-mindqlab-calm-accent hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
                exact-active-class="text-mindqlab-calm-accent bg-stone-50 dark:bg-stone-800/50 font-semibold"
                @click="closeDropdown">
                <i class="fas fa-users w-5 text-center text-mindqlab-calm-accent/70"></i>
                <span>Сообщество</span>
              </NuxtLink>
            </div>
          </div>
        </div>

        <NuxtLink to="/blog"
          class="px-4 py-2 rounded-full text-[15px] font-medium text-stone-600 dark:text-stone-300 hover:text-mindqlab-calm-accent hover:bg-stone-100 dark:hover:bg-stone-800 transition-all duration-200"
          exact-active-class="text-mindqlab-calm-accent bg-stone-100 dark:bg-stone-800" @click="closeDropdown">
          Блог
        </NuxtLink>

        <NuxtLink to="/about"
          class="px-4 py-2 rounded-full text-[15px] font-medium text-stone-600 dark:text-stone-300 hover:text-mindqlab-calm-accent hover:bg-stone-100 dark:hover:bg-stone-800 transition-all duration-200"
          exact-active-class="text-mindqlab-calm-accent bg-stone-100 dark:bg-stone-800" @click="closeDropdown">
          О проекте
        </NuxtLink>

        <!-- Profile / Auth Section -->
        <div class="flex items-center pl-4 ml-4 border-l border-stone-200 dark:border-stone-800">
          <button @click="themeStore.toggleTheme()"
            class="w-10 h-10 rounded-full flex items-center justify-center text-stone-500 hover:text-mindqlab-calm-accent transition-colors mr-2">
            <i class="fas" :class="themeStore.theme === 'dark' ? 'fa-moon' : 'fa-sun'"></i>
          </button>

          <ClientOnly>
            <template #fallback>
              <div class="w-24 h-10 bg-stone-100 dark:bg-stone-800 rounded-full animate-pulse"></div>
            </template>

            <div v-if="auth.loading" class="w-24 h-10 bg-stone-100 dark:bg-stone-800 rounded-full animate-pulse"></div>

            <!-- Logged-in State -->
            <div v-else-if="auth.user" class="relative group">
              <button
                class="flex items-center space-x-2 pl-1 pr-3 py-1 rounded-full border border-stone-200 dark:border-stone-800 hover:border-mindqlab-calm-accent/50 transition-all">
                <div
                  class="w-8 h-8 rounded-full bg-gradient-to-br from-mindqlab-calm-accent to-mindqlab-calm-accent-secondary flex items-center justify-center text-white font-semibold text-xs">
                  {{ getUserInitials }}
                </div>
                <span class="text-sm text-stone-700 dark:text-stone-200 font-medium max-w-[100px] truncate">
                  {{ auth.user.displayName || auth.user.email }}
                </span>
                <i class="fas fa-chevron-down text-[10px] opacity-50 group-hover:rotate-180 transition-transform"></i>
              </button>

              <div
                class="absolute top-full right-0 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div
                  class="bg-white dark:bg-stone-900 rounded-2xl shadow-xl border border-stone-100 dark:border-stone-800 min-w-[200px] py-2 overflow-hidden">
                  <NuxtLink to="/profile"
                    class="flex items-center space-x-3 px-4 py-3 text-sm text-stone-600 dark:text-stone-300 hover:text-mindqlab-calm-accent hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
                    @click="closeDropdown">
                    <i class="fas fa-user-circle text-center w-5"></i>
                    <span>Профиль</span>
                  </NuxtLink>
                  <NuxtLink to="/personal-cabinet"
                    class="flex items-center space-x-3 px-4 py-3 text-sm text-stone-600 dark:text-stone-300 hover:text-mindqlab-calm-accent hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
                    @click="closeDropdown">
                    <i class="fas fa-tachometer-alt text-center w-5"></i>
                    <span>Кабинет</span>
                  </NuxtLink>
                  <div class="h-px bg-stone-100 dark:bg-stone-800 mx-4 my-2"></div>
                  <button @click="logoutUser"
                    class="w-full flex items-center space-x-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
                    <i class="fas fa-sign-out-alt text-center w-5"></i>
                    <span class="font-medium">Выйти</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Logged-out State -->
            <div v-else class="flex items-center space-x-3">
              <NuxtLink to="/login"
                class="text-sm font-medium text-stone-600 dark:text-stone-300 hover:text-mindqlab-calm-accent transition-colors">
                Войти
              </NuxtLink>
              <NuxtLink to="/register"
                class="px-5 py-2 rounded-full bg-mindqlab-calm-accent text-white hover:bg-opacity-90 transition-all text-sm font-medium shadow-sm hover:shadow-mindqlab-calm-accent/20">
                Начать
              </NuxtLink>
            </div>
          </ClientOnly>
        </div>
      </div>

      <!-- Mobile Controls -->
      <div class="lg:hidden flex items-center space-x-4">
        <button @click="themeStore.toggleTheme()"
          class="w-10 h-10 rounded-full flex items-center justify-center text-stone-500 hover:text-mindqlab-calm-accent transition-colors">
          <i class="fas" :class="themeStore.theme === 'dark' ? 'fa-moon' : 'fa-sun'"></i>
        </button>
        <button @click="toggleDropdown"
          class="w-10 h-10 rounded-full flex items-center justify-center text-stone-500 hover:text-mindqlab-calm-accent transition-colors"
          aria-label="Toggle Menu">
          <i class="fas" :class="isDropdownOpen ? 'fa-times' : 'fa-bars'"></i>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div data-menu="mobile" :class="[
        'lg:hidden absolute top-full left-0 right-0 bg-mindqlab-calm-bg dark:bg-mindqlab-calm-dark-bg border-t border-stone-100 dark:border-stone-800 transition-all duration-300 overflow-y-auto',
        isDropdownOpen
          ? 'translate-y-0 opacity-100 visible max-h-[calc(100vh-80px)] shadow-2xl'
          : '-translate-y-2 opacity-0 invisible max-h-0',
      ]">
        <div class="px-6 py-8 space-y-6">
          <!-- Auth Section Mobile -->
          <div class="pb-6 border-b border-stone-100 dark:border-stone-800">
            <ClientOnly>
              <div v-if="auth.user" class="flex items-center space-x-4">
                <div
                  class="w-12 h-12 rounded-full bg-gradient-to-br from-mindqlab-calm-accent to-mindqlab-calm-accent-secondary flex items-center justify-center text-white font-bold">
                  {{ getUserInitials }}
                </div>
                <div class="flex-1 min-w-0">
                  <div class="text-stone-900 dark:text-stone-100 font-medium truncate">{{ auth.user.displayName ||
                    auth.user.email
                  }}</div>
                  <button @click="logoutUser" class="text-xs text-red-500 font-medium">Выйти</button>
                </div>
              </div>
              <div v-else class="flex flex-col space-y-3">
                <NuxtLink to="/login"
                  class="w-full py-3 text-center rounded-xl border border-stone-200 dark:border-stone-800 font-medium text-stone-700 dark:text-stone-200"
                  @click="closeDropdown">Войти</NuxtLink>
                <NuxtLink to="/register"
                  class="w-full py-3 text-center rounded-xl bg-mindqlab-calm-accent text-white font-medium"
                  @click="closeDropdown">Начать</NuxtLink>
              </div>
            </ClientOnly>
          </div>

          <!-- Links Mobile -->
          <div class="space-y-1">
            <h4 class="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4 px-2">Разделы</h4>

            <NuxtLink to="/space"
              class="flex items-center space-x-4 p-3 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors text-stone-700 dark:text-stone-200"
              @click="closeDropdown">
              <i class="fas fa-cubes text-mindqlab-calm-accent w-6 text-center"></i>
              <span class="font-medium">Центр Развития</span>
            </NuxtLink>

            <div class="pl-10 space-y-1 pt-1 mb-4 opacity-80">
              <NuxtLink v-for="link in [
                { label: 'Тесты', to: '/space/tests', icon: 'fa-brain' },
                { label: 'Тренировка Мозга', to: '/space/brain-training', icon: 'fa-chess' },
                { label: 'Психология', to: '/space/psychology', icon: 'fa-book-open' },
                { label: 'Медитация', to: '/space/mindfulness', icon: 'fa-spa' },
                { label: 'Дашборд', to: '/space/dashboard', icon: 'fa-chart-pie' },
                { label: 'Саморазвитие', to: '/space/growth', icon: 'fa-seedling' },
                { label: 'Сообщество', to: '/space/community', icon: 'fa-users' }
              ]" :key="link.to" :to="link.to"
                class="flex items-center space-x-3 p-2 text-sm text-stone-600 dark:text-stone-300"
                @click="closeDropdown">
                <i :class="['fas', link.icon, 'w-5 text-center text-mindqlab-calm-accent']"></i>
                <span>{{ link.label }}</span>
              </NuxtLink>
            </div>

            <NuxtLink to="/blog"
              class="flex items-center space-x-4 p-3 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors text-stone-700 dark:text-stone-200"
              @click="closeDropdown">
              <i class="fas fa-book-open text-mindqlab-calm-accent w-6 text-center"></i>
              <span class="font-medium">Блог</span>
            </NuxtLink>

            <NuxtLink to="/about"
              class="flex items-center space-x-4 p-3 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors text-stone-700 dark:text-stone-200"
              @click="closeDropdown">
              <i class="fas fa-info-circle text-mindqlab-calm-accent w-6 text-center"></i>
              <span class="font-medium">О проекте</span>
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
