import clsx from 'clsx'
import { type HTMLAttributes, type PropsWithChildren } from 'react'

type As = 'div' | 'footer' | 'header' | 'main'

export interface ContainerProps extends PropsWithChildren<HTMLAttributes<HTMLElement>> {
  as?: As
  border?: boolean
  flex?: boolean
}

export default function Container({
  as = 'div',
  border = false,
  children,
  className,
  flex = true,
  ...rest
}: ContainerProps) {
  const Component = as
  return (
    <Component
      className={clsx(
        'w-full max-w-screen-lg mx-auto p-4',
        flex && 'flex',
        border && 'border-neutral-300 md:border-x dark:border-neutral-700',
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  )
}
