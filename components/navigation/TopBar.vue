<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-[#1A1F35] to-[#1E293B] shadow-[0_2px_20px_rgba(123,97,255,0.15)]"
  >
    <!-- Neon glow divider -->
    <div
      class="absolute -bottom-px left-0 right-0 h-px bg-gradient-to-r from-[#0EA5E9]/50 via-[#F59E0B]/50 to-[#E879F9]/50"
    ></div>

    <!-- Container for topbar content -->
    <div
      class="container max-w-6xl px-4 w-full mx-auto flex justify-between items-center py-4 relative z-10"
    >
      <!-- Brand/Logo -->
      <NuxtLink to="/" class="group relative" @click="closeDropdown">
        <span
          class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] group-hover:from-[#E879F9] group-hover:to-[#0EA5E9] transition-all duration-500"
        >
          Anastasia
        </span>
        <span
          class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] group-hover:w-full transition-all duration-500"
        ></span>
      </NuxtLink>

      <!-- Desktop Menu -->
      <div class="hidden lg:flex items-center space-x-4">
        <ul class="flex items-center space-x-4">
          <!-- Courses Dropdown -->
          <li class="relative group">
            <div
              class="flex items-center space-x-2 cursor-pointer px-1 py-2 rounded-lg hover:bg-white/5 transition-all duration-300"
            >
              <i class="fas fa-graduation-cap text-[#0EA5E9]"></i>
              <span
                class="text-slate-300 font-medium group-hover:text-white transition-colors duration-300"
                >Курсы</span
              >
              <i
                class="fas fa-chevron-down text-xs text-slate-400 group-hover:text-white transition-all duration-300 group-hover:-rotate-180"
              ></i>
            </div>
            <span
              class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] group-hover:w-full transition-all duration-300"
            ></span>
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
              <i class="fas fa-brain text-[#F59E0B]"></i>
              <span
                class="text-slate-300 font-medium group-hover:text-white transition-colors duration-300"
                >Инструменты осознанности</span
              >
              <i
                class="fas fa-chevron-down text-xs text-slate-400 group-hover:text-white transition-all duration-300 group-hover:-rotate-180"
              ></i>
            </NuxtLink>
            <span
              class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] group-hover:w-full transition-all duration-300"
            ></span>
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
              <i class="fas fa-book-open text-[#E879F9]"></i>
              <span
                class="text-slate-300 font-medium group-hover:text-white transition-colors duration-300"
                >Блог</span
              >
            </NuxtLink>
            <span
              class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] group-hover:w-full transition-all duration-300"
            ></span>
          </li>

          <!-- About -->
          <li class="relative group">
            <NuxtLink
              to="/about"
              class="flex items-center space-x-2 px-1 py-2 rounded-lg hover:bg-white/5 transition-all duration-300"
              exact-active-class="bg-white/10"
            >
              <i class="fas fa-info-circle text-[#0EA5E9]"></i>
              <span
                class="text-slate-300 font-medium group-hover:text-white transition-colors duration-300"
                >О проекте</span
              >
            </NuxtLink>
            <span
              class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] group-hover:w-full transition-all duration-300"
            ></span>
          </li>
        </ul>

        <!-- Profile Section -->

        <div v-if="auth.user" class="relative group">
          <NuxtLink
            to="/profile"
            class="flex cursor-pointer items-center space-x-2 rounded-lg p-2 hover:bg-white/10 transition-all duration-300"
          >
            <i class="fas fa-user text-[#0EA5E9]"></i>
            <span class="font-medium text-slate-300 group-hover:text-white">
              {{ auth.user.displayName || auth.user.email }}
            </span>
            <i
              class="fas fa-chevron-down text-xs text-slate-400 group-hover:rotate-180 transition-transform duration-300"
            ></i>
          </NuxtLink>
          <!-- Dropdown for Profile and Logout -->
          <div
            class="absolute top-full right-0 pt-4 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300"
          >
            <div
              class="bg-gradient-to-b from-[#1A1F35] to-[#1E293B] rounded-xl shadow-[0_4px_20px_rgba(123,97,255,0.2)] backdrop-blur-sm border border-white/10 overflow-hidden"
            >
              <NuxtLink
                to="/profile"
                class="flex items-center space-x-2 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300"
              >
                <i class="fas fa-user-circle text-[#0EA5E9]"></i>
                <span>Профиль</span>
              </NuxtLink>
              <button
                @click="logoutUser"
                class="w-full flex items-center space-x-2 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300"
              >
                <i class="fas fa-sign-out-alt text-red-400"></i>
                <span>Выйти</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Logged-out State -->
        <div v-else class="flex items-center space-x-4">
          <NuxtLink
            to="/login"
            class="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-white/5 transition-all duration-300"
          >
            <i class="fas fa-sign-in-alt text-purple-400"></i>
            <span class="text-slate-300 font-medium hover:text-white">
              Войти
            </span>
          </NuxtLink>
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
          'lg:hidden absolute top-full left-0 right-0 bg-gradient-to-b from-[#1A1F35] to-[#1E293B] border-t border-white/10 transform transition-all duration-300 shadow-[0_10px_20px_rgba(0,0,0,0.3)] backdrop-blur-sm overflow-y-auto',
          isDropdownOpen
            ? 'translate-y-0 opacity-100 visible max-h-[80vh]'
            : '-translate-y-4 opacity-0 invisible max-h-0',
        ]"
      >
        <div class="p-4 space-y-4">
          <!-- Mobile Navigation Items -->
          <div class="space-y-3">
            <!-- Courses Dropdown (Mobile) -->
            <div class="relative">
              <button
                @click="toggleMobileSubmenu('courses')"
                class="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group"
              >
                <div class="flex items-center space-x-3 flex-1">
                  <i class="fas fa-graduation-cap text-[#0EA5E9] text-lg"></i>
                  <span
                    class="font-medium text-slate-300 group-hover:text-white"
                    >Курсы</span
                  >
                </div>
                <i
                  class="fas fa-chevron-down text-slate-400 transition-transform duration-300"
                  :class="[
                    (mobileSubmenuStates.courses || isCoursesRouteActive) &&
                    !isMobileManuallyClosed.courses
                      ? 'rotate-180 text-white'
                      : '',
                  ]"
                ></i>
              </button>

              <!-- Submenu Content -->
              <div
                class="mt-2 rounded-xl overflow-hidden transition-all duration-500 ease-in-out"
                :class="[
                  (mobileSubmenuStates.courses || isCoursesRouteActive) &&
                  !isMobileManuallyClosed.courses
                    ? 'max-h-[400px]'
                    : 'max-h-0',
                ]"
              >
                <MobileSubmenu
                  :isOpen="
                    (mobileSubmenuStates.courses || isCoursesRouteActive) &&
                    !isMobileManuallyClosed.courses
                  "
                  :closeDropdown="closeDropdown"
                />
              </div>
            </div>

            <!-- Awareness Tools Dropdown (Mobile) -->
            <div class="relative">
              <button
                @click="toggleMobileSubmenu('awarenessTools')"
                class="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group"
              >
                <div class="flex items-center space-x-3 flex-1">
                  <i class="fas fa-brain text-[#F59E0B] text-lg"></i>
                  <span
                    class="font-medium text-slate-300 group-hover:text-white"
                    >Инструменты осознанности</span
                  >
                </div>
                <i
                  class="fas fa-chevron-down text-slate-400 transition-transform duration-300"
                  :class="[
                    (mobileSubmenuStates.awarenessTools ||
                      isAwarenessToolsRouteActive) &&
                    !isMobileManuallyClosed.awarenessTools
                      ? 'rotate-180 text-white'
                      : '',
                  ]"
                ></i>
              </button>

              <!-- Submenu Content -->
              <div
                class="mt-2 rounded-xl overflow-hidden transition-all duration-500 ease-in-out"
                :class="[
                  (mobileSubmenuStates.awarenessTools ||
                    isAwarenessToolsRouteActive) &&
                  !isMobileManuallyClosed.awarenessTools
                    ? 'max-h-[400px]'
                    : 'max-h-0',
                ]"
              >
                <AwarenessToolsMobileSubmenu
                  :isOpen="
                    (mobileSubmenuStates.awarenessTools ||
                      isAwarenessToolsRouteActive) &&
                    !isMobileManuallyClosed.awarenessTools
                  "
                  :closeDropdown="closeDropdown"
                />
              </div>
            </div>

            <!-- Regular Menu Items with Styling -->
            <NuxtLink
              to="/blog"
              class="flex items-center space-x-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group"
              @click="closeDropdown"
              exact-active-class="bg-white/15"
            >
              <i class="fas fa-book-open text-[#E879F9] text-lg"></i>
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
              <i class="fas fa-info-circle text-[#0EA5E9] text-lg"></i>
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
              <i class="fas fa-envelope text-[#0EA5E9] text-lg"></i>
              <span class="font-medium text-slate-300 group-hover:text-white"
                >Связь</span
              >
            </NuxtLink>
          </div>

          <!-- Auth Section -->
          <div class="pt-4 border-t border-white/10">
            <template v-if="auth.user">
              <!-- User Profile Card -->
              <div class="mb-4 p-4 rounded-xl bg-white/5">
                <span class="text-sm text-slate-400">Вы вошли как</span>
                <div class="text-white font-medium mt-1">
                  {{ auth.user.displayName || auth.user.email }}
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
                  <i class="fas fa-user text-[#0EA5E9] text-lg"></i>
                  <span
                    class="font-medium text-slate-300 group-hover:text-white"
                    >Профиль</span
                  >
                </NuxtLink>

                <button
                  @click="logoutUser"
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
                  <i class="fas fa-sign-in-alt text-[#0EA5E9]"></i>
                  <span class="font-medium text-slate-300">Войти</span>
                </NuxtLink>

                <NuxtLink
                  to="/register"
                  class="flex items-center justify-center space-x-2 p-4 rounded-xl bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] hover:from-[#22D3EE] hover:to-[#C084FC] transition-all duration-300"
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
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "~/stores/auth";
import DesktopSubmenu from "@/components/navigation/DesktopSubmenu.vue";
import MobileSubmenu from "@/components/navigation/MobileSubmenu.vue";
import AwarenessToolsDesktopSubmenu from "./AwarenessToolsDesktopSubmenu.vue";
import AwarenessToolsMobileSubmenu from "./AwarenessToolsMobileSubmenu.vue";

const auth = useAuthStore();
const route = useRoute();
const router = useRouter();

const isDropdownOpen = ref(false);
const openSubmenu = ref(null);
const isManuallyClosed = ref(false);
const mobileSubmenuStates = ref({
  courses: false,
  awarenessTools: false,
});
const isMobileManuallyClosed = ref({
  courses: false,
  awarenessTools: false,
});

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

onMounted(async () => {
  await auth.initAuth(); // Initialize auth state from the store
  document.addEventListener("click", handleOutsideClick);
});

onUnmounted(() => {
  document.removeEventListener("click", handleOutsideClick);
});

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
  if (!isDropdownOpen.value) {
    openSubmenu.value = null;
  }
};

const toggleMobileSubmenu = (submenuName) => {
  if (mobileSubmenuStates.value[submenuName]) {
    // Close the currently open submenu
    mobileSubmenuStates.value[submenuName] = false;
    isMobileManuallyClosed.value[submenuName] = true; // Mark the submenu as manually closed
  } else {
    // Close all other submenus before opening the new one
    Object.keys(mobileSubmenuStates.value).forEach((key) => {
      if (key !== submenuName) {
        mobileSubmenuStates.value[key] = false;
      }
    });

    // Open the new submenu
    mobileSubmenuStates.value[submenuName] = true;
    isMobileManuallyClosed.value[submenuName] = false; // Reset the manual close state
  }
};

const closeDropdown = () => {
  isDropdownOpen.value = false;
  openSubmenu.value = null;
  isManuallyClosed.value = false; // Reset the manual close state
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

// Logout user
const logoutUser = async () => {
  await auth.logout();
  router.push("/login");
};
</script>

<style scoped>
.active-link {
  color: white; /* Change this to your desired active link color */
  font-weight: bold; /* Optional: Make the active link bold */
}
</style>
