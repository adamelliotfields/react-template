/**
 * Zips multiple iterables into a single iterable of tuples.
 * @example zip([1, 2, 3], ['a', 'b', 'c']) => [[1, 'a'], [2, 'b'], [3, 'c']]
 */
export default function zip<T extends unknown[]>(
  ...iterables: { [K in keyof T]: Iterable<T[K]> }
): T[] {
  const iterators = iterables.map((iterable) => iterable[Symbol.iterator]())
  const result: T[] = []

  while (true) {
    const items = iterators.map((iterator) => iterator.next())
    if (items.some((item) => item.done)) break
    result.push(items.map((item) => item.value) as T)
  }

  return result
}

/**
 * Zips multiple iterables into a single iterable of tuples and returns a generator.
 * @example
 * for (const [num, letter] of zipLazy([1, 2, 3], ['a', 'b', 'c'])) {
 *   console.log(num, letter) // 1 'a', 2 'b', 3 'c'
 * }
 */
export function* zipLazy<T extends unknown[]>(
  ...iterables: { [K in keyof T]: Iterable<T[K]> }
): Generator<T> {
  const iterators = iterables.map((iterable) => iterable[Symbol.iterator]())

  while (true) {
    const items = iterators.map((iterator) => iterator.next())
    if (items.some((item) => item.done)) break
    yield items.map((item) => item.value) as T
  }
}
