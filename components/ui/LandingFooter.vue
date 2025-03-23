<template>
  <footer class="bg-[#EAEFF2] text-[#333333] py-10 border-t border-[#D1D9E0]">
    <div class="container mx-auto px-6 xl:px-0">
      <div
        class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left"
      >
        <!-- Logo & Short Description -->
        <div>
          <h2
            class="text-2xl font-semibold text-[#1E3A8A] flex items-center justify-center md:justify-start"
          >
            <i class="fas fa-brain mr-2 text-[#2D89EF]"></i> PsyBlog
          </h2>
          <p class="text-sm mt-3 leading-relaxed">
            Современные психологические инструменты для вашего развития.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-medium mb-3 text-[#1E3A8A]">Меню</h3>
          <ul class="text-sm space-y-3">
            <li>
              <NuxtLink to="/about" class="footer-link">О нас</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/features" class="footer-link"
                >Возможности</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/pricing" class="footer-link">Тарифы</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact" class="footer-link">Контакты</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Social & Legal -->
        <div>
          <h3 class="text-lg font-medium mb-3 text-[#1E3A8A]">
            Свяжитесь с нами
          </h3>
          <div
            class="flex justify-center md:justify-start space-x-5 text-xl mb-4"
          >
            <a
              href="#"
              class="w-10 h-10 flex items-center justify-center rounded-full bg-white text-[#2D89EF] hover:bg-[#2D89EF] hover:text-white transition-colors duration-200 shadow-sm"
              ><i class="fab fa-facebook"></i
            ></a>
            <a
              href="#"
              class="w-10 h-10 flex items-center justify-center rounded-full bg-white text-[#2D89EF] hover:bg-[#2D89EF] hover:text-white transition-colors duration-200 shadow-sm"
              ><i class="fab fa-twitter"></i
            ></a>
            <a
              href="#"
              class="w-10 h-10 flex items-center justify-center rounded-full bg-white text-[#F4A261] hover:bg-[#F4A261] hover:text-white transition-colors duration-200 shadow-sm"
              ><i class="fab fa-youtube"></i
            ></a>
          </div>
          <p class="text-xs mt-4 text-gray-500">
            © {{ new Date().getFullYear() }} YourBrand. Все права защищены.
          </p>
        </div>
      </div>

      <!-- Bottom divider and additional links -->
      <div
        class="mt-8 pt-6 border-t border-[#D1D9E0] text-center text-xs text-gray-500"
      >
        <div class="flex flex-wrap justify-center space-x-4 mb-2">
          <NuxtLink to="/privacy" class="hover:text-[#2D89EF] transition-colors"
            >Политика конфиденциальности</NuxtLink
          >
          <NuxtLink to="/terms" class="hover:text-[#2D89EF] transition-colors"
            >Условия использования</NuxtLink
          >
          <NuxtLink to="/cookies" class="hover:text-[#2D89EF] transition-colors"
            >Политика cookie</NuxtLink
          >
        </div>
        <p>Разработано с заботой для вашего психологического благополучия</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-link {
  @apply text-[#333333] hover:text-[#2D89EF] transition-colors duration-200 relative inline-block;
}
.footer-link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 0;
  height: 1px;
  background-color: #2d89ef;
  transition: width 0.3s ease;
  border-radius: 1px;
}
.footer-link:hover::after {
  width: 100%;
}
</style>
