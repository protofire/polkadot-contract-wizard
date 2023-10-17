import { BackendApiConfig } from '@/constants/config'
import { ICompileContractRepository } from '@/domain/repositories/CompileContractRepository'
import { AllowedFeatures, ContractCompiledResponse, request } from '@/services'

export interface CompileContractBody {
  address: string
  code: string
  features: AllowedFeatures[]
}

export type IApiCompileContractRepository = ICompileContractRepository<
  CompileContractBody,
  ContractCompiledResponse
>

/*
 * Class that implements the Repository pattern for
 * handling contracts compiled via the backend REST API.
 */
export class ApiCompileContractRepository
  implements IApiCompileContractRepository
{
  constructor(private readonly backenApiConfig: BackendApiConfig) {}

  async create(
    compileContract: CompileContractBody
  ): Promise<ContractCompiledResponse> {
    return request(this.backenApiConfig.routes.createCompileContract.url, {
      method: this.backenApiConfig.routes.createCompileContract.method,
      body: JSON.stringify(this.filterNullSecurity(compileContract))
    })
  }

  private filterNullSecurity(compileContract: CompileContractBody) {
    return {
      ...compileContract,
      features: compileContract.features.filter(e => e)
    }
  }

  async search(codeId: string) {
    const { url, method } = this.backenApiConfig.routes.searchCompileContract

    return request<ContractCompiledResponse>(
      `${url}${encodeURIComponent(codeId)}`,
      {
        method: method
      }
    )
  }
}
