import { useCallback, useState } from 'react'

import { useLocalDbContext } from '@/context/LocalDbContext'
import { UserContractDetails, WalletConnectionEvents } from '@/domain'
import { useListContractDeployments } from '../deployments/useListContractsDeployments'
import { useOnceEffect } from '../useOnceEffect'
import { useMultiEventListener } from '../useMultipleEventListener'
import { ChainId } from '@/services/useink/chains'

interface UseAddDeployment {
  userContracts: UserContractDetails[]
  isLoading: boolean
  error?: string
}

export function useListUserContracts(
  userAddress: string | undefined,
  networkConnected: ChainId
): UseAddDeployment {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const { userContractsRepository } = useLocalDbContext()
  const { userContractsFromApi } = useListContractDeployments()
  const [userContracts, setUserContracts] = useState<UserContractDetails[]>([])

  const readInitialData = useCallback(async () => {
    if (!userAddress) return
    setIsLoading(true)
    const userContracts = await userContractsRepository.searchBy(
      userAddress,
      networkConnected
    )

    if (userContracts.length > 0) {
      setUserContracts(userContracts)
      setIsLoading(false)
      return
    }

    userContractsFromApi(userAddress, networkConnected).then(
      async deployments => {
        deployments &&
          (await userContractsRepository.bulkAddByUser(
            userAddress,
            deployments
          ))
        userContractsRepository
          .searchBy(userAddress, networkConnected)
          .then(setUserContracts)
      }
    )
  }, [
    networkConnected,
    userAddress,
    userContractsFromApi,
    userContractsRepository
  ])

  const { reset } = useOnceEffect(() => {
    readInitialData()
  }, [
    userAddress,
    networkConnected,
    userContractsFromApi,
    userContractsRepository
  ])

  useMultiEventListener(
    [
      WalletConnectionEvents.changeAccountAddress,
      WalletConnectionEvents.networkChanged
    ],
    () => reset()
  )

  return { userContracts, isLoading, error }
}
