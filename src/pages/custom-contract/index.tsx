import { useNetworkAccountsContext } from '@/context/NetworkAccountsContext'
import { ConnectWalletSection } from '@/view/components/ConnectWalletSection'
import { CustomContractsForm } from '@/view/CustomContractsForm'
import { ImportingContractMessage } from '@/view/CustomContractsForm/CreatingCustomContract'
import { Box, Typography } from '@mui/material'
import { useState } from 'react'

export default function CustomContractsPage() {
  const { accountConnected, networkConnected } = useNetworkAccountsContext()
  const [isImporting, setIsImporting] = useState<boolean | undefined>()

  const onCreate = () => {
    setIsImporting(true)
  }

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
          <>
            {!isImporting && (
              <CustomContractsForm
                network={networkConnected}
                onCreate={onCreate}
              />
            )}
            <ImportingContractMessage isImporting={isImporting} />
          </>
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
