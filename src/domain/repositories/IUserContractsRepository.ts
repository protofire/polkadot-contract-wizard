import { ChainId } from '@/services/useink/chains'
import { UserContractDetails } from '../UserContractDetails'
import { DeploymentItem } from './DeploymentRepository'
import { ContractTableItem } from '../wizard/ContractTableItem'
import { FilterType } from '@/infrastructure/localDB/UserContractsRepository'

export interface IUserContractsRepository {
  add: (deployment: UserContractDetails) => Promise<string>
  list: (userAddress: string) => Promise<UserContractDetails[]>
  searchBy: (
    userAddress: string,
    networkId: ChainId,
    filterBy?: FilterType
  ) => Promise<UserContractDetails[]>
  bulkAddByUser(
    userAddress: string,
    deployments: DeploymentItem[]
  ): Promise<UserContractDetails[]>

  updateBy(deployment: ContractTableItem): Promise<number>
}
