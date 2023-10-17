import { useState, useCallback } from 'react'

interface UseCompareCodes {
  error: string | null
  compare: (code1?: string, code2?: string) => void
}

export function useCompareString(errorMessage: string): UseCompareCodes {
  const [error, setError] = useState<string | null>(null)

  const compare = useCallback(
    (code1?: string, code2?: string) => {
      setError(null)

      if (!code1 || !code2) return

      if (code1 !== code2) {
        setError(errorMessage)
      }
    },
    [errorMessage]
  )

  return {
    error,
    compare
  }
}
