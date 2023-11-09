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
  external: boolean // Contracts not deployed by PCW are custom and external
  hidden: boolean
}

export type UserContractDetailsDraft = Omit<
  UserContractDetails,
  'uuid' | 'external'
>

export type UserContractDetailsWithAbi = Omit<UserContractDetails, 'abi'> & {
  abi: AbiSource
}
