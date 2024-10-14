import { describe, expect, mock, test } from 'bun:test'

import retry from '@/lib/retry'

describe('retry', () => {
  test('retries function calls', async () => {
    const fn = mock(() => Promise.reject(new Error()))
    try {
      await retry(fn, 3, 0)
    } catch {
      expect(fn).toHaveBeenCalledTimes(4)
    }
  })
})
