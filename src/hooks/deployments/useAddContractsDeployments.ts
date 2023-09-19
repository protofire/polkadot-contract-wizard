import { useCallback, useState } from 'react'

import { BACKEND_API } from '@/constants/index'
import { ApiDeploymentRepository } from '@/infrastructure/backendApi/ApiDeploymentRepository'
import { DeploymentItem } from '@/domain/repositories/DeploymentRepository'

const deploymentApi = new ApiDeploymentRepository(BACKEND_API)

interface UseAddDeployment {
  addDeployment: (deployment: DeploymentItem) => Promise<string | undefined>
  isLoading: boolean
  error?: string
}

export function useAddContractDeployments(): UseAddDeployment {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()

  const addDeployment = useCallback(
    async (deployment: DeploymentItem): Promise<string | undefined> => {
      setError(undefined)
      setIsLoading(true)

      try {
        const response = await deploymentApi.add(deployment)

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
    []
  )

  return { addDeployment, isLoading, error }
}
