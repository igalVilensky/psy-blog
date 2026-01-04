<!-- components/space/dashboard/CognitivePillar.vue -->
<template>
  <div class="space-y-6">
    <div class="flex flex-row items-center gap-4 mb-2">
      <div class="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0">
        <i class="fas fa-brain text-cyan-600 dark:text-cyan-400 text-xl"></i>
      </div>
      <div>
        <h2 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-montserrat leading-tight">
          Когнитивный Потенциал</h2>
        <p class="text-xs text-slate-500 mt-1">Эффективность работы мозга и когнитивные метрики</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Performance Summary -->
      <div
        class="lg:col-span-2 bg-white dark:bg-slate-800/30 rounded-2xl p-6 border border-slate-200 dark:border-slate-700/50 shadow-sm">
        <div class="flex items-center justify-between mb-8">
          <h3 class="font-bold text-slate-900 dark:text-white">Эффективность тренировок</h3>
          <div class="flex gap-2">
            <span class="px-2 py-1 rounded bg-cyan-500/10 text-cyan-600 text-[10px] font-bold uppercase">{{
              summary.totalSessions }} Сессий</span>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div class="text-center">
            <div class="text-[10px] text-slate-500 uppercase font-mono mb-1">Точность</div>
            <div class="text-3xl font-black text-slate-900 dark:text-white">{{ summary.avgAccuracy }}%</div>
            <div class="w-16 h-1 bg-cyan-500 mx-auto mt-2 rounded-full"></div>
          </div>
          <div class="text-center">
            <div class="text-[10px] text-slate-500 uppercase font-mono mb-1">Фокус</div>
            <div class="text-3xl font-black text-slate-900 dark:text-white">Высокий</div>
            <div class="w-16 h-1 bg-purple-500 mx-auto mt-2 rounded-full"></div>
          </div>
          <div class="text-center">
            <div class="text-[10px] text-slate-500 uppercase font-mono mb-1">Лучший счет</div>
            <div class="text-3xl font-black text-slate-900 dark:text-white">{{ summary.bestScore }}%</div>
            <div class="w-16 h-1 bg-emerald-500 mx-auto mt-2 rounded-full"></div>
          </div>
        </div>

        <!-- Exercise Table -->
        <div class="overflow-hidden border border-slate-100 dark:border-slate-700/50 rounded-xl">
          <table class="w-full text-left text-sm">
            <thead class="bg-slate-50 dark:bg-slate-800/50 text-slate-500">
              <tr>
                <th class="px-4 py-3 font-medium">Упражнение</th>
                <th class="px-4 py-3 font-medium text-center">Результат</th>
                <th class="px-4 py-3 font-medium text-right">Статус</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-700/50">
              <tr v-for="ex in exercises" :key="ex.id"
                class="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors cursor-pointer"
                @click="$emit('select-exercise', ex)">
                <td class="px-4 py-3">
                  <div class="flex items-center gap-3">
                    <div :class="[ex.bgClass, 'w-8 h-8 rounded-lg flex items-center justify-center']">
                      <i :class="ex.icon" class="text-xs"></i>
                    </div>
                    <span class="font-bold text-slate-700 dark:text-slate-300">{{ ex.title }}</span>
                  </div>
                </td>
                <td class="px-4 py-3 text-center font-mono font-bold">{{ ex.avgScore }}{{ ex.unit }}</td>
                <td class="px-4 py-3 text-right">
                  <span class="text-[10px] text-slate-500 uppercase">{{ ex.lastPlayed }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Cognitive Map / Heatmap -->
      <div
        class="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xl relative overflow-hidden flex flex-col border border-slate-200 dark:border-slate-800 transition-colors">
        <div class="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent pointer-events-none"></div>

        <h3 class="font-bold text-slate-900 dark:text-white mb-6 relative z-10 flex items-center gap-2">
          <i class="fas fa-wave-square text-cyan-500"></i>
          Активность нейронов
        </h3>

        <div class="flex-1 flex items-center justify-center p-4 relative z-10">
          <div class="grid grid-cols-7 gap-1">
            <div v-for="day in 28" :key="day" :class="[
              getDayColor(day),
              'w-3 h-3 rounded-[3px] transition-all hover:scale-150 cursor-help'
            ]" :title="`День ${day}`">
            </div>
          </div>
        </div>

        <div class="mt-6 pt-6 border-t border-slate-200 dark:border-white/10 relative z-10">
          <div class="flex justify-between items-end">
            <div>
              <div class="text-[10px] text-slate-500 uppercase font-mono">Стабильность</div>
              <div class="text-2xl font-bold text-slate-900 dark:text-white">84%</div>
            </div>
            <div class="text-right">
              <div class="text-[10px] text-slate-500 uppercase font-mono">Активные дни</div>
              <div class="text-2xl font-bold text-cyan-600 dark:text-cyan-400">{{ totalActiveDays }}</div>
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
    'bg-slate-100 dark:bg-slate-800',
    'bg-cyan-100 dark:bg-cyan-900/50',
    'bg-cyan-200 dark:bg-cyan-700/50',
    'bg-cyan-400 dark:bg-cyan-500',
    'bg-cyan-500 dark:bg-cyan-400'
  ];
  return intensities[Math.floor(Math.random() * intensities.length)];
};
</script>
