<template>
  <!-- Hero Section - Modified for dark theme -->
  <section
    class="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800"
  >
    <!-- Decorative Elements -->
    <div
      class="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-20"
    ></div>
    <div
      class="absolute -top-10 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse"
      style="animation-duration: 5s"
    ></div>
    <div
      class="absolute -bottom-10 left-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse"
      style="animation-duration: 7s"
    ></div>

    <div class="container mx-auto px-4 py-16 md:py-24">
      <div class="max-w-4xl mx-auto text-center">
        <div class="animate-fadeIn">
          <h1
            class="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 mb-6 leading-tight animate-slideDown"
          >
            Ваш Путь к Личностному Росту
          </h1>
          <p
            class="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed animate-slideUp opacity-0"
            style="animation-delay: 0.3s"
          >
            Исследуйте себя, развивайтесь и достигайте своих целей с помощью
            наших
            <span class="font-semibold text-blue-400"
              >профессиональных инструментов</span
            >
          </p>
          <div
            class="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn opacity-0"
            style="animation-delay: 0.6s"
          >
            <NuxtLink
              to="/courses/courses"
              class="group relative inline-flex items-center justify-center px-8 py-3 bg-blue-500 text-white font-medium rounded-xl overflow-hidden transition-all hover:bg-blue-600"
            >
              <span class="relative z-10">Начать обучение</span>
              <div
                class="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-blue-600 transition-transform duration-300"
              ></div>
            </NuxtLink>
            <NuxtLink
              to="/profile"
              class="group inline-flex items-center justify-center px-8 py-3 bg-gray-800 text-blue-400 font-medium rounded-xl border-2 border-blue-500 hover:bg-gray-700 transition-colors"
            >
              Открыть профиль
              <i
                class="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"
              ></i>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup></script>

<style scoped>
@keyframes slideDown {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes slideUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  60% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
  }
}
.animate-slideDown {
  animation: slideDown 1.8s ease-out forwards;
}

.animate-slideUp {
  animation: slideUp 1.8s ease-out forwards;
}

.animate-fadeIn {
  animation: fadeIn 1.8s ease-out forwards;
}
</style>
