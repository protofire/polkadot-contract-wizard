import { useCallback } from 'react'

import { useLocalDbContext } from '@/context/LocalDbContext'
import { UserContractDetails } from '@/domain'

interface UseAddDeployment {
  addUserContract: (deployment: UserContractDetails) => void
}

export function useAddUserContracts(): UseAddDeployment {
  const { userContractsRepository } = useLocalDbContext()

  const addUserContract = useCallback(
    (deployment: UserContractDetails) => {
      userContractsRepository.add(deployment)
    },
    [userContractsRepository]
  )

  return { addUserContract }
}
