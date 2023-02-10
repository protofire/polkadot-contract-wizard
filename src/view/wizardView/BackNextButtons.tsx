import { ButtonProps, Grid } from '@mui/material'
import { Button } from '@components'

type Props = {
  nextLabel?: string
  handleNext: () => void
  backLabel?: string
  handleBack: () => void
  isNextDisabled?: boolean
  isDoingNext?: boolean
  nextButtonProps?: ButtonProps
  backButtonProps?: ButtonProps
}
export default function BackNextButton(props: Props) {
  const {
    handleNext,
    handleBack,
    nextLabel = 'Next',
    backLabel = 'Back',
    isNextDisabled = false,
    isDoingNext = false,
    nextButtonProps
  } = props

  return (
    <Grid
      item
      xs={12}
      mt={9}
      sx={{ display: 'flex', justifyContent: 'space-between' }}
    >
      <Button
        size="large"
        variant="outlined"
        onClick={handleBack}
        disabled={isDoingNext === true}
      >
        {backLabel}
      </Button>
      <Button
        size="large"
        variant="contained"
        onClick={handleNext}
        disabled={isNextDisabled}
        {...nextButtonProps}
      >
        {nextLabel}
      </Button>
    </Grid>
  )
}
