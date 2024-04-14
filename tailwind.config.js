import typography from '@tailwindcss/typography'
import animate from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  plugins: [animate, typography],
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
