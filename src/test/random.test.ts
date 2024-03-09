import { afterEach, describe, expect, test } from 'bun:test'

import random from '../lib/random'

// 42
const { VITE_SEED } = import.meta.env

// cleanup
afterEach(() => {
  // pass `true` to reset the PRNGs
  random(null, true)
})

describe('random', () => {
  test('returns a random number', () => {
    const a = random()
    const b = random()
    expect(a).not.toEqual(b)
  })

  test('returns the same number if reset', () => {
    random(null, true)
    const a = random()
    random(null, true)
    const b = random()
    expect(a).toEqual(b)

    random(null, true)
    const c = random('xorshift')
    random(null, true)
    const d = random('xorshift')
    expect(c).toEqual(d)
  })

  test('returns 0 if PRNG is `null`', () => {
    const a = random(null)
    expect(a).toEqual(0)
  })

  test.if(VITE_SEED)('lcg results are deterministic if seeded', () => {
    const a = Math.floor(random() * 100)
    expect(a).toEqual(4)

    const b = Math.floor(random() * 100)
    expect(b).toEqual(69)
  })

  test.if(VITE_SEED)('xorshift results are deterministic if seeded', () => {
    const a = Math.floor(random('xorshift') * 1000)
    expect(a).toEqual(5)

    const b = Math.floor(random('xorshift') * 1000)
    expect(b).toEqual(-680)
  })
})
