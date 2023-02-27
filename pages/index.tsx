import Link from 'next/link'
import { Stack, Typography } from '@mui/material'

import BasicTable from 'src/view/HomeView/Table';
import { HomeButton } from '@components';
import { ROUTES, TOKEN_PATHS } from '@constants';
import { TokenType } from '@types';

const Token: Record<TokenType, TokenType> = {
  psp22: 'psp22',
  psp34: 'psp34',
  psp37: 'psp37'
}

export default function Home() {
  return (
    <>
      <Typography variant="h1" align="center">
        Start building something amazing on Polkadot
      </Typography>
      <Typography variant="h5" align="center" mt={2}>
        Choose the type of contract you need 🪄
      </Typography>
      <Stack spacing={4} direction="column" m={8}>
        <HomeButton
          LinkComponent={Link}
          href={`${ROUTES.WIZARD}/?token=${Token.psp22}`}
          title="TOKEN | PSP22"
          subtitle="Standard smart contract for a fungible token"
          imgPath={TOKEN_PATHS.TokenIcon}
          imgProps={{ width: 75, height: 65 }}
        />
        <HomeButton
          LinkComponent={Link}
          href={`${ROUTES.WIZARD}/?token=${Token.psp34}`}
          title="NFT | PSP34"
          subtitle="Standard smart contract for a non-fungible token"
          imgPath={TOKEN_PATHS.NFTIcon}
          imgProps={{ width: 55, height: 67 }}
        />
        <HomeButton
          LinkComponent={Link}
          href={`${ROUTES.WIZARD}/?token=${Token.psp37}`}
          title="MULTITOKEN | PSP37"
          subtitle="Standard smart contract for a Multi Token"
          imgPath={TOKEN_PATHS.MultiTokenIcon}
          imgProps={{ width: 75, height: 65 }}
        />
      </Stack>

      <BasicTable />
    </>
  )
}
