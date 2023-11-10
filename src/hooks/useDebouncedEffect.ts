import { useEffect, useRef, useState } from 'react'

type AsyncFunction = (...args: unknown[]) => Promise<void>

/**
 * Executes a provided asynchronous function after a specified delay,
 * but only if the dependencies have changed. This is useful for
 * scenarios where you want to delay execution of an effect until the user has stopped
 * performing a certain action, such as typing in a text field.
 *
 * @example
 * useDebouncedEffect(
 *   async () => {
 *     const data = await fetchData();
 *     setData(data);
 *   },
 *   500,
 *   [fetchData]
 * );
 *
 * @returns {void}
 */
export function useDebouncedEffect(
  effect: AsyncFunction,
  delay: number, // milliseconds
  deps: unknown[]
): void {
  const callback = useRef(effect)
  const [counter, setCounter] = useState(0)

  // Remember the latest effect
  useEffect(() => {
    callback.current = effect
  }, [effect])

  // Increment counter when dependencies change.
  useEffect(() => {
    setCounter(prevCounter => prevCounter + 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  // Execute the effect after the delay if the counter has changed.
  useEffect(() => {
    const handler = setTimeout(() => callback.current(), delay)

    return () => clearTimeout(handler)
  }, [counter, delay]) // re-run effect if delay changes
}
