import { describe, expect, it } from 'vitest'
import { GUIDE_DAYS, hrefForGuideLink } from '../content/guide'
import { PROFILES } from '../content/profiles'
import { LOCALES } from '../content/types'
import { buildSearchIndex, filterSearchHits } from './search'

describe('search', () => {
  it('finds hydration from the rendering topic', () => {
    const hits = filterSearchHits(buildSearchIndex(), 'hydration', 'en')
    expect(hits.some((h) => h.id.includes('hydration') || h.href.includes('rendering'))).toBe(true)
  })

  it('finds ADR in leadership', () => {
    const hits = filterSearchHits(buildSearchIndex(), 'ADR', 'ru')
    expect(hits.some((h) => h.href.includes('leadership') || h.id.includes('adr'))).toBe(true)
  })

  it('finds the guide frame in Polish', () => {
    const hits = filterSearchHits(buildSearchIndex(), 'szkielet', 'pl')
    expect(hits.some((h) => h.id.includes('guide'))).toBe(true)
  })

  it('returns nothing for empty or 1-char queries', () => {
    expect(filterSearchHits(buildSearchIndex(), ' ', 'ru')).toEqual([])
    expect(filterSearchHits(buildSearchIndex(), 'a', 'ru')).toEqual([])
  })

  it('indexes every profile and finds it by its own title in every locale', () => {
    const index = buildSearchIndex()
    for (const profile of Object.values(PROFILES)) {
      for (const locale of LOCALES) {
        const hits = filterSearchHits(index, profile.title[locale], locale)
        expect(hits.some((h) => h.id === `profile-${profile.id}` && h.kind === 'profile')).toBe(true)
      }
    }
  })

  it('finds profiles by relevant body words', () => {
    const hits = filterSearchHits(buildSearchIndex(), 'eslint-plugin-boundaries', 'en')
    expect(hits.some((h) => h.id === 'profile-csr_spa')).toBe(true)
  })

  it('links a profile hit to the pipeline choice step with the c.profile param', () => {
    const hit = buildSearchIndex().find((h) => h.id === 'profile-ssg_isr')
    expect(hit?.href).toBe('?mode=pipeline&step=choice&c.profile=ssg_isr')
  })

  it('links guide hits to the exact guide deep link', () => {
    const hits = buildSearchIndex().filter((h) => h.kind === 'guide')
    expect(hits).toHaveLength(GUIDE_DAYS.length)
    for (const day of GUIDE_DAYS) {
      expect(hits.find((h) => h.id === `guide-${day.id}`)?.href).toBe(hrefForGuideLink(day.link))
    }
  })
})
