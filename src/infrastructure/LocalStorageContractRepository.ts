import { Contract } from '@/domain/Contract'

export interface AccountContractsMap {
  [account: string]: Array<Contract>
}

export interface ICompiledContractRepository {
  searchBy(accountAddress: string): Contract[]
  save(accountAddress: string, smartContract: Contract): void
}

export class LocalStorageContractRepository
  implements ICompiledContractRepository
{
  localStorageKey = 'repositoryContracts'

  search(): AccountContractsMap {
    const mapContracts = localStorage.getItem(this.localStorageKey)

    if (!mapContracts) {
      return {}
    }

    return JSON.parse(mapContracts) as AccountContractsMap
  }

  searchBy(accountAddress: string): Contract[] {
    const mapContracts = this.search()

    if (!(accountAddress in mapContracts)) {
      return []
    }

    return mapContracts[accountAddress]
  }

  save(accountAddress: string, smartContract: Contract): void {
    const accountContracts = this.searchBy(accountAddress)

    this.update({
      [accountAddress]: this.addOrReplaceContract(
        accountContracts,
        smartContract
      )
    })
  }

  private update(accountContracts: AccountContractsMap): void {
    const mapContracts = this.search()

    localStorage.setItem(
      this.localStorageKey,
      JSON.stringify({ ...mapContracts, ...accountContracts })
    )
  }

  private addOrReplaceContract(contracts: Contract[], newContract: Contract) {
    const index = contracts.findIndex(
      item => item.code_id === newContract.code_id
    )

    if (index === -1) {
      return [...contracts, newContract]
    } else {
      const updatedList = [...contracts]
      updatedList[index] = newContract

      return updatedList
    }
  }
}
