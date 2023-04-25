import { TokenType } from '@/types'

export interface RootObject<T> {
  data: T
  error?: { message: string }
}

export interface ContractMetadata {
  code_id: string
  metadata: string
  wasm: Uint8Array
}

export type ContractCompiled = RootObject<ContractMetadata>

export type AllowedFeatures =
  | TokenType
  | 'pausable'
  | 'ownable'
  | 'access-control'
