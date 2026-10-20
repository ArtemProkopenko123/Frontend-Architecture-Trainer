import type { AppMode, Locale } from '../content/types'
import { t, ui } from '../i18n/ui'

export type SeoInput = {
  locale: Locale
  mode: AppMode
  origin: string
  path: string
  search: string
}

export type SeoJsonLd = {
  '@context': 'https://schema.org'
  '@type': 'WebApplication'
  name: string
  description: string
  url: string
  inLanguage: Locale[]
  applicationCategory: 'EducationalApplication'
  operatingSystem: 'Web'
  offers: { '@type': 'Offer'; price: '0'; priceCurrency: 'USD' }
}

export type DocumentSeo = {
  title: string
  description: string
  canonical: string
  ogLocale: string
  robots: 'index, follow'
  jsonLd: SeoJsonLd
}

const OG_LOCALE: Record<Locale, string> = {
  ru: 'ru_RU',
  en: 'en_US',
  pl: 'pl_PL',
}

const DESCRIPTION: Record<Locale, string> = {
  ru: 'Тренажёр архитектуры фронтенда: контекст → варианты → выбор → цена → эволюция, RADIO, комнаты и 7-дневный курс. RU/EN; польский — бета с fallback на английский.',
  en: 'Senior frontend architecture trainer: context → options → choice → cost → evolution, RADIO, rooms, and 7-day guide. RU/EN; Polish beta with English fallback.',
  pl: 'Trener architektury frontendu: kontekst → warianty → wybór → koszt → ewolucja, RADIO, pokoje i 7-dniowy kurs. RU/EN; polski beta z fallbackiem na angielski.',
}

export function canonicalUrl(origin: string, path: string, search: string): string {
  const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search)
  for (const key of [...params.keys()]) {
    if (key.startsWith('c.')) params.delete(key)
  }
  const query = params.toString()
  const base = `${origin.replace(/\/$/, '')}${path || '/'}`
  return query ? `${base}?${query}` : base
}

export function buildDocumentSeo(input: SeoInput): DocumentSeo {
  const title = `${t(ui.appTitle, input.locale)} · ${t(ui.modes[input.mode], input.locale)}`
  const description = DESCRIPTION[input.locale]
  const canonical = canonicalUrl(input.origin, input.path, input.search)
  return {
    title,
    description,
    canonical,
    ogLocale: OG_LOCALE[input.locale],
    robots: 'index, follow',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: t(ui.appTitle, input.locale),
      description,
      url: canonical,
      inLanguage: ['ru', 'en', 'pl'],
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
  }
}

function setMeta(attr: 'name' | 'property', key: string, value: string) {
  let node = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!node) {
    node = document.createElement('meta')
    node.setAttribute(attr, key)
    document.head.appendChild(node)
  }
  node.setAttribute('content', value)
}

function setLink(rel: string, href: string) {
  let node = document.head.querySelector(`link[rel="${rel}"]`)
  if (!node) {
    node = document.createElement('link')
    node.setAttribute('rel', rel)
    document.head.appendChild(node)
  }
  node.setAttribute('href', href)
}

export function applyDocumentSeo(input: SeoInput) {
  const seo = buildDocumentSeo(input)
  document.title = seo.title
  document.documentElement.lang = input.locale
  setMeta('name', 'description', seo.description)
  setMeta('name', 'robots', seo.robots)
  setMeta('property', 'og:title', seo.title)
  setMeta('property', 'og:description', seo.description)
  setMeta('property', 'og:url', seo.canonical)
  setMeta('property', 'og:locale', seo.ogLocale)
  setMeta('name', 'twitter:title', seo.title)
  setMeta('name', 'twitter:description', seo.description)
  setLink('canonical', seo.canonical)
  let script = document.getElementById('seo-jsonld')
  if (!script) {
    script = document.createElement('script')
    script.id = 'seo-jsonld'
    script.setAttribute('type', 'application/ld+json')
    document.head.appendChild(script)
  }
  script.textContent = JSON.stringify(seo.jsonLd)
  return seo
}
