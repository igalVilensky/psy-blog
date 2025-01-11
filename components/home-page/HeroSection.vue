<template>
  <!-- Hero Section -->
  <section
    class="relative bg-gradient-to-b from-[#1A1F35] to-[#1E293B] overflow-hidden text-white"
  >
    <!-- Organic Shapes -->
    <div class="absolute inset-0">
      <!-- Multiple organic shapes with different colors -->
      <div
        class="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-[#0EA5E9]/10 to-[#22D3EE]/10 rounded-full blur-3xl animate-slow-drift"
      ></div>
      <div
        class="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gradient-to-r from-[#F59E0B]/10 to-[#F97316]/10 rounded-full blur-3xl animate-slow-pulse"
      ></div>
      <div
        class="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-r from-[#E879F9]/10 to-[#C084FC]/10 rounded-full blur-3xl animate-slow-float"
      ></div>
    </div>

    <!-- Content -->
    <div class="relative container mx-auto px-4 max-w-6xl py-24 md:py-32">
      <div class="text-center">
        <!-- Heading -->
        <h1
          class="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#0EA5E9] to-[#22D3EE] mb-6 animate-slideDown"
        >
          Ваш Путь к Личностному Росту
        </h1>
        <!-- Subheading -->
        <p
          class="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed animate-slideUp opacity-0"
          style="animation-delay: 0.3s"
        >
          Исследуйте себя, развивайтесь и достигайте своих целей с помощью наших
          <span class="font-semibold text-[#22D3EE]"
            >профессиональных инструментов</span
          >
        </p>
        <!-- Buttons -->
        <div
          class="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn opacity-0"
          style="animation-delay: 0.6s"
        >
          <NuxtLink
            to="/courses/courses"
            class="group relative inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] text-white font-medium rounded-lg overflow-hidden transition-all hover:from-[#22D3EE] hover:to-[#C084FC]"
          >
            <span class="relative z-10">Начать обучение</span>
            <div
              class="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-[#22D3EE] to-[#C084FC] transition-transform duration-300"
            ></div>
          </NuxtLink>
          <NuxtLink
            to="/profile"
            class="group inline-flex items-center justify-center px-8 py-3 bg-transparent text-[#0EA5E9] font-medium rounded-lg border-2 border-[#0EA5E9]/50 hover:bg-[#0EA5E9]/10 transition-colors"
          >
            Открыть профиль
            <i
              class="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"
            ></i>
          </NuxtLink>
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
