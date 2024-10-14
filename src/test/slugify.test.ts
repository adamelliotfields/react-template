import { describe, expect, test } from 'bun:test'

import slugify from '@/lib/slugify'

describe('slugify', () => {
  test('slugifies a string', () => {
    expect(slugify('Hello, World!')).toBe('hello-world')
    expect(slugify('  Hello, World!  ')).toBe('hello-world')
    expect(slugify('Test_String (42)')).toBe('test-string-42')
  })

  test('preserves underscores when specified', () => {
    expect(slugify('Test_String (42)', true)).toBe('test_string-42')
  })
})
