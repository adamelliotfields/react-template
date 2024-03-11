// biome-ignore lint/suspicious/noExplicitAny:
type ThrottledFunction<T extends (...args: any[]) => any> = (
  ...args: Parameters<T>
) => ReturnType<T>

/** Throttle a function to only be called once every `wait` milliseconds. */
export default function throttle<
  // biome-ignore lint/suspicious/noExplicitAny:
  T extends (...args: any[]) => any
>(fn: T, wait: number): ThrottledFunction<T> {
  let last = 0
  let result: ReturnType<T>

  const throttled = (...args: Parameters<T>): ReturnType<T> => {
    const now = Date.now()
    if (now - last >= wait) {
      last = now
      result = fn(...args)
    }
    return result
  }

  return throttled
}
