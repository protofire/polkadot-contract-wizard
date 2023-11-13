import { useMemo } from 'react'
import { useCall } from 'useink'
import { AbiMessage, ContractPromise } from '@/services/substrate/types'
import { useNetworkApi } from './useNetworkApi'

export function useContractCaller(
  contract: ContractPromise,
  method: AbiMessage['method']
) {
  const { network: chainId } = useNetworkApi()

  const callContractArgs = useMemo(() => {
    return { chainContract: { contract, chainId }, method }
  }, [chainId, contract, method])

  const caller = useCall<string>(
    callContractArgs.chainContract,
    callContractArgs.method
  )

  return { caller }
}
