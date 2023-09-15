import { ApiPromise } from '@polkadot/api'
import { useApi } from 'useink'

import { useNetworkAccountsContext } from 'src/context/NetworkAccountsContext'

export interface UseNetworkApi {
  apiPromise: ApiPromise
}

export function useNetworkApi() {
  const { networkConnected } = useNetworkAccountsContext()
  const api = useApi(networkConnected)

  return { apiPromise: api?.api, network: networkConnected }
}
