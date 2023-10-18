import {
  getLocalStorageState,
  setLocalStorageState
} from '@/utils/localStorage'
import { ChainId } from '@/services/useink/chains/types'
import { getChain } from '@/constants/chains'
import { ChainExtended } from '@/types'
import { DEFAULT_CHAIN } from '../constants'
import { INetworkRepository } from '@/domain/repositories/INetworkRepository'

type ReturnChainId = ChainId

export class LocalStorageNetworkRepository implements INetworkRepository {
  private readonly storageKey = 'networkSelected'

  getNetworkSelected(): ChainExtended {
    const result = getLocalStorageState<ReturnChainId | null>(
      this.storageKey,
      DEFAULT_CHAIN
    ) as ChainId

    return getChain(result) as ChainExtended
  }

  setNetworkSelected(networkId: ReturnChainId): void {
    setLocalStorageState(this.storageKey, networkId)
  }
}
