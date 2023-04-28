import { Typography, TypographyProps, alpha } from '@mui/material'
import { styled } from '@mui/material/styles'

export const MonoTypography = styled(Typography)<TypographyProps>(
  ({ theme }) => {
    return {
      fontFamily:
        'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      backgroundColor: alpha(theme.palette.primary.light, 0.1),
      borderRadius: '0.25rem',
      padding: '0.25rem 0.375rem',
      width: 'fit-content',
      color: theme.palette.primary.main
    }
  }
)
