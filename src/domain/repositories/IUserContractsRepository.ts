import { ChainId } from '@/services/useink/chains'
import {
  UserContractDetails,
  UserContractDetailsDraft
} from '../UserContractDetails'
import { UpdateDeployment } from './DeploymentRepository'
import { FilterType } from '@/services/localDB/UserContractsRepository'

export interface IUserContractsRepository {
  add: (deployment: UserContractDetails) => Promise<string>
  list: (userAddress: string) => Promise<UserContractDetails[]>
  searchBy: (
    userAddress: string,
    network: ChainId,
    filterBy?: FilterType
  ) => Promise<UserContractDetails[]>
  bulkAddByUser(
    userAddress: string,
    deployments: UserContractDetailsDraft[]
  ): Promise<UserContractDetails[]>

  updateBy(deployment: UpdateDeployment): Promise<number>
}
