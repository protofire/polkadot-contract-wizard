import { useNetworkAccountsContext } from '@/context/NetworkAccountsContext'
import { ConnectWalletSection } from '@/view/components/ConnectWalletSection'
import { CustomContractsForm } from '@/view/CustomContractView'
import { Box, Typography } from '@mui/material'

export default function CustomContractsPage() {
  const { accountConnected } = useNetworkAccountsContext()

  return (
    <Box
      sx={{
        width: { sm: '90%', md: '75%', lg: '80%', xl: '60%' },
        margin: '0 auto 2rem auto'
      }}
    >
      <Typography variant="h1" align="center">
        Import Custom Contract
      </Typography>
      {accountConnected ? (
        <CustomContractsForm />
      ) : (
        <ConnectWalletSection
          text={
            'You need to connect a wallet to interact with an external contract.'
          }
        />
      )}
    </Box>
  )
}
