import { Route, Switch } from 'wouter'

export default function Main() {
  return (
    <main className="py-8 container flex flex-col grow md:max-w-5xl">
      <div className="flex grow items-center justify-center rounded-lg bg-white shadow-sm border border-dashed border-neutral-300 dark:bg-neutral-900 dark:border-neutral-700">
        <div className="flex flex-col items-center text-center space-y-2">
          <Switch>
            <Route path="/">
              <img className="h-auto w-full max-w-xs rounded-lg" src="/placeholder.svg" />
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Coming Soon!</h2>
              <p className="text-base md:text-lg">Stay tuned 🚀</p>
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
