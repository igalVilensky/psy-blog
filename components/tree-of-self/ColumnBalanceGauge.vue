<!-- ColumnBalanceGauge.vue -->
<template>
  <div
    class="bg-white/5 backdrop-blur rounded-xl p-4 shadow-xl border border-white/10"
  >
    <h3 class="text-lg font-semibold text-white mb-2">Баланс колонн</h3>
    <div class="flex items-center space-x-4 mb-2">
      <div class="flex-1">
        <div class="flex justify-between mb-1">
          <span class="text-xs text-yellow-300">Правая (Огонь)</span>
          <span class="text-xs text-yellow-300"
            >{{ Math.round(columnProgress.right) }}%</span
          >
        </div>
        <div class="w-full bg-black/30 rounded-full h-2">
          <div
            class="h-2 rounded-full bg-gradient-to-r from-yellow-500/70 to-yellow-300"
            :style="{ width: `${columnProgress.right}%` }"
          ></div>
        </div>
      </div>
      <div class="flex-1">
        <div class="flex justify-between mb-1">
          <span class="text-xs text-blue-300">Левая (Вода)</span>
          <span class="text-xs text-blue-300"
            >{{ Math.round(columnProgress.left) }}%</span
          >
        </div>
        <div class="w-full bg-black/30 rounded-full h-2">
          <div
            class="h-2 rounded-full bg-gradient-to-r from-blue-500/70 to-blue-300"
            :style="{ width: `${columnProgress.left}%` }"
          ></div>
        </div>
      </div>
      <div class="flex-1">
        <div class="flex justify-between mb-1">
          <span class="text-xs text-green-300">Центр (Воздух)</span>
          <span class="text-xs text-green-300"
            >{{ Math.round(columnProgress.center) }}%</span
          >
        </div>
        <div class="w-full bg-black/30 rounded-full h-2">
          <div
            class="h-2 rounded-full bg-gradient-to-r from-green-500/70 to-green-300"
            :style="{ width: `${columnProgress.center}%` }"
          ></div>
        </div>
      </div>
    </div>
    <p class="text-xs text-white/80 mt-1">
      <span class="font-medium">Рекомендация:</span>
      {{ columnRecommendation }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  columnProgress: {
    type: Object,
    required: true,
    default: () => ({ left: 0, right: 0, center: 0 }),
  },
  columnRecommendation: {
    type: String,
    required: true,
    default: "",
  },
});
</script>
