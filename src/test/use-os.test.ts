import { afterEach, describe, expect, it } from 'bun:test'

import { renderHook } from '@testing-library/react'

import useOS, { type OS } from '@/lib/use-os'

describe('useOS', () => {
  const userAgent = window.navigator.userAgent

  const agents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.3',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
    'Mozilla/5.0 (X11; Linux x86_64; rv:124.0) Gecko/20100101 Firefox/124.0',
    'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Mobile Safari/537.3',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.3.1 Mobile/15E148 Safari/604.'
  ]
  const oses = ['windows', 'mac', 'linux', 'android', 'ios']
  const zipped = oses.map((os, i) => [os, agents[i]]) as [OS, string][]

  const mockUserAgent = (value: string) => {
    Object.defineProperty(window.navigator, 'userAgent', { value, writable: true })
  }

  afterEach(() => {
    mockUserAgent(userAgent)
  })

  // https://bun.sh/docs/test/writing#test-each
  it.each(zipped)('returns %s', (os, agent) => {
    mockUserAgent(agent)
    const { result } = renderHook(() => useOS())
    expect(result.current).toEqual(os)
  })
})
