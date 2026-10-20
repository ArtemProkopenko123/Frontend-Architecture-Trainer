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

const productPl: Record<SessionContext['product'], string> = {
  admin: 'panel admina za logowaniem',
  public_content: 'treść publiczna',
  marketplace: 'marketplace',
  b2b_app: 'aplikacja B2B za logowaniem',
}

const seoRu: Record<SessionContext['seo'], string> = {
  none: 'SEO не критичен',
  critical: 'SEO критичен',
}

const seoEn: Record<SessionContext['seo'], string> = {
  none: 'SEO does not matter',
  critical: 'SEO is critical',
}

const seoPl: Record<SessionContext['seo'], string> = {
  none: 'SEO nie jest krytyczne',
  critical: 'SEO jest krytyczne',
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

const freshnessPl: Record<SessionContext['dataFreshness'], string> = {
  static: 'prawie statyczne',
  infrequent: 'dane zmieniają się rzadko, ISR jest akceptowalny',
  realtime: 'świeże albo spersonalizowane dane',
}

const releasesRu: Record<SessionContext['independentReleases'], string> = {
  no: 'общий релизный цикл',
  yes: 'команды блокируют друг друга на релизах',
}

const releasesEn: Record<SessionContext['independentReleases'], string> = {
  no: 'a shared release cycle',
  yes: 'teams block each other on releases',
}

const releasesPl: Record<SessionContext['independentReleases'], string> = {
  no: 'wspólny cykl wydań',
  yes: 'zespoły blokują się na releasach',
}

function extrasRu(context: SessionContext): string {
  const bits = [
    context.liveUpdates === 'needed' ? 'нужны live-обновления' : null,
    context.offline === 'needed' ? 'нужен офлайн' : null,
    context.network === 'mobile_slow' ? 'целевая сеть — медленный мобильный' : null,
    context.a11y === 'strict' ? 'жёсткая доступность' : null,
    context.i18n === 'multi' ? 'несколько локалей' : null,
    context.deadline === 'speed' ? 'давление по срокам' : context.deadline === 'longevity' ? 'система на годы' : null,
  ].filter((item): item is string => Boolean(item))
  return bits.length ? ` Дополнительно: ${bits.join(', ')}.` : ''
}

function extrasEn(context: SessionContext): string {
  const bits = [
    context.liveUpdates === 'needed' ? 'live updates' : null,
    context.offline === 'needed' ? 'offline support' : null,
    context.network === 'mobile_slow' ? 'slow mobile network' : null,
    context.a11y === 'strict' ? 'strict accessibility' : null,
    context.i18n === 'multi' ? 'multiple locales' : null,
    context.deadline === 'speed' ? 'deadline pressure' : context.deadline === 'longevity' ? 'multi-year lifetime' : null,
  ].filter((item): item is string => Boolean(item))
  return bits.length ? ` Also: ${bits.join(', ')}.` : ''
}

function extrasPl(context: SessionContext): string {
  const bits = [
    context.liveUpdates === 'needed' ? 'potrzebne aktualizacje live' : null,
    context.offline === 'needed' ? 'potrzebny tryb offline' : null,
    context.network === 'mobile_slow' ? 'docelowa sieć to wolny mobile' : null,
    context.a11y === 'strict' ? 'ostra dostępność' : null,
    context.i18n === 'multi' ? 'kilka locale' : null,
    context.deadline === 'speed' ? 'presja terminu' : context.deadline === 'longevity' ? 'system na lata' : null,
  ].filter((item): item is string => Boolean(item))
  return bits.length ? ` Dodatkowo: ${bits.join(', ')}.` : ''
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
      `Размер команды ${context.teamSize}, команд ${context.teamsCount}, продукт — ${productRu[context.product]}, ${seoRu[context.seo]}, свежесть: ${freshnessRu[context.dataFreshness]}, ${releasesRu[context.independentReleases]}.${extrasRu(context)}`,
      `Рассматриваю 2–3 варианта: CSR SPA, SSG/ISR и SSR; микрофронтенды — только если независимые релизы реально нужны.`,
      `Если такой контекст, я бы выбрал ${profile.title.ru}, потому что ${profile.why.ru}`,
      `Цена этого — ${tradeoff}`,
      `Эволюция: ${evolution}`,
    ].join(' ')
  }

  if (locale === 'pl') {
    return [
      `Zależy od kontekstu — doprecyzuję parę rzeczy.`,
      `Rozmiar zespołu ${context.teamSize}, zespołów ${context.teamsCount}, produkt — ${productPl[context.product]}, ${seoPl[context.seo]}, świeżość: ${freshnessPl[context.dataFreshness]}, ${releasesPl[context.independentReleases]}.${extrasPl(context)}`,
      `Rozważam 2–3 warianty: CSR SPA, SSG/ISR i SSR; mikrofrontendy tylko gdy niezależne releasy naprawdę są potrzebne.`,
      `Przy takim kontekście wybrałbym ${profile.title.pl}, bo ${profile.why.pl}`,
      `Koszt tego — ${tradeoff}`,
      `Ewolucja: ${evolution}`,
    ].join(' ')
  }

  return [
    `It depends on the context, so let me clarify a couple of things first.`,
    `Team size ${context.teamSize}, ${context.teamsCount} teams, product is ${productEn[context.product]}, ${seoEn[context.seo]}, freshness: ${freshnessEn[context.dataFreshness]}, ${releasesEn[context.independentReleases]}.${extrasEn(context)}`,
    `I would name 2–3 options: a CSR SPA, SSG/ISR and SSR; micro-frontends only if independent releases are proven.`,
    `If this context holds, I'd go with ${profile.title.en} because ${profile.why.en}`,
    `The trade-off is ${tradeoff}`,
    `Evolution: ${evolution}`,
  ].join(' ')
}
