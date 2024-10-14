import { describe, expect, test } from 'bun:test'

import uid from '@/lib/uid'

describe('uid', () => {
  test('returns a string of the specified length', () => {
    const a = uid()
    const b = uid(42)
    expect(a.length).toEqual(21)
    expect(b.length).toEqual(42)
  })

  test('returns a different string', () => {
    const a = uid()
    const b = uid()
    expect(a).not.toEqual(b)
  })
})
