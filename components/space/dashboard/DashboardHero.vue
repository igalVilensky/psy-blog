<!-- components/space/dashboard/DashboardHero.vue -->
<template>
  <div
    class="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-5 mb-8 shadow-lg border border-slate-200 dark:border-slate-800 transition-colors duration-500">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute -top-12 -right-12 w-64 h-64 bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-3xl animate-pulse">
      </div>
      <div
        class="absolute -bottom-12 -left-12 w-64 h-64 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse"
        style="animation-delay: 1s"></div>
    </div>

    <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div class="flex-1 min-w-0">
        <!-- Meta Info -->
        <div class="flex items-center gap-3 mb-3">
          <span
            class="px-2 py-0.5 rounded-md bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-[10px] font-mono font-bold uppercase tracking-wider">
            {{ timeOfDayLabel }}
          </span>
          <span class="text-slate-400 dark:text-slate-500 text-[10px] font-mono">{{ currentDate }}</span>
        </div>

        <!-- Greeting & Insight -->
        <div class="space-y-1 group">
          <h1 class="text-2xl lg:text-3xl font-bold font-montserrat tracking-tight flex items-baseline gap-2">
            Привет, <span
              class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400">
              {{ userName || 'Странник' }}</span>!
            <i
              class="fas fa-sparkles text-amber-400 text-sm animate-bounce opacity-0 group-hover:opacity-100 transition-opacity"></i>
          </h1>
          <p
            class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl line-clamp-2 hover:line-clamp-none transition-all duration-300">
            {{ insightMessage }}
          </p>
        </div>

        <!-- Actions -->
        <div class="flex flex-wrap gap-3 mt-4">
          <NuxtLink to="/space/brain-training"
            class="px-4 py-2 rounded-lg bg-cyan-600 text-white text-sm font-bold hover:bg-cyan-700 transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-95">
            <i class="fas fa-play text-xs"></i>
            Начать тренировку
          </NuxtLink>
          <NuxtLink to="/space/growth/emotional-compass"
            class="px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-750 transition-all flex items-center gap-2 active:scale-95">
            <i class="fas fa-heart-pulse text-rose-500 text-xs"></i>
            Замер состояния
          </NuxtLink>
        </div>
      </div>

      <!-- Compact Stat Cards -->
      <div class="flex gap-3 sm:gap-4 shrink-0">
        <div
          class="flex flex-col justify-center bg-slate-50 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 min-w-[120px] hover:border-cyan-500/30 transition-all duration-300 group">
          <div class="text-[9px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Фокус дня
          </div>
          <div
            class="text-lg font-black text-cyan-600 dark:text-cyan-400 group-hover:translate-x-1 transition-transform">
            Гибкость</div>
          <div class="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-full mt-2 overflow-hidden">
            <div class="h-full bg-cyan-500 w-2/3"></div>
          </div>
        </div>
        <div
          class="flex flex-col justify-center bg-slate-50 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 min-w-[120px] hover:border-purple-500/30 transition-all duration-300 group">
          <div class="text-[9px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Прогресс
          </div>
          <div
            class="text-lg font-black text-purple-600 dark:text-purple-400 group-hover:translate-x-1 transition-transform">
            {{ streak }} Дн.</div>
          <div class="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-full mt-2 overflow-hidden">
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
