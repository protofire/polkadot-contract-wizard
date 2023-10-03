import { useCallback, useState } from 'react'

import {
  ApiCompileContractRepository,
  CompileContractBody
} from '@/infrastructure/backendApi/ApiCompileContractRepository'
import { GetServiceData } from '@/types'
import { TokenType, SecurityOfToken } from '@/domain'
import { BACKEND_API } from '@/constants/index'
import { AllowedFeatures, ContractCompiledRaw } from '@/infrastructure'
import { useAppNotificationContext } from '@/context/AppNotificationContext'

type ReturnValue = GetServiceData

const compileContractApi = new ApiCompileContractRepository(BACKEND_API)
type UseCreateCompilation = Omit<CompileContractBody, 'features'> & {
  tokenType: TokenType
  isPausable: boolean
  security?: SecurityOfToken
}

// To comply with API that receives a list of AllowedFeatures
function getAllowedFeaturesApi(
  tokenType: TokenType,
  security: SecurityOfToken | undefined,
  isPausable: boolean
): AllowedFeatures[] {
  const allowedFeatures = [tokenType as AllowedFeatures]

  if (security === 'access_control_enumerable' || security === 'access_control')
    allowedFeatures.push('access-control')

  if (isPausable) allowedFeatures.push('pausable')

  return allowedFeatures
}

export const useCompileContract = (): ReturnValue & {
  compileContract: (
    props: UseCreateCompilation
  ) => Promise<ContractCompiledRaw | void>
} => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const { addNotification } = useAppNotificationContext()

  const compileContract = useCallback(
    async ({
      address,
      code,
      tokenType,
      security,
      isPausable
    }: UseCreateCompilation): Promise<ContractCompiledRaw | void> => {
      setError(undefined)
      setIsLoading(true)

      try {
        const response = await compileContractApi.create({
          address,
          code,
          features: getAllowedFeaturesApi(tokenType, security, isPausable)
        })

        setIsLoading(false)
        if (response.error) {
          console.log(response.error.message)
          throw Error(response.error.message)
        }

        return response['data']
      } catch (error) {
        const _errorMsg = `An error occurred when trying to compile the smart contract on the server`
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
