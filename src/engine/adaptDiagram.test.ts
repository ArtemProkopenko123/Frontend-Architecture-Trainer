import { describe, expect, it } from 'vitest'
import { getProfile } from '../content/profiles'
import type { SessionContext } from '../content/types'
import { adaptDiagram } from './adaptDiagram'

const context = (overrides: Partial<SessionContext> = {}): SessionContext => ({
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

describe('adaptDiagram', () => {
  it('adds a realtime node when live updates are needed', () => {
    const diagram = adaptDiagram(getProfile('csr_spa').diagram, context({ liveUpdates: 'needed' }))
    expect(diagram.nodes.some((node) => node.id === 'live')).toBe(true)
    expect(diagram.edges.some((item) => item.source === 'live')).toBe(true)
  })

  it('adds an IndexedDB node when offline is needed', () => {
    const diagram = adaptDiagram(getProfile('csr_spa').diagram, context({ offline: 'needed' }))
    expect(diagram.nodes.some((node) => node.id === 'offline')).toBe(true)
  })

  it('does not add extras by default', () => {
    const base = getProfile('csr_spa').diagram
    const diagram = adaptDiagram(base, context())
    expect(diagram.nodes).toHaveLength(base.nodes.length)
    expect(diagram.edges).toHaveLength(base.edges.length)
  })
})
