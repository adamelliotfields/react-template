import { type ElementType, useEffect, useState } from 'react'

type ThemeName = 'light' | 'dark' | 'system'

type ThemeType = {
  name: ThemeName
  icon: ElementType
}

export interface ThemeProps {
  themes: ThemeType[]
}

export default function Theme({ themes }: ThemeProps) {
  const [selectedTheme, setSelectedTheme] = useState<ThemeType | null>(null)

  // On mount, read data-theme.
  // When user changes selection, write data-theme.
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
    const i = themes.findIndex((t) => t.name === selectedTheme?.name)
    const next = themes[(i + 1) % themes.length]
    if (next) setSelectedTheme(next)
  }

  return (
    <button className="cursor-pointer" type="button" onClick={cycleTheme} aria-label="Toggle theme">
      {themes.map(({ name, icon: Icon }) => (
        <Icon
          key={name}
          width="1.125em"
          height="1.125em"
          strokeWidth={1.5}
          style={{ display: selectedTheme?.name === name ? 'block' : 'none' }}
        />
      ))}
    </button>
  )
}
