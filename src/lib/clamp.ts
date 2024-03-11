/** Clamp a number between two values. */
export default function clamp(n: number, a: number, b: number): number {
  const min = Math.min(a, b)
  const max = Math.max(a, b)
  return Math.min(Math.max(n, min), max)
}
