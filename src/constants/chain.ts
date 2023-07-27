import { ArrayOneOrMore } from '@/types'
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

export const createChainObject = (chainList: Chain[]) => {
  return chainList.reduce((acc, cv) => {
    return { ...acc, [cv.id]: cv }
  }, {}) as { [name: string]: Chain }
}
