import { beforeEach, describe, expect, mock, test } from 'bun:test'

import memoize from '@/lib/memoize'

let fn: ReturnType<typeof mock>

beforeEach(() => {
  fn = mock((a: number, b: number) => a + b)
})

describe('memoize', () => {
  test('caches function calls', () => {
    const cached = memoize(fn)
    expect(cached(1, 2)).toBe(3)
    expect(cached(1, 2)).toBe(3) // cached
    expect(fn).toHaveBeenCalledTimes(1)
  })

  test('evicts first entry', () => {
    const cached = memoize(fn, 2)
    expect(cached(1, 2)).toBe(3)
    expect(cached(3, 4)).toBe(7)
    expect(cached(4, 5)).toBe(9) // evicts (1, 2)
    expect(cached(1, 2)).toBe(3) // not cached
    expect(fn).toHaveBeenCalledTimes(4)
  })
})
