// composables/useConnectTheDotsExperiment.ts
import { ref, computed, onUnmounted } from 'vue'
import {
  type ExperimentPoint,
  type ExperimentPhase,
  type HumanRouteResult,
  type MachineRouteResult,
  type CollaborationChange,
  type CollaborationOutcome,
  type CollaborationResult,
  type RobotState,
  generatePoints,
  getRouteDistance,
  formatDistance,
  solveMachineRoute,
  validateMachineRoute,
  validateRouteOrder,
  reverseRouteSection,
  evaluateCollaborationChange,
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

  // ─── Human + Machine Collaboration ─────────────────────────────────────────
  const collaborationOrder = ref<number[]>([])
  const collaborationBaselineOrder = ref<number[]>([])
  const collaborationBaselineDistance = ref<number>(0)
  const collaborationCurrentDistance = ref<number>(0)
  const collaborationFirstIndex = ref<number | null>(null)
  const collaborationSecondIndex = ref<number | null>(null)
  const collaborationCandidateOrder = ref<number[] | null>(null)
  const collaborationCandidateDistance = ref<number | null>(null)
  const collaborationCandidateDifference = ref<number>(0)
  const collaborationCandidatePercentage = ref<number>(0)
  const collaborationFeedback = ref<'idle' | 'selecting' | CollaborationOutcome>('idle')
  const collaborationHistory = ref<CollaborationChange[]>([])
  const collaborationResult = ref<CollaborationResult | null>(null)
  const collaborationStartTime = ref<number>(0)

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

  const collaborationSelectedSet = computed(
    () => new Set(collaborationOrder.value)
  )

  const collaborationSelectedEditIndices = computed(() => {
    const indices: number[] = []
    if (collaborationFirstIndex.value !== null) {
      indices.push(collaborationFirstIndex.value)
    }
    if (collaborationSecondIndex.value !== null) {
      indices.push(collaborationSecondIndex.value)
    }
    return indices
  })

  const collaborationActiveSegmentRange = computed<[number, number] | null>(() => {
    if (
      collaborationFirstIndex.value === null ||
      collaborationSecondIndex.value === null
    ) {
      return null
    }

    return [
      Math.min(collaborationFirstIndex.value, collaborationSecondIndex.value),
      Math.max(collaborationFirstIndex.value, collaborationSecondIndex.value),
    ]
  })

  const collaborationAcceptedChanges = computed(
    () => collaborationHistory.value.filter((change) => change.accepted).length
  )

  const collaborationRejectedChanges = computed(
    () => collaborationHistory.value.filter((change) => !change.accepted).length
  )

  const canUndoCollaboration = computed(
    () => collaborationAcceptedChanges.value > 0
  )

  const canFinishCollaboration = computed(
    () => collaborationCandidateOrder.value === null
  )

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

  function resetCollaborationState() {
    collaborationOrder.value = []
    collaborationBaselineOrder.value = []
    collaborationBaselineDistance.value = 0
    collaborationCurrentDistance.value = 0
    collaborationFirstIndex.value = null
    collaborationSecondIndex.value = null
    collaborationCandidateOrder.value = null
    collaborationCandidateDistance.value = null
    collaborationCandidateDifference.value = 0
    collaborationCandidatePercentage.value = 0
    collaborationFeedback.value = 'idle'
    collaborationHistory.value = []
    collaborationResult.value = null
    collaborationStartTime.value = 0
  }

  function clearCollaborationCandidate() {
    collaborationFirstIndex.value = null
    collaborationSecondIndex.value = null
    collaborationCandidateOrder.value = null
    collaborationCandidateDistance.value = null
    collaborationCandidateDifference.value = 0
    collaborationCandidatePercentage.value = 0
    collaborationFeedback.value = 'selecting'
  }

  function outcomeRobotMessage(
    outcome: CollaborationOutcome,
    difference: number,
    percentageDifference: number
  ): string {
    const units = formatDistance(Math.abs(difference))
    const pct = Math.abs(percentageDifference)

    if (outcome === 'better') {
      return pct >= 1
        ? `Good catch. This saves ${Math.round(pct)}%.`
        : `That shortens the route by ${units} units.`
    }

    if (outcome === 'worse') {
      return `That adds ${units} units. Let us keep the shorter route.`
    }

    return 'Different shape, same distance.'
  }

  // ─── Human Actions ──────────────────────────────────────────────────────────

  function startExperiment() {
    cancelMachinePlayback()
    points.value = generatePoints()
    pointOrder.value = []
    humanResult.value = null
    machineResult.value = null
    resetCollaborationState()
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

  function continueToCollaborationIntro() {
    if (!machineResult.value) return

    cancelMachinePlayback()
    robotState.value = 'ready'
    robotMessage.value = 'Let us improve it together.'
    statusMessage.value = 'Collaboration intro. Select START COLLABORATING to begin.'
    phase.value = 'collaboration-intro'
  }

  function startCollaboration() {
    if (!machineResult.value) return

    const initialOrder = [...machineResult.value.optimized.pointOrder]
    if (!validateRouteOrder(points.value, initialOrder)) {
      robotState.value = 'surprised'
      robotMessage.value = 'Something went wrong.'
      statusMessage.value = 'The machine route is not valid for collaboration.'
      return
    }

    collaborationOrder.value = [...initialOrder]
    collaborationBaselineOrder.value = [...initialOrder]
    collaborationBaselineDistance.value = machineResult.value.optimized.distance
    collaborationCurrentDistance.value = machineResult.value.optimized.distance
    collaborationFirstIndex.value = null
    collaborationSecondIndex.value = null
    collaborationCandidateOrder.value = null
    collaborationCandidateDistance.value = null
    collaborationCandidateDifference.value = 0
    collaborationCandidatePercentage.value = 0
    collaborationFeedback.value = 'selecting'
    collaborationHistory.value = []
    collaborationResult.value = null
    collaborationStartTime.value = Date.now()

    robotState.value = 'ready'
    robotMessage.value = 'Select two points.'
    statusMessage.value = 'Collaboration started. Select the first route boundary.'
    phase.value = 'collaboration'
  }

  function selectCollaborationRouteIndex(index: number) {
    if (phase.value !== 'collaboration') return
    if (collaborationCandidateOrder.value) return
    if (!Number.isInteger(index) || index < 0 || index >= collaborationOrder.value.length) {
      return
    }

    if (collaborationFirstIndex.value === null) {
      collaborationFirstIndex.value = index
      collaborationFeedback.value = 'selecting'
      robotState.value = 'watching'
      robotMessage.value = 'Now choose the other end.'
      statusMessage.value = `First boundary selected at route position ${index + 1}.`
      return
    }

    if (index === collaborationFirstIndex.value) {
      collaborationFirstIndex.value = null
      collaborationFeedback.value = 'selecting'
      robotState.value = 'ready'
      robotMessage.value = 'Select two points.'
      statusMessage.value = 'Boundary cleared. Select the first route boundary.'
      return
    }

    collaborationSecondIndex.value = index

    const fromIndex = Math.min(collaborationFirstIndex.value, index)
    const toIndex = Math.max(collaborationFirstIndex.value, index)
    const candidateOrder = reverseRouteSection(
      collaborationOrder.value,
      fromIndex,
      toIndex
    )

    if (!validateRouteOrder(points.value, candidateOrder)) {
      clearCollaborationCandidate()
      robotState.value = 'surprised'
      robotMessage.value = 'That proposal is not valid.'
      statusMessage.value = 'The candidate route was invalid and has been cleared.'
      return
    }

    const evaluation = evaluateCollaborationChange(
      points.value,
      collaborationOrder.value,
      candidateOrder
    )

    collaborationCandidateOrder.value = [...evaluation.candidateOrder]
    collaborationCandidateDistance.value = evaluation.candidateDistance
    collaborationCandidateDifference.value = evaluation.difference
    collaborationCandidatePercentage.value = evaluation.percentageDifference
    collaborationFeedback.value = evaluation.outcome
    robotState.value = evaluation.outcome === 'worse' ? 'surprised' : 'optimizing'
    robotMessage.value = outcomeRobotMessage(
      evaluation.outcome,
      evaluation.difference,
      evaluation.percentageDifference
    )

    const verb =
      evaluation.outcome === 'better'
        ? 'shortens'
        : evaluation.outcome === 'worse'
          ? 'lengthens'
          : 'keeps'
    const detail =
      evaluation.outcome === 'equal'
        ? 'The route length is effectively unchanged.'
        : `Candidate ${verb} the route by ${formatDistance(Math.abs(evaluation.difference))} units.`

    statusMessage.value =
      `Candidate route created from positions ${fromIndex + 1} through ${toIndex + 1}. ${detail}`
  }

  function acceptCollaborationCandidate() {
    if (
      !collaborationCandidateOrder.value ||
      collaborationCandidateDistance.value === null ||
      collaborationFirstIndex.value === null ||
      collaborationSecondIndex.value === null ||
      collaborationFeedback.value === 'worse'
    ) {
      return
    }

    const fromIndex = Math.min(collaborationFirstIndex.value, collaborationSecondIndex.value)
    const toIndex = Math.max(collaborationFirstIndex.value, collaborationSecondIndex.value)
    const change: CollaborationChange = {
      beforeOrder: [...collaborationOrder.value],
      candidateOrder: [...collaborationCandidateOrder.value],
      beforeDistance: collaborationCurrentDistance.value,
      candidateDistance: collaborationCandidateDistance.value,
      fromIndex,
      toIndex,
      outcome: collaborationFeedback.value,
      accepted: true,
    }

    collaborationHistory.value = [...collaborationHistory.value, change]
    collaborationOrder.value = [...collaborationCandidateOrder.value]
    collaborationCurrentDistance.value = collaborationCandidateDistance.value
    clearCollaborationCandidate()
    robotState.value = 'finished'
    robotMessage.value =
      change.outcome === 'better'
        ? `Accepted. Saved ${formatDistance(Math.abs(change.beforeDistance - change.candidateDistance))} units.`
        : 'Accepted. Distance unchanged.'
    statusMessage.value = 'Candidate accepted.'
  }

  function rejectCollaborationCandidate() {
    if (
      !collaborationCandidateOrder.value ||
      collaborationCandidateDistance.value === null ||
      collaborationFirstIndex.value === null ||
      collaborationSecondIndex.value === null ||
      collaborationFeedback.value === 'idle' ||
      collaborationFeedback.value === 'selecting'
    ) {
      return
    }

    const fromIndex = Math.min(collaborationFirstIndex.value, collaborationSecondIndex.value)
    const toIndex = Math.max(collaborationFirstIndex.value, collaborationSecondIndex.value)
    const change: CollaborationChange = {
      beforeOrder: [...collaborationOrder.value],
      candidateOrder: [...collaborationCandidateOrder.value],
      beforeDistance: collaborationCurrentDistance.value,
      candidateDistance: collaborationCandidateDistance.value,
      fromIndex,
      toIndex,
      outcome: collaborationFeedback.value,
      accepted: false,
    }

    collaborationHistory.value = [...collaborationHistory.value, change]
    clearCollaborationCandidate()
    robotState.value = 'ready'
    robotMessage.value = 'Current route kept.'
    statusMessage.value = 'Candidate rejected.'
  }

  function undoLastCollaborationChange() {
    const lastAcceptedIndex = [...collaborationHistory.value]
      .map((change, index) => ({ change, index }))
      .reverse()
      .find(({ change }) => change.accepted)?.index

    if (lastAcceptedIndex === undefined) return

    const lastAccepted = collaborationHistory.value[lastAcceptedIndex]
    collaborationOrder.value = [...lastAccepted.beforeOrder]
    collaborationCurrentDistance.value = lastAccepted.beforeDistance
    collaborationHistory.value = collaborationHistory.value.filter(
      (_, index) => index !== lastAcceptedIndex
    )
    clearCollaborationCandidate()
    robotState.value = 'ready'
    robotMessage.value = 'Last accepted change undone.'
    statusMessage.value = 'Last accepted change undone.'
  }

  function resetCollaborationToMachineRoute() {
    if (!validateRouteOrder(points.value, collaborationBaselineOrder.value)) return

    collaborationOrder.value = [...collaborationBaselineOrder.value]
    collaborationCurrentDistance.value = collaborationBaselineDistance.value
    collaborationHistory.value = collaborationHistory.value.filter(
      (change) => !change.accepted
    )
    clearCollaborationCandidate()
    robotState.value = 'ready'
    robotMessage.value = 'Back to the machine route.'
    statusMessage.value = 'Collaboration reset to machine route.'
  }

  function finishCollaboration() {
    if (!canFinishCollaboration.value) {
      statusMessage.value = 'Accept or reject the active candidate before finishing.'
      return
    }
    if (!validateRouteOrder(points.value, collaborationOrder.value)) {
      robotState.value = 'surprised'
      robotMessage.value = 'The route needs repair.'
      statusMessage.value = 'The collaborative route is invalid.'
      return
    }

    const acceptedChanges = collaborationAcceptedChanges.value
    const rejectedChanges = collaborationRejectedChanges.value
    collaborationResult.value = {
      initialOrder: [...collaborationBaselineOrder.value],
      finalOrder: [...collaborationOrder.value],
      initialDistance: collaborationBaselineDistance.value,
      finalDistance: collaborationCurrentDistance.value,
      acceptedChanges,
      rejectedChanges,
      totalSaved: collaborationBaselineDistance.value - collaborationCurrentDistance.value,
      durationMs: Math.max(0, Date.now() - collaborationStartTime.value),
    }

    robotState.value = 'finished'
    robotMessage.value = 'Collaboration complete.'
    statusMessage.value = 'Collaboration complete.'
    phase.value = 'collaboration-result'
  }

  function collaborateAgain() {
    if (!machineResult.value) return
    collaborationResult.value = null
    startCollaboration()
  }

  function retrySameLayout() {
    cancelMachinePlayback()
    pointOrder.value = []
    humanResult.value = null
    machineResult.value = null
    machineVisibleOrder.value = []
    resetCollaborationState()
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
    resetCollaborationState()
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
    collaborationOrder,
    collaborationBaselineOrder,
    collaborationBaselineDistance,
    collaborationCurrentDistance,
    collaborationFirstIndex,
    collaborationSecondIndex,
    collaborationCandidateOrder,
    collaborationCandidateDistance,
    collaborationCandidateDifference,
    collaborationCandidatePercentage,
    collaborationFeedback,
    collaborationHistory,
    collaborationResult,
    robotState,
    robotMessage,
    statusMessage,

    // Computed
    selectedSet,
    currentDistance,
    currentDistanceFormatted,
    allPointsSelected,
    canFinish,
    collaborationSelectedSet,
    collaborationSelectedEditIndices,
    collaborationActiveSegmentRange,
    collaborationAcceptedChanges,
    collaborationRejectedChanges,
    canUndoCollaboration,
    canFinishCollaboration,

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
    continueToCollaborationIntro,
    startCollaboration,
    selectCollaborationRouteIndex,
    acceptCollaborationCandidate,
    rejectCollaborationCandidate,
    undoLastCollaborationChange,
    resetCollaborationToMachineRoute,
    finishCollaboration,
    collaborateAgain,
    retrySameLayout,
    retryNewLayout,
    cancelMachinePlayback,
  }
}
