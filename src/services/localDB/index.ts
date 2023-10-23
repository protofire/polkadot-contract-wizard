import Dexie from 'dexie'

import { UserContractDetails } from '@/domain'

export class MyDatabase extends Dexie {
  public userContracts: Dexie.Table<UserContractDetails, string>

  constructor() {
    super('MyDatabase')

    this.version(1).stores({
      userContracts: '[userAddress+blockchain+address],blockchain,hidden,type'
    })

    this.userContracts = this.table('userContracts')
  }
}