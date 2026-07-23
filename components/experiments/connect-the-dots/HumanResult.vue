<template>
  <div class="ctd-result" role="region" aria-label="Route complete result">
    <div class="ctd-result__badge">ROUTE COMPLETE</div>

    <!-- Stats -->
    <div class="ctd-result__stats">
      <div class="ctd-result__stat">
        <span class="ctd-result__stat-label">Total distance</span>
        <span class="ctd-result__stat-value">{{ distanceFormatted }}</span>
      </div>
      <div class="ctd-result__stat">
        <span class="ctd-result__stat-label">Points connected</span>
        <span class="ctd-result__stat-value">{{ result.pointOrder.length }}</span>
      </div>
      <div v-if="result.durationMs" class="ctd-result__stat">
        <span class="ctd-result__stat-label">Time</span>
        <span class="ctd-result__stat-value">{{ durationFormatted }}</span>
      </div>
    </div>

    <!-- Completed route board (read-only) -->
    <div class="ctd-result__board-wrap">
      <RouteBoard
        :points="points"
        :pointOrder="result.pointOrder"
        :selectedSet="allSelected"
      />
    </div>

    <!-- Actions -->
    <div class="ctd-result__actions">
      <button
        id="ctd-try-again-btn"
        class="ctd-btn ctd-btn--primary"
        @click="$emit('tryAgain')"
      >
        TRY AGAIN
      </button>
      <button
        id="ctd-continue-btn"
        class="ctd-btn ctd-btn--ghost"
        @click="onContinue"
      >
        CONTINUE
      </button>
    </div>

    <!-- Machine round stub message -->
    <p v-if="showMachineStub" class="ctd-result__stub">
      The machine round will be added next.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import RouteBoard from './RouteBoard.vue'
import type { ExperimentPoint, HumanRouteResult } from '~/utils/connectTheDots'
import { formatDistance, formatDuration } from '~/utils/connectTheDots'

const props = defineProps<{
  result: HumanRouteResult
  points: ExperimentPoint[]
}>()

const emit = defineEmits<{
  tryAgain: []
  continue: []
}>()

const showMachineStub = ref(false)

const distanceFormatted = computed(() => formatDistance(props.result.distance))
const durationFormatted = computed(() => formatDuration(props.result.durationMs))

const allSelected = computed(() => new Set(props.result.pointOrder))

function onContinue() {
  showMachineStub.value = true
  emit('continue')
}
</script>

<style scoped>
.ctd-result {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.75rem;
  animation: ctd-result-in 0.45s ease both;
}

.ctd-result__badge {
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--ctd-primary);
  padding: 0.4rem 1rem;
  border: 1.5px solid var(--ctd-primary);
  border-radius: 100px;
}

.ctd-result__stats {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
}

.ctd-result__stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
}

.ctd-result__stat-label {
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ctd-muted);
}

.ctd-result__stat-value {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--ctd-text);
  font-variant-numeric: tabular-nums;
}

.ctd-result__board-wrap {
  width: 100%;
}

.ctd-result__actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
}

.ctd-result__stub {
  font-size: 0.8rem;
  color: var(--ctd-muted);
  font-style: italic;
  text-align: center;
  animation: ctd-result-in 0.3s ease;
}

/* Shared button styles */
.ctd-btn {
  padding: 0.75rem 1.75rem;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.12s, color 0.12s, transform 0.1s;
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

@keyframes ctd-result-in {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>
