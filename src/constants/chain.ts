import { ArrayOneOrMore } from '@/types'
import {
  Astar,
  Chain,
  RococoContractsTestnet,
  ShibuyaTestnet,
  ShidenKusama
} from 'useink/chains'

export const CHAINS_ALLOWED: ArrayOneOrMore<Chain> = [
  Astar,
  ShidenKusama,
  ShibuyaTestnet,
  RococoContractsTestnet
]
