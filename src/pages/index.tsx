import Link from 'next/link'
import { Box, Paper, Stack, Typography } from '@mui/material'

import { HomeButton, HomeButtonCustom } from '@/components'
import { CUSTOM_CONTRACT, ROUTES, TOKEN_PATHS } from '@/constants/index'
import { useNetworkAccountsContext } from '@/context/NetworkAccountsContext'
import { useListUserContracts } from '@/hooks/userContracts/useListUserContracts'
import { ContractType } from '@/domain/repositories/DeploymentRepository'
import MainContainer from '@/view/layout/MainContainer'
import NetworkBadge from '@/view/components/NetworkBadge'
import { getChain } from '@/constants/chains'
import { ContractsTableFiltered } from '@/view/components/ContractsTable/ContractsTableFiltered'

const Token: Record<ContractType, ContractType> = {
  psp22: 'psp22',
  psp34: 'psp34',
  psp37: 'psp37',
  custom: 'custom'
}

type Token = keyof ContractType

function Home() {
  const { accountConnected, networkConnected } = useNetworkAccountsContext()
  const { userContracts, isLoading } = useListUserContracts(
    accountConnected?.address,
    networkConnected
  )
  const { networkConnected: network } = useNetworkAccountsContext()
  const { logo, name: networkName } = getChain(network)

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
      {accountConnected && userContracts && (
        <>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={6}
            mt="3rem"
          >
            <Box display="flex" alignItems="center" gap={1.25}>
              <Typography variant="h3">Last Contracts</Typography>
              <Typography variant="body1" component="p">
                on
              </Typography>
              <NetworkBadge
                name={networkName}
                logo={logo.src}
                logoSize={{ width: 20, height: 20 }}
                description={logo.alt}
              />
            </Box>
          </Box>
          {accountConnected ? (
            <ContractsTableFiltered
              contracts={userContracts}
              isLoading={isLoading}
              tableConfig={{ onlyTable: true, editName: false }}
            />
          ) : (
            <>
              <Box
                sx={{
                  margin: '5rem'
                }}
              >
                <Paper
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                    maxWidth: '870px',
                    minWidth: '700px',
                    height: '343px',
                    margin: '0 auto',
                    borderRadius: '15px',
                    color: '#ffff'
                  }}
                >
                  <Typography fontSize={'1.5rem'} mb={5}>
                    ⚠️ Wallet not connected
                  </Typography>

                  <Typography fontSize={'1.3rem'} variant="body1">
                    No contracts detected since you have not connected your
                    wallet.
                  </Typography>

                  <Typography fontSize={'1.3rem'} variant="body1">
                    Please, connect your wallet to see and interact with your
                    contracts
                  </Typography>
                </Paper>
              </Box>
            </>
          )}
        </>
      )}
    </MainContainer>
  )
}

export default Home
