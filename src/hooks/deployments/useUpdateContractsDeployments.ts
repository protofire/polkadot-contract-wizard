import { useCallback, useState } from 'react'

import { useLocalDbContext } from '@/context/LocalDbContext'
import { getErrorMessage } from '@/utils/error'
import { UpdateDeployment } from '@/domain/repositories/DeploymentRepository'

interface UseAddDeployment {
  updateContractsFromApi: (
    deployed: UpdateDeployment
  ) => Promise<{ data: string } | undefined>
  isLoading: boolean
  error?: string
}

export function useUpdateContractsDeployments(): UseAddDeployment {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const { deploymentsRepository } = useLocalDbContext()

  const updateContractsFromApi = useCallback(
    async (deployed: UpdateDeployment) => {
      setIsLoading(true)
      setError(undefined)
      try {
        const deployments = await deploymentsRepository.updateBy({
          contractAddress: deployed.contractAddress,
          userAddress: deployed.userAddress,
          network: deployed.network,
          contractName: deployed.contractName,
          hidden: deployed.hidden
        })
        return deployments
      } catch (e) {
        setError(getErrorMessage(e))
      } finally {
        setIsLoading(false)
      }
    },
    [deploymentsRepository]
  )

  return { updateContractsFromApi, isLoading, error }
}
