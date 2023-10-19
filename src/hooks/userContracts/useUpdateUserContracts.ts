import { useState } from 'react'
import { useLocalDbContext } from '@/context/LocalDbContext'
import { useUpdateContractsDeployments } from '../deployments/useUpdateContractsDeployments'
import { UpdateDeployment } from '@/domain/repositories/DeploymentRepository'

export function useUpdateUserContracts() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const { userContractsRepository } = useLocalDbContext()
  const { updateContractsFromApi } = useUpdateContractsDeployments()

  const updateContract = async ({
    deployment,
    successCallback
  }: {
    deployment: UpdateDeployment
    successCallback?: () => void
  }) => {
    setIsLoading(true)
    updateContractsFromApi(deployment)
      .then(() => userContractsRepository.updateBy(deployment))
      .then(successCallback)
      .catch(error => {
        setError(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
  return { updateContract, isLoading, error }
}
