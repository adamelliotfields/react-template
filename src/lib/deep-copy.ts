/**
 * Deep copy a date, array, or object.
 * @example const copy = deepCopy(obj)
 */
export default function deepCopy<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj

  // copy dates
  if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T

  // copy arrays with recursion
  if (Array.isArray(obj)) return obj.map(deepCopy) as unknown as T

  // copy objects with recursion
  return Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, deepCopy(value)])) as T
}
