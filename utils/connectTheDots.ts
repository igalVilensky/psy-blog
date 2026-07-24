// utils/connectTheDots.ts
// Pure utility functions — no Vue, no state, no side effects.

export interface ExperimentPoint {
  id: number
  x: number   // 0..1 normalized
  y: number   // 0..1 normalized
}

export interface HumanRouteResult {
  pointOrder: number[]
  distance: number
  durationMs: number
}

export interface RouteResult {
  pointOrder: number[]
  distance: number
}

export interface MachineImprovement {
  beforeOrder: number[]
  afterOrder: number[]
  beforeDistance: number
  afterDistance: number
  reversedFromIndex: number
  reversedToIndex: number
}

export interface MachineRouteResult {
  initial: RouteResult
  optimized: RouteResult
  improvements: MachineImprovement[]
  computationMs: number
}

export type CollaborationOutcome =
  | 'better'
  | 'worse'
  | 'equal'

export type CollaborationOperation =
  | 'reverse-section'
  | 'move-point'

export type CollaborationEditMode = CollaborationOperation

export interface CollaborationEvaluation {
  candidateOrder: number[]
  currentDistance: number
  candidateDistance: number
  difference: number
  percentageDifference: number
  outcome: CollaborationOutcome
}

export interface CollaborationChange {
  operation: CollaborationOperation
  beforeOrder: number[]
  candidateOrder: number[]
  finalAcceptedOrder?: number[]
  beforeDistance: number
  candidateDistance: number
  finalAcceptedDistance?: number
  humanCandidateDistance?: number
  fromIndex?: number
  toIndex?: number
  sourceIndex?: number
  destinationIndex?: number
  outcome: CollaborationOutcome
  accepted: boolean
  machineFollowUpImprovements?: number
}

export interface CollaborationResult {
  initialOrder: number[]
  finalOrder: number[]
  initialDistance: number
  finalDistance: number
  acceptedChanges: number
  rejectedChanges: number
  reverseProposals: number
  moveProposals: number
  acceptedReversals: number
  acceptedMoves: number
  machineFollowUpImprovements: number
  totalSaved: number
  durationMs: number
}

export type ExperimentPhase =
  | 'intro'
  | 'human'
  | 'human-result'
  | 'machine-intro'
  | 'machine-running'
  | 'comparison'
  | 'collaboration-intro'
  | 'collaboration'
  | 'collaboration-result'

export type RobotState =
  | 'idle'
  | 'watching'
  | 'impressed'
  | 'ready'
  | 'thinking'
  | 'optimizing'
  | 'finished'
  | 'surprised'

// ─── Board coordinate system ──────────────────────────────────────────────────
/** The stable viewBox used for SVG rendering. */
export const VIEWBOX_W = 1000
export const VIEWBOX_H = 650

/** Convert normalized [0,1] coords to viewBox pixel coords. */
export function toVB(p: ExperimentPoint): { cx: number; cy: number } {
  const PAD = 80 // padding from board edge
  return {
    cx: PAD + p.x * (VIEWBOX_W - PAD * 2),
    cy: PAD + p.y * (VIEWBOX_H - PAD * 2),
  }
}

/**
 * Euclidean distance between two points measured in viewBox coordinates.
 * This exactly matches the rendered route length inside the SVG board and
 * remains stable across viewport resizes because the viewBox never changes.
 */
export function getDistance(a: ExperimentPoint, b: ExperimentPoint): number {
  const av = toVB(a)
  const bv = toVB(b)
  return Math.hypot(av.cx - bv.cx, av.cy - bv.cy)
}

/**
 * Total route length for an ordered list of point IDs.
 * pointOrder contains IDs in the order the user visited them.
 */
export function getRouteDistance(
  points: ExperimentPoint[],
  pointOrder: number[]
): number {
  if (pointOrder.length < 2) return 0
  const map = new Map(points.map((p) => [p.id, p]))
  let total = 0
  for (let i = 0; i < pointOrder.length - 1; i++) {
    const a = map.get(pointOrder[i])
    const b = map.get(pointOrder[i + 1])
    if (a && b) total += getDistance(a, b)
  }
  return total
}

// ─── Point generation ─────────────────────────────────────────────────────────
const POINT_COUNT = 10
const PADDING = 0.10  // safe padding from edges (0..1)
const MAX_ATTEMPTS = 500

/** Deterministic fallback layout used when random generation fails. */
function fallbackPoints(): ExperimentPoint[] {
  return [
    { id: 0, x: 0.15, y: 0.20 },
    { id: 1, x: 0.38, y: 0.12 },
    { id: 2, x: 0.62, y: 0.18 },
    { id: 3, x: 0.85, y: 0.25 },
    { id: 4, x: 0.90, y: 0.55 },
    { id: 5, x: 0.75, y: 0.80 },
    { id: 6, x: 0.50, y: 0.88 },
    { id: 7, x: 0.25, y: 0.82 },
    { id: 8, x: 0.10, y: 0.60 },
    { id: 9, x: 0.45, y: 0.48 },
  ]
}

/** Generate 10 random points with minimum spacing and safe padding. */
export function generatePoints(): ExperimentPoint[] {
  const points: ExperimentPoint[] = []
  let attempts = 0

  while (points.length < POINT_COUNT && attempts < MAX_ATTEMPTS) {
    attempts++
    const candidate: ExperimentPoint = {
      id: points.length,
      x: PADDING + Math.random() * (1 - PADDING * 2),
      y: PADDING + Math.random() * (1 - PADDING * 2),
    }

    const tooClose = points.some((p) => {
      const pv = toVB(p)
      const cv = toVB(candidate)
      return Math.hypot(pv.cx - cv.cx, pv.cy - cv.cy) < 80 // 80 viewBox units ≈ comfortable spacing
    })

    if (!tooClose) points.push(candidate)
  }

  if (points.length < POINT_COUNT) return fallbackPoints()
  return points
}

// ─── Formatting ───────────────────────────────────────────────────────────────
export function formatDistance(d: number): string {
  return Math.round(d).toLocaleString()
}

export function formatDuration(ms: number): string {
  const s = Math.floor(ms / 1000)
  if (s < 60) return `${s}s`
  const m = Math.floor(s / 60)
  const rem = s % 60
  return `${m}m ${rem.toString().padStart(2, '0')}s`
}

// ─── Machine Algorithms ────────────────────────────────────────────────────────

const IMPROVEMENT_EPSILON = 0.001
export const COLLABORATION_EPSILON = 0.001
const MAX_2OPT_PASSES = 100

/**
 * Validates that a route order contains every point ID exactly once.
 * This checks against the actual IDs present in points, not sequential ID
 * assumptions.
 */
export function validateRouteOrder(
  points: ExperimentPoint[],
  order: number[]
): boolean {
  if (!Array.isArray(points) || !Array.isArray(order)) return false
  if (order.length !== points.length) return false

  const validPointIds = new Set<number>()
  for (const point of points) {
    if (!point || typeof point.id !== 'number' || validPointIds.has(point.id)) {
      return false
    }
    validPointIds.add(point.id)
  }

  const seen = new Set<number>()
  for (const id of order) {
    if (!validPointIds.has(id) || seen.has(id)) {
      return false
    }
    seen.add(id)
  }

  return seen.size === points.length
}

/**
 * Returns a new route with the inclusive section reversed.
 * Invalid or identical indices safely return a copied source route.
 */
export function reverseRouteSection(
  order: number[],
  fromIndex: number,
  toIndex: number
): number[] {
  if (!Array.isArray(order)) return []
  if (!Number.isInteger(fromIndex) || !Number.isInteger(toIndex)) {
    return [...order]
  }

  const from = Math.min(fromIndex, toIndex)
  const to = Math.max(fromIndex, toIndex)

  if (
    from === to ||
    from < 0 ||
    to >= order.length
  ) {
    return [...order]
  }

  return [
    ...order.slice(0, from),
    ...order.slice(from, to + 1).reverse(),
    ...order.slice(to + 1),
  ]
}

/**
 * Moves one route point by removing sourceIndex and inserting that point
 * immediately before the point currently at destinationIndex.
 * Returns null for invalid inputs or selections that leave the route unchanged.
 */
export function moveRoutePoint(
  order: number[],
  sourceIndex: number,
  destinationIndex: number
): number[] | null {
  if (!Array.isArray(order)) return null
  if (!Number.isInteger(sourceIndex) || !Number.isInteger(destinationIndex)) {
    return null
  }
  if (
    sourceIndex < 0 ||
    destinationIndex < 0 ||
    sourceIndex >= order.length ||
    destinationIndex >= order.length ||
    sourceIndex === destinationIndex
  ) {
    return null
  }

  const movingPointId = order[sourceIndex]
  const withoutMovingPoint = [
    ...order.slice(0, sourceIndex),
    ...order.slice(sourceIndex + 1),
  ]

  const insertionIndex =
    sourceIndex < destinationIndex
      ? destinationIndex - 1
      : destinationIndex

  if (insertionIndex === sourceIndex) return null

  const candidateOrder = [
    ...withoutMovingPoint.slice(0, insertionIndex),
    movingPointId,
    ...withoutMovingPoint.slice(insertionIndex),
  ]

  const isUnchanged =
    candidateOrder.length === order.length &&
    candidateOrder.every((id, index) => id === order[index])

  return isUnchanged ? null : candidateOrder
}

export function evaluateCollaborationChange(
  points: ExperimentPoint[],
  currentOrder: number[],
  candidateOrder: number[]
): CollaborationEvaluation {
  const safeCandidateOrder = [...candidateOrder]
  const currentDistance = getRouteDistance(points, currentOrder)
  const candidateDistance = validateRouteOrder(points, safeCandidateOrder)
    ? getRouteDistance(points, safeCandidateOrder)
    : currentDistance
  const difference = currentDistance - candidateDistance
  const percentageDifference =
    currentDistance > 0 ? (difference / currentDistance) * 100 : 0

  let outcome: CollaborationOutcome = 'equal'
  if (candidateDistance < currentDistance - COLLABORATION_EPSILON) {
    outcome = 'better'
  } else if (candidateDistance > currentDistance + COLLABORATION_EPSILON) {
    outcome = 'worse'
  }

  return {
    candidateOrder: safeCandidateOrder,
    currentDistance,
    candidateDistance,
    difference,
    percentageDifference,
    outcome,
  }
}

/**
 * Builds a nearest-neighbor open path starting from startPointId.
 * Uses deterministic tie handling (prefers lower point ID).
 */
export function buildNearestNeighborRoute(
  points: ExperimentPoint[],
  startPointId: number
): RouteResult {
  if (points.length === 0) return { pointOrder: [], distance: 0 }
  const pointMap = new Map(points.map((p) => [p.id, p]))
  const unvisited = new Set(points.map((p) => p.id))

  if (!unvisited.has(startPointId)) {
    const firstId = points[0].id
    startPointId = firstId
  }

  const order: number[] = [startPointId]
  unvisited.delete(startPointId)

  let currentId = startPointId

  while (unvisited.size > 0) {
    const currentPoint = pointMap.get(currentId)!
    let bestNextId = -1
    let bestDist = Infinity

    for (const candidateId of unvisited) {
      const candidatePoint = pointMap.get(candidateId)!
      const dist = getDistance(currentPoint, candidatePoint)

      if (
        dist < bestDist - 1e-9 ||
        (Math.abs(dist - bestDist) <= 1e-9 && (bestNextId === -1 || candidateId < bestNextId))
      ) {
        bestDist = dist
        bestNextId = candidateId
      }
    }

    if (bestNextId !== -1) {
      order.push(bestNextId)
      unvisited.delete(bestNextId)
      currentId = bestNextId
    } else {
      break
    }
  }

  const distance = getRouteDistance(points, order)
  return { pointOrder: order, distance }
}

/**
 * Runs Nearest Neighbor starting from every point and returns the shortest route.
 * Uses deterministic tie handling (prefers lower starting point ID).
 */
export function findBestNearestNeighborRoute(
  points: ExperimentPoint[]
): RouteResult {
  if (points.length === 0) return { pointOrder: [], distance: 0 }

  let bestRoute: RouteResult | null = null

  for (const p of points) {
    const route = buildNearestNeighborRoute(points, p.id)
    if (
      !bestRoute ||
      route.distance < bestRoute.distance - 1e-9 ||
      (Math.abs(route.distance - bestRoute.distance) <= 1e-9 &&
        p.id < bestRoute.pointOrder[0])
    ) {
      bestRoute = route
    }
  }

  return bestRoute || { pointOrder: [], distance: 0 }
}

/**
 * 2-opt optimization for an open path.
 * Reverses subsegments when it strictly reduces total route distance by > IMPROVEMENT_EPSILON.
 */
export function optimizeRouteTwoOpt(
  points: ExperimentPoint[],
  initialOrder: number[]
): {
  optimizedRoute: RouteResult
  improvements: MachineImprovement[]
} {
  const n = initialOrder.length
  let currentOrder = [...initialOrder]
  let currentDistance = getRouteDistance(points, currentOrder)
  const improvements: MachineImprovement[] = []

  if (n < 4) {
    return {
      optimizedRoute: { pointOrder: currentOrder, distance: currentDistance },
      improvements: [],
    }
  }

  let pass = 0
  let improvedInPass = true

  while (improvedInPass && pass < MAX_2OPT_PASSES) {
    improvedInPass = false
    pass++

    for (let i = 0; i < n - 1; i++) {
      for (let j = i + 1; j < n; j++) {
        // Skip 0..n-1 full reversal (equivalent to path reversal)
        if (i === 0 && j === n - 1) continue

        const candidateOrder = [
          ...currentOrder.slice(0, i),
          ...currentOrder.slice(i, j + 1).reverse(),
          ...currentOrder.slice(j + 1),
        ]

        const candidateDistance = getRouteDistance(points, candidateOrder)

        if (currentDistance - candidateDistance > IMPROVEMENT_EPSILON) {
          improvements.push({
            beforeOrder: [...currentOrder],
            afterOrder: [...candidateOrder],
            beforeDistance: currentDistance,
            afterDistance: candidateDistance,
            reversedFromIndex: i,
            reversedToIndex: j,
          })

          currentOrder = candidateOrder
          currentDistance = candidateDistance
          improvedInPass = true
          break
        }
      }
      if (improvedInPass) break
    }
  }

  return {
    optimizedRoute: { pointOrder: currentOrder, distance: currentDistance },
    improvements,
  }
}

/**
 * Complete machine solver combining multi-start Nearest Neighbor and 2-opt optimization.
 * Measures calculation time and returns precomputed route details.
 */
export function solveMachineRoute(points: ExperimentPoint[]): MachineRouteResult {
  const t0 = typeof performance !== 'undefined' ? performance.now() : Date.now()

  const initial = findBestNearestNeighborRoute(points)
  const { optimizedRoute: optimized, improvements } = optimizeRouteTwoOpt(
    points,
    initial.pointOrder
  )

  const t1 = typeof performance !== 'undefined' ? performance.now() : Date.now()
  const computationMs = Math.max(0, t1 - t0)

  return {
    initial,
    optimized,
    improvements,
    computationMs,
  }
}

/**
 * Validates that a machine route contains all points exactly once,
 * has valid point IDs, and a valid finite distance.
 */
export function validateMachineRoute(
  points: ExperimentPoint[],
  result: MachineRouteResult | null
): boolean {
  if (!Array.isArray(points) || !result) return false

  const checkRoute = (r: RouteResult) => {
    if (!r || !Array.isArray(r.pointOrder)) return false
    if (typeof r.distance !== 'number' || !Number.isFinite(r.distance) || r.distance < 0) return false
    return validateRouteOrder(points, r.pointOrder)
  }

  return checkRoute(result.initial) && checkRoute(result.optimized)
}
