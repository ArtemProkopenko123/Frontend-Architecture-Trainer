import type { Localized, ProfileId, RecommendResult, SessionContext } from '../content/types'

function pickRecommended(context: SessionContext): ProfileId {
  if (context.seo === 'critical') {
    if (context.liveUpdates === 'needed' || context.dataFreshness === 'realtime') return 'ssr_app'
    return 'ssg_isr'
  }
  if (context.network === 'mobile_slow' && context.product === 'public_content') return 'ssg_isr'
  return 'csr_spa'
}

function contrastOf(id: ProfileId): ProfileId {
  return id === 'csr_spa' ? 'ssr_app' : 'csr_spa'
}

function shouldOfferMfe(context: SessionContext): boolean {
  return (
    context.teamsCount === '4+' &&
    context.independentReleases === 'yes' &&
    context.teamSize !== '1-3' &&
    context.deadline !== 'speed'
  )
}

function notesFor(context: SessionContext, recommendedId: ProfileId): Localized[] {
  const notes: Localized[] = []
  if (context.teamsCount !== '1' || context.deadline === 'longevity') {
    notes.push({
      ru: 'Несколько команд или долгий срок жизни: слои и направление импортов проверяю линтером, иначе правило разъедется за полгода.',
      en: 'Several teams or a long lifetime: I enforce layers and import direction with a linter, or the rule erodes within six months.',
      pl: 'Kilka zespołów albo długie życie systemu: warstwy i kierunek importów egzekwuję linterem, inaczej reguła rozjedzie się w pół roku.',
    })
  }
  if (context.deadline === 'speed' && context.teamSize === '1-3') {
    notes.push({
      ru: 'Маленькая команда и скорость: feature-based и минимум абстракций. FSD и микрофронтенды сейчас церемония.',
      en: 'Small team and speed: feature-based with minimal abstraction. FSD and micro-frontends are ceremony now.',
      pl: 'Mały zespół i szybkość: feature-based i minimum abstrakcji. FSD i mikrofrontendy to teraz ceremonia.',
    })
  }
  if (context.liveUpdates === 'needed') {
    notes.push({
      ru: 'Живые события — SSE или WebSocket в кэш Query (`setQueryData` / инвалидация), не второй глобальный стор. В ленте — плашка «N новых», иначе скачет скролл.',
      en: 'Live events go into the Query cache (`setQueryData` / invalidation), not a second global store. In a feed, an “N new posts” banner — instant insert jumps the scroll.',
      pl: 'Zdarzenia live idą do cache Query (`setQueryData` / invalidacja), nie do drugiego globalnego stora. W feedzie pasek „N nowych”, inaczej skacze scroll.',
    })
  }
  if (context.offline === 'needed') {
    notes.push({
      ru: 'Офлайн: очередь в IndexedDB, идемпотентность мутаций, повтор после реконнекта. Оптимистичный UI с откатом.',
      en: 'Offline: an IndexedDB queue, idempotent mutations, retry after reconnect. Optimistic UI with rollback.',
      pl: 'Offline: kolejka w IndexedDB, idempotentne mutacje, ponowienie po reconnect. Optymistyczny UI z rollbackiem.',
    })
  }
  if (context.network === 'mobile_slow') {
    notes.push({
      ru: 'Медленная сеть: критичен TTFB и вес JS. Streaming/SSR или статика, preload героя, меньше гидрации.',
      en: 'Slow network: TTFB and JS weight are critical. Streaming/SSR or static, preload the hero, less hydration.',
      pl: 'Wolna sieć: krytyczne są TTFB i waga JS. Streaming/SSR albo statyka, preload hero, mniej hydracji.',
    })
  }
  if (context.a11y === 'strict') {
    notes.push({
      ru: 'Жёсткая a11y закладывается в UI-кит (headless + семантика), а не полируется в конце. Клавиатура и фокус — часть API компонентов.',
      en: 'Strict a11y is baked into the UI kit (headless + semantics), not polished at the end. Keyboard and focus are part of the component API.',
      pl: 'Ostra a11y wchodzi do UI kitu (headless + semantyka), nie na końcu. Klawiatura i fokus są częścią API komponentów.',
    })
  }
  if (context.i18n === 'multi') {
    notes.push({
      ru: 'Мультиязычность: локаль в URL, словари не блокируют первый HTML, форматы дат/чисел через Intl, длина строк заложена в вёрстку.',
      en: 'i18n: locale in the URL, dictionaries do not block first HTML, dates/numbers via Intl, layout accounts for string length.',
      pl: 'i18n: locale w URL, słowniki nie blokują pierwszego HTML, daty/liczby przez Intl, długość stringów w layoucie.',
    })
  }
  if (recommendedId === 'ssg_isr' && context.liveUpdates === 'needed') {
    notes.push({
      ru: 'ISR даёт статический шелл, живые куски — острова или клиентский кэш, не перегенерация всей страницы на каждое событие.',
      en: 'ISR can keep a static shell; live bits are islands or a client cache, not regenerating the whole page per event.',
      pl: 'ISR zostawia statyczny szkielet; żywe kawałki to wyspy albo cache klienta, nie regeneracja całej strony na każde zdarzenie.',
    })
  }
  return notes
}

export function recommend(context: SessionContext): RecommendResult {
  const recommendedId = pickRecommended(context)
  const optionIds: ProfileId[] = [recommendedId]
  const contrast = contrastOf(recommendedId)
  if (!optionIds.includes(contrast)) optionIds.push(contrast)
  if (shouldOfferMfe(context) && !optionIds.includes('mfe')) optionIds.push('mfe')
  return { recommendedId, optionIds, notes: notesFor(context, recommendedId) }
}
