import { useEffect, useState } from 'react'

export type OS = 'ios' | 'mac' | 'android' | 'linux' | 'windows'

/**
 * Returns the client OS by user agent detection.
 * @example const darwin = ['ios', 'mac'].includes(useOS())
 * @example const linux = ['android', 'linux'].includes(useOS())
 * @example const windows = useOS() === 'windows'
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgent
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Navigator/platform
 * @see https://developer.mozilla.org/en-US/docs/Web/API/NavigatorUAData/platform
 */
export default function useOS(): OS | null {
  const [os, setOS] = useState<OS | null>(null)

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase()

    // ios
    if (userAgent.includes('iphone') || userAgent.includes('ipad')) return setOS('ios')

    // mac
    // note: all apple devices have "like Mac" in their user agent; use "Macintosh" for macOS desktop specifically
    if (userAgent.includes('mac')) return setOS('mac')

    // android
    // note: all android devices have "linux" in their user agent
    if (userAgent.includes('android')) return setOS('android')

    // linux
    if (userAgent.includes('linux')) return setOS('linux')

    // windows
    if (userAgent.includes('win')) return setOS('windows')
  }, [])

  return os
}
