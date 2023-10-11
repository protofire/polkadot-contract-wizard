import styled from '@emotion/styled'
import { Stack, StackProps } from '@mui/material'

export const StyledStack = styled(Stack)<
  StackProps & { logosize?: { width: number; height: number } }
>(({ logosize }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '.25rem',
  '& img': {
    width: logosize?.width ?? 'auto',
    height: logosize?.height ?? 'auto'
  }
}))
