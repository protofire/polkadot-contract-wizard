import {
  Astar,
  ChainId,
  RococoContractsTestnet,
  ShibuyaTestnet,
  ShidenKusama
} from '@/services/useink/chains'
import { ArrayOneOrMore, ChainExtended } from '@/types'
import { CHAINS_IMG_PATH } from './images'
import { IChain, RpcUrl } from '@/services/useink/chains/data/types'

export const DEFAULT_DECIMALS = 12
export const OPTION_FOR_CUSTOM_NETWORK = 'add-custom'

export const CHAINS: ArrayOneOrMore<IChain<string>> = [
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

export const addNewChain = (chain: IChain<string>) => {
  const chainExist = CHAINS_ALLOWED.some(element => element.id === 'custom')

  if (chainExist) {
    return []
  }

  const newChains = [...CHAINS, chain]
  const response = newChains.map(chain => {
    return {
      ...chain,
      logo: {
        src: `${CHAINS_IMG_PATH}${chain.id ? chain.id : 'custom'}.png`,
        alt: `${chain.name} img`
      }
    }
  })

  return response
}

export function createIChainWithRPCAndSave(rpc: RpcUrl): IChain<string> {
  const customChain: IChain<string> = {
    id: 'custom',
    name: 'Custom',
    account: '*25519',
    rpcs: [rpc]
  }

  // Save the customChain object in localStorage
  localStorage.setItem('customChain', JSON.stringify(customChain))

  return customChain
}

export const UNKNOWN_CHAIN = {
  name: 'UNKNOWN',
  id: 'unknown-network',
  logo: {
    src: `${CHAINS_IMG_PATH}custom.png`,
    alt: `unknown chain img`
  }
}

export function getChain(chainId?: ChainId): ChainExtended {
  return (
    CHAINS_ALLOWED.find(_chain => _chain.id === chainId) ??
    (UNKNOWN_CHAIN as ChainExtended)
  )
}
