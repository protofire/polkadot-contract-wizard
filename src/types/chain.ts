type Account = '*25519' | 'secp256k1' | 'Sr25519'
type RpcUrl = `ws://${string}` | `wss://${string}`
type JsonString = string

interface Token {
  symbol: string
  decimals: number
  existentialDeposit: string
  onChainId: JsonString | number
  coingeckoId?: string
}
interface TokenAsset {
  assetId: string | number
  symbol: string
  coingeckoId?: string
}
interface IChain<T> {
  id: T
  name: string
  account: Account
  subscanUrl?: string
  overrideNativeTokenId?: string
  chainspecQrUrl?: string
  latestMetadataQrUrl?: string
  rpcs: readonly RpcUrl[]
  coingeckoId?: string | null
  paraId?: number
  relay?: {
    id: string
  }
  balanceModuleConfigs?: {
    [k: string]: {
      disable?: boolean
      tokens?: readonly (Token | TokenAsset)[]
    }
  }
}

declare const Astar: IChain<'astar'>
declare const ShidenKusama: IChain<'shiden-kusama'>
declare const ShibuyaTestnet: IChain<'shibuya-testnet'>
declare const RococoContractsTestnet: IChain<'rococo-contracts-testnet'>

declare const AllChains_Astar: typeof Astar
declare const AllTestnets_ShibuyaTestnet: typeof ShibuyaTestnet
declare const AllTestnets_RococoContractsTestnet: typeof RococoContractsTestnet
declare const AllChains_ShidenKusama: typeof ShidenKusama

const AllTestnets = {
  ShibuyaTestnet: AllTestnets_ShibuyaTestnet,
  RococoContractsTestnet: AllTestnets_RococoContractsTestnet
}

const AllChains = {
  Astar: AllChains_Astar,
  ShidenKusama: AllChains_ShidenKusama
}
type TestnetNetworkName = keyof typeof AllTestnets
type TestnetChain = (typeof AllTestnets)[TestnetNetworkName]
type ProductionNetworkName = keyof typeof AllChains
type ProductionChain = (typeof AllChains)[ProductionNetworkName]
type Chain = ProductionChain | TestnetChain

export type ChainExtended = Chain & {
  logo: {
    src: string
    alt: string
  }
}
