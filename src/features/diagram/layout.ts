import { MarkerType, type Edge, type XYPosition } from '@xyflow/react'
import type { DiagramEdgeSpec, DiagramNodeKind, DiagramNodeSpec, Locale } from '../../content/types'
import { t } from '../../i18n/ui'
import {
  HANDLES_PER_SIDE,
  handleId,
  type ArchFlowNode,
  type Side,
} from './ArchNode'

export { HANDLES_PER_SIDE, handleId }
export type { Side }

const COLUMN_X: Record<DiagramNodeKind, number> = {
  browser: 40,
  cdn: 40,
  app: 260,
  mfe: 260,
  ui: 260,
  query: 480,
  bff: 480,
  store: 480,
  realtime: 480,
  api: 700,
  ci: 700,
}

const KIND_ROW: Record<DiagramNodeKind, number> = {
  browser: 0,
  cdn: 1,
  app: 0,
  mfe: 1,
  ui: 2,
  query: 0,
  bff: 1,
  store: 2,
  realtime: 3,
  api: 0,
  ci: 1,
}

const NODE_WIDTH = 160
const NODE_HEIGHT = 40
const Y_START = 32
const Y_GAP = 96

const SIDE_ORDER: Side[] = ['left', 'right', 'top', 'bottom']

export type EdgeSides = {
  sourceSide: Side
  targetSide: Side
}

export type EdgeHandles = {
  sourceHandle: string
  targetHandle: string
}

/** Prefer sides that point toward the other node so edges do not U-turn. */
export function pickEdgeSides(source: XYPosition, target: XYPosition): EdgeSides {
  const dx = target.x + NODE_WIDTH / 2 - (source.x + NODE_WIDTH / 2)
  const dy = target.y + NODE_HEIGHT / 2 - (source.y + NODE_HEIGHT / 2)

  if (Math.abs(dy) >= Math.abs(dx)) {
    return dy >= 0
      ? { sourceSide: 'bottom', targetSide: 'top' }
      : { sourceSide: 'top', targetSide: 'bottom' }
  }

  return dx >= 0
    ? { sourceSide: 'right', targetSide: 'left' }
    : { sourceSide: 'left', targetSide: 'right' }
}

/** Spread N exclusive slots evenly across a side (1 → middle, 2 → ends, 3 → all). */
export function slotsForCount(count: number, capacity = HANDLES_PER_SIDE): number[] {
  const n = Math.min(Math.max(count, 0), capacity)
  if (n === 0) return []
  if (n === 1) return [Math.floor(capacity / 2)]
  if (n === 2) return [0, capacity - 1]
  return Array.from({ length: n }, (_, i) => i)
}

export type PendingEdge = {
  index: number
  source: string
  target: string
  sourceSide: Side
  targetSide: Side
  sourceSort: number
  targetSort: number
}

function sortKeyAlongSide(side: Side, other: XYPosition): number {
  return side === 'left' || side === 'right' ? other.y : other.x
}

type Endpoint = {
  edgeIndex: number
  nodeId: string
  kind: 's' | 't'
  preferred: Side
  sort: number
}

/**
 * Assign one unique handle per endpoint. Prefer sides from `pickEdgeSides`;
 * if a side is full, spill to the next free side on that node.
 */
export function assignEdgeHandles(
  pending: PendingEdge[],
  capacity = HANDLES_PER_SIDE,
): EdgeHandles[] {
  const result: EdgeHandles[] = pending.map(() => ({
    sourceHandle: handleId('s', 'right', 1),
    targetHandle: handleId('t', 'left', 1),
  }))

  const endpoints: Endpoint[] = []
  for (const edge of pending) {
    endpoints.push({
      edgeIndex: edge.index,
      nodeId: edge.source,
      kind: 's',
      preferred: edge.sourceSide,
      sort: edge.sourceSort,
    })
    endpoints.push({
      edgeIndex: edge.index,
      nodeId: edge.target,
      kind: 't',
      preferred: edge.targetSide,
      sort: edge.targetSort,
    })
  }

  // Per node: which handle ids are already taken.
  const usedByNode = new Map<string, Set<string>>()
  const usedOf = (nodeId: string) => {
    let set = usedByNode.get(nodeId)
    if (!set) {
      set = new Set()
      usedByNode.set(nodeId, set)
    }
    return set
  }

  const write = (ep: Endpoint, id: string) => {
    usedOf(ep.nodeId).add(id)
    if (ep.kind === 's') result[ep.edgeIndex].sourceHandle = id
    else result[ep.edgeIndex].targetHandle = id
  }

  // Group by node + kind + preferred side for even slot spacing.
  const groups = new Map<string, Endpoint[]>()
  for (const ep of endpoints) {
    const key = `${ep.nodeId}|${ep.kind}|${ep.preferred}`
    const list = groups.get(key) ?? []
    list.push(ep)
    groups.set(key, list)
  }

  const overflow: Endpoint[] = []

  for (const group of groups.values()) {
    group.sort((a, b) => a.sort - b.sort || a.edgeIndex - b.edgeIndex)
    const { nodeId, kind, preferred } = group[0]
    const used = usedOf(nodeId)

    const freeSlots: number[] = []
    for (let slot = 0; slot < capacity; slot++) {
      if (!used.has(handleId(kind, preferred, slot))) freeSlots.push(slot)
    }

    const take = Math.min(group.length, freeSlots.length)
    const chosen = slotsForCount(take, freeSlots.length).map((i) => freeSlots[i])
    for (let i = 0; i < take; i++) {
      write(group[i], handleId(kind, preferred, chosen[i]))
    }
    for (let i = take; i < group.length; i++) overflow.push(group[i])
  }

  for (const ep of overflow) {
    const used = usedOf(ep.nodeId)
    const sides = [ep.preferred, ...SIDE_ORDER.filter((s) => s !== ep.preferred)]
    let placed = false
    for (const side of sides) {
      for (let slot = 0; slot < capacity; slot++) {
        const id = handleId(ep.kind, side, slot)
        if (used.has(id)) continue
        write(ep, id)
        placed = true
        break
      }
      if (placed) break
    }
    // shortcut: node saturated (12 endpoints); reuse preferred mid
    if (!placed) write(ep, handleId(ep.kind, ep.preferred, Math.floor(capacity / 2)))
  }

  return result
}

/** Single-edge helper: preferred sides with the middle slot. */
export function pickEdgeHandles(source: XYPosition, target: XYPosition): EdgeHandles {
  const sides = pickEdgeSides(source, target)
  return {
    sourceHandle: handleId('s', sides.sourceSide, 1),
    targetHandle: handleId('t', sides.targetSide, 1),
  }
}

export function toFlowNodes(specs: DiagramNodeSpec[], locale: Locale): ArchFlowNode[] {
  const columnIndex = new Map<string, number>()
  const counts = new Map<number, number>()

  const ordered = specs
    .map((spec, sourceIndex) => ({ spec, sourceIndex }))
    .sort((a, b) => {
      const dx = COLUMN_X[a.spec.kind] - COLUMN_X[b.spec.kind]
      if (dx !== 0) return dx
      const dy = KIND_ROW[a.spec.kind] - KIND_ROW[b.spec.kind]
      if (dy !== 0) return dy
      return a.sourceIndex - b.sourceIndex
    })

  for (const { spec } of ordered) {
    const x = COLUMN_X[spec.kind]
    const index = counts.get(x) ?? 0
    columnIndex.set(spec.id, index)
    counts.set(x, index + 1)
  }

  return specs.map((spec) => ({
    id: spec.id,
    type: 'arch' as const,
    position: {
      x: COLUMN_X[spec.kind],
      y: Y_START + (columnIndex.get(spec.id) ?? 0) * Y_GAP,
    },
    data: { label: t(spec.label, locale) },
    style: { width: NODE_WIDTH },
    draggable: true,
    connectable: false,
  }))
}

export function toFlowEdges(
  specs: DiagramEdgeSpec[],
  locale: Locale,
  positions: Map<string, XYPosition>,
): Edge[] {
  const pending: PendingEdge[] = specs.map((spec, index) => {
    const sourcePos = positions.get(spec.source) ?? { x: 0, y: 0 }
    const targetPos = positions.get(spec.target) ?? { x: 0, y: 0 }
    const sides = pickEdgeSides(sourcePos, targetPos)
    return {
      index,
      source: spec.source,
      target: spec.target,
      sourceSide: sides.sourceSide,
      targetSide: sides.targetSide,
      sourceSort: sortKeyAlongSide(sides.sourceSide, targetPos),
      targetSort: sortKeyAlongSide(sides.targetSide, sourcePos),
    }
  })

  const handles = assignEdgeHandles(pending)

  return specs.map((spec, index) => ({
    id: `${spec.source}->${spec.target}`,
    source: spec.source,
    target: spec.target,
    sourceHandle: handles[index].sourceHandle,
    targetHandle: handles[index].targetHandle,
    label: spec.label ? t(spec.label, locale) : undefined,
    type: 'smoothstep',
    markerEnd: { type: MarkerType.ArrowClosed, width: 16, height: 16 },
  }))
}

export function positionsFromNodes(nodes: { id: string; position: XYPosition }[]): Map<string, XYPosition> {
  return new Map(nodes.map((node) => [node.id, node.position]))
}
