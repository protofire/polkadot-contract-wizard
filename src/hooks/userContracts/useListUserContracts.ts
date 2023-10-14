import { useCallback, useState } from 'react'

import { useLocalDbContext } from '@/context/LocalDbContext'
import { UserContractDetails, WalletConnectionEvents } from '@/domain'
import { useListContractDeployments } from '../deployments/useListContractsDeployments'
import { useOnceEffect } from '../useOnceEffect'
import { useMultiEventListener } from '../useMultipleEventListener'
import { ChainId } from '@/infrastructure/useink/chains'
import { ContractTableItem } from '@/domain/wizard/ContractTableItem'

interface UseAddDeployment {
  userContracts: UserContractDetails[]
  isLoading: boolean
  error?: string
}

export function useListUserContracts(
  userAddress: string | undefined,
  networkConnected: ChainId,
  filterCondition?: (item: ContractTableItem) => boolean
): UseAddDeployment {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const { userContractsRepository } = useLocalDbContext()
  const { userContractsFromApi } = useListContractDeployments()
  const [userContracts, setUserContracts] = useState<UserContractDetails[]>([])

  const filterContracts = useCallback(
    (contracts: UserContractDetails[]) => {
      if (filterCondition != undefined) {
        return contracts.filter(filterCondition)
      }
      return contracts
    },
    [filterCondition]
  )

  const readInitialData = useCallback(async () => {
    if (!userAddress) return
    setIsLoading(true)
    const userContracts = await userContractsRepository.searchBy(
      userAddress,
      networkConnected
    )

    if (userContracts.length > 0) {
      setUserContracts([...filterContracts(userContracts)])
      setIsLoading(false)
      return
    }

    userContractsFromApi(userAddress, networkConnected)
      .then(async deployments => {
        deployments &&
          (await userContractsRepository.bulkAddByUser(
            userAddress,
            deployments
          ))
        userContractsRepository
          .searchBy(userAddress, networkConnected)
          .then(response => {
            setUserContracts([...filterContracts(response)])
          })
      })
      .catch(setError)
  }, [
    userAddress,
    userContractsFromApi,
    networkConnected,
    userContractsRepository,
    filterContracts
  ])

  const { reset } = useOnceEffect(() => {
    readInitialData()
  }, [
    userAddress,
    userContracts,
    networkConnected,
    userContractsFromApi,
    userContractsRepository
  ])

  useMultiEventListener(
    [
      WalletConnectionEvents.changeAccountAddress,
      WalletConnectionEvents.networkChanged,
      WalletConnectionEvents.updateContractList
    ],
    () => reset()
  )

  useMultiEventListener([WalletConnectionEvents.updateContractList], () =>
    readInitialData()
  )

  return { userContracts, isLoading, error }
}
