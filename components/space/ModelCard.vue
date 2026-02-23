<template>
  <div
    class="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900/50 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 hover:shadow-xl hover:shadow-cyan-500/20"
  >
    <!-- Background Glow Effect (Cyan for Models) -->
    <div
      class="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-500/5 dark:bg-cyan-500/10 blur-3xl transition-all duration-500 group-hover:bg-cyan-500/10 dark:group-hover:bg-cyan-500/20"
    ></div>

    <div>
      <!-- Goal Badge -->
      <div class="mb-4 flex items-start justify-between">
        <span
          class="inline-block rounded-full bg-zinc-100 dark:bg-white/5 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-cyan-600 dark:text-cyan-300 backdrop-blur-sm transition-colors group-hover:bg-cyan-500/10 dark:group-hover:bg-cyan-500/20 group-hover:text-cyan-700 dark:group-hover:text-cyan-200 border border-zinc-200 dark:border-zinc-800"
        >
          {{ t(model.relatedGoals) }}
        </span>
      </div>

      <!-- Title & Explanation -->
      <h3
        class="mb-2 bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-300 bg-clip-text text-xl font-black text-transparent transition-all group-hover:bg-gradient-to-r group-hover:from-cyan-600 group-hover:to-zinc-900 dark:group-hover:from-cyan-300 dark:group-hover:to-white uppercase tracking-tight"
      >
        {{ t(model.title) }}
      </h3>
      <p class="mb-6 line-clamp-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 font-medium">
        {{ model.explanation }}
      </p>
    </div>

    <!-- Visualization Info -->
    <div class="flex items-center justify-between border-t border-zinc-200 dark:border-white/5 pt-4">
      <div class="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-500 truncate max-w-[60%]">
        <i class="fas fa-eye text-cyan-500"></i>
        <span class="truncate">{{ model.visualization }}</span>
      </div>
      
      <button
        class="flex items-center space-x-2 text-xs font-black uppercase tracking-widest text-cyan-600 dark:text-cyan-400 transition-colors hover:text-cyan-500 dark:hover:text-cyan-300 focus:outline-none"
        @click.stop="$emit('view-details', model)"
      >
        <span>Изучить</span>
        <i class="fas fa-arrow-right transition-transform duration-300 group-hover:translate-x-1"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Model } from '@/data/models';
import { t } from '~/utils/translations';

defineProps<{
  model: Model;
}>();

defineEmits<{
  (e: 'view-details', model: Model): void;
}>();
</script>
