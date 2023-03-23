export const APP_NAME = 'Polkadot contract wizard'

export const PROVIDER_SOCKET =
  process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_PROVIDER_SOCKET_DEV
    : process.env.NEXT_PUBLIC_PROVIDER_SOCKET_PROD
