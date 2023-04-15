import { BackendApiConfig } from '@/constants/config'
import { TokenType, SecurityOfToken } from '@/types'
import { ContractCompiled, request } from '@/infrastructure'

export interface CompileContractBody {
  address: string
  code: string
  features: [TokenType, SecurityOfToken?]
}

/*
 * Class that implements the Repository pattern for
 * handling contracts compiled via the backend REST API.
 */
export class CompileContractApiRepository {
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
}
