import { Stack } from '@mui/material'
import NextLink from 'next/link'

import { ROUTES } from '@constants'
import Image from 'next/image'

import { CW_POLKADOT, LOGO_POLKADOT } from 'src/constants/images'

export default function Logo() {
  return (
    <NextLink href={ROUTES.HOME}>
      <Stack sx={{ marginTop: '1rem' }}>
        <Image
          alt="Logo polkadot"
          src={LOGO_POLKADOT}
          width={186}
          height={35}
        />
        <Image
          alt="Contract wizard"
          src={CW_POLKADOT}
          width={186}
          height={40}
        />
      </Stack>
    </NextLink>
  )
}
