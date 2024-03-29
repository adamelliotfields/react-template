import { beforeEach, describe, expect, mock, test } from 'bun:test'

import debounce from '@/lib/debounce'
import sleep from '@/lib/sleep'

let debouncedFn: ReturnType<typeof debounce>
let notDebouncedFn: ReturnType<typeof debounce>
let mockedFn: ReturnType<typeof mock>
const wait = 150

beforeEach(() => {
  mockedFn = mock(() => undefined)
  debouncedFn = debounce(mockedFn, wait)
  notDebouncedFn = debounce(mockedFn, 0)
})

describe('debounce', () => {
  test('debounces the function', async () => {
    debouncedFn()
    await sleep(wait)
    expect(mockedFn).toHaveBeenCalledTimes(1)
  })

  test('debounces with arguments', async () => {
    debouncedFn('foo', 'bar')
    await sleep(wait)
    expect(mockedFn).toHaveBeenCalledTimes(1)
    expect(mockedFn).toHaveBeenCalledWith('foo', 'bar')
  })

  test('debounces when called multipled times', async () => {
    debouncedFn()
    debouncedFn()
    debouncedFn()
    await sleep(wait)
    expect(mockedFn).toHaveBeenCalledTimes(1)
  })

  test('calls the function on next tick when not debounced', () => {
    notDebouncedFn()
    setTimeout(() => {
      expect(mockedFn).toHaveBeenCalledTimes(1)
    }, 0)
  })
})
