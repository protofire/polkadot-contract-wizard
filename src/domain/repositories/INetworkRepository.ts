import { ChainExtended } from '@/types'

export interface INetworkRepository {
  getNetworkSelected(): ChainExtended
  setNetworkSelected(chainId: string): void
}
