<!-- components/space/dashboard/CognitivePillar.vue -->
<template>
  <div class="space-y-6">
    <div class="flex flex-row items-center gap-4 mb-4">
      <div
        class="w-12 h-12 flex items-center justify-center shrink-0 border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800">
        <i class="fas fa-brain text-stone-900 dark:text-white text-xl"></i>
      </div>
      <div>
        <h2 class="text-xl sm:text-2xl font-bold uppercase tracking-tight text-stone-900 dark:text-white">
          Когнитивный Потенциал</h2>
        <p class="text-xs font-bold text-stone-500 uppercase tracking-wide mt-1">Potentia Cognitiva</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Performance Summary -->
      <div
        class="lg:col-span-2 bg-white dark:bg-stone-900 p-6 border border-stone-200 dark:border-stone-800 border-l-4 border-l-cyan-500">
        <div class="flex items-center justify-between mb-8">
          <h3 class="font-bold uppercase tracking-wide text-stone-900 dark:text-white">Эффективность тренировок</h3>
          <div class="flex gap-2">
            <span
              class="px-2 py-1 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800 text-[10px] font-bold uppercase tracking-wider">{{
                summary.totalSessions }} Сессий</span>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div class="p-4 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-center">
            <div class="text-[10px] text-stone-400 uppercase font-bold tracking-wider mb-1">Точность</div>
            <div class="text-3xl font-bold text-stone-900 dark:text-white">{{ summary.avgAccuracy }}%</div>
            <div class="w-8 h-1 bg-cyan-500 mx-auto mt-2"></div>
          </div>
          <div class="p-4 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-center">
            <div class="text-[10px] text-stone-400 uppercase font-bold tracking-wider mb-1">Фокус</div>
            <div class="text-3xl font-bold text-stone-900 dark:text-white">Высокий</div>
            <div class="w-8 h-1 bg-purple-500 mx-auto mt-2"></div>
          </div>
          <div class="p-4 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-center">
            <div class="text-[10px] text-stone-400 uppercase font-bold tracking-wider mb-1">Лучший счет</div>
            <div class="text-3xl font-bold text-stone-900 dark:text-white">{{ summary.bestScore }}%</div>
            <div class="w-8 h-1 bg-emerald-500 mx-auto mt-2"></div>
          </div>
        </div>

        <!-- Exercise Table -->
        <div class="border border-stone-200 dark:border-stone-700 overflow-hidden">
          <table class="w-full text-left text-sm">
            <thead class="bg-stone-50 dark:bg-stone-800 text-stone-500 border-b border-stone-200 dark:border-stone-700">
              <tr>
                <th class="px-4 py-3 font-bold uppercase tracking-wider text-[10px]">Упражнение</th>
                <th class="px-4 py-3 font-bold uppercase tracking-wider text-[10px] text-center">Результат</th>
                <th class="px-4 py-3 font-bold uppercase tracking-wider text-[10px] text-right">Статус</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-stone-100 dark:divide-stone-700">
              <tr v-for="ex in exercises" :key="ex.id"
                class="hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors cursor-pointer"
                @click="$emit('select-exercise', ex)">
                <td class="px-4 py-3">
                  <div class="flex items-center gap-3">
                    <div :class="[ex.bgClass, 'w-8 h-8 flex items-center justify-center rounded-none']">
                      <i :class="ex.icon" class="text-xs"></i>
                    </div>
                    <span class="font-bold text-stone-700 dark:text-stone-300 uppercase tracking-tight text-xs">{{
                      ex.title }}</span>
                  </div>
                </td>
                <td class="px-4 py-3 text-center font-bold font-mono text-stone-900 dark:text-white">{{ ex.avgScore }}{{
                  ex.unit }}</td>
                <td class="px-4 py-3 text-right">
                  <span class="text-[10px] font-bold text-stone-400 uppercase tracking-wider">{{ ex.lastPlayed }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Cognitive Map / Heatmap -->
      <div
        class="bg-white dark:bg-stone-900 p-6 border border-stone-200 dark:border-stone-800 relative overflow-hidden flex flex-col border-l-4 border-l-indigo-500">

        <h3
          class="font-bold uppercase tracking-wide text-stone-900 dark:text-white mb-6 relative z-10 flex items-center gap-2">
          <i class="fas fa-wave-square text-indigo-500"></i>
          Активность
        </h3>

        <div class="flex-1 flex items-center justify-center p-4 relative z-10">
          <div class="grid grid-cols-7 gap-1">
            <div v-for="day in 28" :key="day" :class="[
              getDayColor(day),
              'w-4 h-4 transition-all hover:scale-110 cursor-help border border-stone-100 dark:border-stone-800'
            ]" :title="`День ${day}`">
            </div>
          </div>
        </div>

        <div class="mt-6 pt-6 border-t border-stone-200 dark:border-stone-700 relative z-10">
          <div class="flex justify-between items-end">
            <div>
              <div class="text-[10px] text-stone-400 uppercase font-bold tracking-wider mb-1">Стабильность</div>
              <div class="text-2xl font-bold text-stone-900 dark:text-white">84%</div>
            </div>
            <div class="text-right">
              <div class="text-[10px] text-stone-400 uppercase font-bold tracking-wider mb-1">Активные дни</div>
              <div class="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{{ totalActiveDays }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  summary: Object,
  exercises: Array,
  heatmap: Object,
  totalActiveDays: Number
});

defineEmits(['select-exercise']);

// Simple simulation for demo if heatmap is not provided or for last 28 days view
const getDayColor = (day) => {
  const intensities = [
    'bg-stone-100 dark:bg-stone-800',
    'bg-indigo-100 dark:bg-indigo-900/30',
    'bg-indigo-300 dark:bg-indigo-700/50',
    'bg-indigo-500 dark:bg-indigo-600',
    'bg-indigo-600 dark:bg-indigo-500'
  ];
  return intensities[Math.floor(Math.random() * intensities.length)];
};
</script>
