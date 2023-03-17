import * as React from 'react'
import { styled } from '@mui/material/styles'
import Button, { ButtonProps } from '@mui/material/Button'
import Stack from '@mui/material/Stack'

import Image from 'next/image'
import { Typography } from '@mui/material'

interface Props extends ButtonProps {
  title: string
  subtitle: string
  imgPath: string
  imgProps: { width?: number; height?: number }
}

const WrapperButton = styled(Button)<ButtonProps>(({ theme }) => ({
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
  border: 'solid 1px transparent',
  backgroundImage:
    'linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)), linear-gradient(180deg, #B214AC, #8C7524)',
  backgroundOrigin: 'border-box',
  backgroundClip: 'content-box, border-box',
  boxShadow: '2px 1000px 1px #0D0E13 inset',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    margin: '0.5rem !important',
    padding: '1.5rem'
  },

  '&:hover': {
    backgroundImage:
      'linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)), linear-gradient(90deg, #ffffff, #ffb7ff)',
    backgroundOrigin: 'border-box',
    backgroundClip: 'content-box, border-box',
    boxShadow:
      '2px 1000px 1px #11121a inset, 0 4px 20px 2px rgba(241, 83, 255, 0.25)'
  }
}))

export const HomeButton = (props: Props) => {
  const { title, subtitle, imgProps, imgPath, ...restProps } = props

  return (
    <WrapperButton variant="contained" {...restProps}>
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
    </WrapperButton>
  )
}
