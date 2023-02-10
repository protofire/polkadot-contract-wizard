import { Stack } from '@mui/system'
import Image from 'next/image'

import { CW_POLKADOT, LOGO_POLKADOT } from 'src/constants/images'

export default function Logo() {
  return (
    <Stack sx={{ marginTop: '1rem' }}>
      <Image alt="Logo polkadot" src={LOGO_POLKADOT} width={186} height={35} />
      <Image alt="Contract wizard" src={CW_POLKADOT} width={186} height={40} />
    </Stack>
  )
}
