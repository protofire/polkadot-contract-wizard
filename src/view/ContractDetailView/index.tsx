import React from 'react'
import { CopyToClipboardButton } from '@/view/components/CopyButton'
import { MonoTypography } from '@/view/components/MonoTypography'
import { Box, Typography, Stack, Tooltip } from '@mui/material'
import { DefaultToolTipButton } from '@/view/components/DefaultTooltipButton'
import EditIcon from '@mui/icons-material/Edit'
import ShareIcon from '@mui/icons-material/Share'
import DownloadIcon from '@mui/icons-material/Download'
import { getChain } from '@/constants/chains'
import NetworkBadge from '@/view/components/NetworkBadge'
import { UseModalBehaviour } from '@/hooks/useModalBehaviour'
import {
  UserContractDetails,
  UserContractDetailsWithAbi,
  isAbiSource
} from '@/domain'
import { isoDate, isoToReadableDate } from '@/utils/formatString'
import { useNetworkAccountsContext } from '@/context/NetworkAccountsContext'
import { ContractsTabInteraction } from '@/view/ContractDetailView'
import { ConnectWalletSection } from '@/view/components/ConnectWalletSection'

interface Props {
  modalBehaviour: UseModalBehaviour
  userContract: UserContractDetails
}

export default function ContractDetail({
  modalBehaviour,
  userContract
}: Props) {
  const { accountConnected } = useNetworkAccountsContext()
  if (!userContract) {
    return null
  }
  const { abi } = userContract

  if (!isAbiSource(abi)) {
    return null
  }

  const chainDetails = getChain(userContract.network)

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
              name={chainDetails.name}
              logo={chainDetails.logo.src}
              logoSize={{ width: 20, height: 20 }}
              description={chainDetails.logo.alt}
              textTooltip="This network is the one that the contract has been deployed."
            />
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column">
          <Typography variant="caption" align="left">
            LANGUAGE
          </Typography>
          <Typography variant="h5" align="left">
            {abi?.source.language}
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column">
          <Typography variant="caption" align="left">
            Actions
          </Typography>
          <Typography variant="h5" align="left">
            --
          </Typography>
        </Box>
      </Box>
      {accountConnected ? (
        <ContractsTabInteraction
          userContract={userContract as UserContractDetailsWithAbi}
        />
      ) : (
        <ConnectWalletSection
          text={'You need to connect a wallet to interact with this contract.'}
        />
      )}
    </>
  )
}
