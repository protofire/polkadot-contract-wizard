import { useNetworkAccountsContext } from '@/context/NetworkAccountsContext'
import { UserContractDetailsDraft } from '@/domain'
import { useCreateDeployments } from '@/hooks/deployments/useCreateDeployments'
import { ConnectWalletSection } from '@/view/components/ConnectWalletSection'
import {
  CustomContractsForm,
  CustomDeploymentDataForm
} from '@/view/CustomContractsForm'
import { ImportingContractMessage } from '@/view/CustomContractsForm/CreatingCustomContract'
import { Box, Typography } from '@mui/material'
import { useState } from 'react'

export default function CustomContractsPage() {
  const { accountConnected, networkConnected } = useNetworkAccountsContext()
  const [isImporting, setIsImporting] = useState<boolean | undefined>()
  const { newDeployment } = useCreateDeployments()

  const onCreate = async (contractData: CustomDeploymentDataForm) => {
    setIsImporting(true)

    try {
      if (!accountConnected) return
      const customContract: UserContractDetailsDraft = {
        userAddress: accountConnected.address,
        network: networkConnected,
        txHash: undefined,
        address: contractData.address,
        name: contractData.name,
        abi: contractData.abi,
        codeId: '',
        type: 'custom',
        date: new Date().toISOString(),
        hidden: false
      }
      const result = await newDeployment(customContract)

      // addUserContract()
      // console.log('__result', result)
    } catch {
    } finally {
      // setIsImporting(false)
    }
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
            {isImporting === undefined && (
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
