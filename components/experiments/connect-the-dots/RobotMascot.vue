<template>
  <!-- Simple CSS/SVG robot mascot -->
  <div
    class="ctd-robot"
    :class="`ctd-robot--${state}`"
    role="img"
    :aria-label="`Robot observer: ${message || 'idle'}`"
  >
    <!-- SVG Robot -->
    <svg
      class="ctd-robot__svg"
      viewBox="0 0 60 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <!-- Antenna -->
      <line x1="30" y1="8" x2="30" y2="16" stroke="#3567D6" stroke-width="2" stroke-linecap="round" />
      <circle cx="30" cy="6" r="3" fill="#3567D6" />

      <!-- Head -->
      <rect x="12" y="16" width="36" height="28" rx="5" fill="#FFFDF7" stroke="#D8D1C4" stroke-width="1.5" />

      <!-- Eyes -->
      <rect
        x="18" y="23"
        width="8" height="7"
        rx="2"
        :fill="state === 'impressed' ? '#FF5A36' : '#3567D6'"
        class="ctd-robot__eye"
      />
      <rect
        x="34" y="23"
        width="8" height="7"
        rx="2"
        :fill="state === 'impressed' ? '#FF5A36' : '#3567D6'"
        class="ctd-robot__eye"
      />

      <!-- Mouth — changes with state -->
      <!-- idle: neutral line -->
      <line v-if="state === 'idle'"    x1="22" y1="37" x2="38" y2="37" stroke="#6F6A61" stroke-width="1.5" stroke-linecap="round" />
      <!-- watching: small open rect -->
      <rect v-if="state === 'watching'" x="24" y="34" width="12" height="5" rx="2" fill="#6F6A61" />
      <!-- impressed: smile arc -->
      <path v-if="state === 'impressed'" d="M22 35 Q30 42 38 35" stroke="#FF5A36" stroke-width="2" stroke-linecap="round" fill="none" />

      <!-- Body -->
      <rect x="16" y="46" width="28" height="22" rx="4" fill="#FFFDF7" stroke="#D8D1C4" stroke-width="1.5" />

      <!-- Body detail: small screen/display -->
      <rect x="22" y="51" width="16" height="10" rx="2" fill="#EAF0FF" stroke="#3567D6" stroke-width="1" />
      <line x1="25" y1="54" x2="35" y2="54" stroke="#3567D6" stroke-width="1" opacity="0.7" />
      <line x1="25" y1="57" x2="32" y2="57" stroke="#3567D6" stroke-width="1" opacity="0.5" />

      <!-- Arms -->
      <rect x="4"  y="48" width="10" height="4" rx="2" fill="#FFFDF7" stroke="#D8D1C4" stroke-width="1.5" />
      <rect x="46" y="48" width="10" height="4" rx="2" fill="#FFFDF7" stroke="#D8D1C4" stroke-width="1.5" />

      <!-- Legs -->
      <rect x="20" y="68" width="7" height="10" rx="2" fill="#FFFDF7" stroke="#D8D1C4" stroke-width="1.5" />
      <rect x="33" y="68" width="7" height="10" rx="2" fill="#FFFDF7" stroke="#D8D1C4" stroke-width="1.5" />
    </svg>

    <!-- Speech bubble -->
    <Transition name="ctd-bubble">
      <div v-if="message" class="ctd-robot__bubble" role="status" aria-live="polite">
        {{ message }}
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type { RobotState } from '~/utils/connectTheDots'

defineProps<{
  state: RobotState
  message: string
}>()
</script>

<style scoped>
.ctd-robot {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  position: relative;
}

.ctd-robot__svg {
  width: 54px;
  height: auto;
  transition: transform 0.3s ease;
}

/* State animations */
.ctd-robot--watching .ctd-robot__svg {
  animation: ctd-robot-bob 2s ease-in-out infinite;
}

.ctd-robot--impressed .ctd-robot__svg {
  animation: ctd-robot-jump 0.4s ease;
}

.ctd-robot__eye {
  transition: fill 0.25s;
}

/* Speech bubble */
.ctd-robot__bubble {
  position: absolute;
  bottom: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  background: #FFFDF7;
  border: 1px solid var(--ctd-border);
  border-radius: 6px;
  padding: 0.35rem 0.65rem;
  font-size: 0.65rem;
  font-weight: 600;
  color: var(--ctd-text);
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  pointer-events: none;
}

.ctd-robot__bubble::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 5px 5px 0;
  border-style: solid;
  border-color: var(--ctd-border) transparent transparent;
}

/* Bubble transition */
.ctd-bubble-enter-active { transition: opacity 0.2s, transform 0.2s; }
.ctd-bubble-leave-active { transition: opacity 0.15s; }
.ctd-bubble-enter-from  { opacity: 0; transform: translateX(-50%) translateY(4px); }
.ctd-bubble-leave-to    { opacity: 0; }

/* Keyframes */
@keyframes ctd-robot-bob {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-4px); }
}

@keyframes ctd-robot-jump {
  0%   { transform: translateY(0) scale(1); }
  40%  { transform: translateY(-8px) scale(1.05); }
  100% { transform: translateY(0) scale(1); }
}

@media (prefers-reduced-motion: reduce) {
  .ctd-robot--watching .ctd-robot__svg,
  .ctd-robot--impressed .ctd-robot__svg {
    animation: none;
  }
}
</style>
