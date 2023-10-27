import { BACKEND_API, BackendApiConfig } from '@/constants'
import { getErrorMessage } from '@/utils/error'
import { request } from '@/services/common/request'
import { RootApiResponse } from './types'

export class ApiVersionService {
  static DEFAULT_API_VERSION = '0.0.0'

  constructor(private readonly backenApiConfig: BackendApiConfig) {}

  async getApiVersion(): Promise<string> {
    let version = ApiVersionService.DEFAULT_API_VERSION

    try {
      const response = await request<RootApiResponse<string>>(
        this.backenApiConfig.routes.version.url,
        {
          method: this.backenApiConfig.routes.version.method
        }
      )

      if (!response) {
        throw new Error('Failed to fetch API version')
      }
      if (response.error) {
        throw new Error(response.error.message)
      }
      version = response.data
    } catch (error) {
      const e = getErrorMessage(error)

      console.error(e)
    } finally {
      return version
    }
  }
}

export const apiVersionService = new ApiVersionService(BACKEND_API)
