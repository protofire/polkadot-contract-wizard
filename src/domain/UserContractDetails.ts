import { TokenType } from '@/domain/TokenType'
import { ContractCompiledRaw } from '@/infrastructure'

export type ContractMetadata = ContractCompiledRaw

export interface UserContractDetails {
  userAddress: string
  blockchain: string
  address: string
  txHash: string
  codeHash: string
  type?: TokenType
  name: string
  abi?: Record<string, unknown>
  date: string
  external: boolean
}

export type ContractCompiled = Pick<
  UserContractDetails,
  'userAddress' | 'codeHash' | 'name' | 'name'
> & {
  type: TokenType
}

// export type ContractDeployed = Required<ContractDetails> & {
//   status: 'deployed'
// }
// export type UserContracts = ContractCompiled | ContractDeployed

// export function isContractCompiled(
//   contract: UserContracts
// ): contract is ContractCompiled {
//   return contract.status === 'compiled'
// }

// export function isContractDeployed(
//   contract: UserContracts
// ): contract is ContractDeployed {
//   return contract.status === 'deployed'
// }
