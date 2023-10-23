import { useCallback, useState } from 'react'

import { DeploymentItem } from '@/domain/repositories/DeploymentRepository'
import { useLocalDbContext } from '@/context/LocalDbContext'
import { getErrorMessage } from '@/utils/error'
import { ChainId } from '@/services/useink/chains'

interface UseAddDeployment {
  userContractsFromApi: (
    userAddress: string,
    networkId?: ChainId
  ) => Promise<DeploymentItem[] | undefined>
  isLoading: boolean
  error?: string
}

export function useListDeployments(): UseAddDeployment {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const { deploymentsRepository } = useLocalDbContext()

  const userContractsFromApi = useCallback(
    async (userAddress: string, networkId?: ChainId) => {
      setIsLoading(true)
      setError(undefined)

      try {
        const deployments = await deploymentsRepository.findBy(
          userAddress,
          networkId
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
