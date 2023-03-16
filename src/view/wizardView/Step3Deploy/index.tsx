import { useMemo } from 'react'
import { Grid, Stack, Typography } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Image from 'next/image'

import { useStepsSCWizard } from '@context'
import BackNextButton from '../BackNextButtons'
import { TokenType } from '@types'
import StyledTextField from '../../components/Input'
import { CompilingAnimation } from 'src/constants/images'
import { ConstructorTokenField, ControlsToken } from '@constants'

export default function Step3Deploy({
  tokenType,
  constructorFields
}: {
  tokenType: TokenType
  constructorFields?: ControlsToken
}) {
  const { handleBack, handleNext, dataForm } = useStepsSCWizard()
  const { mandatoryFields, metadataFields } = useMemo(() => {
    return {
      mandatoryFields: constructorFields?.optionList.filter(
        field => (field as ConstructorTokenField).required
      ),
      metadataFields:
        dataForm.extensions.Metadata &&
        constructorFields?.optionList.filter(
          field => !(field as ConstructorTokenField).required
        )
    }
  }, [constructorFields?.optionList, dataForm.extensions.Metadata])

  console.log('mada', mandatoryFields, 'meta', metadataFields)

  return (
    <>
      <Grid container columns={{ xs: 12, md: 12 }} spacing={6}>
        <Grid item sm={12} md={6}>
          <Stack
            sx={{
              background: '#20222D',
              borderRadius: '1rem',
              alignItems: 'center'
            }}
          >
            <Image
              alt="Logo polkadot"
              src={CompilingAnimation}
              width={180}
              height={180}
            />
            <Typography variant="h4">
              Your contract ({tokenType}) is being compiled by us.{' '}
            </Typography>
            <Stack
              sx={{
                background: 'black',
                borderRadius: '0 0 1rem 1rem',
                width: '100%',
                padding: '1rem',
                margin: '1rem 0 0 0',
                justifyItems: 'center'
              }}
            >
              <Typography variant="h3">
                Meanwhile, you can start filling the form for the deployment.{' '}
                <ArrowForwardIcon fontSize="large" />
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item sm={12} md={6}>
          <Stack
            sx={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}
          >
            <StyledTextField label="Name"></StyledTextField>
            <StyledTextField label="Decimals"></StyledTextField>
            <StyledTextField label="Symbol"></StyledTextField>
            <StyledTextField label="Initial supply"></StyledTextField>
          </Stack>
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
