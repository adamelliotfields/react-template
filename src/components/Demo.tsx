import { Monitor, Moon, Sun } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { Link, useLocation, useRoute } from 'wouter'

import Theme from './Theme'

const themes = [
  { name: 'light' as const, icon: Sun },
  { name: 'dark' as const, icon: Moon },
  { name: 'system' as const, icon: Monitor }
]

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.2 }
}

function Home() {
  return (
    <>
      <h1 className="mb-4 text-3xl font-bold">Welcome</h1>
      <p className="text-neutral-600 dark:text-neutral-400">A React demo app.</p>
    </>
  )
}

function About() {
  return (
    <>
      <h1 className="mb-4 text-3xl font-bold">About</h1>
      <p className="text-neutral-600 dark:text-neutral-400">
        This is a React demo application scaffolded with Vite, TypeScript, and Tailwind CSS. It
        showcases routing with Wouter and theme switching with localStorage persistence.
      </p>
    </>
  )
}

function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <h1 className="mb-4 text-6xl font-bold">404</h1>
      <p className="mb-6 text-neutral-600 dark:text-neutral-400">Page not found</p>
      <Link href="/" className="text-blue-600 hover:underline dark:text-blue-400">
        Go home
      </Link>
    </div>
  )
}

type NavLinkProps = {
  href: string
  children: React.ReactNode
}

function NavLink({ href, children }: NavLinkProps) {
  const [location] = useLocation()
  const isActive = location === href

  return (
    <Link
      href={href}
      className={
        isActive
          ? 'font-medium text-neutral-900 dark:text-neutral-100'
          : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100'
      }
    >
      {children}
    </Link>
  )
}

// https://github.com/molefrog/wouter?tab=readme-ov-file#how-can-add-animated-route-transitions
function AnimatedRoutes() {
  const [location] = useLocation()
  const [isHome] = useRoute('/')
  const [isAbout] = useRoute('/about')
  const isNotFound = !isHome && !isAbout

  return (
    <AnimatePresence mode="wait">
      {isHome && (
        <motion.div key="home" {...pageTransition}>
          <Home />
        </motion.div>
      )}
      {isAbout && (
        <motion.div key="about" {...pageTransition}>
          <About />
        </motion.div>
      )}
      {isNotFound && (
        <motion.div key={location} {...pageTransition}>
          <NotFound />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Demo() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
          <Link href="/" className="text-xl font-bold">
            React Template
          </Link>
          <nav className="flex items-center gap-6">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/about">About</NavLink>
            <Theme themes={themes} />
          </nav>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-8">
        <AnimatedRoutes />
      </main>

      <footer className="border-t border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-center px-4 text-sm text-neutral-500">
          {`© ${new Date().getFullYear()}`}
        </div>
      </footer>
    </div>
  )
}
