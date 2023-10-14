import { UserContractDetails } from '@/domain'
import { MyDatabase } from '.'
import { IUserContractsRepository } from '@/domain/repositories/IUserContractsRepository'
import { ChainId } from '../useink/chains'
import {
  ContractType,
  DeploymentItem
} from '@/domain/repositories/DeploymentRepository'
import { ContractTableItem } from '@/domain/wizard/ContractTableItem'

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
      txHash: d.txHash,
      codeHash: d.codeId,
      type: d.contractType as ContractType,
      name: d.contractName,
      date: new Date().toISOString(),
      external: false,
      hidden: d.hidden
    }))
    await this.db.userContracts.bulkAdd(data)
    return await this.list(userAddress)
  }

  async updateBy(contract: ContractTableItem): Promise<number> {
    const { userAddress, blockchain, address } = contract
    return await this.db.userContracts
      .where({ userAddress, blockchain, address })
      .modify({ ...contract })
  }
}
