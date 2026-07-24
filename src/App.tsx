import { Route, Router, Switch } from 'wouter'

import Demo from '@/components/Demo'
import NotFound from '@/components/NotFound'

const { BASE_URL } = import.meta.env

export default function App() {
  return (
    <Router base={BASE_URL}>
      <Switch>
        <Route path="/" component={Demo} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}
