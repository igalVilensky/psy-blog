<template>
  <div class="ctd-comparison" role="region" aria-label="Human vs Machine Comparison">
    <!-- Winner / Result Banner -->
    <div class="ctd-comparison__banner" :class="`ctd-comparison__banner--${outcome}`">
      <div class="ctd-comparison__badge">{{ badgeText }}</div>
      <h1 class="ctd-comparison__title">{{ titleText }}</h1>
      <p class="ctd-comparison__subtext">{{ subtextText }}</p>
    </div>

    <!-- Heuristic Disclaimer -->
    <div class="ctd-comparison__disclaimer">
      <span class="ctd-comparison__info-icon">ℹ</span>
      <span>The robot used Nearest Neighbor and 2-opt — fast route-finding heuristics, not a guaranteed perfect solution.</span>
    </div>

    <!-- Previews Grid: Side-by-side desktop, stacked mobile -->
    <div class="ctd-comparison__grid">
      <!-- Human Route Card -->
      <div class="ctd-comparison__card ctd-comparison__card--human">
        <div class="ctd-comparison__card-header">
          <div class="ctd-comparison__card-title">
            <span class="ctd-color-dot ctd-color-dot--human"></span>
            HUMAN ROUTE
          </div>
          <div class="ctd-comparison__card-dist">{{ humanDistanceFormatted }}</div>
        </div>

        <div class="ctd-comparison__card-meta">
          <span>Completion time: {{ humanTimeFormatted }}</span>
          <span>10 points connected</span>
        </div>

        <div class="ctd-comparison__board-wrap">
          <RouteBoard
            :points="points"
            :pointOrder="humanResult.pointOrder"
            :selectedSet="allSelectedSet"
            :readonly="true"
            routeColor="#FF5A36"
          />
        </div>
      </div>

      <!-- Machine Route Card -->
      <div class="ctd-comparison__card ctd-comparison__card--machine">
        <div class="ctd-comparison__card-header">
          <div class="ctd-comparison__card-title">
            <span class="ctd-color-dot ctd-color-dot--machine"></span>
            MACHINE ROUTE
          </div>
          <div class="ctd-comparison__card-dist">{{ machineDistanceFormatted }}</div>
        </div>

        <div class="ctd-comparison__card-meta">
          <span>Initial: {{ machineInitialFormatted }}</span>
          <span v-if="savedDistance > 0">Saved: -{{ savedFormatted }}</span>
          <span>Improvements: {{ machineResult.improvements.length }}</span>
          <span>Calc: {{ computationFormatted }}</span>
        </div>

        <div class="ctd-comparison__board-wrap">
          <RouteBoard
            :points="points"
            :pointOrder="machineResult.optimized.pointOrder"
            :selectedSet="allSelectedSet"
            :readonly="true"
            routeColor="#3567D6"
          />
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="ctd-comparison__actions">
      <button
        id="ctd-retry-same-btn"
        class="ctd-btn ctd-btn--primary"
        @click="$emit('retrySameLayout')"
      >
        TRY SAME LAYOUT AGAIN
      </button>
      <button
        id="ctd-new-layout-btn"
        class="ctd-btn ctd-btn--ghost"
        @click="$emit('retryNewLayout')"
      >
        NEW LAYOUT
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import RouteBoard from './RouteBoard.vue'
import type {
  ExperimentPoint,
  HumanRouteResult,
  MachineRouteResult,
} from '~/utils/connectTheDots'
import { formatDistance, formatDuration } from '~/utils/connectTheDots'

const props = defineProps<{
  points: ExperimentPoint[]
  humanResult: HumanRouteResult
  machineResult: MachineRouteResult
}>()

defineEmits<{
  retrySameLayout: []
  retryNewLayout: []
}>()

const allSelectedSet = computed(
  () => new Set(props.points.map((p) => p.id))
)

const humanDist = computed(() => props.humanResult.distance)
const machineDist = computed(() => props.machineResult.optimized.distance)

const savedDistance = computed(
  () => Math.max(0, props.machineResult.initial.distance - props.machineResult.optimized.distance)
)

const humanDistanceFormatted = computed(() => formatDistance(humanDist.value))
const humanTimeFormatted = computed(() => formatDuration(props.humanResult.durationMs))

const machineDistanceFormatted = computed(() => formatDistance(machineDist.value))
const machineInitialFormatted = computed(() => formatDistance(props.machineResult.initial.distance))
const savedFormatted = computed(() => formatDistance(savedDistance.value))
const computationFormatted = computed(() => {
  const ms = props.machineResult.computationMs
  return ms < 0.1 ? '< 0.1 ms' : `${ms.toFixed(1)} ms`
})

// Outcome calculation
const diff = computed(() => Math.abs(humanDist.value - machineDist.value))
const maxDist = computed(() => Math.max(humanDist.value, machineDist.value))
const pctDiff = computed(() => (maxDist.value > 0 ? (diff.value / maxDist.value) * 100 : 0))

const outcome = computed<'machine-win' | 'human-win' | 'tie'>(() => {
  if (pctDiff.value <= 1.0) return 'tie'
  if (machineDist.value < humanDist.value) return 'machine-win'
  return 'human-win'
})

const badgeText = computed(() => {
  switch (outcome.value) {
    case 'machine-win':
      return 'ALGORITHM VICTORY'
    case 'human-win':
      return 'HUMAN INTUITION WIN'
    case 'tie':
      return 'NEAR TIE'
  }
})

const titleText = computed(() => {
  switch (outcome.value) {
    case 'machine-win':
      return 'THE MACHINE FOUND THE SHORTER ROUTE'
    case 'human-win':
      return 'YOUR ROUTE WAS SHORTER'
    case 'tie':
      return 'ALMOST IDENTICAL'
  }
})

const subtextText = computed(() => {
  switch (outcome.value) {
    case 'machine-win':
      return `It reduced the path by ${Math.round(pctDiff.value)}% compared with your route.`
    case 'human-win':
      return 'Your visual intuition found a path this algorithm missed.'
    case 'tie':
      return 'You and the machine found nearly the same route length.'
  }
})
</script>

<style scoped>
.ctd-comparison {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  animation: ctd-comp-in 0.4s ease both;
}

/* Banner */
.ctd-comparison__banner {
  width: 100%;
  background: var(--ctd-surface);
  border: 1px solid var(--ctd-border);
  border-radius: 6px;
  padding: 1.75rem 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.ctd-comparison__badge {
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  padding: 0.3rem 0.85rem;
  border-radius: 100px;
  margin-bottom: 0.75rem;
}

.ctd-comparison__banner--machine-win .ctd-comparison__badge {
  color: var(--ctd-robot);
  background: #EAF0FF;
  border: 1px solid #C4D6FC;
}

.ctd-comparison__banner--human-win .ctd-comparison__badge {
  color: var(--ctd-primary);
  background: #FFF1EE;
  border: 1px solid #FFC9BD;
}

.ctd-comparison__banner--tie .ctd-comparison__badge {
  color: var(--ctd-muted);
  background: #F0EDE6;
  border: 1px solid var(--ctd-border);
}

.ctd-comparison__title {
  font-size: 1.4rem;
  font-weight: 800;
  letter-spacing: -0.01em;
  color: var(--ctd-text);
  margin: 0 0 0.5rem;
  line-height: 1.2;
}

.ctd-comparison__subtext {
  font-size: 0.88rem;
  color: var(--ctd-muted);
  margin: 0;
  line-height: 1.5;
}

/* Disclaimer */
.ctd-comparison__disclaimer {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: var(--ctd-muted);
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid var(--ctd-border);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-align: center;
  max-width: 700px;
}

.ctd-comparison__info-icon {
  font-weight: 800;
  color: var(--ctd-robot);
}

/* Previews Grid */
.ctd-comparison__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  width: 100%;
}

.ctd-comparison__card {
  background: var(--ctd-surface);
  border: 1px solid var(--ctd-border);
  border-radius: 6px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.ctd-comparison__card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.ctd-comparison__card-title {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: var(--ctd-text);
}

.ctd-color-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.ctd-color-dot--human { background: var(--ctd-primary); }
.ctd-color-dot--machine { background: var(--ctd-robot); }

.ctd-comparison__card-dist {
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--ctd-text);
  font-variant-numeric: tabular-nums;
}

.ctd-comparison__card-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  font-size: 0.7rem;
  color: var(--ctd-muted);
}

.ctd-comparison__board-wrap {
  width: 100%;
}

/* Actions */
.ctd-comparison__actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 0.5rem;
}

.ctd-btn {
  padding: 0.85rem 1.75rem;
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
  background: var(--ctd-primary);
  color: #fff;
}

.ctd-btn--primary:hover {
  background: var(--ctd-primary-dark);
  transform: translateY(-1px);
}

.ctd-btn--primary:focus-visible {
  outline: 2px solid var(--ctd-primary);
  outline-offset: 3px;
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

.ctd-btn--ghost:focus-visible {
  outline: 2px solid var(--ctd-primary);
  outline-offset: 2px;
}

@keyframes ctd-comp-in {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Mobile layout: stack cards */
@media (max-width: 725px) {
  .ctd-comparison__grid {
    grid-template-columns: 1fr;
  }
  .ctd-comparison__title {
    font-size: 1.2rem;
  }
}
</style>
