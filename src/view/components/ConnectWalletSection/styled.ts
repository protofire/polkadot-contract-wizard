import { Typography, TypographyProps } from '@mui/material'
import { styled } from '@mui/material/styles'

export const TypographyStyled = styled(Typography)<TypographyProps>(() => ({
  fontSize: '1.3rem',
  fontVariant: 'body1'
}))
