<!-- components/space/dashboard/CognitivePillar.vue -->
<template>
  <div class="space-y-6">
    <div class="flex flex-row items-center gap-4 mb-4">
      <div
        class="w-12 h-12 flex items-center justify-center shrink-0 border border-zinc-200 dark:border-zinc-700 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-xl">
        <i class="fas fa-brain text-cyan-600 dark:text-cyan-400 text-xl"></i>
      </div>
      <div>
        <h2 class="text-xl sm:text-2xl font-bold uppercase tracking-tight text-zinc-900 dark:text-white">
          Когнитивный Потенциал</h2>
        <p class="text-xs font-bold text-zinc-500 uppercase tracking-wide mt-1">Potentia Cognitiva</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Performance Summary -->
      <div
        class="lg:col-span-2 bg-white dark:bg-zinc-900 p-6 border border-zinc-200 dark:border-zinc-800 border-l-4 border-l-cyan-500 rounded-2xl">
        <div class="flex items-center justify-between mb-8">
          <h3 class="font-bold uppercase tracking-wide text-zinc-900 dark:text-white">Эффективность тренировок</h3>
          <div class="flex gap-2">
            <span
              class="px-3 py-1.5 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800/50 text-[10px] font-bold uppercase tracking-wider rounded-lg">{{
                summary.totalSessions }} Сессий</span>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div
            class="p-4 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-center rounded-xl">
            <div class="text-[10px] text-zinc-400 uppercase font-bold tracking-wider mb-1">Точность</div>
            <div class="text-3xl font-bold text-zinc-900 dark:text-white">{{ summary.avgAccuracy }}%</div>
            <div class="w-8 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mt-2 rounded-full"></div>
          </div>
          <div
            class="p-4 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-center rounded-xl">
            <div class="text-[10px] text-zinc-400 uppercase font-bold tracking-wider mb-1">Фокус</div>
            <div class="text-3xl font-bold text-zinc-900 dark:text-white">Высокий</div>
            <div class="w-8 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-2 rounded-full"></div>
          </div>
          <div
            class="p-4 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-center rounded-xl">
            <div class="text-[10px] text-zinc-400 uppercase font-bold tracking-wider mb-1">Лучший счет</div>
            <div class="text-3xl font-bold text-zinc-900 dark:text-white">{{ summary.bestScore }}%</div>
            <div class="w-8 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mt-2 rounded-full"></div>
          </div>
        </div>

        <!-- Exercise Table -->
        <div class="border border-zinc-200 dark:border-zinc-700 overflow-hidden rounded-xl">
          <table class="w-full text-left text-sm">
            <thead class="bg-zinc-50 dark:bg-zinc-800 text-zinc-500 border-b border-zinc-200 dark:border-zinc-700">
              <tr>
                <th class="px-4 py-3 font-bold uppercase tracking-wider text-[10px]">Упражнение</th>
                <th class="px-4 py-3 font-bold uppercase tracking-wider text-[10px] text-center">Результат</th>
                <th class="px-4 py-3 font-bold uppercase tracking-wider text-[10px] text-right">Статус</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-zinc-100 dark:divide-zinc-700">
              <tr v-for="ex in exercises" :key="ex.id"
                class="hover:bg-cyan-500/5 dark:hover:bg-cyan-500/5 transition-colors cursor-pointer"
                @click="$emit('select-exercise', ex)">
                <td class="px-4 py-3">
                  <div class="flex items-center gap-3">
                    <div :class="[ex.bgClass, 'w-10 h-10 flex items-center justify-center rounded-lg']">
                      <i :class="ex.icon" class="text-xs"></i>
                    </div>
                    <span class="font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-tight text-xs">{{
                      ex.title }}</span>
                  </div>
                </td>
                <td class="px-4 py-3 text-center font-bold font-mono text-zinc-900 dark:text-white">{{ ex.avgScore }}{{
                  ex.unit }}</td>
                <td class="px-4 py-3 text-right">
                  <span class="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">{{ ex.lastPlayed }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Cognitive Map / Heatmap -->
      <div
        class="bg-white dark:bg-zinc-900 p-6 border border-zinc-200 dark:border-zinc-800 relative overflow-hidden flex flex-col border-l-4 border-l-indigo-500 rounded-2xl">

        <h3
          class="font-bold uppercase tracking-wide text-zinc-900 dark:text-white mb-6 relative z-10 flex items-center gap-2">
          <i class="fas fa-wave-square text-indigo-500"></i>
          Активность
        </h3>

        <div class="flex-1 flex items-center justify-center p-4 relative z-10">
          <div class="grid grid-cols-7 gap-1">
            <div v-for="day in 28" :key="day" :class="[
              getDayColor(day),
              'w-4 h-4 transition-all hover:scale-110 cursor-help rounded'
            ]" :title="`День ${day}`">
            </div>
          </div>
        </div>

        <div class="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-700 relative z-10">
          <div class="flex justify-between items-end">
            <div>
              <div class="text-[10px] text-zinc-400 uppercase font-bold tracking-wider mb-1">Стабильность</div>
              <div class="text-2xl font-bold text-zinc-900 dark:text-white">84%</div>
            </div>
            <div class="text-right">
              <div class="text-[10px] text-zinc-400 uppercase font-bold tracking-wider mb-1">Активные дни</div>
              <div
                class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400">
                {{ totalActiveDays }}</div>
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
    'bg-zinc-100 dark:bg-zinc-800',
    'bg-cyan-100 dark:bg-cyan-900/30',
    'bg-cyan-300 dark:bg-cyan-700/50',
    'bg-cyan-500 dark:bg-cyan-600',
    'bg-cyan-600 dark:bg-cyan-500'
  ];
  return intensities[Math.floor(Math.random() * intensities.length)];
};
</script>
