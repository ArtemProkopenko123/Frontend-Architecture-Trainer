import { describe, expect, it } from 'vitest'
import { buildDocumentSeo } from './seo'

describe('buildDocumentSeo', () => {
  it('builds a Polish guide title, description and Open Graph locale', () => {
    const seo = buildDocumentSeo({
      locale: 'pl',
      mode: 'guide',
      origin: 'https://trainer.example',
      path: '/',
      search: '?mode=guide',
    })
    expect(seo.title).toMatch(/Trener architektury frontendu/)
    expect(seo.title).toMatch(/Kurs/)
    expect(seo.description).toMatch(/[ąćęłńóśźż]/i)
    expect(seo.description.length).toBeGreaterThan(40)
    expect(seo.description.length).toBeLessThanOrEqual(160)
    expect(seo.ogLocale).toBe('pl_PL')
    expect(seo.canonical).toBe('https://trainer.example/?mode=guide')
    expect(seo.robots).toBe('index, follow')
  })

  it('keeps English pipeline copy and JSON-LD for a free educational web app', () => {
    const seo = buildDocumentSeo({
      locale: 'en',
      mode: 'pipeline',
      origin: 'https://trainer.example',
      path: '/',
      search: '?mode=pipeline&step=start',
    })
    expect(seo.title.toLowerCase()).toMatch(/frontend architecture trainer/)
    expect(seo.title).toMatch(/Pipeline/)
    expect(seo.description.toLowerCase()).toMatch(/radio|guide|context/)
    expect(seo.jsonLd['@type']).toBe('WebApplication')
    expect(seo.jsonLd.applicationCategory).toBe('EducationalApplication')
    expect(seo.jsonLd.inLanguage).toEqual(['ru', 'en', 'pl'])
    expect(seo.jsonLd.url).toBe('https://trainer.example/?mode=pipeline&step=start')
    expect(seo.jsonLd.offers).toMatchObject({ price: '0' })
  })

  it('drops constructor session params from the canonical URL', () => {
    const seo = buildDocumentSeo({
      locale: 'ru',
      mode: 'pipeline',
      origin: 'https://trainer.example',
      path: '/',
      search: '?mode=pipeline&step=context&c.seo=critical&c.profile=ssg_isr',
    })
    expect(seo.canonical).toBe('https://trainer.example/?mode=pipeline&step=context')
    expect(seo.canonical).not.toMatch(/c\./)
  })
})
