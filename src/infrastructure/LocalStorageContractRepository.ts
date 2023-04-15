import { Contract } from '@/domain/Contract'

export interface AccountContractsMap {
  [account: string]: Array<Contract>
}

export interface StorageContractRepository {
  searchBy(accountAddress: string): Contract[]
  save(accountAddress: string, smartContract: Contract): void
}

export class LocalStorageContractRepository
  implements StorageContractRepository
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

    this.update({ [accountAddress]: accountContracts.concat(smartContract) })
  }

  private update(accountContracts: AccountContractsMap): void {
    const mapContracts = this.search()

    localStorage.setItem(
      this.localStorageKey,
      JSON.stringify({ ...mapContracts, ...accountContracts })
    )
  }
}
