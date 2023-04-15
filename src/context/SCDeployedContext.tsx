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

const SCDeployedContext = createContext<{
  contracts: Contract[]
  addContract(accountAddress: string, smartContract: Contract): void
}>(
  {} as {
    contracts: Contract[]
    addContract(accountAddress: string, smartContract: Contract): void
  }
)

export function DeployContextProvider({
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
    <SCDeployedContext.Provider value={{ contracts, addContract: save }}>
      {children}
    </SCDeployedContext.Provider>
  )
}
export const useContractsContext = () => useContext(SCDeployedContext)
