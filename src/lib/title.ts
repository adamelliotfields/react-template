/**
 * Title cases a string.
 * @example title('hello, world!') // 'Hello, World!'
 */
export default function title(str: string): string {
  // (?:) is a non-capturing group (doesn't create a backreference)
  // ^ matches the start of the string
  // \s matches any whitespace character
  // - matches a hyphen
  // \S matches any non-whitespace character
  // g matches all occurrences (global)
  return str.toLocaleLowerCase().replace(/(?:^|\s|-)\S/g, (char) => char.toUpperCase())
}
