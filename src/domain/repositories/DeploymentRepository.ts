import { ChainId } from '@/services/useink/chains'
import { TokenType } from '../TokenType'
import {
  UserContractDetails,
  UserContractDetailsDraft
} from '../UserContractDetails'

export type ContractType = TokenType | 'custom'
export type UpdateDeployment = Partial<UserContractDetailsDraft>

export interface IDeploymentsRepository<A, B> {
  add: (deployment: UserContractDetailsDraft) => Promise<A>
  findBy: (userAddress: string, network?: ChainId) => Promise<B>
  updateBy: (deployment: UpdateDeployment) => Promise<A>
  get(uuid: string): Promise<UserContractDetails | undefined>
}
