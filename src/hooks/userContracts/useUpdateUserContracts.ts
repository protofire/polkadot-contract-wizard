import { useState } from 'react'
import { useLocalDbContext } from '@/context/LocalDbContext'
import { ContractTableItem } from '@/domain/wizard/ContractTableItem'
import { useUpdateContractsDeployments } from '../deployments/useUpdateContractsDeployments'

export function useUpdateUserContracts() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const { userContractsRepository } = useLocalDbContext()
  const { updateContractsFromApi } = useUpdateContractsDeployments()

  const updateContract = async ({
    contract,
    successCallback
  }: {
    contract: ContractTableItem
    successCallback?: () => void
  }) => {
    setIsLoading(true)
    updateContractsFromApi(contract)
      .then(() => userContractsRepository.updateBy(contract))
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
