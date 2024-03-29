import { Computer, Menu, Moon, Sun } from 'lucide-react'
import { type PropsWithChildren, useEffect, useState } from 'react'
import { Link, useRoute } from 'wouter'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

// const { VITE_HOMEPAGE, VITE_TITLE } = import.meta.env

const THEMES = [
  { name: 'light', icon: Sun, label: 'Light' },
  { name: 'dark', icon: Moon, label: 'Dark' },
  { name: 'system', icon: Computer, label: 'System' }
]

const DEFAULT_THEME = THEMES[2] // system

export default function Header() {
  const [theme, setTheme] = useState<string | null>(null)

  const activeTheme = THEMES.find((t) => t.name === theme) ?? DEFAULT_THEME
  const { icon: Icon } = activeTheme as (typeof THEMES)[number]

  // set the data-theme attribute when theme changes
  useEffect(() => {
    const el = document.documentElement // <html>

    if (theme !== null) {
      el.setAttribute('data-theme', theme)
    } else {
      const data = el.getAttribute('data-theme') as string
      if (data !== theme) setTheme(data)
    }
  }, [theme])

  // listen for changes to LocalStorage
  useEffect(() => {
    const handler = (): void => {
      let dark = null
      try {
        // throws if dark is not valid
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
    <header className="h-16 w-full sticky top-0 flex items-center border-b border-neutral-300 dark:border-neutral-700">
      <div className="container flex md:max-w-5xl">
        <nav className="hidden flex-col md:flex md:flex-row md:items-center md:gap-4">
          <HeaderBrand>App</HeaderBrand>
          <HeaderLink href="/">Home</HeaderLink>
          <HeaderLink href="/about">About</HeaderLink>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <h1 className="text-xl font-semibold">App</h1>
              <HeaderLink href="/">Home</HeaderLink>
              <HeaderLink href="/about">About</HeaderLink>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Icon className="h-5 w-5" />
                <span className="sr-only">{activeTheme.label}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {THEMES.map((t) => (
                <DropdownMenuItem
                  key={t.name}
                  onClick={() => {
                    setTheme(t.name)
                  }}
                >
                  <t.icon className="h-5 w-5" />
                  <span className="ml-1 font-medium text-sm">{t.label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

function HeaderBrand({ children }: PropsWithChildren) {
  return (
    <Link to="/" className="min-w-fit text-base font-bold md:-mt-0.5 md:text-lg">
      {children}
    </Link>
  )
}

function HeaderLink({ href, children }: { href: string; children: string }) {
  const [isActive] = useRoute(href)
  return (
    <Link
      to={href}
      className={cn(
        'font-medium text-base',
        isActive
          ? 'text-neutral-700 dark:text-neutral-300'
          : 'text-neutral-400 transition-colors hover:text-neutral-600 dark:text-neutral-600 dark:hover:text-neutral-400'
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </Link>
  )
}
