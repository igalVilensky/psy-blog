<template>
  <div class="ctd-machine-running" role="region" aria-label="Machine Round Playback">
    <!-- Header row -->
    <div class="ctd-round-header">
      <div class="ctd-round-header__left">
        <h1 class="ctd-round-title">MACHINE ROUND</h1>
        <p class="ctd-round-instruction">
          {{ stageInstruction }}
        </p>
      </div>
      <div class="ctd-round-header__right">
        <RobotMascot
          :state="robotState"
          :message="robotMessage"
        />
      </div>
    </div>

    <!-- Error State Display -->
    <div v-if="playbackStage === 'error'" class="ctd-error-panel" role="alert">
      <p class="ctd-error-panel__msg">The robot could not build a valid route.</p>
      <div class="ctd-error-panel__actions">
        <button class="ctd-btn ctd-btn--primary" @click="$emit('retryMachine')">
          TRY MACHINE ROUND AGAIN
        </button>
        <button class="ctd-btn ctd-btn--ghost" @click="$emit('returnToHumanResult')">
          RETURN TO HUMAN RESULT
        </button>
      </div>
    </div>

    <!-- Machine Read-Only SVG Board -->
    <template v-else>
      <RouteBoard
        :points="points"
        :pointOrder="visibleOrder"
        :selectedSet="visibleSet"
        :readonly="true"
        routeColor="#3567D6"
        :activeSegmentRange="activeSegmentRange"
      />

      <!-- Playback Controls / Stats Bar -->
      <div class="ctd-machine-controls">
        <div class="ctd-machine-controls__stats">
          <div class="ctd-machine-controls__stat">
            <span class="ctd-machine-controls__label">Points connected</span>
            <span class="ctd-machine-controls__val">{{ visibleOrder.length }} / {{ points.length }}</span>
          </div>

          <div class="ctd-machine-controls__stat">
            <span class="ctd-machine-controls__label">Route length</span>
            <span class="ctd-machine-controls__val">{{ distanceFormatted }}</span>
          </div>

          <div v-if="optimizationNote" class="ctd-machine-controls__stat ctd-machine-controls__stat--note">
            <span class="ctd-machine-controls__label">Optimization</span>
            <span class="ctd-machine-controls__val-note">{{ optimizationNote }}</span>
          </div>
        </div>

        <div class="ctd-machine-controls__actions">
          <button
            v-if="playbackStage === 'complete'"
            id="ctd-view-results-btn"
            class="ctd-btn ctd-btn--primary"
            @click="$emit('viewResults')"
          >
            VIEW RESULTS
          </button>
          <span v-else class="ctd-machine-controls__status-badge">
            <span class="ctd-pulse-dot"></span> {{ statusBadgeText }}
          </span>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import RouteBoard from './RouteBoard.vue'
import RobotMascot from './RobotMascot.vue'
import type { ExperimentPoint, RobotState } from '~/utils/connectTheDots'
import { formatDistance } from '~/utils/connectTheDots'

const props = defineProps<{
  points: ExperimentPoint[]
  visibleOrder: number[]
  currentDistance: number
  playbackStage: 'idle' | 'measuring' | 'building' | 'optimizing' | 'complete' | 'error'
  robotState: RobotState
  robotMessage: string
  optimizationNote: string
  activeSegmentRange: [number, number] | null
}>()

defineEmits<{
  viewResults: []
  retryMachine: []
  returnToHumanResult: []
}>()

const visibleSet = computed(() => new Set(props.visibleOrder))
const distanceFormatted = computed(() => formatDistance(props.currentDistance))

const stageInstruction = computed(() => {
  switch (props.playbackStage) {
    case 'measuring':
      return 'Analyzing distances across all candidate paths...'
    case 'building':
      return 'Generating the initial Multi-Start Nearest Neighbor route...'
    case 'optimizing':
      return 'Applying 2-opt subsegment swaps to shorten the route...'
    case 'complete':
      return 'Machine route complete. Compare your result with the robot!'
    case 'error':
      return 'An unexpected issue occurred while calculating the route.'
    default:
      return 'Preparing machine solver...'
  }
})

const statusBadgeText = computed(() => {
  switch (props.playbackStage) {
    case 'measuring':
      return 'MEASURING DISTANCES'
    case 'building':
      return 'BUILDING INITIAL ROUTE'
    case 'optimizing':
      return 'OPTIMIZING PATH (2-OPT)'
    default:
      return 'PROCESSING'
  }
})
</script>

<style scoped>
.ctd-machine-running {
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

/* Error panel */
.ctd-error-panel {
  background: var(--ctd-surface);
  border: 1px solid #E57373;
  border-radius: 6px;
  padding: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.ctd-error-panel__msg {
  font-size: 0.95rem;
  font-weight: 700;
  color: #D32F2F;
  margin: 0;
}

.ctd-error-panel__actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

/* Machine Controls / Stats */
.ctd-machine-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  background: var(--ctd-surface);
  border: 1px solid var(--ctd-border);
  border-radius: 6px;
  padding: 1rem 1.25rem;
  flex-wrap: wrap;
}

.ctd-machine-controls__stats {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.ctd-machine-controls__stat {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.ctd-machine-controls__label {
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ctd-muted);
}

.ctd-machine-controls__val {
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--ctd-text);
  font-variant-numeric: tabular-nums;
}

.ctd-machine-controls__val-note {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--ctd-robot);
  background: #EAF0FF;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.ctd-machine-controls__status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  color: var(--ctd-robot);
  background: #EAF0FF;
  padding: 0.5rem 0.85rem;
  border-radius: 100px;
}

.ctd-pulse-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--ctd-robot);
  animation: ctd-pulse 1.2s ease-in-out infinite;
}

/* Buttons */
.ctd-btn {
  padding: 0.75rem 1.5rem;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.12s, transform 0.1s;
  border: 1.5px solid transparent;
}

.ctd-btn--primary {
  background: var(--ctd-robot);
  color: #fff;
}

.ctd-btn--primary:hover {
  background: #2852B5;
  transform: translateY(-1px);
}

.ctd-btn--ghost {
  background: transparent;
  border-color: var(--ctd-border);
  color: var(--ctd-text);
}

.ctd-btn--ghost:hover {
  border-color: var(--ctd-text);
  transform: translateY(-1px);
}

@keyframes ctd-pulse {
  0%, 100% { opacity: 0.3; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
}

@media (max-width: 600px) {
  .ctd-machine-controls {
    flex-direction: column;
    align-items: stretch;
  }
  .ctd-machine-controls__actions {
    display: flex;
    justify-content: center;
  }
}
</style>
