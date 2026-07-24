import { House } from 'lucide-react'
import { Link } from 'wouter'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2 bg-background text-center text-foreground">
      <p className="font-semibold text-primary text-sm tracking-wide">404</p>
      <h1 className="font-bold text-3xl tracking-tight">Not Found</h1>
      <p className="text-muted-foreground">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Button asChild className="mt-2">
        <Link href="/">
          <House />
          Go home
        </Link>
      </Button>
    </div>
  )
}
