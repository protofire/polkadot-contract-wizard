import { BackendApiConfig } from '@/constants/config'
import { TokenType, SecurityOfToken } from '@/types'
import { ContractCompiled, request } from '@/infrastructure'

export interface CreateCompileContract {
  address: string
  code: string
  features: [TokenType, SecurityOfToken?]
}

export class CompileContractApiRepository {
  constructor(private readonly backenApiConfig: BackendApiConfig) {}

  async create(
    compileContract: CreateCompileContract
  ): Promise<ContractCompiled> {
    return request(this.backenApiConfig.routes.contract, {
      method: 'POST',
      body: JSON.stringify(compileContract)
    })
  }
}
