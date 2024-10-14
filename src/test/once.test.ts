import { describe, expect, mock, test } from 'bun:test'

import once from '@/lib/once'

describe('once', () => {
  test('calls function once', () => {
    const fn = mock(() => {})
    const initialize = once(fn)
    initialize()
    initialize()
    expect(fn).toHaveBeenCalledTimes(1)
  })
})
