// use an environment variable to seed
const { VITE_SEED } = import.meta.env
const seed = Number(VITE_SEED) || Date.now()

/*
 * 32-bit implementation of the Xorshift PRNG
 * https://en.wikipedia.org/wiki/Xorshift
 */
class Xorshift32 {
  private state: number

  constructor() {
    this.state = seed
  }

  public next(): number {
    let x = this.state
    x ^= x << 13
    x ^= x >>> 17
    x ^= x << 5
    this.state = x

    // divide by the max 32-bit signed integer to normalize to a float between -1 and 1
    const m = 2 ** 31 - 1
    return x / m
  }

  public reset(): void {
    this.state = seed
  }
}

/*
 * ZX81 implementation of the LCG PRNG
 * https://en.wikipedia.org/wiki/Linear_congruential_generator
 */
class LCG {
  private state: number

  constructor() {
    this.state = seed
  }

  public next(): number {
    const a = 75
    const c = 74
    const m = 2 ** 16 + 1
    this.state = (a * this.state + c) % m

    // divide by `m` to normalize to a float between 0 and 1
    return this.state / m
  }

  public reset(): void {
    this.state = seed
  }
}

const xorshift = new Xorshift32()
const lcg = new LCG()

/**
 * Generate a random number using the specified PRNG.
 * @param prng - Either "xorshift" or "lcg"; pass `null` to skip (default: 'lcg')
 * @param reset - Reset the PRNG state
 */
export default function random(
  prng: 'xorshift' | 'lcg' | null = 'lcg',
  reset = false
): number {
  if (reset) {
    lcg.reset()
    xorshift.reset()
  }
  if (prng === null) return 0
  if (prng === 'lcg') return lcg.next()
  if (prng === 'xorshift') return xorshift.next()
  throw new Error(`Unknown RNG: ${prng}`)
}
