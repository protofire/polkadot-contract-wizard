import React from 'react'
import { useHasMounted } from '@/hooks/useHasMounted'
import SimpleAccordion from '@/view/components/Accordion'
import { CopyToClipboardButton } from '@/view/components/CopyButton'
import { MonoTypography } from '@/view/components/MonoTypography'
import BasicTabs from '@/view/components/Tabs'
import { Box, Typography, Stack } from '@mui/material'
import { useNetworkAccountsContext } from '@/context/NetworkAccountsContext'
import { useListUserContracts } from '@/hooks/userContracts/useListUserContracts'
import { DefaultToolTipButton } from '@/view/components/DefaultTooltipButton'
import EditIcon from '@mui/icons-material/Edit'
import ShareIcon from '@mui/icons-material/Share'
import DownloadIcon from '@mui/icons-material/Download'

type ContractTabType = 'Read Contract' | 'Write Contract'
const types: ContractTabType[] = ['Read Contract', 'Write Contract']

export default function ContractDetail({
  setOpenModal
}: {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [type, setType] = React.useState(types[0])
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
  const isReadContract = type === 'Read Contract'
  const handleChange = (newValue: number) => {
    setType(types[newValue])
  }

  return (
    <>
      <Box
        sx={{
          width: { sm: '90%', md: '75%', lg: '80%', xl: '60%' },
          margin: '0 auto 2rem auto'
        }}
      >
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h2">{contract.name}</Typography>
            <DefaultToolTipButton
              id="edit-contract-address"
              sx={{ marginLeft: '0.5rem', color: 'white' }}
              title="Edit"
              Icon={EditIcon}
            ></DefaultToolTipButton>
            <DefaultToolTipButton
              id="download-contract-address"
              sx={{ marginLeft: '0.5rem', color: 'white' }}
              title="Download metadata"
              Icon={DownloadIcon}
            ></DefaultToolTipButton>
            <DefaultToolTipButton
              id="share-contract-address"
              sx={{ marginLeft: '0.5rem', color: 'white' }}
              title="Share"
              Icon={ShareIcon}
              onClick={() => setOpenModal(true)}
            ></DefaultToolTipButton>
          </Stack>
          <Typography variant="body1">Added on: {contract.date}</Typography>
        </Stack>
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
              {contract.type}
            </Typography>
          </Box>
          <Box display="flex" flexDirection="column">
            <Typography variant="caption" align="left">
              NETWORK
            </Typography>
            <Typography variant="h5" align="left">
              {contract.blockchain}
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
        <Box sx={{ width: '100%' }}>
          <BasicTabs
            options={['Read Contract', 'Write Contract']}
            onChange={handleChange}
          >
            {!isLoading ? (
              <>
                {/* <Typography variant="h4">{type}</Typography> */}
                {isReadContract ? (
                  <>
                    <Typography variant="h4">
                      Learn more about your contract 🔁
                    </Typography>
                    <Typography variant="body1">
                      Let&apos;start to work with your contract displaying each
                      method.
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography variant="h4">
                      Interact with your contract 🔁
                    </Typography>
                    <Typography variant="body1">
                      Let&apos;s start to work with your contract doing
                      different querys.
                    </Typography>
                  </>
                )}
                <SimpleAccordion
                  elements={
                    isReadContract
                      ? [
                          {
                            tittle: 'psp22::balance',
                            content: 'text balance',
                            id: '1'
                          },
                          {
                            tittle: 'psp22::owners',
                            content: 'text owners',
                            id: '2'
                          }
                        ]
                      : [
                          {
                            tittle: 'psp22::approve',
                            content: 'Form approve',
                            id: '1'
                          },
                          {
                            tittle: 'psp22::tranfer',
                            content: 'Form transfer',
                            id: '2'
                          }
                        ]
                  }
                />
              </>
            ) : (
              <Box mt={2}>Loading</Box>
            )}
          </BasicTabs>
        </Box>{' '}
      </Box>
    </>
  )
}
