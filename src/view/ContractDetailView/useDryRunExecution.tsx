import { useCallback, useState } from 'react'
import { AbiMessage, ContractPromise } from '@/services/substrate/types'
import { useGetDryRun } from '@/hooks/useGetDryRun'
import { useDebouncedEffect } from '@/hooks/useDebouncedEffect'

interface UseDryRunExecutionProps {
  contractPromise: ContractPromise
  message: AbiMessage
  params: unknown[] | undefined
}

interface DryRunExecutionResult {
  outcome: string
  isSubmitting: boolean
  executeDryRun: () => void
}

export function useDryRunExecution({
  contractPromise,
  message,
  params
}: UseDryRunExecutionProps): DryRunExecutionResult {
  const dryRun = useGetDryRun(contractPromise, message.method)
  const [outcome, setOutcome] = useState<string>('No results yet...')

  console.log('__dryRun', dryRun)
  const executeDryRun = useCallback(async () => {
    const result = await dryRun.send(params)
    console.log('__result', result)

    if (result?.ok) {
      setOutcome(
        `Contract call will be successful executed with ${result.value.partialFee.toString()} fee`
      )
    } else {
      setOutcome('Contract will be reverted')
    }
  }, [dryRun, params])

  // useDebouncedEffect(executeDryRun, 0, [message, params])

  return {
    outcome,
    isSubmitting: dryRun.isSubmitting,
    executeDryRun
  }
}
