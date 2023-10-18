import { useCallback, useEffect, useState } from 'react'

import { useLocalDbContext } from '@/context/LocalDbContext'
import {
  UserContractDetails,
  UserContractEvents,
  WalletConnectionEvents
} from '@/domain'
import { useListContractDeployments } from '../deployments/useListContractsDeployments'
import { useOnceEffect } from '../useOnceEffect'
import { useMultiEventListener } from '../useMultipleEventListener'
import { ChainId } from '@/infrastructure/useink/chains'
import { FilterType } from '@/infrastructure/localDB/UserContractsRepository'

interface UseAddDeployment {
  userContracts: UserContractDetails[]
  isLoading: boolean
  error?: string
}

export function useListUserContracts(
  userAddress: string | undefined,
  networkConnected: ChainId,
  filterBy: FilterType = { hidden: false }
): UseAddDeployment {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const { userContractsRepository } = useLocalDbContext()
  const { userContractsFromApi } = useListContractDeployments()
  const [userContracts, setUserContracts] = useState<UserContractDetails[]>([])

  const readInitialData = useCallback(async () => {
    if (!userAddress || !networkConnected) return
    setIsLoading(true)
    const userContracts = await userContractsRepository.searchBy(
      userAddress,
      networkConnected,
      filterBy
    )

    if (userContracts.length > 0) {
      setUserContracts(userContracts)
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
          .searchBy(userAddress, networkConnected, filterBy)
          .then(response => {
            setUserContracts(response)
          })
      })
      .catch(setError)
  }, [
    userAddress,
    userContractsFromApi,
    networkConnected,
    userContractsRepository,
    filterBy
  ])

  useEffect(() => {
    readInitialData()
  }, [filterBy, readInitialData])

  useMultiEventListener(
    [
      WalletConnectionEvents.changeAccountAddress,
      WalletConnectionEvents.networkChanged,
      UserContractEvents.userContractUpdated
    ],
    () => readInitialData()
  )

  return { userContracts, isLoading, error }
}
