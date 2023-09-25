import { UserContractDetails } from '@/domain'
import { MyDatabase } from '.'
import { IUserContractsRepository } from '@/domain/repositories/IUserContractsRepository'
import { ChainId } from '../useink/chains'
import { DeploymentItem } from '@/domain/repositories/DeploymentRepository'

export class UserContractsRepository implements IUserContractsRepository {
  private db: MyDatabase

  constructor(db: MyDatabase) {
    this.db = db
  }

  async add(userContract: UserContractDetails): Promise<string> {
    return this.db.userContracts.add(userContract)
  }

  async list(userAddress: string): Promise<UserContractDetails[]> {
    return await this.db.userContracts.where({ userAddress }).toArray()
  }

  async searchBy(
    userAddress: string,
    blockchain: ChainId
  ): Promise<UserContractDetails[]> {
    return await this.db.userContracts
      .where({ userAddress, blockchain })
      .toArray()
  }

  async bulkAddByUser(
    userAddress: string,
    deployments: DeploymentItem[]
  ): Promise<UserContractDetails[]> {
    const data: UserContractDetails[] = deployments.map(d => ({
      userAddress: d.userAddress,
      blockchain: d.network,
      address: d.contractAddress,
      txHash: '',
      codeHash: d.codeId,
      type: d.contractName,
      name: d.contractName,
      date: new Date().toISOString(),
      external: false
    }))

    await this.db.userContracts.bulkAdd(data)

    return await this.list(userAddress)
  }
}
