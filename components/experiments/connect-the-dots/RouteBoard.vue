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

      <!-- Candidate preview route -->
      <g
        v-if="candidateOrder"
        role="presentation"
        aria-hidden="true"
      >
        <line
          v-for="(segment, index) in candidateSegments"
          :key="`candidate-segment-${index}`"
          :x1="segment.x1"
          :y1="segment.y1"
          :x2="segment.x2"
          :y2="segment.y2"
          stroke="#8B5CF6"
          :stroke-width="segment.isHighlighted ? 4 : 2.5"
          :opacity="segment.isHighlighted ? 0.95 : 0.5"
          stroke-linecap="round"
          stroke-dasharray="10 8"
          class="ctd-route-line ctd-route-line--candidate"
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
          :aria-pressed="isPointPressed(point.id)"
          :class="[
            'ctd-point-hit',
            isPointUnavailable(point.id)
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
          :r="pointRadius(point.id)"
          :fill="pointFill(point.id)"
          :stroke="pointStroke(point.id)"
          :stroke-width="pointStrokeWidth(point.id)"
          :stroke-dasharray="isMoveDestination(point.id) ? '7 5' : undefined"
          class="ctd-point-dot"
          :class="{
            'ctd-point-dot--selected': selectedSet.has(point.id),
            'ctd-point-dot--boundary': isEditBoundary(point.id),
            'ctd-point-dot--move-source': isMoveSource(point.id),
            'ctd-point-dot--move-destination': isMoveDestination(point.id),
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
          v-if="!readonly && !isPointUnavailable(point.id)"
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
    editMode?: 'none' | 'reverse-section' | 'move-point'
    selectedEditIndices?: number[]
    moveSourceIndex?: number | null
    moveDestinationIndex?: number | null
    candidateOrder?: number[] | null
  }>(),
  {
    readonly: false,
    routeColor: '#FF5A36',
    showSequenceNumbers: true,
    activeSegmentRange: null,
    editMode: 'none',
    selectedEditIndices: () => [],
    moveSourceIndex: null,
    moveDestinationIndex: null,
    candidateOrder: null,
  },
)

const emit = defineEmits<{
  selectPoint: [id: number]
  selectRouteIndex: [index: number]
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
  () => buildSegments(props.pointOrder),
)

const candidateSegments = computed<RouteSegment[]>(
  () => buildSegments(props.candidateOrder || []),
)

const selectedEditIndexSet = computed(
  () => new Set(props.selectedEditIndices),
)

const pointRouteIndexMap = computed(
  () =>
    new Map(
      props.pointOrder.map((id, index) => [
        id,
        index,
      ]),
    ),
)

function buildSegments(order: number[]): RouteSegment[] {
  const segments: RouteSegment[] = []

  for (
    let index = 0;
    index < order.length - 1;
    index++
  ) {
    const firstPoint = vbPointMap.value.get(
      order[index],
    )

    const secondPoint = vbPointMap.value.get(
      order[index + 1],
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
}

function getOrder(id: number): number {
  return props.pointOrder.indexOf(id) + 1
}

function pointAriaLabel(
  point: VBPoint,
): string {
  const routeIndex = pointRouteIndexMap.value.get(point.id)

  if (props.editMode === 'reverse-section' && routeIndex !== undefined) {
    if (selectedEditIndexSet.value.has(routeIndex)) {
      return `Route position ${routeIndex + 1}, point ${point.id + 1}, selected as section boundary.`
    }

    if (props.selectedEditIndices.length === 0) {
      return `Route position ${routeIndex + 1}, point ${point.id + 1}. Select as first section boundary.`
    }

    return `Route position ${routeIndex + 1}, point ${point.id + 1}. Select as second section boundary.`
  }

  if (props.editMode === 'move-point' && routeIndex !== undefined) {
    if (props.moveSourceIndex === routeIndex) {
      return `Route position ${routeIndex + 1}, point ${point.id + 1}. Selected to move.`
    }

    if (props.moveDestinationIndex === routeIndex) {
      return `Route position ${routeIndex + 1}, point ${point.id + 1}. Selected as insertion destination.`
    }

    if (props.moveSourceIndex === null) {
      return `Route position ${routeIndex + 1}, point ${point.id + 1}. Select this point to move.`
    }

    return `Route position ${routeIndex + 1}, point ${point.id + 1}. Insert selected point before this position.`
  }

  if (props.selectedSet.has(point.id)) {
    return `Point ${point.id + 1}, selected as number ${getOrder(point.id)}`
  }

  return `Point ${point.id + 1}, unselected. Click to connect.`
}

function onPointClick(id: number) {
  if (props.readonly) {
    return
  }

  if (props.editMode === 'reverse-section' || props.editMode === 'move-point') {
    const routeIndex = pointRouteIndexMap.value.get(id)
    if (routeIndex !== undefined) {
      emit('selectRouteIndex', routeIndex)
    }
    return
  }

  if (props.selectedSet.has(id)) {
    return
  }

  emit('selectPoint', id)
}

function isEditBoundary(id: number): boolean {
  const routeIndex = pointRouteIndexMap.value.get(id)
  if (routeIndex === undefined) return false
  if (props.editMode === 'move-point') {
    return routeIndex === props.moveSourceIndex || routeIndex === props.moveDestinationIndex
  }
  return selectedEditIndexSet.value.has(routeIndex)
}

function isMoveSource(id: number): boolean {
  const routeIndex = pointRouteIndexMap.value.get(id)
  return props.editMode === 'move-point' && routeIndex === props.moveSourceIndex
}

function isMoveDestination(id: number): boolean {
  const routeIndex = pointRouteIndexMap.value.get(id)
  return props.editMode === 'move-point' && routeIndex === props.moveDestinationIndex
}

function isPointUnavailable(id: number): boolean {
  return (
    props.editMode !== 'reverse-section' &&
    props.editMode !== 'move-point' &&
    props.selectedSet.has(id)
  )
}

function isPointPressed(id: number): boolean {
  if (props.editMode === 'reverse-section' || props.editMode === 'move-point') {
    return isEditBoundary(id)
  }

  return props.selectedSet.has(id)
}

function pointRadius(id: number): number {
  if (isMoveSource(id)) return 18
  if (isMoveDestination(id)) return 16
  if (isEditBoundary(id)) return 17
  return props.selectedSet.has(id) ? 14 : 11
}

function pointFill(id: number): string {
  if (isMoveSource(id)) return '#8B5CF6'
  if (isMoveDestination(id)) return '#FFFDF7'
  if (isEditBoundary(id)) return '#8B5CF6'
  return props.selectedSet.has(id) ? activeColor.value : '#FFFDF7'
}

function pointStroke(id: number): string {
  if (isMoveSource(id)) return '#171717'
  if (isMoveDestination(id)) return '#8B5CF6'
  if (isEditBoundary(id)) return '#FFFDF7'
  return props.selectedSet.has(id) ? activeColor.value : '#6F6A61'
}

function pointStrokeWidth(id: number): number {
  if (isMoveSource(id) || isMoveDestination(id)) return 4
  if (isEditBoundary(id)) return 4
  return props.selectedSet.has(id) ? 2 : 1.5
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
