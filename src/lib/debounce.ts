type DebouncedFunction<T extends (...args: unknown[]) => unknown> = (
  ...args: Parameters<T>
) => ReturnType<T>

/**
 * Debounce a function to be called after `wait` milliseconds of inactivity.
 * @example const debounced = debounce(fn, 100)
 */
export default function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  wait: number
): DebouncedFunction<T> {
  let timeout: ReturnType<typeof setTimeout>
  let result: ReturnType<T>

  const debounced = (...args: Parameters<T>): ReturnType<T> => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      result = fn(...args) as ReturnType<T>
    }, wait)
    return result !== null ? result : (fn(...args) as ReturnType<T>)
  }

  return debounced
}
