import { Chain, ChainId } from '@/services/useink/chains'

export const IS_PRODUCTION = process.env.NODE_ENV === ('production' as string)
export const IS_DEVELOPMENT = process.env.NODE_ENV === ('development' as string)

export const DEFAULT_CHAIN: ChainId = IS_DEVELOPMENT
  ? 'shibuya-testnet'
  : 'astar'

export const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN as string

export interface DappConfig {
  name: string
  providerSocket: string
}

export const DAPP_CONFIG: DappConfig = {
  name: 'Polkadot contract wizard',
  providerSocket:
    process.env.NEXT_PUBLIC_PROVIDER_DEFAULT_SOCKET ||
    'wss://rococo-contracts-rpc.polkadot.io'
}

const backendRouterApi = {
  createDeployment: {
    pathName: 'deployments',
    method: 'POST'
  },
  listDeployment: {
    pathName: 'deployments',
    method: 'GET'
  },
  findDeployment: {
    pathName: 'deployment',
    method: 'GET'
  },
  createCompileContract: {
    pathName: 'contract',
    method: 'POST'
  },
  searchCompileContract: {
    pathName: 'contract?code_id=',
    method: 'GET'
  },
  updateDeployment: {
    pathName: 'deployments',
    method: 'PATCH'
  },
  version: {
    pathName: 'version',
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

export function getBackendApiConfig(basePath: string): BackendApiConfig {
  return {
    basePath,
    routes: Object.keys(backendRouterApi).reduce((acc, key) => {
      const currentRoute = backendRouterApi[key as BackendRoutesApi]
      return {
        ...acc,
        [key]: {
          method: currentRoute.method,
          url: `${basePath}/${currentRoute.pathName}`
        }
      }
    }, {} as RouteApi)
  }
}

/** URL of the API will be rewritten in next.config */
export const apiBaseUrlPath = `/api`

export const BACKEND_API = getBackendApiConfig(apiBaseUrlPath)

export const DOCUMENTATION_URL =
  process.env.NEXT_PUBLIC_DOCUMENTATION_URL ||
  'https://contractwizard-docs.vercel.app/'
