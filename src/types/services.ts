export interface GetServiceData {
  error: string | undefined
  isLoading: boolean
}

export type CompileApiResponse = {
  contract: {
    code_id: string
    metadata: string
    wasm: Uint8Array
  }
  error: string | null
}
