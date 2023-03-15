import { Stack, Typography } from '@mui/material'

import { useStepsSCWizard } from '@context'
import BackNextButton from '../BackNextButtons'
import { TokenType } from '@types'
import StyledTextField from '../../components/Input'

export default function Step3Deploy({ tokenType }: { tokenType: TokenType }) {
  const { handleBack, handleNext } = useStepsSCWizard()

  return (
    <>
      <Stack direction="row" spacing={4} alignItems="center" m={4}>
        <Stack direction="column" spacing={1} alignItems="center">
          <Typography variant="h2">
            Your contract ({tokenType}) is being compiled by us.{' '}
          </Typography>
          <Typography variant="h4">
            Meanwhile, you can start filling the form for the deployment.
          </Typography>
        </Stack>
        <Stack direction="column" spacing={1} alignItems="center">
          <StyledTextField label="Name"></StyledTextField>
          <StyledTextField label="Decimals"></StyledTextField>
          <StyledTextField label="Symbol"></StyledTextField>
          <StyledTextField label="Initial supply"></StyledTextField>
        </Stack>
      </Stack>
      <BackNextButton
        nextLabel="Deploy Contract"
        handleBack={handleBack}
        handleNext={handleNext}
        nextButtonProps={{ startIcon: '🚀' }}
      />
    </>
  )
}
