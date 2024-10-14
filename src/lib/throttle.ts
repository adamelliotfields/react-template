type ThrottledFunction<T extends (...args: unknown[]) => unknown> = (
  ...args: Parameters<T>
) => ReturnType<T>

/**
 * Throttle a function to only be called once every `wait` milliseconds.
 * @example const throttled = throttle(fn, 100)
 */
export default function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  wait: number
): ThrottledFunction<T> {
  let last = 0
  let result: ReturnType<T>

  const throttled = (...args: Parameters<T>): ReturnType<T> => {
    const now = Date.now()
    if (now - last >= wait) {
      last = now
      result = fn(...args) as ReturnType<T>
    }
    return result
  }

  return throttled
}
