import { describe, expect, test } from 'bun:test'

import deepCopy from '@/lib/deep-copy'

describe('deepCopy', () => {
  test('copies a primitive', () => {
    const original = 42
    const copy = deepCopy(original)
    expect(copy).toBe(original)
  })

  test('copies a date', () => {
    const original = new Date()
    const copy = deepCopy(original)
    expect(copy).toEqual(original)
    expect(copy).not.toBe(original)
  })

  test('copies an array', () => {
    const original = [1, 2, 3]
    const copy = deepCopy(original)
    expect(copy).toEqual(original)
    expect(copy).not.toBe(original)
  })

  test('copies an object', () => {
    const original = { foo: 'bar' }
    const copy = deepCopy(original)
    expect(copy).toEqual(original)
    expect(copy).not.toBe(original)
  })

  test('copies nested objects', () => {
    const original = { foo: { bar: 'baz' } }
    const copy = deepCopy(original)
    expect(copy).toEqual(original)
    expect(copy).not.toBe(original)
    expect(copy.foo).not.toBe(original.foo)
  })

  test('copies nested arrays', () => {
    const original = [
      [1, 2, 3],
      [4, 5, 6]
    ]
    const copy = deepCopy(original)
    expect(copy).toEqual(original)
    expect(copy).not.toBe(original)
    expect(copy[0]).not.toBe(original[0])
    expect(copy[1]).not.toBe(original[1])
  })
})
