import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'

import { Contract, SmartContractEvents, isContractDeployed } from '@/domain'
import { useNetworkAccountsContext } from './NetworkAccountsContext'
import { useMultiEventListener } from '@/hooks/useMultipleEventListener'
import { useLocalDbContext } from './LocalDbContext'

interface StorageContractContextValues {
  contracts: Contract[]
  addContractToStorage(accountAddress: string, smartContract: Contract): void
}

const StorageContractsContext = createContext<StorageContractContextValues>(
  {} as StorageContractContextValues
)

export function StorageContractsProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [contracts, setContracts] = useState<Contract[]>([])
  const { accountConnected } = useNetworkAccountsContext()
  const { compilationRepository } = useLocalDbContext()

  const loadContractRepository = useCallback(() => {
    if (!accountConnected?.address) return

    setContracts(compilationRepository.searchBy(accountConnected.address))
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

  const save = useCallback(
    (accountAddress: string, smartContract: Contract) => {
      compilationRepository.save(accountAddress, smartContract)

      document.dispatchEvent(
        new CustomEvent(
          isContractDeployed(smartContract)
            ? SmartContractEvents.contractInstatiate
            : SmartContractEvents.contractCompiled
        )
      )
    },
    [compilationRepository]
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
