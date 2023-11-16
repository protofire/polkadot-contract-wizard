import { Select, SelectProps } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledSelect = styled(Select)<SelectProps>(() => ({
  '& fieldset': {
    borderColor: 'white !important'
  }
}))
