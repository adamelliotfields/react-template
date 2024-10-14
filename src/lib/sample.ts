/**
 * Returns a random sample of items from an iterable. Order not preserved.
 * @example
 * sample([1, 2, 3, 4, 5]) // [2]
 * sample([1, 2, 3, 4, 5], 3) // [2, 4, 1]
 */
export default function sample<T>(
  iterable: T[] | Iterable<T>,
  n = 1,
  random_fn = Math.random
): T[] {
  if (n <= 0) return []

  const pool = Array.isArray(iterable) ? iterable.slice() : [...iterable]
  const size = Math.min(n, pool.length)

  const result: T[] = []
  const taken = new Set<number>()

  while (result.length < size) {
    const index = Math.floor(random_fn() * pool.length)
    if (taken.has(index)) continue

    taken.add(index)
    result.push(pool[index])
  }

  return result
}
