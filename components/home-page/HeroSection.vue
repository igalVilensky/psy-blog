<template>
  <!-- Hero Section with a Bright Layout -->
  <section
    class="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-blue-50 to-white"
  >
    <!-- Decorative Elements -->

    <div
      class="absolute -top-10 right-0 w-96 h-96 bg-[#3498DB]/20 rounded-full blur-3xl animate-pulse"
      style="animation-duration: 5s"
    ></div>
    <div
      class="absolute -bottom-10 left-0 w-96 h-96 bg-[#9B59B6]/20 rounded-full blur-3xl animate-pulse"
      style="animation-duration: 7s"
    ></div>

    <div class="container mx-auto px-4 py-16 md:py-24">
      <div class="max-w-4xl mx-auto text-center">
        <div class="animate-fadeIn">
          <h1
            class="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-[#1A1F35] to-indigo-600 mb-6 leading-tight animate-slideDown"
          >
            Ваш Путь к Личностному Росту
          </h1>
          <p
            class="text-lg md:text-xl text-[#2D2D2D] mb-8 leading-relaxed animate-slideUp opacity-0"
            style="animation-delay: 0.3s"
          >
            Исследуйте себя, развивайтесь и достигайте своих целей с помощью
            наших
            <span class="font-semibold text-[#3498DB]"
              >профессиональных инструментов</span
            >
          </p>
          <div
            class="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn opacity-0"
            style="animation-delay: 0.6s"
          >
            <NuxtLink
              to="/courses/courses"
              class="group relative inline-flex items-center justify-center px-8 py-3 bg-[#3498DB] text-white font-medium rounded-xl overflow-hidden transition-all hover:bg-[#2980B9]"
            >
              <span class="relative z-10">Начать обучение</span>
              <div
                class="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-[#2980B9] transition-transform duration-300"
              ></div>
            </NuxtLink>
            <NuxtLink
              to="/profile"
              class="group inline-flex items-center justify-center px-8 py-3 bg-[#FFFFFF] text-[#3498DB] font-medium rounded-xl border-2 border-[#2980B9] hover:bg-[#F8F9FA] transition-colors"
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
    transform: translateY(-50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes slideUp {
  0% {
    opacity: 0;
    transform: translateY(50px);
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
