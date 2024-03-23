import { Route, Switch } from 'wouter'

import Container from './Container'
import Counter from './Counter'
import GitHub from './GitHub'
import Lipsum from './Lipsum'

export interface MainProps {
  border?: boolean
}

export default function Main({ border = false }: MainProps) {
  return (
    // header and footer are 56px + 1px border (if enabled)
    <Container
      as="main"
      className="min-h-[calc(100vh_-_114px)] p-4 flex flex-col"
      border={border}
    >
      <Switch>
        <Route path="/">
          <div className="flex flex-col items-center">
            <GitHub className="mb-4" />
            <Counter />
            <hr className="w-full my-8 border-neutral-200 dark:border-neutral-800" />
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
