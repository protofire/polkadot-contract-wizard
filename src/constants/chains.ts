import {
  Astar,
  Chain,
  ChainId,
  RococoContractsTestnet,
  ShibuyaTestnet,
  ShidenKusama
} from '@/services/useink/chains'
import { ArrayOneOrMore, ChainExtended } from '@/types'
import { CHAINS_IMG_PATH } from './images'
import { RpcUrl } from '@/services/useink/chains/data/types'

export const DEFAULT_DECIMALS = 12
export const OPTION_FOR_CUSTOM_NETWORK = 'custom'
export const OPTION_FOR_ADD_CUSTOM_NETWORK = 'add-custom'
export const OPTION_FOR_EDIT_CUSTOM_NETWORK = 'edit-custom'

export const CHAINS: ArrayOneOrMore<Chain> = [
  Astar,
  ShibuyaTestnet,
  ShidenKusama,
  RococoContractsTestnet
]

export const CHAINS_ALLOWED = CHAINS.map(chain => {
  return {
    ...chain,
    logo: {
      src: `${CHAINS_IMG_PATH}${
        chain.id ? chain.id : OPTION_FOR_CUSTOM_NETWORK
      }.png`,
      alt: `${chain.name} img`
    }
  }
})

export const addNewChain = (chain: ChainExtended): ChainExtended[] => {
  const chainExist = CHAINS_ALLOWED.some(
    element => element.id === OPTION_FOR_CUSTOM_NETWORK
  )
  if (chainExist) {
    return []
  }
  const newChains: ChainExtended[] = [...CHAINS_ALLOWED, chain]
  return newChains
}

export function createIChainWithRPCAndSave(rpc: RpcUrl): ChainExtended {
  const customChain: ChainExtended = {
    id: OPTION_FOR_CUSTOM_NETWORK,
    name: 'Custom',
    account: '*25519',
    rpcs: [rpc],
    logo: {
      src: `${CHAINS_IMG_PATH}${OPTION_FOR_CUSTOM_NETWORK}.png`,
      alt: `custom img`
    }
  }
  return customChain
}

export function getChain(chainId?: ChainId) {
  const chain = CHAINS_ALLOWED.find(_chain => _chain.id === chainId)
  if (chain !== undefined) {
    return chain
  }

  const customChain = JSON.parse(localStorage.getItem('customChain') as string)
  return customChain
}
