import { afterEach, describe, expect, it } from 'bun:test'

import { renderHook } from '@testing-library/react'

import useDevice, { type Device } from '@/lib/use-device'

describe('useDevice', () => {
  const userAgent = window.navigator.userAgent

  const agents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.3', // windows chrome
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36', // mac chrome
    'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Mobile Safari/537.3', // android chrome
    'Mozilla/5.0 (X11; Linux x86_64; rv:124.0) Gecko/20100101 Firefox/124.0', // linux firefox
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.3.1 Mobile/15E148 Safari/604.', // ios safari
    'Mozilla/5.0 (iPad; CPU OS 17_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.3.1 Mobile/15E148 Safari/604.1', // ipad safari
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.3.1 Safari/605.1.15', // mac safari
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36 Edg/123.0.0.0', // windows edge
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36 OPR/110.0.0.0' // windows opera
  ]

  const devices = [
    'Desktop/Laptop',
    'Desktop/Laptop',
    'Mobile/Phone',
    'Desktop/Laptop',
    'Mobile/Phone',
    'Tablet',
    'Desktop/Laptop',
    'Desktop/Laptop',
    'Desktop/Laptop'
  ]
  const zipped = devices.map((device, i) => [device, agents[i]]) as [Device, string][]

  const mockUserAgent = (value: string) => {
    Object.defineProperty(window.navigator, 'userAgent', { value, writable: true })
  }

  afterEach(() => {
    mockUserAgent(userAgent)
  })

  // https://bun.sh/docs/test/writing#test-each
  it.each(zipped)('returns %s', (device, agent) => {
    mockUserAgent(agent)
    const { result } = renderHook(() => useDevice())
    expect(result.current).toEqual(device)
  })
})
