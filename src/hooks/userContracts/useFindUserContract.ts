import { useLocalDbContext } from '@/context/LocalDbContext'
import { UserContractDetails } from '@/domain'
import { useEffect, useState } from 'react'

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
  const { userContractsRepository } = useLocalDbContext()

  useEffect(() => {
    if (!uuid) return

    setIsLoading(true)
    userContractsRepository
      .get(uuid)
      .then(response => {
        setUserContract(response)
        setRequested(true)
      })
      .finally(() => setIsLoading(false))
  }, [userContractsRepository, uuid])

  return { userContract, isLoading, requested }
}
