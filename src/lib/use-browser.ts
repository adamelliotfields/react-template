import { useEffect, useState } from 'react'

export type Browser = 'Chrome' | 'Firefox' | 'Safari' | 'Edge' | 'Opera' | 'Unknown'

/**
 * Returns the client browser by user agent detection.
 * @example const chrome = useBrowser() === 'Chrome'
 */
export default function useBrowser(): Browser | null {
  const [browser, setBrowser] = useState<Browser | null>(null)

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase()

    if (userAgent.includes('edge') || userAgent.includes('edg/')) return setBrowser('Edge')
    if (userAgent.includes('opr')) return setBrowser('Opera') // before Chrome
    if (userAgent.includes('chrome')) return setBrowser('Chrome')
    if (userAgent.includes('firefox')) return setBrowser('Firefox')
    if (userAgent.includes('safari')) return setBrowser('Safari')

    setBrowser('Unknown')
  }, [])

  return browser
}
