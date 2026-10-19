import type { RadioStep } from '../content/types'

export const ROUND_MS = 45 * 60 * 1000

/** Suggested split of a 45-minute RADIO round from the interview doc. */
export const STEP_BUDGET_MS: Record<RadioStep, number> = {
  pick: 0,
  requirements: 7 * 60 * 1000,
  architecture: 10 * 60 * 1000,
  data: 7 * 60 * 1000,
  interface: 7 * 60 * 1000,
  optimizations: 14 * 60 * 1000,
}

export type TimerSnapshot = {
  durationMs: number
  elapsedMs: number
  running: boolean
  startedAt: number | null
}

export function remainingMs(now: number, timer: TimerSnapshot): number {
  const live = timer.running && timer.startedAt !== null ? now - timer.startedAt : 0
  return timer.durationMs - timer.elapsedMs - live
}

export function formatClock(ms: number): string {
  const overtime = ms < 0
  const totalSeconds = Math.floor(Math.abs(ms) / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  const body = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  return overtime ? `+${body}` : body
}
