import { Dispatch, createContext, SetStateAction, useContext } from 'react'

import { ContractConfig } from '@types'

export interface StepsSmartContractWizard {
  activeStep: number
  handleBack: () => void
  handleNext: () => void
  dataForm: ContractConfig
  setDataForm: Dispatch<SetStateAction<ContractConfig>>
  resetDataForm: () => void
}

export const StepsSCWizardContext = createContext(
  {} as StepsSmartContractWizard
)

export function useStepsSCWizard() {
  const context = useContext(StepsSCWizardContext)
  if (!context) {
    throw new Error('useStepsSCWizard must be used within the context Provider')
  }
  return context
}
