import { Grid, Box, styled, BoxProps } from '@mui/material'
import { West as WestIcon, East as EastIcon } from '@mui/icons-material'

import { LoadingButton as Button, LoadingButtonProps } from '@/components'

type Props = {
  nextLabel?: React.ReactNode
  handleNext?: () => void
  backLabel?: React.ReactNode
  handleBack: () => void
  isNextDisabled?: boolean
  isDoingNext?: boolean
  nextButtonProps?: LoadingButtonProps
  backButtonProps?: LoadingButtonProps
  hiddenBack?: boolean
}

const BoxStyled = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  gap: '0.5rem'
}))

export default function BackNextButton(props: Props) {
  const {
    handleNext,
    handleBack,
    nextLabel = (
      <>
        {'Next'}
        <EastIcon />
      </>
    ),
    backLabel = (
      <>
        <WestIcon />
        {'Back'}
      </>
    ),
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
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        position: 'fixed',
        /* width: 'calc(90% - 4rem)', */
        width: '76%',
        bottom: '1rem',
        background: '#222222dd',
        padding: '1rem',
        borderRadius: '10rem'
      }}
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
          <BoxStyled>{backLabel}</BoxStyled>
        </Button>
      )}
      <Button
        size="large"
        variant="contained"
        onClick={handleNext}
        disabled={isNextDisabled}
        {...nextButtonProps}
      >
        <BoxStyled>{nextLabel}</BoxStyled>
      </Button>
    </Grid>
  )
}
