class LRUCache<K, V> {
  private cache: Map<K, V>
  private readonly maxSize: number

  constructor(maxSize: number) {
    this.cache = new Map()
    this.maxSize = maxSize
  }

  get(key: K): V | undefined {
    if (!this.cache.has(key)) return undefined

    // remove and re-insert to update LRU position
    const value = this.cache.get(key)!
    this.cache.delete(key)
    this.cache.set(key, value)
    return value
  }

  put(key: K, value: V): void {
    if (this.cache.has(key)) {
      // update existing entry
      this.cache.delete(key)
    } else if (this.cache.size >= this.maxSize) {
      // evict LRU entry
      const lruKey = this.cache.keys().next().value!
      this.cache.delete(lruKey)
    }

    // new entry
    this.cache.set(key, value)
  }
}

/**
 * Cache the results of a function with a least-recently-used eviction policy.
 * @example
 * const cachedSum = lruCache((a: number, b: number) => a + b)
 * cachedSum(1, 2) // 3
 * cachedSum(1, 2) // 3 (cached)
 */
export default function lruCache<T extends (...args: unknown[]) => unknown>(
  fn: T,
  maxSize = 100
): T {
  const cache = new LRUCache<string, ReturnType<T>>(maxSize)

  // return a Proxy to intercept function calls
  return new Proxy(fn, {
    apply(target, thisArg, args: Parameters<T>): ReturnType<T> {
      const key = JSON.stringify(args)
      const cached = cache.get(key)

      // return the cached result if it exists
      if (cached !== undefined) return cached

      // use Reflect to call the original function and cache the result
      const result = Reflect.apply(target, thisArg, args) as ReturnType<T>
      cache.put(key, result)
      return result
    }
  }) as T
}
