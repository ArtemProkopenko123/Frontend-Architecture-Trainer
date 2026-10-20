import { GUIDE_DAYS } from '../content/guide'
import { TRICK_QUESTIONS } from '../content/prep'
import { RADIO_CASES } from '../content/radio'
import { TOPIC_ORDER, TOPICS } from '../content/topics'
import type { Locale, Localized } from '../content/types'

export type SearchHitKind = 'topic' | 'card' | 'radio' | 'trick' | 'guide'

export type SearchHit = {
  id: string
  kind: SearchHitKind
  title: Localized
  haystack: Localized
  href: string
}

function join(parts: Localized[]): Localized {
  return {
    ru: parts.map((part) => part.ru).join(' '),
    en: parts.map((part) => part.en).join(' '),
    pl: parts.map((part) => part.pl).join(' '),
  }
}

export function buildSearchIndex(): SearchHit[] {
  const hits: SearchHit[] = []
  for (const day of GUIDE_DAYS) {
    hits.push({
      id: `guide-${day.id}`,
      kind: 'guide',
      title: day.title,
      haystack: join([day.title, day.doneWhen]),
      href: '?mode=guide',
    })
  }
  for (const id of TOPIC_ORDER) {
    const topic = TOPICS[id]
    hits.push({
      id: `topic-${id}`,
      kind: 'topic',
      title: topic.title,
      haystack: join([topic.title, topic.thesis, topic.checks, topic.sample, ...topic.structure]),
      href: `?mode=topics&topic=${id}`,
    })
    for (const card of topic.cards) {
      hits.push({
        id: `card-${id}-${card.id}`,
        kind: 'card',
        title: card.title,
        haystack: join([card.title, card.checks, card.sample, ...card.structure]),
        href: `?mode=topics&topic=${id}#${card.id}`,
      })
    }
  }
  for (const radioCase of Object.values(RADIO_CASES)) {
    hits.push({
      id: `radio-${radioCase.id}`,
      kind: 'radio',
      title: radioCase.title,
      haystack: join([radioCase.title, radioCase.summary, ...radioCase.requirements]),
      href: `?mode=radio&case=${radioCase.id}`,
    })
  }
  for (const trick of TRICK_QUESTIONS) {
    hits.push({
      id: `trick-${trick.id}`,
      kind: 'trick',
      title: trick.question,
      haystack: join([trick.question, trick.answer]),
      href: `?mode=prep&prep=traps&trick=${trick.id}`,
    })
  }
  return hits
}

export function filterSearchHits(hits: SearchHit[], query: string, _locale: Locale): SearchHit[] {
  const needle = query.trim().toLowerCase()
  if (needle.length < 2) return []
  return hits.filter((hit) => {
    const blob = `${hit.title.ru} ${hit.title.en} ${hit.title.pl} ${hit.haystack.ru} ${hit.haystack.en} ${hit.haystack.pl}`.toLowerCase()
    return blob.includes(needle)
  })
}
