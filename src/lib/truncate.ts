/**
 * Truncate a string to a certain length and append an ellipsis.
 * @example
 * truncate('boomerang', 7) // 'boom...'
 * truncate('hello', 4, '') // 'hell'
 */
export default function truncate(str: string, n: number, ellipsis = '...'): string {
  if (str.length <= n) return str
  return str.slice(0, n - ellipsis.length) + ellipsis
}
