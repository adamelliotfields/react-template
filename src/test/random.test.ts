import { afterEach, describe, expect, test } from 'bun:test'

import random from '@/lib/random'

// cleanup
afterEach(() => {
  // pass `true` to reset the PRNGs
  random(true)
})

describe('random', () => {
  test('returns a random number', () => {
    const a = random()
    const b = random()
    expect(a).not.toEqual(b)
  })

  test('returns the same number if reset', () => {
    random(true)
    const a = random()
    random(true)
    const b = random()
    expect(a).toEqual(b)
  })
})
