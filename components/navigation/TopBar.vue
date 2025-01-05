<template>
  <nav class="text-white bg-[#2C3E50]">
    <div
      class="container max-w-7xl w-full mx-auto flex justify-between items-center p-4"
    >
      <!-- Brand/Logo -->
      <NuxtLink
        to="/"
        exact-active-class="text-[#3498DB]"
        class="text-2xl font-bold hover:text-[#3498DB] focus:outline-none bg-clip-text text-transparent bg-gradient-to-r from-[#3498DB] to-[#9B59B6]"
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
              exact-active-class="text-[#3498DB]"
              class="text-[#ECF0F1] text-base cursor-pointer whitespace-nowrap font-semibold transition-colors duration-300 ease-in-out hover:text-[#3498DB] flex items-center"
            >
              Курсы
              <i class="fas fa-chevron-down ml-1 text-sm"></i>
            </div>
            <DesktopSubmenu />
          </li>
          <li class="px-4 relative group">
            <NuxtLink
              to="/awareness-tools"
              active-class="text-[#3498DB]"
              class="text-[#ECF0F1] cursor-pointer text-base whitespace-nowrap font-semibold transition-colors duration-300 ease-in-out hover:text-[#3498DB] flex items-center"
            >
              Инструменты осознанности
              <i class="fas fa-chevron-down ml-1 text-sm"></i>
            </NuxtLink>
            <AwarenessToolsDesktopSubmenu />
          </li>
          <li class="px-4">
            <NuxtLink
              to="/blog"
              exact-active-class="text-[#3498DB]"
              class="text-[#ECF0F1] text-base whitespace-nowrap font-semibold transition-colors duration-300 ease-in-out hover:text-[#3498DB]"
            >
              Блог
            </NuxtLink>
          </li>
          <li class="px-4">
            <NuxtLink
              to="/about"
              exact-active-class="text-[#3498DB]"
              class="text-[#ECF0F1] text-base whitespace-nowrap font-semibold transition-colors duration-300 ease-in-out hover:text-[#3498DB]"
            >
              О проекте
            </NuxtLink>
          </li>

          <li class="px-4">
            <NuxtLink
              to="/contact"
              exact-active-class="text-[#3498DB]"
              class="text-[#ECF0F1] text-base whitespace-nowrap font-semibold transition-colors duration-300 ease-in-out hover:text-[#3498DB]"
            >
              Связь
            </NuxtLink>
          </li>
          <div class="ml-6 flex items-center">
            <template v-if="currentUser">
              <div class="relative group">
                <div
                  class="flex items-center space-x-2 text-[#ECF0F1] hover:text-[#3498DB] cursor-pointer"
                >
                  <span class="font-semibold">{{
                    currentUser.displayName
                  }}</span>
                  <i class="fas fa-chevron-down text-sm"></i>
                </div>

                <!-- User Dropdown Menu (Now uses group-hover) -->
                <div
                  class="absolute right-0 mt-2 w-48 bg-[#34495E] rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300"
                >
                  <NuxtLink
                    to="/profile"
                    exact-active-class="text-[#3498DB]"
                    class="block px-4 py-2 text-sm text-[#ECF0F1] hover:bg-[#27AE60]"
                  >
                    Профиль
                  </NuxtLink>
                  <button
                    @click="handleLogout"
                    class="block w-full text-left px-4 py-2 text-sm text-[#ECF0F1] hover:bg-[#27AE60]"
                  >
                    Выйти
                  </button>
                </div>
              </div>
            </template>

            <template v-else>
              <NuxtLink
                to="/login"
                exact-active-class="text-[#3498DB]"
                class="text-[#ECF0F1] font-semibold hover:text-[#3498DB] mr-4"
              >
                Войти
              </NuxtLink>
              <NuxtLink
                to="/register"
                exact-active-class="text-[#3498DB]"
                class="bg-gradient-to-r from-[#27AE60] to-[#3498DB] text-white px-4 py-2 rounded-md hover:from-[#34B079] hover:to-[#5AB8E6] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#3498DB] focus:ring-offset-2 focus:ring-offset-[#2C3E50]"
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
            class="block w-6 h-0.5 bg-white transition-all duration-500 ease-in-out"
            :class="
              isDropdownOpen ? 'rotate-45 translate-y-2' : 'translate-y-0'
            "
          ></span>
          <span
            class="block w-6 h-0.5 bg-white mt-1.5 transition-all duration-500 ease-in-out"
            :class="isDropdownOpen ? 'opacity-0' : 'opacity-100'"
          ></span>
          <span
            class="block w-6 h-0.5 bg-white mt-1.5 transition-all duration-500 ease-in-out"
            :class="
              isDropdownOpen ? '-rotate-45 -translate-y-2' : 'translate-y-0'
            "
          ></span>
        </button>

        <ul
          :class="[
            'absolute -right-4 mt-4 bg-[#34495E] py-4 rounded-bl-lg shadow-md w-52 overflow-hidden transition-all duration-700 ease-in-out transform z-50',
            isDropdownOpen
              ? 'max-h-fit opacity-100 scale-100'
              : 'max-h-0 opacity-0 scale-95',
          ]"
        >
          <!-- Navigation Items -->
          <li class="relative">
            <div
              class="px-8 py-2 text-[#ECF0F1] transition-colors duration-300 ease-in-out hover:bg-[#242436] cursor-pointer flex items-center justify-between"
              @click="toggleSubmenu('courses')"
            >
              Курсы

              <i
                class="fas fa-chevron-down ml-1 text-sm"
                :class="openSubmenu === 'courses' ? 'rotate-180' : ''"
              ></i>
            </div>
            <MobileSubmenu
              :isOpen="openSubmenu === 'courses'"
              :closeDropdown="closeDropdown"
            />
          </li>

          <li class="relative">
            <NuxtLink
              active-class="bg-[#242436]"
              class="px-8 py-2 text-[#ECF0F1] transition-colors duration-300 ease-in-out hover:bg-[#242436] cursor-pointer flex items-center justify-between"
              @click="toggleSubmenu('awareness-tools')"
            >
              Инструменты осознанности
              <i
                class="fas fa-chevron-down ml-1 text-sm"
                :class="openSubmenu === 'awareness-tools' ? 'rotate-180' : ''"
              ></i>
            </NuxtLink>
            <AwarenessToolsMobileSubmenu
              :isOpen="openSubmenu === 'awareness-tools'"
              :closeDropdown="closeDropdown"
            />
          </li>

          <li>
            <NuxtLink
              to="/about"
              exact-active-class="bg-[#242436]"
              class="block px-8 py-2 text-[#ECF0F1] transition-colors duration-300 ease-in-out hover:bg-[#242436]"
              @click="closeDropdown"
            >
              О проекте
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/blog"
              exact-active-class="bg-[#242436]"
              class="block px-8 py-2 text-[#ECF0F1] transition-colors duration-300 ease-in-out hover:bg-[#242436]"
              @click="closeDropdown"
            >
              Блог
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/contact"
              exact-active-class="bg-[#242436]"
              class="block px-8 py-2 text-[#ECF0F1] transition-colors duration-300 ease-in-out hover:bg-[#242436]"
              @click="closeDropdown"
            >
              Связь
            </NuxtLink>
          </li>

          <!-- Auth Section -->
          <template v-if="currentUser">
            <li class="border-t border-gray-700 mt-2 pt-2">
              <span class="block px-8 py-2 text-gray-300">
                {{ currentUser.displayName || currentUser.email }}
              </span>
            </li>
            <li>
              <NuxtLink
                to="/profile"
                exact-active-class="bg-[#242436]"
                class="block px-8 py-2 text-gray-300 transition-colors duration-300 ease-in-out hover:bg-[#242436]"
                @click="closeDropdown"
              >
                Профиль
              </NuxtLink>
            </li>
            <li>
              <button
                @click="handleLogout"
                class="w-full text-left px-8 py-2 text-gray-300 transition-colors duration-300 ease-in-out hover:bg-[#242436]"
              >
                Выйти
              </button>
            </li>
          </template>
          <template v-else>
            <li class="border-t border-gray-700 mt-2 pt-2">
              <NuxtLink
                to="/login"
                exact-active-class="bg-[#242436]"
                class="block px-8 py-2 text-gray-300 transition-colors duration-300 ease-in-out hover:bg-[#242436]"
                @click="closeDropdown"
              >
                Войти
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/register"
                exact-active-class="bg-[#242436]"
                class="block px-8 py-2 text-gray-300 transition-colors duration-300 ease-in-out hover:bg-[#242436]"
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
