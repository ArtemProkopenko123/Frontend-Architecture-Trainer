import { describe, expect, it } from 'vitest'
import {
  assignEdgeHandles,
  handleId,
  pickEdgeHandles,
  pickEdgeSides,
  slotsForCount,
  type PendingEdge,
} from './layout'

describe('pickEdgeHandles', () => {
  it('uses top/bottom middle slots for same-column downward edges', () => {
    expect(pickEdgeHandles({ x: 260, y: 32 }, { x: 260, y: 128 })).toEqual({
      sourceHandle: 's-bottom-1',
      targetHandle: 't-top-1',
    })
  })

  it('uses top/bottom middle slots for same-column upward edges', () => {
    expect(pickEdgeHandles({ x: 260, y: 128 }, { x: 260, y: 32 })).toEqual({
      sourceHandle: 's-top-1',
      targetHandle: 't-bottom-1',
    })
  })

  it('uses right/left middle slots for left-to-right edges', () => {
    expect(pickEdgeHandles({ x: 40, y: 32 }, { x: 260, y: 32 })).toEqual({
      sourceHandle: 's-right-1',
      targetHandle: 't-left-1',
    })
  })

  it('uses left/right middle slots for right-to-left feedback edges', () => {
    expect(pickEdgeHandles({ x: 700, y: 32 }, { x: 40, y: 32 })).toEqual({
      sourceHandle: 's-left-1',
      targetHandle: 't-right-1',
    })
  })
})

describe('slotsForCount', () => {
  it('centres a single connection', () => {
    expect(slotsForCount(1)).toEqual([1])
  })

  it('uses the ends for two connections', () => {
    expect(slotsForCount(2)).toEqual([0, 2])
  })

  it('uses every slot for three connections', () => {
    expect(slotsForCount(3)).toEqual([0, 1, 2])
  })
})

describe('assignEdgeHandles', () => {
  it('gives each shared-side target its own handle', () => {
    const pending: PendingEdge[] = [
      {
        index: 0,
        source: 'a',
        target: 'hub',
        sourceSide: 'right',
        targetSide: 'left',
        sourceSort: 32,
        targetSort: 32,
      },
      {
        index: 1,
        source: 'b',
        target: 'hub',
        sourceSide: 'right',
        targetSide: 'left',
        sourceSort: 128,
        targetSort: 128,
      },
    ]

    const handles = assignEdgeHandles(pending)
    expect(handles[0].targetHandle).toBe(handleId('t', 'left', 0))
    expect(handles[1].targetHandle).toBe(handleId('t', 'left', 2))
    expect(handles[0].targetHandle).not.toBe(handles[1].targetHandle)
  })

  it('never reuses a handle id on the same node role', () => {
    const pending: PendingEdge[] = [0, 1, 2].map((index) => ({
      index,
      source: `s${index}`,
      target: 'hub',
      sourceSide: 'right' as const,
      targetSide: 'left' as const,
      sourceSort: index * 40,
      targetSort: index * 40,
    }))

    const handles = assignEdgeHandles(pending)
    const targets = handles.map((h) => h.targetHandle)
    expect(new Set(targets).size).toBe(3)
  })

  it('matches pickEdgeSides for a lone edge', () => {
    const sides = pickEdgeSides({ x: 40, y: 32 }, { x: 260, y: 32 })
    const pending: PendingEdge[] = [
      {
        index: 0,
        source: 'a',
        target: 'b',
        sourceSide: sides.sourceSide,
        targetSide: sides.targetSide,
        sourceSort: 32,
        targetSort: 32,
      },
    ]
    expect(assignEdgeHandles(pending)[0]).toEqual(pickEdgeHandles({ x: 40, y: 32 }, { x: 260, y: 32 }))
  })
})
