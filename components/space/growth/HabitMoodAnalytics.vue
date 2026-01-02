<template>
  <div class="space-y-6">
    <!-- Streak and Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white shadow-lg shadow-orange-500/20 relative overflow-hidden">
        <div class="absolute -right-4 -bottom-4 opacity-10 blur-xl">
          <i class="fas fa-fire text-9xl"></i>
        </div>
        <div class="relative z-10">
          <div class="text-[10px] uppercase font-bold tracking-widest opacity-80 mb-1">Текущая серия</div>
          <div class="text-4xl font-black font-mono flex items-baseline gap-2">
            {{ stats.streak }} 
            <span class="text-sm font-medium opacity-80">дней</span>
          </div>
          <div class="mt-4 flex items-center gap-2 text-xs">
            <i class="fas fa-fire-alt animate-pulse"></i>
            <span>Вперед, к новым вершинам!</span>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-slate-800/30 rounded-2xl border border-slate-200 dark:border-slate-700/50 p-6 shadow-sm">
        <div class="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-widest mb-1">Среднее настроение</div>
        <div class="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
          {{ stats.avgMood.toFixed(1) }}
          <span class="text-2xl">{{ getMoodEmoji(Math.round(stats.avgMood)) }}</span>
        </div>
        <div class="mt-3 w-full bg-slate-100 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
          <div 
            class="h-full bg-purple-500 transition-all duration-1000" 
            :style="{ width: `${(stats.avgMood / 5) * 100}%` }"
          ></div>
        </div>
      </div>

      <div class="bg-white dark:bg-slate-800/30 rounded-2xl border border-slate-200 dark:border-slate-700/50 p-6 shadow-sm">
        <div class="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-widest mb-1">Всего записей</div>
        <div class="text-3xl font-black text-slate-900 dark:text-white">
          {{ stats.totalEntries }}
        </div>
        <p class="text-[10px] text-slate-400 mt-2">Регулярность — ключ к успеху</p>
      </div>
    </div>

    <!-- Charts Container -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Mood Trend -->
      <div class="bg-white dark:bg-slate-800/30 rounded-2xl border border-slate-200 dark:border-slate-700/50 p-6 shadow-sm">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest">
            Тренд настроения
          </h3>
          <div class="flex gap-1">
            <div v-for="i in 5" :key="i" class="w-2 h-2 rounded-full" :class="i <= 3 ? 'bg-purple-500' : 'bg-slate-200 dark:bg-slate-700'"></div>
          </div>
        </div>
        <div class="h-48 flex items-end gap-2 px-2">
          <div 
            v-for="(entry, idx) in recentEntries" 
            :key="idx"
            class="flex-1 group relative flex flex-col items-center justify-end h-full"
          >
            <div 
              class="w-full bg-gradient-to-t from-purple-500/80 to-indigo-500 rounded-t-lg transition-all duration-500 group-hover:scale-105 group-hover:from-purple-500 cursor-help"
              :style="{ height: `${(entry.mood / 5) * 100}%` }"
            >
              <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                {{ formatShortDate(entry.timestamp) }}: {{ getMoodLabel(entry.mood) }}
              </div>
            </div>
            <div class="mt-2 text-[8px] font-mono text-slate-400 uppercase transform -rotate-45 origin-top-left">
              {{ formatShortDate(entry.timestamp) }}
            </div>
          </div>
          <div v-if="recentEntries.length === 0" class="flex-1 flex items-center justify-center text-slate-400 text-xs italic">
            Недостаточно данных для графика
          </div>
        </div>
      </div>

      <!-- Habit Heatmap -->
      <div class="bg-white dark:bg-slate-800/30 rounded-2xl border border-slate-200 dark:border-slate-700/50 p-6 shadow-sm">
        <h3 class="text-sm font-bold text-slate-700 dark:text-slate-300 mb-6 uppercase tracking-widest">
          Активность привычек
        </h3>
        <div class="space-y-3">
          <div v-for="(habit, key) in habitList" :key="key" class="group">
            <div class="flex items-center justify-between text-[10px] mb-1">
              <span class="text-slate-500 dark:text-slate-400 font-bold tracking-wider">{{ habit }}</span>
              <span class="text-slate-400 font-mono">{{ getHabitCompletionRate(key) }}%</span>
            </div>
            <div class="flex gap-1.5">
              <div 
                v-for="i in 14" 
                :key="i"
                class="flex-1 h-3 rounded-sm transition-all duration-300"
                :class="getHabitMatrixClass(key, i)"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  entries: {
    type: Array,
    default: () => []
  }
});

const habitList = {
  meditation: 'Медитация',
  exercise: 'Спорт',
  reading: 'Чтение',
  water: 'Вода',
  early_rise: 'Ранний подъем',
  healthy_food: 'Питание'
};

const stats = computed(() => {
  if (props.entries.length === 0) return { streak: 0, avgMood: 0, totalEntries: 0 };
  
  const totalEntries = props.entries.length;
  const avgMood = props.entries.reduce((acc, curr) => acc + curr.mood, 0) / totalEntries;
  
  // Simple streak calculation (mock for now, would need date logic)
  let streak = 0;
  if (totalEntries > 0) {
      streak = Math.min(totalEntries, 7); // Simplified logic
  }

  return { streak, avgMood, totalEntries };
});

const recentEntries = computed(() => {
  return [...props.entries].sort((a, b) => {
    const timeA = a.timestamp?.seconds || 0;
    const timeB = b.timestamp?.seconds || 0;
    return timeA - timeB;
  }).slice(-7);
});

const getMoodEmoji = (mood) => {
  const emojis = ['😫', '😔', '😐', '🙂', '🤩'];
  return emojis[mood - 1] || '😐';
};

const getMoodLabel = (mood) => {
  const labels = ['Ужасно', 'Плохо', 'Нормально', 'Хорошо', 'Отлично'];
  return labels[mood - 1] || 'Неизвестно';
};

const formatShortDate = (ts) => {
  if (!ts) return '';
  const date = ts.toDate ? ts.toDate() : new Date(ts);
  return date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });
};

const getHabitCompletionRate = (habitKey) => {
  if (props.entries.length === 0) return 0;
  const completed = props.entries.filter(e => e.habits?.[habitKey]).length;
  return Math.round((completed / props.entries.length) * 100);
};

const getHabitMatrixClass = (habitKey, index) => {
  // Mapping index 1-14 to entries 0-13 (where 0 is latest)
  // Rightmost (14) = most recent (0)
  const entryIdx = 14 - index;
  if (entryIdx >= 0 && entryIdx < props.entries.length && props.entries[entryIdx]?.habits?.[habitKey]) {
    return 'bg-emerald-500 shadow-sm shadow-emerald-500/20';
  }
  return 'bg-slate-100 dark:bg-slate-800/80';
};
</script>
