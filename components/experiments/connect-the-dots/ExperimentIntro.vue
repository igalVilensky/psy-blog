<template>
  <div class="ctd-intro">
    <!-- Decorative dots preview -->
    <div class="ctd-intro__dots" aria-hidden="true">
      <svg viewBox="0 0 280 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Route line -->
        <polyline
          points="30,90 80,30 140,70 200,20 250,65"
          stroke="#FF5A36"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          fill="none"
          opacity="0.6"
        />
        <!-- Points -->
        <circle cx="30"  cy="90" r="7" fill="#FF5A36" />
        <circle cx="80"  cy="30" r="7" fill="#FF5A36" />
        <circle cx="140" cy="70" r="7" fill="#FF5A36" />
        <circle cx="200" cy="20" r="7" fill="#FF5A36" />
        <circle cx="250" cy="65" r="7" fill="#FF5A36" />
        <!-- Unvisited dots -->
        <circle cx="60"  cy="100" r="5" fill="none" stroke="#D8D1C4" stroke-width="2" />
        <circle cx="170" cy="95"  r="5" fill="none" stroke="#D8D1C4" stroke-width="2" />
      </svg>
    </div>

    <p class="ctd-intro__eyebrow">EXPERIMENT · PATHFINDING</p>

    <h1 class="ctd-intro__title">Connect the Dots</h1>

    <p class="ctd-intro__lead">Can you find a short route through every point?</p>

    <ul class="ctd-intro__rules">
      <li>Connect each point once.</li>
      <li>Try to keep the total path as short as possible.</li>
    </ul>

    <button
      id="ctd-start-btn"
      class="ctd-intro__cta"
      @click="$emit('start')"
    >
      START EXPERIMENT
    </button>
  </div>
</template>

<script setup lang="ts">
defineEmits<{ start: [] }>()
</script>

<style scoped>
.ctd-intro {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem 1.5rem 3rem;
  animation: ctd-fade-up 0.5s ease both;
}

.ctd-intro__dots {
  width: 280px;
  max-width: 100%;
  height: auto;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.ctd-intro__eyebrow {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  color: var(--ctd-muted);
  margin: 0 0 0.75rem;
  text-transform: uppercase;
}

.ctd-intro__title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--ctd-text);
  margin: 0 0 1rem;
  line-height: 1.05;
}

.ctd-intro__lead {
  font-size: 1.1rem;
  color: var(--ctd-muted);
  margin: 0 0 1.25rem;
  max-width: 36ch;
}

.ctd-intro__rules {
  list-style: none;
  padding: 0;
  margin: 0 0 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  color: var(--ctd-muted);
  font-size: 0.9rem;
}

.ctd-intro__cta {
  display: inline-block;
  padding: 0.875rem 2.5rem;
  background: var(--ctd-primary);
  color: #fff;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.15s, transform 0.15s;
}

.ctd-intro__cta:hover {
  background: var(--ctd-primary-dark);
  transform: translateY(-1px);
}

.ctd-intro__cta:focus-visible {
  outline: 2px solid var(--ctd-primary);
  outline-offset: 3px;
}

.ctd-intro__cta:active {
  transform: translateY(0);
}

@keyframes ctd-fade-up {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>
