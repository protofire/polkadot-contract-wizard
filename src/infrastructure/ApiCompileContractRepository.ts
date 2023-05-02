import { BackendApiConfig } from '@/constants/config'
import { CompileContractRepository } from '@/domain/CompileContractRepository'
import { AllowedFeatures, ContractCompiled, request } from '@/infrastructure'

export interface CompileContractBody {
  address: string
  code: string
  features: AllowedFeatures[]
}

/*
 * Class that implements the Repository pattern for
 * handling contracts compiled via the backend REST API.
 */
export class ApiCompileContractRepository implements CompileContractRepository {
  constructor(private readonly backenApiConfig: BackendApiConfig) {}

  async create(
    compileContract: CompileContractBody
  ): Promise<ContractCompiled> {
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

    return request<ContractCompiled>(`${url}${encodeURIComponent(codeId)}`, {
      method: method
    })
  }
}
