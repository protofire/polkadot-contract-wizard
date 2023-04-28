import { Stack, StackProps, styled } from '@mui/material'
import React, { PropsWithChildren } from 'react'

const StackStyled = styled(Stack)<StackProps>(() => ({
  background: '#20222D',
  borderRadius: '1rem',
  alignItems: 'center',
  maxWidth: '30rem',
  margin: '2rem auto 3rem auto',
  padding: '0 1rem'
}))

type StackCardProps = PropsWithChildren<StackProps>

export function StackCard({ children, ...rest }: StackCardProps) {
  return <StackStyled {...rest}>{children}</StackStyled>
}
