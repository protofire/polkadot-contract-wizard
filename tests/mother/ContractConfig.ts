import { ContractConfig } from '@/types'

export class ContractConfigMother {
  static create(params?: Partial<ContractConfig>): ContractConfig {
    const defaultParams: ContractConfig = {
      extensions: {},
      constructor: {},
      ...params
    }

    return defaultParams
  }
}
