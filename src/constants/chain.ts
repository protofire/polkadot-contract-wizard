import { ArrayOneOrMore } from '@/types'
import { ChainExtended } from 'src/types/chain'
import {
  Astar,
  Chain,
  RococoContractsTestnet,
  ShibuyaTestnet,
  ShidenKusama
} from 'useink/chains'

export const CHAINS_ALLOWED: ArrayOneOrMore<Chain> = [
  RococoContractsTestnet,
  Astar,
  ShidenKusama,
  ShibuyaTestnet
]

export const createChainObject = (chainList: ChainExtended[]) => {
  const imgPath = `/assets/chains/`
  return chainList.reduce((acc, cv) => {
    cv.logo = {
      src: `${imgPath}${cv.id}.png`,
      alt: `${cv.name} img`
    }
    return { ...acc, [cv.id]: cv }
  }, {}) as { [name: string]: ChainExtended }
}

export const ALL_CHAINS_OBJ: { [name: string]: ChainExtended } =
  createChainObject(CHAINS_ALLOWED as unknown as ChainExtended[])
