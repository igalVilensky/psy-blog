<!-- components/space/dashboard/DashboardHero.vue -->
<template>
  <div
    class="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-8 mb-12 shadow-xl border border-slate-200 dark:border-slate-800 transition-colors duration-500">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div
        class="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/20 rounded-full blur-3xl animate-pulse">
      </div>
      <div
        class="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl animate-pulse"
        style="animation-delay: 1s"></div>
      <div
        class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] dark:opacity-5 pointer-events-none">
      </div>
    </div>

    <div class="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
      <div class="max-w-2xl">
        <div class="flex items-center gap-3 mb-4">
          <span
            class="px-3 py-1 rounded-full bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-bold tracking-widest uppercase">
            {{ timeOfDayLabel }}
          </span>
          <span class="text-slate-500 dark:text-slate-400 text-xs font-mono">{{ currentDate }}</span>
        </div>

        <h1 class="text-4xl lg:text-6xl font-bold mb-6 font-montserrat tracking-tight">
          Привет, <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400">{{
              userName || 'Странник' }}</span>!
        </h1>

        <p class="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed max-w-xl">
          {{ insightMessage }}
        </p>

        <div class="flex flex-wrap gap-4">
          <NuxtLink to="/space/brain-training"
            class="px-6 py-3 rounded-xl bg-cyan-600 text-white font-bold hover:bg-cyan-700 transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/20">
            <i class="fas fa-play"></i>
            Начать тренировку
          </NuxtLink>
          <NuxtLink to="/space/growth/emotional-compass"
            class="px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-white font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center gap-2">
            <i class="fas fa-heart-pulse text-rose-500"></i>
            Замер состояния
          </NuxtLink>
        </div>
      </div>

      <!-- Quick Summary Cards -->
      <div class="grid grid-cols-2 gap-4 w-full lg:w-auto">
        <div
          class="bg-slate-50 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-2xl p-5 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors group">
          <div class="text-slate-500 dark:text-slate-400 text-xs font-mono mb-2 uppercase tracking-wider">Фокус дня
          </div>
          <div
            class="text-2xl font-black text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform origin-left">
            Гибкость</div>
          <div class="mt-2 text-[10px] text-slate-500 leading-tight">Ваш TMT тест показал отличную динамику</div>
        </div>
        <div
          class="bg-slate-50 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-2xl p-5 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors group">
          <div class="text-slate-500 dark:text-slate-400 text-xs font-mono mb-2 uppercase tracking-wider">Прогресс</div>
          <div
            class="text-2xl font-black text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform origin-left">
            {{ streak }} Дн.</div>
          <div class="mt-2 text-[10px] text-slate-500 leading-tight">Поддерживайте чистоту разума каждый день</div>
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
  // Logic could be more complex, but for now:
  if (!props.lastActivity) return 'Ваш путь к самопознанию начинается сегодня. Исследуйте свои возможности и открывайте новые грани личности.';
  return 'Ваш мозг показывает высокую активность в области когнитивной гибкости. Сегодня идеальный день, чтобы закрепить результат или попробовать что-то совершенно новое.';
});
</script>
