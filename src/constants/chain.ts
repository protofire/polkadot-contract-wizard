import {
  Astar,
  Chain,
  RococoContractsTestnet,
  ShibuyaTestnet,
  ShidenKusama
} from 'useink/dist/chains'
import { ArrayOneOrMore, ChainExtended } from '@/types'

export const CHAINS_ALLOWED: ArrayOneOrMore<Chain> = [
  Astar,
  ShibuyaTestnet,
  ShidenKusama,
  RococoContractsTestnet
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
