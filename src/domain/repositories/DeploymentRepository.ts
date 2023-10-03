import { ChainId } from '@/infrastructure/useink/chains'
import { TokenType } from '../TokenType'

// TODO implement on API
type ContractType = TokenType | 'custom'

export interface DeploymentItem {
  contractName: TokenType
  contractAddress: string
  network: ChainId
  codeId: string
  userAddress: string
  date: string
}

export interface IDeploymentsRepository<A, B> {
  add: (deployment: DeploymentItem) => Promise<A>
  findBy: (userAddress: string, networkId?: ChainId) => Promise<B>
}
