import { useCallback, useState } from 'react'
import { useLocalDbContext } from '@/context/LocalDbContext'
import { useUpdateContractsDeployments } from '../deployments/useUpdateContractsDeployments'
import { UpdateDeployment } from '@/domain/repositories/DeploymentRepository'
import { UserContractDetails } from '@/domain'
import { useReportError } from '../useReportError'

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

export function useFillMetadata() {
  const { apiCompileContractRepository, userContractsRepository } =
    useLocalDbContext()
  const { reportErrorWithToast } = useReportError()

  const fillMetadata = useCallback(
    async (
      userContract: UserContractDetails
    ): Promise<UserContractDetails['abi'] | undefined> => {
      if (userContract.abi) return

      try {
        const compiled = await apiCompileContractRepository.search(
          userContract.codeId
        )
        const abi = JSON.parse(compiled['data'].metadata)

        if (abi) userContractsRepository.addMetadata(userContract.uuid, abi)

        return abi
      } catch (e) {
        reportErrorWithToast(e)
      }
    },
    [
      apiCompileContractRepository,
      reportErrorWithToast,
      userContractsRepository
    ]
  )
  return { fillMetadata }
}
