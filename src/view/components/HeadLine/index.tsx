import * as React from 'react'
import { styled } from '@mui/material/styles'
import Stack, { StackProps } from '@mui/material/Stack'

import Image from 'next/image'
import { Typography } from '@mui/material'

interface Props extends StackProps {
  title: string
  subtitle: string
  imgPath: string
  imgProps: { width?: number; height?: number }
}

const WrapperHead = styled(Stack)<StackProps>(({ theme }) => ({
  color: 'white',
  fontSize: '1.4rem',
  borderRadius: '1rem',
  width: '85%',
  backgroundColor: 'transparent',
  display: 'flex',
  alignItems: 'center',
  margin: '0',
  position: 'relative',
  padding: '2rem',

  [theme.breakpoints.down('sm')]: {
    width: '100%',
    margin: '0.5rem !important',
    padding: '1.5rem'
  }
}))

export const HeadLine = (props: Props) => {
  const { title, subtitle, imgProps, imgPath, ...restProps } = props

  return (
    <WrapperHead {...restProps}>
      <Stack
        spacing={{ xs: 0, sm: 2, md: 4 }}
        direction={{ xs: 'column', lg: 'row' }}
        alignItems="center"
      >
        <Image alt={title} src={imgPath} {...imgProps} />
        <Stack spacing={0} direction="column" alignItems="flex-start">
          <Typography variant="h3">{title}</Typography>
          <Typography variant="subtitle1">{subtitle}</Typography>
        </Stack>
      </Stack>
    </WrapperHead>
  )
}
