import { LoadingButton, LoadingButtonProps } from '@/view/components'
import { styled } from '@mui/material/styles'

export const ButtonCall = styled(LoadingButton)<LoadingButtonProps>(
  ({ theme }) => ({
    fontSize: '1rem',
    height: '2.5rem',
    borderRadius: '1.5rem',
    textTransform: 'none',
    background: theme.palette.primary.main
  })
)
