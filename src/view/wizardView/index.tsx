import React, { useMemo } from 'react'
import { Typography, StepLabel, Step, Stepper, Box } from '@mui/material'

import Step1Extensions from './Step1Extensions'
import Step2Security from './Step2Security'
import Step3Deploy from './Step3Deploy'
import { Button, Stepper as StepperWrapper } from '@components'
import { StepsSCWizardContext } from '@context'
import { TokenType } from '@types'
import { TokenOptionConfig, WIZARD_CONFIG } from '@constants'

const STEPS = ['Extensions', 'Security', 'Deploy']

function getInitialValues(tokenOptionsConfig: TokenOptionConfig | undefined) {
  if (tokenOptionsConfig === undefined) return []

  return tokenOptionsConfig.controls.map((controlSection) =>
    Object.assign({},
      ...controlSection.optionList.map((control) => ({ [control.name]: control.initState }))
    )
  )

}

export default function FormWizard({ token }: { token: TokenType }): JSX.Element {
  const [activeStep, setActiveStep] = React.useState(0)
  const optionFields = useMemo(() => WIZARD_CONFIG.find((_token) => _token.name === token), [token])
  const initialValues = useMemo(() => getInitialValues(optionFields), [optionFields])
  const [dataForm, setDataForm] = React.useState({ extensions: initialValues })

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  const resetDataForm = () => {
    setDataForm({ extensions: initialValues })
  }

  const getStepContent = () => {
    switch (activeStep) {
      case 0:
        return <Step1Extensions optionFields={optionFields} />

      case 1:
        return <Step2Security />

      case 2:
        return <Step3Deploy tokenType={token} />

      default:
        return null
    }
  }

  return (
    <StepsSCWizardContext.Provider
      value={{
        dataForm,
        setDataForm,
        activeStep,
        handleBack,
        handleNext,
        resetDataForm,
      }}
    >
      <Box sx={{ width: '100%' }}>
        <StepperWrapper>
          <Stepper activeStep={activeStep}>
            {STEPS.map((label) => {
              const stepProps: { completed?: boolean } = {}
              const labelProps: {
                optional?: React.ReactNode
              } = {}
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              )
            })}
          </Stepper>
        </StepperWrapper>
        {activeStep === STEPS.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              We are deploying your contract now.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>{getStepContent()}</React.Fragment>
        )}
      </Box>
    </StepsSCWizardContext.Provider>
  )
}
