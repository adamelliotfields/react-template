/**
 * Pick a subset of properties from an object.
 * @example
 * pick({ a: 1, b: 2, c: 3 }, 'a') // { a: 1 }
 * pick({ a: 1, b: 2, c: 3 }, ['a', 'c']) // { a: 1, c: 3 }
 */
export default function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K | K[]
): Pick<T, K> {
  const keysArray = Array.isArray(keys) ? keys : [keys]
  const result = {} as Pick<T, K>
  for (const key of keysArray) {
    if (key in obj) {
      result[key] = obj[key]
    }
  }
  return result
}
