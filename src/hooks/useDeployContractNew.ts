import { GetServiceData } from '@/types'
import { useState } from 'react'

type ReturnValue = GetServiceData & {
  //   deployContract: () => void
}

export function useDeployContract(): ReturnValue {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()

  return { isLoading, error }
}
