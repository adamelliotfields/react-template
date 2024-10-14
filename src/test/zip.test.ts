import { describe, expect, test } from 'bun:test'

import zip, { zipLazy } from '@/lib/zip'

describe('zip', () => {
  test('zips arrays', () => {
    const a = [1, 2, 3]
    const b = ['a', 'b', 'c']
    const zipped = zip(a, b)
    expect(zipped).toEqual([
      [1, 'a'],
      [2, 'b'],
      [3, 'c']
    ])
  })

  test('handles arrays of different lengths', () => {
    const a = [1, 2]
    const b = ['a', 'b', 'c']
    const zipped = zip(a, b)
    expect(zipped).toEqual([
      [1, 'a'],
      [2, 'b']
    ])
  })
})

describe('zipLazy', () => {
  test('zips arrays lazily', () => {
    const a = [1, 2, 3]
    const b = ['a', 'b', 'c']
    const zipped = zipLazy(a, b)
    expect(zipped.next()).toEqual({ value: [1, 'a'], done: false })
    expect(zipped.next()).toEqual({ value: [2, 'b'], done: false })
    expect(zipped.next()).toEqual({ value: [3, 'c'], done: false })
    expect(zipped.next()).toEqual({ value: undefined, done: true })
  })

  test('handles arrays of different lengths', () => {
    const a = [1, 2]
    const b = ['a', 'b', 'c']
    const zipped = zipLazy(a, b)
    expect(zipped.next()).toEqual({ value: [1, 'a'], done: false })
    expect(zipped.next()).toEqual({ value: [2, 'b'], done: false })
    expect(zipped.next()).toEqual({ value: undefined, done: true })
  })
})
