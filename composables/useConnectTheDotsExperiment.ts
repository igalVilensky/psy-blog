// composables/useConnectTheDotsExperiment.ts
import { ref, computed } from 'vue'
import {
  type ExperimentPoint,
  type ExperimentPhase,
  type HumanRouteResult,
  type RobotState,
  generatePoints,
  getRouteDistance,
  formatDistance,
} from '~/utils/connectTheDots'

const TOTAL_POINTS = 10

export function useConnectTheDotsExperiment() {
  // ─── Phase ──────────────────────────────────────────────────────────────────
  const phase = ref<ExperimentPhase>('intro')

  // ─── Points ─────────────────────────────────────────────────────────────────
  const points = ref<ExperimentPoint[]>([])

  // ─── Route ──────────────────────────────────────────────────────────────────
  /** Ordered list of point IDs as the user selects them. */
  const pointOrder = ref<number[]>([])

  // ─── Timing ─────────────────────────────────────────────────────────────────
  const roundStartTime = ref<number>(0)

  // ─── Result ─────────────────────────────────────────────────────────────────
  const humanResult = ref<HumanRouteResult | null>(null)

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

  // ─── Actions ────────────────────────────────────────────────────────────────

  function startExperiment() {
    points.value = generatePoints()
    pointOrder.value = []
    humanResult.value = null
    roundStartTime.value = Date.now()
    robotState.value = 'idle'
    robotMessage.value = ''
    statusMessage.value = 'Round started. Choose any point to begin.'
    phase.value = 'human'
  }

  function selectPoint(id: number) {
    // Debounce rapid taps
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
    // Generate a fresh layout and go back to human round
    points.value = generatePoints()
    pointOrder.value = []
    humanResult.value = null
    roundStartTime.value = Date.now()
    robotState.value = 'idle'
    robotMessage.value = ''
    statusMessage.value = 'New round started. Choose any point to begin.'
    phase.value = 'human'
  }

  function continueToMachine() {
    // Machine round is not implemented yet — show a stub message
    statusMessage.value = 'The machine round will be added next.'
  }

  return {
    // State
    phase,
    points,
    pointOrder,
    humanResult,
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
  }
}
