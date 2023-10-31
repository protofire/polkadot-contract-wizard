import { useCallback, useState } from 'react'

import { useLocalDbContext } from '@/context/LocalDbContext'
import { getErrorMessage } from '@/utils/error'
import { ChainId } from '@/services/useink/chains'
import { UserContractDetails } from '@/domain'

interface UseAddDeployment {
  userContractsFromApi: (
    userAddress: string,
    networkId?: ChainId
  ) => Promise<UserContractDetails[] | undefined>
  isLoading: boolean
  error?: string
}

export function useListDeployments(): UseAddDeployment {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const { apiDeploymentsRepository: deploymentsRepository } =
    useLocalDbContext()

  const userContractsFromApi = useCallback(
    async (userAddress: string, network?: ChainId) => {
      setIsLoading(true)
      setError(undefined)

      try {
        const deployments = await deploymentsRepository.findBy(
          userAddress,
          network
        )
        return deployments
      } catch (e) {
        setError(getErrorMessage(e))
      } finally {
        setIsLoading(false)
      }
    },
    [deploymentsRepository]
  )

  return { userContractsFromApi, isLoading, error }
}
