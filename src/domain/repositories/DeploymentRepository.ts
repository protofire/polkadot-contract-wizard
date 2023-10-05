import { ChainId } from '@/infrastructure/useink/chains'
import { TokenType } from '../TokenType'

export type ContractType = TokenType | 'custom'

export interface DeploymentItem {
  contractName: TokenType
  contractAddress: string
  network: ChainId
  codeId: string
  userAddress: string
  txHash?: string
  date: string
  contractType: ContractType
  externalAbi?: Record<string, unknown>
}

export interface IDeploymentsRepository<A, B> {
  add: (deployment: DeploymentItem) => Promise<A>
  findBy: (userAddress: string, networkId?: ChainId) => Promise<B>
}
