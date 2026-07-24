<template>
  <!--
    /experiments/connect-the-dots
    Fully standalone experiment page — no app layout, no global nav.
  -->
  <div class="ctd-page">
    <!-- Aria live region for status announcements -->
    <div
      aria-live="polite"
      aria-atomic="true"
      class="ctd-sr-only"
    >{{ experiment.statusMessage.value }}</div>

    <!-- ─── INTRO PHASE ─────────────────────────────────────────────────────── -->
    <Transition name="ctd-phase">
      <div v-if="experiment.phase.value === 'intro'" key="intro" class="ctd-page__intro-wrap">
        <ExperimentIntro @start="experiment.startExperiment()" />
      </div>
    </Transition>

    <!-- ─── HUMAN ROUND PHASE ───────────────────────────────────────────────── -->
    <Transition name="ctd-phase">
      <div v-if="experiment.phase.value === 'human'" key="human" class="ctd-page__main">
        <!-- Header row -->
        <div class="ctd-round-header">
          <div class="ctd-round-header__left">
            <h1 class="ctd-round-title">YOUR TURN</h1>
            <p class="ctd-round-instruction">
              Choose any point to begin.<br />
              Then connect all remaining points.
            </p>
          </div>
          <div class="ctd-round-header__right">
            <RobotMascot
              :state="experiment.robotState.value"
              :message="experiment.robotMessage.value"
            />
          </div>
        </div>

        <!-- Board -->
        <RouteBoard
          :points="experiment.points.value"
          :pointOrder="experiment.pointOrder.value"
          :selectedSet="experiment.selectedSet.value"
          @selectPoint="experiment.selectPoint($event)"
        />

        <!-- Controls -->
        <ExperimentControls
          :selectedCount="experiment.pointOrder.value.length"
          :totalPoints="10"
          :distanceFormatted="experiment.currentDistanceFormatted.value"
          :canFinish="experiment.canFinish.value"
          @undo="experiment.undoLastPoint()"
          @reset="experiment.resetRoute()"
          @finish="experiment.finishRoute()"
        />
      </div>
    </Transition>

    <!-- ─── HUMAN RESULT PHASE ──────────────────────────────────────────────── -->
    <Transition name="ctd-phase">
      <div v-if="experiment.phase.value === 'human-result' && experiment.humanResult.value" key="result" class="ctd-page__main">
        <HumanResult
          :result="experiment.humanResult.value"
          :points="experiment.points.value"
          @tryAgain="experiment.tryAgain()"
          @continue="experiment.continueToMachine()"
        />
      </div>
    </Transition>

    <!-- ─── MACHINE INTRO PHASE ─────────────────────────────────────────────── -->
    <Transition name="ctd-phase">
      <div v-if="experiment.phase.value === 'machine-intro'" key="machine-intro" class="ctd-page__intro-wrap">
        <MachineIntro @start="experiment.startMachineRun()" />
      </div>
    </Transition>

    <!-- ─── MACHINE RUNNING PHASE ───────────────────────────────────────────── -->
    <Transition name="ctd-phase">
      <div v-if="experiment.phase.value === 'machine-running'" key="machine-running" class="ctd-page__main">
        <MachineRunning
          :points="experiment.points.value"
          :visibleOrder="experiment.machineVisibleOrder.value"
          :currentDistance="experiment.machineCurrentDistance.value"
          :playbackStage="experiment.machinePlaybackStage.value"
          :robotState="experiment.robotState.value"
          :robotMessage="experiment.robotMessage.value"
          :optimizationNote="experiment.machineOptimizationNote.value"
          :activeSegmentRange="experiment.activeSegmentRange.value"
          @viewResults="experiment.viewComparisonResults()"
          @retryMachine="experiment.startMachineRun()"
          @returnToHumanResult="experiment.phase.value = 'human-result'"
        />
      </div>
    </Transition>

    <!-- ─── COMPARISON PHASE ────────────────────────────────────────────────── -->
    <Transition name="ctd-phase">
      <div v-if="experiment.phase.value === 'comparison' && experiment.humanResult.value && experiment.machineResult.value" key="comparison" class="ctd-page__main">
        <ExperimentComparison
          :points="experiment.points.value"
          :humanResult="experiment.humanResult.value"
          :machineResult="experiment.machineResult.value"
          @retrySameLayout="experiment.retrySameLayout()"
          @retryNewLayout="experiment.retryNewLayout()"
        />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import ExperimentIntro    from '~/components/experiments/connect-the-dots/ExperimentIntro.vue'
import RouteBoard         from '~/components/experiments/connect-the-dots/RouteBoard.vue'
import ExperimentControls from '~/components/experiments/connect-the-dots/ExperimentControls.vue'
import HumanResult        from '~/components/experiments/connect-the-dots/HumanResult.vue'
import RobotMascot        from '~/components/experiments/connect-the-dots/RobotMascot.vue'
import MachineIntro       from '~/components/experiments/connect-the-dots/MachineIntro.vue'
import MachineRunning     from '~/components/experiments/connect-the-dots/MachineRunning.vue'
import ExperimentComparison from '~/components/experiments/connect-the-dots/ExperimentComparison.vue'
import { useConnectTheDotsExperiment } from '~/composables/useConnectTheDotsExperiment'

// ─── Disable app layout entirely ────────────────────────────────────────────
definePageMeta({
  layout: false,
})

// ─── Experiment state ────────────────────────────────────────────────────────
const experiment = useConnectTheDotsExperiment()

// ─── SEO ─────────────────────────────────────────────────────────────────────
useSeoMeta({
  title: 'Connect the Dots — MindQLab Experiment',
  description: 'An interactive pathfinding experiment. Connect every point with the shortest possible route.',
})
</script>

<style>
/*
  All styles are scoped to .ctd-* classes.
  CSS custom properties (variables) are declared here at the page root so they
  cascade into child components without polluting the global stylesheet.
*/

/* ── Design tokens ─────────────────────────────────────────────────────────── */
.ctd-page {
  --ctd-bg:           #F4F0E8;
  --ctd-surface:      #FFFDF7;
  --ctd-text:         #171717;
  --ctd-muted:        #6F6A61;
  --ctd-border:       #D8D1C4;
  --ctd-primary:      #FF5A36;
  --ctd-primary-dark: #D94224;
  --ctd-robot:        #3567D6;

  /* Layout */
  min-height: 100dvh;
  background: var(--ctd-bg);
  color: var(--ctd-text);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue',
               Arial, sans-serif;
  -webkit-font-smoothing: antialiased;

  /* Override any global Tailwind/dark-mode vars that might leak in */
  color-scheme: light;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem 3rem;
}

/* ── Screen-reader utility ─────────────────────────────────────────────────── */
.ctd-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border: 0;
}

/* ── Layout containers ─────────────────────────────────────────────────────── */
.ctd-page__intro-wrap {
  width: 100%;
  max-width: 560px;
  margin-top: 3rem;
}

.ctd-page__main {
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

/* ── Round header ──────────────────────────────────────────────────────────── */
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
  color: var(--ctd-text);
  margin: 0 0 0.375rem;
  line-height: 1;
}

.ctd-round-instruction {
  font-size: 0.85rem;
  color: var(--ctd-muted);
  margin: 0;
  line-height: 1.5;
}

/* ── Phase transition ──────────────────────────────────────────────────────── */
.ctd-phase-enter-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}
.ctd-phase-leave-active {
  transition: opacity 0.2s ease;
  position: absolute;
  width: 100%;
}
.ctd-phase-enter-from {
  opacity: 0;
  transform: translateY(14px);
}
.ctd-phase-leave-to {
  opacity: 0;
}

/* ── Responsive ────────────────────────────────────────────────────────────── */
@media (max-width: 480px) {
  .ctd-page {
    padding: 1rem 0.75rem 2rem;
  }

  .ctd-round-title {
    font-size: 1.2rem;
  }

  .ctd-round-instruction {
    font-size: 0.78rem;
  }

  .ctd-round-header__right {
    /* Reduce robot size on very small screens */
    transform: scale(0.8);
    transform-origin: top right;
  }
}

/* ── Reduced motion ────────────────────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .ctd-phase-enter-active,
  .ctd-phase-leave-active {
    transition: opacity 0.15s;
  }
  .ctd-phase-enter-from {
    transform: none;
  }
}
</style>
