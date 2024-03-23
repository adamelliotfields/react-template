// use an environment variable to seed
const { VITE_SEED } = import.meta.env
const SEED = Number(VITE_SEED) || Date.now()

/*
 * ZX81 implementation of the LCG PRNG
 * https://en.wikipedia.org/wiki/Linear_congruential_generator
 */
class LCG {
  private static instance: LCG
  private state: number

  constructor() {
    this.state = SEED
  }

  public static getInstance(): LCG {
    if (!LCG.instance) {
      LCG.instance = new LCG()
    }
    return LCG.instance
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
    this.state = SEED
  }
}

/**
 * Generate a random number using the LCG PRNG.
 * @param reset - Reset the PRNG state
 */
export default function random(reset = false): number {
  const lcg = LCG.getInstance()
  if (reset) {
    lcg.reset()
    return 0
  }
  return lcg.next()
}
