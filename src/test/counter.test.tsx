import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'

import Counter from '@/components/Counter'

beforeEach(() => {
  render(<Counter />)
})

// RTL only auto-cleans when using a test framework with globals (e.g., Jest)
afterEach(cleanup)

describe('Counter', () => {
  test('renders the counter', () => {
    expect(screen.getByTestId('count').textContent).toBe('0')
  })

  test('increments the count', async () => {
    const plusButton = screen.getByRole('button', { name: 'plus' })
    await userEvent.click(plusButton)
    expect(screen.getByTestId('count').textContent).toBe('1')
  })

  test('resets the count', async () => {
    const plusButton = screen.getByRole('button', { name: 'plus' })
    const resetButton = screen.getByRole('button', { name: 'reset' })
    await userEvent.click(plusButton)
    await userEvent.click(resetButton)
    expect(screen.getByTestId('count').textContent).toBe('0')
  })

  test('does not decrement below zero', async () => {
    const minusButton = screen.getByRole('button', { name: 'minus' })
    await userEvent.click(minusButton)
    expect(screen.getByTestId('count').textContent).toBe('0')
  })
})
