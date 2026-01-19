import { resolve } from 'node:path'

import tailwind from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// TODO: change this
const BASE_PATH = '/react-template'

export default defineConfig(({ mode }) => {
  return {
    base: mode === 'production' ? BASE_PATH : '/',
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
