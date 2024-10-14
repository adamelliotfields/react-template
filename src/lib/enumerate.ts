/**
 * Enumerate over an array or iterable and return an array of [index, value] tuples.
 * @example enumerate(['a', 'b', 'c']) // [[0, 'a'], [1, 'b'], [2, 'c']]
 */
export default function enumerate<T>(iterable: T[] | Iterable<T>): [number, T][] {
  if (Array.isArray(iterable)) return iterable.map((value, index) => [index, value])

  // not an array so use iterator
  const iterator = iterable[Symbol.iterator]()
  const result: [number, T][] = []

  let index = 0
  for (let item = iterator.next(); !item.done; item = iterator.next()) {
    result.push([index, item.value])
    index++
  }

  return result
}

/**
 * Enumerate over an array or iterable and return a generator of [index, value] tuples.
 * @example
 * for (const [index, value] of enumerateLazy(['a', 'b', 'c'])) {
 *   console.log(index, value) // 0 'a', 1 'b', 2 'c'
 * }
 */
export function* enumerateLazy<T>(iterable: T[] | Iterable<T>): Generator<[number, T]> {
  let index = 0
  for (const value of iterable) {
    yield [index, value]
    index++
  }
}
