import { describe, expect, it } from 'vitest'
import { adaptDiagram } from '../engine/adaptDiagram'
import { PROFILES, getProfile } from './profiles'
import { RADIO_CASES } from './radio'
import { TOPICS } from './topics'
import type { DiagramNodeSpec, SessionContext } from './types'

const fullContext = (overrides: Partial<SessionContext> = {}): SessionContext => ({
  teamSize: '1-3',
  teamsCount: '1',
  product: 'admin',
  seo: 'none',
  dataFreshness: 'static',
  independentReleases: 'no',
  liveUpdates: 'none',
  offline: 'none',
  a11y: 'standard',
  i18n: 'single',
  network: 'good',
  deadline: 'balanced',
  ...overrides,
})

function collectDiagramNodes(): DiagramNodeSpec[] {
  const nodes: DiagramNodeSpec[] = []
  for (const topic of Object.values(TOPICS)) {
    if (topic.diagram) nodes.push(...topic.diagram.nodes)
  }
  for (const radioCase of Object.values(RADIO_CASES)) nodes.push(...radioCase.diagram.nodes)
  for (const profile of Object.values(PROFILES)) nodes.push(...profile.diagram.nodes)
  nodes.push(
    ...adaptDiagram(getProfile('csr_spa').diagram, fullContext({ liveUpdates: 'needed' })).nodes.filter(
      (node) => node.id === 'live',
    ),
    ...adaptDiagram(getProfile('csr_spa').diagram, fullContext({ offline: 'needed' })).nodes.filter(
      (node) => node.id === 'offline',
    ),
  )
  return nodes
}

describe('diagram follow-up answers', () => {
  it('gives every diagram node a complete RU/EN/PL sample answer', () => {
    const nodes = collectDiagramNodes()
    expect(nodes.length).toBeGreaterThan(40)
    for (const node of nodes) {
      expect(node.followUpAnswer.ru.trim().length, `${node.id} ru`).toBeGreaterThan(80)
      expect(node.followUpAnswer.en.trim().length, `${node.id} en`).toBeGreaterThan(80)
      expect(node.followUpAnswer.pl.trim().length, `${node.id} pl`).toBeGreaterThan(80)
      expect(node.followUpAnswer.pl, `${node.id} pl must not equal en`).not.toBe(node.followUpAnswer.en)
    }
  })
})
