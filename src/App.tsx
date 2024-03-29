import { Router } from 'wouter'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Main from '@/components/Main'

const { PROD, VITE_HOMEPAGE } = import.meta.env
const base = VITE_HOMEPAGE ? new URL(VITE_HOMEPAGE).pathname : '/'

export default function App() {
  return (
    <Router base={PROD && base !== '/' ? base : undefined}>
      <div className="h-full flex flex-col bg-neutral-50 dark:bg-neutral-950">
        <Header />
        <Main />
        <Footer />
      </div>
    </Router>
  )
}
