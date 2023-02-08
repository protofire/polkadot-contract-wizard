import { createContext, useContext } from 'react'

export interface StepsSmartContractWizard {
  activeStep: number
  handleBack: () => void
  handleNext: () => void
}

export const StepsSCWizardContext = createContext({} as StepsSmartContractWizard)

export function useStepsSCWizard() {
  const context = useContext(StepsSCWizardContext)
  if (!context) {
    throw new Error('useStepsSCWizard must be used within the context Provider')
  }
  return context
}

