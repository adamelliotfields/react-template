import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import { Button } from '@/components/ui/button'

const handleClick = vi.fn()

beforeEach(() => {
  render(
    <Button onClick={handleClick} data-testid="button">
      Click me
    </Button>
  )
})

// RTL only auto-cleans when using a test framework with globals (e.g., Jest)
afterEach(cleanup)

describe('Button', () => {
  test('renders the button', () => {
    expect(screen.getByTestId('button').textContent).toBe('Click me')
  })

  test('handles click events', async () => {
    const user = userEvent.setup()
    const button = screen.getByTestId('button')
    await user.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
