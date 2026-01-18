<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <div v-for="stat in stats" :key="stat.label"
      class="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 group">
      <div class="flex items-center justify-between mb-4">
        <div
          :class="`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${stat.bgClass}`">
          <i :class="`${stat.icon} text-xl ${stat.textClass}`"></i>
        </div>
        <div v-if="stat.trend"
          :class="`px-2 py-1 rounded-lg text-[10px] font-black ${stat.trendColor} bg-emerald-500/10`">
          {{ stat.trend }} <i :class="stat.trendIcon"></i>
        </div>
      </div>
      <div>
        <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">{{ stat.label }}</span>
        <div class="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{{ stat.value }}</div>
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
