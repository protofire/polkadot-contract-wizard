import { ApiPromise, WsProvider } from '@polkadot/api'
import { useApi } from 'useink'

import { useNetworkAccountsContext } from '@/context/NetworkAccountsContext'
import { useDelay } from './useDelay'
import { ChainId } from '@/services/useink/chains'
import { useEffect, useState } from 'react'
import { getChain } from '@/constants/chains'
import { ChainExtended } from '@/types'

export interface UseNetworkApi {
  apiPromise: ApiPromise | undefined
  network: ChainId
  firstLoadCompleted: boolean
}

const initializeApi = async (
  networkSelected: ChainExtended
): Promise<ApiPromise | undefined> => {
  try {
    const wsProvider = new WsProvider(networkSelected.rpcs[0])
    const apiInstance = await ApiPromise.create({ provider: wsProvider })
    return apiInstance
  } catch (error) {
    console.error('Error initializing API:', error)
  }
}

export function useNetworkApi(): UseNetworkApi {
  const { networkConnected } = useNetworkAccountsContext()
  const [api, setApi] = useState<ApiPromise | undefined>(undefined)

  const fetchApi = useApi(networkConnected)

  useEffect(() => {
    if (networkConnected) {
      if (!fetchApi) {
        ;(async () => {
          const chain = getChain(networkConnected)
          const apiInstance = await initializeApi(chain)
          setApi(apiInstance)
        })()
      }
    }
  }, [networkConnected])

  const firstLoadCompleted = useDelay(5000)
  return {
    apiPromise: fetchApi?.api ?? api,
    network: networkConnected,
    firstLoadCompleted: !!api || firstLoadCompleted
  }
}
