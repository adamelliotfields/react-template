/**
 * Sleep for a given number of milliseconds.
 * @example await sleep(1000)
 */
export default function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
