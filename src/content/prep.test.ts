import { describe, expect, it } from 'vitest'
import { CHECKLIST, PREP_SECTIONS, STORY_PROMPTS, TRICK_QUESTIONS } from './prep'

describe('prep content', () => {
  it('has five prep sections', () => {
    expect(PREP_SECTIONS).toEqual(['story', 'traps', 'flags', 'ask', 'checklist'])
  })

  it('has a seven-step project story', () => {
    expect(STORY_PROMPTS).toHaveLength(7)
  })

  it('covers the trick questions from the document', () => {
    expect(TRICK_QUESTIONS.length).toBeGreaterThanOrEqual(6)
    expect(TRICK_QUESTIONS.every((item) => item.answer.ru && item.answer.en)).toBe(true)
  })

  it('has six checklist items with stable ids', () => {
    expect(CHECKLIST).toHaveLength(6)
    expect(new Set(CHECKLIST.map((item) => item.id)).size).toBe(6)
  })
})
