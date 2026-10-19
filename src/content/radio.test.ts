import { describe, expect, it } from 'vitest'
import { RADIO_CASES, getRadioCase } from './radio'
import type { RadioCaseId } from './types'

const CASE_IDS: RadioCaseId[] = ['feed', 'autocomplete', 'chat', 'dashboard']

describe('RADIO_CASES', () => {
  it('defines the four radio cases', () => {
    expect(Object.keys(RADIO_CASES).sort()).toEqual([...CASE_IDS].sort())
  })

  it('gives each case a diagram with nodes and edges', () => {
    for (const id of CASE_IDS) {
      const diagram = RADIO_CASES[id].diagram
      expect(diagram.nodes.length).toBeGreaterThan(0)
      expect(diagram.edges.length).toBeGreaterThan(0)
    }
  })

  it('resolves each case through getRadioCase', () => {
    for (const id of CASE_IDS) {
      expect(getRadioCase(id)).toBe(RADIO_CASES[id])
      expect(getRadioCase(id).id).toBe(id)
    }
  })
})
