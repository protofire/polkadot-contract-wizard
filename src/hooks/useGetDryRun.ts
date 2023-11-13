import { useDryRun } from 'useink'

import { useNetworkAccountsContext } from '@/context/NetworkAccountsContext'
import { ContractPromise } from '@/services/substrate/types'

export function useGetDryRun(
  contract: ContractPromise | undefined,
  messageName: string
) {
  const { networkConnected } = useNetworkAccountsContext()
  const genericDryRun = useDryRun(
    contract && { contract, chainId: networkConnected },
    messageName
  )

  return genericDryRun
}
