import type { Edge } from '@xyflow/react'
import type { DiagramEdgeSpec, DiagramNodeKind, DiagramNodeSpec, Locale } from '../../content/types'
import { t } from '../../i18n/ui'
import type { ArchFlowNode } from './ArchNode'

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
const Y_START = 32
const Y_GAP = 96

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

export function toFlowEdges(specs: DiagramEdgeSpec[], locale: Locale): Edge[] {
  return specs.map((spec) => ({
    id: `${spec.source}->${spec.target}`,
    source: spec.source,
    target: spec.target,
    label: spec.label ? t(spec.label, locale) : undefined,
  }))
}
