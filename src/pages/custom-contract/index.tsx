import { useNetworkAccountsContext } from '@/context/NetworkAccountsContext'
import { ConnectWalletSection } from '@/view/components/ConnectWalletSection'
import { CustomContractsForm } from '@/view/CustomContractsForm'
import { ImportingContractMessage } from '@/view/CustomContractsForm/CreatingCustomContract'
import MainContainer from '@/view/layout/MainContainer'
import { Typography } from '@mui/material'
import { useState } from 'react'

export default function CustomContractsPage() {
  const { accountConnected, networkConnected } = useNetworkAccountsContext()
  const [isImporting, setIsImporting] = useState<boolean | undefined>()

  const onCreate = () => {
    setIsImporting(true)
  }

  return (
    <MainContainer>
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
    </MainContainer>
  )
}
