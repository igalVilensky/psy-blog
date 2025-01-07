<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#0F172A] via-[#1E1B4B] to-[#0F172A] shadow-[0_2px_20px_rgba(123,97,255,0.15)]"
  >
    <!-- Animated background overlay -->
    <div class="absolute inset-0 opacity-20">
      <div
        class="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-purple-500/10 animate-gradient-x"
      ></div>
    </div>

    <div
      class="container max-w-6xl w-full mx-auto flex justify-between items-center p-4 relative z-10"
    >
      <!-- Brand/Logo -->
      <NuxtLink to="/" class="group relative" @click="closeDropdown">
        <span
          class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-300 to-cyan-400 group-hover:from-cyan-400 group-hover:via-fuchsia-300 group-hover:to-purple-400 transition-all duration-500"
        >
          Anastasia
        </span>
        <span
          class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 group-hover:w-full transition-all duration-500"
        ></span>
      </NuxtLink>

      <!-- Desktop Menu -->
      <div class="hidden lg:flex items-center space-x-8">
        <ul class="flex items-center space-x-8">
          <li class="relative group">
            <div class="flex items-center space-x-1 cursor-pointer">
              <span
                class="text-slate-300 font-medium group-hover:text-white transition-colors duration-300"
                >Курсы</span
              >
              <i
                class="fas fa-chevron-down text-xs text-slate-400 group-hover:text-white transition-all duration-300 group-hover:-rotate-180"
              ></i>
            </div>
            <!-- Glowing border effect on hover -->
            <span
              class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 group-hover:w-full transition-all duration-300"
            ></span>
            <DesktopSubmenu />
          </li>

          <li class="relative group">
            <NuxtLink
              to="/awareness-tools"
              class="flex items-center space-x-1"
              exact-active-class="active-link"
            >
              <span
                class="text-slate-300 font-medium group-hover:text-white transition-colors duration-300"
                >Инструменты осознанности</span
              >
              <i
                class="fas fa-chevron-down text-xs text-slate-400 group-hover:text-white transition-all duration-300 group-hover:-rotate-180"
              ></i>
            </NuxtLink>
            <span
              class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 group-hover:w-full transition-all duration-300"
            ></span>
            <AwarenessToolsDesktopSubmenu />
          </li>

          <li class="relative group">
            <NuxtLink
              to="/blog"
              class="text-slate-300 font-medium group-hover:text-white transition-colors duration-300"
              exact-active-class="active-link"
            >
              Блог
            </NuxtLink>
            <span
              class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 group-hover:w-full transition-all duration-300"
            ></span>
          </li>

          <li class="relative group">
            <NuxtLink
              to="/about"
              class="text-slate-300 font-medium group-hover:text-white transition-colors duration-300"
              exact-active-class="active-link"
            >
              О проекте
            </NuxtLink>
            <span
              class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 group-hover:w-full transition-all duration-300"
            ></span>
          </li>

          <li class="relative group">
            <NuxtLink
              to="/contact"
              class="text-slate-300 font-medium group-hover:text-white transition-colors duration-300"
              exact-active-class="active-link"
            >
              Связь
            </NuxtLink>
            <span
              class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 group-hover:w-full transition-all duration-300"
            ></span>
          </li>
        </ul>

        <!-- Auth Section -->
        <div class="flex items-center space-x-4">
          <template v-if="currentUser">
            <div class="relative group">
              <NuxtLink
                to="/profile"
                :class="[
                  'flex cursor-pointer items-center space-x-2 bg-opacity-20 bg-white/5 rounded-full px-4 py-2 hover:bg-white/10 transition-all duration-300 text-slate-300',
                  $route.path.startsWith('/profile') ? 'active-link' : '',
                ]"
              >
                <span class="font-medium">{{ currentUser.displayName }}</span>
                <i
                  class="fas fa-chevron-down text-xs text-slate-400 group-hover:rotate-180 transition-transform duration-300"
                ></i>
              </NuxtLink>

              <!-- User Dropdown -->
              <div
                class="absolute right-0 mt-4 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50"
              >
                <div
                  class="bg-gradient-to-b from-[#1E1B4B] to-[#0F172A] rounded-b-lg shadow-[0_4px_20px_rgba(123,97,255,0.2)] backdrop-blur-sm border border-white/10"
                >
                  <NuxtLink
                    to="/profile"
                    :class="[
                      'block px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors duration-300 first:rounded-t-lg',
                      $route.path.startsWith('/profile') ? 'active-link' : '',
                    ]"
                  >
                    Профиль
                  </NuxtLink>
                  <button
                    @click="handleLogout"
                    class="w-full text-left px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors duration-300 last:rounded-b-lg"
                  >
                    Выйти
                  </button>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <NuxtLink
              to="/login"
              class="text-slate-300 font-medium hover:text-white transition-colors duration-300"
            >
              Войти
            </NuxtLink>
            <NuxtLink
              to="/register"
              class="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-medium transition-all duration-300 ease-out rounded-full group"
            >
              <span
                class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-500 group-hover:translate-x-0 ease"
              >
                <i class="fas fa-arrow-right"></i>
              </span>
              <span
                class="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform bg-gradient-to-r from-purple-500 to-cyan-500 group-hover:translate-x-full ease"
                >Регистрация</span
              >
              <span class="relative invisible">Регистрация</span>
            </NuxtLink>
          </template>
        </div>
      </div>

      <!-- Mobile Menu Button -->
      <button
        @click="toggleDropdown"
        class="lg:hidden relative w-10 h-10 focus:outline-none bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-300"
        aria-label="Toggle Menu"
      >
        <span
          class="absolute w-5 h-0.5 bg-slate-300 transform transition duration-300 ease-in-out -translate-x-1/2 -translate-y-1/2"
          :class="[
            isDropdownOpen
              ? 'rotate-45 translate-y-0 left-1/2 top-1/2'
              : 'left-1/2 top-[40%]',
          ]"
        ></span>
        <span
          class="absolute w-5 h-0.5 bg-slate-300 transform transition duration-300 ease-in-out -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
          :class="[isDropdownOpen ? 'opacity-0' : 'opacity-100']"
        ></span>
        <span
          class="absolute w-5 h-0.5 bg-slate-300 transform transition duration-300 ease-in-out -translate-x-1/2 -translate-y-1/2"
          :class="[
            isDropdownOpen
              ? '-rotate-45 translate-y-0 left-1/2 top-1/2'
              : 'left-1/2 top-[60%]',
          ]"
        ></span>
      </button>

      <!-- Mobile Menu -->
      <div
        data-menu="mobile"
        :class="[
          'lg:hidden absolute top-full left-0 right-0 bg-gradient-to-b from-[#1E1B4B] to-[#0F172A] border-t border-white/10 transform transition-all duration-300 shadow-[0_10px_20px_rgba(0,0,0,0.3)] backdrop-blur-sm',
          isDropdownOpen
            ? 'translate-y-0 opacity-100 visible'
            : '-translate-y-4 opacity-0 invisible',
        ]"
      >
        <div class="p-4 space-y-2">
          <!-- Mobile Navigation Items -->
          <div class="space-y-2">
            <!-- Courses Dropdown -->
            <div class="relative">
              <button
                @click="toggleSubmenu('courses')"
                class="w-full flex items-center justify-between p-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300"
              >
                <span class="font-medium">Курсы</span>
                <i
                  class="fas fa-chevron-down text-xs transition-transform duration-300"
                  :class="
                    openSubmenu === 'courses' || isCoursesRouteActive
                      ? 'rotate-180'
                      : ''
                  "
                ></i>
              </button>

              <MobileSubmenu
                :isOpen="openSubmenu === 'courses' || isCoursesRouteActive"
                :closeDropdown="closeDropdown"
                class="p-2"
              />
            </div>

            <!-- Awareness Tools Dropdown -->
            <div class="relative">
              <button
                @click="toggleSubmenu('awareness-tools')"
                class="w-full flex items-center justify-between p-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300"
              >
                <span class="font-medium">Инструменты осознанности</span>
                <i
                  class="fas fa-chevron-down text-xs transition-transform duration-300"
                  :class="
                    openSubmenu === 'awareness-tools' ||
                    isAwarenessToolsRouteActive
                      ? 'rotate-180'
                      : ''
                  "
                ></i>
              </button>

              <AwarenessToolsMobileSubmenu
                :isOpen="
                  openSubmenu === 'awareness-tools' ||
                  isAwarenessToolsRouteActive
                "
                :closeDropdown="closeDropdown"
                class="p-2"
              />
            </div>

            <!-- Regular Menu Items -->
            <NuxtLink
              to="/blog"
              class="block p-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300"
              @click="closeDropdown"
              exact-active-class="active-link"
            >
              <span class="font-medium">Блог</span>
            </NuxtLink>

            <NuxtLink
              to="/about"
              class="block p-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300"
              @click="closeDropdown"
              exact-active-class="active-link"
            >
              <span class="font-medium">О проекте</span>
            </NuxtLink>

            <NuxtLink
              to="/contact"
              class="block p-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300"
              @click="closeDropdown"
              exact-active-class="active-link"
            >
              <span class="font-medium">Связь</span>
            </NuxtLink>
          </div>

          <!-- Mobile Auth Section -->
          <div class="pt-4 border-t border-white/10">
            <template v-if="currentUser">
              <!-- User Info -->
              <div class="px-3 py-2 mb-2">
                <span class="text-sm text-slate-400">Вы вошли как</span>
                <div class="text-slate-200 font-medium">
                  {{ currentUser.displayName || currentUser.email }}
                </div>
              </div>

              <!-- User Actions -->
              <div class="space-y-2">
                <NuxtLink
                  to="/profile"
                  :class="[
                    'block p-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300',
                    $route.path.startsWith('/profile') ? 'active-link' : '',
                  ]"
                  @click="closeDropdown"
                >
                  <span class="font-medium">Профиль</span>
                </NuxtLink>

                <button
                  @click="handleLogout"
                  class="w-full p-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300 text-left"
                >
                  <span class="font-medium">Выйти</span>
                </button>
              </div>
            </template>

            <template v-else>
              <div class="space-y-3">
                <NuxtLink
                  to="/login"
                  class="block w-full p-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300 text-center font-medium"
                  @click="closeDropdown"
                  exact-active-class="active-link"
                >
                  Войти
                </NuxtLink>

                <NuxtLink
                  to="/register"
                  class="block w-full p-3 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white transition-all duration-300 text-center font-medium"
                  @click="closeDropdown"
                  exact-active-class="active-link"
                >
                  Регистрация
                </NuxtLink>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useNuxtApp } from "#app";
import { signOut } from "firebase/auth";
import DesktopSubmenu from "@/components/navigation/DesktopSubmenu.vue";
import MobileSubmenu from "@/components/navigation/MobileSubmenu.vue";
import AwarenessToolsDesktopSubmenu from "./AwarenessToolsDesktopSubmenu.vue";
import AwarenessToolsMobileSubmenu from "./AwarenessToolsMobileSubmenu.vue";
const nuxtApp = useNuxtApp();
const auth = nuxtApp.$auth;
const router = useRouter();
const route = useRoute();

// Reactive references
const isDropdownOpen = ref(false);
const openSubmenu = ref(null);
const currentUser = ref(auth.currentUser);

// Check if the current route is inside the "Courses" submenu
const isCoursesRouteActive = computed(() => {
  const submenuRoutes = [
    "/courses/free-resources",
    "/courses/courses",
    "/courses/guides",
    "/courses/podcasts",
  ];
  return submenuRoutes.includes(route.path);
});

// Check if the current route is inside the "Awareness Tools" submenu
const isAwarenessToolsRouteActive = computed(() => {
  const submenuRoutes = [
    "/awareness-tools",
    "/awareness-tools/emotional-barometer",
    "/awareness-tools/deep-conversation-with-cards",
    "/awareness-tools/emotion-diary",
    "/awareness-tools/life-purpose-archetype",
  ];
  return submenuRoutes.includes(route.path);
});

// Update currentUser when auth state changes
onMounted(() => {
  const unsubscribe = auth.onAuthStateChanged((user) => {
    currentUser.value = user;
  });

  document.addEventListener("click", handleOutsideClick);

  // Cleanup
  onUnmounted(() => {
    unsubscribe();
    document.removeEventListener("click", handleOutsideClick);
  });
});

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
  if (!isDropdownOpen.value) {
    openSubmenu.value = null;
  }
};

const toggleSubmenu = (submenuName) => {
  if (openSubmenu.value === submenuName) {
    openSubmenu.value = null;
  } else {
    openSubmenu.value = submenuName;
  }
};

const closeDropdown = () => {
  isDropdownOpen.value = false;
  openSubmenu.value = null;
};

const handleLogout = async () => {
  try {
    await signOut(auth);
    closeDropdown();
    router.push("/");
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

const handleOutsideClick = (event) => {
  const mobileMenu = document.querySelector('[data-menu="mobile"]');
  const mobileMenuButton = document.querySelector('[aria-label="Toggle Menu"]');

  // Close the mobile menu if the click is outside the menu and not on the menu button
  if (
    mobileMenu &&
    !mobileMenu.contains(event.target) &&
    !mobileMenuButton.contains(event.target)
  ) {
    closeDropdown();
  }
};
</script>
<style scoped>
@keyframes gradient-x {
  0%,
  100% {
    transform: translateX(-50%);
  }
  50% {
    transform: translateX(50%);
  }
}

.animate-gradient-x {
  animation: gradient-x 15s linear infinite;
}

.active-link {
  color: white; /* Change this to your desired active link color */
  font-weight: bold; /* Optional: Make the active link bold */
}
</style>
