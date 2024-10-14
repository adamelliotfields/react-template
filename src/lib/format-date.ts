/**
 * Make a date human-readable.
 * @example
 * formatDate('2021-07-01T00:00:00Z') // 'July 1, 2021'
 * formatDate('2021-07-01T00:00:00Z', 'short') // '2021-07-01'
 */
export default function formatDate(
  date: string | Date,
  format: 'long' | 'short' = 'long'
): string {
  const dateString = typeof date === 'string' ? date : date.toISOString()
  const hasTime = dateString.includes('T')
  const hasTimeZone = /Z|[+-]\d{2}:\d{2}$/.test(dateString)
  const fullDateString = hasTime || hasTimeZone ? dateString : `${dateString}T00:00:00Z`
  const d = new Date(fullDateString)

  if (String(d) === 'Invalid Date') throw new Error('Invalid Date')

  // short format is ISO 8601 (YYYY-MM-DD)
  if (format === 'short') return d.toISOString().split('T').at(0) as string

  return d.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  })
}
