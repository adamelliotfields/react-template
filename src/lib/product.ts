/**
 * Get the Cartesian product of two arrays.
 * @example product([1, 2], ['a', 'b']) // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
 */
export default function product<T, U>(a: T[], b: U[]): [T, U][] {
  return a.flatMap((x) => b.map((y) => [x, y] as [T, U]))
}
