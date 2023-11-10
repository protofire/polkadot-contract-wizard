import { useDryRun } from 'useink'

import { useNetworkAccountsContext } from '@/context/NetworkAccountsContext'
import { ContractPromise } from '@/services/substrate/types'

export function useGetDryRun(
  contract: ContractPromise | undefined,
  messageName: string
) {
  const {
    state: { currentChain }
  } = useNetworkAccountsContext()
  const genericDryRun = useDryRun(
    contract && currentChain && { contract, chainId: currentChain },
    messageName || ''
  )

  return genericDryRun
}
