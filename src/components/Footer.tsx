import clsx from 'clsx'
import { HTMLAttributes } from 'react'

import Container from './Container'

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  border?: boolean
}

export default function Footer({ border = false, className, ...rest }: FooterProps) {
  return (
    <footer
      className={clsx(
        'z-20 text-neutral-500 bg-neutral-50 dark:bg-neutral-950',
        border && 'border-t border-neutral-300 dark:border-neutral-700',
        className
      )}
      {...rest}
    >
      <Container className="h-14 p-4 flex items-center justify-center" border={border}>
        <span className="font-mono text-sm">&copy;{new Date().getFullYear()}</span>
      </Container>
    </footer>
  )
}
