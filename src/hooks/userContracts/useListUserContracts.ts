import { useCallback, useEffect, useState } from 'react'

import { useLocalDbContext } from '@/context/LocalDbContext'
import { UserContractDetails } from '@/domain'
import { useListContractDeployments } from '../deployments/useListContractsDeployments'
import { useOnceEffect } from '../useOnceEffect'

interface UseAddDeployment {
  userContracts: UserContractDetails[]
  isLoading: boolean
  error?: string
}

export function useListUserContracts(
  userAddress: string | undefined
): UseAddDeployment {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const { userContractsRepository } = useLocalDbContext()
  const { userContractsFromApi } = useListContractDeployments()
  const [userContracts, setUserContracts] = useState<UserContractDetails[]>([])

  const readInitialData = useCallback(async () => {
    if (!userAddress) return
    setIsLoading(true)
    const userContracts = await userContractsRepository.list(userAddress)

    if (userContracts.length > 0) {
      setUserContracts(userContracts)
      setIsLoading(false)
      return
    }

    userContractsFromApi(userAddress)
  }, [userAddress, userContractsFromApi, userContractsRepository])

  const { reset } = useOnceEffect(() => {
    readInitialData()
  })

  return { userContracts, isLoading, error }
}
