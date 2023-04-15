import { TokenType } from '@/types'

interface ContractDetails {
  code_id: number
  type: TokenType
  status: 'compiled' | 'deployed'
  address?: string
  name?: string
  blockainId?: string
}
type ContractCompiled = Omit<ContractDetails, 'address' | 'blockchainId'> & {
  status: 'compiled'
}
type ContractDeployed = Required<ContractDetails> & {
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
