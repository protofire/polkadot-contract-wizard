import { useCallback, useMemo, useState } from 'react'
import {
  AbiMessage,
  ContractPromise,
  Registry
} from '@/services/substrate/types'
import { useGetDryRun } from '@/hooks/useGetDryRun'
import { useDebouncedEffect } from '@/hooks/useDebouncedEffect'
import { getDecodedOutput } from '@/utils/contractExecResult'

interface UseDryRunExecutionProps {
  contractPromise: ContractPromise
  message: AbiMessage
  params: unknown[] | undefined
  autoRun: boolean
  substrateRegistry: Registry
}

export interface DryRunExecutionResult {
  outcome: string | undefined
  error: string | undefined
  isRunning: boolean
  executeDryRun: () => void
}

export function useDryRunExecution({
  contractPromise,
  message,
  params,
  autoRun = false,
  substrateRegistry
}: UseDryRunExecutionProps): DryRunExecutionResult {
  const dryRun = useGetDryRun(contractPromise, message.method)
  const [outcome, setOutcome] = useState<string | undefined>()
  const [error, setError] = useState<string | undefined>()
  const memoizedParams = useMemo(() => params, [params])

  const executeDryRun = useCallback(async () => {
    setOutcome(undefined)
    setError(undefined)

    const result = await dryRun.send(memoizedParams)
    if (result?.ok) {
      const { decodedOutput, isError } = getDecodedOutput(
        {
          debugMessage: result.value.raw.debugMessage,
          result: result.value.raw.result
        },
        message,
        substrateRegistry
      )
      if (isError) {
        setOutcome('Contract will be reverted')
        setError(decodedOutput)
      } else {
        setOutcome('Contract will be executed')
      }
    } else {
      // TODO
      // pickDecodedError(result, contractPromise, {}, '--')
      setError('Contract will be reverted')
      setOutcome('Contract will be reverted')
    }
  }, [dryRun, memoizedParams, message, substrateRegistry])

  useDebouncedEffect({
    effect: executeDryRun,
    delay: 100,
    deps: [message, memoizedParams],
    autoRun: autoRun
  })

  return {
    outcome,
    error,
    isRunning: dryRun.isSubmitting,
    executeDryRun
  }
}
