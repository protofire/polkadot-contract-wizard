import {
  Astar,
  Chain,
  RococoContractsTestnet,
  ShibuyaTestnet,
  ShidenKusama
} from '@/infrastructure/useink/chains'
import { ArrayOneOrMore } from '@/types'

export const CHAINS_ALLOWED: ArrayOneOrMore<Chain> = [
  Astar,
  ShibuyaTestnet,
  ShidenKusama,
  RococoContractsTestnet
]
