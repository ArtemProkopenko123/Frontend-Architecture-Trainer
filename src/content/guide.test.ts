import { describe, expect, it } from 'vitest'
import { RADIO_CASES } from './radio'
import { TOPICS } from './topics'
import { GUIDE_DAYS, hrefForGuideLink } from './guide'
import { LOCALES } from './types'

describe('guide', () => {
  it('has exactly seven consecutive days with localized copy and a resolvable deep link', () => {
    expect(GUIDE_DAYS).toHaveLength(7)
    expect(GUIDE_DAYS.map((d) => d.day)).toEqual([1, 2, 3, 4, 5, 6, 7])
    for (const day of GUIDE_DAYS) {
      for (const locale of LOCALES) {
        expect(day.title[locale].length).toBeGreaterThan(0)
        expect(day.doneWhen[locale].length).toBeGreaterThan(0)
      }
      const { link } = day
      expect(hrefForGuideLink(link)).toMatch(/^\?mode=/)
      if (link.topicId) expect(TOPICS[link.topicId]).toBeDefined()
      if (link.radioCaseId) expect(RADIO_CASES[link.radioCaseId]).toBeDefined()
    }
  })

  it('builds the href from the link and does not promise several destinations in a title', () => {
    for (const day of GUIDE_DAYS) {
      const params = new URLSearchParams(hrefForGuideLink(day.link))
      expect(params.get('mode')).toBe(day.link.mode)
      for (const locale of LOCALES) {
        expect(day.title[locale]).not.toMatch(/\s[+&]\s/)
      }
    }
  })

  it('covers the intro, constructor, core room, practical room, RADIO, story and full run', () => {
    const links = GUIDE_DAYS.map((d) => d.link)
    expect(links[0]).toMatchObject({ mode: 'topics', topicId: 'architecture' })
    expect(links[1]).toMatchObject({ mode: 'pipeline', step: 'context' })
    expect(links.some((l) => l.mode === 'topics' && ['structure', 'state', 'rendering', 'api'].includes(l.topicId ?? ''))).toBe(true)
    expect(links.some((l) => l.mode === 'topics' && ['a11y', 'offline', 'i18n'].includes(l.topicId ?? ''))).toBe(true)
    expect(links.some((l) => l.mode === 'radio' && l.radioCaseId)).toBe(true)
    expect(links.some((l) => l.mode === 'prep' && l.prepSection === 'story')).toBe(true)
    expect(links[6]).toMatchObject({ mode: 'pipeline', step: 'start' })
  })
})
