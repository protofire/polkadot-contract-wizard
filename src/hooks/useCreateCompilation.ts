import { useCallback, useState } from 'react'

import {
  CompileContractApiRepository,
  CreateCompileContract
} from '@/infrastructure/CompileContractApiRepository'
import { GetServiceData, TokenType, SecurityOfToken } from '@/types'
import { BACKEND_API } from '@/constants/index'
import { ContractMetadata } from '@/infrastructure'
import { useAppNotificationContext } from 'src/context/AppNotificationContext'

type ReturnValue = GetServiceData

const compilerApi = new CompileContractApiRepository(BACKEND_API)
type UseCreateCompilation = Omit<CreateCompileContract, 'features'> & {
  tokenType: TokenType
  security?: SecurityOfToken
}

export const useCreateCompilation = (): ReturnValue & {
  compileContract: (
    props: UseCreateCompilation
  ) => Promise<ContractMetadata | void>
} => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const { addNotification } = useAppNotificationContext()

  const compileContract = useCallback(
    async ({
      address,
      code,
      tokenType,
      security
    }: UseCreateCompilation): Promise<ContractMetadata | void> => {
      setError(undefined)
      setIsLoading(true)

      try {
        const response = await compilerApi.create({
          address,
          code,
          features: [tokenType, security]
        })

        setIsLoading(false)
        if (response.error) throw Error(response.error)

        return response['data']
      } catch (error) {
        const _errorMsg = `An error occurred when trying to compile the server contract on the server, ${error}`
        setError(_errorMsg)
        addNotification({
          message: _errorMsg,
          type: 'error'
        })
        console.error(error)
      }
    },
    [addNotification]
  )

  return { compileContract, isLoading, error }
}
