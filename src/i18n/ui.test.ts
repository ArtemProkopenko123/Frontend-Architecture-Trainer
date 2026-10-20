import { describe, expect, it } from 'vitest'
import type { Locale } from '../content/types'
import { t, ui } from './ui'

describe('Polish beta label', () => {
  it('starts its accessible name with the visible PL text in every locale', () => {
    for (const locale of ['ru', 'en', 'pl'] satisfies Locale[]) {
      expect(t(ui.langPlBeta, locale)).toMatch(/^PL\b/)
    }
  })
})
