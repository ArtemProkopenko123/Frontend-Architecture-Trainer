import { describe, expect, it } from 'vitest'
import { GUIDE_DAYS, hrefForGuideLink } from './guide'

describe('guide', () => {
  it('has seven consecutive days with bilingual copy and a deep link', () => {
    expect(GUIDE_DAYS.map((d) => d.day)).toEqual([1, 2, 3, 4, 5, 6, 7])
    for (const day of GUIDE_DAYS) {
      expect(day.title.ru.length).toBeGreaterThan(0)
      expect(day.title.en.length).toBeGreaterThan(0)
      expect(day.title.pl.length).toBeGreaterThan(0)
      expect(day.doneWhen.ru.length).toBeGreaterThan(0)
      expect(hrefForGuideLink(day.link)).toMatch(/^\?mode=/)
    }
  })

  it('points day 1 at pipeline start and day 3 at a topic room', () => {
    expect(hrefForGuideLink(GUIDE_DAYS[0].link)).toBe('?mode=pipeline&step=start')
    expect(GUIDE_DAYS[2].link.mode).toBe('topics')
    expect(GUIDE_DAYS[2].link.topicId).toBeDefined()
  })
})
