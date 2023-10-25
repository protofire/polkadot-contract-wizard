import { UserContractDetails } from '@/domain'
import { MyDatabase } from '.'
import { IUserContractsRepository } from '@/domain/repositories/IUserContractsRepository'
import { ChainId } from '../useink/chains'
import { UpdateDeployment } from '@/domain/repositories/DeploymentRepository'
import { deploymentItemToUserContractDetails } from '../transformers/toUserContractDetails'

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
    network: ChainId,
    filterBy?: FilterType
  ): Promise<UserContractDetails[]> {
    if (filterBy === undefined) {
      return await this.db.userContracts
        .where({ userAddress, network })
        .toArray()
    }

    const query = this.db.userContracts.where({ userAddress, network })
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
    deployments: UserContractDetails[]
  ): Promise<UserContractDetails[]> {
    await this.db.userContracts.bulkAdd(deployments)
    return await this.list(userAddress)
  }

  async updateBy(deployed: UpdateDeployment): Promise<number> {
    const { userAddress, network, address } = deployed
    return await this.db.userContracts
      .where({ userAddress, blockchain: network, address })
      .modify({ name: deployed.name, hidden: deployed.hidden })
  }
}
