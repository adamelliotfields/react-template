import { describe, expect, mock, test } from 'bun:test'

import random, { randomFromSeed } from '@/lib/random'

describe('random', () => {
  test('returns a number between 0 and 1', () => {
    const a = random()
    expect(a).toBeGreaterThanOrEqual(0)
    expect(a).toBeLessThan(1)
  })

  test('returns a number between `min` and `max`', () => {
    const a = random(1, 2)
    expect(a).toBeGreaterThanOrEqual(1)
    expect(a).toBeLessThan(2)
  })

  test('calls random_fn', () => {
    const random_fn = mock(Math.random)
    random(0, 1, random_fn)
    expect(random_fn).toHaveBeenCalledTimes(1)
  })
})

describe('randomFromSeed', () => {
  test('returns the same sequence of numbers', () => {
    const seed = 42
    const fn_1 = randomFromSeed(seed)
    const fn_2 = randomFromSeed(seed)
    const a_1 = fn_1()
    const b_1 = fn_1()
    const a_2 = fn_2()
    const b_2 = fn_2()
    expect([a_1, b_1]).toEqual([a_2, b_2])
  })

  test('returned function respects `min` and `max`', () => {
    const seed = 42
    const fn = randomFromSeed(seed)
    const a = fn(1, 2)
    expect(a).toBeGreaterThanOrEqual(1)
    expect(a).toBeLessThan(2)
  })
})
