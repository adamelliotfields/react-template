import { describe, expect, test } from 'bun:test'

import uid from '../lib/uid'

// 42
const { VITE_SEED } = import.meta.env

describe('uid', () => {
  test('returns a string of the specified length', () => {
    expect(uid().length).toEqual(21)
    expect(uid(42).length).toEqual(42)
  })

  test.if(VITE_SEED)('IDs are deterministic if seeded', () => {
    // reset the PRNG so the IDs are the same
    const _ = undefined
    const a = uid(_, _, true)
    const b = uid(_, _, true)
    expect(a).toEqual(b)
  })
})
