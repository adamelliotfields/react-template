import { describe, expect, test } from 'bun:test'

import clamp from '@/lib/clamp'

describe('clamp', () => {
  test('clamps a number between a min and max', () => {
    expect(clamp(5, 4, 6)).toBe(5) // within range (n)
    expect(clamp(5, 6, 7)).toBe(6) // below range (min)
    expect(clamp(5, 3, 4)).toBe(4) // above range (max)
  })
})
