export interface RootObject<T> {
  data: T
  error?: string
}

export interface ContractMetadata {
  code_id: string
  metadata: string
  wasm: Uint8Array
}

export type ContractCompiled = RootObject<ContractMetadata>
