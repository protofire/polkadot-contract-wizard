import { Grid, Box } from '@mui/material'
import { StyledButton as Button, MyButtonProps } from '@components'

type Props = {
  nextLabel?: string
  handleNext?: () => void
  backLabel?: string
  handleBack: () => void
  isNextDisabled?: boolean
  isDoingNext?: boolean
  nextButtonProps?: MyButtonProps
  backButtonProps?: MyButtonProps
  hiddenBack?: boolean
}
export default function BackNextButton(props: Props) {
  const {
    handleNext,
    handleBack,
    nextLabel = 'Next',
    backLabel = 'Back',
    isNextDisabled = false,
    isDoingNext = false,
    nextButtonProps,
    backButtonProps,
    hiddenBack = false
  } = props

  return (
    <Grid
      item
      xs={12}
      mt={9}
      sx={{ display: 'flex', justifyContent: 'space-between' }}
    >
      {hiddenBack ? (
        <Box sx={{ width: '30%' }} />
      ) : (
        <Button
          size="large"
          variant="outlined"
          onClick={handleBack}
          disabled={isDoingNext === true}
          {...backButtonProps}
        >
          {backLabel}
        </Button>
      )}
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
