import { ChainId } from '@/services/useink/chains'
import { TokenType } from '../TokenType'

export type ContractType = TokenType | 'custom'
export type UpdateDeployment = Partial<DeploymentItem>

export interface DeploymentItem {
  contractName: string
  contractAddress: string
  network: ChainId
  codeId: string
  userAddress: string
  txHash?: string
  date: string
  contractType: ContractType
  externalAbi?: Record<string, unknown>
  hidden: boolean
}

export interface IDeploymentsRepository<A, B> {
  add: (deployment: DeploymentItem) => Promise<A>
  findBy: (userAddress: string, networkId?: ChainId) => Promise<B>
  updateBy: (deployment: UpdateDeployment) => Promise<A>
}
