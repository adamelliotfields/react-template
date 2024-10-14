import { describe, expect, test } from 'bun:test'

import product from '@/lib/product'

describe('product', () => {
  test('gets the Cartesian product of two arrays', () => {
    const a = [1, 2]
    const b = ['a', 'b']
    const p = product(a, b)
    expect(p).toEqual([
      [1, 'a'],
      [1, 'b'],
      [2, 'a'],
      [2, 'b']
    ])
  })

  test('handles empty arrays', () => {
    const a = [1, 2]
    const b: string[] = []
    const p = product(a, b)
    expect(p).toEqual([])
  })

  test('handles arrays of different lengths', () => {
    const a = [1, 2]
    const b = ['a', 'b', 'c']
    const p = product(a, b)
    expect(p).toEqual([
      [1, 'a'],
      [1, 'b'],
      [1, 'c'],
      [2, 'a'],
      [2, 'b'],
      [2, 'c']
    ])
  })
})
