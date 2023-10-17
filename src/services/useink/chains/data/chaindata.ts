import { IChain } from './types'

export const Astar: IChain<'astar'> = {
  id: 'astar',
  name: 'Astar',
  account: '*25519',
  subscanUrl: 'https://astar.subscan.io/',
  chainspecQrUrl: 'https://metadata.novasama.io/qr/astar_specs.png',
  latestMetadataQrUrl:
    'https://metadata.novasama.io/qr/astar_metadata_latest.apng',
  rpcs: [
    'wss://rpc.astar.network',
    'wss://astar.public.blastapi.io',
    'wss://astar-rpc.dwellir.com',
    'wss://astar.api.onfinality.io/public-ws',
    'wss://astar.public.curie.radiumblock.co/ws',
    'wss://public-rpc.pinknode.io/astar',
    'wss://1rpc.io/astr'
  ],
  paraId: 2006,
  relay: { id: 'polkadot' },
  balanceModuleConfigs: {
    'substrate-assets': {
      tokens: [
        { assetId: '4294969280', symbol: 'USDT', coingeckoId: 'tether' },
        {
          assetId: '18446744073709551616',
          symbol: 'ACA',
          coingeckoId: 'acala'
        },
        {
          assetId: '18446744073709551617',
          symbol: 'AUSD',
          coingeckoId: 'acala-dollar'
        },
        {
          assetId: '18446744073709551618',
          symbol: 'LDOT',
          coingeckoId: 'liquid-staking-dot'
        },
        {
          assetId: '18446744073709551619',
          symbol: 'GLMR',
          coingeckoId: 'moonbeam'
        },
        {
          assetId: '18446744073709551620',
          symbol: 'IBTC',
          coingeckoId: 'interbtc'
        },
        {
          assetId: '18446744073709551621',
          symbol: 'INTR',
          coingeckoId: 'interlay'
        },
        { assetId: '18446744073709551622', symbol: 'PHA', coingeckoId: 'pha' },
        {
          assetId: '18446744073709551623',
          symbol: 'BNC',
          coingeckoId: 'bifrost-native-coin'
        },
        { assetId: '18446744073709551624', symbol: 'VDOT' },
        { assetId: '18446744073709551625', symbol: 'CLV' },
        { assetId: '18446744073709551626', symbol: 'VSDOT' },
        {
          assetId: '18446744073709551627',
          symbol: 'RING',
          coingeckoId: 'darwinia-network-native-token'
        },
        {
          assetId: '18446744073709551628',
          symbol: 'EQ',
          coingeckoId: 'equilibrium-token'
        },
        { assetId: '18446744073709551629', symbol: 'EQD' },
        {
          assetId: '340282366920938463463374607431768211455',
          symbol: 'DOT',
          coingeckoId: 'polkadot'
        }
      ]
    }
  }
} as const

export const ShidenKusama: IChain<'shiden-kusama'> = {
  id: 'shiden-kusama',
  name: 'Shiden',
  account: '*25519',
  subscanUrl: 'https://shiden.subscan.io/',
  chainspecQrUrl: 'https://metadata.novasama.io/qr/shiden_specs.png',
  latestMetadataQrUrl:
    'https://metadata.novasama.io/qr/shiden_metadata_latest.apng',
  rpcs: [
    'wss://rpc.shiden.astar.network',
    'wss://shiden.public.blastapi.io',
    'wss://shiden-rpc.dwellir.com',
    'wss://shiden.api.onfinality.io/public-ws',
    'wss://public-rpc.pinknode.io/shiden'
  ],
  paraId: 2007,
  relay: { id: 'kusama' }
} as const
