import { WizardContractConfig } from '@/domain'

export class ContractConfigMother {
  static create(params?: Partial<WizardContractConfig>): WizardContractConfig {
    const defaultParams: WizardContractConfig = {
      extensions: {},
      constructor: {},
      ...params
    }

    return defaultParams
  }
}
