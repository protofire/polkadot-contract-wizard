import * as React from 'react'
import { WrapperButton } from './styled'
import { Typography, Stack, ButtonProps } from '@mui/material'

import Image from 'next/image'
interface Props extends ButtonProps {
  title: string
  subtitle: string
  imgPath: string
  imgProps: { width?: number; height?: number }
}

export const HomeButtonCustom = (props: Props) => {
  const { title, subtitle, imgProps, imgPath, ...restProps } = props

  return (
    <WrapperButton variant="contained" {...restProps}>
      <Stack
        spacing={{ xs: 1, sm: 0, md: 0 }}
        direction="row"
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
          alignItems={{ xs: 'center', md: 'center', lg: 'center' }}
          sx={{
            width: { xs: '100%', md: '100%', lg: '100%' }
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: '1rem', md: '1.1rem', lg: '1.2rem' }
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
