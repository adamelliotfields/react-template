import { beforeEach, describe, expect, mock, test } from 'bun:test'

import lruCache from '@/lib/lru-cache'

let fn: ReturnType<typeof mock>

beforeEach(() => {
  fn = mock((a: number, b: number) => a + b)
})

describe('lruCache', () => {
  test('caches function calls', () => {
    const cached = lruCache(fn)
    expect(cached(1, 2)).toBe(3)
    expect(cached(1, 2)).toBe(3) // cached
    expect(fn).toHaveBeenCalledTimes(1)
  })

  test('evicts least recently used entries', () => {
    const cached = lruCache(fn, 2)
    expect(cached(1, 2)).toBe(3)
    expect(cached(3, 4)).toBe(7)
    expect(cached(4, 5)).toBe(9) // evicts (1, 2)
    expect(cached(1, 2)).toBe(3) // not cached
    expect(fn).toHaveBeenCalledTimes(4)
  })
})
