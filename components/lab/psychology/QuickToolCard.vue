<template>
  <NuxtLink
    v-if="tool.path"
    :to="tool.path"
    class="bg-slate-800/50 border border-cyan-500/10 rounded-xl p-4 flex flex-col items-center justify-center gap-3 hover:bg-slate-800 transition-colors cursor-pointer group"
  >
    <div
      class="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center group-hover:scale-110 transition-transform"
    >
      <i :class="[tool.icon, tool.color, 'text-xl']"></i>
    </div>
    <span class="text-sm font-medium text-slate-300 group-hover:text-white text-center">{{
      tool.title
    }}</span>
  </NuxtLink>
  <div
    v-else
    class="bg-slate-800/50 border border-cyan-500/10 rounded-xl p-4 flex flex-col items-center justify-center gap-3 hover:bg-slate-800 transition-colors cursor-pointer group"
  >
    <div
      class="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center group-hover:scale-110 transition-transform"
    >
      <i :class="[tool.icon, tool.color, 'text-xl']"></i>
    </div>
    <span class="text-sm font-medium text-slate-300 group-hover:text-white text-center">{{
      tool.title
    }}</span>
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
