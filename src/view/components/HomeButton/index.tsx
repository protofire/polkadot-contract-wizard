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
    padding: '1.3rem'
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
        spacing={{ xs: 1, sm: 0, md: 4 }}
        direction={{ xs: 'column', lg: 'row' }}
        alignItems="center"
      >
        <Stack
          spacing={0}
          direction="column"
          alignItems="center"
          sx={{ width: '5rem' }}
        >
          <Image alt={title} src={imgPath} {...imgProps} />
        </Stack>
        <Stack
          direction="column"
          alignItems={{ xs: 'center', md: 'center', lg: 'flex-start' }}
          sx={{
            width: { xs: '100%', md: '100%', lg: '27rem' },
            marginTop: { sm: '1rem !important', lg: '0 !important' }
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: '1rem', md: '1.2rem', lg: '1.4rem' }
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            sx={{
              fontSize: { xs: '0.8rem', md: '0.9rem', lg: '0.9rem' },
              opacity: '0.6',
              fontWeight: '400'
            }}
          >
            {subtitle}
          </Typography>
        </Stack>
      </Stack>
    </WrapperButton>
  )
}
