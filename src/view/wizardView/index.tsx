import React, { useMemo } from 'react'
import { Typography, StepLabel, Step, Stepper, Box } from '@mui/material'

import Step1Extensions from './Step1Extensions'
import Step2Compile from './Step2Compile'
import Step3Deploy from './Step3Deploy'
import { Button, Stepper as StepperWrapper } from '@components'
import { StepsSCWizardContext } from '@context'
import { TokenType } from '@types'
import { ControlsToken, WIZARD_CONFIG } from '@constants'

const STEPS = ['Extensions', 'Compile', 'Deploy']

function getInitialValues(tokenOptionsConfig: ControlsToken | undefined) {
  if (tokenOptionsConfig === undefined) return []

  return Object.assign(
    {},
    ...tokenOptionsConfig.optionList.map(control => ({
      [control.name]: control.initState
    }))
  )
}

export default function FormWizard({
  token
}: {
  token: TokenType
}): JSX.Element {
  const [activeStep, setActiveStep] = React.useState(0)
  const { extensionFields, constructorFields } = useMemo(() => {
    const currentToken = WIZARD_CONFIG.find(_token => _token.name === token)
    return {
      extensionFields: currentToken?.controls.find(
        options => options.sectionName === 'Extensions'
      ),
      constructorFields: currentToken?.controls.find(
        options => options.sectionName === 'Constructor'
      )
    }
  }, [token])
  const [dataForm, setDataForm] = React.useState({
    extensions: getInitialValues(extensionFields),
    constructor: getInitialValues(constructorFields)
  })

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
    setDataForm({
      extensions: getInitialValues(extensionFields),
      constructor: getInitialValues(constructorFields)
    })
  }

  const getStepContent = () => {
    switch (activeStep) {
      case 0: {
        if (!extensionFields) return
        return <Step1Extensions extensionFields={extensionFields} />
      }
      case 1:
        return <Step2Compile tokenType={token} />
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
        resetDataForm
      }}
    >
      <Box sx={{ width: '100%' }}>
        <StepperWrapper>
          <Stepper activeStep={activeStep}>
            {STEPS.map(label => {
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
