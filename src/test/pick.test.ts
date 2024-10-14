import { describe, expect, test } from 'bun:test'

import pick from '@/lib/pick'

describe('pick', () => {
  test('picks a single property', () => {
    expect(pick({ a: 1, b: 2, c: 3 }, 'a')).toEqual({ a: 1 })
  })

  test('picks multiple properties', () => {
    expect(pick({ a: 1, b: 2, c: 3 }, ['a', 'c'])).toEqual({ a: 1, c: 3 })
  })
})
