import { BackendApiConfig } from '@/constants/config'
import {
  DeploymentRaw,
  DeploymentsRepository
} from '@/domain/repositories/DeploymentRepository'
import { ChainId } from '@/infrastructure/useink/chains'
import { request } from '@/infrastructure/common/request'

interface ApiResponse {
  data: string
  error: string | null
}

export class ApiDeploymentRepository
  implements DeploymentsRepository<ApiResponse>
{
  constructor(private readonly backenApiConfig: BackendApiConfig) {}

  async add(deployment: DeploymentRaw): Promise<ApiResponse> {
    return request(this.backenApiConfig.routes.createDeployment.url, {
      method: this.backenApiConfig.routes.createCompileContract.method,
      body: JSON.stringify(deployment)
    })
  }
  async findBy(
    userAddress: string,
    networkId?: ChainId | undefined
  ): Promise<DeploymentRaw> {
    const { url, method } = this.backenApiConfig.routes.listDeployment

    return request<DeploymentRaw>(
      `${url}${encodeURIComponent(userAddress)}${encodeURIComponent(
        networkId
      )}`,
      {
        method: method
      }
    )
  }
}
