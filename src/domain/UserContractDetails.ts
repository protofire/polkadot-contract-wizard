import { ContractCompiledRaw } from '@/services'
import { ContractType } from '@/domain/repositories/DeploymentRepository'
import { ChainId } from '@/services/useink/chains'
import { AbiSource } from './Metadata'

export type ContractMetadata = ContractCompiledRaw

export interface UserContractDetails {
  uuid: string
  name: string
  address: string
  network: ChainId
  codeId: string
  userAddress: string
  txHash?: string
  date: string
  type: ContractType
  abi?: Record<string, unknown>
  // TODO
  external: boolean // Represents a contract that has not been aggregated by the connected wallet accounts.
  hidden: boolean
}

export type UserContractDetailsDraft = Omit<
  UserContractDetails,
  'uuid' | 'external'
>

export type UserContractDetailsWithAbi = Omit<UserContractDetails, 'abi'> & {
  abi: AbiSource
}
