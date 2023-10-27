import { useEffect, useState } from 'react'
import { useNetworkAccountsContext } from '@/context/NetworkAccountsContext'
import { UserContractDetailsDraft } from '@/domain'
import { useCreateDeployments } from '@/hooks/deployments/useCreateDeployments'
import { ConnectWalletSection } from '@/view/components/ConnectWalletSection'
import {
  CustomContractsForm,
  CustomDeploymentDataForm
} from '@/view/CustomContracts/create/CustomContractsForm'
import { ImportingContractMessage } from '@/view/CustomContracts/create/CreatingCustomContract'
import { Typography } from '@mui/material'
import { useReportError } from '@/hooks/useReportError'
import router from 'next/router'
import { ROUTES } from '@/constants'
import MainContainer from '@/view/layout/MainContainer'

export default function CustomContractsPage() {
  const { accountConnected, networkConnected } = useNetworkAccountsContext()
  const [isImporting, setIsImporting] = useState<boolean | undefined>()
  const { newDeployment } = useCreateDeployments()
  const { addNotification, reportErrorWithToast } = useReportError()
  const [deploymentId, setNewDeploymentId] = useState<string>()

  useEffect(() => {
    if (!deploymentId) return

    const timer = setTimeout(() => {
      router.push(ROUTES.CONTRACTDETAIL)
    }, 500)

    return () => clearTimeout(timer)
  }, [deploymentId])

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
      await newDeployment({
        userContract: customContract,
        onSuccessCallback: deploymentId => {
          addNotification({
            message: 'Your contract is stored',
            type: 'success'
          })
          setNewDeploymentId(deploymentId)
          setIsImporting(false)
        },
        onErrorCallback: e => {
          reportErrorWithToast(e)
          setIsImporting(undefined)
        }
      })
    } catch {
      setIsImporting(undefined)
    }
  }

  return (
    <MainContainer>
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
          <ImportingContractMessage
            isCreated={Boolean(deploymentId)}
            isImporting={isImporting}
          />
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
