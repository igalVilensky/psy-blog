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

export type ExperimentPhase = 'intro' | 'human' | 'human-result'

export type RobotState = 'idle' | 'watching' | 'impressed'

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
