import { ContractsTableFiltered } from '@/components/ContractsTable/ContractsTableFiltered'
import { useNetworkAccountsContext } from '@/context/NetworkAccountsContext'
import { getChain } from '@/constants/chains'
import { useListUserContracts } from '@/hooks/userContracts/useListUserContracts'
import { Box, Typography, Paper } from '@mui/material'
import NetworkBadge from '@/view/components/NetworkBadge'
import { useDownloadMetadata } from '@/view/components/ContractsTable/useDownloadMetadata'

export function ContractsTableWidget() {
  const { accountConnected, networkConnected } = useNetworkAccountsContext()
  const { userContracts, isLoading } = useListUserContracts(
    accountConnected?.address,
    networkConnected
  )
  const { logo, name: networkName } = getChain(networkConnected)
  const { userContractItems: items, onDownloadSource } =
    useDownloadMetadata(userContracts)

  let userContractItems
  if (Array.isArray(items)) {
    userContractItems = items.filter(item => item.hidden === false)
  }

  return (
    <>
      {accountConnected && userContracts && (
        <>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={6}
            mt="3rem"
          >
            <Box display="flex" alignItems="center" gap={1.25}>
              <Typography variant="h3">Last Contracts</Typography>
              <Typography variant="body1" component="p">
                on
              </Typography>
              <NetworkBadge
                name={networkName}
                logo={logo.src}
                logoSize={{ width: 20, height: 20 }}
                description={logo.alt}
              />
            </Box>
          </Box>
          {accountConnected && userContractItems ? (
            <ContractsTableFiltered
              contracts={userContractItems}
              isLoading={isLoading}
              tableConfig={{ onlyTable: true, editName: false }}
              onDownloadMeta={onDownloadSource}
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
                    No contracts detected since you have not connected your
                    wallet.
                  </Typography>

                  <Typography fontSize={'1.3rem'} variant="body1">
                    Please, connect your wallet to see and interact with your
                    contracts
                  </Typography>
                </Paper>
              </Box>
            </>
          )}
        </>
      )}
    </>
  )
}
