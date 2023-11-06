import React from 'react'
import { CopyToClipboardButton } from '@/view/components/CopyButton'
import { MonoTypography } from '@/view/components/MonoTypography'
import BasicTabs from '@/view/components/Tabs'
import { Box, Typography, Stack, Tooltip, Button } from '@mui/material'
import { DefaultToolTipButton } from '@/view/components/DefaultTooltipButton'
import EditIcon from '@mui/icons-material/Edit'
import ShareIcon from '@mui/icons-material/Share'
import DownloadIcon from '@mui/icons-material/Download'
import { getChain } from '@/constants/chains'
import NetworkBadge from '@/view/components/NetworkBadge'
import { UseModalBehaviour } from '@/hooks/useModalBehaviour'
import { UserContractDetails } from '@/domain'
import {
  isoDate,
  isoToReadableDate,
  truncateAddress
} from '@/utils/formatString'
import { ShareContractModal } from '@/view/components/ShareContractModal'
import { getUserContractUrl } from '@/view/components/ContractsTable/getUserContractUrl'
import SimpleAccordion from '@/view/components/Accordion'
import InfoOutlined from '@mui/icons-material/InfoOutlined'

type ContractTabType = 'Read Contract' | 'Write Contract'
const types: ContractTabType[] = ['Read Contract', 'Write Contract']

interface Props {
  modalBehaviour: UseModalBehaviour
  userContract: UserContractDetails
}

interface AbiSource {
  source: { language: string }
}

export default function ContractDetail({ userContract }: Props): JSX.Element {
  const [openShareModal, setOpenShareModal] = React.useState(false)
  const url = getUserContractUrl(userContract)
  const [type, setType] = React.useState(types[0])
  const chainDetails = getChain(userContract.network)
  const isReadContract = type === 'Read Contract'
  const abi = userContract.abi as AbiSource | undefined

  const handleChange = (newValue: number) => {
    setType(types[newValue])
  }

  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h2">{userContract.name}</Typography>
          <DefaultToolTipButton
            id="edit-contract-address"
            sx={{ marginLeft: '0.5rem', color: 'white' }}
            title="Edit"
            Icon={EditIcon}
          ></DefaultToolTipButton>
        </Stack>
        <Box display="flex" gap="1rem">
          <Button
            variant="contained"
            endIcon={<DownloadIcon />}
            sx={{
              borderRadius: '3rem',
              maxHeight: '3rem',
              backgroundColor: '#20222D'
            }}
          >
            Download
          </Button>
          <Button
            variant="contained"
            endIcon={<ShareIcon />}
            color="primary"
            onClick={() => setOpenShareModal(true)}
            sx={{
              borderRadius: '3rem',
              maxHeight: '3rem'
            }}
          >
            Share
          </Button>
        </Box>
      </Stack>
      <Stack direction="row">
        <MonoTypography>{userContract.address}</MonoTypography>
        <CopyToClipboardButton
          id="copy-contract-address"
          sx={{ marginLeft: '0.5rem' }}
          data={userContract.address}
        />
      </Stack>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        sx={{ margin: '2em 0 3rem' }}
      >
        <Box display="flex" flexDirection="column">
          <Box display="flex" flexDirection="row" gap="0.5rem">
            <Typography variant="caption" align="left">
              TYPE
            </Typography>
            <Tooltip
              placement="top"
              title="Type or category of the smart contract. You can find the categories in the 'Builder' page."
            >
              <InfoOutlined style={{ fontSize: 16 }} />
            </Tooltip>
          </Box>
          <Typography variant="h5" align="left">
            {userContract.type}
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column">
          <Typography variant="caption" align="left">
            NETWORK
          </Typography>
          <Typography variant="h5" align="left">
            <NetworkBadge
              name={chainDetails.name}
              logo={chainDetails.logo.src}
              logoSize={{ width: 20, height: 20 }}
              description={chainDetails.logo.alt}
              textTooltip="This network is the one that the contract has been deployed."
            />
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column">
          <Box display="flex" flexDirection="row" gap="0.5rem">
            <Typography variant="caption" align="left">
              LANGUAGE{' '}
            </Typography>
            <Tooltip
              placement="top"
              title="Programming language or technology used to write the smart contract's code."
            >
              <InfoOutlined style={{ fontSize: 16 }} />
            </Tooltip>
          </Box>

          <Typography variant="h5" align="left">
            {abi?.source.language}
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column">
          <Typography variant="body1">
            Added {''}
            <Tooltip placement="top" title={isoDate(userContract.date)}>
              <Typography variant="body1" component="span">
                {isoToReadableDate(userContract.date)}
              </Typography>
            </Tooltip>
          </Typography>
          <Stack direction="row" alignItems="center">
            <Typography variant="caption">Deployed by</Typography>
            {''}
            <MonoTypography>
              {truncateAddress(userContract.address, 4)}
            </MonoTypography>
            <CopyToClipboardButton
              id="copy-contract-address"
              sx={{ marginLeft: '0.5rem' }}
              data={userContract.address}
            />
          </Stack>
        </Box>
      </Box>
      <Box sx={{ width: '100%' }}>
        <BasicTabs
          options={['Read Contract', 'Write Contract']}
          onChange={handleChange}
        >
          <>
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
                  Let&apos;s start to work with your contract doing different
                  querys.
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
        </BasicTabs>
      </Box>
      <ShareContractModal
        open={openShareModal}
        handleClose={() => setOpenShareModal(false)}
        url={url}
      ></ShareContractModal>
    </>
  )
}
