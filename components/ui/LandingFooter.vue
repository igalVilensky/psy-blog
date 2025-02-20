<template>
  <footer class="bg-gray-100 text-gray-700 py-8">
    <div class="container mx-auto px-6 md:px-12 lg:px-24">
      <div
        class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left"
      >
        <!-- Logo & Short Description -->
        <div>
          <h2 class="text-2xl font-semibold">YourBrand</h2>
          <p class="text-sm mt-2">
            Современные психологические инструменты для вашего развития.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-medium mb-2">Меню</h3>
          <ul class="text-sm space-y-2">
            <li>
              <NuxtLink to="/about" class="hover:underline">О нас</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/features" class="hover:underline"
                >Возможности</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/pricing" class="hover:underline">Тарифы</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact" class="hover:underline"
                >Контакты</NuxtLink
              >
            </li>
          </ul>
        </div>

        <!-- Social & Legal -->
        <div>
          <h3 class="text-lg font-medium mb-2">Свяжитесь с нами</h3>
          <div class="flex justify-center md:justify-start space-x-4 text-xl">
            <a href="#" class="hover:text-blue-500"
              ><i class="fab fa-facebook"></i
            ></a>
            <a href="#" class="hover:text-blue-400"
              ><i class="fab fa-twitter"></i
            ></a>
            <a href="#" class="hover:text-red-500"
              ><i class="fab fa-youtube"></i
            ></a>
          </div>
          <p class="text-xs mt-4 text-gray-500">
            © {{ new Date().getFullYear() }} YourBrand. Все права защищены.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
