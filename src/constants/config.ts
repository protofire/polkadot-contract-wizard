import { createUrl } from '@/infrastructure'

export const IS_PRODUCTION = process.env.NODE_ENV === ('production' as string)
export const IS_DEVELOPMENT = process.env.NODE_ENV === ('development' as string)

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

const backendRouterApi = {
  createDeployment: {
    pathName: 'deployments',
    method: 'POST'
  },
  ListDeployment: {
    pathName: 'deployments',
    method: 'GET'
  },
  createCompileContract: {
    pathName: 'contract',
    method: 'POST'
  },
  contractMetadata: {
    pathName: 'contract?code_id=',
    method: 'GET'
  }
}
type BackendRoutesApi = keyof typeof backendRouterApi
type RouteApi = Record<
  BackendRoutesApi,
  { url: string; method: 'POST' | 'GET' }
>

export interface BackendApiConfig {
  basePath: string
  routes: RouteApi
}
const apiBaseUrlPath = process.env.NEXT_PUBLIC_BACKEND_API as string
export const BACKEND_API: BackendApiConfig = {
  basePath: apiBaseUrlPath,
  routes: Object.keys(backendRouterApi).reduce((acc, key) => {
    const currentRoute = backendRouterApi[key as BackendRoutesApi]
    return {
      ...acc,
      [key]: {
        method: currentRoute.method,
        url: createUrl(apiBaseUrlPath, currentRoute.pathName)
      }
    }
  }, {} as RouteApi)
}
