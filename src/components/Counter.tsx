import{ useState } from 'react'
import { Minus, Plus, RotateCcw } from 'lucide-react'

import BlurFade from '@/components/ui/blur-fade'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export interface CounterProps {
  className?: string
}

export default function Counter({ className }: CounterProps) {
  const [count, setCount] = useState(0)
  const increment = () => setCount(count + 1)
  const decrement = () => setCount(count > 0 ? count - 1 : 0)
  const reset = () => setCount(0)

  return (
    <Card className={cn('text-center', className)}>
      <CardHeader>
        <CardTitle className="text-lg">Counter</CardTitle>
      </CardHeader>
      <CardContent className="font-mono text-2xl" data-testid="count">
        {count}
      </CardContent>
      <CardFooter>
        <div className="mt-1.5 gap-2 flex">
          {/* minus button */}
          <BlurFade delay={0.1} inView>
            <Button
              className="p-2 h-8 shadow-md active:shadow-none active:scale-[97.5%]"
              onClick={decrement}
              aria-label="minus"
              disabled={count === 0}
            >
              <Minus />
            </Button>
          </BlurFade>

          {/* reset button */}
          <BlurFade delay={0.2} inView>
            <Button
              className="p-2 h-8 shadow-md active:shadow-none active:scale-[97.5%]"
              onClick={reset}
              aria-label="reset"
              disabled={count === 0}
            >
              <RotateCcw />
            </Button>
          </BlurFade>

          {/* plus button */}
          <BlurFade delay={0.3} inView>
            <Button
              className="p-2 h-8 shadow-md active:shadow-none active:scale-[97.5%]"
              onClick={increment}
              aria-label="plus"
              disabled={count === Number.MAX_SAFE_INTEGER}
            >
              <Plus />
            </Button>
          </BlurFade>
        </div>
      </CardFooter>
    </Card>
  )
}
