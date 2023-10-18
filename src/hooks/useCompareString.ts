import { useState, useEffect } from 'react'

interface Props {
  text1: string | undefined
  text2: string | undefined
  errorMessage?: string
}

interface UseCompareString {
  error: string | null
  isValid: boolean
}

export function useCompareString({
  text1,
  text2,
  errorMessage = 'Texts do not match.'
}: Props): UseCompareString {
  const [error, setError] = useState<string | null>(null)
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    setError(null)
    setIsValid(false)

    if (!text1 || !text2) return

    if (text1 !== text2) {
      setError(errorMessage)
    }
    setIsValid(true)
  }, [errorMessage, text1, text2])

  return {
    error,
    isValid
  }
}
