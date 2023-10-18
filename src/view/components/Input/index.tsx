import { styled } from '@mui/material'
import {
  TextFieldWithLoading,
  TextFieldWithLoadingProps
} from './TextFieldWithLoading'

export const StyledTextField = styled(
  TextFieldWithLoading
)<TextFieldWithLoadingProps>(({ theme }) => ({
  '& .MuiInputBase-input': {
    color: theme.palette.secondary.light
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
