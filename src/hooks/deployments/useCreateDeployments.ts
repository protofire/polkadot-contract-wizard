import { useCallback, useState } from 'react'

import { useLocalDbContext } from '@/context/LocalDbContext'
import { useAddUserContracts } from '@/hooks/userContracts/useAddUserContracts'
import { deploymentItemToUserContractDetails } from '@/services/transformers/toUserContractDetails'
import { UserContractDetailsDraft } from '@/domain'

interface UseServiceAddDeployment {
  newDeployment: (
    deployment: UserContractDetailsDraft
  ) => Promise<string | undefined>
  isLoading: boolean
  error?: string
}

export function useCreateDeployments(): UseServiceAddDeployment {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const { deploymentsRepository } = useLocalDbContext()
  const { addUserContract } = useAddUserContracts()

  const newDeployment = useCallback(
    async (
      deployment: UserContractDetailsDraft
    ): Promise<string | undefined> => {
      setError(undefined)
      setIsLoading(true)

      try {
        const response = await deploymentsRepository.add(deployment)

        setIsLoading(false)
        if (response.error) {
          throw Error(response.error.message)
        }
        const newDeployId = response['data']
        const userContract = deploymentItemToUserContractDetails(
          deployment,
          newDeployId
        )
        addUserContract(userContract)

        return newDeployId
      } catch (error) {
        const _errorMsg = `An error occurred when trying to upload the deployed contract on the server`
        setError(_errorMsg)
        console.error(error)
      }
    },
    [addUserContract, deploymentsRepository]
  )

  return { newDeployment, isLoading, error }
}
