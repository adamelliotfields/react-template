/**
 * Deeply compares two objects for equality.
 * @example deepEqual({ a: { b: 1 } }, { a: { b: 1 } }) // true
 */
export default function deepEqual<T>(a: T, b: T): boolean {
  // primitives and referential equality
  if (a === b) return true

  // if either is not an object or null
  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) return false

  // compare dates
  if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime()

  // compare arrays with recursion
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false
    return a.every((value, index) => deepEqual(value, b[index]))
  }

  const aKeys = Object.keys(a) as (keyof T)[]
  const bKeys = Object.keys(b) as (keyof T)[]

  // objects have different keys
  if (aKeys.length !== bKeys.length) return false
  if (!aKeys.every((key) => bKeys.includes(key))) return false

  // deep compare objects with recursion
  return aKeys.every((key) => deepEqual(a[key], b[key]))
}
