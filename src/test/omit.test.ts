import { describe, expect, test } from 'bun:test'

import omit from '@/lib/omit'

describe('omit', () => {
  test('omits a single property', () => {
    expect(omit({ a: 1, b: 2, c: 3 }, 'a')).toEqual({ b: 2, c: 3 })
  })

  test('omits multiple properties', () => {
    expect(omit({ a: 1, b: 2, c: 3 }, ['a', 'c'])).toEqual({ b: 2 })
  })
})
