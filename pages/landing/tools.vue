<template>
  <section class="relative min-h-[90vh] bg-slate-900 overflow-hidden">
    <div class="absolute inset-0">
      <div
        class="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-900/20"
      ></div>
    </div>

    <div class="container mx-auto px-6 sm:px-0 relative z-10 py-16 sm:py-24">
      <div class="text-center mb-12">
        <h1 class="text-4xl lg:text-5xl font-bold text-white leading-tight">
          Полезные инструменты для самопознания
        </h1>
        <p class="text-lg text-slate-300 max-w-2xl mx-auto mt-4">
          Используйте наши проверенные инструменты для глубокого анализа и
          личностного роста.
        </p>
      </div>

      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <div
          class="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/80 shadow-xl shadow-slate-900/50 transform hover:scale-102 transition-all duration-500"
        >
          <h2 class="text-2xl font-semibold text-white mb-4">
            Анализ и понимание эмоций
          </h2>
          <p class="text-slate-300 mb-6">
            <strong>Эмоциональный Барометр</strong> — инструмент для оценки и
            осознания эмоционального состояния. Он помогает отслеживать динамику
            эмоций, анализировать их влияние и находить эффективные стратегии
            управления.
          </p>
          <NuxtLink
            to="/tools/emotional-barometer"
            class="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-xl font-medium text-center transition-all duration-300 shadow-lg shadow-blue-900/30"
          >
            Подробнее
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
definePageMeta({
  layout: "landing", // Use the new landing layout
});
</script>
