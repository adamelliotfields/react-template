/**
 * Omit properties from an object.
 * @example
 * omit({ a: 1, b: 2, c: 3 }, 'a') // { b: 2, c: 3 }
 * omit({ a: 1, b: 2, c: 3 }, ['a', 'c']) // { b: 2 }
 */
export default function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K | K[]
): Omit<T, K> {
  const keysArray = Array.isArray(keys) ? keys : [keys]
  const result = { ...obj } // shallow copy to preserve original
  for (const key of keysArray) {
    delete result[key]
  }
  return result
}
