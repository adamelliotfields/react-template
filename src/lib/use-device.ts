import { useEffect, useState } from 'react'

export type Device = 'Mobile/Phone' | 'Tablet' | 'Desktop/Laptop'

/**
 * Returns the client device by user agent detection.
 * @example const mobile = ['Mobile/Phone', 'Tablet'].includes(useDevice())
 * @example const desktop = useDevice() === 'Desktop/Laptop'
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgent
 */
export default function useDevice(): Device | null {
  const [device, setDevice] = useState<Device | null>(null)

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase()

    // tablet
    if (/ipad/i.test(userAgent)) return setDevice('Tablet')

    // mobile
    if (/(android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini)/i.test(userAgent))
      return setDevice('Mobile/Phone')

    // desktop/laptop
    setDevice('Desktop/Laptop')
  }, [])

  return device
}
