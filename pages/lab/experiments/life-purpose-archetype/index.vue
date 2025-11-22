<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 transition-colors duration-500">
    <div class="container mx-auto max-w-6xl px-4 xl:px-0 py-8 sm:py-12">
      <Breadcrumbs />
      
      <!-- Hero Section -->
      <section class="mb-16 text-center animate-fade-in-up">
        <div class="inline-flex items-center justify-center p-3 mb-6 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300">
          <i class="fas fa-fingerprint text-2xl"></i>
        </div>
        <h1 class="text-4xl sm:text-6xl font-bold mb-6 tracking-tight">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
            Архетип Предназначения
          </span>
        </h1>
        <p class="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">
          Раскройте свою уникальную роль в мире через глубинную психологию архетипов. 
          Поймите свои истинные мотивы, сильные стороны и путь к самореализации.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink
            to="/lab/experiments/life-purpose-archetype/assessment"
            class="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl hover:from-purple-500 hover:to-pink-500 shadow-lg hover:shadow-purple-500/25 transform hover:-translate-y-1"
          >
            <i class="fas fa-play mr-2"></i>
            Начать исследование
          </NuxtLink>
          <NuxtLink
            to="/lab/experiments/life-purpose-archetype/explanation"
            class="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-slate-700 dark:text-slate-200 transition-all duration-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-purple-300 dark:hover:border-purple-700"
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
            <i class="fas fa-compass text-2xl text-blue-600 dark:text-blue-400"></i>
          </div>
          <h3 class="text-xl font-bold mb-3 text-slate-900 dark:text-white">Поиск Пути</h3>
          <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
            Определите вектор своего развития и сферы, где ваши таланты раскроются максимально полно.
          </p>
        </div>

        <div class="bg-white/80 dark:bg-slate-900/50 backdrop-blur-xl p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300 group">
          <div class="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <i class="fas fa-mask text-2xl text-purple-600 dark:text-purple-400"></i>
          </div>
          <h3 class="text-xl font-bold mb-3 text-slate-900 dark:text-white">Тень и Свет</h3>
          <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
            Узнайте не только о своих сильных сторонах, но и о теневых аспектах, которые могут тормозить ваш рост.
          </p>
        </div>

        <div class="bg-white/80 dark:bg-slate-900/50 backdrop-blur-xl p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300 group">
          <div class="w-12 h-12 rounded-xl bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <i class="fas fa-star text-2xl text-pink-600 dark:text-pink-400"></i>
          </div>
          <h3 class="text-xl font-bold mb-3 text-slate-900 dark:text-white">Реализация</h3>
          <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
            Получите конкретные рекомендации по профессиональной реализации и личностному росту.
          </p>
        </div>
      </section>

      <!-- Quote Section -->
      <section class="relative rounded-3xl overflow-hidden p-8 sm:p-12 text-center">
        <div class="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900"></div>
        <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div class="relative z-10 max-w-3xl mx-auto">
          <i class="fas fa-quote-left text-4xl text-purple-500/50 mb-6"></i>
          <blockquote class="text-2xl sm:text-3xl font-serif text-slate-200 mb-6 italic">
            "Привилегия всей жизни — стать тем, кто ты есть на самом деле."
          </blockquote>
          <cite class="text-purple-400 font-medium not-italic">— Карл Густав Юнг</cite>
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
