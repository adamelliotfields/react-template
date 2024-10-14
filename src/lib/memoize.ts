/**
 * Memoize a function with a first-in-first-out cache eviction policy.
 * @example const sum = memoize((a, b) => a + b)
 */
export default function memoize<T extends (...args: unknown[]) => unknown>(
  fn: T,
  maxCacheSize = 100
): T {
  const cache = new Map<string, ReturnType<T>>()

  // return a Proxy to intercept function calls
  return new Proxy(fn, {
    apply(target, thisArg, args: Parameters<T>): ReturnType<T> {
      const key = JSON.stringify(args)
      if (!cache.has(key)) {
        if (cache.size >= maxCacheSize) {
          // evict the first entry to make room for the new one
          const firstKey = cache.keys().next().value!
          cache.delete(firstKey)
        }

        // use Reflect to call the original function and cache the result
        cache.set(key, Reflect.apply(target, thisArg, args) as ReturnType<T>)
      }

      // return the cached result
      return cache.get(key)!
    }
  }) as T
}
