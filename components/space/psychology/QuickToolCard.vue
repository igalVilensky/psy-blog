<!-- components/space/psychology/QuickToolCard.vue -->
<template>
  <div class="relative h-full">
    <component :is="tool.disabled ? 'div' : (tool.path ? 'NuxtLink' : 'div')"
      :to="!tool.disabled && tool.path ? tool.path : undefined"
      class="h-full bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 flex flex-col items-center justify-center gap-4 transition-all shadow-sm hover:shadow-xl hover:shadow-cyan-500/5 group"
      :class="[
        tool.disabled
          ? 'opacity-60 cursor-not-allowed grayscale'
          : 'hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:border-cyan-500/30 cursor-pointer'
      ]">
      <div
        class="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white dark:group-hover:bg-zinc-700 shadow-inner"
        :class="{ 'group-hover:shadow-md': !tool.disabled }">
        <i :class="[tool.icon, tool.color, 'text-xl transition-colors duration-300']"></i>
      </div>
      <span
        class="text-xs font-black text-zinc-600 dark:text-zinc-400 uppercase tracking-widest text-center leading-tight transition-colors duration-300"
        :class="{ 'group-hover:text-zinc-900 dark:group-hover:text-white': !tool.disabled }">
        {{ tool.title }}
      </span>
    </component>

    <!-- Coming Soon Overlay -->
    <div v-if="tool.disabled"
      class="absolute inset-0 bg-zinc-950/40 backdrop-blur-[1px] flex items-center justify-center z-20 rounded-2xl">
      <div class="p-2 rounded-xl bg-zinc-900 shadow-2xl border border-zinc-800 text-zinc-500">
        <i class="fas fa-lock text-xs"></i>
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
