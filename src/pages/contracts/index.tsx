import { useNetworkAccountsContext } from '@/context/NetworkAccountsContext'
import { ContractTableItem } from '@/domain/wizard/ContractTableItem'
import { useListUserContracts } from '@/hooks/userContracts/useListUserContracts'
import { ContractsTableContent } from '@/view/ContractView/ContractsTable'
import { Box, Paper, Typography } from '@mui/material'

export default function Contracts() {
  const { accountConnected, networkConnected } = useNetworkAccountsContext()
  const { userContracts: contracts } = useListUserContracts(
    accountConnected?.address,
    networkConnected,
    (item: ContractTableItem) => !item.hidden
  )

  return (
    <Box
      sx={{
        width: { sm: '90%', md: '75%', lg: '80%', xl: '60%' },
        margin: '0 auto 2rem auto'
      }}
    >
      <Typography variant="h1" align="center">
        Your Contracts
      </Typography>
      {accountConnected ? (
        <ContractsTableContent contracts={contracts} />
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
