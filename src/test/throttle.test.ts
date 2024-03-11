import { beforeEach, describe, expect, mock, test } from 'bun:test'
import sleep from '../lib/sleep'
import throttle from '../lib/throttle'

let throttledFn: ReturnType<typeof throttle>
let mockedFn: ReturnType<typeof mock>
const wait = 150

beforeEach(() => {
  mockedFn = mock(() => undefined)
  throttledFn = throttle(mockedFn, wait)
})

describe('throttle', () => {
  test('throttles the function', async () => {
    throttledFn()
    await sleep(wait)
    expect(mockedFn).toHaveBeenCalledTimes(1)
  })

  test('throttles with arguments', async () => {
    throttledFn('foo', 'bar')
    await sleep(wait)
    expect(mockedFn).toHaveBeenCalledTimes(1)
    expect(mockedFn).toHaveBeenCalledWith('foo', 'bar')
  })

  test('throttles when called multipled times', async () => {
    throttledFn()
    throttledFn()
    throttledFn()
    await sleep(wait)
    expect(mockedFn).toHaveBeenCalledTimes(1)
  })
})
