import React from 'react'
import SimpleAccordion from '@/view/components/Accordion'
import { CopyToClipboardButton } from '@/view/components/CopyButton'
import { MonoTypography } from '@/view/components/MonoTypography'
import BasicTabs from '@/view/components/Tabs'
import { Box, Typography, Stack, Tooltip } from '@mui/material'
import { DefaultToolTipButton } from '@/view/components/DefaultTooltipButton'
import EditIcon from '@mui/icons-material/Edit'
import ShareIcon from '@mui/icons-material/Share'
import DownloadIcon from '@mui/icons-material/Download'
import { getChain } from '@/constants/chains'
import NetworkBadge from '@/view/components/NetworkBadge'
import { UseModalBehaviour } from '@/hooks/useModalBehaviour'
import { UserContractDetails } from '@/domain'
import MainContainer from '@/view/layout/MainContainer'
import { isoDate, isoToReadableDate } from '@/utils/formatString'

type ContractTabType = 'Read Contract' | 'Write Contract'
const types: ContractTabType[] = ['Read Contract', 'Write Contract']

interface Props {
  modalBehaviour: UseModalBehaviour
  userContract: UserContractDetails
}

export default function ContractDetail({
  modalBehaviour,
  userContract
}: Props) {
  const [type, setType] = React.useState(types[0])

  const { logo, name: networkName } = getChain(userContract.network)
  const isReadContract = type === 'Read Contract'
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
            onClick={() => modalBehaviour.openModal()}
          ></DefaultToolTipButton>
        </Stack>
        <Typography variant="body1">
          Added {''}
          <Tooltip placement="top" title={isoDate(userContract.date)}>
            <Typography variant="body1" component="span">
              {isoToReadableDate(userContract.date)}
            </Typography>
          </Tooltip>
        </Typography>
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
          <Typography variant="caption" align="left">
            TYPE
          </Typography>
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
              name={networkName}
              logo={logo.src}
              logoSize={{ width: 20, height: 20 }}
              description={logo.alt}
              textTooltip="This network is the one that the contract has been deployed."
            />
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
    </>
  )
}
