<template>
  <section
    class="mb-8 bg-white/5 backdrop-blur rounded-xl shadow-xl border border-white/10"
  >
    <div class="relative flex flex-col items-center">
      <!-- SVG Tree for Medium+ Screens -->
      <div class="relative mb-4">
        <svg
          class="w-full max-w-3xl h-[32rem] lg:max-w-4xl lg:h-[40rem] xl:max-w-5xl xl:h-[48rem]"
          viewBox="0 0 400 600"
          preserveAspectRatio="xMidYMid meet"
        >
          <!-- SVG Definitions -->
          <SvgDefs />

          <!-- Background Rectangle -->
          <rect x="0" y="0" width="400" height="600" fill="url(#svg-bg)" />

          <!-- Title inside SVG (desktop only) -->
          <g class="hidden md:block">
            <text fill="white" x="120" y="30" class="text-lg font-semibold">
              Ваше Древо Себя
            </text>
          </g>

          <!-- Descending Light Animation (for Path of Wholeness) -->
          <g v-if="pathOfWholeness">
            <line
              x1="200"
              y1="50"
              x2="200"
              y2="550"
              stroke="url(#golden-light)"
              stroke-width="4"
              stroke-opacity="0.8"
              filter="url(#gold-glow)"
              class="descending-light"
            >
              <animate
                attributeName="stroke-dasharray"
                values="0,1000;1000,0"
                dur="15s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-dashoffset"
                values="0;-1000"
                dur="15s"
                repeatCount="indefinite"
              />
            </line>
          </g>

          <!-- Dynamic Connections -->
          <g class="connections">
            <!-- Vertical light beam -->
            <line
              x1="200"
              y1="67"
              x2="200"
              y2="533"
              stroke="url(#vertical-beam)"
              stroke-width="1"
              stroke-opacity="0.2"
            />

            <!-- Connection Paths -->
            <ConnectionLine
              v-for="(conn, idx) in connections"
              :key="`conn-${idx}`"
              :conn="conn"
              :get-connection-column-class="getConnectionColumnClass"
              :get-active-stroke-class="getActiveStrokeClass"
              :get-connection-particle-class="getConnectionParticleClass"
            />
          </g>

          <!-- Sefirot Nodes -->
          <SefirahNode
            v-for="sefirah in sefirot"
            :key="sefirah.id"
            :sefirah="sefirah"
            :path-of-wholeness="pathOfWholeness"
            :is-current-week-sefirah="isCurrentWeekSefirah"
            :hovered-node="hoveredNode"
            :highlighted-category="highlightedCategory"
            :energy-of-day="energyOfDay"
            :get-node-glow-class="getNodeGlowClass"
            :get-glow-filter="getGlowFilter"
            :get-node-pulse-class="getNodePulseClass"
            :get-node-stroke-color="getNodeStrokeColor"
            :get-sefirah-icon="getSefirahIcon"
            :get-label-x="getLabelX"
            :get-level-color="getLevelColor"
            :scroll-to-sefirah="scrollToSefirah"
            :show-node-tooltip="showNodeTooltip"
            :hide-node-tooltip="hideNodeTooltip"
          />

          <!-- Interactive Tooltip -->
          <Tooltip
            v-if="activeTooltip"
            :active-tooltip="activeTooltip"
            :get-tooltip-level-class="getTooltipLevelClass"
            :get-progress-bar-class="getProgressBarClass"
          />
        </svg>
      </div>
    </div>
  </section>
</template>

<script setup>
import SvgDefs from "./SvgDefs.vue";
import SefirahNode from "./SefirahNode.vue";
import ConnectionLine from "./ConnectionLine.vue";
import Tooltip from "./Tooltip.vue";
import { defineProps, defineEmits } from "vue";

// Define props
defineProps({
  sefirot: {
    type: Array,
    required: true,
  },
  connections: {
    type: Array,
    required: true,
  },
  pathOfWholeness: {
    type: Boolean,
    required: true,
  },
  currentWeek: {
    type: Number,
    required: true,
  },
  energyOfDay: {
    type: String,
    default: null,
  },
  highlightedCategory: {
    type: String,
    default: null,
  },
  hoveredNode: {
    type: String,
    default: null,
  },
  activeTooltip: {
    type: Object,
    default: null,
  },
  isCurrentWeekSefirah: {
    type: Function,
    required: true,
  },
  getConnectionColumnClass: {
    type: Function,
    required: true,
  },
  getActiveStrokeClass: {
    type: Function,
    required: true,
  },
  getConnectionParticleClass: {
    type: Function,
    required: true,
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
  getTooltipLevelClass: {
    type: Function,
    required: true,
  },
  getProgressBarClass: {
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

// Define emits for two-way binding
defineEmits(["update:hoveredNode", "update:activeTooltip"]);
</script>

<style scoped>
svg {
  pointer-events: bounding-box;
}
section {
  position: relative;
  z-index: 1;
}
.connections {
  z-index: 1;
}
</style>
