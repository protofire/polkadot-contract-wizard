import { useLocalDbContext } from '@/context/LocalDbContext'
import { useNetworkAccountsContext } from '@/context/NetworkAccountsContext'
import { Contract, SmartContractEvents } from '@/domain'
import { useCallback, useEffect, useState } from 'react'
import { useMultiEventListener } from '../useMultipleEventListener'

export function useListCompiledContracts() {
  const [contracts, setContracts] = useState<Contract[]>([])
  const { accountConnected } = useNetworkAccountsContext()
  const { compilationRepository } = useLocalDbContext()

  const loadContractRepository = useCallback(() => {
    if (!accountConnected?.address) return

    setContracts(compilationRepository.searchBy(accountConnected.address) || [])
  }, [accountConnected?.address, compilationRepository])

  useEffect(() => {
    loadContractRepository()
  }, [loadContractRepository, compilationRepository])

  // update repository when events triggered
  useMultiEventListener(
    [
      SmartContractEvents.contractCompiled,
      SmartContractEvents.contractInstatiate
    ],
    loadContractRepository
  )

  return { contracts }
}
