import { TokenType } from '@/domain/TokenType'
import { ContractCompiledRaw } from '@/services'
import { ContractType } from '@/domain/repositories/DeploymentRepository'
import { ChainId } from '@/services/useink/chains'

export type ContractMetadata = ContractCompiledRaw

export interface UserContractDetails {
  userAddress: string
  blockchain: ChainId
  address: string
  txHash: string | undefined
  codeHash: string
  type: ContractType
  name: string
  date: string
  abi?: Record<string, unknown>
  external: boolean // Contracts not deployed by PCW are custom and external
  hidden: boolean
}

export type ContractCompiled = Pick<
  UserContractDetails,
  'userAddress' | 'codeHash' | 'name' | 'name'
> & {
  type: TokenType
}
