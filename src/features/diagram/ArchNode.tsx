import type { CSSProperties } from 'react'
import { Handle, Position, type Node, type NodeProps } from '@xyflow/react'

export type ArchNodeData = {
  label: string
}

export type ArchFlowNode = Node<ArchNodeData, 'arch'>

export type Side = 'left' | 'right' | 'top' | 'bottom'

/** How many exclusive connection points sit on each side of a node. */
export const HANDLES_PER_SIDE = 3

/** Percent offsets along a side (React Flow handle `top` / `left`). */
export const HANDLE_SLOT_PERCENTS = [25, 50, 75] as const

export function handleId(kind: 's' | 't', side: Side, slot: number): string {
  return `${kind}-${side}-${slot}`
}

const SIDES: { position: Position; id: Side }[] = [
  { position: Position.Left, id: 'left' },
  { position: Position.Right, id: 'right' },
  { position: Position.Top, id: 'top' },
  { position: Position.Bottom, id: 'bottom' },
]

function slotStyle(side: Side, slot: number): CSSProperties {
  const pct = `${HANDLE_SLOT_PERCENTS[slot]}%`
  return side === 'left' || side === 'right' ? { top: pct } : { left: pct }
}

export function ArchNode({ data, selected }: NodeProps<ArchFlowNode>) {
  return (
    <div
      className={selected ? 'arch-node selected' : 'arch-node'}
      role="button"
      tabIndex={0}
      aria-label={data.label}
      onKeyDown={(event) => {
        if (event.target !== event.currentTarget) return
        if (event.key !== 'Enter' && event.key !== ' ') return
        // Space would scroll the page. A synthetic click bubbles to React Flow's onNodeClick,
        // so keyboard selection reuses the mouse/touch path.
        event.preventDefault()
        event.currentTarget.click()
      }}
    >
      {SIDES.flatMap(({ position, id }) =>
        Array.from({ length: HANDLES_PER_SIDE }, (_, slot) => (
          <Handle
            key={handleId('t', id, slot)}
            type="target"
            position={position}
            id={handleId('t', id, slot)}
            style={slotStyle(id, slot)}
          />
        )),
      )}
      <span>{data.label}</span>
      {SIDES.flatMap(({ position, id }) =>
        Array.from({ length: HANDLES_PER_SIDE }, (_, slot) => (
          <Handle
            key={handleId('s', id, slot)}
            type="source"
            position={position}
            id={handleId('s', id, slot)}
            style={slotStyle(id, slot)}
          />
        )),
      )}
    </div>
  )
}
