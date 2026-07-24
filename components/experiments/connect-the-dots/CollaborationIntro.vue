<template>
  <div class="ctd-collab-intro" role="region" aria-label="Human and Machine Collaboration Introduction">
    <div class="ctd-collab-intro__card">
      <div class="ctd-collab-intro__header">
        <RobotMascot state="ready" message="Let us improve it together." />
      </div>

      <p class="ctd-collab-intro__eyebrow">HUMAN + MACHINE</p>
      <h2 class="ctd-collab-intro__title">COLLABORATION ROUND</h2>

      <p class="ctd-collab-intro__lead">
        The robot found a strong route.<br />
        Use your visual intuition to improve it.
      </p>

      <p class="ctd-collab-intro__note">
        Select two route points to reverse the section between them.
        The robot will measure every proposal.
      </p>

      <div class="ctd-collab-intro__actions">
        <button
          id="ctd-start-collaboration-btn"
          class="ctd-btn ctd-btn--primary"
          @click="$emit('start')"
        >
          START COLLABORATING
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
.ctd-collab-intro {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  animation: ctd-intro-in 0.4s ease both;
}

.ctd-collab-intro__card {
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

.ctd-collab-intro__header {
  margin-bottom: 1.5rem;
}

.ctd-collab-intro__eyebrow {
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  color: var(--ctd-robot);
  margin: 0 0 0.5rem;
}

.ctd-collab-intro__title {
  font-size: 1.6rem;
  font-weight: 800;
  letter-spacing: -0.01em;
  color: var(--ctd-text);
  margin: 0 0 0.75rem;
  line-height: 1.1;
}

.ctd-collab-intro__lead,
.ctd-collab-intro__note {
  font-size: 0.9rem;
  color: var(--ctd-muted);
  line-height: 1.6;
  margin: 0;
}

.ctd-collab-intro__note {
  max-width: 360px;
  margin-top: 0.85rem;
  margin-bottom: 2rem;
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
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
