<template>
  <g :class="`sefirah-${sefirah.id}`">
    <!-- Path of Wholeness highlight -->
    <circle
      v-if="
        pathOfWholeness && isCurrentWeekSefirah(sefirah.id) && sefirah.revealed
      "
      :cx="sefirah.x"
      :cy="sefirah.y"
      r="30"
      class="fill-yellow-500/20"
      filter="url(#gold-glow)"
    >
      <animate
        attributeName="r"
        values="30;35;30"
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
      v-if="sefirah.revealed && sefirah.points > 0"
      :cx="sefirah.x"
      :cy="sefirah.y"
      r="22"
      :class="getNodeGlowClass(sefirah.id, sefirah.column)"
      opacity="0.4"
      :filter="getGlowFilter(sefirah.column)"
    />

    <!-- Pulse effect on hover -->
    <circle
      :cx="sefirah.x"
      :cy="sefirah.y"
      r="22"
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
        values="22;30;22"
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
      :r="hoveredNode === sefirah.id ? 22 : 18"
      :fill="
        sefirah.revealed && sefirah.points > 0 ? sefirah.energyColor : '#374151'
      "
      stroke="#ffffff"
      stroke-width="1.5"
      class="node-circle cursor-pointer transition-all duration-300"
      :class="{
        'highlight-node':
          sefirah.revealed &&
          (highlightedCategory === sefirah.category ||
            energyOfDay === sefirah.column),
      }"
      @click="$emit('open-modal', sefirah.id)"
      @mouseover="$emit('update:hoveredNode', sefirah.id)"
      @mouseleave="$emit('update:hoveredNode', null)"
    >
      <animate
        v-if="sefirah.revealed && sefirah.points > 0"
        attributeName="opacity"
        values="0.9;1;0.9"
        dur="3s"
        repeatCount="indefinite"
      />
    </circle>

    <!-- Progress ring -->
    <circle
      v-if="sefirah.revealed && sefirah.points > 0"
      :cx="sefirah.x"
      :cy="sefirah.y"
      r="22"
      :stroke="getNodeStrokeColor(sefirah.id, sefirah.column)"
      stroke-width="5"
      stroke-linecap="round"
      fill="none"
      :stroke-dasharray="`${(sefirah.displayProgress / 100) * 138}, 138`"
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

    <!-- Action needed indicator -->
    <g v-if="sefirah.revealed && sefirah.displayProgress === 0">
      <circle
        :cx="sefirah.x + 20"
        :cy="sefirah.y - 20"
        r="8"
        fill="#ef4444"
        stroke="#ffffff"
        stroke-width="1"
        class="action-needed-indicator"
      >
        <animate
          attributeName="opacity"
          values="0.6;1;0.6"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <text
        :x="sefirah.x + 20"
        :y="sefirah.y - 20"
        class="text-xs font-semibold text-white"
        fill="white"
        text-anchor="middle"
        dominant-baseline="middle"
      >
        !
      </text>
    </g>

    <!-- Icon inside node -->
    <foreignObject
      :x="sefirah.x - 12"
      :y="sefirah.y - 12"
      width="24"
      height="24"
      style="pointer-events: none"
    >
      <div class="flex items-center justify-center h-full w-full">
        <i
          class="fas text-white text-sm"
          :class="getSefirahIcon(sefirah.id)"
        ></i>
      </div>
    </foreignObject>

    <!-- Level indicator -->
    <text
      v-if="sefirah.revealed && sefirah.level > 1"
      :x="sefirah.x + 24"
      :y="sefirah.y - 20"
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
      :y="sefirah.y + 35"
      class="font-medium text-sm"
      :fill="sefirah.revealed ? 'white' : 'rgba(255, 255, 255, 0.7)'"
      text-anchor="middle"
      dominant-baseline="middle"
    >
      {{ sefirah.function }}
    </text>
    <text
      :x="getLabelX(sefirah)"
      :y="sefirah.y + 50"
      class="text-[0.7rem] font-light"
      :fill="sefirah.revealed ? 'white' : 'rgba(255, 255, 255, 0.7)'"
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
defineEmits(["update:hoveredNode", "open-modal"]);
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
.action-needed-indicator {
  z-index: 10;
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
