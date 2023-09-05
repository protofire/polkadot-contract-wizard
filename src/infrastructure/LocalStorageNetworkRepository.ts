import {
  getLocalStorageState,
  setLocalStorageState
} from '@/utils/localStorage'
import { ChainId } from '@/infrastructure/useink/chains/types'
import { getChain } from '@/constants/chains'
import { ChainExtended } from '@/types'

type ReturnChainId = ChainId

interface INetworkRepository {
  getNetworkSelected(): ChainExtended | null
  setNetworkSelected(chainId: string): void
}

export class LocalStorageNetworkRepository implements INetworkRepository {
  private readonly storageKey = 'networkSelected'

  getNetworkSelected(): ChainExtended | null {
    const result = getLocalStorageState<ReturnChainId | null>(
      this.storageKey,
      null
    ) as ChainId | null

    if (result === null) return null

    return getChain(result) as ChainExtended
  }

  setNetworkSelected(networkId: ReturnChainId): void {
    setLocalStorageState(this.storageKey, networkId)
  }
}
