import { describe, expect, test } from 'bun:test'

import truncate from '@/lib/truncate'

describe('truncate', () => {
  test("doesn't truncate short strings", () => {
    expect(truncate('hello', 5)).toBe('hello')
  })

  test('truncates long strings', () => {
    expect(truncate('boomerang', 7)).toBe('boom...')
  })

  test('allows custom ellipsis', () => {
    expect(truncate('boomerang', 7, '!!!')).toBe('boom!!!')
    expect(truncate('hello', 4, '')).toBe('hell')
  })
})
