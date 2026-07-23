<template>
  <!-- SVG board for the Connect the Dots experiment -->
  <div class="ctd-board-wrap" role="region" aria-label="Connect the Dots board">
    <svg
      class="ctd-board-svg"
      :viewBox="`0 0 ${VBW} ${VBH}`"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Point board"
    >
      <!-- ── Grid lines (decorative) ── -->
      <defs>
        <pattern id="ctd-grid" width="50" height="50" patternUnits="userSpaceOnUse">
          <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#D8D1C4" stroke-width="0.5" opacity="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#ctd-grid)" />

      <!-- ── Route lines (beneath points) ── -->
      <g role="presentation" aria-hidden="true">
        <line
          v-for="(seg, i) in routeSegments"
          :key="`seg-${i}`"
          :x1="seg.x1"
          :y1="seg.y1"
          :x2="seg.x2"
          :y2="seg.y2"
          stroke="#FF5A36"
          stroke-width="2.5"
          stroke-linecap="round"
          class="ctd-route-line"
        />
      </g>

      <!-- ── Points ── -->
      <g v-for="p in vbPoints" :key="p.id">
        <!-- Large invisible hit target for touch -->
        <circle
          :cx="p.cx"
          :cy="p.cy"
          r="34"
          fill="transparent"
          tabindex="0"
          role="button"
          :aria-label="pointAriaLabel(p)"
          :aria-pressed="selectedSet.has(p.id)"
          :class="['ctd-point-hit', selectedSet.has(p.id) ? 'ctd-point-hit--selected' : '']"
          @click="onPointClick(p.id)"
          @keydown.enter.prevent="onPointClick(p.id)"
          @keydown.space.prevent="onPointClick(p.id)"
        />

        <!-- Visual dot -->
        <circle
          :cx="p.cx"
          :cy="p.cy"
          :r="selectedSet.has(p.id) ? 14 : 11"
          :fill="selectedSet.has(p.id) ? '#FF5A36' : '#FFFDF7'"
          :stroke="selectedSet.has(p.id) ? '#D94224' : '#6F6A61'"
          :stroke-width="selectedSet.has(p.id) ? 2 : 1.5"
          class="ctd-point-dot"
          :class="{ 'ctd-point-dot--selected': selectedSet.has(p.id) }"
          aria-hidden="true"
        />

        <!-- Sequence number inside selected dot -->
        <text
          v-if="selectedSet.has(p.id)"
          :x="p.cx"
          :y="p.cy + 1"
          text-anchor="middle"
          dominant-baseline="middle"
          fill="#fff"
          font-size="10"
          font-weight="700"
          font-family="system-ui, sans-serif"
          aria-hidden="true"
          class="ctd-point-label"
        >{{ getOrder(p.id) }}</text>

        <!-- Outer ring for unselected hover state -->
        <circle
          v-if="!selectedSet.has(p.id)"
          :cx="p.cx"
          :cy="p.cy"
          r="18"
          fill="none"
          stroke="#FF5A36"
          stroke-width="1.5"
          opacity="0"
          class="ctd-point-ring"
          aria-hidden="true"
        />
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  type ExperimentPoint,
  toVB,
  VIEWBOX_W,
  VIEWBOX_H,
} from '~/utils/connectTheDots'

const VBW = VIEWBOX_W
const VBH = VIEWBOX_H

const props = defineProps<{
  points: ExperimentPoint[]
  pointOrder: number[]
  selectedSet: Set<number>
}>()

const emit = defineEmits<{ selectPoint: [id: number] }>()

interface VBPoint {
  id: number
  cx: number
  cy: number
}

const vbPoints = computed<VBPoint[]>(() =>
  props.points.map((p) => ({ id: p.id, ...toVB(p) }))
)

const vbPointMap = computed(() =>
  new Map(vbPoints.value.map((p) => [p.id, p]))
)

interface RouteSeg { x1: number; y1: number; x2: number; y2: number }

const routeSegments = computed<RouteSeg[]>(() => {
  const segs: RouteSeg[] = []
  for (let i = 0; i < props.pointOrder.length - 1; i++) {
    const a = vbPointMap.value.get(props.pointOrder[i])
    const b = vbPointMap.value.get(props.pointOrder[i + 1])
    if (a && b) segs.push({ x1: a.cx, y1: a.cy, x2: b.cx, y2: b.cy })
  }
  return segs
})

/** 1-based selection order for a given point id */
function getOrder(id: number): number {
  return props.pointOrder.indexOf(id) + 1
}

function pointAriaLabel(p: VBPoint): string {
  if (props.selectedSet.has(p.id)) {
    return `Point ${p.id + 1}, selected as number ${getOrder(p.id)}`
  }
  return `Point ${p.id + 1}, unselected. Click to connect.`
}

function onPointClick(id: number) {
  if (props.selectedSet.has(id)) return
  emit('selectPoint', id)
}
</script>

<style scoped>
.ctd-board-wrap {
  width: 100%;
  background: var(--ctd-surface);
  border: 1px solid var(--ctd-border);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.ctd-board-svg {
  display: block;
  width: 100%;
  height: auto;
}

/* Hit target */
.ctd-point-hit {
  cursor: pointer;
  outline: none;
}
.ctd-point-hit--selected {
  cursor: not-allowed;
}
/* Hover: show ring */
.ctd-point-hit:not(.ctd-point-hit--selected):hover ~ .ctd-point-ring,
.ctd-point-hit:not(.ctd-point-hit--selected):focus-visible ~ .ctd-point-ring {
  opacity: 0.5;
}
/* Focus ring via outline on SVG element */
.ctd-point-hit:focus-visible {
  outline: 2px solid #FF5A36;
  outline-offset: 2px;
  border-radius: 50%;
}

/* Dot, label and ring are purely visual — let the hit circle own all events */
.ctd-point-dot,
.ctd-point-label,
.ctd-point-ring {
  pointer-events: none;
}

/* Dot transitions */
.ctd-point-dot {
  transition: r 0.15s ease, fill 0.15s ease;
}
.ctd-point-dot--selected {
  animation: ctd-pop 0.2s ease;
}

/* Route line */
.ctd-route-line {
  animation: ctd-line-in 0.25s ease;
}

@keyframes ctd-pop {
  0%   { r: 8; }
  60%  { r: 18; }
  100% { r: 14; }
}

@keyframes ctd-line-in {
  from { stroke-dashoffset: 1000; stroke-dasharray: 1000; }
  to   { stroke-dashoffset: 0;    stroke-dasharray: 1000; }
}

@media (prefers-reduced-motion: reduce) {
  .ctd-point-dot--selected { animation: none; }
  .ctd-route-line { animation: none; }
}
</style>
