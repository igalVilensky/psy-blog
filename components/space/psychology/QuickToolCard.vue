<template>
  <div class="relative h-full">
    <component :is="tool.disabled ? 'div' : (tool.path ? 'NuxtLink' : 'div')"
      :to="!tool.disabled && tool.path ? tool.path : undefined"
      class="h-full bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-cyan-500/10 rounded-xl p-4 flex flex-col items-center justify-center gap-3 transition-colors shadow-sm dark:shadow-none"
      :class="[
        tool.disabled
          ? 'opacity-75 cursor-not-allowed'
          : 'hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer group'
      ]">
      <div
        class="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center transition-transform"
        :class="{ 'group-hover:scale-110': !tool.disabled }">
        <i :class="[tool.icon, tool.color, 'text-xl']"></i>
      </div>
      <span class="text-sm font-medium text-slate-600 dark:text-slate-300 text-center"
        :class="{ 'group-hover:text-slate-900 dark:group-hover:text-white': !tool.disabled }">
        {{ tool.title }}
      </span>
    </component>

    <!-- Coming Soon Overlay -->
    <div v-if="tool.disabled"
      class="absolute inset-0 bg-slate-900/60 backdrop-blur-[1px] flex items-center justify-center z-20 rounded-xl">
      <div
        class="p-1.5 rounded-lg bg-slate-900/80 border border-slate-700/50 text-slate-300 shadow-xl backdrop-blur-md">
        <i class="fas fa-clock text-cyan-500 text-xs"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  tool: {
    type: Object,
    required: true,
  },
});
</script>
