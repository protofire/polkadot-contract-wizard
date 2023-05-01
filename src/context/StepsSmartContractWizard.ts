import { Dispatch, createContext, SetStateAction, useContext } from 'react'

import { WizardContractConfig } from '@/domain'

export interface StepsSmartContractWizard {
  activeStep: number
  handleBack: () => void
  handleNext: () => void
  dataForm: WizardContractConfig
  setDataForm: Dispatch<SetStateAction<WizardContractConfig>>
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
