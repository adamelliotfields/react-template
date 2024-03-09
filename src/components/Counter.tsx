import { useAtom } from 'jotai'
import { RESET } from 'jotai/utils'
import { Minus, Plus, RotateCcw } from 'lucide-react'

import { countAtom } from '../atoms'

const Counter = () => {
  const [count, setCount] = useAtom(countAtom)

  const increment = () => setCount(count + 1)
  const decrement = () => setCount(count > 0 ? count - 1 : 0)
  const reset = () => setCount(RESET)

  return (
    <>
      <span className="mb-4 font-mono text-2xl" data-testid="count">
        {count}
      </span>
      <div className="flex items-center space-x-2">
        {/* minus button */}
        <button
          type="button"
          className="p-2 rounded-sm bg-gray-800 dark:bg-gray-200"
          onClick={decrement}
          aria-label="minus"
        >
          <Minus className="w-4 h-4 text-gray-100 dark:text-gray-900" />
        </button>

        {/* reset button */}
        <button
          type="button"
          className="p-2 rounded-sm bg-gray-800 dark:bg-gray-200"
          onClick={reset}
          aria-label="reset"
        >
          <RotateCcw className="w-4 h-4 text-gray-100 dark:text-gray-900" />
        </button>

        {/* plus button */}
        <button
          type="button"
          className="p-2 rounded-sm bg-gray-800 dark:bg-gray-200"
          onClick={increment}
          aria-label="plus"
        >
          <Plus className="w-4 h-4 text-gray-100 dark:text-gray-900" />
        </button>
      </div>
    </>
  )
}

export default Counter
