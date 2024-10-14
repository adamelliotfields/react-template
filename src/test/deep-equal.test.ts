import { describe, expect, test } from 'bun:test'

import deepEqual from '@/lib/deep-equal'

describe('deepEqual', () => {
  test('compares primitives', () => {
    expect(deepEqual(42, 42)).toBe(true)
    expect(deepEqual(42, 43)).toBe(false)
  })

  test('compares dates', () => {
    const dateA = new Date()
    const dateB = new Date(dateA.getTime())
    const dateC = new Date(dateA.getTime() + 1000)

    expect(deepEqual(dateA, dateB)).toBe(true)
    expect(deepEqual(dateB, dateC)).toBe(false)
  })

  test('compares arrays', () => {
    expect(deepEqual([1, 2, 3], [1, 2, 3])).toBe(true)
    expect(deepEqual([1, 2, 3], [1, 2, 4])).toBe(false)
  })

  test('compares objects', () => {
    expect(deepEqual({ foo: 'bar' }, { foo: 'bar' })).toBe(true)
    expect(deepEqual({ foo: 'bar' }, { foo: 'baz' })).toBe(false)
  })

  test('compares nested objects', () => {
    expect(deepEqual({ foo: { bar: 'baz' } }, { foo: { bar: 'baz' } })).toBe(true)
    expect(deepEqual({ foo: { bar: 'baz' } }, { foo: { bar: 'qux' } })).toBe(false)
  })

  test('compares nested arrays', () => {
    const original = [
      [1, 2, 3],
      [4, 5, 6]
    ]
    const copy = [
      [1, 2, 3],
      [4, 5, 6]
    ]
    const different = [
      [1, 2, 3],
      [4, 5, 7]
    ]
    expect(deepEqual(original, copy)).toBe(true)
    expect(deepEqual(original, different)).toBe(false)
  })
})
