import { useCallback, useState } from 'react'

import { useLocalDbContext } from '@/context/LocalDbContext'
import { getErrorMessage } from '@/utils/error'
import { ContractTableItem } from '@/domain/wizard/ContractTableItem'

interface UseAddDeployment {
  updateContractsFromApi: (
    contract: ContractTableItem
  ) => Promise<{ data: string } | undefined>
  isLoading: boolean
  error?: string
}

export function useUpdateContractsDeployments(): UseAddDeployment {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const { deploymentsRepository } = useLocalDbContext()

  const updateContractsFromApi = useCallback(
    async (contract: ContractTableItem) => {
      setIsLoading(true)
      setError(undefined)
      try {
        const deployments = await deploymentsRepository.updateBy(contract)
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
