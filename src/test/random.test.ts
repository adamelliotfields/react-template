import { describe, expect, it } from 'bun:test'

import random from '@/lib/random'

describe('random', () => {
  it('returns the same number using the default seed', () => {
    const result = Math.floor(random(1, 100))
    expect(result).toEqual(5)
  })

  it('returns a different number on each call', () => {
    const a = random()
    const b = random()
    expect(a).not.toEqual(b)
  })
})
