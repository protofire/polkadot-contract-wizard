import { useTheme } from '@mui/material/styles'

export function useStyleAutocomplete() {
  const theme = useTheme()

  return {
    border: 'none !important',
    color: theme.palette.primary.main,
    '& fieldset': {
      borderColor: 'white'
    },
    '& .MuiInputBase-root': {
      borderColor: 'white !important',
      color: '#D9D9D9 !important'
    }
  }
}
