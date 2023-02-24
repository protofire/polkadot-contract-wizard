import { Dispatch, createContext, SetStateAction, useContext } from 'react'

import { TokenType } from '@types'
import { PSPTokens } from 'src/types/smartContract/tokens'

export const DEFAULT_TOKEN_VALUES: Record<TokenType, PSPTokens> = {
  psp22: {
    metadata: {
      active: false,
      name: 'Contract'
    },
    mintable: false,
    burnable: false,
    wrapper: false,
    flashMint: false,
    pausable: false,
    capped: false
  },
  psp34: {
    metadata: {
      active: false,
      name: 'Contract'
    },
    mintable: false,
    burnable: false,
    enumerable: false
  },
  psp37: {
    metadata: {
      active: false,
      name: 'Contract'
    },
    batch: false,
    mintable: false,
    burnable: false,
    enumerable: false
  }
}

export interface StepsSmartContractWizard {
  activeStep: number
  handleBack: () => void
  handleNext: () => void
  dataForm: PSPTokens
  setDataForm: Dispatch<SetStateAction<PSPTokens>>
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
