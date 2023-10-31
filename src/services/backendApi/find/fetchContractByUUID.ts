import {
  apiCompileContractRepository,
  apiDeploymentsRepository
} from '@/context/LocalDbContext'
import { UserContractDetails } from '@/domain'

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
