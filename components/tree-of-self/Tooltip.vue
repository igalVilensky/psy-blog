<template>
  <foreignObject
    :x="activeTooltip.x - 100"
    :y="activeTooltip.y - (activeTooltip.y < 200 ? 0 : 90)"
    width="200"
    height="90"
    class="tooltip-container"
    style="pointer-events: none"
  >
    <div
      class="bg-black/80 backdrop-blur-sm p-2 rounded text-white text-xs border border-white/20"
    >
      <div class="flex justify-between items-center">
        <p class="font-medium">{{ activeTooltip.function }}</p>
        <span
          class="px-1.5 py-0.5 rounded text-[10px] font-medium"
          :class="getTooltipLevelClass(activeTooltip.column)"
        >
          Ур. {{ activeTooltip.level }}
        </span>
      </div>
      <p class="text-gray-300">{{ activeTooltip.name }}</p>
      <div class="w-full bg-gray-800/50 rounded-full h-1 mt-1">
        <div
          class="h-1 rounded-full"
          :class="getProgressBarClass(activeTooltip.id, activeTooltip.column)"
          :style="{ width: `${activeTooltip.displayProgress}%` }"
        ></div>
      </div>
      <div class="flex justify-between mt-1">
        <span class="text-[10px] text-gray-400"
          >{{ activeTooltip.points }} очков</span
        >
        <span class="text-[10px] text-gray-400"
          >{{ activeTooltip.dailyActions }}/{{
            activeTooltip.maxActions
          }}
          сегодня</span
        >
      </div>
    </div>
  </foreignObject>
</template>

<script setup>
import { defineProps } from "vue";

// Define props
defineProps({
  activeTooltip: {
    type: Object,
    required: true,
  },
  getTooltipLevelClass: {
    type: Function,
    required: true,
  },
  getProgressBarClass: {
    type: Function,
    required: true,
  },
});
</script>

<style scoped>
.tooltip-container {
  animation: fadeIn 0.2s ease-in;
  z-index: 10;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
