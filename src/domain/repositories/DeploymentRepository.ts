import { ChainId } from '@/infrastructure/useink/chains'

export interface DeploymentItem {
  contractName: string
  contractAddress: string
  network: ChainId
  codeId: string
  userAddress: string
}

export interface DeploymentsRepository<A, B> {
  add: (deployment: DeploymentItem) => Promise<A>
  findBy: (userAddress: string, networkId?: ChainId) => Promise<B>
}
