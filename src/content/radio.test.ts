import { describe, expect, it } from 'vitest'
import { RADIO_CASES, getRadioCase } from './radio'
import type { RadioCaseId } from './types'

const CASE_IDS: RadioCaseId[] = ['feed', 'autocomplete', 'chat', 'dashboard', 'shop', 'kanban']

describe('RADIO_CASES', () => {
  it('does not recommend aria-grabbed for kanban moves', () => {
    const guidance = RADIO_CASES.kanban.optimizations
      .flatMap((text) => Object.values(text))
      .join(' ')

    expect(guidance).not.toContain('aria-grabbed')
  })

  it('defines the radio cases including shop and kanban', () => {
    expect(Object.keys(RADIO_CASES).sort()).toEqual([...CASE_IDS].sort())
    expect(getRadioCase('shop').diagram.nodes.some((node) => node.kind === 'query')).toBe(true)
    expect(getRadioCase('kanban').diagram.nodes.some((node) => node.kind === 'query')).toBe(true)
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
