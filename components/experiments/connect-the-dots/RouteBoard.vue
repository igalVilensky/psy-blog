<template>
  <!-- SVG board for the Connect the Dots experiment -->
  <div
    class="ctd-board-wrap"
    role="region"
    aria-label="Connect the Dots board"
  >
    <svg
      class="ctd-board-svg"
      :viewBox="`0 0 ${VBW} ${VBH}`"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Point board"
    >
      <!-- Decorative grid -->
      <defs>
        <pattern
          :id="gridPatternId"
          width="50"
          height="50"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 50 0 L 0 0 0 50"
            fill="none"
            stroke="#D8D1C4"
            stroke-width="0.5"
            opacity="0.5"
          />
        </pattern>
      </defs>

      <rect
        width="100%"
        height="100%"
        :fill="`url(#${gridPatternId})`"
      />

      <!-- Route lines -->
      <g
        role="presentation"
        aria-hidden="true"
      >
        <line
          v-for="(segment, index) in routeSegments"
          :key="`segment-${index}`"
          :x1="segment.x1"
          :y1="segment.y1"
          :x2="segment.x2"
          :y2="segment.y2"
          :stroke="activeColor"
          :stroke-width="segment.isHighlighted ? 4 : 2.5"
          :opacity="segment.isHighlighted ? 1 : 0.9"
          stroke-linecap="round"
          class="ctd-route-line"
        />
      </g>

      <!-- Points -->
      <g
        v-for="point in vbPoints"
        :key="point.id"
      >
        <!-- Large interactive hit target -->
        <circle
          v-if="!readonly"
          :cx="point.cx"
          :cy="point.cy"
          r="34"
          fill="transparent"
          tabindex="0"
          role="button"
          :aria-label="pointAriaLabel(point)"
          :aria-pressed="selectedSet.has(point.id)"
          :class="[
            'ctd-point-hit',
            selectedSet.has(point.id)
              ? 'ctd-point-hit--selected'
              : '',
          ]"
          @click="onPointClick(point.id)"
          @keydown.enter.prevent="onPointClick(point.id)"
          @keydown.space.prevent="onPointClick(point.id)"
        />

        <!-- Visible point -->
        <circle
          :cx="point.cx"
          :cy="point.cy"
          :r="selectedSet.has(point.id) ? 14 : 11"
          :fill="selectedSet.has(point.id) ? activeColor : '#FFFDF7'"
          :stroke="selectedSet.has(point.id) ? activeColor : '#6F6A61'"
          :stroke-width="selectedSet.has(point.id) ? 2 : 1.5"
          class="ctd-point-dot"
          :class="{
            'ctd-point-dot--selected': selectedSet.has(point.id),
          }"
          aria-hidden="true"
        />

        <!-- Sequence number -->
        <text
          v-if="
            selectedSet.has(point.id) &&
            showSequenceNumbers !== false
          "
          :x="point.cx"
          :y="point.cy + 1"
          text-anchor="middle"
          dominant-baseline="middle"
          fill="#fff"
          font-size="10"
          font-weight="700"
          font-family="system-ui, sans-serif"
          aria-hidden="true"
          class="ctd-point-label"
        >
          {{ getOrder(point.id) }}
        </text>

        <!-- Hover ring -->
        <circle
          v-if="!readonly && !selectedSet.has(point.id)"
          :cx="point.cx"
          :cy="point.cy"
          r="18"
          fill="none"
          :stroke="activeColor"
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
import { computed, useId } from 'vue'
import {
  type ExperimentPoint,
  toVB,
  VIEWBOX_W,
  VIEWBOX_H,
} from '~/utils/connectTheDots'

const VBW = VIEWBOX_W
const VBH = VIEWBOX_H

const props = withDefaults(
  defineProps<{
    points: ExperimentPoint[]
    pointOrder: number[]
    selectedSet: Set<number>
    readonly?: boolean
    routeColor?: string
    showSequenceNumbers?: boolean
    activeSegmentRange?: [number, number] | null
  }>(),
  {
    readonly: false,
    routeColor: '#FF5A36',
    showSequenceNumbers: true,
    activeSegmentRange: null,
  },
)

const emit = defineEmits<{
  selectPoint: [id: number]
}>()

/**
 * Vue's useId() is stable between server-side rendering and hydration.
 * Sanitizing it ensures the generated value is safe to use inside an
 * SVG URL fragment such as url(#ctd-grid-v0).
 */
const componentInstanceId = useId().replace(
  /[^a-zA-Z0-9_-]/g,
  '',
)

const gridPatternId = `ctd-grid-${componentInstanceId}`

const activeColor = computed(
  () => props.routeColor || '#FF5A36',
)

interface VBPoint {
  id: number
  cx: number
  cy: number
}

interface RouteSegment {
  x1: number
  y1: number
  x2: number
  y2: number
  isHighlighted: boolean
}

const vbPoints = computed<VBPoint[]>(() =>
  props.points.map((point) => ({
    id: point.id,
    ...toVB(point),
  })),
)

const vbPointMap = computed(
  () =>
    new Map(
      vbPoints.value.map((point) => [
        point.id,
        point,
      ]),
    ),
)

const routeSegments = computed<RouteSegment[]>(
  () => {
    const segments: RouteSegment[] = []

    for (
      let index = 0;
      index < props.pointOrder.length - 1;
      index++
    ) {
      const firstPoint = vbPointMap.value.get(
        props.pointOrder[index],
      )

      const secondPoint = vbPointMap.value.get(
        props.pointOrder[index + 1],
      )

      if (!firstPoint || !secondPoint) {
        continue
      }

      let isHighlighted = false

      if (props.activeSegmentRange) {
        const [fromIndex, toIndex] =
          props.activeSegmentRange

        isHighlighted =
          index >= fromIndex &&
          index < toIndex
      }

      segments.push({
        x1: firstPoint.cx,
        y1: firstPoint.cy,
        x2: secondPoint.cx,
        y2: secondPoint.cy,
        isHighlighted,
      })
    }

    return segments
  },
)

function getOrder(id: number): number {
  return props.pointOrder.indexOf(id) + 1
}

function pointAriaLabel(
  point: VBPoint,
): string {
  if (props.selectedSet.has(point.id)) {
    return `Point ${point.id + 1}, selected as number ${getOrder(point.id)}`
  }

  return `Point ${point.id + 1}, unselected. Click to connect.`
}

function onPointClick(id: number) {
  if (
    props.readonly ||
    props.selectedSet.has(id)
  ) {
    return
  }

  emit('selectPoint', id)
}
</script>

<style scoped>
.ctd-board-wrap {
  width: 100%;
  position: relative;
  overflow: hidden;
  background: var(--ctd-surface);
  border: 1px solid var(--ctd-border);
  border-radius: 4px;
}

.ctd-board-svg {
  display: block;
  width: 100%;
  height: auto;
}

/* Interactive hit target */

.ctd-point-hit {
  cursor: pointer;
  outline: none;
}

.ctd-point-hit--selected {
  cursor: not-allowed;
}

/* Hover and keyboard focus feedback */

.ctd-point-hit:not(
    .ctd-point-hit--selected
  ):hover
  ~ .ctd-point-ring,
.ctd-point-hit:not(
    .ctd-point-hit--selected
  ):focus-visible
  ~ .ctd-point-ring {
  opacity: 0.5;
}

.ctd-point-hit:focus-visible {
  outline: 2px solid var(--ctd-primary);
  outline-offset: 2px;
  border-radius: 50%;
}

/*
 * These elements are visual only.
 * The larger hit circle must receive pointer events even when the
 * pointer is directly over the visible point or sequence label.
 */

.ctd-point-dot,
.ctd-point-label,
.ctd-point-ring {
  pointer-events: none;
}

/* Point transitions */

.ctd-point-dot {
  transition:
    r 0.15s ease,
    fill 0.15s ease,
    stroke 0.15s ease;
}

.ctd-point-dot--selected {
  animation: ctd-pop 0.2s ease;
}

/* Route animation */

.ctd-route-line {
  animation: ctd-line-in 0.25s ease;
  transition:
    stroke 0.2s ease,
    stroke-width 0.2s ease,
    opacity 0.2s ease;
}

@keyframes ctd-pop {
  0% {
    r: 8;
  }

  60% {
    r: 18;
  }

  100% {
    r: 14;
  }
}

@keyframes ctd-line-in {
  from {
    stroke-dashoffset: 1000;
    stroke-dasharray: 1000;
  }

  to {
    stroke-dashoffset: 0;
    stroke-dasharray: 1000;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ctd-point-dot,
  .ctd-route-line {
    transition: none;
  }

  .ctd-point-dot--selected,
  .ctd-route-line {
    animation: none;
  }
}
</style>