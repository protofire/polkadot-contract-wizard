import { useEffect, useRef, useCallback } from 'react'

export function useOnceEffect(callback: () => void) {
  const hasRun = useRef(false)

  const runCallback = useCallback(() => {
    if (!hasRun.current) {
      callback()
      hasRun.current = true
    }
  }, [callback])

  useEffect(() => {
    runCallback()
  }, [runCallback])

  const reset = useCallback(() => {
    hasRun.current = false
  }, [])

  return { reset }
}
