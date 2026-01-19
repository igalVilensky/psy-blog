<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <div v-for="stat in stats" :key="stat.label"
      class="group relative bg-white dark:bg-stone-900 border-l-4 transition-all hover:shadow-md"
      :class="getBorderColor(stat)">

      <div class="p-5">
        <!-- Label first, editorial style -->
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-semibold uppercase tracking-wide text-stone-400 dark:text-stone-500">{{ stat.label
            }}</span>
          <i :class="`${stat.icon} text-stone-300 dark:text-stone-700 text-sm`"></i>
        </div>

        <!-- Large value, newspaper style -->
        <div class="flex items-baseline gap-2">
          <div class="text-4xl font-bold text-stone-900 dark:text-white tabular-nums">{{ stat.value }}</div>
          <div v-if="stat.trend" class="text-sm font-medium" :class="stat.trendColor">
            {{ stat.trend }}
          </div>
        </div>
      </div>

      <!-- Accent line that grows on hover -->
      <div
        class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-stone-200 dark:via-stone-700 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
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

const getBorderColor = (stat) => {
  if (stat.label.includes('Всего')) return 'border-blue-500';
  if (stat.label.includes('Активные')) return 'border-emerald-500';
  if (stat.label.includes('риска')) return 'border-amber-500';
  if (stat.label.includes('прогресс')) return 'border-purple-500';
  return 'border-stone-300 dark:border-stone-700';
};
</script>
