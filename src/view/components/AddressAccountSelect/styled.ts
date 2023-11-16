import { Select, SelectProps } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledSelect = styled(Select)<SelectProps>(({ theme }) => ({
  '& .MuiSelect-root:hover': {
    borderColor: 'red'
  },

  '& fieldset': {
    borderColor: theme.palette.common.white
  }
}))
