import { GetServiceData, CompileApiResponse } from '@/types'
import { useCallback, useState } from 'react'
import { API_RESPONSE } from 'src/data'

export type DataCompiledContract = CompileApiResponse['contract']
type ReturnValue = GetServiceData
const DELAY = 6000 // 6sec

// TODO , this will be pointing to a RUST backend API
export const useCreateCompilation = (): ReturnValue & {
  compileContract: () => Promise<DataCompiledContract>
} => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()

  const compileContract =
    useCallback(async (): Promise<DataCompiledContract> => {
      setError(undefined)
      setIsLoading(true)

      return new Promise(resolve => {
        setTimeout(() => {
          setIsLoading(false)
          resolve({
            ...API_RESPONSE.contract,
            wasm: new Uint8Array(API_RESPONSE.contract.wasm)
          })
        }, DELAY)
      })
    }, [])

  return { compileContract, isLoading, error }
}
