import clsx from 'clsx'
import { Moon, Sun } from 'lucide-react'
import { type HTMLAttributes, useEffect, useState } from 'react'

import Container from './Container'

const themes = ['dark', 'light', 'system'] as const
type Theme = (typeof themes)[number]

const { VITE_HOMEPAGE } = import.meta.env

export default function Header({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  const [theme, setTheme] = useState<Theme | null>(null)

  // set the data-theme attribute when `theme` changes
  useEffect(() => {
    const el = document.documentElement // <html>

    if (theme !== null) {
      el.setAttribute('data-theme', theme)
    } else {
      const data = el.getAttribute('data-theme') as Theme
      if (data !== theme) setTheme(data)
    }
  }, [theme])

  // listen for changes to LocalStorage
  // any changes trigger calls to `setTheme`, which triggers the above side-effect
  // the DOM mutation observer in theme.js then updates LocalStorage
  // if the theme is the same, nothing happens
  useEffect(() => {
    const handler = (): void => {
      let dark = null
      try {
        // throws if dark is not valid JSON
        dark = JSON.parse(window.localStorage.getItem('dark') as string)
      } catch {}
      const storage = dark !== null ? 'dark' : dark === false ? 'light' : 'system'
      setTheme(storage)
    }

    // attach the handler and remove on unmount
    window.addEventListener('storage', handler)
    return () => {
      window.removeEventListener('storage', handler)
    }
  }, [])

  return (
    <header
      className={clsx(
        'border-b sticky top-0 bg-neutral-50 border-neutral-300 dark:bg-neutral-950 dark:border-neutral-700',
        className
      )}
      {...rest}
    >
      <Container className="h-14 items-center justify-between" border>
        <a
          href={VITE_HOMEPAGE}
          className="font-extrabold text-xl tracking-wide"
          target="_blank"
          rel="noopener noreferrer"
        >
          App
        </a>
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={() =>
              setTheme((oldTheme) => (oldTheme === 'light' ? 'system' : 'light'))
            }
          >
            <Sun
              className={
                theme === 'light'
                  ? 'text-neutral-900'
                  : 'text-neutral-400 dark:text-neutral-600'
              }
            />
          </button>
          <button
            type="button"
            onClick={() =>
              setTheme((oldTheme) => (oldTheme === 'dark' ? 'system' : 'dark'))
            }
          >
            <Moon
              className={
                theme === 'dark'
                  ? 'text-neutral-100'
                  : 'text-neutral-400 dark:text-neutral-600'
              }
            />
          </button>
        </div>
      </Container>
    </header>
  )
}
