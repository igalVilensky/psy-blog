<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#0F172A] via-[#1E1B4B] to-[#0F172A] shadow-[0_2px_20px_rgba(123,97,255,0.15)]"
  >
    <!-- Neon glow divider -->
    <div
      class="absolute -bottom-px left-0 right-0 h-px bg-gradient-to-r from-purple-400/50 via-cyan-400/50 to-purple-400/50"
    ></div>

    <!-- Container for topbar content -->
    <div
      class="container max-w-6xl w-full mx-auto flex justify-between items-center p-4 relative z-10"
    >
      <!--  Brand/Logo -->
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

      <!--  Desktop Menu -->
      <div class="hidden lg:flex items-center space-x-4">
        <ul class="flex items-center space-x-4">
          <!-- Courses Dropdown -->
          <li class="relative group">
            <div
              class="flex items-center space-x-2 cursor-pointer px-1 py-2 rounded-lg hover:bg-white/5 transition-all duration-300"
            >
              <i class="fas fa-graduation-cap text-purple-400"></i>
              <span
                class="text-slate-300 font-medium group-hover:text-white transition-colors duration-300"
                >Курсы</span
              >
              <i
                class="fas fa-chevron-down text-xs text-slate-400 group-hover:text-white transition-all duration-300 group-hover:-rotate-180"
              ></i>
            </div>
            <!-- Adjusted submenu position -->
            <div class="absolute top-6 left-0 pt-2">
              <DesktopSubmenu class="min-w-[240px]" />
            </div>
          </li>

          <!-- Awareness Tools Dropdown -->
          <li class="relative group">
            <NuxtLink
              to="/awareness-tools"
              class="flex items-center space-x-2 px-1 py-2 rounded-lg hover:bg-white/5 transition-all duration-300"
              exact-active-class="bg-white/10"
            >
              <i class="fas fa-brain text-cyan-400"></i>
              <span
                class="text-slate-300 font-medium group-hover:text-white transition-colors duration-300"
                >Инструменты осознанности</span
              >
              <i
                class="fas fa-chevron-down text-xs text-slate-400 group-hover:text-white transition-all duration-300 group-hover:-rotate-180"
              ></i>
            </NuxtLink>
            <!-- Adjusted submenu position -->
            <div class="absolute top-6 left-0 pt-2">
              <AwarenessToolsDesktopSubmenu class="min-w-[240px]" />
            </div>
          </li>

          <!-- Blog -->
          <li class="relative group">
            <NuxtLink
              to="/blog"
              class="flex items-center space-x-2 px-1 py-2 rounded-lg hover:bg-white/5 transition-all duration-300"
              exact-active-class="bg-white/10"
            >
              <i class="fas fa-book-open text-fuchsia-400"></i>
              <span
                class="text-slate-300 font-medium group-hover:text-white transition-colors duration-300"
                >Блог</span
              >
            </NuxtLink>
            <span
              class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 group-hover:w-full transition-all duration-300"
            ></span>
          </li>

          <!-- About -->
          <li class="relative group">
            <NuxtLink
              to="/about"
              class="flex items-center space-x-2 px-1 py-2 rounded-lg hover:bg-white/5 transition-all duration-300"
              exact-active-class="bg-white/10"
            >
              <i class="fas fa-info-circle text-purple-400"></i>
              <span
                class="text-slate-300 font-medium group-hover:text-white transition-colors duration-300"
                >О проекте</span
              >
            </NuxtLink>
            <span
              class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 group-hover:w-full transition-all duration-300"
            ></span>
          </li>
        </ul>

        <!--  Auth Section -->
        <div class="flex items-center">
          <template v-if="currentUser">
            <div class="relative group">
              <NuxtLink
                to="/profile"
                :class="[
                  'flex cursor-pointer items-center space-x-2 bg-white/5 rounded-lg px-4 py-2 hover:bg-white/10 transition-all duration-300',
                  $route.path.startsWith('/profile') ? 'bg-white/15' : '',
                ]"
              >
                <i class="fas fa-user text-purple-400"></i>
                <span
                  class="font-medium text-slate-300 group-hover:text-white"
                  >{{ currentUser.displayName }}</span
                >
                <i
                  class="fas fa-chevron-down text-xs text-slate-400 group-hover:rotate-180 transition-transform duration-300"
                ></i>
              </NuxtLink>

              <!-- Adjusted auth dropdown position -->
              <div
                class="absolute top-full right-0 pt-4 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300"
              >
                <div
                  class="bg-gradient-to-b from-[#1E1B4B] to-[#0F172A] rounded-xl shadow-[0_4px_20px_rgba(123,97,255,0.2)] backdrop-blur-sm border border-white/10 overflow-hidden"
                >
                  <NuxtLink
                    to="/profile"
                    :class="[
                      'flex items-center space-x-2 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300',
                      $route.path.startsWith('/profile') ? 'bg-white/10' : '',
                    ]"
                  >
                    <i class="fas fa-user-circle text-purple-400"></i>
                    <span>Профиль</span>
                  </NuxtLink>
                  <button
                    @click="handleLogout"
                    class="w-full flex items-center space-x-2 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300"
                  >
                    <i class="fas fa-sign-out-alt text-red-400"></i>
                    <span>Выйти</span>
                  </button>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <!--  Login Button -->
            <NuxtLink
              to="/login"
              class="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-white/5 transition-all duration-300"
            >
              <i class="fas fa-sign-in-alt text-purple-400"></i>
              <span
                class="text-slate-300 font-medium hover:text-white transition-colors duration-300"
                >Войти</span
              >
            </NuxtLink>

            <!--  Register Button -->
            <NuxtLink
              to="/register"
              class="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-medium transition-all duration-300 ease-out rounded-lg group"
            >
              <span
                class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-500 group-hover:translate-x-0 ease"
              >
                <i class="fas fa-arrow-right ml-2"></i>
              </span>
              <span
                class="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform bg-gradient-to-r from-purple-500 to-cyan-500 group-hover:translate-x-full ease"
              >
                <i class="fas fa-user-plus mr-2"></i>
                Регистрация
              </span>
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
          'lg:hidden absolute top-full left-0 right-0 bg-gradient-to-b from-[#1E1B4B] to-[#0F172A] border-t border-white/10 transform transition-all duration-300 shadow-[0_10px_20px_rgba(0,0,0,0.3)] backdrop-blur-sm overflow-y-auto',
          isDropdownOpen
            ? 'translate-y-0 opacity-100 visible max-h-[80vh]'
            : '-translate-y-4 opacity-0 invisible max-h-0',
        ]"
      >
        <div class="p-4 space-y-4">
          <!-- Mobile Navigation Items -->
          <div class="space-y-3">
            <!-- Courses Dropdown -->
            <div class="relative">
              <button
                @click="toggleSubmenu('courses')"
                class="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group"
              >
                <div class="flex items-center space-x-3 flex-1">
                  <i class="fas fa-graduation-cap text-purple-400 text-lg"></i>
                  <span
                    class="font-medium text-slate-300 group-hover:text-white"
                    >Курсы</span
                  >
                </div>
                <i
                  class="fas fa-chevron-down text-slate-400 transition-transform duration-300"
                  :class="[
                    (openSubmenu === 'courses' || isCoursesRouteActive) &&
                    !isManuallyClosed
                      ? 'rotate-180 text-white'
                      : '',
                  ]"
                ></i>
              </button>

              <!--  submenu animation and styling -->
              <MobileSubmenu
                :isOpen="
                  (openSubmenu === 'courses' || isCoursesRouteActive) &&
                  !isManuallyClosed
                "
                :closeDropdown="closeDropdown"
                class="mt-2 rounded-xl overflow-hidden"
              />
            </div>

            <!-- Awareness Tools Dropdown -->
            <div class="relative">
              <button
                @click="toggleSubmenu('awareness-tools')"
                class="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group"
              >
                <div class="flex items-center space-x-3 flex-1">
                  <i class="fas fa-brain text-cyan-400 text-lg"></i>
                  <span
                    class="font-medium text-slate-300 group-hover:text-white"
                    >Инструменты осознанности</span
                  >
                </div>
                <i
                  class="fas fa-chevron-down text-slate-400 transition-transform duration-300"
                  :class="[
                    (openSubmenu === 'awareness-tools' ||
                      isAwarenessToolsRouteActive) &&
                    !isManuallyClosed
                      ? 'rotate-180 text-white'
                      : '',
                  ]"
                ></i>
              </button>

              <AwarenessToolsMobileSubmenu
                :isOpen="
                  (openSubmenu === 'awareness-tools' ||
                    isAwarenessToolsRouteActive) &&
                  !isManuallyClosed
                "
                :closeDropdown="closeDropdown"
                class="mt-2 rounded-xl overflow-hidden"
              />
            </div>

            <!-- Regular Menu Items with  Styling -->
            <NuxtLink
              to="/blog"
              class="flex items-center space-x-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group"
              @click="closeDropdown"
              exact-active-class="bg-white/15"
            >
              <i class="fas fa-book-open text-fuchsia-400 text-lg"></i>
              <span class="font-medium text-slate-300 group-hover:text-white"
                >Блог</span
              >
            </NuxtLink>

            <NuxtLink
              to="/about"
              class="flex items-center space-x-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group"
              @click="closeDropdown"
              exact-active-class="bg-white/15"
            >
              <i class="fas fa-info-circle text-purple-400 text-lg"></i>
              <span class="font-medium text-slate-300 group-hover:text-white"
                >О проекте</span
              >
            </NuxtLink>

            <NuxtLink
              to="/contact"
              class="flex items-center space-x-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group"
              @click="closeDropdown"
              exact-active-class="bg-white/15"
            >
              <i class="fas fa-envelope text-cyan-400 text-lg"></i>
              <span class="font-medium text-slate-300 group-hover:text-white"
                >Связь</span
              >
            </NuxtLink>
          </div>

          <!--  Auth Section -->
          <div class="pt-4 border-t border-white/10">
            <template v-if="currentUser">
              <!-- User Profile Card -->
              <div class="mb-4 p-4 rounded-xl bg-white/5">
                <span class="text-sm text-slate-400">Вы вошли как</span>
                <div class="text-white font-medium mt-1">
                  {{ currentUser.displayName || currentUser.email }}
                </div>
              </div>

              <!-- User Actions -->
              <div class="space-y-3">
                <NuxtLink
                  to="/profile"
                  class="flex items-center space-x-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group"
                  @click="closeDropdown"
                  exact-active-class="bg-white/15"
                >
                  <i class="fas fa-user text-purple-400 text-lg"></i>
                  <span
                    class="font-medium text-slate-300 group-hover:text-white"
                    >Профиль</span
                  >
                </NuxtLink>

                <button
                  @click="handleLogout"
                  class="w-full flex items-center space-x-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group"
                >
                  <i class="fas fa-sign-out-alt text-red-400 text-lg"></i>
                  <span
                    class="font-medium text-slate-300 group-hover:text-white"
                    >Выйти</span
                  >
                </button>
              </div>
            </template>

            <template v-else>
              <div class="space-y-3">
                <NuxtLink
                  to="/login"
                  class="flex items-center justify-center space-x-2 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300"
                  @click="closeDropdown"
                >
                  <i class="fas fa-sign-in-alt text-purple-400"></i>
                  <span class="font-medium text-slate-300">Войти</span>
                </NuxtLink>

                <NuxtLink
                  to="/register"
                  class="flex items-center justify-center space-x-2 p-4 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 transition-all duration-300"
                  @click="closeDropdown"
                >
                  <i class="fas fa-user-plus text-white"></i>
                  <span class="font-medium text-white">Регистрация</span>
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
const isManuallyClosed = ref(false);

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
    isManuallyClosed.value = true; // Mark the submenu as manually closed
  } else {
    openSubmenu.value = submenuName;
    isManuallyClosed.value = false; // Reset the manual close state
  }
};

const closeDropdown = () => {
  isDropdownOpen.value = false;
  openSubmenu.value = null;
  isManuallyClosed.value = false; // Reset the manual close state
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
.active-link {
  color: white; /* Change this to your desired active link color */
  font-weight: bold; /* Optional: Make the active link bold */
}
</style>
