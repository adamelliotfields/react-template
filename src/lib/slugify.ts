/**
 * Slugify a string. Converts underscores by default.
 * @example
 * slugify('Hello, World!') // 'hello-world'
 * slugify('  Hello, World!  ') // 'hello-world'
 * slugify('Test_String (42)') // 'test-string-42'
 * slugify('Test_String (42)', true) // 'test_string-42'
 */
export default function slugify(str: string, underscores = false): string {
  const result = str
    .toLowerCase()
    .replace(/\s+/g, '-') // // replace spaces with hyphens
    .replace(/[^\w-]+/g, '') // remove non-word characters
    .replace(/--+/g, '-') // // replace multiple hyphens with a single hyphen
    .replace(/^-+|-+$/g, '') // trim leading and trailing hyphens
  return underscores ? result : result.replace(/_/g, '-')
}
