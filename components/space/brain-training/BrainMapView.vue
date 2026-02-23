<template>
  <div class="brain-map-view space-y-8">
    <!-- Header Stats (Moved from page header to here for context) -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12">
      <div>
        <h2 class="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white mb-2 uppercase tracking-tight">
          Интерактивная карта
        </h2>
        <p class="text-zinc-600 dark:text-zinc-400 text-sm max-w-2xl font-medium leading-relaxed">
          Исследуйте структуры и функции человеческого мозга. Нажмите на область для подробной информации.
        </p>
      </div>
      <div class="flex items-center gap-4">
        <div class="stat-card">
          <div class="text-2xl font-bold text-cyan-600 dark:text-cyan-400">8</div>
          <div class="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-widest font-bold">
            Областей
          </div>
        </div>
        <div class="stat-card border-l-4 border-l-blue-500">
          <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">12</div>
          <div class="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-widest font-bold">
            Функций
          </div>
        </div>
      </div>
    </div>

    <!-- Main Interactive Component -->
    <div class="w-full bg-white dark:bg-zinc-900/50 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-xl mb-12">
      <InteractiveBrainMap />
    </div>

    <!-- Educational Content -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
      <!-- Brain Facts -->
      <div class="info-card group">
        <div class="flex items-center gap-4 mb-8">
          <div class="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
            <i class="fas fa-brain text-cyan-600 dark:text-cyan-400 text-xl"></i>
          </div>
          <h3 class="text-lg font-bold text-zinc-900 dark:text-white uppercase tracking-tight">Факты о мозге</h3>
        </div>
        <div class="space-y-4">
          <div v-for="fact in brainFacts" :key="fact.id" class="fact-item">
            <div class="text-cyan-600 dark:text-cyan-400 text-sm font-bold uppercase tracking-tight mb-1.5">
              {{ fact.title }}
            </div>
            <div class="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed font-medium">
              {{ fact.description }}
            </div>
          </div>
        </div>
      </div>

      <!-- Functions -->
      <div class="info-card group">
        <div class="flex items-center gap-4 mb-8">
          <div class="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
            <i class="fas fa-cogs text-blue-600 dark:text-blue-400 text-xl"></i>
          </div>
          <h3 class="text-lg font-bold text-zinc-900 dark:text-white uppercase tracking-tight">Основные функции</h3>
        </div>
        <div class="space-y-4">
          <div v-for="func in mainFunctions" :key="func.id" class="fact-item border-l-blue-500/30">
            <div class="text-blue-600 dark:text-blue-400 text-sm font-bold uppercase tracking-tight mb-1.5">
              {{ func.title }}
            </div>
            <div class="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed font-medium">
              {{ func.description }}
            </div>
          </div>
        </div>
      </div>

      <!-- Did You Know -->
      <div class="info-card group">
        <div class="flex items-center gap-4 mb-8">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
             <i class="fas fa-lightbulb text-emerald-600 dark:text-emerald-400 text-xl"></i>
          </div>
          <h3 class="text-lg font-bold text-zinc-900 dark:text-white uppercase tracking-tight">Знали ли вы?</h3>
        </div>
        <div class="space-y-4">
          <div v-for="item in didYouKnow" :key="item.id" class="fact-item border-l-emerald-500/30">
            <div class="text-emerald-600 dark:text-emerald-400 text-sm font-bold uppercase tracking-tight mb-1.5">
              {{ item.title }}
            </div>
            <div class="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed font-medium">
              {{ item.description }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import InteractiveBrainMap from "~/components/space/InteractiveBrainMap.vue";

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
  @apply text-center px-4 py-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm min-w-[90px];
}

.info-card {
  @apply p-8 rounded-3xl bg-white dark:bg-zinc-950/30 border border-zinc-200 dark:border-zinc-800 backdrop-blur-xl shadow-sm;
}

.fact-item {
  @apply p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border-l-4 border-l-cyan-500/30 border border-zinc-200 dark:border-zinc-800 transition-all duration-300;
}

.fact-item:hover {
  @apply border-l-cyan-500 bg-white dark:bg-zinc-900 shadow-md;
}
</style>
