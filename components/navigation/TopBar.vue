<template>
  <nav class="text-black bg-gray-50">
    <div
      class="container max-w-7xl w-full mx-auto flex justify-between items-center p-4"
    >
      <!-- Brand/Logo -->
      <NuxtLink
        to="/"
        exact-active-class="text-pink-500"
        class="text-2xl font-bold hover:text-pink-500 focus:outline-none"
        aria-label="Home"
        @click="closeDropdown"
      >
        Anastasia
      </NuxtLink>

      <!-- Desktop Menu -->
      <div class="hidden xl:block">
        <ul class="flex items-center">
          <li class="px-4 relative group">
            <div
              exact-active-class="text-pink-500"
              class="text-gray-800 text-base cursor-pointer whitespace-nowrap font-semibold transition-colors duration-300 ease-in-out hover:text-pink-500 flex items-center"
            >
              Курсы
              <i class="fas fa-chevron-down ml-1 text-sm"></i>
            </div>
            <DesktopSubmenu />
          </li>
          <li class="px-4 relative group">
            <div
              exact-active-class="text-pink-500"
              class="text-gray-800 cursor-pointer text-base whitespace-nowrap font-semibold transition-colors duration-300 ease-in-out hover:text-pink-500 flex items-center"
            >
              Инструменты осознанности
              <i class="fas fa-chevron-down ml-1 text-sm"></i>
            </div>
            <AwarenessToolsDesktopSubmenu />
          </li>
          <li class="px-4">
            <NuxtLink
              to="/blog"
              exact-active-class="text-pink-500"
              class="text-gray-800 text-base whitespace-nowrap font-semibold transition-colors duration-300 ease-in-out hover:text-pink-500"
            >
              Блог
            </NuxtLink>
          </li>
          <li class="px-4">
            <NuxtLink
              to="/about"
              exact-active-class="text-pink-500"
              class="text-gray-800 text-base whitespace-nowrap font-semibold transition-colors duration-300 ease-in-out hover:text-pink-500"
            >
              О проекте
            </NuxtLink>
          </li>

          <li class="px-4">
            <NuxtLink
              to="/contact"
              exact-active-class="text-pink-500"
              class="text-gray-800 text-base whitespace-nowrap font-semibold transition-colors duration-300 ease-in-out hover:text-pink-500"
            >
              Связь
            </NuxtLink>
          </li>
          <div class="ml-6 flex items-center">
            <template v-if="currentUser">
              <div class="relative group">
                <div
                  class="flex items-center space-x-2 text-gray-800 hover:text-pink-500 cursor-pointer"
                >
                  <span class="font-semibold">{{
                    currentUser.displayName
                  }}</span>
                  <i class="fas fa-chevron-down text-sm"></i>
                </div>

                <!-- User Dropdown Menu (Now uses group-hover) -->
                <div
                  class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300"
                >
                  <NuxtLink
                    to="/profile"
                    exact-active-class="text-pink-500"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Профиль
                  </NuxtLink>
                  <button
                    @click="handleLogout"
                    class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Выйти
                  </button>
                </div>
              </div>
            </template>

            <template v-else>
              <NuxtLink
                to="/login"
                exact-active-class="text-pink-500"
                class="text-gray-800 font-semibold hover:text-pink-500 mr-4"
              >
                Войти
              </NuxtLink>
              <NuxtLink
                to="/register"
                exact-active-class="text-pink-500"
                class="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition-colors duration-300"
              >
                Регистрация
              </NuxtLink>
            </template>
          </div>
        </ul>
      </div>

      <!-- Mobile Menu -->
      <div class="relative xl:hidden mobile-menu" data-menu="mobile">
        <button
          @click="toggleDropdown"
          class="focus:outline-none flex flex-col items-center justify-center w-8 h-8 relative"
          aria-label="Toggle Menu"
        >
          <span
            class="block w-6 h-0.5 bg-black transition-all duration-500 ease-in-out"
            :class="
              isDropdownOpen ? 'rotate-45 translate-y-2' : 'translate-y-0'
            "
          ></span>
          <span
            class="block w-6 h-0.5 bg-black mt-1.5 transition-all duration-500 ease-in-out"
            :class="isDropdownOpen ? 'opacity-0' : 'opacity-100'"
          ></span>
          <span
            class="block w-6 h-0.5 bg-black mt-1.5 transition-all duration-500 ease-in-out"
            :class="
              isDropdownOpen ? '-rotate-45 -translate-y-2' : 'translate-y-0'
            "
          ></span>
        </button>

        <ul
          :class="[
            'absolute -right-4 mt-4 bg-pink-400 py-4 rounded shadow-md w-52 overflow-hidden transition-all duration-700 ease-in-out transform z-50',
            isDropdownOpen
              ? 'max-h-fit opacity-100 scale-100'
              : 'max-h-0 opacity-0 scale-95',
          ]"
        >
          <!-- Navigation Items -->
          <li class="relative">
            <div
              class="px-8 py-2 text-white transition-colors duration-300 ease-in-out hover:bg-pink-600 cursor-pointer flex items-center justify-between"
              @click="toggleSubmenu('courses')"
            >
              Курсы
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 ml-1 transform transition-transform duration-300"
                :class="openSubmenu === 'courses' ? 'rotate-180' : ''"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            <MobileSubmenu
              :isOpen="openSubmenu === 'courses'"
              :closeDropdown="closeDropdown"
            />
          </li>

          <li class="relative">
            <div
              class="px-8 py-2 text-white transition-colors duration-300 ease-in-out hover:bg-pink-600 cursor-pointer flex items-center justify-between"
              @click="toggleSubmenu('awareness-tools')"
            >
              Инструменты осознанности
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 ml-1 flex-shrink-0 transform transition-transform duration-300"
                :class="openSubmenu === 'awareness-tools' ? 'rotate-180' : ''"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            <AwarenessToolsMobileSubmenu
              :isOpen="openSubmenu === 'awareness-tools'"
              :closeDropdown="closeDropdown"
            />
          </li>

          <li>
            <NuxtLink
              to="/about"
              exact-active-class="bg-pink-500"
              class="block px-8 py-2 text-white transition-colors duration-300 ease-in-out hover:bg-pink-600"
              @click="closeDropdown"
            >
              О проекте
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/blog"
              exact-active-class="bg-pink-500"
              class="block px-8 py-2 text-white transition-colors duration-300 ease-in-out hover:bg-pink-600"
              @click="closeDropdown"
            >
              Блог
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/contact"
              exact-active-class="bg-pink-500"
              class="block px-8 py-2 text-white transition-colors duration-300 ease-in-out hover:bg-pink-600"
              @click="closeDropdown"
            >
              Связь
            </NuxtLink>
          </li>

          <!-- Auth Section -->
          <template v-if="currentUser">
            <li class="border-t border-pink-300 mt-2 pt-2">
              <span class="block px-8 py-2 text-white">
                {{ currentUser.displayName || currentUser.email }}
              </span>
            </li>
            <li>
              <NuxtLink
                to="/profile"
                exact-active-class="bg-pink-500"
                class="block px-8 py-2 text-white transition-colors duration-300 ease-in-out hover:bg-pink-600"
                @click="closeDropdown"
              >
                Профиль
              </NuxtLink>
            </li>
            <li>
              <button
                @click="handleLogout"
                class="w-full text-left px-8 py-2 text-white transition-colors duration-300 ease-in-out hover:bg-pink-600"
              >
                Выйти
              </button>
            </li>
          </template>
          <template v-else>
            <li class="border-t border-pink-300 mt-2 pt-2">
              <NuxtLink
                to="/login"
                exact-active-class="bg-pink-500"
                class="block px-8 py-2 text-white transition-colors duration-300 ease-in-out hover:bg-pink-600"
                @click="closeDropdown"
              >
                Войти
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/register"
                exact-active-class="bg-pink-500"
                class="block px-8 py-2 text-white transition-colors duration-300 ease-in-out hover:bg-pink-600"
                @click="closeDropdown"
              >
                Регистрация
              </NuxtLink>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useNuxtApp } from "#app";
import { signOut } from "firebase/auth";
import DesktopSubmenu from "@/components/navigation/DesktopSubmenu.vue";
import MobileSubmenu from "@/components/navigation/MobileSubmenu.vue";
import AwarenessToolsDesktopSubmenu from "./AwarenessToolsDesktopSubmenu.vue";
import AwarenessToolsMobileSubmenu from "./AwarenessToolsMobileSubmenu.vue";
const nuxtApp = useNuxtApp();
const auth = nuxtApp.$auth;
const router = useRouter();

// Reactive references
const isDropdownOpen = ref(false);
const openSubmenu = ref(null);
const currentUser = ref(auth.currentUser);

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
  if (mobileMenu && !mobileMenu.contains(event.target)) {
    closeDropdown();
  }

  // Close user menu when clicking outside
  const userMenu = document.querySelector(".user-menu");
  if (userMenu && !userMenu.contains(event.target)) {
    closeUserMenu();
  }
};
</script>
