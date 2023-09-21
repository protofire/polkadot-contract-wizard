import { useAppNotificationContext } from '@/context'
import { useLocalDbContext } from '@/context/LocalDbContext'
import { ContractCompiledRaw } from '@/infrastructure'
import { GetServiceData } from '@/types'
import { useCallback, useState } from 'react'

export const useSearchCompileContract = (): GetServiceData & {
  searchCompileContract: (codeId: string) => Promise<ContractCompiledRaw | void>
} => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const { addNotification } = useAppNotificationContext()
  const { compileContractRepository } = useLocalDbContext()

  const searchCompileContract = useCallback(
    async (codeId: string): Promise<ContractCompiledRaw | void> => {
      setError(undefined)
      setIsLoading(true)

      try {
        const response = await compileContractRepository.search(codeId)

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
    [addNotification, compileContractRepository]
  )

  return { searchCompileContract, isLoading, error }
}
