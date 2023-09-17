import { ChainId } from '@/infrastructure/useink/chains'

export interface DeploymentRaw {
  contract_name: string
  contract_address: string
  network: ChainId
  code_id: string
  user_address: string
}

export interface DeploymentsRepository<R> {
  add: (deployment: DeploymentRaw) => Promise<R>
  findBy: (userAddress: string, networkId?: ChainId) => Promise<DeploymentRaw>
}
