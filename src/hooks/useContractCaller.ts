import { useEffect, useMemo, useState } from 'react'
import { Call, useCall } from 'useink'
import {
  AbiMessage,
  ContractPromise,
  Registry
} from '@/services/substrate/types'
import { useNetworkApi } from './useNetworkApi'
import { getDecodedOutput, stringify } from '@/utils/contractExecResult'
import { decodeError } from '@/services/useink/utils/decodeError'

interface Props {
  contractPromise: ContractPromise
  abiMessage: AbiMessage
  substrateRegistry: Registry
}

interface UseContractCallerReturn {
  caller: Call<unknown>
  outcome: string
  error: string | undefined
}

export function useContractCaller({
  contractPromise: contract,
  abiMessage,
  substrateRegistry
}: Props): UseContractCallerReturn {
  const { network: chainId } = useNetworkApi()
  const [outcome, setOutcome] = useState<string>('')
  const [error, setError] = useState<string | undefined>()
  const { method } = abiMessage

  const callContractArgs = useMemo(() => {
    return { chainContract: { contract, chainId }, method }
  }, [chainId, contract, method])

  const caller = useCall(
    callContractArgs.chainContract,
    callContractArgs.method
  )

  useEffect(() => {
    setError(undefined)

    if (caller.result?.ok) {
      const { decodedOutput } = getDecodedOutput(
        {
          debugMessage: caller.result.value.raw.debugMessage,
          result: caller.result.value.raw.result
        },
        abiMessage,
        substrateRegistry
      )
      setOutcome(decodedOutput)
    } else {
      setError(
        decodeError(
          caller.result?.error,
          callContractArgs.chainContract.contract
        )
      )
    }
  }, [
    abiMessage,
    callContractArgs.chainContract,
    caller.result,
    substrateRegistry
  ])

  return { caller, outcome, error }
}
