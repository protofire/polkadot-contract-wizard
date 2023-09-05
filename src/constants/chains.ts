import {
  Astar,
  Chain,
  ChainId,
  RococoContractsTestnet,
  ShibuyaTestnet,
  ShidenKusama
} from '@/infrastructure/useink/chains'
import { ArrayOneOrMore, ChainExtended } from '@/types'
import { CHAINS_IMG_PATH } from './images'

export const DEFAULT_DECIMALS = 12

export const CHAINS: ArrayOneOrMore<Chain> = [
  Astar,
  ShibuyaTestnet,
  ShidenKusama,
  RococoContractsTestnet
]

export const CHAINS_ALLOWED: ChainExtended[] = CHAINS.map(chain => {
  return {
    ...chain,
    logo: {
      src: `${CHAINS_IMG_PATH}${chain.id ? chain.id : 'custom'}.png`,
      alt: `${chain.name} img`
    }
  }
})

export const UNKNOWN_CHAIN = {
  name: 'UNKNOWN',
  id: 'unknown-network',
  logo: {
    src: `${CHAINS_IMG_PATH}custom.png`,
    alt: `unknown chain img`
  }
}

export function getChain(chainId?: ChainId) {
  if (!chainId) return UNKNOWN_CHAIN
  return CHAINS_ALLOWED.find(_chain => _chain.id === chainId) ?? UNKNOWN_CHAIN
}
