<template>
  <div class="ctd-controls">
    <!-- Stats bar -->
    <div class="ctd-controls__stats">
      <span class="ctd-stat">
        <span class="ctd-stat__label">Points</span>
        <span class="ctd-stat__value">{{ selectedCount }}&thinsp;/&thinsp;{{ totalPoints }}</span>
      </span>
      <span class="ctd-stat__divider" aria-hidden="true" />
      <span class="ctd-stat">
        <span class="ctd-stat__label">Route length</span>
        <span class="ctd-stat__value">{{ distanceFormatted }}</span>
      </span>
    </div>

    <!-- Buttons -->
    <div class="ctd-controls__btns">
      <button
        id="ctd-undo-btn"
        class="ctd-btn ctd-btn--ghost"
        :disabled="selectedCount === 0"
        aria-label="Undo last point"
        @click="$emit('undo')"
      >
        UNDO
      </button>

      <button
        id="ctd-reset-btn"
        class="ctd-btn ctd-btn--ghost"
        :disabled="selectedCount === 0"
        aria-label="Reset route"
        @click="$emit('reset')"
      >
        RESET
      </button>

      <button
        id="ctd-finish-btn"
        class="ctd-btn ctd-btn--primary"
        :disabled="!canFinish"
        :aria-disabled="!canFinish"
        aria-label="Finish route"
        @click="$emit('finish')"
      >
        FINISH ROUTE
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  selectedCount: number
  totalPoints: number
  distanceFormatted: string
  canFinish: boolean
}>()

defineEmits<{
  undo: []
  reset: []
  finish: []
}>()
</script>

<style scoped>
.ctd-controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Stats */
.ctd-controls__stats {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 0.75rem 1rem;
  background: var(--ctd-surface);
  border: 1px solid var(--ctd-border);
  border-radius: 4px;
}

.ctd-stat {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.ctd-stat__label {
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ctd-muted);
}

.ctd-stat__value {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--ctd-text);
  font-variant-numeric: tabular-nums;
  transition: transform 0.15s ease;
}

.ctd-stat__divider {
  width: 1px;
  height: 32px;
  background: var(--ctd-border);
}

/* Buttons */
.ctd-controls__btns {
  display: flex;
  gap: 0.625rem;
  flex-wrap: wrap;
}

.ctd-btn {
  flex: 1 1 auto;
  min-width: 80px;
  padding: 0.625rem 1rem;
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.12s, color 0.12s, transform 0.1s, opacity 0.12s;
  border: 1.5px solid transparent;
  white-space: nowrap;
}

.ctd-btn:disabled {
  opacity: 0.38;
  cursor: not-allowed;
  transform: none !important;
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

.ctd-btn--ghost:focus-visible {
  outline: 2px solid var(--ctd-primary);
  outline-offset: 2px;
}

.ctd-btn--primary {
  background: var(--ctd-primary);
  color: #fff;
}

.ctd-btn--primary:hover:not(:disabled) {
  background: var(--ctd-primary-dark);
  transform: translateY(-1px);
}

.ctd-btn--primary:focus-visible {
  outline: 2px solid var(--ctd-primary);
  outline-offset: 3px;
}
</style>
