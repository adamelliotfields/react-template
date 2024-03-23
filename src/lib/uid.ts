import random from './random.ts'

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-'

/**
 * Generates a unique ID.
 * Set VITE_SEED to a number to make the IDs deterministic.
 * @param length - The length of the ID (default: 21)
 * @param alphabet - The characters to use in the ID (default: A-Za-z0-9_-)
 */
export default function uid(length = 21, alphabet = ALPHABET): string {
  let id = ''
  for (let i = 0; i < length; i++) {
    id += alphabet.charAt(Math.floor(random() * alphabet.length))
  }
  return id
}
