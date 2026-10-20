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
    >
      <Handle type="target" position={Position.Left} />
      <span>{data.label}</span>
      <Handle type="source" position={Position.Right} />
    </div>
  )
}
