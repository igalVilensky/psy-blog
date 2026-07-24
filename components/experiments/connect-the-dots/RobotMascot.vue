<template>
  <div
    class="ctd-robot"
    :class="[
      `ctd-robot--${state}`,
      { 'ctd-robot--has-message': Boolean(message) },
    ]"
    role="img"
    :aria-label="`Robot observer: ${message || 'idle'}`"
  >
    <svg
      class="ctd-robot__svg"
      viewBox="0 0 60 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <!-- Antenna -->
      <line
        x1="30"
        y1="8"
        x2="30"
        y2="16"
        stroke="#3567D6"
        stroke-width="2"
        stroke-linecap="round"
      />
      <circle cx="30" cy="6" r="3" fill="#3567D6" />

      <!-- Head -->
      <rect
        x="12"
        y="16"
        width="36"
        height="28"
        rx="5"
        fill="#FFFDF7"
        stroke="#D8D1C4"
        stroke-width="1.5"
      />

      <!-- Eyes -->
      <rect
        x="18"
        y="23"
        width="8"
        height="7"
        rx="2"
        :fill="
          state === 'impressed' || state === 'surprised'
            ? '#FF5A36'
            : '#3567D6'
        "
        class="ctd-robot__eye"
      />

      <rect
        x="34"
        y="23"
        width="8"
        height="7"
        rx="2"
        :fill="
          state === 'impressed' || state === 'surprised'
            ? '#FF5A36'
            : '#3567D6'
        "
        class="ctd-robot__eye"
      />

      <!-- Mouth -->
      <line
        v-if="state === 'idle' || state === 'ready'"
        x1="22"
        y1="37"
        x2="38"
        y2="37"
        stroke="#6F6A61"
        stroke-width="1.5"
        stroke-linecap="round"
      />

      <rect
        v-if="state === 'watching'"
        x="24"
        y="34"
        width="12"
        height="5"
        rx="2"
        fill="#6F6A61"
      />

      <circle
        v-if="state === 'thinking'"
        cx="30"
        cy="36"
        r="2.5"
        fill="#3567D6"
      />

      <path
        v-if="state === 'optimizing'"
        d="M22 36 Q26 32 30 36 T38 36"
        stroke="#FF5A36"
        stroke-width="1.5"
        stroke-linecap="round"
        fill="none"
      />

      <path
        v-if="state === 'impressed' || state === 'finished'"
        d="M22 35 Q30 42 38 35"
        :stroke="state === 'impressed' ? '#FF5A36' : '#3567D6'"
        stroke-width="2"
        stroke-linecap="round"
        fill="none"
      />

      <circle
        v-if="state === 'surprised'"
        cx="30"
        cy="36"
        r="4"
        fill="#FF5A36"
      />

      <!-- Body -->
      <rect
        x="16"
        y="46"
        width="28"
        height="22"
        rx="4"
        fill="#FFFDF7"
        stroke="#D8D1C4"
        stroke-width="1.5"
      />

      <!-- Body display -->
      <rect
        x="22"
        y="51"
        width="16"
        height="10"
        rx="2"
        fill="#EAF0FF"
        stroke="#3567D6"
        stroke-width="1"
      />

      <line
        x1="25"
        y1="54"
        x2="35"
        y2="54"
        stroke="#3567D6"
        stroke-width="1"
        opacity="0.7"
      />

      <line
        x1="25"
        y1="57"
        x2="32"
        y2="57"
        stroke="#3567D6"
        stroke-width="1"
        opacity="0.5"
      />

      <!-- Arms -->
      <rect
        x="4"
        y="48"
        width="10"
        height="4"
        rx="2"
        fill="#FFFDF7"
        stroke="#D8D1C4"
        stroke-width="1.5"
      />

      <rect
        x="46"
        y="48"
        width="10"
        height="4"
        rx="2"
        fill="#FFFDF7"
        stroke="#D8D1C4"
        stroke-width="1.5"
      />

      <!-- Legs -->
      <rect
        x="20"
        y="68"
        width="7"
        height="10"
        rx="2"
        fill="#FFFDF7"
        stroke="#D8D1C4"
        stroke-width="1.5"
      />

      <rect
        x="33"
        y="68"
        width="7"
        height="10"
        rx="2"
        fill="#FFFDF7"
        stroke="#D8D1C4"
        stroke-width="1.5"
      />
    </svg>

    <!--
      Mobile always reserves this slot.
      Message changes therefore never resize the header or move the board.
    -->
    <div class="ctd-robot__bubble-slot">
      <Transition name="ctd-bubble">
        <div
          v-if="message"
          class="ctd-robot__bubble"
          role="status"
          aria-live="polite"
        >
          {{ message }}
        </div>
      </Transition>
    </div>
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
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  overflow: visible;
}

.ctd-robot__svg {
  display: block;
  width: 54px;
  height: auto;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.ctd-robot__bubble-slot {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

/* Robot state animations */

.ctd-robot--watching .ctd-robot__svg,
.ctd-robot--thinking .ctd-robot__svg {
  animation: ctd-robot-bob 2s ease-in-out infinite;
}

.ctd-robot--optimizing .ctd-robot__svg {
  animation: ctd-robot-bob 0.8s ease-in-out infinite;
}

.ctd-robot--impressed .ctd-robot__svg,
.ctd-robot--finished .ctd-robot__svg,
.ctd-robot--surprised .ctd-robot__svg {
  animation: ctd-robot-jump 0.4s ease;
}

.ctd-robot__eye {
  transition: fill 0.25s ease;
}

/* Desktop bubble appears above the robot */

.ctd-robot__bubble {
  position: absolute;
  bottom: calc(100% + 6px);
  left: 50%;
  z-index: 5;

  max-width: min(260px, calc(100vw - 2rem));
  padding: 0.35rem 0.65rem;

  transform: translateX(-50%);
  white-space: nowrap;

  color: var(--ctd-text);
  background: #fffdf7;
  border: 1px solid var(--ctd-border);
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);

  font-size: 0.65rem;
  font-weight: 600;
  line-height: 1.35;
  text-align: center;

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
  border-color:
    var(--ctd-border)
    transparent
    transparent;
}

/* Bubble transition */

.ctd-bubble-enter-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.ctd-bubble-leave-active {
  transition: opacity 0.15s ease;
}

.ctd-bubble-enter-from {
  opacity: 0;
  transform:
    translateX(-50%)
    translateY(4px);
}

.ctd-bubble-leave-to {
  opacity: 0;
}

/* Robot animation */

@keyframes ctd-robot-bob {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-4px);
  }
}

@keyframes ctd-robot-jump {
  0% {
    transform:
      translateY(0)
      scale(1);
  }

  40% {
    transform:
      translateY(-8px)
      scale(1.05);
  }

  100% {
    transform:
      translateY(0)
      scale(1);
  }
}

/*
 * Mobile:
 * Reserve a fixed two-line message area beneath the robot.
 * The bubble is absolutely positioned inside that area and cannot
 * change the surrounding header height.
 */

@media (max-width: 600px) {
  .ctd-robot {
    width: min(132px, 34vw);
    height: 132px;
    justify-content: flex-start;
  }

  .ctd-robot__svg {
    width: 46px;
  }

  .ctd-robot__bubble-slot {
    position: absolute;
    top: 84px;
    right: 0;
    bottom: auto;
    left: 0;

    display: flex;
    justify-content: center;
    align-items: flex-start;

    height: 44px;
  }

  .ctd-robot__bubble {
    position: relative;
    inset: auto;
    z-index: 5;

    display: flex;
    align-items: center;
    justify-content: center;

    width: max-content;
    max-width: min(132px, 34vw);
    min-height: 32px;
    max-height: 44px;
    padding: 0.3rem 0.45rem;

    transform: none;
    white-space: normal;
    overflow: hidden;
    overflow-wrap: anywhere;

    font-size: 0.58rem;
    line-height: 1.3;
    text-align: center;
  }

  .ctd-robot__bubble::after {
    top: -5px;
    bottom: auto;
    left: 50%;

    transform: translateX(-50%);

    border-width: 0 5px 5px;
    border-color:
      transparent
      transparent
      var(--ctd-border);
  }

  .ctd-bubble-enter-from {
    opacity: 0;
    transform: translateY(-3px);
  }
}

@media (max-width: 380px) {
  .ctd-robot {
    width: 112px;
    height: 126px;
  }

  .ctd-robot__svg {
    width: 42px;
  }

  .ctd-robot__bubble-slot {
    top: 78px;
    height: 44px;
  }

  .ctd-robot__bubble {
    max-width: 112px;
    font-size: 0.55rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ctd-robot__svg,
  .ctd-robot--watching .ctd-robot__svg,
  .ctd-robot--thinking .ctd-robot__svg,
  .ctd-robot--optimizing .ctd-robot__svg,
  .ctd-robot--impressed .ctd-robot__svg,
  .ctd-robot--finished .ctd-robot__svg,
  .ctd-robot--surprised .ctd-robot__svg {
    animation: none;
    transition: none;
  }

  .ctd-bubble-enter-active,
  .ctd-bubble-leave-active {
    transition: opacity 0.1s ease;
  }
}
</style>

