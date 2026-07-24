<template>
  <div class="ctd-machine-intro" role="region" aria-label="Machine Round Introduction">
    <div class="ctd-machine-intro__card">
      <div class="ctd-machine-intro__header">
        <RobotMascot state="ready" message="My turn to solve this layout." />
      </div>

      <p class="ctd-machine-intro__eyebrow">STAGE 2 OF 2</p>
      <h2 class="ctd-machine-intro__title">MACHINE ROUND</h2>

      <p class="ctd-machine-intro__lead">
        Now the robot will solve the same layout.<br />
        It will first build a quick route, then try to improve it.
      </p>

      <div class="ctd-machine-intro__actions">
        <button
          id="ctd-start-machine-btn"
          class="ctd-btn ctd-btn--primary"
          @click="$emit('start')"
        >
          LET THE ROBOT TRY
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RobotMascot from './RobotMascot.vue'

defineEmits<{
  start: []
}>()
</script>

<style scoped>
.ctd-machine-intro {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  animation: ctd-intro-in 0.4s ease both;
}

.ctd-machine-intro__card {
  width: 100%;
  max-width: 520px;
  background: var(--ctd-surface);
  border: 1px solid var(--ctd-border);
  border-radius: 6px;
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
}

.ctd-machine-intro__header {
  margin-bottom: 1.5rem;
}

.ctd-machine-intro__eyebrow {
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  color: var(--ctd-robot);
  margin: 0 0 0.5rem;
}

.ctd-machine-intro__title {
  font-size: 1.6rem;
  font-weight: 800;
  letter-spacing: -0.01em;
  color: var(--ctd-text);
  margin: 0 0 0.75rem;
  line-height: 1.1;
}

.ctd-machine-intro__lead {
  font-size: 0.9rem;
  color: var(--ctd-muted);
  line-height: 1.6;
  margin: 0 0 2rem;
}

.ctd-btn {
  padding: 0.85rem 2rem;
  font-size: 0.75rem;
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

.ctd-btn--primary:focus-visible {
  outline: 2px solid var(--ctd-robot);
  outline-offset: 3px;
}

@keyframes ctd-intro-in {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
