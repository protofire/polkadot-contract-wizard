export const CHAINS_ALLOWED = [
  {
    id: 'rococo-contracts-testnet',
    name: 'Contracts',
    account: '*25519',
    rpcs: ['wss://rococo-contracts-rpc.polkadot.io'],
    paraId: 1002,
    relay: { id: 'rococo-testnet' }
  },
  {
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
    balanceModuleConfigs: { 'substrate-assets': [Object] }
  },
  {
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
  },
  {
    id: 'shibuya-testnet',
    name: 'Shibuya',
    account: '*25519',
    subscanUrl: 'https://shibuya.subscan.io/',
    rpcs: ['wss://rpc.shibuya.astar.network', 'wss://shibuya-rpc.dwellir.com']
  }
]
