import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'

import { Contract, SmartContractEvents } from '@/domain'
import { StorageContractRepository } from '@/infrastructure/LocalStorageContractRepository'
import { useNetworkAccountsContext } from './NetworkAccountsContext'

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
  const {
    state: { currentAccount }
  } = useNetworkAccountsContext()

  const loadContractRepository = useCallback(() => {
    if (!currentAccount) return

    setContracts(repository.searchBy(currentAccount))
  }, [currentAccount, repository])

  useEffect(() => {
    loadContractRepository()
  }, [loadContractRepository, repository])

  // update repository when events triggered
  useEffect(() => {
    document.addEventListener(
      SmartContractEvents.contractInstatiate,
      loadContractRepository
    )

    return () => {
      document.removeEventListener(
        SmartContractEvents.contractInstatiate,
        loadContractRepository
      )
    }
  }, [loadContractRepository])

  const save = useCallback(
    (accountAddress: string, smartContract: Contract) => {
      repository.save(accountAddress, smartContract)

      document.dispatchEvent(
        new CustomEvent(SmartContractEvents.contractInstatiate)
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
