import { Router } from 'wouter'

import Demo from '@/components/Demo'

const { BASE_URL } = import.meta.env

export default function App() {
  return (
    <Router base={BASE_URL}>
      <Demo />
    </Router>
  )
}
