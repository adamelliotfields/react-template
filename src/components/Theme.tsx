import { type ElementType, useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type ThemeName = 'light' | 'dark' | 'system'

type ThemeType = {
  name: ThemeName
  icon: ElementType
}

export interface ThemeProps {
  themes: ThemeType[]
  collapsed?: boolean
}

export default function Theme({ themes, collapsed = false }: ThemeProps) {
  const [selectedTheme, setSelectedTheme] = useState<ThemeType | null>(null)

  // On mount, read data-theme.
  // On change, write data-theme.
  useEffect(() => {
    const { documentElement } = window.document
    if (selectedTheme) {
      documentElement.setAttribute('data-theme', selectedTheme.name)
      return
    }
    const name = documentElement.getAttribute('data-theme') as ThemeName | null
    setSelectedTheme(themes.find((t) => t.name === name) ?? themes[0] ?? null)
  }, [themes, selectedTheme])

  const cycleTheme = () => {
    if (!themes.length) return
    const i = themes.findIndex((theme) => theme.name === selectedTheme?.name)
    const next = themes[(i + 1) % themes.length]
    if (next) setSelectedTheme(next)
  }

  // Show a single button when collapsed.
  if (collapsed) {
    const activeTheme = selectedTheme ?? themes[0] ?? null
    const Icon = activeTheme?.icon
    return (
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="mx-auto size-8"
        onClick={cycleTheme}
        aria-label="Cycle theme"
      >
        {Icon ? <Icon width="1.125em" height="1.125em" strokeWidth={1.5} /> : null}
      </Button>
    )
  }

  // Show a button group when expanded.
  return (
    <div className="grid grid-cols-3 gap-0 rounded-xl">
      {themes.map((theme) => {
        const { name, icon: Icon } = theme
        const isSelected = selectedTheme?.name === name
        return (
          <Button
            key={name}
            type="button"
            variant="ghost"
            size="icon-sm"
            className={cn(
              'mx-auto size-8 bg-transparent hover:text-foreground',
              isSelected && 'text-foreground'
            )}
            onClick={() => setSelectedTheme(theme)}
            aria-label={`Set ${name} theme`}
            aria-pressed={isSelected}
          >
            <Icon width="1.125em" height="1.125em" strokeWidth={1.5} />
          </Button>
        )
      })}
    </div>
  )
}
