<template>
  <div class="ctd-collab" role="region" aria-label="Human and Machine Collaboration Round">
    <div class="ctd-round-header">
      <div class="ctd-round-header__left">
        <h1 class="ctd-round-title">HUMAN + MACHINE</h1>
        <p class="ctd-round-instruction">{{ instruction }}</p>
      </div>
      <div class="ctd-round-header__right">
        <RobotMascot
          :state="robotState"
          :message="robotMessage"
        />
      </div>
    </div>

    <div
      class="ctd-collab-mode"
      role="group"
      aria-label="Collaboration operation"
    >
      <button
        id="ctd-mode-reverse-btn"
        class="ctd-collab-mode__button"
        :class="{ 'ctd-collab-mode__button--active': editMode === 'reverse-section' }"
        type="button"
        :aria-pressed="editMode === 'reverse-section'"
        @click="$emit('setEditMode', 'reverse-section')"
      >
        REVERSE SECTION
      </button>
      <button
        id="ctd-mode-move-btn"
        class="ctd-collab-mode__button"
        :class="{ 'ctd-collab-mode__button--active': editMode === 'move-point' }"
        type="button"
        :aria-pressed="editMode === 'move-point'"
        @click="$emit('setEditMode', 'move-point')"
      >
        MOVE POINT
      </button>
    </div>

    <RouteBoard
      :points="points"
      :pointOrder="collaborationOrder"
      :selectedSet="selectedSet"
      routeColor="#3567D6"
      :editMode="editMode"
      :selectedEditIndices="selectedEditIndices"
      :moveSourceIndex="moveSourceIndex"
      :moveDestinationIndex="moveDestinationIndex"
      :candidateOrder="candidateOrder"
      :activeSegmentRange="activeSegmentRange"
      @selectRouteIndex="$emit('selectRouteIndex', $event)"
    />

    <div class="ctd-collab-controls">
      <div class="ctd-collab-controls__stats">
        <div class="ctd-collab-stat">
          <span class="ctd-collab-stat__label">Current route</span>
          <span class="ctd-collab-stat__value">{{ currentDistanceFormatted }}</span>
        </div>

        <div class="ctd-collab-stat">
          <span class="ctd-collab-stat__label">Candidate</span>
          <span
            class="ctd-collab-stat__value"
            :class="candidateClass"
          >
            {{ candidateDistanceFormatted }}
          </span>
        </div>

        <div class="ctd-collab-stat">
          <span class="ctd-collab-stat__label">Difference</span>
          <span
            class="ctd-collab-stat__value"
            :class="candidateClass"
          >
            {{ differenceFormatted }}
          </span>
        </div>

        <div class="ctd-collab-stat">
          <span class="ctd-collab-stat__label">Accepted</span>
          <span class="ctd-collab-stat__value">{{ acceptedChanges }}</span>
        </div>
      </div>

      <div
        v-if="candidateOrder"
        class="ctd-collab-proposal"
        :class="`ctd-collab-proposal--${feedback}`"
      >
        <span class="ctd-collab-proposal__label">{{ feedbackLabel }}</span>
        <span class="ctd-collab-proposal__text">{{ feedbackText }}</span>
      </div>

      <div class="ctd-collab-controls__actions">
        <button
          v-if="candidateOrder"
          id="ctd-accept-collab-btn"
          class="ctd-btn ctd-btn--primary"
          :disabled="feedback === 'worse'"
          :aria-disabled="feedback === 'worse'"
          @click="$emit('acceptCandidate')"
        >
          ACCEPT CHANGE
        </button>

        <button
          v-if="candidateOrder"
          id="ctd-reject-collab-btn"
          class="ctd-btn ctd-btn--ghost"
          @click="$emit('rejectCandidate')"
        >
          REJECT CHANGE
        </button>

        <button
          id="ctd-undo-collab-btn"
          class="ctd-btn ctd-btn--ghost"
          :disabled="!canUndo"
          @click="$emit('undoAccepted')"
        >
          UNDO LAST ACCEPTED CHANGE
        </button>

        <button
          id="ctd-reset-collab-btn"
          class="ctd-btn ctd-btn--ghost"
          @click="$emit('resetToMachine')"
        >
          RESET TO MACHINE ROUTE
        </button>

        <button
          id="ctd-finish-collab-btn"
          class="ctd-btn ctd-btn--primary"
          :disabled="!canFinish"
          :aria-disabled="!canFinish"
          @click="$emit('finish')"
        >
          FINISH COLLABORATION
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import RouteBoard from './RouteBoard.vue'
import RobotMascot from './RobotMascot.vue'
import type {
  CollaborationEditMode,
  CollaborationOutcome,
  CollaborationOperation,
  ExperimentPoint,
  RobotState,
} from '~/utils/connectTheDots'
import { formatDistance } from '~/utils/connectTheDots'

const props = defineProps<{
  points: ExperimentPoint[]
  collaborationOrder: number[]
  selectedSet: Set<number>
  editMode: CollaborationEditMode
  selectedEditIndices: number[]
  moveSourceIndex: number | null
  moveDestinationIndex: number | null
  candidateOrder: number[] | null
  candidateOperation: CollaborationOperation | null
  currentDistance: number
  candidateDistance: number | null
  candidateDifference: number
  candidatePercentage: number
  feedback: 'idle' | 'selecting' | CollaborationOutcome
  acceptedChanges: number
  canUndo: boolean
  canFinish: boolean
  activeSegmentRange: [number, number] | null
  robotState: RobotState
  robotMessage: string
}>()

defineEmits<{
  setEditMode: [mode: CollaborationEditMode]
  selectRouteIndex: [index: number]
  acceptCandidate: []
  rejectCandidate: []
  undoAccepted: []
  resetToMachine: []
  finish: []
}>()

const instruction = computed(() => {
  if (props.candidateOrder) return 'Review the robot measurement.'
  if (props.editMode === 'move-point') {
    if (props.moveSourceIndex !== null) {
      return 'Now select the route position before which it should be inserted.'
    }
    return 'Select a point to move, then select where to insert it.'
  }

  if (props.selectedEditIndices.length === 1) return 'Now select the other end of the section.'
  return 'Select two numbered points to reverse that route section.'
})

const currentDistanceFormatted = computed(() => formatDistance(props.currentDistance))
const candidateDistanceFormatted = computed(() =>
  props.candidateDistance === null ? '-' : formatDistance(props.candidateDistance)
)

const differenceFormatted = computed(() => {
  if (!props.candidateOrder) return '-'
  const units = formatDistance(Math.abs(props.candidateDifference))
  if (props.feedback === 'better') return `-${units}`
  if (props.feedback === 'worse') return `+${units}`
  return '0'
})

const candidateClass = computed(() => {
  if (!props.candidateOrder) return ''
  return `ctd-collab-stat__value--${props.feedback}`
})

const feedbackLabel = computed(() => {
  if (props.feedback === 'better') return 'BETTER'
  if (props.feedback === 'worse') return 'LONGER'
  return 'UNCHANGED'
})

const feedbackText = computed(() => {
  if (props.feedback === 'better') {
    const pct = Math.abs(props.candidatePercentage)
    if (props.candidateOperation === 'move-point') {
      return pct >= 1
        ? `This move improves the current route by ${pct.toFixed(1)}%.`
        : `This move saves ${formatDistance(Math.abs(props.candidateDifference))} units.`
    }

    return pct >= 1
      ? `This improves the current route by ${pct.toFixed(1)}%.`
      : `This saves ${formatDistance(Math.abs(props.candidateDifference))} units.`
  }

  if (props.feedback === 'worse') {
    return props.candidateOperation === 'move-point'
      ? 'Accept is disabled because this relocation is longer.'
      : 'Accept is disabled because the current route is shorter.'
  }

  return props.candidateOperation === 'move-point'
    ? 'This relocation has effectively the same measured length.'
    : 'This route has effectively the same measured length.'
})
</script>

<style scoped>
.ctd-collab {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
}

.ctd-round-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.ctd-round-header__left {
  flex: 1;
}

.ctd-round-header__right {
  flex-shrink: 0;
  padding-top: 0.25rem;
}

.ctd-round-title {
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.01em;
  color: var(--ctd-robot);
  margin: 0 0 0.375rem;
  line-height: 1;
}

.ctd-round-instruction {
  font-size: 0.85rem;
  color: var(--ctd-muted);
  margin: 0;
  line-height: 1.5;
}

.ctd-collab-mode {
  display: inline-grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.35rem;
  padding: 0.25rem;
  background: var(--ctd-surface);
  border: 1px solid var(--ctd-border);
  border-radius: 6px;
  align-self: flex-start;
}

.ctd-collab-mode__button {
  appearance: none;
  border: 1px solid transparent;
  border-radius: 4px;
  background: transparent;
  color: var(--ctd-muted);
  cursor: pointer;
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.11em;
  line-height: 1.1;
  padding: 0.55rem 0.75rem;
  text-transform: uppercase;
  transition: background 0.12s, color 0.12s, border-color 0.12s;
  white-space: nowrap;
}

.ctd-collab-mode__button--active {
  background: #EAF0FF;
  border-color: #C4D6FC;
  color: var(--ctd-robot);
}

.ctd-collab-mode__button:hover {
  border-color: var(--ctd-border);
}

.ctd-collab-mode__button:focus-visible {
  outline: 2px solid var(--ctd-robot);
  outline-offset: 2px;
}

.ctd-collab-controls {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.ctd-collab-controls__stats,
.ctd-collab-proposal {
  background: var(--ctd-surface);
  border: 1px solid var(--ctd-border);
  border-radius: 6px;
}

.ctd-collab-controls__stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.75rem;
  padding: 1rem 1.25rem;
}

.ctd-collab-stat {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
}

.ctd-collab-stat__label {
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ctd-muted);
}

.ctd-collab-stat__value {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--ctd-text);
  font-variant-numeric: tabular-nums;
}

.ctd-collab-stat__value--better {
  color: #1F7A4D;
}

.ctd-collab-stat__value--worse {
  color: #B45309;
}

.ctd-collab-stat__value--equal {
  color: var(--ctd-robot);
}

.ctd-collab-proposal {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.75rem 1rem;
  font-size: 0.78rem;
  color: var(--ctd-muted);
}

.ctd-collab-proposal__label {
  flex-shrink: 0;
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  padding: 0.25rem 0.45rem;
  border-radius: 4px;
}

.ctd-collab-proposal--better .ctd-collab-proposal__label {
  color: #1F7A4D;
  background: #EAF7EF;
}

.ctd-collab-proposal--worse .ctd-collab-proposal__label {
  color: #B45309;
  background: #FFF4E6;
}

.ctd-collab-proposal--equal .ctd-collab-proposal__label {
  color: var(--ctd-robot);
  background: #EAF0FF;
}

.ctd-collab-controls__actions {
  display: flex;
  gap: 0.625rem;
  flex-wrap: wrap;
}

.ctd-btn {
  flex: 1 1 auto;
  min-width: 132px;
  padding: 0.65rem 1rem;
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.12s, color 0.12s, transform 0.1s, opacity 0.12s;
  border: 1.5px solid transparent;
}

.ctd-btn:disabled {
  opacity: 0.38;
  cursor: not-allowed;
  transform: none !important;
}

.ctd-btn--primary {
  background: var(--ctd-robot);
  color: #fff;
}

.ctd-btn--primary:hover:not(:disabled) {
  background: #2852B5;
  transform: translateY(-1px);
}

.ctd-btn--ghost {
  background: transparent;
  border-color: var(--ctd-border);
  color: var(--ctd-text);
}

.ctd-btn--ghost:hover:not(:disabled) {
  border-color: var(--ctd-text);
  transform: translateY(-1px);
}

.ctd-btn:focus-visible {
  outline: 2px solid var(--ctd-robot);
  outline-offset: 2px;
}

@media (max-width: 700px) {
  .ctd-collab-controls__stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 430px) {
  .ctd-collab-mode {
    align-self: stretch;
  }

  .ctd-collab-mode__button {
    min-width: 0;
    padding-inline: 0.45rem;
    white-space: normal;
  }

  .ctd-collab-controls__stats {
    padding: 0.85rem;
  }

  .ctd-collab-stat__value {
    font-size: 1rem;
  }

  .ctd-collab-proposal {
    align-items: flex-start;
    flex-direction: column;
  }

  .ctd-btn {
    min-width: 100%;
    white-space: normal;
  }
}
</style>
