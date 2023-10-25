import { useCallback, useState } from 'react'

import { useLocalDbContext } from '@/context/LocalDbContext'
import { useAddUserContracts } from '@/hooks/userContracts/useAddUserContracts'
import { deploymentItemToUserContractDetails } from '@/services/transformers/toUserContractDetails'
import { UserContractDetailsDraft } from '@/domain'
import { OnCallbacks } from '@/domain/common/OnCallbacks'

interface NewDeploymentProps extends OnCallbacks<string> {
  userContract: UserContractDetailsDraft
}

interface UseServiceAddDeployment {
  newDeployment: (props: NewDeploymentProps) => Promise<string | undefined>
  isLoading: boolean
  error?: string
}

export function useCreateDeployments(): UseServiceAddDeployment {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const { deploymentsRepository } = useLocalDbContext()
  const { addUserContract } = useAddUserContracts()

  const newDeployment = useCallback(
    async ({
      userContract,
      onSuccessCallback,
      onErrorCallback
    }: NewDeploymentProps): Promise<string | undefined> => {
      setError(undefined)
      setIsLoading(true)

      try {
        const response = await deploymentsRepository.add(userContract)
        if (response.error) {
          throw Error(response.error.message)
        }

        const newDeployId = response['data']
        const userContractWithId = deploymentItemToUserContractDetails(
          userContract,
          newDeployId
        )
        addUserContract(userContractWithId)

        onSuccessCallback?.(newDeployId)
        return newDeployId
      } catch (error) {
        const _errorMsg = `An error occurred when trying to upload the deployed contract on the server`
        setError(_errorMsg)
        onErrorCallback?.(error)
      } finally {
        setIsLoading(false)
      }
    },
    [addUserContract, deploymentsRepository]
  )

  return { newDeployment, isLoading, error }
}
