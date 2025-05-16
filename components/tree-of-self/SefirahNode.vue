<template>
  <g :class="`sefirah-${sefirah.id}`">
    <!-- Path of Wholeness highlight -->
    <circle
      v-if="pathOfWholeness && isCurrentWeekSefirah(sefirah.id)"
      :cx="sefirah.x"
      :cy="sefirah.y"
      r="25"
      class="fill-yellow-500/20"
      filter="url(#gold-glow)"
    >
      <animate
        attributeName="r"
        values="25;30;25"
        dur="3s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="opacity"
        values="0.3;0.7;0.3"
        dur="3s"
        repeatCount="indefinite"
      />
    </circle>

    <!-- Outer glow ring -->
    <circle
      v-if="sefirah.points > 0"
      :cx="sefirah.x"
      :cy="sefirah.y"
      r="18"
      :class="getNodeGlowClass(sefirah.id, sefirah.column)"
      opacity="0.4"
      :filter="getGlowFilter(sefirah.column)"
    />

    <!-- Pulse effect on hover -->
    <circle
      :cx="sefirah.x"
      :cy="sefirah.y"
      r="18"
      class="node-pulse"
      :class="getNodePulseClass(sefirah.category, sefirah.column)"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;0.6;0"
        dur="1.5s"
        begin="mouseover"
        repeatCount="indefinite"
        restart="whenNotActive"
      />
      <animate
        attributeName="r"
        values="15;25;15"
        dur="1.5s"
        begin="mouseover"
        repeatCount="indefinite"
        restart="whenNotActive"
      />
    </circle>

    <!-- Base node circle -->
    <circle
      :cx="sefirah.x"
      :cy="sefirah.y"
      :r="hoveredNode === sefirah.id ? 18 : 15"
      :fill="sefirah.points > 0 ? sefirah.energyColor : '#374151'"
      stroke="#ffffff"
      stroke-width="1"
      class="node-circle cursor-pointer transition-all duration-300"
      :class="{
        'highlight-node':
          highlightedCategory === sefirah.category ||
          energyOfDay === sefirah.column,
      }"
      @click="scrollToSefirah(sefirah.id)"
      @mouseover="
        showNodeTooltip(sefirah);
        $emit('update:hoveredNode', sefirah.id);
      "
      @mouseleave="
        hideNodeTooltip();
        $emit('update:hoveredNode', null);
      "
    >
      <animate
        v-if="sefirah.points > 0"
        attributeName="opacity"
        values="0.9;1;0.9"
        dur="3s"
        repeatCount="indefinite"
      />
    </circle>

    <!-- Progress ring -->
    <circle
      v-if="sefirah.points > 0"
      :cx="sefirah.x"
      :cy="sefirah.y"
      r="18"
      :stroke="getNodeStrokeColor(sefirah.id, sefirah.column)"
      stroke-width="4"
      stroke-linecap="round"
      fill="none"
      :stroke-dasharray="`${(sefirah.displayProgress / 100) * 113}, 113`"
      :transform="`rotate(-90 ${sefirah.x} ${sefirah.y})`"
      style="pointer-events: none"
    >
      <animate
        attributeName="stroke-opacity"
        values="0.8;1;0.8"
        dur="4s"
        repeatCount="indefinite"
      />
    </circle>

    <!-- Icon inside node -->
    <foreignObject
      :x="sefirah.x - 10"
      :y="sefirah.y - 10"
      width="20"
      height="20"
      style="pointer-events: none"
    >
      <div
        class="flex items-center justify-center h-full w-full"
        style="pointer-events: auto"
        @mouseover="showNodeTooltip(sefirah)"
        @mouseleave="hideNodeTooltip()"
      >
        <i
          class="fas text-white text-xs"
          :class="getSefirahIcon(sefirah.id)"
        ></i>
      </div>
    </foreignObject>

    <!-- Level indicator -->
    <text
      v-if="sefirah.level > 1"
      :x="sefirah.x + 20"
      :y="sefirah.y - 15"
      class="text-xs font-semibold text-white"
      fill="white"
      text-anchor="middle"
      dominant-baseline="middle"
    >
      {{ sefirah.level }}
    </text>

    <!-- Label with psychological term -->
    <text
      :x="getLabelX(sefirah)"
      :y="sefirah.y + 30"
      class="font-medium text-xs"
      fill="white"
      text-anchor="middle"
      dominant-baseline="middle"
    >
      {{ sefirah.function }}
    </text>
    <text
      :x="getLabelX(sefirah)"
      :y="sefirah.y + 45"
      class="text-[0.6rem] font-light"
      fill="white"
      text-anchor="middle"
      dominant-baseline="middle"
    >
      ({{ sefirah.name }})
    </text>
  </g>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

// Define props
defineProps({
  sefirah: {
    type: Object,
    required: true,
  },
  pathOfWholeness: {
    type: Boolean,
    required: true,
  },
  isCurrentWeekSefirah: {
    type: Function,
    required: true,
  },
  hoveredNode: {
    type: String,
    default: null,
  },
  highlightedCategory: {
    type: String,
    default: null,
  },
  energyOfDay: {
    type: String,
    default: null,
  },
  getNodeGlowClass: {
    type: Function,
    required: true,
  },
  getGlowFilter: {
    type: Function,
    required: true,
  },
  getNodePulseClass: {
    type: Function,
    required: true,
  },
  getNodeStrokeColor: {
    type: Function,
    required: true,
  },
  getSefirahIcon: {
    type: Function,
    required: true,
  },
  getLabelX: {
    type: Function,
    required: true,
  },
  getLevelColor: {
    type: Function,
    required: true,
  },
  scrollToSefirah: {
    type: Function,
    required: true,
  },
  showNodeTooltip: {
    type: Function,
    required: true,
  },
  hideNodeTooltip: {
    type: Function,
    required: true,
  },
});

// Define emits
defineEmits(["update:hoveredNode"]);
</script>

<style scoped>
.node-circle {
  transition: r 0.3s ease, filter 0.3s ease;
  z-index: 5;
}
.node-circle:hover {
  filter: brightness(1.2);
}
.highlight-node {
  filter: brightness(1.5);
  stroke: rgba(255, 255, 255, 0.8);
  stroke-width: 2;
  animation: glowPulse 1.5s ease-in-out infinite;
}
@keyframes glowPulse {
  0% {
    box-shadow: 0 0 5px 0 rgba(255, 255, 255, 0.1);
  }
  50% {
    box-shadow: 0 0 15px 0 rgba(255, 255, 255, 0.2);
  }
  100% {
    box-shadow: 0 0 5px 0 rgba(255, 255, 255, 0.1);
  }
}
</style>
