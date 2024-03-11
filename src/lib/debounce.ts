// biome-ignore lint/suspicious/noExplicitAny:
type DebouncedFunction<T extends (...args: any[]) => any> = (
  ...args: Parameters<T>
) => ReturnType<T>

/** Debounce a function to be called after `wait` milliseconds of inactivity. */
export default function debounce<
  // biome-ignore lint/suspicious/noExplicitAny:
  T extends (...args: any[]) => any
>(fn: T, wait: number): DebouncedFunction<T> {
  let timeout: ReturnType<typeof setTimeout>
  let result: ReturnType<T>

  const debounced = (...args: Parameters<T>): ReturnType<T> => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      result = fn(...args)
    }, wait)
    return result !== null ? result : fn(...args)
  }

  return debounced
}
