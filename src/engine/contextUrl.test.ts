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

  it('round-trips a partial context without writing missing fields', () => {
    const raw = encodeContext({ product: 'marketplace', seo: 'critical', network: 'mobile_slow' })
    const params = new URLSearchParams(raw)
    expect([...params.keys()].sort()).toEqual(['c.network', 'c.product', 'c.seo'])
    expect(decodeContext(raw)).toEqual({
      context: { product: 'marketplace', seo: 'critical', network: 'mobile_slow' },
      profileId: null,
    })
  })

  it('skips undefined and invalid values when encoding and decoding partials', () => {
    const raw = encodeContext({ product: 'admin', seo: undefined, teamSize: '1-3' })
    expect(raw).not.toContain('undefined')
    expect(raw).not.toContain('c.seo')
    const decoded = decodeContext(`${raw}&c.network=nope&c.unknown=1&c.a11y=strict`)
    expect(decoded.context).toEqual({ product: 'admin', teamSize: '1-3', a11y: 'strict' })
  })

  it('does not serialize or restore a profile for an incomplete context', () => {
    const raw = encodeContext({ product: 'admin', seo: 'none' }, 'ssr_app')
    expect(raw).not.toContain('c.profile')
    expect(decodeContext('c.product=admin&c.seo=none&c.profile=ssr_app').profileId).toBeNull()
  })

  it('never throws on garbage', () => {
    expect(decodeContext('%zz').context).toEqual({})
    expect(decodeContext('not-a-query').profileId).toBeNull()
  })

  it('ignores invalid enum values', () => {
    expect(decodeContext('c.seo=maybe').context.seo).toBeUndefined()
  })
})
