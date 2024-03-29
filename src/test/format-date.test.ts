import { describe, expect, test } from 'bun:test'

import formatDate from '@/lib/format-date'

describe('formatDate', () => {
  test('formats a date object', () => {
    expect(formatDate(new Date('2020-01-13'))).toBe('January 13, 2020')
  })

  test('formats a date string', () => {
    expect(formatDate('2020-01-13')).toBe('January 13, 2020')
  })

  test('formats a date string with time', () => {
    expect(formatDate('2020-01-13T00:00:00Z')).toBe('January 13, 2020')
  })

  test('formats a date in ISO 8601 format', () => {
    expect(formatDate('2020-01-13', 'short')).toBe('2020-01-13')
  })

  test('throws if invalid date', () => {
    expect(() => formatDate('2020-13-01')).toThrow()
  })
})
