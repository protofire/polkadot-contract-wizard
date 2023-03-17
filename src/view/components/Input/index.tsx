import { TextField, styled } from '@mui/material'

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-input': {
    color: theme.palette.secondary.light
  },
  '& input[type=number]': {
    '-moz-appearance': 'textfield'
  },
  '& input[type=number]::-webkit-outer-spin-button': {
    '-webkit-appearance': 'none',
    margin: 0
  },
  '& input[type=number]::-webkit-inner-spin-button': {
    '-webkit-appearance': 'none',
    margin: 0
  }
}))

export default StyledTextField
