<template>
  <nav class="text-black p-4">
    <div
      class="container max-w-screen-xl w-full mx-auto flex justify-between items-center"
    >
      <!-- Brand/Logo -->
      <NuxtLink
        to="/"
        class="text-2xl font-bold hover:text-purple-400 focus:outline-none"
        aria-label="Home"
      >
        Anastasia
      </NuxtLink>

      <!-- Desktop Menu -->
      <ul class="hidden md:flex space-x-8">
        <li>
          <NuxtLink
            to="/free-resources"
            class="text-gray-800 text-lg font-semibold transition-colors duration-300 ease-in-out hover:text-purple-400"
          >
            Бесплатные материалы
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/courses"
            class="text-gray-800 text-lg font-semibold transition-colors duration-300 ease-in-out hover:text-purple-400"
          >
            Курсы
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/guides"
            class="text-gray-800 text-lg font-semibold transition-colors duration-300 ease-in-out hover:text-purple-400"
          >
            Гайды
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/tests"
            class="text-gray-800 text-lg font-semibold transition-colors duration-300 ease-in-out hover:text-purple-400"
          >
            Карты глубоких разговоров
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/blog"
            class="text-gray-800 text-lg font-semibold transition-colors duration-300 ease-in-out hover:text-purple-400"
          >
            Блог
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/about"
            class="text-gray-800 text-lg font-semibold transition-colors duration-300 ease-in-out hover:text-purple-400"
          >
            О проекте
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/contact"
            class="text-gray-800 text-lg font-semibold transition-colors duration-300 ease-in-out hover:text-purple-400"
          >
            Обратная связь
          </NuxtLink>
        </li>
      </ul>

      <!-- Hamburger Menu (Small Screens) -->
      <div class="relative md:hidden">
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
            'absolute -right-4 mt-4 bg-blue-400 py-4 rounded shadow-md w-40 overflow-hidden transition-all duration-700 ease-in-out transform',
            isDropdownOpen
              ? 'max-h-[400px] opacity-100 scale-100'
              : 'max-h-0 opacity-0 scale-95',
          ]"
        >
          <li class="text-white">
            <NuxtLink
              to="/free-resources"
              class="block px-8 py-2 transition-colors duration-300 ease-in-out hover:bg-blue-500"
              @click="closeDropdown"
            >
              Бесплатные материалы
            </NuxtLink>
          </li>
          <li class="text-white">
            <NuxtLink
              to="/courses"
              class="block px-8 py-2 transition-colors duration-500 ease-in-out hover:bg-blue-500"
              @click="closeDropdown"
            >
              Курсы
            </NuxtLink>
          </li>
          <li class="text-white">
            <NuxtLink
              to="/guides"
              class="block px-8 py-2 transition-colors duration-500 ease-in-out hover:bg-blue-500"
              @click="closeDropdown"
            >
              Гайды
            </NuxtLink>
          </li>
          <li class="text-white">
            <NuxtLink
              to="/tests"
              class="block px-8 py-2 transition-colors duration-500 ease-in-out hover:bg-blue-500"
              @click="closeDropdown"
            >
              Карты глубоких разговоров
            </NuxtLink>
          </li>
          <li class="text-white">
            <NuxtLink
              to="/blog"
              class="block px-8 py-2 transition-colors duration-500 ease-in-out hover:bg-blue-500"
              @click="closeDropdown"
            >
              Блог
            </NuxtLink>
          </li>
          <li class="text-white">
            <NuxtLink
              to="/about"
              class="block px-8 py-2 transition-colors duration-500 ease-in-out hover:bg-blue-500"
              @click="closeDropdown"
            >
              О проекте
            </NuxtLink>
          </li>
          <li class="text-white">
            <NuxtLink
              to="/contact"
              class="block px-8 py-2 transition-colors duration-500 ease-in-out hover:bg-blue-500"
              @click="closeDropdown"
            >
              Обратная связь
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";

// State for dropdown visibility
const isDropdownOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const closeDropdown = () => {
  isDropdownOpen.value = false;
};
</script>
