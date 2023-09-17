import { ContractCompiled } from '@/infrastructure'
import { CompileContractBody } from '@/infrastructure/backendApi/ApiCompileContractRepository'

export interface CompileContractRepository {
  create: (compileContract: CompileContractBody) => Promise<ContractCompiled>
  search: (codeId: string) => Promise<ContractCompiled>
}
