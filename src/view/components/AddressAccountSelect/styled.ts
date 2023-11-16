import { Select } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledSelect = styled(Select)(({ theme }) => ({
  '& .MuiSelect-root:hover': {
    borderColor: 'red'
  },

  '& fieldset': {
    borderColor: theme.palette.common.white
  }
}))
