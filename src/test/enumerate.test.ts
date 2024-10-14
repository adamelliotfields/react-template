import { describe, expect, test } from 'bun:test'

import enumerate, { enumerateLazy } from '@/lib/enumerate'

describe('enumerate', () => {
  test('enumerates an array', () => {
    const array = ['a', 'b', 'c']
    const result = enumerate(array)
    expect(result).toEqual([
      [0, 'a'],
      [1, 'b'],
      [2, 'c']
    ])
  })

  test('enumerates an iterable', () => {
    const iterable = new Set(['a', 'b', 'c'])
    const result = enumerate(iterable)
    expect(result).toEqual([
      [0, 'a'],
      [1, 'b'],
      [2, 'c']
    ])
  })
})

describe('enumerateLazy', () => {
  test('enumerates an array lazily', () => {
    const array = ['a', 'b', 'c']
    const result = enumerateLazy(array)
    expect(result.next()).toEqual({ value: [0, 'a'], done: false })
    expect(result.next()).toEqual({ value: [1, 'b'], done: false })
    expect(result.next()).toEqual({ value: [2, 'c'], done: false })
    expect(result.next()).toEqual({ value: undefined, done: true })
  })

  test('enumerates an iterable lazily', () => {
    const iterable = new Set(['a', 'b', 'c'])
    const result = enumerateLazy(iterable)
    expect(result.next()).toEqual({ value: [0, 'a'], done: false })
    expect(result.next()).toEqual({ value: [1, 'b'], done: false })
    expect(result.next()).toEqual({ value: [2, 'c'], done: false })
    expect(result.next()).toEqual({ value: undefined, done: true })
  })
})
