import { useCallback, useState } from 'react'

import {
  CompileContractApiRepository,
  CompileContractBody
} from '@/infrastructure/CompileContractApiRepository'
import { GetServiceData, TokenType, SecurityOfToken } from '@/types'
import { BACKEND_API } from '@/constants/index'
import { AllowedFeatures, ContractMetadata } from '@/infrastructure'
import { useAppNotificationContext } from 'src/context/AppNotificationContext'
import { useStorageContractsContext } from '@/context'

type ReturnValue = GetServiceData

const compileContractApi = new CompileContractApiRepository(BACKEND_API)
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
  ) => Promise<ContractMetadata | void>
} => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const { addNotification } = useAppNotificationContext()
  const { addContractToStorage } = useStorageContractsContext()

  const compileContract = useCallback(
    async ({
      address,
      code,
      tokenType,
      security,
      isPausable
    }: UseCreateCompilation): Promise<ContractMetadata | void> => {
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
        addContractToStorage(address, {
          code_id: response.data.code_id,
          status: 'compiled',
          type: tokenType
        })
        return response['data']
      } catch (error) {
        const _errorMsg = `An error occurred when trying to compile the server contract on the server`
        setError(_errorMsg)
        addNotification({
          message: _errorMsg,
          type: 'error'
        })
        console.error(error)
      }
    },
    [addContractToStorage, addNotification]
  )

  return { compileContract, isLoading, error }
}
