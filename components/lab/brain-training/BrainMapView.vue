<template>
  <div class="brain-map-view space-y-8">
    <!-- Header Stats (Moved from page header to here for context) -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-2">
          Интерактивная карта
        </h2>
        <p class="text-slate-600 dark:text-slate-400 text-sm max-w-2xl">
          Исследуйте структуры и функции человеческого мозга. Нажмите на область для подробной информации.
        </p>
      </div>
      <div class="flex items-center gap-4">
        <div class="stat-card">
          <div class="text-2xl font-bold text-cyan-600 dark:text-cyan-400">8</div>
          <div class="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">
            Областей
          </div>
        </div>
        <div class="stat-card">
          <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">12</div>
          <div class="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">
            Функций
          </div>
        </div>
      </div>
    </div>

    <!-- Main Interactive Component -->
    <div class="w-full">
      <InteractiveBrainMap />
    </div>

    <!-- Educational Content -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Brain Facts -->
      <div class="info-card">
        <div class="flex items-center gap-2 mb-4">
          <div class="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
            <i class="fas fa-brain text-cyan-600 dark:text-cyan-400"></i>
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
          <div class="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
            <i class="fas fa-cogs text-purple-600 dark:text-purple-400"></i>
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
          <div class="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
             <i class="fas fa-lightbulb text-emerald-600 dark:text-emerald-400"></i>
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
  @apply text-center px-4 py-2 rounded-xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-cyan-500/10 shadow-sm dark:shadow-none min-w-[80px];
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
</style>
