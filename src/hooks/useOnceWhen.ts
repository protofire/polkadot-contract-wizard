import { useRef, useEffect } from 'react'

interface Props {
  condition: boolean
  callback: () => void
}

export function useOnceWhen({ condition, callback }: Props) {
  const hasBeenCalled = useRef(false)

  useEffect(() => {
    if (condition && !hasBeenCalled.current) {
      callback()
      hasBeenCalled.current = true
    }
  }, [condition, callback])

  return hasBeenCalled.current
}
