<template>
  <nav class="bg-blue-600 text-white p-4">
    <div class="container mx-auto flex justify-between items-center">
      <!-- Brand/Logo -->
      <div class="text-lg font-bold">Psy Blog</div>

      <!-- Desktop Menu -->
      <ul class="hidden md:flex space-x-4">
        <li>
          <NuxtLink to="/" class="hover:underline hover:text-gray-200"
            >Home</NuxtLink
          >
        </li>
        <li>
          <NuxtLink to="/about" class="hover:underline">About</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/contact" class="hover:underline">Contact</NuxtLink>
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
            class="block w-6 h-0.5 bg-white transition-all duration-300 ease-in-out"
            :class="
              isDropdownOpen
                ? 'transform rotate-45 translate-y-2'
                : 'translate-y-0'
            "
          ></span>
          <!-- Middle Line -->
          <span
            class="block w-6 h-0.5 bg-white mt-1.5 transition-all duration-300 ease-in-out"
            :class="isDropdownOpen ? 'opacity-0' : 'opacity-100'"
          ></span>
          <!-- Bottom Line -->
          <span
            class="block w-6 h-0.5 bg-white mt-1.5 transition-all duration-300 ease-in-out"
            :class="
              isDropdownOpen
                ? 'transform -rotate-45 -translate-y-2'
                : 'translate-y-0'
            "
          ></span>
        </button>

        <!-- Dropdown Menu -->
        <ul
          :class="[
            'absolute right-0 mt-2 bg-white text-black rounded shadow-md w-40 transform transition-transform duration-300 ease-in-out',
            isDropdownOpen
              ? 'scale-100 opacity-100'
              : 'scale-95 opacity-0 pointer-events-none',
          ]"
        >
          <li class="border-b border-gray-200">
            <NuxtLink
              to="/"
              class="block px-4 py-2 hover:bg-gray-100"
              @click="closeDropdown"
            >
              Home
            </NuxtLink>
          </li>
          <li class="border-b border-gray-200">
            <NuxtLink
              to="/about"
              class="block px-4 py-2 hover:bg-gray-100"
              @click="closeDropdown"
            >
              About
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/contact"
              class="block px-4 py-2 hover:bg-gray-100"
              @click="closeDropdown"
            >
              Contact
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
