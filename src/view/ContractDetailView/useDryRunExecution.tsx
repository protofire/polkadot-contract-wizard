import { useCallback, useMemo, useState } from 'react'
import { AbiMessage, ContractPromise } from '@/services/substrate/types'
import { useGetDryRun } from '@/hooks/useGetDryRun'
import { useDebouncedEffect } from '@/hooks/useDebouncedEffect'

interface UseDryRunExecutionProps {
  contractPromise: ContractPromise
  message: AbiMessage
  params: unknown[] | undefined
  autoRun: boolean
}

interface DryRunExecutionResult {
  outcome: string
  isSubmitting: boolean
  executeDryRun: () => void
}

export function useDryRunExecution({
  contractPromise,
  message,
  params,
  autoRun = false
}: UseDryRunExecutionProps): DryRunExecutionResult {
  const dryRun = useGetDryRun(contractPromise, message.method)
  const [outcome, setOutcome] = useState<string>('No results yet...')
  const memoizedParams = useMemo(() => params, [params])

  const executeDryRun = useCallback(async () => {
    const result = await dryRun.send(memoizedParams)
    console.log('__dryRun', dryRun)
    if (result?.ok) {
      setOutcome(
        `Contract call will be successful executed with ${result.value.partialFee.toString()} fee`
      )
    } else {
      // pickDecodedError(result, contractPromise, {}, '--')
      setOutcome('Contract will be reverted')
    }
  }, [dryRun, memoizedParams])

  useDebouncedEffect({
    effect: executeDryRun,
    delay: 300,
    deps: [message, params],
    autoRun: autoRun
  })

  return {
    outcome,
    isSubmitting: dryRun.isSubmitting,
    executeDryRun
  }
}
