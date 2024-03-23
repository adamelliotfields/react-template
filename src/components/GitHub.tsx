import clsx from 'clsx'
import { Loader } from 'lucide-react'
import { type AnchorHTMLAttributes, useEffect, useState } from 'react'
import axios from 'redaxios'

import sleep from '../lib/sleep'

export interface GitHubProps {
  className?: string
}

export default function GitHub({ className }: GitHubProps) {
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(true)
  const [stars, setStars] = useState(0)

  const classNames = 'text-lg font-medium text-neutral-900 dark:text-neutral-100'

  useEffect(() => {
    const gitHubFetch = async () => {
      try {
        await sleep(2000)
        const url = 'https://api.github.com/repos/adamelliotfields/react-template'
        const { data } = await axios.get(url)
        setStars(data.stargazers_count)
      } catch (err: unknown) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }
    gitHubFetch()
  }, [])

  if (loading) {
    return <Loader size="1em" className={clsx('text-[28px] animate-spin', className)} />
  }

  if (error) {
    return (
      <p className={clsx(classNames, className)}>
        The app is working, but GitHub is down. Check the{' '}
        <GitHubLink className="underline" href="https://www.githubstatus.com/">
          status
        </GitHubLink>
        . 🚨
      </p>
    )
  }

  return (
    <p className={clsx(classNames, className)}>
      Welcome 👋! This is a demo of{' '}
      <GitHubLink href="https://github.com/adamelliotfields/react-template">
        <code>react-template</code>
      </GitHubLink>
      , starred by <span className="font-mono">{stars}</span> user
      {stars === 1 ? '' : 's'}! 🌟
    </p>
  )
}

function GitHubLink({
  children,
  className,
  href
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}
