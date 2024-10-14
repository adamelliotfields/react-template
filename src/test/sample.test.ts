import { describe, expect, mock, test } from 'bun:test'

import sample from '@/lib/sample'

describe('sample', () => {
  test('returns the correct number of items', () => {
    const arr = [1, 2, 3, 4, 5]
    const s = sample(arr)
    expect(s).toHaveLength(1)
    expect(arr).toContain(s[0])
  })

  test('calls random_fn', () => {
    const random_fn = mock(Math.random)
    sample([1, 2, 3], 2, random_fn)
    expect(random_fn).toHaveBeenCalledTimes(2)
  })
})
