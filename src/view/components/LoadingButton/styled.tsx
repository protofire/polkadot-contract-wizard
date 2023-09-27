import { styled } from '@mui/material/styles'
import { Button, ButtonProps } from '@mui/material'

export const StyledButton = styled(Button)<
  ButtonProps & { isLoading: boolean }
>(({ theme, isLoading }) => ({
  textTransform: 'uppercase',
  color: theme.palette.primary.main,
  fontSize: '1.4rem',
  borderRadius: '5rem',
  padding: '8px 16px',
  minWidth: '11rem',
  border: '1px solid',
  backgroundColor: '#e6007b2f',

  '&:hover': {
    backgroundColor: '#e6007b83',
    color: 'white',
    border: '1px solid #c00569 '
  },

  ...(!isLoading && {
    '&:disabled': {
      color: theme.palette.grey[600]
    }
  }),

  '&.MuiButton-outlined': {
    color: 'white',
    borderColor: theme.palette.primary.main,
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      border: '1px solid'
    }
  }
}))
