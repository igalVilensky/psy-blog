<template>
  <div class="ctd-final" role="region" aria-label="Human Machine and Collaboration Comparison">
    <div class="ctd-final__banner" :class="`ctd-final__banner--${bannerTone}`">
      <div class="ctd-final__badge">{{ badgeText }}</div>
      <h1 class="ctd-final__title">{{ titleText }}</h1>
      <p class="ctd-final__subtext">{{ subtextText }}</p>
    </div>

    <div class="ctd-final__disclaimer">
      <span class="ctd-final__info-icon">i</span>
      <span>The machine uses route-finding heuristics. The final route is not guaranteed to be mathematically optimal.</span>
    </div>

    <div class="ctd-final__grid">
      <div class="ctd-final__card">
        <div class="ctd-final__card-header">
          <div class="ctd-final__card-title">
            <span class="ctd-color-dot ctd-color-dot--human"></span>
            HUMAN ROUTE
          </div>
          <div class="ctd-final__card-dist">{{ humanDistanceFormatted }}</div>
        </div>

        <div class="ctd-final__card-meta">
          <span>Completion time: {{ humanTimeFormatted }}</span>
          <span>10 points connected</span>
        </div>

        <RouteBoard
          :points="points"
          :pointOrder="humanResult.pointOrder"
          :selectedSet="allSelectedSet"
          :readonly="true"
          routeColor="#FF5A36"
        />
      </div>

      <div class="ctd-final__card">
        <div class="ctd-final__card-header">
          <div class="ctd-final__card-title">
            <span class="ctd-color-dot ctd-color-dot--machine"></span>
            MACHINE ROUTE
          </div>
          <div class="ctd-final__card-dist">{{ machineDistanceFormatted }}</div>
        </div>

        <div class="ctd-final__card-meta">
          <span>Initial: {{ machineInitialFormatted }}</span>
          <span>2-opt improvements: {{ machineResult.improvements.length }}</span>
        </div>

        <RouteBoard
          :points="points"
          :pointOrder="machineResult.optimized.pointOrder"
          :selectedSet="allSelectedSet"
          :readonly="true"
          routeColor="#3567D6"
        />
      </div>

      <div class="ctd-final__card ctd-final__card--collaboration">
        <div class="ctd-final__card-header">
          <div class="ctd-final__card-title">
            <span class="ctd-color-dot ctd-color-dot--collaboration"></span>
            HUMAN + MACHINE
          </div>
          <div class="ctd-final__card-dist">{{ collaborationDistanceFormatted }}</div>
        </div>

        <div class="ctd-final__card-meta">
          <span>Started: {{ collaborationInitialFormatted }}</span>
          <span>Total saved: {{ collaborationSavedFormatted }}</span>
          <span>Accepted: {{ collaborationResult.acceptedChanges }}</span>
          <span>Rejected: {{ collaborationResult.rejectedChanges }}</span>
          <span>Time: {{ collaborationTimeFormatted }}</span>
        </div>

        <RouteBoard
          :points="points"
          :pointOrder="collaborationResult.finalOrder"
          :selectedSet="allSelectedSet"
          :readonly="true"
          routeColor="#8B5CF6"
        />
      </div>
    </div>

    <div class="ctd-final__actions">
      <button
        id="ctd-collaborate-again-btn"
        class="ctd-btn ctd-btn--primary"
        @click="$emit('collaborateAgain')"
      >
        COLLABORATE AGAIN
      </button>
      <button
        id="ctd-final-retry-same-btn"
        class="ctd-btn ctd-btn--ghost"
        @click="$emit('retrySameLayout')"
      >
        TRY SAME LAYOUT AGAIN
      </button>
      <button
        id="ctd-final-new-layout-btn"
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
  CollaborationResult,
  ExperimentPoint,
  HumanRouteResult,
  MachineRouteResult,
} from '~/utils/connectTheDots'
import { formatDistance, formatDuration } from '~/utils/connectTheDots'

const props = defineProps<{
  points: ExperimentPoint[]
  humanResult: HumanRouteResult
  machineResult: MachineRouteResult
  collaborationResult: CollaborationResult
}>()

defineEmits<{
  retrySameLayout: []
  retryNewLayout: []
  collaborateAgain: []
}>()

const NEAR_TIE_PERCENT = 1

const allSelectedSet = computed(() => new Set(props.points.map((p) => p.id)))
const humanDist = computed(() => props.humanResult.distance)
const machineDist = computed(() => props.machineResult.optimized.distance)
const collaborationDist = computed(() => props.collaborationResult.finalDistance)
const minDistance = computed(() => Math.min(humanDist.value, machineDist.value, collaborationDist.value))

const nearWinners = computed(() => {
  const entries = [
    { key: 'human', distance: humanDist.value },
    { key: 'machine', distance: machineDist.value },
    { key: 'collaboration', distance: collaborationDist.value },
  ] as const

  return entries.filter((entry) => {
    const denominator = Math.max(entry.distance, minDistance.value)
    const pct = denominator > 0
      ? (Math.abs(entry.distance - minDistance.value) / denominator) * 100
      : 0
    return pct <= NEAR_TIE_PERCENT
  })
})

const collaborationVsMachinePct = computed(() => {
  const diff = props.machineResult.optimized.distance - props.collaborationResult.finalDistance
  return props.machineResult.optimized.distance > 0
    ? (diff / props.machineResult.optimized.distance) * 100
    : 0
})

const bannerTone = computed(() => {
  if (nearWinners.value.length > 1) return 'tie'
  return nearWinners.value[0]?.key || 'tie'
})

const badgeText = computed(() => {
  if (nearWinners.value.length === 3) return 'THREE-WAY NEAR TIE'
  if (nearWinners.value.length === 2) return 'NEAR TIE'
  if (bannerTone.value === 'collaboration') return 'COLLABORATIVE WIN'
  if (bannerTone.value === 'machine') return 'MACHINE SHORTEST'
  return 'HUMAN SHORTEST'
})

const titleText = computed(() => {
  if (nearWinners.value.length > 1) return 'THE ROUTES WERE NEARLY TIED'
  if (bannerTone.value === 'collaboration') return 'TOGETHER, YOU FOUND A SHORTER ROUTE'
  if (bannerTone.value === 'machine') return 'THE MACHINE ROUTE HELD UP'
  return 'YOUR HUMAN ROUTE WAS SHORTEST'
})

const subtextText = computed(() => {
  if (nearWinners.value.length > 1) {
    return 'The shortest routes landed within the near-tie threshold.'
  }

  if (bannerTone.value === 'collaboration') {
    const pct = Math.max(0, collaborationVsMachinePct.value)
    return pct > 0
      ? `Human intuition improved the machine route by ${pct.toFixed(1)}%.`
      : 'The collaborative route matched the strongest machine route.'
  }

  if (bannerTone.value === 'machine') {
    return 'Your changes explored alternatives, but the shortest accepted route stayed with the machine.'
  }

  return 'Your visual route remained the shortest of the three measured paths.'
})

const humanDistanceFormatted = computed(() => formatDistance(humanDist.value))
const humanTimeFormatted = computed(() => formatDuration(props.humanResult.durationMs))
const machineDistanceFormatted = computed(() => formatDistance(machineDist.value))
const machineInitialFormatted = computed(() => formatDistance(props.machineResult.initial.distance))
const collaborationDistanceFormatted = computed(() => formatDistance(collaborationDist.value))
const collaborationInitialFormatted = computed(() => formatDistance(props.collaborationResult.initialDistance))
const collaborationSavedFormatted = computed(() => {
  const saved = props.collaborationResult.totalSaved
  if (Math.abs(saved) < 0.001) return '0'
  return saved > 0 ? `-${formatDistance(saved)}` : `+${formatDistance(Math.abs(saved))}`
})
const collaborationTimeFormatted = computed(() => formatDuration(props.collaborationResult.durationMs))
</script>

<style scoped>
.ctd-final {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  animation: ctd-final-in 0.4s ease both;
}

.ctd-final__banner,
.ctd-final__card {
  background: var(--ctd-surface);
  border: 1px solid var(--ctd-border);
  border-radius: 6px;
}

.ctd-final__banner {
  width: 100%;
  padding: 1.75rem 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.ctd-final__badge {
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  padding: 0.3rem 0.85rem;
  border-radius: 100px;
  margin-bottom: 0.75rem;
}

.ctd-final__banner--collaboration .ctd-final__badge {
  color: #6D28D9;
  background: #F2EDFF;
  border: 1px solid #D8CCFF;
}

.ctd-final__banner--machine .ctd-final__badge {
  color: var(--ctd-robot);
  background: #EAF0FF;
  border: 1px solid #C4D6FC;
}

.ctd-final__banner--human .ctd-final__badge {
  color: var(--ctd-primary);
  background: #FFF1EE;
  border: 1px solid #FFC9BD;
}

.ctd-final__banner--tie .ctd-final__badge {
  color: var(--ctd-muted);
  background: #F0EDE6;
  border: 1px solid var(--ctd-border);
}

.ctd-final__title {
  font-size: 1.35rem;
  font-weight: 800;
  letter-spacing: -0.01em;
  color: var(--ctd-text);
  margin: 0 0 0.5rem;
  line-height: 1.2;
}

.ctd-final__subtext {
  font-size: 0.88rem;
  color: var(--ctd-muted);
  margin: 0;
  line-height: 1.5;
}

.ctd-final__disclaimer {
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
  max-width: 760px;
}

.ctd-final__info-icon {
  font-weight: 800;
  color: var(--ctd-robot);
}

.ctd-final__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  width: 100%;
}

.ctd-final__card {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.ctd-final__card--collaboration {
  border-color: #D8CCFF;
}

.ctd-final__card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.ctd-final__card-title {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: var(--ctd-text);
}

.ctd-color-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.ctd-color-dot--human { background: var(--ctd-primary); }
.ctd-color-dot--machine { background: var(--ctd-robot); }
.ctd-color-dot--collaboration { background: #8B5CF6; }

.ctd-final__card-dist {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--ctd-text);
  font-variant-numeric: tabular-nums;
}

.ctd-final__card-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  font-size: 0.66rem;
  color: var(--ctd-muted);
}

.ctd-final__actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
}

.ctd-btn {
  padding: 0.8rem 1.35rem;
  font-size: 0.66rem;
  font-weight: 800;
  letter-spacing: 0.13em;
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

.ctd-btn:focus-visible {
  outline: 2px solid var(--ctd-robot);
  outline-offset: 2px;
}

@keyframes ctd-final-in {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 940px) {
  .ctd-final__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 430px) {
  .ctd-final__card-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .ctd-btn {
    width: 100%;
    white-space: normal;
  }
}
</style>
