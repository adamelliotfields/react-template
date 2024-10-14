import { describe, expect, test } from 'bun:test'

import range from '@/lib/range'

describe('range', () => {
  test('creates an array of numbers within a given range', () => {
    expect(range(0, 5)).toEqual([0, 1, 2, 3, 4, 5])
    expect(range(0, 10, 2)).toEqual([0, 2, 4, 6, 8, 10])
    expect(range(0, 10, 2, false)).toEqual([0, 2, 4, 6, 8])
    expect(range(0, -5, -1)).toEqual([0, -1, -2, -3, -4, -5])
  })
})
