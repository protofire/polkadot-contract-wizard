import { BackendApiConfig } from '@/constants/config'
import {
  ContractType,
  DeploymentItem,
  IDeploymentsRepository
} from '@/domain/repositories/DeploymentRepository'
import { ChainId } from '@/services/useink/chains'
import { request } from '@/services/common/request'
import { RootApiResponse } from './types'

interface DeploymentRaw {
  contract_name: string
  contract_address: string
  network: ChainId
  code_id: string
  user_address: string
  tx_hash?: string
  date: string
  contract_type: ContractType
  external_abi?: string
}

export type IApiDeploymentRepository = IDeploymentsRepository<
  RootApiResponse<string>,
  DeploymentItem[]
>

function adaptDeployment(deploymentRaw: DeploymentRaw): DeploymentItem {
  return {
    contractName: deploymentRaw.contract_name as DeploymentItem['contractName'],
    contractAddress: deploymentRaw.contract_address,
    network: deploymentRaw.network,
    codeId: deploymentRaw.code_id,
    userAddress: deploymentRaw.user_address,
    txHash: deploymentRaw.tx_hash,
    date: deploymentRaw.date,
    contractType: deploymentRaw.contract_type,
    externalAbi: deploymentRaw.external_abi
      ? JSON.parse(deploymentRaw.external_abi)
      : undefined
  }
}

export class ApiDeploymentRepository implements IApiDeploymentRepository {
  constructor(private readonly backenApiConfig: BackendApiConfig) {}

  async add(deployment: DeploymentItem): Promise<RootApiResponse<string>> {
    return request<RootApiResponse<string>>(
      this.backenApiConfig.routes.createDeployment.url,
      {
        method: this.backenApiConfig.routes.createCompileContract.method,
        body: JSON.stringify({
          contract_name: deployment.contractName,
          contract_address: deployment.contractAddress,
          network: deployment.network,
          code_id: deployment.codeId,
          user_address: deployment.userAddress,
          tx_hash: deployment.txHash,
          date: deployment.date,
          contract_type: deployment.contractType,
          ...(deployment.externalAbi && {
            external_abi: deployment.externalAbi
          })
        })
      }
    )
  }

  async findBy(
    userAddress: string,
    networkId?: ChainId | undefined
  ): Promise<DeploymentItem[]> {
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

    return data.map(e => adaptDeployment(e))
  }
}
