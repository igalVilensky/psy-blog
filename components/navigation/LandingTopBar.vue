<template>
  <nav class="fixed top-0 left-0 w-full bg-white shadow-md z-50">
    <div
      class="container mx-auto px-6 md:px-12 lg:px-24 flex justify-between items-center py-4"
    >
      <!-- Logo -->
      <NuxtLink
        to="/"
        class="text-2xl font-bold text-gray-900 hover:text-blue-600 transition"
      >
        <i class="fas fa-brain mr-2 text-blue-500"></i> YourBrand
      </NuxtLink>

      <!-- Desktop Menu -->
      <div class="hidden md:flex items-center space-x-6">
        <NuxtLink to="/about" class="nav-link">О нас</NuxtLink>
        <NuxtLink to="/features" class="nav-link">Возможности</NuxtLink>
        <NuxtLink to="/pricing" class="nav-link">Тарифы</NuxtLink>
        <NuxtLink to="/contact" class="nav-link">Контакты</NuxtLink>
      </div>

      <!-- Auth Buttons -->
      <div class="hidden md:flex items-center space-x-4">
        <NuxtLink to="/login" class="nav-link">
          <i class="fas fa-sign-in-alt"></i> Войти
        </NuxtLink>
        <NuxtLink
          to="/signup"
          class="px-6 py-2 bg-blue-600 text-white rounded-xl text-lg font-medium hover:bg-blue-700 transition"
        >
          <i class="fas fa-user-plus"></i> Регистрация
        </NuxtLink>
      </div>

      <!-- Mobile Menu Button -->
      <button
        @click="toggleMenu"
        class="md:hidden text-2xl text-gray-900 focus:outline-none"
      >
        <i class="fas fa-bars"></i>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isMenuOpen" class="md:hidden bg-white shadow-md">
      <div class="flex flex-col items-center space-y-4 py-4">
        <NuxtLink to="/about" class="mobile-nav-link">О нас</NuxtLink>
        <NuxtLink to="/features" class="mobile-nav-link">Возможности</NuxtLink>
        <NuxtLink to="/pricing" class="mobile-nav-link">Тарифы</NuxtLink>
        <NuxtLink to="/contact" class="mobile-nav-link">Контакты</NuxtLink>
        <NuxtLink to="/login" class="mobile-nav-link">Войти</NuxtLink>
        <NuxtLink
          to="/signup"
          class="px-6 py-2 bg-blue-600 text-white rounded-xl text-lg font-medium hover:bg-blue-700 transition"
        >
          Регистрация
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";

const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<style scoped>
/* Desktop Navigation Links */
.nav-link {
  @apply text-gray-700 text-lg font-medium hover:text-blue-600 transition relative;
}
.nav-link::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -4px;
  width: 0;
  height: 2px;
  background-color: #2563eb;
  transition: width 0.3s ease, left 0.3s ease;
}
.nav-link:hover::after {
  width: 100%;
  left: 0;
}

/* Mobile Navigation Links */
.mobile-nav-link {
  @apply text-gray-700 text-lg font-medium hover:text-blue-600 transition;
}
</style>
