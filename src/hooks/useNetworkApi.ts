import { ApiPromise, WsProvider } from '@polkadot/api'
import { useApi } from 'useink'

import { useNetworkAccountsContext } from '@/context/NetworkAccountsContext'
import { useDelay } from './useDelay'
import { ChainId } from '@/services/useink/chains'
import { useEffect, useState } from 'react'

export interface UseNetworkApi {
  apiPromise: ApiPromise | undefined
  network: ChainId
  firstLoadCompleted: boolean
}

export function useNetworkApi(): UseNetworkApi {
  const { networkConnected, networkSelected } = useNetworkAccountsContext()
  console.log('networkConnected', networkConnected)

  // Get network data
  const [api, setApi] = useState<ApiPromise | null>(null)

  useEffect(() => {
    const initializeApi = async () => {
      try {
        const wsProvider = new WsProvider(networkSelected.rpcs[0])
        const apiInstance = await ApiPromise.create({ provider: wsProvider })
        setApi(apiInstance)
      } catch (error) {
        console.error('Error initializing API:', error)
        // Handle error as needed
      }
    }

    initializeApi()
  }, [networkConnected])

  const firstLoadCompleted = useDelay(5000)

  return {
    apiPromise: api!,
    network: networkConnected,
    firstLoadCompleted: !!api || firstLoadCompleted
  }
}
