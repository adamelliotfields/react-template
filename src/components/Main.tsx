import { Route, Switch } from 'wouter'

import Counter from '@/components/Counter'
import DotPattern from '@/components/ui/dot-pattern'

export default function Main() {
  return (
    <main className="py-8 container flex flex-col grow md:max-w-5xl">
      {/* dot pattern has absolute positioning */}
      <div className="relative flex grow items-center justify-center rounded-lg bg-white shadow-xs border border-dashed border-neutral-300 dark:bg-neutral-900 dark:border-neutral-700">
        <Switch>
          <Route path="/">
            <>
              <Counter className="z-10" />
              <DotPattern className="z-0 mask-[radial-gradient(circle,white_0%,transparent_75%)]" />
            </>
          </Route>
          <Route>
            <div className="flex flex-col items-center space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">404</h2>
              <p className="text-base md:text-lg">Not Found</p>
            </div>
          </Route>
        </Switch>
      </div>
    </main>
  )
}
