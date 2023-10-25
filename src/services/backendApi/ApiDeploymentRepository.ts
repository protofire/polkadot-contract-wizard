import { BackendApiConfig } from '@/constants/config'
import {
  ContractType,
  UpdateDeployment,
  IDeploymentsRepository
} from '@/domain/repositories/DeploymentRepository'
import { ChainId } from '@/services/useink/chains'
import { request } from '@/services/common/request'
import { RootApiResponse } from './types'
import { fromDeploymentItemToRaw } from '@/services/transformers/toDeploymentRaw'
import { deploymentRawToUserContractDetails } from '../transformers/toUserContractDetails'
import { UserContractDetails, UserContractDetailsDraft } from '@/domain'

export interface DeploymentRaw {
  _id: { $oid: string }
  contract_name: string
  contract_address: string
  network: ChainId
  code_id: string
  user_address: string
  tx_hash?: string
  date: string
  contract_type: ContractType
  external_abi?: string
  hidden: boolean
}

export type IApiDeploymentRepository = IDeploymentsRepository<
  RootApiResponse<string>,
  UserContractDetails[]
>

export class ApiDeploymentRepository implements IApiDeploymentRepository {
  constructor(private readonly backenApiConfig: BackendApiConfig) {}

  async add(
    deployment: UserContractDetailsDraft
  ): Promise<RootApiResponse<string>> {
    return request<RootApiResponse<string>>(
      this.backenApiConfig.routes.createDeployment.url,
      {
        method: this.backenApiConfig.routes.createCompileContract.method,
        body: JSON.stringify(fromDeploymentItemToRaw(deployment))
      }
    )
  }

  async findBy(
    userAddress: string,
    networkId?: ChainId | undefined
  ): Promise<UserContractDetails[]> {
    const { url, method } = this.backenApiConfig.routes.listDeployment

    const suffixUrl = networkId
      ? `&network=${encodeURIComponent(networkId)}`
      : ''

    const { data } = await request<RootApiResponse<DeploymentRaw[]>>(
      `${url}${encodeURIComponent(userAddress)}${suffixUrl}`,
      {
        method: method
      }
    )
    return data.map(e => deploymentRawToUserContractDetails(e))
  }

  async updateBy(
    deployment: UpdateDeployment
  ): Promise<RootApiResponse<string>> {
    return request<RootApiResponse<string>>(
      this.backenApiConfig.routes.createDeployment.url,
      {
        method: this.backenApiConfig.routes.updateDeployment.method,
        body: JSON.stringify({
          contract_address: deployment.address,
          user_address: deployment.userAddress,
          network: deployment.network,
          contract_name: deployment.name,
          hidden: deployment.hidden ?? false
        })
      }
    )
  }
}
