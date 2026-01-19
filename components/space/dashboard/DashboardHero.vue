<!-- components/space/dashboard/DashboardHero.vue -->
<template>
  <div
    class="relative bg-white dark:bg-stone-900 p-8 mb-8 border border-stone-200 dark:border-stone-800 border-l-4 border-l-stone-900 dark:border-l-white transition-colors duration-500">
    <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div class="flex-1 min-w-0">
        <!-- Meta Info -->
        <div class="flex items-center gap-3 mb-4">
          <span
            class="px-2 py-1 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-[10px] font-bold uppercase tracking-widest border border-stone-200 dark:border-stone-700">
            {{ timeOfDayLabel }}
          </span>
          <span class="text-stone-400 dark:text-stone-500 text-[10px] font-bold uppercase tracking-wider">{{ currentDate
          }}</span>
        </div>

        <!-- Greeting & Insight -->
        <div class="space-y-2 group">
          <h1
            class="text-3xl font-bold uppercase tracking-tight text-stone-900 dark:text-white flex items-baseline gap-2">
            Привет, <span class="text-stone-500 dark:text-stone-400">
              {{ userName || 'Странник' }}</span>
          </h1>
          <p class="text-sm font-medium text-stone-500 dark:text-stone-400 leading-relaxed max-w-2xl">
            {{ insightMessage }}
          </p>
        </div>

        <!-- Actions -->
        <div class="flex flex-wrap gap-3 mt-6">
          <NuxtLink to="/space/tests"
            class="px-6 py-2 bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-xs font-bold uppercase tracking-wider hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors flex items-center gap-2">
            <i class="fas fa-play text-[10px]"></i>
            Тренировка
          </NuxtLink>
          <NuxtLink to="/space/growth/emotional-compass"
            class="px-6 py-2 bg-transparent border border-stone-300 dark:border-stone-600 text-stone-900 dark:text-white text-xs font-bold uppercase tracking-wider hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors flex items-center gap-2">
            <i class="fas fa-heart text-[10px]"></i>
            Замер
          </NuxtLink>
        </div>
      </div>

      <!-- Compact Stat Cards -->
      <div class="flex gap-4 shrink-0">
        <div
          class="flex flex-col justify-center bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 border-l-4 border-l-cyan-500 px-5 py-4 min-w-[140px] group transition-all hover:bg-white dark:hover:bg-stone-700">
          <div class="text-[9px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-1">Фокус дня
          </div>
          <div class="text-xl font-bold text-stone-900 dark:text-white">
            Гибкость</div>
          <div class="w-full h-1 bg-stone-200 dark:bg-stone-700 mt-2 overflow-hidden">
            <div class="h-full bg-cyan-500 w-2/3"></div>
          </div>
        </div>
        <div
          class="flex flex-col justify-center bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 border-l-4 border-l-purple-500 px-5 py-4 min-w-[140px] group transition-all hover:bg-white dark:hover:bg-stone-700">
          <div class="text-[9px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-1">Прогресс
          </div>
          <div class="text-xl font-bold text-stone-900 dark:text-white">
            {{ streak }} Дн.</div>
          <div class="w-full h-1 bg-stone-200 dark:bg-stone-700 mt-2 overflow-hidden">
            <div class="h-full bg-purple-500 w-1/2"></div>
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

<style scoped>
.font-montserrat {
  font-family: 'Montserrat', sans-serif;
}
</style>
