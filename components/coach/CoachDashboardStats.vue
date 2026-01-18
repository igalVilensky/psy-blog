<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
    <div v-for="stat in stats" :key="stat.label" 
         class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
      <div class="flex items-center justify-between mb-2">
        <div :class="`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bgClass}`">
          <i :class="`${stat.icon} ${stat.textClass}`"></i>
        </div>
        <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">{{ stat.label }}</span>
      </div>
      <div class="flex items-end justify-between">
        <div class="text-2xl font-black font-mono text-slate-900 dark:text-white">{{ stat.value }}</div>
        <div v-if="stat.trend" :class="`text-xs font-bold ${stat.trendColor}`">
          {{ stat.trend }} <i :class="stat.trendIcon"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  stats: {
    type: Array,
    required: true
  }
});
</script>
