import { TokenType } from '@/domain/TokenType'
import { ContractCompiledRaw } from '@/services'

export type ContractMetadata = ContractCompiledRaw

interface ContractDetails {
  code_id: string
  type: TokenType
  status: 'compiled' | 'deployed'
  address?: string
  name?: string
  blockchain?: string
  txHash?: string
}
type ContractCompiled = Omit<ContractDetails, 'address' | 'blockchain'> & {
  status: 'compiled'
}
export type ContractDeployed = Required<ContractDetails> & {
  status: 'deployed'
}
export type Contract = ContractCompiled | ContractDeployed

export function isContractCompiled(
  contract: Contract
): contract is ContractCompiled {
  return contract.status === 'compiled'
}

export function isContractDeployed(
  contract: Contract
): contract is ContractDeployed {
  return contract.status === 'deployed'
}
