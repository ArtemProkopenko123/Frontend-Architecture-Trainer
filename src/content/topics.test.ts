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
