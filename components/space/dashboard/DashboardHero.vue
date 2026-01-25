<!-- components/space/dashboard/DashboardHero.vue -->
<template>
  <div
    class="relative bg-white dark:bg-zinc-900 p-8 mb-8 border border-zinc-200 dark:border-zinc-800 border-l-4 border-l-cyan-500 rounded-2xl transition-colors duration-500">
    <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div class="flex-1 min-w-0">
        <!-- Meta Info -->
        <div class="flex items-center gap-3 mb-4">
          <span
            class="px-3 py-1.5 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 text-cyan-600 dark:text-cyan-400 text-[10px] font-bold uppercase tracking-widest border border-cyan-500/20 dark:border-cyan-500/30 rounded-lg">
            {{ timeOfDayLabel }}
          </span>
          <span class="text-zinc-400 dark:text-zinc-500 text-[10px] font-bold uppercase tracking-wider">{{ currentDate
          }}</span>
        </div>

        <!-- Greeting & Insight -->
        <div class="space-y-2 group">
          <h1
            class="text-3xl font-bold uppercase tracking-tight text-zinc-900 dark:text-white flex items-baseline gap-2">
            Привет, <span
              class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400">
              {{ userName || 'Странник' }}</span>
          </h1>
          <p class="text-sm font-medium text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl">
            {{ insightMessage }}
          </p>
        </div>

        <!-- Actions -->
        <div class="flex flex-wrap gap-3 mt-6">
          <NuxtLink to="/space/tests"
            class="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold uppercase tracking-wider hover:shadow-lg hover:shadow-cyan-500/25 transition-all flex items-center gap-2 rounded-xl">
            <i class="fas fa-play text-[10px]"></i>
            Тренировка
          </NuxtLink>
          <NuxtLink to="/space/growth/emotional-compass"
            class="px-6 py-2.5 bg-transparent border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white text-xs font-bold uppercase tracking-wider hover:border-cyan-500 hover:text-cyan-600 dark:hover:border-cyan-400 dark:hover:text-cyan-400 transition-all flex items-center gap-2 rounded-xl">
            <i class="fas fa-heart text-[10px]"></i>
            Замер
          </NuxtLink>
        </div>
      </div>

      <!-- Compact Stat Cards -->
      <div class="flex gap-4 shrink-0">
        <div
          class="flex flex-col justify-center bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 border-l-4 border-l-cyan-500 px-5 py-4 min-w-[140px] group transition-all hover:bg-white dark:hover:bg-zinc-700 rounded-xl">
          <div class="text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-1">Фокус дня
          </div>
          <div class="text-xl font-bold text-zinc-900 dark:text-white">
            Гибкость</div>
          <div class="w-full h-1 bg-zinc-200 dark:bg-zinc-700 mt-2 overflow-hidden rounded-full">
            <div class="h-full bg-gradient-to-r from-cyan-500 to-blue-600 w-2/3 rounded-full"></div>
          </div>
        </div>
        <div
          class="flex flex-col justify-center bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 border-l-4 border-l-purple-500 px-5 py-4 min-w-[140px] group transition-all hover:bg-white dark:hover:bg-zinc-700 rounded-xl">
          <div class="text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-1">Прогресс
          </div>
          <div class="text-xl font-bold text-zinc-900 dark:text-white">
            {{ streak }} Дн.</div>
          <div class="w-full h-1 bg-zinc-200 dark:bg-zinc-700 mt-2 overflow-hidden rounded-full">
            <div class="h-full bg-gradient-to-r from-purple-500 to-pink-500 w-1/2 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  userName: String,
  streak: Number,
  lastActivity: Object
});

defineEmits(['quick-action']);

const timeOfDayLabel = computed(() => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'Доброе утро';
  if (hour >= 12 && hour < 18) return 'Добрый день';
  if (hour >= 18 && hour < 22) return 'Добрый вечер';
  return 'Доброй ночи';
});

const currentDate = computed(() => {
  return new Intl.DateTimeFormat('ru-RU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  }).format(new Date());
});

const insightMessage = computed(() => {
  if (!props.lastActivity) return 'Ваш путь к самопознанию начинается сегодня. Исследуйте свои возможности и открывайте новые грани личности.';
  return 'Ваш мозг показывает высокую активность в области когнитивной гибкости. Сегодня идеальный день, чтобы закрепить результат или попробовать что-то совершенно новое.';
});
</script>
