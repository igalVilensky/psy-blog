<template>
  <!-- Hero Content -->
  <div class="flex-1 pt-14 lg:pt-0 overflow-y-auto">
    <div class="relative p-6 lg:p-8">
      <!-- Background Visualizer -->
      <div class="absolute inset-0 z-0 pointer-events-none opacity-40 md:opacity-60">
        <NeuralRewireVisualizer />
        <div
          class="absolute inset-0 bg-gradient-to-b from-stone-50/80 via-stone-50/20 to-stone-50/80 dark:from-stone-950/80 dark:via-stone-950/20 dark:to-stone-950/80">
        </div>
      </div>

      <!-- Hero Content -->
      <div class="relative z-10 max-w-4xl mx-auto text-center py-12 lg:py-20">
        <!-- Brand Title -->
        <div class="flex justify-center mb-8">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-stone-900 dark:bg-white flex items-center justify-center">
              <i class="fas fa-flask text-white dark:text-stone-900 text-lg"></i>
            </div>
            <h1 class="text-4xl font-bold text-stone-900 dark:text-white uppercase tracking-tight">
              MindQLab
            </h1>
          </div>
        </div>

        <!-- Main Heading -->
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 dark:text-white mb-6 leading-tight">
          Тренировки мозга и саморазвитие
        </h2>

        <!-- Description -->
        <p class="text-base md:text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Пространство для глубокого понимания себя и системного развития.
          <span class="font-semibold text-stone-900 dark:text-white">10–15-минутные</span> сессии: когнитивные
          упражнения,
          медитации, тесты и персональная аналитика прогресса для развития
          <span class="font-semibold text-stone-900 dark:text-white">памяти</span>,
          <span class="font-semibold text-stone-900 dark:text-white">внимания</span> и
          <span class="font-semibold text-stone-900 dark:text-white">эмоционального интеллекта</span>.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <NuxtLink to="/space/tests"
            class="group relative px-8 py-4 bg-stone-900 dark:bg-white hover:bg-stone-800 dark:hover:bg-stone-100 text-white dark:text-stone-900 text-sm font-semibold transition-all overflow-hidden">
            <div
              class="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000">
            </div>
            <span class="relative flex items-center gap-3">
              <i class="fas fa-vial"></i>
              Пройти тест бесплатно
            </span>
          </NuxtLink>

          <NuxtLink to="/space/builder"
            class="px-8 py-4 border border-stone-300 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-900 dark:text-white text-sm font-semibold transition-all">
            <span class="flex items-center gap-3">
              <i class="fas fa-puzzle-piece"></i>
              Конструктор систем
            </span>
          </NuxtLink>
        </div>

        <!-- Quick Links -->
        <div class="pt-8 border-t border-stone-200 dark:border-stone-800">
          <div
            class="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-stone-500 dark:text-stone-400">
            <span>Или сразу:</span>
            <div class="flex items-center gap-4">
              <NuxtLink to="/space/dashboard"
                class="text-stone-900 dark:text-white hover:text-stone-700 dark:hover:text-stone-300 transition-colors font-semibold">
                Войти в MindQLab
              </NuxtLink>
              <span class="text-stone-300 dark:text-stone-700">•</span>
              <NuxtLink to="/courses"
                class="text-stone-900 dark:text-white hover:text-stone-700 dark:hover:text-stone-300 transition-colors font-semibold">
                Курсы и гайды
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Features Grid -->
      <div class="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <!-- Feature 1 -->
        <div class="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6">
          <div class="w-12 h-12 bg-stone-100 dark:bg-stone-800 flex items-center justify-center mb-4">
            <i class="fas fa-brain text-stone-900 dark:text-white text-lg"></i>
          </div>
          <h3 class="text-lg font-bold text-stone-900 dark:text-white mb-3">Когнитивные тренажеры</h3>
          <p class="text-sm text-stone-600 dark:text-stone-400">
            Упражнения для развития памяти, внимания и мышления
          </p>
        </div>

        <!-- Feature 2 -->
        <div class="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6">
          <div class="w-12 h-12 bg-stone-100 dark:bg-stone-800 flex items-center justify-center mb-4">
            <i class="fas fa-chart-line text-stone-900 dark:text-white text-lg"></i>
          </div>
          <h3 class="text-lg font-bold text-stone-900 dark:text-white mb-3">Аналитика прогресса</h3>
          <p class="text-sm text-stone-600 dark:text-stone-400">
            Подробная статистика и отслеживание результатов
          </p>
        </div>

        <!-- Feature 3 -->
        <div class="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6">
          <div class="w-12 h-12 bg-stone-100 dark:bg-stone-800 flex items-center justify-center mb-4">
            <i class="fas fa-user-clock text-stone-900 dark:text-white text-lg"></i>
          </div>
          <h3 class="text-lg font-bold text-stone-900 dark:text-white mb-3">Персонализация</h3>
          <p class="text-sm text-stone-600 dark:text-stone-400">
            Индивидуальные программы развития под ваши цели
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