import {
  LoadingButton,
  LoadingButtonProps,
  StyledTextField
} from '@/view/components'
import { alpha, styled } from '@mui/material/styles'

export const ButtonCall = styled(LoadingButton)<LoadingButtonProps>(
  ({ theme }) => ({
    fontSize: '1rem',
    height: '2.5rem',
    borderRadius: '1.5rem',
    textTransform: 'none',
    border: theme.palette.primary.main,
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
    '& .MuiCircularProgress-root': {
      color: theme.palette.common.white
    }
  })
)

export const MinimalTextField = styled(StyledTextField)(({ theme }) => ({
  border: 'none',
  backgroundColor: alpha(theme.palette.primary.light, 0.1),
  color: theme.palette.primary.main,
  '& .MuiOutlinedInput-root fieldset': {
    borderColor: 'transparent !important'
  }
}))
