import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'

export interface ContractDeployed {
  id: number
  type: string
  address?: string
  name?: string
  blockainId?: string
}
type ContractWithoutId = Omit<ContractDeployed, 'id'>

export interface SCDeployedRepository {
  search(): ContractDeployed[]
  save(smartContract: ContractDeployed): void
}

export class StorageDeploysRepository implements SCDeployedRepository {
  localStorageKey = 'repositoryDeploys'

  search(): ContractDeployed[] {
    const data = localStorage.getItem(this.localStorageKey)

    if (!data) {
      return []
    }

    return JSON.parse(data) as ContractDeployed[]
  }

  save(smartContract: ContractDeployed): void {
    const currentRepositoryWidget = this.search()

    localStorage.setItem(
      this.localStorageKey,
      JSON.stringify(currentRepositoryWidget.concat(smartContract))
    )
  }
}

const SCDeployedContext = createContext<{
  contractsDeployed: ContractDeployed[]
  addContract(smartContract: ContractWithoutId): void
}>(
  {} as {
    contractsDeployed: ContractDeployed[]
    addContract(smartContract: ContractWithoutId): void
  }
)

export function DeployContextProvider({
  children,
  repository
}: {
  children: React.ReactNode
  repository: SCDeployedRepository
}) {
  const [contractsDeployed, setContractsDeployed] = useState<
    ContractDeployed[]
  >([])

  useEffect(() => {
    setContractsDeployed(repository.search())
  }, [repository])

  const save = useCallback(
    (smartContract: ContractWithoutId) => {
      repository.save({ ...smartContract, id: new Date().getTime() })
    },
    [repository]
  )

  return (
    <SCDeployedContext.Provider
      value={{ contractsDeployed, addContract: save }}
    >
      {children}
    </SCDeployedContext.Provider>
  )
}
export const useContractsDeployedContext = () => useContext(SCDeployedContext)
