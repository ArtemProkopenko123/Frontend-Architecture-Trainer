import { describe, expect, it } from 'vitest'
import { TOPIC_ORDER, TOPICS, getTopic } from './topics'
import type { TopicId } from './types'

const TOPIC_IDS: TopicId[] = [
  'structure',
  'state',
  'rendering',
  'api',
  'scale',
  'perf',
  'reliability',
  'security',
  'leadership',
]

describe('TOPICS', () => {
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
})
