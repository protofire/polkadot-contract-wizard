import { TokenType } from '@/types'

export interface RootApiResponse<T> {
  data: T
  error?: { message: string }
}

export interface ContractResponse {
  code_id: string
  metadata: string
  wasm: Uint8Array
}

export type ContractCompiled = RootApiResponse<ContractResponse>

export type AllowedFeatures =
  | TokenType
  | 'pausable'
  | 'ownable'
  | 'access-control'
