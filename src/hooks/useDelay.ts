import { useEffect, useState } from 'react'

const DEFAULT_MS = 500 // 0.5 seg

export function useDelay(delay: number = DEFAULT_MS): boolean {
  const [isDelayFinished, setIsDelayFinished] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDelayFinished(true)
    }, delay)

    // Clean timer if component is unmounted
    return () => clearTimeout(timer)
  }, [delay])

  return isDelayFinished
}
