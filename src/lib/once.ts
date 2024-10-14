/**
 * Ensures a function is only called once.
 * @example
 * const initialize = once(() => console.log('Initialized'))
 * initialize() // Initialized
 * initialize() // (nothing)
 */
export default function once<T extends (...args: unknown[]) => unknown>(fn: T): T {
  let result: ReturnType<T>
  let called = false

  return function (this: unknown, ...args: Parameters<T>): ReturnType<T> {
    if (!called) {
      called = true
      result = fn.apply(this, args) as ReturnType<T>
    }
    return result
  } as T
}
