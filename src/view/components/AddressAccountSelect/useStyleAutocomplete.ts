import { useTheme } from '@mui/material/styles'

export function useStyleAutocomplete() {
  const theme = useTheme()

  return {
    border: 'transparent !important',
    color: theme.palette.primary.main,
    '& fieldset': {
      borderColor: 'white'
    },
    '& .MuiInputBase-root': {
      color: theme.palette.secondary.light
    }
  }
}
