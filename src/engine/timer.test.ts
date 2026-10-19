import { describe, expect, it } from 'vitest'
import {
  formatClock,
  remainingMs,
  ROUND_MS,
  STEP_BUDGET_MS,
} from './timer'

describe('remainingMs', () => {
  it('returns full round when never started', () => {
    expect(
      remainingMs(10_000, {
        durationMs: ROUND_MS,
        elapsedMs: 0,
        running: false,
        startedAt: null,
      }),
    ).toBe(ROUND_MS)
  })

  it('subtracts elapsed when paused', () => {
    expect(
      remainingMs(50_000, {
        durationMs: ROUND_MS,
        elapsedMs: 60_000,
        running: false,
        startedAt: null,
      }),
    ).toBe(ROUND_MS - 60_000)
  })

  it('subtracts live elapsed when running', () => {
    expect(
      remainingMs(20_000, {
        durationMs: ROUND_MS,
        elapsedMs: 10_000,
        running: true,
        startedAt: 5_000,
      }),
    ).toBe(ROUND_MS - 25_000)
  })

  it('goes negative after the round', () => {
    expect(
      remainingMs(1000, {
        durationMs: 1000,
        elapsedMs: 0,
        running: true,
        startedAt: 0,
      }),
    ).toBe(0)
    expect(
      remainingMs(2000, {
        durationMs: 1000,
        elapsedMs: 0,
        running: true,
        startedAt: 0,
      }),
    ).toBe(-1000)
  })
})

describe('formatClock', () => {
  it('formats remaining minutes and seconds', () => {
    expect(formatClock(ROUND_MS)).toBe('45:00')
    expect(formatClock(61_000)).toBe('01:01')
    expect(formatClock(0)).toBe('00:00')
  })

  it('formats overtime with a plus sign', () => {
    expect(formatClock(-65_000)).toBe('+01:05')
  })
})

describe('step budgets', () => {
  it('sums to a 45-minute round without the pick step', () => {
    const total = Object.entries(STEP_BUDGET_MS)
      .filter(([step]) => step !== 'pick')
      .reduce((sum, [, ms]) => sum + ms, 0)
    expect(total).toBe(ROUND_MS)
  })
})
