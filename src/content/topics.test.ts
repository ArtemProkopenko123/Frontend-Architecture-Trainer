import { describe, expect, it } from 'vitest'
import { TOPIC_ORDER, TOPICS, getTopic } from './topics'
import type { Localized, TopicId } from './types'

const TOPIC_IDS: TopicId[] = [
  'architecture',
  'structure',
  'state',
  'rendering',
  'api',
  'scale',
  'perf',
  'reliability',
  'security',
  'a11y',
  'offline',
  'i18n',
  'leadership',
]

type NewTopicId = Extract<TopicId, 'architecture' | 'a11y' | 'offline' | 'i18n'>

const NEW_TOPIC_IDS: NewTopicId[] = ['architecture', 'a11y', 'offline', 'i18n']

const NEW_TOPIC_KEYWORDS: Record<NewTopicId, string[]> = {
  architecture: ['expensive to change', 'boundaries', 'Conway', 'testab', 'senior'],
  a11y: ['WCAG', 'semantic', 'focus', 'live region', 'design system', 'axe', 'Playwright', 'trade-off', 'revisit'],
  offline: ['service worker', 'IndexedDB', 'outbox', 'optimistic', 'idempot', 'conflict', 'reconnect', 'stale-while-revalidate'],
  i18n: ['locale in the URL', 'Intl', 'ICU', 'plural', 'RTL', 'SSR', 'lazy', 'library'],
}

type LocalizedLeaf = { path: string; value: Localized }

function isLocalized(value: unknown): value is Localized {
  if (typeof value !== 'object' || value === null) return false
  const v = value as Record<string, unknown>
  return typeof v.ru === 'string' && typeof v.en === 'string' && typeof v.pl === 'string'
}

function collectLocalized(value: unknown, path: string, out: LocalizedLeaf[] = []): LocalizedLeaf[] {
  if (isLocalized(value)) {
    out.push({ path, value })
  } else if (Array.isArray(value)) {
    value.forEach((item, index) => collectLocalized(item, `${path}[${index}]`, out))
  } else if (typeof value === 'object' && value !== null) {
    for (const [key, child] of Object.entries(value)) collectLocalized(child, `${path}.${key}`, out)
  }
  return out
}

// Diagram node labels are often product names (e.g. "axe + Playwright") that legitimately match across languages.
const MAY_MATCH_EN = /\.diagram\.nodes\[\d+\]\.label$/

describe('TOPICS', () => {
  it('does not recommend Recoil in the state guidance', () => {
    const guidance = collectLocalized(TOPICS.state, 'state')
      .flatMap(({ value }) => Object.values(value))
      .join(' ')

    expect(guidance).not.toContain('Recoil')
    expect(guidance).toContain('Jotai')
  })

  it('every topic has checks, structure, sample and at least one related card', () => {
    for (const id of TOPIC_IDS) {
      const topic = TOPICS[id]
      expect(topic.checks.ru.length).toBeGreaterThan(20)
      expect(topic.structure.length).toBeGreaterThan(2)
      expect(topic.sample.ru.length).toBeGreaterThan(40)
      expect(topic.sample.en.length).toBeGreaterThan(40)
      expect(topic.cards.length).toBeGreaterThan(0)
      for (const card of topic.cards) {
        expect(card.sample.ru.length).toBeGreaterThan(20)
        expect(card.sample.en.length).toBeGreaterThan(20)
      }
    }
  })

  it('has every TopicId key', () => {
    expect(Object.keys(TOPICS).sort()).toEqual([...TOPIC_IDS].sort())
    expect([...TOPIC_ORDER].sort()).toEqual([...TOPIC_IDS].sort())
    for (const id of TOPIC_IDS) {
      expect(TOPIC_ORDER).toContain(id)
      expect(getTopic(id)).toBe(TOPICS[id])
      expect(getTopic(id).id).toBe(id)
    }
  })

  it('orders architecture first and a11y, offline, i18n between security and leadership', () => {
    expect(TOPIC_ORDER).toEqual(TOPIC_IDS)
  })
})

describe('new core topics', () => {
  it('follow the full Topic shape with rows, follow-ups, cards and a valid diagram', () => {
    for (const id of NEW_TOPIC_IDS) {
      const topic = TOPICS[id]
      expect(topic.rows.length, `${id} rows`).toBeGreaterThanOrEqual(3)
      expect(topic.followUps.length, `${id} followUps`).toBeGreaterThanOrEqual(3)
      expect(topic.cards.length, `${id} cards`).toBeGreaterThanOrEqual(3)
      expect(new Set(topic.cards.map((card) => card.id)).size, `${id} unique card ids`).toBe(topic.cards.length)
      for (const card of topic.cards) expect(card.structure.length, `${id}/${card.id} structure`).toBeGreaterThan(1)

      const diagram = topic.diagram
      expect(diagram, `${id} diagram`).toBeDefined()
      const nodeIds = new Set(diagram!.nodes.map((node) => node.id))
      expect(diagram!.nodes.length, `${id} nodes`).toBeGreaterThanOrEqual(3)
      expect(nodeIds.size, `${id} unique node ids`).toBe(diagram!.nodes.length)
      expect(diagram!.edges.length, `${id} edges`).toBeGreaterThanOrEqual(2)
      for (const e of diagram!.edges) {
        expect(nodeIds.has(e.source), `${id} edge source ${e.source}`).toBe(true)
        expect(nodeIds.has(e.target), `${id} edge target ${e.target}`).toBe(true)
      }
    }
  })

  it('localizes every string into RU, EN and PL without falling back pl to en', () => {
    for (const id of NEW_TOPIC_IDS) {
      const leaves = collectLocalized(TOPICS[id], id)
      expect(leaves.length, `${id} localized strings`).toBeGreaterThan(30)
      for (const { path, value } of leaves) {
        expect(value.ru.trim().length, `${path} ru`).toBeGreaterThan(0)
        expect(value.en.trim().length, `${path} en`).toBeGreaterThan(0)
        expect(value.pl.trim().length, `${path} pl`).toBeGreaterThan(0)
        if (!MAY_MATCH_EN.test(path)) {
          expect(value.pl, `${path} pl must not equal en`).not.toBe(value.en)
          expect(value.pl, `${path} pl must not equal ru`).not.toBe(value.ru)
        }
      }
    }
  })

  it('has substantive RU, EN and PL text in key topic and card fields', () => {
    for (const id of NEW_TOPIC_IDS) {
      const topic = TOPICS[id]
      for (const locale of ['ru', 'en', 'pl'] as const) {
        expect(topic.thesis[locale].length, `${id} thesis ${locale}`).toBeGreaterThan(60)
        expect(topic.checks[locale].length, `${id} checks ${locale}`).toBeGreaterThan(30)
        expect(topic.sample[locale].length, `${id} sample ${locale}`).toBeGreaterThan(120)
        for (const card of topic.cards) {
          expect(card.checks[locale].length, `${id}/${card.id} checks ${locale}`).toBeGreaterThan(15)
          expect(card.sample[locale].length, `${id}/${card.id} sample ${locale}`).toBeGreaterThan(60)
        }
      }
    }
  })

  it('covers the required concepts of each room', () => {
    for (const id of NEW_TOPIC_IDS) {
      const text = JSON.stringify(TOPICS[id]).toLowerCase()
      for (const keyword of NEW_TOPIC_KEYWORDS[id]) {
        expect(text, `${id} mentions "${keyword}"`).toContain(keyword.toLowerCase())
      }
    }
  })
})
