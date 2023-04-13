import { createUrl } from '@/infrastructure'

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

type BackendRoutesApi =
  | 'deployment'
  | 'deploy'
  | 'contract'
  | 'contractMetadata'
export interface BackendApiConfig {
  basePath: string
  routes: Record<BackendRoutesApi, string>
}

const apiBaseUrlPath = process.env.NEXT_PUBLIC_BACKEND_API as string
export const BACKEND_API: BackendApiConfig = {
  basePath: apiBaseUrlPath,
  routes: {
    deployment: createUrl(apiBaseUrlPath, 'deployment'),
    deploy: createUrl(apiBaseUrlPath, 'deploy'),
    contract: createUrl(apiBaseUrlPath, 'contract'),
    contractMetadata: createUrl(apiBaseUrlPath, 'contract-metadata?code_id=')
  }
}
