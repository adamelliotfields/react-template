import { Router } from 'wouter'

import Footer from './components/Footer'
import Header from './components/Header'
import Main from './components/Main'

const { PROD, VITE_HOMEPAGE } = import.meta.env
const base = VITE_HOMEPAGE ? new URL(VITE_HOMEPAGE).pathname : '/'

const links = [
  { href: '/', children: 'Home' },
  { href: '/blog', children: 'Blog' },
  { href: '/about', children: 'About' },
  { href: '/contact', children: 'Contact' }
]

export default function App() {
  return (
    <Router base={PROD && base !== '/' ? base : undefined}>
      <Header links={links} />
      <Main />
      <Footer />
    </Router>
  )
}
