import { useCallback, useState } from 'react'

import { DeploymentItem } from '@/domain/repositories/DeploymentRepository'
import { useLocalDbContext } from '@/context/LocalDbContext'

interface UseAddDeployment {
  newDeployment: (deployment: DeploymentItem) => Promise<string | undefined>
  isLoading: boolean
  error?: string
}

export function useCreateContractDeployments(): UseAddDeployment {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const { deploymentsRepository } = useLocalDbContext()

  const newDeployment = useCallback(
    async (deployment: DeploymentItem): Promise<string | undefined> => {
      setError(undefined)
      setIsLoading(true)

      try {
        const response = await deploymentsRepository.add(deployment)

        setIsLoading(false)
        if (response.error) {
          console.log(response.error.message)
          throw Error(response.error.message)
        }
        return response['data']
      } catch (error) {
        const _errorMsg = `An error occurred when trying to compile the smart contract on the server`
        setError(_errorMsg)
        console.error(error)
      }
    },
    [deploymentsRepository]
  )

  return { newDeployment, isLoading, error }
}
