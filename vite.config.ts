import react from '@vitejs/plugin-react-swc'
import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite'

export default defineConfig(({ mode }) => {
  const { VITE_HOMEPAGE } = loadEnv(mode, process.cwd())

  let base = '/'
  if (VITE_HOMEPAGE) {
    base = new URL(VITE_HOMEPAGE).pathname
  }

  return {
    base: mode === 'production' ? base : '/',
    build: {
      target: 'esnext'
    },
    plugins: [
      react({
        plugins: [['@swc-jotai/react-refresh', {}]]
      }),
      splitVendorChunkPlugin()
    ]
  }
})
