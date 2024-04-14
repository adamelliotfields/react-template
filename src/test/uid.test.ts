import { describe, expect, it } from 'bun:test'

import uid from '@/lib/uid'

describe('uid', () => {
  it('returns a string of the specified length', () => {
    const a = uid()
    const b = uid(42)
    expect(a.length).toEqual(21)
    expect(b.length).toEqual(42)
  })

  it('returns a different string', () => {
    const a = uid()
    const b = uid()
    expect(a).not.toEqual(b)
  })
})
