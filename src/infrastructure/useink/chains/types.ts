import * as AllChains from './data/chaindata'
import * as AllTestnets from './data/testnet-chaindata'

type TestnetNetworkName = keyof typeof AllTestnets
export type TestnetChain = (typeof AllTestnets)[TestnetNetworkName]
export type TestnetId = TestnetChain['id']

type ProductionNetworkName = keyof typeof AllChains
export type ProductionChain = (typeof AllChains)[ProductionNetworkName]
export type ProductionChainId = ProductionChain['id']

export type ChainId = ProductionChainId | TestnetId
export type Chain = ProductionChain | TestnetChain
