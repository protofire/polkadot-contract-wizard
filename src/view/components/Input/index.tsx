import { styled } from '@mui/material/styles'
import {
  TextFieldWithLoading,
  TextFieldWithLoadingProps
} from './TextFieldWithLoading'

export const StyledTextField = styled(
  TextFieldWithLoading
)<TextFieldWithLoadingProps>(({ theme }) => ({
  '& .MuiInputBase-input': {
    color: theme.palette.secondary.light,
    '&:disabled': {
      opacity: '0.5',

      '&:hover': {
        cursor: 'not-allowed'
      }
    }
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.common.white
    },
    '&:hover fieldset': {
      borderColor: theme.palette.secondary.light
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main
    },
    '&.Mui-disabled fieldset': {
      borderColor: theme.palette.secondary.dark
    }
  },

  '& input[type=number]': {
    MozAppearance: 'textfield'
  },
  '& input[type=number]::-webkit-outer-spin-button': {
    WebkitAppearance: 'none',
    margin: 0
  },
  '& input[type=number]::-webkit-inner-spin-button': {
    WebkitAppearance: 'none',
    margin: 0
  }
}))
