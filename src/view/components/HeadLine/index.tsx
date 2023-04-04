import * as React from 'react'
import { styled } from '@mui/material/styles'
import Stack, { StackProps } from '@mui/material/Stack'

import Image from 'next/image'
import { Typography } from '@mui/material'
import { TOKEN_PATHS } from '@/constants'
import { TokenType } from '@/types'
interface Props extends StackProps {
  title: string
  subtitle: string
  imgPath: string
  imgProps?: { width?: number; height?: number }
}

const TitleMap: Record<TokenType, Props> = {
  psp22: {
    title: 'TOKEN | PSP22',
    subtitle: 'Standard smart contract for a fungible token',
    imgPath: TOKEN_PATHS.TokenIcon,
    imgProps: { width: 45, height: 39 }
  },
  psp34: {
    title: 'NFT | PSP34',
    subtitle: 'Standard smart contract for a non-fungible token',
    imgPath: TOKEN_PATHS.NFTIcon,
    imgProps: { width: 33, height: 40 }
  },
  psp37: {
    title: 'MULTITOKEN | PSP37',
    subtitle: 'Standard smart contract for a Multi Token',
    imgPath: TOKEN_PATHS.MultiTokenIcon,
    imgProps: { width: 45, height: 39 }
  }
}

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
  const { title, subtitle, imgProps, imgPath } = TitleMap[tokenType]
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
