import React, { useMemo, useState } from 'react'
import {
  Typography,
  StepLabel,
  Step,
  Stepper,
  Box,
  Grid,
  Stack
} from '@mui/material'
import NextLink from 'next/link'
import dynamic from 'next/dynamic'

import Step1Extensions from './Step1Extensions'
import { StyledButton as Button, Stepper as StepperWrapper } from '@/components'
import Image from 'next/image'
import { StepsSCWizardContext } from '@/context'
import { TokenType } from '@/types'
import { ControlsToken, ROUTES, GIF_COMPILING } from '@/constants/index'
import {
  factoryControlsToken,
  factoryOptionTokenValues
} from 'src/domain/wizard/factoriesContract'
import { ContractDeployed } from '@/domain'

const STEPS = ['Extensions', 'Compile', 'Deploy']

const Step2Compile = dynamic(
  () => import('@/view/wizardView/Step2Compile').then(res => res.default),
  { ssr: false }
)
const Step3Deploy = dynamic(
  () => import('@/view/wizardView/Step3Deploy').then(res => res.default),
  { ssr: false }
)

export default function FormWizard({
  token
}: {
  token: TokenType
}): JSX.Element {
  const [activeStep, setActiveStep] = useState(0)
  const [deployedContract, setDeployedContract] = useState<ContractDeployed>()
  const { extensionFields, constructorFields } = useMemo(() => {
    return factoryControlsToken(token)
  }, [token])
  const [dataForm, setDataForm] = React.useState({
    extensions: factoryOptionTokenValues(extensionFields),
    constructor: factoryOptionTokenValues(constructorFields)
  })

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const resetDataForm = () => {
    setDataForm({
      extensions: factoryOptionTokenValues(extensionFields),
      constructor: factoryOptionTokenValues(constructorFields)
    })
    setDeployedContract(undefined)
  }

  const getStepContent = () => {
    switch (activeStep) {
      case 0: {
        if (!extensionFields) return
        return (
          <Step1Extensions
            extensionFields={extensionFields as ControlsToken<'Extensions'>}
          />
        )
      }
      case 1:
        return <Step2Compile tokenType={token} />
      case 2:
        return (
          <Step3Deploy
            tokenType={token}
            constructorFields={
              constructorFields as ControlsToken<'Constructor'>
            }
            onDeployContract={setDeployedContract}
          />
        )
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
            <>
              <Grid container justifyContent="center">
                <Grid item>
                  <Stack
                    sx={{
                      background: '#000000',
                      borderRadius: '1rem',
                      alignItems: 'center',
                      maxWidth: '30rem',
                      margin: '2rem auto 3rem auto',
                      padding: '0 1rem',
                      flexDirection: 'row'
                    }}
                  >
                    <Typography
                      variant="h4"
                      align="center"
                      sx={{ margin: '0 1rem' }}
                    >
                      <p>
                        Your smart contract is on the network `
                        {deployedContract?.blockchain}` and its address is `
                        {deployedContract?.address}`
                      </p>
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button LinkComponent={NextLink} href={ROUTES.HOME}>
                  Back to wizard
                </Button>
              </Box>
            </>
          </React.Fragment>
        ) : (
          <React.Fragment>{getStepContent()}</React.Fragment>
        )}
      </Box>
    </StepsSCWizardContext.Provider>
  )
}
