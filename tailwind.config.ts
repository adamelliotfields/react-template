import typography from '@tailwindcss/typography'
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  plugins: [typography],
  theme: {
    container: {
      center: true,
      padding: '2rem'
    },
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
