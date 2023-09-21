import { useCallback, useState } from 'react'

import { DeploymentItem } from '@/domain/repositories/DeploymentRepository'
import { useLocalDbContext } from '@/context/LocalDbContext'
import { getErrorMessage } from '@/utils/error'

interface UseAddDeployment {
  userContractsFromApi: (
    userAddress: string
  ) => Promise<DeploymentItem[] | undefined>
  isLoading: boolean
  error?: string
}

export function useListContractDeployments(): UseAddDeployment {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const { deploymentsRepository } = useLocalDbContext()

  const userContractsFromApi = useCallback(
    async (userAddress: string) => {
      setIsLoading(true)
      setError(undefined)

      try {
        const deployments = await deploymentsRepository.findBy(userAddress)

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
