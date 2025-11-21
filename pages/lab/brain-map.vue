<!-- pages/lab/brain-map.vue -->
<template>
  <div
    class="brain-map-station min-h-screen bg-slate-50 dark:bg-slate-950 px-4 sm:px-6 lg:px-8 py-8 transition-colors duration-500"
  >
    <!-- Header Section -->
    <div class="max-w-7xl mx-auto mb-8">
      <Breadcrumbs />
      <div
        class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
      >
        <div>
          <h1
            class="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight"
          >
            ИНТЕРАКТИВНАЯ КАРТА МОЗГА
          </h1>
          <p
            class="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed"
          >
            Исследуйте структуры и функции человеческого мозга. Нажмите на
            область для подробной информации.
          </p>
        </div>

        <!-- Stats Cards -->
        <div class="flex items-center gap-4 sm:gap-6">
          <div class="stat-card">
            <div class="text-2xl sm:text-3xl font-bold text-cyan-600 dark:text-cyan-400">8</div>
            <div class="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">
              Областей
            </div>
          </div>
          <div class="stat-card">
            <div class="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400">12</div>
            <div class="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">
              Функций
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Interactive Component -->
    <div class="max-w-7xl mx-auto">
      <InteractiveBrainMap />
    </div>

    <!-- Educational Content -->
    <div class="max-w-7xl mx-auto mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Brain Facts -->
      <div class="info-card">
        <div class="flex items-center gap-2 mb-4">
          <div
            class="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center"
          >
            <svg
              class="w-5 h-5 text-cyan-600 dark:text-cyan-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-slate-900 dark:text-white">Факты о мозге</h3>
        </div>
        <div class="space-y-3">
          <div v-for="fact in brainFacts" :key="fact.id" class="fact-item">
            <div class="text-cyan-600 dark:text-cyan-400 text-sm font-medium mb-1">
              {{ fact.title }}
            </div>
            <div class="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
              {{ fact.description }}
            </div>
          </div>
        </div>
      </div>

      <!-- Functions -->
      <div class="info-card">
        <div class="flex items-center gap-2 mb-4">
          <div
            class="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center"
          >
            <svg
              class="w-5 h-5 text-purple-600 dark:text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-slate-900 dark:text-white">Основные функции</h3>
        </div>
        <div class="space-y-3">
          <div v-for="func in mainFunctions" :key="func.id" class="fact-item">
            <div class="text-purple-600 dark:text-purple-400 text-sm font-medium mb-1">
              {{ func.title }}
            </div>
            <div class="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
              {{ func.description }}
            </div>
          </div>
        </div>
      </div>

      <!-- Did You Know -->
      <div class="info-card">
        <div class="flex items-center gap-2 mb-4">
          <div
            class="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center"
          >
            <svg
              class="w-5 h-5 text-emerald-600 dark:text-emerald-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-slate-900 dark:text-white">Знали ли вы?</h3>
        </div>
        <div class="space-y-3">
          <div v-for="item in didYouKnow" :key="item.id" class="fact-item">
            <div class="text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-1">
              {{ item.title }}
            </div>
            <div class="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
              {{ item.description }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import InteractiveBrainMap from "~/components/lab/InteractiveBrainMap.vue";
import Breadcrumbs from "~/components/ui/Breadcrumbs.vue";

definePageMeta({
  layout: "laboratory",
});

const brainFacts = [
  {
    id: 1,
    title: "Нейропластичность",
    description:
      "Мозг способен изменять свою структуру и создавать новые нейронные связи на протяжении всей жизни.",
  },
  {
    id: 2,
    title: "Энергопотребление",
    description:
      "Несмотря на 2% массы тела, мозг потребляет около 20% всей энергии организма.",
  },
  {
    id: 3,
    title: "86 миллиардов нейронов",
    description:
      "Человеческий мозг содержит примерно 86 миллиардов нервных клеток.",
  },
];

const mainFunctions = [
  {
    id: 1,
    title: "Когнитивные функции",
    description: "Мышление, память, внимание, речь и принятие решений.",
  },
  {
    id: 2,
    title: "Сенсорная обработка",
    description:
      "Обработка зрительной, слуховой, тактильной и другой информации.",
  },
  {
    id: 3,
    title: "Моторный контроль",
    description: "Планирование и выполнение произвольных движений тела.",
  },
];

const didYouKnow = [
  {
    id: 1,
    title: "Скорость импульсов",
    description:
      "Нервные импульсы передаются со скоростью до 120 м/с (432 км/ч).",
  },
  {
    id: 2,
    title: "Размер мозга",
    description: "Средний вес взрослого мозга составляет около 1.4 кг.",
  },
  {
    id: 3,
    title: "Сон и память",
    description:
      "Во время сна мозг консолидирует воспоминания и очищается от токсинов.",
  },
];
</script>

<style scoped>


.stat-card {
  @apply text-center px-4 py-3 rounded-xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-cyan-500/10 shadow-sm dark:shadow-none;
}

.info-card {
  @apply p-6 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-cyan-500/10 backdrop-blur-sm shadow-sm dark:shadow-none;
}

.fact-item {
  @apply p-3 rounded-lg bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 transition-all duration-300;
}

.fact-item:hover {
  @apply border-cyan-500/30 bg-slate-100 dark:bg-slate-800/50;
}

@media (max-width: 640px) {
  .stat-card {
    @apply px-3 py-2;
  }

  .info-card {
    @apply p-4;
  }
}
</style>
