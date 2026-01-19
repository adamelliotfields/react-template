import typography from '@tailwindcss/typography'
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  plugins: [typography],
  theme: {
    extend: {
      typography: (_) => ({
        DEFAULT: {
          css: {
            // remove backticks
            'code::before': {
              content: '""'
            },
            'code::after': {
              content: '""'
            }
          }
        }
      })
    }
  }
}

export default config
