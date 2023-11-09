import { ApiPromise } from '@polkadot/api'
import { useApi } from 'useink'

import { useNetworkAccountsContext } from '@/context/NetworkAccountsContext'
import { useDelay } from './useDelay'
import { ChainId } from '@/services/useink/chains'

export interface UseNetworkApi {
  apiPromise: ApiPromise | undefined
  network: ChainId
  firstLoadCompleted: boolean
}

export function useNetworkApi(): UseNetworkApi {
  const { networkConnected } = useNetworkAccountsContext()
  const api = useApi(networkConnected)
  const firstLoadCompleted = useDelay(5000)

  return {
    apiPromise: api?.api,
    network: networkConnected,
    firstLoadCompleted: !!api?.api || firstLoadCompleted
  }
}
