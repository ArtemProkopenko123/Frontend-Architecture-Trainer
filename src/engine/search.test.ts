import { describe, expect, it } from 'vitest'
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
})
