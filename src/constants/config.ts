export const IS_PRODUCTION = process.env.NODE_ENV === ('production' as string)

export interface DappConfig {
  name: string
  providerSocket: string
}

export const DAPP_CONFIG: DappConfig = {
  name: 'Polkadot contract wizard',
  providerSocket: IS_PRODUCTION
    ? (process.env.NEXT_PUBLIC_PROVIDER_SOCKET_PROD as string)
    : (process.env.NEXT_PUBLIC_PROVIDER_SOCKET_DEV as string)
}

export const BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_API as string
