import { Route, Switch, useRouter } from 'wouter'

import BlurFade from '@/components/ui/blur-fade'

export default function Main() {
  const { base } = useRouter()
  const prefix = base === '/' ? '' : base

  return (
    <main className="py-8 container flex flex-col grow md:max-w-5xl">
      <div className="flex grow items-center justify-center rounded-lg bg-white shadow-sm border border-dashed border-neutral-300 dark:bg-neutral-900 dark:border-neutral-700">
        <div className="m-4 space-y-2 flex flex-col items-center text-center">
          <Switch>
            <Route path="/">
              <img
                className="h-auto w-full max-w-xs rounded-lg"
                src={`${prefix}/placeholder.svg`}
                alt="Placeholder"
              />
              <BlurFade delay={0.2} inView>
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Coming Soon!</h2>
              </BlurFade>
              <BlurFade delay={0.4} inView>
                <p className="text-base md:text-lg">Stay tuned 🚀</p>
              </BlurFade>
            </Route>
            <Route>
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">404</h2>
              <p className="text-base md:text-lg">Not Found</p>
            </Route>
          </Switch>
        </div>
      </div>
    </main>
  )
}
