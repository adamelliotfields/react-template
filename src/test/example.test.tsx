import { afterEach, beforeEach, describe, expect, test } from 'bun:test'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useAtom } from 'jotai'
import { RESET, atomWithReset } from 'jotai/utils'
import { Minus, Plus, RotateCcw } from 'lucide-react'

const countAtom = atomWithReset(0)

const Counter = () => {
  const [count, setCount] = useAtom(countAtom)
  const increment = () => setCount(count + 1)
  const decrement = () => setCount(count > 0 ? count - 1 : 0)
  const reset = () => setCount(RESET)

  return (
    <>
      <h2 className="mb-2 text-2xl font-bold tracking-wider">Counter</h2>
      <span className="mb-4 font-mono text-2xl" data-testid="count">
        {count}
      </span>
      <div className="flex items-center space-x-2">
        {/* minus button */}
        <button
          type="button"
          className="p-2 rounded-sm bg-neutral-800 dark:bg-neutral-200"
          onClick={decrement}
          aria-label="minus"
        >
          <Minus className="w-4 h-4 text-neutral-100 dark:text-neutral-900" />
        </button>

        {/* reset button */}
        <button
          type="button"
          className="p-2 rounded-sm bg-neutral-800 dark:bg-neutral-200"
          onClick={reset}
          aria-label="reset"
        >
          <RotateCcw className="w-4 h-4 text-neutral-100 dark:text-neutral-900" />
        </button>

        {/* plus button */}
        <button
          type="button"
          className="p-2 rounded-sm bg-neutral-800 dark:bg-neutral-200"
          onClick={increment}
          aria-label="plus"
        >
          <Plus className="w-4 h-4 text-neutral-100 dark:text-neutral-900" />
        </button>
      </div>
    </>
  )
}

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
