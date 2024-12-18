<template>
  <nav class="text-black">
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
            <NuxtLink
              to="/courses/courses"
              exact-active-class="text-pink-500"
              class="text-gray-800 text-base whitespace-nowrap font-semibold transition-colors duration-300 ease-in-out hover:text-pink-500 flex items-center"
            >
              Курсы
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 ml-1"
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
            </NuxtLink>
            <DesktopSubmenu />
          </li>
          <li class="px-4">
            <NuxtLink
              to="/tests"
              exact-active-class="text-pink-500"
              class="text-gray-800 text-base whitespace-nowrap font-semibold transition-colors duration-300 ease-in-out hover:text-pink-500"
            >
              Карты разговоров
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
            'absolute -right-4 mt-4 bg-pink-400 py-4 rounded shadow-md w-40 overflow-hidden transition-all duration-700 ease-in-out transform z-50',
            isDropdownOpen
              ? 'max-h-[400px] opacity-100 scale-100'
              : 'max-h-0 opacity-0 scale-95',
          ]"
        >
          <li class="relative">
            <div
              class="px-8 py-2 text-white transition-colors duration-300 ease-in-out hover:bg-pink-600 cursor-pointer flex items-center justify-between"
              @click="toggleMobileSubmenu"
            >
              Курсы
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 ml-1 transform transition-transform duration-300"
                :class="isMobileSubmenuOpen ? 'rotate-180' : ''"
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
            <MobileSubmenu :isOpen="isMobileSubmenuOpen" />
          </li>
          <!-- Rest of the mobile menu items -->

          <li>
            <NuxtLink
              to="/tests"
              exact-active-class="bg-pink-500"
              class="block px-8 py-2 text-white transition-colors duration-300 ease-in-out hover:bg-pink-600"
              @click="closeDropdown"
            >
              Карты разговоров
            </NuxtLink>
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
              to="/contact"
              exact-active-class="bg-pink-500"
              class="block px-8 py-2 text-white transition-colors duration-300 ease-in-out hover:bg-pink-600"
              @click="closeDropdown"
            >
              Связь
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import DesktopSubmenu from "@/components/navigation/DesktopSubmenu.vue";
import MobileSubmenu from "@/components/navigation/MobileSubmenu.vue";

const isDropdownOpen = ref(false);
const isMobileSubmenuOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
  if (!isDropdownOpen.value) {
    isMobileSubmenuOpen.value = false;
  }
};

const toggleMobileSubmenu = () => {
  isMobileSubmenuOpen.value = !isMobileSubmenuOpen.value;
};

const closeDropdown = () => {
  isDropdownOpen.value = false;
  isMobileSubmenuOpen.value = false;
};

const handleOutsideClick = (event) => {
  const mobileMenu = document.querySelector('[data-menu="mobile"]');
  if (mobileMenu && !mobileMenu.contains(event.target)) {
    closeDropdown();
  }
};

onMounted(() => {
  document.addEventListener("click", handleOutsideClick);
});

onUnmounted(() => {
  document.removeEventListener("click", handleOutsideClick);
});
</script>
