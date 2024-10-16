import { Router } from 'wouter'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Main from '@/components/Main'
import { ThemeProvider } from '@/components/Theme'

const { PROD, VITE_HOMEPAGE } = import.meta.env
const base = VITE_HOMEPAGE ? new URL(VITE_HOMEPAGE).pathname : '/'

export default function App() {
  return (
    <Router base={PROD && base !== '/' ? base : undefined}>
      <ThemeProvider>
        <Header />
        <Main />
        <Footer />
      </ThemeProvider>
    </Router>
  )
}
