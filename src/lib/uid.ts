import random from './random.ts'

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-'

/**
 * Generates a unique ID.
 * Set VITE_SEED to a number to make the IDs deterministic.
 * @param {number} length - The length of the ID (default: 21)
 * @param {string} alphabet - The characters to use in the ID (default: A-Za-z0-9_-)
 * @param {reset} reset - Reset the PRNG before generating (default: false)
 */
export default function uid(length = 21, alphabet = ALPHABET, reset = false): string {
  // reset the PRNG before generating if requested
  if (reset) random(null, true)

  let id = ''
  for (let i = 0; i < length; i++) {
    id += alphabet.charAt(Math.floor(random() * alphabet.length))
  }

  return id
}
