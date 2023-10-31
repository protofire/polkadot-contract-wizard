import {
  DOMAIN,
  IS_DEVELOPMENT,
  IS_PRODUCTION,
  apiBaseUrlPath,
  getBackendApiConfig
} from '@/constants'
import { UserContractDetails } from '@/domain'
import { ApiDeploymentRepository } from '@/services/backendApi/ApiDeploymentRepository'
import { ApiCompileContractRepository } from '@/services/backendApi/ApiCompileContractRepository'

const _basePath = IS_DEVELOPMENT ? `${DOMAIN}${apiBaseUrlPath}` : apiBaseUrlPath

const apiDeploymentsRepository = new ApiDeploymentRepository(
  getBackendApiConfig(_basePath)
)
const apiCompileContractRepository = new ApiCompileContractRepository(
  getBackendApiConfig(_basePath)
)

export async function fetchContractByUUID(
  uuid: string
): Promise<UserContractDetails | undefined> {
  if (!uuid) {
    throw new Error('UUID is required')
  }

  try {
    const response = await apiDeploymentsRepository.get(uuid)

    if (!response) return

    if (!response.abi) {
      const compiled = await apiCompileContractRepository.search(
        response.codeId
      )
      response.abi = JSON.parse(compiled['data'].metadata)
    }

    return response
  } catch (error) {
    console.error('Error fetching contract by UUID:', error)
    throw error
  }
}
