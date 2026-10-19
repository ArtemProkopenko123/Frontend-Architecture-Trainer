import type { ArchitectureProfile, Locale, SessionContext } from '../content/types'

const productRu: Record<SessionContext['product'], string> = {
  admin: 'админка за логином',
  public_content: 'публичный контент',
  marketplace: 'маркетплейс',
  b2b_app: 'B2B-приложение за логином',
}

const productEn: Record<SessionContext['product'], string> = {
  admin: 'a logged-in admin dashboard',
  public_content: 'public content',
  marketplace: 'a marketplace',
  b2b_app: 'a logged-in B2B app',
}

const seoRu: Record<SessionContext['seo'], string> = {
  none: 'SEO не критичен',
  critical: 'SEO критичен',
}

const seoEn: Record<SessionContext['seo'], string> = {
  none: 'SEO does not matter',
  critical: 'SEO is critical',
}

const freshnessRu: Record<SessionContext['dataFreshness'], string> = {
  static: 'почти статика',
  infrequent: 'данные меняются нечасто, ISR приемлем',
  realtime: 'свежие или персональные данные',
}

const freshnessEn: Record<SessionContext['dataFreshness'], string> = {
  static: 'almost static',
  infrequent: 'infrequent updates, ISR is acceptable',
  realtime: 'fresh or personalised data',
}

const releasesRu: Record<SessionContext['independentReleases'], string> = {
  no: 'общий релизный цикл',
  yes: 'команды блокируют друг друга на релизах',
}

const releasesEn: Record<SessionContext['independentReleases'], string> = {
  no: 'a shared release cycle',
  yes: 'teams block each other on releases',
}

export function buildAnswerScript(
  context: SessionContext,
  profile: ArchitectureProfile,
  locale: Locale,
): string {
  const tradeoff = profile.tradeoffs[0]?.[locale] ?? ''
  const evolution = profile.evolution[0]?.[locale] ?? ''

  if (locale === 'ru') {
    return [
      `Зависит от контекста — давайте уточню пару вещей.`,
      `Размер команды ${context.teamSize}, команд ${context.teamsCount}, продукт — ${productRu[context.product]}, ${seoRu[context.seo]}, свежесть: ${freshnessRu[context.dataFreshness]}, ${releasesRu[context.independentReleases]}.`,
      `Рассматриваю 2–3 варианта: CSR SPA, SSG/ISR и SSR; микрофронтенды — только если независимые релизы реально нужны.`,
      `Если такой контекст, я бы выбрал ${profile.title.ru}, потому что ${profile.why.ru}`,
      `Цена этого — ${tradeoff}`,
      `Эволюция: ${evolution}`,
    ].join(' ')
  }

  return [
    `It depends on the context, so let me clarify a couple of things first.`,
    `Team size ${context.teamSize}, ${context.teamsCount} teams, product is ${productEn[context.product]}, ${seoEn[context.seo]}, freshness: ${freshnessEn[context.dataFreshness]}, ${releasesEn[context.independentReleases]}.`,
    `I would name 2–3 options: a CSR SPA, SSG/ISR and SSR; micro-frontends only if independent releases are proven.`,
    `If this context holds, I'd go with ${profile.title.en} because ${profile.why.en}`,
    `The trade-off is ${tradeoff}`,
    `Evolution: ${evolution}`,
  ].join(' ')
}
