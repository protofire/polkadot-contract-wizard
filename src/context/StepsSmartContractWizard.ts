import { Dispatch, createContext, SetStateAction, useContext } from 'react'

import { OptionInitState, Security } from '@types'

interface PSPTokens extends Security {
  extensions: OptionInitState[]
}

export interface StepsSmartContractWizard {
  activeStep: number
  handleBack: () => void
  handleNext: () => void
  dataForm: PSPTokens
  setDataForm: Dispatch<SetStateAction<PSPTokens>>
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
