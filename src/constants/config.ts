export const IS_PRODUCTION = process.env.NODE_ENV === ('production' as string)
export const IS_DEVELOPMENT = process.env.NODE_ENV === ('development' as string)

export interface DappConfig {
  name: string
  providerSocket: string
}

export const DAPP_CONFIG: DappConfig = {
  name: 'Polkadot contract wizard',
  providerSocket: 'wss://rococo-contracts-rpc.polkadot.io'
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
  searchCompileContract: {
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

/** URL of the API will be rewritten in next.config */
const apiBaseUrlPath = '/api'

export const BACKEND_API: BackendApiConfig = {
  basePath: apiBaseUrlPath,
  routes: Object.keys(backendRouterApi).reduce((acc, key) => {
    const currentRoute = backendRouterApi[key as BackendRoutesApi]
    return {
      ...acc,
      [key]: {
        method: currentRoute.method,
        url: `${apiBaseUrlPath}/${currentRoute.pathName}`
      }
    }
  }, {} as RouteApi)
}
