import Link from 'next/link'
import { Stack, Typography } from '@mui/material'

import { HomeButton, HomeButtonCustom } from '@/components'
import { CUSTOM_CONTRACT, ROUTES, TOKEN_PATHS } from '@/constants/index'
import { ContractType } from '@/domain/repositories/DeploymentRepository'
import MainContainer from '@/view/layout/MainContainer'
import { ContractsTableWidget } from '@/view/HomeView/ContractsTableWidget'

const Token: Record<ContractType, ContractType> = {
  psp22: 'psp22',
  psp34: 'psp34',
  psp37: 'psp37',
  custom: 'custom'
}

type Token = keyof ContractType

export default function HomePage() {
  return (
    <MainContainer>
      <Typography variant="h1" align="center">
        Start building something amazing on Polkadot
      </Typography>
      <Typography variant="h5" align="center" mt={2}>
        Choose the type of contract you need 🪄
      </Typography>
      <Stack
        spacing={{ xs: 1, sm: 2, md: 4 }}
        direction={{ xs: 'column', md: 'row' }}
        alignItems="center"
        m={{ xs: 2, sm: 4, md: 4 }}
      >
        <HomeButton
          LinkComponent={Link}
          href={`${ROUTES.WIZARD}/?token=${Token.psp22}`}
          title="TOKEN | PSP22"
          subtitle="Standard smart contract for a fungible token"
          imgPath={TOKEN_PATHS[Token.psp22]}
          imgProps={{ width: 75, height: 65 }}
        />
        <HomeButton
          LinkComponent={Link}
          href={`${ROUTES.WIZARD}/?token=${Token.psp34}`}
          title="NFT | PSP34"
          subtitle="Standard smart contract for a non-fungible token"
          imgPath={TOKEN_PATHS[Token.psp34]}
          imgProps={{ width: 55, height: 67 }}
        />
        <HomeButton
          LinkComponent={Link}
          href={`${ROUTES.WIZARD}/?token=${Token.psp37}`}
          title="MULTITOKEN | PSP37"
          subtitle="Standard smart contract for a Multi Token"
          imgPath={TOKEN_PATHS[Token.psp37]}
          imgProps={{ width: 75, height: 65 }}
        />
      </Stack>
      <Stack
        spacing={{ xs: 1, sm: 2, md: 4 }}
        direction="column"
        alignItems="center"
        m={{ xs: 2, sm: 4, md: 3 }}
      >
        <Typography variant="h5">Import your own contract ⚡</Typography>
        <HomeButtonCustom
          LinkComponent={Link}
          href={`${ROUTES.CUSTOM}/`}
          title="CUSTOM CONTRACT"
          subtitle="Upload a new contract code"
          imgPath={CUSTOM_CONTRACT}
          imgProps={{ width: 60, height: 60 }}
        />
      </Stack>
      <ContractsTableWidget />
    </MainContainer>
  )
}
