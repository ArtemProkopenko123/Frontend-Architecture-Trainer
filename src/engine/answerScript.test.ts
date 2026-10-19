import { describe, expect, it } from 'vitest'
import type { ArchitectureProfile, SessionContext } from '../content/types'
import { buildAnswerScript } from './answerScript'

const context: SessionContext = {
  teamSize: '4-10',
  teamsCount: '2-3',
  product: 'public_content',
  seo: 'critical',
  dataFreshness: 'infrequent',
  independentReleases: 'no',
}

const profile: ArchitectureProfile = {
  id: 'ssg_isr',
  title: { ru: 'SSG/ISR на Next.js', en: 'Next.js SSG/ISR' },
  summary: { ru: 'Статика с перегенерацией', en: 'Static with regeneration' },
  rendering: { ru: 'SSG и ISR', en: 'SSG and ISR' },
  structure: { ru: 'feature-based', en: 'feature-based' },
  repo: { ru: 'один репозиторий', en: 'single repo' },
  state: { ru: 'TanStack Query', en: 'TanStack Query' },
  why: { ru: 'SEO и редкие обновления', en: 'SEO and infrequent updates' },
  tradeoffs: [
    { ru: 'Цена — риск устаревшей страницы до ревалидации.', en: 'The trade-off is a stale page until revalidation.' },
  ],
  evolution: [
    {
      ru: 'Если данные станут персональными в реальном времени, перешёл бы на SSR.',
      en: 'If data becomes personal and realtime, I would move to SSR.',
    },
  ],
  diagram: { nodes: [], edges: [] },
}

describe('buildAnswerScript', () => {
  it('builds a Russian script that reasons from context', () => {
    const script = buildAnswerScript(context, profile, 'ru')
    expect(script).toMatch(/[А-Яа-яЁё]/)
    expect(script.toLowerCase()).toMatch(/контекст|если |потому что|команд/)
    expect(script).toContain(profile.title.ru)
  })

  it('builds an English script with trade-off language', () => {
    const script = buildAnswerScript(context, profile, 'en')
    expect(script).toMatch(/If |because|trade-off/i)
    expect(script).toContain(profile.title.en)
  })

  it('differs by locale and mentions team, product and SEO', () => {
    const ru = buildAnswerScript(context, profile, 'ru')
    const en = buildAnswerScript(context, profile, 'en')
    expect(ru).not.toBe(en)
    expect(ru.toLowerCase()).toMatch(/seo|поисков/)
    expect(en.toLowerCase()).toMatch(/seo/)
    expect(en.toLowerCase()).toMatch(/team|product|content/)
  })
})
