<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 transition-colors duration-500">
    <div class="container mx-auto max-w-6xl px-4 xl:px-0 py-8 sm:py-12">
      <Breadcrumbs />
      
      <!-- Hero Section -->
      <section class="mb-16 text-center animate-fade-in-up">
        <div class="inline-flex items-center justify-center p-3 mb-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300">
          <i class="fas fa-fingerprint text-2xl"></i>
        </div>
        <h1 class="text-4xl sm:text-6xl font-bold mb-6 tracking-tight">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            Большая Пятёрка
          </span>
        </h1>
        <p class="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">
          Исследуйте свою личность через научно обоснованную модель "Big 5". 
          Узнайте свои сильные стороны и зоны роста в пяти ключевых измерениях.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink
            to="/space/tests/big-5-model/assessment"
            class="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-500 hover:to-indigo-500 shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-1"
          >
            <i class="fas fa-play mr-2"></i>
            Пройти тест
          </NuxtLink>
          <NuxtLink
            to="/space/tests/big-5-model/explanation"
            class="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-slate-700 dark:text-slate-200 transition-all duration-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-blue-300 dark:hover:border-blue-700"
          >
            <i class="fas fa-book-open mr-2"></i>
            О методике
          </NuxtLink>
        </div>
      </section>

      <!-- Features Grid -->
      <section class="grid md:grid-cols-3 gap-8 mb-16">
        <div class="bg-white/80 dark:bg-slate-900/50 backdrop-blur-xl p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300 group">
          <div class="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <i class="fas fa-brain text-2xl text-blue-600 dark:text-blue-400"></i>
          </div>
          <h3 class="text-xl font-bold mb-3 text-slate-900 dark:text-white">Самопознание</h3>
          <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
            Глубокое понимание своих реакций, мотивации и поведения в различных ситуациях.
          </p>
        </div>

        <div class="bg-white/80 dark:bg-slate-900/50 backdrop-blur-xl p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300 group">
          <div class="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <i class="fas fa-users text-2xl text-indigo-600 dark:text-indigo-400"></i>
          </div>
          <h3 class="text-xl font-bold mb-3 text-slate-900 dark:text-white">Отношения</h3>
          <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
            Улучшение коммуникации и взаимопонимания с окружающими через знание психотипов.
          </p>
        </div>

        <div class="bg-white/80 dark:bg-slate-900/50 backdrop-blur-xl p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300 group">
          <div class="w-12 h-12 rounded-xl bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <i class="fas fa-briefcase text-2xl text-cyan-600 dark:text-cyan-400"></i>
          </div>
          <h3 class="text-xl font-bold mb-3 text-slate-900 dark:text-white">Карьера</h3>
          <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
            Определение профессиональных склонностей и оптимальной рабочей среды.
          </p>
        </div>
      </section>

      <!-- Quote Section -->
      <section class="relative rounded-3xl overflow-hidden p-8 sm:p-12 text-center">
        <div class="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900"></div>
        <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div class="relative z-10 max-w-3xl mx-auto">
          <i class="fas fa-quote-left text-4xl text-blue-500/50 mb-6"></i>
          <blockquote class="text-2xl sm:text-3xl font-serif text-slate-200 mb-6 italic">
            "Личность — это то, что предсказывает поведение человека в определенной ситуации."
          </blockquote>
          <cite class="text-blue-400 font-medium not-italic">— Рэймонд Кеттелл</cite>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import Breadcrumbs from "~/components/ui/Breadcrumbs.vue";

definePageMeta({
  layout: "laboratory",
});
</script>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

