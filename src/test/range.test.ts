import { describe, expect, test } from 'bun:test'

import range from '@/lib/range'

describe('range', () => {
  test('creates an array of numbers within a given range', () => {
    expect(range(0, 4)).toEqual([0, 1, 2, 3, 4])
    expect(range(5, 9)).toEqual([5, 6, 7, 8, 9])
  })
})
