import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  applyNodeChanges,
  ReactFlow,
  type Edge,
  type NodeChange,
  type NodeTypes,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import type { DiagramSpec, Locale } from '../../content/types'
import { t, ui } from '../../i18n/ui'
import { ArchNode, type ArchFlowNode } from './ArchNode'
import { FollowUpAnswer } from './FollowUpAnswer'
import { positionsFromNodes, toFlowEdges, toFlowNodes } from './layout'

const nodeTypes = { arch: ArchNode } satisfies NodeTypes

function edgesFor(
  diagram: DiagramSpec,
  locale: Locale,
  nodes: { id: string; position: { x: number; y: number } }[],
): Edge[] {
  return toFlowEdges(diagram.edges, locale, positionsFromNodes(nodes))
}

export function SystemDiagram({
  locale,
  diagram,
  canvasKey,
  empty,
}: {
  locale: Locale
  diagram: DiagramSpec | null
  canvasKey: string
  empty: string
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [nodes, setNodes] = useState<ArchFlowNode[]>([])
  const [edges, setEdges] = useState<Edge[]>([])
  const [answerOpen, setAnswerOpen] = useState(false)

  useEffect(() => {
    setSelectedId(null)
    setAnswerOpen(false)
    if (!diagram) {
      setNodes([])
      return
    }
    setNodes(toFlowNodes(diagram.nodes, locale))
  }, [diagram, locale, canvasKey])

  useEffect(() => {
    if (!diagram) {
      setEdges([])
      return
    }
    setEdges(edgesFor(diagram, locale, nodes))
  }, [diagram, locale, nodes])

  const onNodesChange = useCallback((changes: NodeChange<ArchFlowNode>[]) => {
    setNodes((current) => applyNodeChanges(changes, current))
  }, [])

  const displayedNodes = useMemo(
    () => nodes.map((node) => ({ ...node, selected: node.id === selectedId })),
    [nodes, selectedId],
  )

  const selected = diagram?.nodes.find((node) => node.id === selectedId)

  useEffect(() => {
    setAnswerOpen(false)
  }, [selectedId])

  useEffect(() => {
    if (!selectedId) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      if (answerOpen) return
      setSelectedId(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selectedId, answerOpen])

  return (
    <section>
      <h2>{t(ui.diagramTitle, locale)}</h2>
      {!diagram ? (
        <p className="note">{empty}</p>
      ) : (
        <>
          <p className="note">{t(ui.diagramHint, locale)}</p>
          <div className="diagram-canvas">
            <ReactFlow
              key={canvasKey}
              nodes={displayedNodes}
              edges={edges}
              nodeTypes={nodeTypes}
              onNodesChange={onNodesChange}
              fitView
              nodesDraggable
              nodesConnectable={false}
              edgesReconnectable={false}
              zoomOnScroll={false}
              panOnScroll
              onNodeClick={(_event, node) => setSelectedId(node.id)}
              onPaneClick={() => setSelectedId(null)}
              proOptions={{ hideAttribution: true }}
            />
          </div>
          {selected ? (
            <aside className="node-panel">
              <h3>{t(selected.label, locale)}</h3>
              <p>
                <strong>{t(ui.nodeWhy, locale)}</strong>
                {': '}
                {t(selected.why, locale)}
              </p>
              <p>
                <strong>{t(ui.nodeAlt, locale)}</strong>
                {': '}
                {t(selected.alternative, locale)}
              </p>
              <p>
                <strong>{t(ui.nodeFollowUp, locale)}</strong>
                {': '}
                {t(selected.followUp, locale)}
              </p>
              <FollowUpAnswer
                question={selected.followUp}
                answer={selected.followUpAnswer}
                locale={locale}
                onOpenChange={setAnswerOpen}
              />
              <button type="button" className="ghost" onClick={() => setSelectedId(null)}>
                {t(ui.closeNode, locale)}
              </button>
            </aside>
          ) : null}
        </>
      )}
    </section>
  )
}
