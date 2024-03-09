import { Route, Switch } from 'wouter'

import Container from './Container'
import Counter from './Counter'
import Lipsum from './Lipsum'

export default function Main() {
  return (
    // header and footer are 56px + 1px border
    <Container as="main" className="min-h-[calc(100vh_-_114px)] flex-col" border>
      <Switch>
        <Route path="/">
          <div className="flex flex-col items-center">
            <h2 className="my-2 text-2xl font-bold tracking-wider">Counter</h2>
            <Counter />
            <hr className="w-full my-8 border-neutral-200 dark:border-neutral-800" />
            <h2 className="mb-8 text-2xl font-bold tracking-wider">Lorem Ipsum</h2>
            <Lipsum />
          </div>
        </Route>
        <Route>
          <h1 className="text-2xl font-bold">Not Found</h1>
        </Route>
      </Switch>
    </Container>
  )
}
