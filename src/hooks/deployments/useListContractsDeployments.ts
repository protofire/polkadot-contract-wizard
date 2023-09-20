import { useEffect, useState } from 'react'

import { DeploymentItem } from '@/domain/repositories/DeploymentRepository'
import { useNetworkAccountsContext } from '@/context/NetworkAccountsContext'
import { useLocalDbContext } from '@/context/LocalDbContext'

interface UseAddDeployment {
  listDeployments: DeploymentItem[]
  isLoading: boolean
  error?: string
}

export function useListContractDeployments(): UseAddDeployment {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const { deploymentsRepository } = useLocalDbContext()
  const { accountConnected } = useNetworkAccountsContext()
  const [listDeployments, setListDeployments] = useState<DeploymentItem[]>([])

  useEffect(() => {
    if (!accountConnected?.address) return

    setIsLoading(true)
    deploymentsRepository
      .findBy(accountConnected?.address)
      .then(result => setListDeployments(result))
      .catch(e => setError(e))
      .finally(() => setIsLoading(false))
  }, [accountConnected?.address, deploymentsRepository])

  return { listDeployments, isLoading, error }
}
