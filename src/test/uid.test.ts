import { describe, expect, test } from 'bun:test'

import uid from '../lib/uid'

describe('uid', () => {
  test('returns a string of the specified length', () => {
    expect(uid().length).toEqual(21)
    expect(uid(42).length).toEqual(42)
  })
})
