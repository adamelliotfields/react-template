/**
 * ZX81 implementation of the LCG PRNG.
 * https://en.wikipedia.org/wiki/Linear_congruential_generator
 */
class LCG {
  private state: number

  constructor(seed: number) {
    this.state = seed
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

/** Generate a random number between `min` and `max`. */
export default function random(min = 0, max = 1, random_fn = Math.random): number {
  return min + (max - min) * random_fn()
}

/** Generate a seeded random number generator. */
export function randomFromSeed(seed = 42): (min?: number, max?: number) => number {
  const lcg = new LCG(seed)
  return (min = 0, max = 1) => random(min, max, lcg.next.bind(lcg))
}
