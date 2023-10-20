import { useNetworkAccountsContext } from '@/context/NetworkAccountsContext'
import { ContractType } from '@/domain/repositories/DeploymentRepository'
import { useListUserContracts } from '@/hooks/userContracts/useListUserContracts'
import { EmptyString } from '@/services/common/EmptyString'
import { FilterType } from '@/services/localDB/UserContractsRepository'
import { ContractsTableContent } from '@/view/ContractView/ContractsTable'
import { Box, Paper, Typography } from '@mui/material'
import { useState } from 'react'

export default function Contracts() {
  const [filterBy, setFilterBy] = useState<FilterType>({ hidden: false })
  const { accountConnected, networkConnected } = useNetworkAccountsContext()
  const { userContracts: contracts, isLoading } = useListUserContracts(
    accountConnected?.address,
    networkConnected,
    filterBy
  )

  const changeType = (type: ContractType | EmptyString) => {
    setFilterBy(prev => {
      if (!type) {
        delete prev.type
        return { ...prev }
      }
      return { ...prev, type }
    })
  }

  return (
    <Box
      sx={{
        width: { sm: '90%', md: '75%', lg: '100%', xl: '75%' },
        margin: { lg: '1rem auto 2rem auto', xl: '2rem auto 2rem auto' }
      }}
    >
      <Typography variant="h1" align="center">
        Your Contracts
      </Typography>
      {accountConnected ? (
        <ContractsTableContent
          contracts={contracts}
          setFilterBy={changeType}
          isLoading={isLoading}
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
                No contracts detected since you have not connected your wallet.
              </Typography>

              <Typography fontSize={'1.3rem'} variant="body1">
                Please, connect your wallet to see and interact with your
                contracts
              </Typography>
            </Paper>
          </Box>
        </>
      )}
    </Box>
  )
}
