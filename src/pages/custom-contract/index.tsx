import { useNetworkAccountsContext } from '@/context/NetworkAccountsContext'
import BackNextButton from '@/view/components/BackNextButtons'
import { ConnectWalletSection } from '@/view/components/ConnectWalletSection'
import { CustomContractsForm } from '@/view/CustomContractsForm'
import { Box, Typography } from '@mui/material'

export default function CustomContractsPage() {
  const { accountConnected, networkConnected } = useNetworkAccountsContext()

  return (
    <>
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
          <CustomContractsForm network={networkConnected} />
        ) : (
          <ConnectWalletSection
            text={
              'You need to connect a wallet to interact with an external contract.'
            }
          />
        )}
      </Box>
    </>
  )
}
