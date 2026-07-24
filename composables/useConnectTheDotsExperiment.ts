// composables/useConnectTheDotsExperiment.ts
import { ref, computed, onUnmounted } from 'vue'
import {
  type ExperimentPoint,
  type ExperimentPhase,
  type HumanRouteResult,
  type MachineRouteResult,
  type RobotState,
  generatePoints,
  getRouteDistance,
  formatDistance,
  solveMachineRoute,
  validateMachineRoute,
} from '~/utils/connectTheDots'

const TOTAL_POINTS = 10

export function useConnectTheDotsExperiment() {
  // ─── Phase ──────────────────────────────────────────────────────────────────
  const phase = ref<ExperimentPhase>('intro')

  // ─── Points ─────────────────────────────────────────────────────────────────
  const points = ref<ExperimentPoint[]>([])

  // ─── Human Route ────────────────────────────────────────────────────────────
  const pointOrder = ref<number[]>([])
  const roundStartTime = ref<number>(0)
  const humanResult = ref<HumanRouteResult | null>(null)

  // ─── Machine State ──────────────────────────────────────────────────────────
  const machineResult = ref<MachineRouteResult | null>(null)
  const machineVisibleOrder = ref<number[]>([])
  const machineCurrentDistance = ref<number>(0)
  const machinePlaybackStage = ref<
    'idle' | 'measuring' | 'building' | 'optimizing' | 'complete' | 'error'
  >('idle')
  const machineOptimizationNote = ref<string>('')
  const activeSegmentRange = ref<[number, number] | null>(null)

  // ─── Playback Run ID for Safe Cancellation ──────────────────────────────────
  let currentRunId = 0

  // ─── Robot ──────────────────────────────────────────────────────────────────
  const robotState = ref<RobotState>('idle')
  const robotMessage = ref<string>('')

  // ─── Status / a11y live region ───────────────────────────────────────────────
  const statusMessage = ref<string>('')

  // ─── Debounce guard ─────────────────────────────────────────────────────────
  let lastSelectTime = 0

  // ─── Computed ───────────────────────────────────────────────────────────────
  const selectedSet = computed(() => new Set(pointOrder.value))

  const currentDistance = computed(() =>
    getRouteDistance(points.value, pointOrder.value)
  )

  const currentDistanceFormatted = computed(() =>
    formatDistance(currentDistance.value)
  )

  const allPointsSelected = computed(
    () => pointOrder.value.length === TOTAL_POINTS
  )

  const canFinish = computed(() => allPointsSelected.value)

  // ─── Helpers ────────────────────────────────────────────────────────────────
  function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  function checkReducedMotion(): boolean {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }
    return false
  }

  function cancelMachinePlayback() {
    currentRunId++
    machinePlaybackStage.value = 'idle'
    activeSegmentRange.value = null
    machineOptimizationNote.value = ''
  }

  // ─── Human Actions ──────────────────────────────────────────────────────────

  function startExperiment() {
    cancelMachinePlayback()
    points.value = generatePoints()
    pointOrder.value = []
    humanResult.value = null
    machineResult.value = null
    roundStartTime.value = Date.now()
    robotState.value = 'idle'
    robotMessage.value = ''
    statusMessage.value = 'Round started. Choose any point to begin.'
    phase.value = 'human'
  }

  function selectPoint(id: number) {
    const now = Date.now()
    if (now - lastSelectTime < 200) return
    lastSelectTime = now

    if (phase.value !== 'human') return
    if (selectedSet.value.has(id)) return

    pointOrder.value = [...pointOrder.value, id]
    const count = pointOrder.value.length
    statusMessage.value = `Point ${count} of ${TOTAL_POINTS} selected.`

    // Robot reactions
    if (count === 1) {
      robotState.value = 'watching'
      robotMessage.value = 'I am watching your strategy.'
    } else if (count === 5) {
      robotMessage.value = 'Interesting route.'
    } else if (count === TOTAL_POINTS) {
      robotMessage.value = 'All points connected. Ready to finish?'
    }
  }

  function undoLastPoint() {
    if (pointOrder.value.length === 0) return
    pointOrder.value = pointOrder.value.slice(0, -1)
    const count = pointOrder.value.length
    statusMessage.value =
      count === 0
        ? 'Route cleared. Choose any point to begin.'
        : `Undo. Now at ${count} of ${TOTAL_POINTS} points.`

    if (count < TOTAL_POINTS) {
      robotState.value = count === 0 ? 'idle' : 'watching'
      if (count === 0) robotMessage.value = ''
    }
  }

  function resetRoute() {
    pointOrder.value = []
    roundStartTime.value = Date.now()
    robotState.value = 'idle'
    robotMessage.value = ''
    statusMessage.value = 'Route reset. Choose any point to begin.'
  }

  function finishRoute() {
    if (!canFinish.value) return

    const durationMs = Date.now() - roundStartTime.value
    humanResult.value = {
      pointOrder: [...pointOrder.value],
      distance: currentDistance.value,
      durationMs,
    }

    robotState.value = 'impressed'
    robotMessage.value = 'I have saved your result.'
    statusMessage.value = `Route complete! Distance: ${currentDistanceFormatted.value}.`
    phase.value = 'human-result'
  }

  function tryAgain() {
    startExperiment()
  }

  // ─── Machine Round Actions ──────────────────────────────────────────────────

  function continueToMachine() {
    cancelMachinePlayback()
    robotState.value = 'ready'
    robotMessage.value = 'My turn to solve this layout.'
    statusMessage.value = 'Machine round intro. Select LET THE ROBOT TRY to begin.'
    phase.value = 'machine-intro'
  }

  async function startMachineRun() {
    // Prevent double starts
    if (
      machinePlaybackStage.value === 'measuring' ||
      machinePlaybackStage.value === 'building' ||
      machinePlaybackStage.value === 'optimizing'
    ) {
      return
    }

    cancelMachinePlayback()
    const thisRunId = currentRunId
    phase.value = 'machine-running'

    try {
      // Compute machine route locally (pure algorithm)
      const result = solveMachineRoute(points.value)

      // Validate algorithm output
      const isValid = validateMachineRoute(points.value, result)
      if (!isValid) {
        if (thisRunId !== currentRunId) return
        machinePlaybackStage.value = 'error'
        robotState.value = 'surprised'
        robotMessage.value = 'Something went wrong.'
        statusMessage.value = 'The machine could not build a valid route.'
        return
      }

      machineResult.value = result
      machineVisibleOrder.value = []
      machineCurrentDistance.value = 0
      machineOptimizationNote.value = ''
      activeSegmentRange.value = null

      // Playback sequence
      await runPlaybackSequence(result, thisRunId)
    } catch (err) {
      if (thisRunId !== currentRunId) return
      machinePlaybackStage.value = 'error'
      robotState.value = 'surprised'
      robotMessage.value = 'Something went wrong.'
      statusMessage.value = 'The machine could not build a valid route.'
    }
  }

  async function runPlaybackSequence(res: MachineRouteResult, thisRunId: number) {
    const isCancelled = () =>
      thisRunId !== currentRunId || phase.value !== 'machine-running'
    const isReducedMotion = checkReducedMotion()

    // ── STAGE 1: MEASURING ───────────────────────────────────────────────────
    machinePlaybackStage.value = 'measuring'
    robotState.value = 'thinking'
    robotMessage.value = 'Measuring the distances...'
    statusMessage.value = 'Machine round started. Measuring point distances...'

    await delay(isReducedMotion ? 80 : 550)
    if (isCancelled()) return

    // ── STAGE 2: INITIAL ROUTE (NEAREST NEIGHBOR) ───────────────────────────
    machinePlaybackStage.value = 'building'
    robotState.value = 'thinking'
    robotMessage.value = 'Building a quick route...'
    statusMessage.value = 'Machine is building its initial route.'

    const initialOrder = res.initial.pointOrder

    for (let i = 0; i < initialOrder.length; i++) {
      machineVisibleOrder.value = initialOrder.slice(0, i + 1)
      machineCurrentDistance.value = getRouteDistance(
        points.value,
        machineVisibleOrder.value
      )

      if (i + 1 === initialOrder.length) {
        statusMessage.value = `Machine built first route of 10 points.`
      } else {
        statusMessage.value = `Machine connected ${i + 1} of 10 points.`
      }

      await delay(isReducedMotion ? 40 : 200)
      if (isCancelled()) return
    }

    robotMessage.value = 'I have a first route.'
    await delay(isReducedMotion ? 100 : 450)
    if (isCancelled()) return

    // ── STAGE 3: OPTIMIZATION (2-OPT) ─────────────────────────────────────────
    machinePlaybackStage.value = 'optimizing'
    robotState.value = 'optimizing'
    robotMessage.value = 'Looking for a shorter path...'

    if (res.improvements.length === 0) {
      machineOptimizationNote.value = 'First route was locally efficient'
      robotMessage.value = 'The first route was already locally efficient.'
      statusMessage.value = 'The first route was already locally efficient.'
      await delay(isReducedMotion ? 100 : 700)
      if (isCancelled()) return
    } else {
      const stepsToAnimate = res.improvements.slice(0, 6)

      for (let s = 0; s < stepsToAnimate.length; s++) {
        const imp = stepsToAnimate[s]
        const saved = imp.beforeDistance - imp.afterDistance
        machineOptimizationNote.value = `Improved by ${formatDistance(saved)} units`
        robotMessage.value = s % 2 === 0 ? 'I think I can shorten it.' : 'That is better.'
        statusMessage.value = `Machine improved the route by ${formatDistance(saved)} units.`

        activeSegmentRange.value = [imp.reversedFromIndex, imp.reversedToIndex]
        await delay(isReducedMotion ? 40 : 300)
        if (isCancelled()) return

        machineVisibleOrder.value = imp.afterOrder
        machineCurrentDistance.value = imp.afterDistance
        await delay(isReducedMotion ? 40 : 350)
        if (isCancelled()) return
      }

      activeSegmentRange.value = null
    }

    // Ensure final state matches exact precomputed optimization result
    machineVisibleOrder.value = res.optimized.pointOrder
    machineCurrentDistance.value = res.optimized.distance

    // ── STAGE 4: COMPLETE ───────────────────────────────────────────────────
    machinePlaybackStage.value = 'complete'
    robotState.value = 'finished'
    robotMessage.value = 'Route complete.'
    statusMessage.value = 'Machine route complete.'
  }

  function viewComparisonResults() {
    phase.value = 'comparison'
    robotState.value = 'idle'
    robotMessage.value = ''
    statusMessage.value = 'Comparison results displayed.'
  }

  function retrySameLayout() {
    cancelMachinePlayback()
    pointOrder.value = []
    humanResult.value = null
    machineResult.value = null
    machineVisibleOrder.value = []
    roundStartTime.value = Date.now()
    robotState.value = 'idle'
    robotMessage.value = ''
    statusMessage.value = 'Same layout restarted. Choose any point to begin.'
    phase.value = 'human'
  }

  function retryNewLayout() {
    cancelMachinePlayback()
    points.value = generatePoints()
    pointOrder.value = []
    humanResult.value = null
    machineResult.value = null
    machineVisibleOrder.value = []
    roundStartTime.value = Date.now()
    robotState.value = 'idle'
    robotMessage.value = ''
    statusMessage.value = 'New layout generated. Choose any point to begin.'
    phase.value = 'human'
  }

  onUnmounted(() => {
    cancelMachinePlayback()
  })

  return {
    // State
    phase,
    points,
    pointOrder,
    humanResult,
    machineResult,
    machineVisibleOrder,
    machineCurrentDistance,
    machinePlaybackStage,
    machineOptimizationNote,
    activeSegmentRange,
    robotState,
    robotMessage,
    statusMessage,

    // Computed
    selectedSet,
    currentDistance,
    currentDistanceFormatted,
    allPointsSelected,
    canFinish,

    // Actions
    startExperiment,
    selectPoint,
    undoLastPoint,
    resetRoute,
    finishRoute,
    tryAgain,
    continueToMachine,
    startMachineRun,
    viewComparisonResults,
    retrySameLayout,
    retryNewLayout,
    cancelMachinePlayback,
  }
}
