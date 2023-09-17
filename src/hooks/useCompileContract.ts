import { useCallback, useState } from 'react'

import {
  ApiCompileContractRepository,
  CompileContractBody
} from '@/infrastructure/backendApi/ApiCompileContractRepository'
import { GetServiceData } from '@/types'
import { TokenType, SecurityOfToken } from '@/domain'
import { BACKEND_API } from '@/constants/index'
import { AllowedFeatures, ContractResponse } from '@/infrastructure'
import { useAppNotificationContext } from '@/context/AppNotificationContext'
import { useStorageContractsContext } from '@/context'

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
  ) => Promise<ContractResponse | void>
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
    }: UseCreateCompilation): Promise<ContractResponse | void> => {
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
        const _errorMsg = `An error occurred when trying to compile the smart contract on the server`
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

export const useSearchCompileContract = (): ReturnValue & {
  searchCompileContract: (codeId: string) => Promise<ContractResponse | void>
} => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const { addNotification } = useAppNotificationContext()

  const searchCompileContract = useCallback(
    async (codeId: string): Promise<ContractResponse | void> => {
      setError(undefined)
      setIsLoading(true)

      try {
        const response = await compileContractApi.search(codeId)

        setIsLoading(false)
        if (response.error) {
          console.log(response.error.message)
          throw Error(response.error.message)
        }

        return response['data']
      } catch (error) {
        const _errorMsg = `An error occurred when trying to search compiled contract`
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

  return { searchCompileContract, isLoading, error }
}
