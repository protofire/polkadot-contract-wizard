import { ArrayOneOrMore } from 'src/types/utilyTypes'
import {
  Chain,
  RococoContractsTestnet,
  ShibuyaTestnet,
  ShidenKusama,
  Astar
} from 'useink/chains'

export const CHAINS_ALLOWED: ArrayOneOrMore<Chain> = [
  Astar,
  ShidenKusama,
  ShibuyaTestnet,
  RococoContractsTestnet
]
