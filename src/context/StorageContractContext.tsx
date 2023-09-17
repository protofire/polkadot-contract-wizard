import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'

import { Contract, SmartContractEvents, isContractDeployed } from '@/domain'
import { StorageContractRepository } from '@/infrastructure/LocalStorageContractRepository'
import { useNetworkAccountsContext } from './NetworkAccountsContext'
import { useMultiEventListener } from '@/hooks/useMultipleEventListener'

interface StorageContractContextValues {
  contracts: Contract[]
  addContractToStorage(accountAddress: string, smartContract: Contract): void
}

const StorageContractsContext = createContext<StorageContractContextValues>(
  {} as StorageContractContextValues
)

export function StorageContractsProvider({
  children,
  repository
}: {
  children: React.ReactNode
  repository: StorageContractRepository
}) {
  const [contracts, setContracts] = useState<Contract[]>([])
  const { accountConnected } = useNetworkAccountsContext()

  const loadContractRepository = useCallback(() => {
    if (!accountConnected?.address) return

    setContracts(repository.searchBy(accountConnected.address))
  }, [accountConnected?.address, repository])

  useEffect(() => {
    loadContractRepository()
  }, [loadContractRepository, repository])

  // update repository when events triggered
  useMultiEventListener(
    [
      SmartContractEvents.contractCompiled,
      SmartContractEvents.contractInstatiate
    ],
    loadContractRepository
  )

  const save = useCallback(
    (accountAddress: string, smartContract: Contract) => {
      repository.save(accountAddress, smartContract)

      document.dispatchEvent(
        new CustomEvent(
          isContractDeployed(smartContract)
            ? SmartContractEvents.contractInstatiate
            : SmartContractEvents.contractCompiled
        )
      )
    },
    [repository]
  )

  return (
    <StorageContractsContext.Provider
      value={{ contracts, addContractToStorage: save }}
    >
      {children}
    </StorageContractsContext.Provider>
  )
}
export const useStorageContractsContext = () =>
  useContext(StorageContractsContext)
