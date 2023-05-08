import { TextField, TextFieldProps, styled } from '@mui/material'

export const StyledTextField = styled(TextField)<TextFieldProps>(
  ({ theme }) => ({
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
  })
)
