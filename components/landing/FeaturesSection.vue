<template>
  <section class="relative py-32 px-4 py-12">
    <!-- Subtle separation elements -->
    <div class="absolute inset-0 bg-slate-900">
      <div class="absolute inset-0 bg-grid-slate-800/20"></div>
      <div
        class="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent"
      ></div>
      <div
        class="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent"
      ></div>
    </div>

    <div class="container mx-auto max-w-6xl relative">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2
          class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-cyan-300 mb-4"
        >
          Преимущества нашей платформы
        </h2>
        <p class="text-slate-400 max-w-2xl mx-auto">
          Мы объединяем современные методики психологии с технологиями для
          создания персонализированного пути развития
        </p>
      </div>

      <!-- Features Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Personal Profile Feature -->
        <div
          class="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-transparent hover:border-sky-500/20 transition-all duration-300 group"
        >
          <div
            class="bg-gradient-to-br from-sky-500 to-cyan-400 p-4 rounded-xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
          >
            <i class="fas fa-fingerprint text-white text-2xl"></i>
          </div>
          <h3 class="text-xl font-semibold mb-4 text-white">
            Персональный профиль
          </h3>
          <p class="text-slate-400">
            Узнайте свои сильные стороны, паттерны поведения и потенциальные
            зоны роста на основе вашего уникального профиля
          </p>
          <div class="mt-6 pt-4 border-t border-white/10">
            <NuxtLink
              to="/features/profile"
              class="text-sky-400 text-sm flex items-center hover:text-sky-300 transition-colors"
            >
              Узнать больше
              <i class="fas fa-arrow-right ml-2 text-xs"></i>
            </NuxtLink>
          </div>
        </div>

        <!-- Smart Recommendations Feature -->
        <div
          class="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-transparent hover:border-cyan-500/20 transition-all duration-300 group"
        >
          <div
            class="bg-gradient-to-br from-cyan-500 to-emerald-400 p-4 rounded-xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
          >
            <i class="fas fa-brain text-white text-2xl"></i>
          </div>
          <h3 class="text-xl font-semibold mb-4 text-white">
            Умные рекомендации
          </h3>
          <p class="text-slate-400">
            Получайте персонализированные материалы и упражнения на основе
            вашего профиля и целей развития
          </p>
          <div class="mt-6 pt-4 border-t border-white/10">
            <NuxtLink
              to="/features/recommendations"
              class="text-cyan-400 text-sm flex items-center hover:text-cyan-300 transition-colors"
            >
              Узнать больше
              <i class="fas fa-arrow-right ml-2 text-xs"></i>
            </NuxtLink>
          </div>
        </div>

        <!-- Progress Tracking Feature -->
        <div
          class="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-transparent hover:border-purple-500/20 transition-all duration-300 group"
        >
          <div
            class="bg-gradient-to-br from-purple-500 to-fuchsia-400 p-4 rounded-xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
          >
            <i class="fas fa-chart-line text-white text-2xl"></i>
          </div>
          <h3 class="text-xl font-semibold mb-4 text-white">
            Отслеживание прогресса
          </h3>
          <p class="text-slate-400">
            Наблюдайте за своим развитием и получайте insights для дальнейшего
            роста с помощью аналитики
          </p>
          <div class="mt-6 pt-4 border-t border-white/10">
            <NuxtLink
              to="/features/progress"
              class="text-purple-400 text-sm flex items-center hover:text-purple-300 transition-colors"
            >
              Узнать больше
              <i class="fas fa-arrow-right ml-2 text-xs"></i>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bg-grid-slate-800\/20 {
  background-size: 30px 30px;
  background-image: linear-gradient(
      to right,
      rgb(51 65 85 / 0.2) 1px,
      transparent 1px
    ),
    linear-gradient(to bottom, rgb(51 65 85 / 0.2) 1px, transparent 1px);
}
</style>
