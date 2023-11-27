import { Stack, StackProps } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StackStyled = styled(Stack)<StackProps>(() => ({
  background: '#20222D',
  borderRadius: '1rem',
  alignItems: 'center',
  maxWidth: '30rem',
  margin: '2rem auto 3rem auto',
  padding: '0 1rem',
  flexDirection: 'row'
}))
