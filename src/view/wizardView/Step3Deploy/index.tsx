import { useEffect, useMemo, useState } from 'react'
import { Grid, Stack, Typography } from '@mui/material'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import Image from 'next/image'

import { useStepsSCWizard } from '@context'
import BackNextButton from '../BackNextButtons'
import { TokenType } from '@types'
import StyledTextField from '../../components/Input'
import {
  GIF_COMPILING,
  SVG_AWESOME,
  SVG_SUCCESSFULLY
} from 'src/constants/images'
import {
  ConstructorFieldName,
  ConstructorTokenField,
  ControlsToken
} from '@constants'
import { FormEvent } from 'src/domain/common/FormEvent'
import {
  DataCompiledContract,
  useCreateCompilation
} from 'src/hooks/useCreateCompilation'

function textFieldFactory(field: ConstructorTokenField, required = true) {
  {
    return (
      <StyledTextField
        key={field.name}
        label={field.name}
        type={field.type}
        required={required}
        name={field.fieldName}
        placeholder={field.placeholder}
      />
    )
  }
}

function useMemoizeFields(
  optionList: ConstructorTokenField[] | undefined,
  hasMetadata: boolean
) {
  return useMemo(
    () => ({
      mandatoryFields:
        (optionList && optionList.filter(field => field.mandatory)) || [],
      metadataFields:
        (hasMetadata &&
          optionList &&
          optionList.filter(field => !field.mandatory)) ||
        []
    }),
    [optionList, hasMetadata]
  )
}

export default function Step3Deploy({
  constructorFields
}: {
  tokenType: TokenType
  constructorFields?: ControlsToken<'Constructor'>
}) {
  const { handleBack, handleNext, dataForm } = useStepsSCWizard()
  const [contractCompiled, setContractCompiled] =
    useState<DataCompiledContract>()
  const { mandatoryFields, metadataFields } = useMemoizeFields(
    constructorFields?.optionList,
    dataForm.extensions.Metadata as boolean
  )
  const { compileContract } = useCreateCompilation()
  const areThereParameters =
    mandatoryFields.length > 0 || metadataFields.length > 0
  const isButtonNextDisabled = contractCompiled === undefined

  useEffect(() => {
    // TODO replace with real request
    compileContract().then(setContractCompiled)
  }, [compileContract])

  const handleSubmit = async (
    event: FormEvent<{ [key in ConstructorFieldName]: string }>
  ) => {
    event.preventDefault()
    const { elements } = event.target

    const dataForm: Array<[ConstructorFieldName, string | number]> = []

    mandatoryFields.forEach(field => {
      if (elements[field.fieldName]) {
        dataForm.push([
          field.fieldName,
          field.type === 'number'
            ? Number(elements[field.fieldName].value)
            : elements[field.fieldName].value
        ])
      }
    })

    // TODO
    handleNext()
  }

  return (
    <>
      <Grid container justifyContent="center">
        <Grid item>
          <Stack
            sx={{
              background: '#20222D',
              borderRadius: '1rem',
              alignItems: 'center',
              maxWidth: '30rem',
              margin: '2rem auto 3rem auto',
              padding: '0 1rem',
              flexDirection: 'row'
            }}
          >
            <Image
              alt={contractCompiled ? 'successfully' : 'compiling'}
              src={contractCompiled ? SVG_SUCCESSFULLY : GIF_COMPILING}
              width={150}
              height={150}
            />
            <Typography variant="h4" align="center" sx={{ margin: '0 1rem' }}>
              {contractCompiled ? (
                <>
                  <p>Contract successfully compiled.</p>
                  <Image
                    alt="awesome"
                    src={SVG_AWESOME}
                    width={22}
                    height={22}
                  />
                </>
              ) : (
                <p>Your contract is being compiled by us.</p>
              )}
            </Typography>
          </Stack>
          {areThereParameters && (
            <form id="deploy-form" onSubmit={handleSubmit}>
              <Stack
                sx={{
                  padding: '1rem',
                  alignItems: 'center'
                }}
              >
                <Typography variant="h3" align="center">
                  You need to fill the constructor parameters for the
                  deployment.
                </Typography>
                <ArrowDownwardIcon
                  fontSize="large"
                  sx={{ margin: '1rem 0 0 0' }}
                />
              </Stack>

              <Stack
                sx={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}
              >
                {mandatoryFields.map(field => textFieldFactory(field))}
                {metadataFields.map(field => textFieldFactory(field))}
              </Stack>
            </form>
          )}
        </Grid>
      </Grid>
      <BackNextButton
        nextLabel="Deploy Contract"
        handleBack={handleBack}
        hiddenBack={true}
        nextButtonProps={{
          startIcon: isButtonNextDisabled ? '🚫' : '🚀',
          type: 'submit',
          form: 'deploy-form',
          disabled: isButtonNextDisabled
        }}
      />
    </>
  )
}
