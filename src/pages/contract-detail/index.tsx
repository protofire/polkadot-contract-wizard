import { useHasMounted } from '@/hooks/useHasMounted'
import SimpleAccordion from '@/view/components/Accordion'
import { CopyToClipboardButton } from '@/view/components/CopyButton'
import { MonoTypography } from '@/view/components/MonoTypography'
import BasicTabs from '@/view/components/Tabs'
import { Box, Typography, Stack } from '@mui/material'
import { useNetworkAccountsContext } from '@/context/NetworkAccountsContext'
import { useListUserContracts } from '@/hooks/userContracts/useListUserContracts'

export default function ContractDetail() {
  const { accountConnected, networkConnected } = useNetworkAccountsContext()
  const { userContracts: contracts, isLoading } = useListUserContracts(
    accountConnected?.address,
    networkConnected
  )
  const hasMounted = useHasMounted()

  if (!hasMounted || isLoading || !contracts.length) {
    return 'loading'
  }

  const contract = contracts[0]
  console.log(contracts)
  return (
    <>
      <Box
        sx={{
          width: { sm: '90%', md: '75%', lg: '80%', xl: '60%' },
          margin: '0 auto 2rem auto'
        }}
      >
        <Typography variant="h3" align="left">
          Custom_01
        </Typography>
        <Typography variant="caption" align="left">
          Contract NAME
        </Typography>
        <Stack direction="row">
          <MonoTypography>{contract.address}</MonoTypography>
          <CopyToClipboardButton
            id="copy-contract-address"
            sx={{ marginLeft: '0.5rem' }}
            data={contract.address}
          />
        </Stack>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          sx={{ margin: '2em 0 3rem' }}
        >
          <Box display="flex" flexDirection="column">
            <Typography variant="caption" align="left">
              TYPE
            </Typography>
            <Typography variant="h5" align="left">
              PSP22
            </Typography>
          </Box>
          <Box display="flex" flexDirection="column">
            <Typography variant="caption" align="left">
              STATUS
            </Typography>
            <Typography variant="h5" align="left">
              Imported
            </Typography>
          </Box>
          <Box display="flex" flexDirection="column">
            <Typography variant="caption" align="left">
              CONTRACT VERSION
            </Typography>
            <Typography variant="h5" align="left">
              1.2.1
            </Typography>
          </Box>
          <Box display="flex" flexDirection="column">
            <Typography variant="caption" align="left">
              LANGUAGE
            </Typography>
            <Typography variant="h5" align="left">
              INK! 4.0.5
            </Typography>
          </Box>
        </Box>
        <BasicTabs />
        <SimpleAccordion
          elements={[
            { tittle: 'psp22::approve', content: 'Form approve', id: '1' },
            { tittle: 'psp22::tranfer', content: 'Form transfer', id: '2' }
          ]}
        />
      </Box>
    </>
  )
}
