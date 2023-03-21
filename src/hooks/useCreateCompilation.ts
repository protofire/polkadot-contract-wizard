import { GetServiceData, CompileApiResponse } from '@types'
import { useCallback, useState } from 'react'
import { API_RESPONSE } from '@data-tests'

export type DataCompiledContract = Pick<
  CompileApiResponse['contract'],
  'code_id' | 'wasm'
>
type ReturnValue = GetServiceData
const DELAY = 2000 // 2sec

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
          resolve(API_RESPONSE.contract)
        }, DELAY)
      })
    }, [])

  return { compileContract, isLoading, error }
}
