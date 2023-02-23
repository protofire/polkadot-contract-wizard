import * as React from 'react'
import { Typography, StepLabel, Step, Stepper, Box } from '@mui/material'

import Step1Extensions from './Step1Extensions'
import Step2Security from './Step2Security'
import Step3Deploy from './Step3Deploy'
import { Button, Stepper as StepperWrapper } from '@components'
import { DEFAULT_TOKEN_VALUES, StepsSCWizardContext } from '@context'
import { TokenType } from '@types'

const STEPS = ['Extensions', 'Security', 'Deploy']

export default function FormWizard({ token }: { token: TokenType }) {
  const [activeStep, setActiveStep] = React.useState(0)
  const [dataForm, setDataForm] = React.useState(DEFAULT_TOKEN_VALUES[token])

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  const getStepContent = () => {
    switch (activeStep) {
      case 0:
        return <Step1Extensions tokenType={token} />

      case 1:
        return <Step2Security tokenType={token} />

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
        activeStep,
        handleBack,
        handleNext
      }}
    >
      <Box sx={{ width: '100%' }}>
        <StepperWrapper>
          <Stepper activeStep={activeStep}>
            {STEPS.map((label, _index) => {
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
