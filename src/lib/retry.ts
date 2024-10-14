/**
 * Retry an async function a number of times with a delay between each attempt.
 * @example
 * retry(() => fetchData(), 2, 1000, (n) => console.log(`${n} retries left...`))
 *   .then(data => console.log(data))
 *   .catch(error => console.error(error))
 */
export default async function retry<T>(
  fn: () => Promise<T>,
  n = 1,
  wait = 0,
  retry_fn: null | ((n: number) => void) = null
): Promise<T> {
  try {
    return await fn()
  } catch (error) {
    if (n <= 0) throw error
    if (retry_fn) retry_fn(n)
    await new Promise((resolve) => setTimeout(resolve, wait))
    return retry(fn, n - 1, wait, retry_fn) // tail recursion limited to `retries + 1` stack frames
  }
}
