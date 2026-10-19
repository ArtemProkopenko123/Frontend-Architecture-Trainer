import { describe, expect, it } from 'vitest'
import { CONTEXT_QUESTIONS } from '../content/questions'
import { PROFILES, getProfile } from '../content/profiles'
import type { ProfileId, SessionContext } from '../content/types'
import { recommend } from './recommend'

const base = (overrides: Partial<SessionContext> = {}): SessionContext => ({
  teamSize: '1-3',
  teamsCount: '1',
  product: 'admin',
  seo: 'none',
  dataFreshness: 'static',
  independentReleases: 'no',
  ...overrides,
})

describe('recommend', () => {
  it('recommends csr_spa for admin with no SEO and one team, without mfe', () => {
    for (const dataFreshness of ['static', 'infrequent', 'realtime'] as const) {
      const result = recommend(base({ product: 'admin', seo: 'none', dataFreshness, teamsCount: '1' }))
      expect(result.recommendedId).toBe('csr_spa')
      expect(result.optionIds).toContain('csr_spa')
      expect(result.optionIds).not.toContain('mfe')
    }
  })

  it('recommends ssg_isr for public content with critical SEO and static data', () => {
    const result = recommend(
      base({ product: 'public_content', seo: 'critical', dataFreshness: 'static', teamsCount: '1' }),
    )
    expect(result.recommendedId).toBe('ssg_isr')
  })

  it('recommends ssr_app for marketplace with critical SEO and realtime data', () => {
    const result = recommend(base({ product: 'marketplace', seo: 'critical', dataFreshness: 'realtime' }))
    expect(result.recommendedId).toBe('ssr_app')
  })

  it('does not recommend mfe for a 1-3 person team with a single product team', () => {
    const result = recommend(
      base({ teamSize: '1-3', teamsCount: '1', independentReleases: 'yes', product: 'admin', seo: 'none' }),
    )
    expect(result.recommendedId).not.toBe('mfe')
    expect(result.optionIds).not.toContain('mfe')
  })

  it('includes mfe as an option for 11+ people, 4+ teams and independent releases, but does not recommend it', () => {
    const result = recommend(
      base({
        teamSize: '11+',
        teamsCount: '4+',
        independentReleases: 'yes',
        product: 'admin',
        seo: 'none',
      }),
    )
    expect(result.optionIds).toContain('mfe')
    expect(result.recommendedId).not.toBe('mfe')
    expect(result.recommendedId).toBe('csr_spa')
  })

  it('always returns 2 or 3 unique option ids that include the recommendation', () => {
    const samples: SessionContext[] = [
      base(),
      base({ product: 'public_content', seo: 'critical', dataFreshness: 'static' }),
      base({ product: 'marketplace', seo: 'critical', dataFreshness: 'realtime' }),
      base({ product: 'b2b_app', seo: 'none' }),
      base({ teamSize: '11+', teamsCount: '4+', independentReleases: 'yes' }),
      base({ product: 'marketplace', seo: 'critical', dataFreshness: 'infrequent' }),
    ]
    for (const context of samples) {
      const { recommendedId, optionIds } = recommend(context)
      expect(optionIds.length).toBeGreaterThanOrEqual(2)
      expect(optionIds.length).toBeLessThanOrEqual(3)
      expect(new Set(optionIds).size).toBe(optionIds.length)
      expect(optionIds).toContain(recommendedId)
    }
  })

  it('recommends ssg_isr for marketplace with critical SEO and infrequent updates', () => {
    const result = recommend(
      base({ product: 'marketplace', seo: 'critical', dataFreshness: 'infrequent' }),
    )
    expect(result.recommendedId).toBe('ssg_isr')
  })

  it('recommends csr_spa for a logged-in b2b app with no SEO need', () => {
    const result = recommend(base({ product: 'b2b_app', seo: 'none' }))
    expect(result.recommendedId).toBe('csr_spa')
  })

  it('always includes a csr vs ssr contrast', () => {
    const csr = recommend(base({ product: 'admin', seo: 'none' }))
    expect(csr.optionIds).toContain('ssr_app')

    const ssr = recommend(base({ product: 'marketplace', seo: 'critical', dataFreshness: 'realtime' }))
    expect(ssr.optionIds).toContain('csr_spa')
  })
})

describe('content catalogue', () => {
  it('covers all six session context keys bilingually', () => {
    const keys = CONTEXT_QUESTIONS.map((q) => q.key)
    expect(keys.sort()).toEqual(
      ['dataFreshness', 'independentReleases', 'product', 'seo', 'teamSize', 'teamsCount'].sort(),
    )
    for (const question of CONTEXT_QUESTIONS) {
      expect(question.prompt.ru.length).toBeGreaterThan(0)
      expect(question.prompt.en.length).toBeGreaterThan(0)
      expect(question.options.length).toBeGreaterThan(1)
      for (const option of question.options) {
        expect(option.label.ru.length).toBeGreaterThan(0)
        expect(option.label.en.length).toBeGreaterThan(0)
      }
    }
  })

  it('exposes four architecture profiles with a query node and no Redux-as-server-cache', () => {
    const ids: ProfileId[] = ['csr_spa', 'ssg_isr', 'ssr_app', 'mfe']
    for (const id of ids) {
      const profile = getProfile(id)
      expect(profile).toBe(PROFILES[id])
      expect(profile.id).toBe(id)
      expect(profile.diagram.nodes.some((node) => node.kind === 'query')).toBe(true)
      const stateBlob = `${profile.state.ru} ${profile.state.en}`.toLowerCase()
      expect(stateBlob).toMatch(/tanstack query/)
      expect(stateBlob).not.toMatch(/все серверные данные живут в redux/)
      expect(stateBlob).not.toMatch(/server data lives in redux/)
    }
    expect(PROFILES.csr_spa.diagram.nodes.some((n) => n.kind === 'bff')).toBe(false)
    expect(PROFILES.ssr_app.diagram.nodes.some((n) => n.kind === 'bff')).toBe(true)
    expect(PROFILES.mfe.diagram.nodes.some((n) => n.kind === 'mfe' || n.id.includes('shell'))).toBe(true)
  })
})
