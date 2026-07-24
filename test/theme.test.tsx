import { act, type ComponentProps } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import Theme, { type ThemeProps } from '@/components/Theme'

declare global {
  var IS_REACT_ACT_ENVIRONMENT: boolean | undefined
}

const LightIcon = (props: ComponentProps<'svg'>) => <svg {...props} />
const DarkIcon = (props: ComponentProps<'svg'>) => <svg {...props} />
const SystemIcon = (props: ComponentProps<'svg'>) => <svg {...props} />

const themes: ThemeProps['themes'] = [
  { name: 'light', icon: LightIcon },
  { name: 'dark', icon: DarkIcon },
  { name: 'system', icon: SystemIcon }
]

let container: HTMLDivElement | null = null
let root: Root | null = null

function renderTheme(props: Partial<ThemeProps> = {}) {
  act(() => {
    root?.render(<Theme themes={themes} {...props} />)
  })
}

function getButton(ariaLabel: string) {
  return container?.querySelector<HTMLButtonElement>(
    `button[aria-label="${ariaLabel}"]`
  ) as HTMLButtonElement
}

beforeEach(() => {
  globalThis.IS_REACT_ACT_ENVIRONMENT = true
  container = window.document.createElement('div')
  window.document.body.append(container)
  root = createRoot(container)
})

afterEach(() => {
  act(() => {
    root?.unmount()
  })
  container?.remove()
  root = null
  container = null
  globalThis.IS_REACT_ACT_ENVIRONMENT = false
  window.document.documentElement.removeAttribute('data-theme')
})

describe('Theme', () => {
  it('reads current data-theme on mount', () => {
    window.document.documentElement.setAttribute('data-theme', 'dark')
    renderTheme()
    expect(window.document.documentElement.getAttribute('data-theme')).toBe('dark')
  })

  it('cycles data-theme on click', () => {
    window.document.documentElement.setAttribute('data-theme', 'light')
    renderTheme()

    act(() => {
      getButton('Cycle theme').click()
    })
    expect(window.document.documentElement.getAttribute('data-theme')).toBe('dark')

    act(() => {
      getButton('Cycle theme').click()
    })
    expect(window.document.documentElement.getAttribute('data-theme')).toBe('system')
  })
})
