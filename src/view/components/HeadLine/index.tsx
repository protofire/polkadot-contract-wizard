import * as React from 'react'
import { styled } from '@mui/material/styles'
import Stack, { StackProps } from '@mui/material/Stack'

import Image from 'next/image'
import { Typography } from '@mui/material'
import { TITLE_MAP_TOKEN } from '@/constants/titleTokenType'
import { TokenType } from '@/domain'

const WrapperHead = styled(Stack)<StackProps>(({ theme }) => ({
  color: 'white',
  width: '100%',
  backgroundColor: 'transparent',
  display: 'flex',
  alignItems: 'center',
  margin: '0',
  padding: '0 0 0.5rem 0',
  textTransform: 'uppercase',

  '& h3': {
    fontSize: '1.3rem',
    marginRight: '1rem'
  },

  [theme.breakpoints.down('sm')]: {
    width: '100%',
    margin: '0.5rem !important',
    padding: '1rem',

    '& h3': {
      fontSize: '1.1rem'
    }
  }
}))

export const HeadLine = ({ tokenType }: { tokenType: TokenType }) => {
  const { title, subtitle, imgProps, imgPath } = TITLE_MAP_TOKEN[tokenType]

  return (
    <WrapperHead>
      <Stack
        spacing={1}
        direction={{ xs: 'column', md: 'row', lg: 'row' }}
        alignItems="center"
      >
        <Image alt={title} src={imgPath} {...imgProps} />
        <Stack
          spacing={{ xs: '0', lg: '2' }}
          direction={{ xs: 'column', md: 'row', lg: 'row' }}
          alignItems="center"
        >
          <Typography variant="h3">{title}</Typography>
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
    </WrapperHead>
  )
}
