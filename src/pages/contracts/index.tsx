import { useNetworkAccountsContext } from '@/context/NetworkAccountsContext'
import { useListUserContracts } from '@/hooks/userContracts/useListUserContracts'
import { ContractsTableWidget } from '@/view/ContractView/ContractsTable'
import { Box, Link, Stack, Typography } from '@mui/material'

export default function Contracts() {
  const { accountConnected, networkConnected } = useNetworkAccountsContext()
  const { userContracts: contracts } = useListUserContracts(
    accountConnected?.address,
    networkConnected
  )
  return (
    <Box
      sx={{
        width: { sm: '90%', md: '75%', lg: '80%', xl: '60%' },
        margin: '0 auto 2rem auto'
      }}
    >
      <Typography variant="h1" align="left">
        Contracts
      </Typography>
      <Stack mt={8} flexDirection="column" gap={4} justifyContent={'center'}>
        <Typography variant="h3">Sample title</Typography>
        <Typography variant="body1">
          The Polkadot Contract Wizard is a non-code tool to generate, compile
          and deploy smart contracts on Polkadot Ecosystem. It provides{' '}
          <Link
            href="https://github.com/w3f/PSPs"
            underline="hover"
            target="_blank"
            rel="noopener noreferrer"
          >
            standard contracts based on PSP.
          </Link>
        </Typography>
      </Stack>

      {accountConnected && <ContractsTableWidget contracts={contracts} />}
    </Box>
  )
}
