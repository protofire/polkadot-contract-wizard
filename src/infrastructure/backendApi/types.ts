import { TokenType } from '@/domain'

export interface RootApiResponse<T> {
  data: T
  error?: { message: string }
}

export interface ContractCompiledRaw {
  code_id: string
  metadata: string
  wasm: Uint8Array
}

export type ContractCompiledResponse = RootApiResponse<ContractCompiledRaw>

export type AllowedFeatures =
  | TokenType
  | 'pausable'
  | 'ownable'
  | 'access-control'
