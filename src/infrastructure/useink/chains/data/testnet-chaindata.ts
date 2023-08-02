import { IChain } from './types'

export const RococoContractsTestnet: IChain<'rococo-contracts-testnet'> = {
  id: 'rococo-contracts-testnet',
  name: 'Contracts',
  account: '*25519',
  rpcs: ['wss://rococo-contracts-rpc.polkadot.io'],
  paraId: 1002,
  relay: { id: 'rococo-testnet' }
} as const

export const ShibuyaTestnet: IChain<'shibuya-testnet'> = {
  id: 'shibuya-testnet',
  name: 'Shibuya',
  account: '*25519',
  subscanUrl: 'https://shibuya.subscan.io/',
  rpcs: ['wss://rpc.shibuya.astar.network', 'wss://shibuya-rpc.dwellir.com']
} as const
