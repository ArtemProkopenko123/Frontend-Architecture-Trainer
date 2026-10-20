import { describe, expect, it } from 'vitest'
import type { SessionContext } from '../content/types'
import { decodeContext, encodeContext } from './contextUrl'

const base = (overrides: Partial<SessionContext> = {}): SessionContext => ({
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

describe('contextUrl', () => {
  it('round-trips context and profile', () => {
    const ctx = base({ teamsCount: '4+', liveUpdates: 'needed' })
    const raw = encodeContext(ctx, 'ssr_app')
    const decoded = decodeContext(raw)
    expect(decoded.context.teamsCount).toBe('4+')
    expect(decoded.context.liveUpdates).toBe('needed')
    expect(decoded.profileId).toBe('ssr_app')
  })

  it('never throws on garbage', () => {
    expect(decodeContext('%zz').context).toEqual({})
    expect(decodeContext('not-a-query').profileId).toBeNull()
  })

  it('ignores invalid enum values', () => {
    expect(decodeContext('c.seo=maybe').context.seo).toBeUndefined()
  })
})
