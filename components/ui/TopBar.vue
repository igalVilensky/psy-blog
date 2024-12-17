<template>
  <nav class="text-black">
    <div
      class="container max-w-6xl w-full mx-auto flex justify-between items-center p-4"
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
      <ul class="hidden xl:flex space-x-8">
        <li>
          <NuxtLink
            to="/free-resources"
            exact-active-class="text-pink-500"
            class="text-gray-800 text-lg font-semibold transition-colors duration-300 ease-in-out hover:text-pink-500"
          >
            Бесплатные материалы
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/courses"
            exact-active-class="text-pink-500"
            class="text-gray-800 text-lg font-semibold transition-colors duration-300 ease-in-out hover:text-pink-500"
          >
            Курсы
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/guides"
            exact-active-class="text-pink-500"
            class="text-gray-800 text-lg font-semibold transition-colors duration-300 ease-in-out hover:text-pink-500"
          >
            Гайды
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/tests"
            exact-active-class="text-pink-500"
            class="text-gray-800 text-lg font-semibold transition-colors duration-300 ease-in-out hover:text-pink-500"
          >
            Карты разговоров
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/blog"
            exact-active-class="text-pink-500"
            class="text-gray-800 text-lg font-semibold transition-colors duration-300 ease-in-out hover:text-pink-500"
          >
            Блог
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/about"
            exact-active-class="text-pink-500"
            class="text-gray-800 text-lg font-semibold transition-colors duration-300 ease-in-out hover:text-pink-500"
          >
            О проекте
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/contact"
            exact-active-class="text-pink-500"
            class="text-gray-800 text-lg font-semibold transition-colors duration-300 ease-in-out hover:text-pink-500"
          >
            Связь
          </NuxtLink>
        </li>
      </ul>

      <!-- Hamburger Menu (Small Screens) -->
      <div class="relative xl:hidden">
        <!-- Animated Hamburger Menu Button -->
        <button
          @click="toggleDropdown"
          class="focus:outline-none flex flex-col items-center justify-center w-8 h-8 relative"
          aria-label="Toggle Menu"
        >
          <!-- Top Line -->
          <span
            class="block w-6 h-0.5 bg-black transition-all duration-500 ease-in-out"
            :class="
              isDropdownOpen ? 'rotate-45 translate-y-2' : 'translate-y-0'
            "
          ></span>
          <!-- Middle Line -->
          <span
            class="block w-6 h-0.5 bg-black mt-1.5 transition-all duration-500 ease-in-out"
            :class="isDropdownOpen ? 'opacity-0' : 'opacity-100'"
          ></span>
          <!-- Bottom Line -->
          <span
            class="block w-6 h-0.5 bg-black mt-1.5 transition-all duration-500 ease-in-out"
            :class="
              isDropdownOpen ? '-rotate-45 -translate-y-2' : 'translate-y-0'
            "
          ></span>
        </button>

        <!-- Dropdown Menu -->
        <ul
          :class="[
            'absolute -right-4 mt-4 bg-pink-400 py-4 rounded shadow-md w-40 overflow-hidden transition-all duration-700 ease-in-out transform z-50',
            isDropdownOpen
              ? 'max-h-[400px] opacity-100 scale-100'
              : 'max-h-0 opacity-0 scale-95',
          ]"
        >
          <li>
            <NuxtLink
              to="/free-resources"
              exact-active-class="bg-pink-500"
              class="block px-8 py-2 text-white transition-colors duration-300 ease-in-out hover:bg-pink-600"
              @click="closeDropdown"
            >
              Бесплатные материалы
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/courses"
              exact-active-class="bg-pink-500"
              class="block px-8 py-2 text-white transition-colors duration-300 ease-in-out hover:bg-pink-600"
              @click="closeDropdown"
            >
              Курсы
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/guides"
              exact-active-class="bg-pink-500"
              class="block px-8 py-2 text-white transition-colors duration-300 ease-in-out hover:bg-pink-600"
              @click="closeDropdown"
            >
              Гайды
            </NuxtLink>
          </li>
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

// State for dropdown visibility
const isDropdownOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const closeDropdown = () => {
  isDropdownOpen.value = false;
};

const handleOutsideClick = (event) => {
  const dropdown = document.querySelector(".xl:hidden");
  if (!dropdown.contains(event.target)) {
    closeDropdown();
  }
};

// Attach and detach event listeners
onMounted(() => {
  document.addEventListener("click", handleOutsideClick);
});
onUnmounted(() => {
  document.removeEventListener("click", handleOutsideClick);
});
</script>
