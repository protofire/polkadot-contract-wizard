import React from 'react'
import { CopyToClipboardButton } from '@/view/components/CopyButton'
import { MonoTypography } from '@/view/components/MonoTypography'
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
import { useNetworkAccountsContext } from '@/context/NetworkAccountsContext'
import { ContractDetailsInteraction } from '@/view/ContractDetailsInteraction'
import { ConnectWalletSection } from '@/view/components/ConnectWalletSection'
import InfoOutlined from '@mui/icons-material/InfoOutlined'
import { useFormInput } from '@/hooks'
import { maxLength, notEmpty } from '@/utils/inputValidation'
import { StyledTextField } from '../components'
import CheckIcon from '@mui/icons-material/CheckCircleOutlineRounded'
import { UpdateDeployment } from '@/domain/repositories/DeploymentRepository'
import { useUpdateUserContracts } from '@/hooks/userContracts/useUpdateUserContracts'
import { UserContractTableItem } from '@/domain/wizard/ContractTableItem'
interface Props {
  modalBehaviour: UseModalBehaviour
  userContract: UserContractDetails
  onDownloadSource: (contract: UserContractTableItem) => void
}

interface AbiSource {
  source: { language: string }
}

export default function ContractDetail({
  userContract,
  onDownloadSource
}: Props): JSX.Element {
  const [openShareModal, setOpenShareModal] = React.useState(false)
  const url = getUserContractUrl(userContract)
  const { accountConnected } = useNetworkAccountsContext()
  const { updateContract } = useUpdateUserContracts()

  const [isNameEditable, setIsNameEditable] = React.useState(false)
  const chainDetails = getChain(userContract.network)
  const abi = userContract.abi as AbiSource | undefined
  const formData = {
    contractName: useFormInput<string>(userContract.name, [notEmpty, maxLength])
  }

  const handleUpdateContractName = () => {
    const updatedContract: UpdateDeployment = {
      address: userContract.address,
      userAddress: userContract.userAddress,
      network: userContract.network,
      name: formData.contractName.value,
      hidden: false
    }
    formData.contractName.setValue(updatedContract.name as string)
    updateContract({
      deployment: updatedContract
    })
    setIsNameEditable(!isNameEditable)
  }

  const stopPropagation = (
    event: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>,
    onFn: () => void
  ) => {
    event.stopPropagation()
    onFn()
  }

  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" justifyContent="space-between">
          {isNameEditable ? (
            <>
              <StyledTextField
                label="Contract Name"
                placeholder={userContract.name}
                value={formData.contractName.value}
                onChange={formData.contractName.onChange}
                error={Boolean(formData.contractName.error)}
                helperText={
                  formData.contractName.error ? formData.contractName.error : ''
                }
                loading={formData.contractName.loading}
                autoFocus
              />
              <DefaultToolTipButton
                id="edit-contract-address"
                sx={{ marginLeft: '0.5rem', color: 'white' }}
                title="Save"
                Icon={CheckIcon}
                onClick={handleUpdateContractName}
              ></DefaultToolTipButton>
            </>
          ) : (
            <>
              <Typography variant="h2">
                {formData.contractName.value}
              </Typography>
              <DefaultToolTipButton
                id="edit-contract-address"
                sx={{ marginLeft: '0.5rem', color: 'white' }}
                title="Edit"
                Icon={EditIcon}
                onClick={event =>
                  stopPropagation(event, () => setIsNameEditable(true))
                }
              ></DefaultToolTipButton>
            </>
          )}
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
            onClick={event =>
              stopPropagation(event, () => onDownloadSource(userContract))
            }
          >
            Download
          </Button>
          <Button
            variant="contained"
            endIcon={<ShareIcon />}
            color="primary"
            onClick={event =>
              stopPropagation(event, () => setOpenShareModal(true))
            }
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
          <Box display="flex" flexDirection="row" gap="0.5rem">
            <Typography variant="caption" align="left">
              NETWORK
            </Typography>
            <Tooltip
              placement="top"
              title="This network is the one that the contract has been deployed."
            >
              <InfoOutlined style={{ fontSize: 16 }} />
            </Tooltip>
          </Box>
          <Typography variant="h5" align="left">
            <NetworkBadge
              name={chainDetails.name}
              logo={chainDetails.logo.src}
              logoSize={{ width: 20, height: 20 }}
              description={chainDetails.logo.alt}
              showTooltip={false}
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
          <Typography variant="caption">
            Added {''}
            <Tooltip placement="top" title={isoDate(userContract.date)}>
              <Typography variant="caption" component="span">
                {isoToReadableDate(userContract.date)}
              </Typography>
            </Tooltip>
          </Typography>
          <Stack direction="row" alignItems="center">
            <Typography variant="caption">Deployed by</Typography>
            {''}
            <MonoTypography sx={{ fontSize: '0.8rem' }}>
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
      {accountConnected ? (
        <ContractDetailsInteraction userContract={userContract} />
      ) : (
        <ConnectWalletSection
          text={'You need to connect a wallet to interact with this contract.'}
        />
      )}
      <ShareContractModal
        open={openShareModal}
        handleClose={() => setOpenShareModal(false)}
        url={url}
      ></ShareContractModal>
    </>
  )
}
