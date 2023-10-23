import { UserContractDetails } from '@/domain'
import { MyDatabase } from '.'
import { IUserContractsRepository } from '@/domain/repositories/IUserContractsRepository'
import { ChainId } from '../useink/chains'
import {
  ContractType,
  DeploymentItem,
  UpdateDeployment
} from '@/domain/repositories/DeploymentRepository'

export type FilterType = Pick<
  Partial<UserContractDetails>,
  'hidden' | 'type' | 'external'
>

type Props = keyof FilterType

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
    blockchain: ChainId,
    filterBy?: FilterType
  ): Promise<UserContractDetails[]> {
    if (filterBy === undefined) {
      return await this.db.userContracts
        .where({ userAddress, blockchain })
        .toArray()
    }

    const query = this.db.userContracts.where({ userAddress, blockchain })
    for (const prop in filterBy) {
      if (filterBy?.hasOwnProperty(prop)) {
        query.and(
          (userContract: UserContractDetails) =>
            userContract[prop as Props] === filterBy[prop as Props]
        )
      }
    }
    return await query.toArray()
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
      codeId: d.codeId,
      type: d.contractType as ContractType,
      name: d.contractName,
      date: new Date().toISOString(),
      external: false,
      hidden: d.hidden
    }))
    await this.db.userContracts.bulkAdd(data)
    return await this.list(userAddress)
  }

  async updateBy(deployed: UpdateDeployment): Promise<number> {
    const { userAddress, network, contractAddress } = deployed
    return await this.db.userContracts
      .where({ userAddress, blockchain: network, address: contractAddress })
      .modify({ name: deployed.contractName, hidden: deployed.hidden })
  }
}
