<template>
  <!-- Hero Content -->
  <div class="flex-1 pt-14 lg:pt-0 overflow-y-auto bg-gradient-to-br from-zinc-50/50 to-white dark:from-zinc-950/50 dark:to-black">
    <div class="relative p-6 lg:p-8">
      <!-- Background Visualizer -->
      <div class="absolute inset-0 z-0 pointer-events-none opacity-40 md:opacity-60">
        <NeuralRewireVisualizer />
        <div
          class="absolute inset-0 bg-gradient-to-b from-zinc-50/80 via-zinc-50/20 to-zinc-50/80 dark:from-zinc-950/80 dark:via-zinc-950/20 dark:to-zinc-950/80">
        </div>
      </div>
      <!-- Hero Content -->
      <div class="relative z-10 max-w-4xl mx-auto text-center py-12 lg:py-20">
        <!-- Brand Title -->
        <div class="flex justify-center mb-8">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-zinc-900 dark:bg-white flex items-center justify-center rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-800">
              <i class="fas fa-flask text-white dark:text-zinc-900 text-lg"></i>
            </div>
            <h1 class="text-4xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">
              MindQLab
            </h1>
          </div>
        </div>

        <!-- Main Heading -->
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-black text-zinc-900 dark:text-white mb-6 leading-tight">
          Тренировки мозга и саморазвитие
        </h2>

        <!-- Description -->
        <p class="text-base md:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
          Пространство для глубокого понимания себя и системного развития.
          <span class="font-bold text-cyan-600 dark:text-cyan-400">10–15-минутные</span> сессии: когнитивные
          упражнения,
          медитации, тесты и персональная аналитика прогресса.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <NuxtLink to="/space/tests"
            class="group relative px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-sm font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-cyan-500/25 transition-all hover:-translate-y-0.5 overflow-hidden">
            <div
              class="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000">
            </div>
            <span class="relative flex items-center gap-3">
              <i class="fas fa-vial"></i>
              Пройти тест бесплатно
            </span>
          </NuxtLink>

          <NuxtLink to="/space/builder"
            class="px-8 py-4 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white text-sm font-bold uppercase tracking-wider rounded-xl transition-all">
            <span class="flex items-center gap-3">
              <i class="fas fa-puzzle-piece"></i>
              Конструктор систем
            </span>
          </NuxtLink>
        </div>

        <!-- Quick Links -->
        <div class="pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <div
            class="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
            <span>Или сразу:</span>
            <div class="flex items-center gap-4">
              <NuxtLink to="/space/dashboard"
                class="text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors font-bold uppercase tracking-wide">
                Войти в MindQLab
              </NuxtLink>
              <span class="text-zinc-300 dark:text-zinc-700 font-bold">•</span>
              <NuxtLink to="/courses"
                class="text-zinc-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors font-bold uppercase tracking-wide">
                Курсы и гайды
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Features Grid -->
      <div class="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <!-- Feature 1 -->
        <div class="bg-white dark:bg-zinc-900/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 p-8 rounded-2xl hover:border-cyan-500/50 transition-all duration-300 group">
          <div class="w-14 h-14 bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center mb-6 rounded-xl group-hover:bg-cyan-500/10 transition-colors">
            <i class="fas fa-brain text-cyan-600 dark:text-cyan-400 text-xl"></i>
          </div>
          <h3 class="text-lg font-bold text-zinc-900 dark:text-white mb-3 uppercase tracking-tight">Когнитивные тренажеры</h3>
          <p class="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
            Упражнения для развития памяти, внимания и гибкости мышления
          </p>
        </div>

        <!-- Feature 2 -->
        <div class="bg-white dark:bg-zinc-900/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 p-8 rounded-2xl hover:border-cyan-500/50 transition-all duration-300 group">
          <div class="w-14 h-14 bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center mb-6 rounded-xl group-hover:bg-cyan-500/10 transition-colors">
            <i class="fas fa-chart-line text-cyan-600 dark:text-cyan-400 text-xl"></i>
          </div>
          <h3 class="text-lg font-bold text-zinc-900 dark:text-white mb-3 uppercase tracking-tight">Аналитика прогресса</h3>
          <p class="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
            Система глубокой статистики и отслеживания когнитивных показателей
          </p>
        </div>

        <!-- Feature 3 -->
        <div class="bg-white dark:bg-zinc-900/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 p-8 rounded-2xl hover:border-cyan-500/50 transition-all duration-300 group">
          <div class="w-14 h-14 bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center mb-6 rounded-xl group-hover:bg-cyan-500/10 transition-colors">
            <i class="fas fa-user-clock text-cyan-600 dark:text-cyan-400 text-xl"></i>
          </div>
          <h3 class="text-lg font-bold text-zinc-900 dark:text-white mb-3 uppercase tracking-tight">Персонализация</h3>
          <p class="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
            Индивидуальные программы развития, адаптированные под ваши цели
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHead } from "@unhead/vue";
import NeuralRewireVisualizer from "~/components/space/habit-override/NeuralRewireVisualizer.vue";

definePageMeta({
  layout: "laboratory",
});
// SEO metadata
useHead({
  title: "Тренировки мозга и саморазвитие — MindQLab",
  meta: [
    {
      name: "description",
      content:
        "MindQLab — тренировки мозга, когнитивные упражнения, медитации и тесты с персональной аналитикой прогресса. 10–15 минут в день для развития памяти, внимания и осознанности.",
    },
    {
      name: "keywords",
      content:
        "тренировки мозга, когнитивные упражнения, развитие памяти, внимание, саморазвитие онлайн, медитация, осознанность, эмоциональный интеллект, тесты личности, MindQLab",
    },
    { property: "og:title", content: "Тренировки мозга и саморазвитие — MindQLab" },
    {
      property: "og:description",
      content:
        "Когнитивные тренажёры, медитации и персональная аналитика прогресса. 10–15 минут в день — начните бесплатно в MindQLab.",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://www.mindqlab.com/space" },
    { property: "og:image", content: "https://www.mindqlab.com/mindqlab-logo.png" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Тренировки мозга и саморазвитие — MindQLab" },
    {
      name: "twitter:description",
      content:
        "Когнитивные упражнения, медитации и аналитика прогресса — платформа MindQLab.",
    },
    { name: "twitter:image", content: "https://www.mindqlab.com/mindqlab-logo.png" },
  ],
  link: [{ rel: "canonical", href: "https://www.mindqlab.com/space" }],
});
</script>