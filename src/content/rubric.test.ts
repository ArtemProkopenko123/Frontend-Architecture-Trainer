import { describe, expect, it } from 'vitest'
import { RUBRIC } from './rubric'

describe('RUBRIC', () => {
  it('has five stable ids', () => {
    expect(RUBRIC.map((item) => item.id)).toEqual(['context', 'options', 'cost', 'evolution', 'evidence'])
    for (const item of RUBRIC) {
      expect(item.label.ru.length).toBeGreaterThan(0)
      expect(item.label.en.length).toBeGreaterThan(0)
    }
  })
})
