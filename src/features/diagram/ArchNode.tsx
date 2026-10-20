import { Handle, Position, type Node, type NodeProps } from '@xyflow/react'

export type ArchNodeData = {
  label: string
}

export type ArchFlowNode = Node<ArchNodeData, 'arch'>

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
      <Handle type="target" position={Position.Left} />
      <span>{data.label}</span>
      <Handle type="source" position={Position.Right} />
    </div>
  )
}
