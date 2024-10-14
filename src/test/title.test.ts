import { describe, expect, test } from 'bun:test'

import title from '@/lib/title'

describe('title', () => {
  test('title cases a string', () => {
    expect(title('hello world')).toBe('Hello World')
    expect(title('HELLO WORLD')).toBe('Hello World')
    expect(title('hello-world')).toBe('Hello-World')
    expect(title('hello  world')).toBe('Hello  World')
    expect(title("don't stop")).toBe("Don't Stop")
    expect(title('über-cool')).toBe('Über-Cool')
  })
})
