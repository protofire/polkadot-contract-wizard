import { useMemo } from 'react'
import { Grid, Stack, Typography } from '@mui/material'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import Image from 'next/image'

import { useStepsSCWizard } from '@context'
import BackNextButton from '../BackNextButtons'
import { TokenType } from '@types'
import StyledTextField from '../../components/Input'
import { CompilingAnimation } from 'src/constants/images'
import { ConstructorTokenField, ControlsToken } from '@constants'

export default function Step3Deploy({
  constructorFields
}: {
  tokenType: TokenType
  constructorFields?: ControlsToken
}) {
  const { handleBack, handleNext, dataForm } = useStepsSCWizard()
  const { mandatoryFields, metadataFields } = useMemo(() => {
    return {
      mandatoryFields:
        constructorFields?.optionList.filter(
          field => (field as ConstructorTokenField).required
        ) || [],
      metadataFields:
        (dataForm.extensions.Metadata &&
          constructorFields?.optionList.filter(
            field => !(field as ConstructorTokenField).required
          )) ||
        []
    }
  }, [constructorFields?.optionList, dataForm.extensions.Metadata])
  const areThereParameters =
    mandatoryFields.length > 0 || metadataFields.length > 0

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
              alt="compiling"
              src={CompilingAnimation}
              width={150}
              height={150}
            />
            <Typography variant="h4" align="center" sx={{ margin: '0 1rem' }}>
              Your contract is being compiled by us.{' '}
            </Typography>
          </Stack>
          {areThereParameters && (
            <>
              <Stack
                sx={{
                  padding: '1rem',
                  alignItems: 'center'
                }}
              >
                <Typography variant="h3" align="center">
                  Meanwhile, you can start filling the form for the deployment.{' '}
                </Typography>
                <ArrowDownwardIcon
                  fontSize="large"
                  sx={{ margin: '1rem 0 0 0' }}
                />
              </Stack>

              <Stack
                sx={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}
              >
                {mandatoryFields.map(field => (
                  <StyledTextField
                    key={field.name}
                    label={field.name}
                    required
                    type={field.type}
                  ></StyledTextField>
                ))}
                {metadataFields.map(field => (
                  <StyledTextField
                    key={field.name}
                    label={field.name}
                    type={field.type}
                  ></StyledTextField>
                ))}
              </Stack>
            </>
          )}
        </Grid>
      </Grid>
      <BackNextButton
        nextLabel="Deploy Contract"
        handleBack={handleBack}
        handleNext={handleNext}
        nextButtonProps={{ startIcon: '🚀' }}
      />
    </>
  )
}
