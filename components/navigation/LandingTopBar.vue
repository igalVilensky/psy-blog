<template>
  <nav class="fixed top-0 left-0 w-full bg-[#EAEFF2] shadow-sm z-50">
    <div
      class="container mx-auto px-6 xl:px-0 flex justify-between items-center py-4"
    >
      <!-- Логотип -->
      <NuxtLink
        to="/"
        class="text-2xl font-bold text-[#1E3A8A] hover:text-[#2D89EF] transition-colors duration-200 flex items-center"
      >
        <i class="fas fa-brain mr-2 text-[#2D89EF]"></i> PsyPlatform
      </NuxtLink>

      <!-- Меню для десктопа -->
      <div class="hidden lg:flex items-center space-x-6">
        <NuxtLink to="/landing/tests" class="nav-link">Тесты</NuxtLink>
        <NuxtLink to="/landing/tools" class="nav-link">Инструменты</NuxtLink>
        <NuxtLink to="/landing/courses" class="nav-link">Курсы</NuxtLink>
        <NuxtLink to="/blog" class="nav-link">Блог</NuxtLink>
        <NuxtLink to="/landing/about" class="nav-link">О проекте</NuxtLink>
        <NuxtLink to="/contact" class="nav-link">Контакты</NuxtLink>
      </div>

      <!-- Кнопки авторизации (десктоп) -->
      <div class="hidden lg:flex items-center space-x-4">
        <NuxtLink to="/login" class="nav-link flex items-center">
          <i class="fas fa-sign-in-alt mr-1"></i> Войти
        </NuxtLink>
        <NuxtLink
          to="/signup"
          class="px-5 py-2 bg-[#F4A261] text-white rounded-md font-medium hover:bg-[#FF8C42] transition duration-200 shadow-sm"
        >
          <i class="fas fa-user-plus mr-1"></i> Регистрация
        </NuxtLink>
      </div>

      <!-- Кнопка для мобильного меню -->
      <button
        @click="toggleMenu"
        class="lg:hidden text-2xl text-[#333333] focus:outline-none hover:text-[#2D89EF] transition-colors duration-200"
      >
        <i class="fas fa-bars"></i>
      </button>
    </div>

    <!-- Мобильное меню -->
    <div
      v-if="isMenuOpen"
      class="lg:hidden bg-white shadow-md rounded-b-lg overflow-hidden"
    >
      <div class="flex flex-col items-center space-y-4 py-5 px-4">
        <NuxtLink to="/tests" class="mobile-nav-link">Тесты</NuxtLink>
        <NuxtLink to="/tools" class="mobile-nav-link">Инструменты</NuxtLink>
        <NuxtLink to="/courses" class="mobile-nav-link">Курсы</NuxtLink>
        <NuxtLink to="/blog" class="mobile-nav-link">Блог</NuxtLink>
        <NuxtLink to="/about" class="mobile-nav-link">О проекте</NuxtLink>
        <NuxtLink to="/contact" class="mobile-nav-link">Контакты</NuxtLink>
        <div class="w-full h-px bg-[#EAEFF2] my-2"></div>
        <NuxtLink
          to="/login"
          class="mobile-nav-link flex items-center justify-center"
        >
          <i class="fas fa-sign-in-alt mr-2"></i> Войти
        </NuxtLink>
        <NuxtLink
          to="/signup"
          class="w-full text-center px-6 py-2 bg-[#F4A261] text-white rounded-md font-medium hover:bg-[#FF8C42] transition duration-200"
        >
          <i class="fas fa-user-plus mr-1"></i> Регистрация
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
/* Десктопные ссылки */
.nav-link {
  @apply text-[#333333] text-lg font-medium hover:text-[#2D89EF] transition-colors duration-200 relative;
}
.nav-link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -4px;
  width: 0;
  height: 2px;
  background-color: #2d89ef;
  transition: width 0.3s ease;
  border-radius: 2px;
}
.nav-link:hover::after {
  width: 100%;
}

/* Мобильные ссылки */
.mobile-nav-link {
  @apply text-[#333333] text-lg font-medium hover:text-[#2D89EF] transition-colors duration-200 w-full text-center py-1;
}
</style>
