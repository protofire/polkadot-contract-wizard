import { useEffect, useRef, DependencyList } from 'react'

export function useOnceEffect<TDeps extends DependencyList>(
  callback: () => void,
  dependencies: TDeps
) {
  const hasRun = useRef(false)

  useEffect(() => {
    if (!hasRun.current) {
      if (dependencies.every(dep => dep !== undefined && dep !== null)) {
        callback()
        hasRun.current = true
      }
    }
  }, [callback, dependencies])

  const reset = () => {
    hasRun.current = false
  }

  return { reset }
}
