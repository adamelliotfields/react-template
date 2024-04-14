/**
 * ZX81 implementation of the LCG PRNG.
 * https://en.wikipedia.org/wiki/Linear_congruential_generator
 */
class LCG {
  private static instance: LCG
  private state: number

  constructor(seed = 42) {
    // use an optional environment variable to seed
    const { VITE_SEED } = import.meta.env
    const SEED = Number(VITE_SEED)
    this.state = !isNaN(SEED) ? SEED : seed
  }

  public static getInstance(): LCG {
    if (!LCG.instance) {
      LCG.instance = new LCG()
    }
    return LCG.instance
  }

  public next(): number {
    const a = 75 // multiplier
    const c = 74 // increment
    const m = 2 ** 16 + 1 // modulus
    this.state = (a * this.state + c) % m

    // divide by `m` to normalize to a float between 0 and 1
    return this.state / m
  }
}

/**
 * Generate a random number using the LCG PRNG.
 * @param min
 * @param max
 */
export default function random(min = 0, max = 1): number {
  const lcg = LCG.getInstance()
  return min + lcg.next() * (max - min)
}
