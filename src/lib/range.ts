/** Creates an array of numbers within a given range. */
export default function range(start: number, end: number): number[] {
  const length = end - start + 1
  return Array.from({ length }, (_, i) => start + i)
}
