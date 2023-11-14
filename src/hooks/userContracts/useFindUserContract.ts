import { useLocalDbContext } from '@/context/LocalDbContext'
import { UserContractDetails } from '@/domain'
import { useCallback, useEffect, useState } from 'react'

interface UseFindUserContract {
  userContract: UserContractDetails | undefined
  isLoading: boolean | undefined
  requested: boolean
}

export function useFindUserContract(uuid: string): UseFindUserContract {
  const [userContract, setUserContract] = useState<
    UserContractDetails | undefined
  >()
  const [isLoading, setIsLoading] = useState(false)
  const [requested, setRequested] = useState(false)
  const {
    userContractsRepository,
    apiCompileContractRepository,
    apiDeploymentsRepository
  } = useLocalDbContext()

  const getUserContract = useCallback(
    async (uuid: UserContractDetails['uuid']) => {
      let knownUserContract = await userContractsRepository.get(uuid)

      if (!knownUserContract) {
        knownUserContract = await apiDeploymentsRepository.get(uuid)
      }

      return knownUserContract
    },
    [apiDeploymentsRepository, userContractsRepository]
  )

  useEffect(() => {
    if (!uuid) return

    setIsLoading(true)
    getUserContract(uuid)
      .then(async response => {
        if (response && !response?.abi) {
          const compiled = await apiCompileContractRepository.search(
            response.codeId
          )

          response.abi = JSON.parse(compiled['data'].metadata)
        }

        setUserContract(response)
        setRequested(true)
      })
      .finally(() => setIsLoading(false))
  }, [
    apiCompileContractRepository,
    getUserContract,
    userContractsRepository,
    uuid
  ])

  return { userContract, isLoading, requested }
}
