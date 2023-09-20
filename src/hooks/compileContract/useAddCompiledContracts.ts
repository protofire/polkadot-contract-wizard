import { useCallback, useState } from 'react'

import { Contract, SmartContractEvents, isContractDeployed } from '@/domain'
import { useLocalDbContext } from '@/context/LocalDbContext'

interface UseNewCompiledContract {
  isLoading: boolean
  error?: string
  save: (accountAddress: string, smartContract: Contract) => void
}

export function useAddCompiledContract(): UseNewCompiledContract {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const { compilationRepository } = useLocalDbContext()

  const save = useCallback(
    async (accountAddress: string, smartContract: Contract) => {
      setError(undefined)
      setIsLoading(true)

      try {
        compilationRepository.save(accountAddress, smartContract)

        document.dispatchEvent(
          new CustomEvent(
            isContractDeployed(smartContract)
              ? SmartContractEvents.contractInstatiate
              : SmartContractEvents.contractCompiled
          )
        )
      } catch (e) {
        const _errorMsg = `An error occurred when trying save compilation on localStorage`
        setError(_errorMsg)
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    },
    [compilationRepository, error]
  )

  return { save, isLoading, error }
}
