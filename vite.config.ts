import { resolve } from 'node:path'

import tailwind from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => {
  return {
    base: '/',
    build: { target: 'esnext' },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      }
    },
    plugins: mode === 'test' ? [] : [react(), tailwind()],
    test: {
      environment: 'happy-dom'
    }
  }
})
