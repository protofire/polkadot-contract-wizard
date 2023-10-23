import { useNetworkAccountsContext } from '@/context/NetworkAccountsContext'
import { UserContractDetails } from '@/domain'
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

  const onCreate = (contractData: CustomDeploymentDataForm) => {
    setIsImporting(true)

    try {
      if (!accountConnected) return
      const customContract: UserContractDetails = {
        userAddress: accountConnected.address,
        blockchain: networkConnected,
        txHash: '',
        address: contractData.contractAddress,
        codeId: '',
        name: contractData.contractName,
        abi: contractData.externalAbi,
        type: 'custom',
        date: new Date().toISOString(),
        external: true,
        hidden: false
      }
      const result = newDeployment({
        contractName: customContract.name,
        contractAddress: customContract.address,
        network: customContract.blockchain,
        codeId: customContract.codeId,
        userAddress: accountConnected.address,
        txHash: customContract.txHash,
        date: customContract.date,
        contractType: customContract.type,
        hidden: false
      })

      console.log('__result', result)
    } catch {
    } finally {
      setIsImporting(false)
    }

    // addUserContract(userContractsDetail)
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
