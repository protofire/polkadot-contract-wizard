import { IChain } from '@/services/useink/chains/data/types'
import { ChainExtended } from '@/types'

export interface INetworkRepository {
  getNetworkSelected(): ChainExtended
  setNetworkSelected(chainId: string): void
  getCustomChain(): ChainExtended
  setCustomChain(chain: ChainExtended): void
}
