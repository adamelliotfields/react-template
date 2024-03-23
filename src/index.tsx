import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'

const BORDER = true

const rootEl = document.getElementById('root')
if (rootEl) {
  const root = createRoot(rootEl)
  root.render(
    <StrictMode>
      <App border={BORDER} />
    </StrictMode>
  )
}
