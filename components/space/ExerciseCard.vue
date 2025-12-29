<template>
  <div
    class="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 p-6 backdrop-blur-md transition-all duration-300"
    :class="[
      exercise.link 
        ? 'bg-white dark:bg-slate-900/50 hover:-translate-y-1 hover:border-indigo-500/50 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:shadow-xl hover:shadow-indigo-500/20 cursor-pointer' 
        : 'bg-slate-100 dark:bg-slate-900/20 opacity-60 grayscale cursor-default'
    ]"
    @click="exercise.link ? $emit('view-details', exercise) : null"
  >
    <!-- Background Glow Effect -->
    <div
      class="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-500/5 dark:bg-indigo-500/10 blur-3xl transition-all duration-500 group-hover:bg-indigo-500/10 dark:group-hover:bg-indigo-500/20"
    ></div>

    <div>
      <!-- Category Badge -->
      <div class="mb-4 flex items-start justify-between">
        <span
          class="inline-block rounded-full bg-slate-100 dark:bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-indigo-600 dark:text-indigo-300 backdrop-blur-sm transition-colors group-hover:bg-indigo-500/10 dark:group-hover:bg-indigo-500/20 group-hover:text-indigo-700 dark:group-hover:text-indigo-200"
        >
          {{ t(exercise.category) }}
        </span>
      </div>

      <!-- Title & Goal -->
      <h3
        class="mb-2 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-xl font-bold text-transparent transition-all group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-slate-900 dark:group-hover:from-indigo-300 dark:group-hover:to-white"
      >
        {{ t(exercise.title) }}
      </h3>
      <p class="mb-6 line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        {{ exercise.goal }}
      </p>
    </div>

    <!-- Action / Format Info -->
    <div class="flex items-center justify-between border-t border-slate-200 dark:border-white/5 pt-4">
      <div class="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-500">
        <i class="fas fa-desktop"></i>
        <span>{{ exercise.format.split(',')[0] }}</span>
      </div>
      
      <button
        class="flex items-center space-x-2 text-sm font-semibold transition-colors focus:outline-none"
        :class="exercise.link ? 'text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300' : 'text-slate-400 cursor-default'"
        :disabled="!exercise.link"
        @click.stop="exercise.link ? $emit('view-details', exercise) : null"
      >
        <span>{{ exercise.link ? 'Подробнее' : 'Скоро' }}</span>
        <i v-if="exercise.link" class="fas fa-arrow-right transition-transform duration-300 group-hover:translate-x-1"></i>
        <i v-else class="fas fa-lock"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Exercise } from '@/data/exercises';
import { t } from '~/utils/translations';

defineProps<{
  exercise: Exercise;
}>();

defineEmits<{
  (e: 'view-details', exercise: Exercise): void;
}>();
</script>

<style scoped>
/* Optional: Add custom shine effect if needed, but Tailwind utilities cover most */
</style>
