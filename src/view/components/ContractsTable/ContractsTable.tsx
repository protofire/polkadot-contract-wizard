import * as React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Stack,
  TextField,
  Typography,
  Tooltip,
  IconButton
} from '@mui/material'

import { CopyToClipboardButton, TokenIconSvg } from '@/components'
import {
  isoDate,
  isoToReadableDate,
  truncateAddress
} from '@/utils/formatString'
import { UserContractTableItem } from '@/domain/wizard/ContractTableItem'
import { MonoTypography } from '@/components'
import { StyledTableContainer, TokenWrapper } from './styled'
import { DefaultToolTipButton } from '@/view/components/DefaultTooltipButton'

import EditIcon from '@mui/icons-material/Edit'
import ShareIcon from '@mui/icons-material/Share'
import DeleteIcon from '@mui/icons-material/Delete'
import CheckIcon from '@mui/icons-material/CheckCircleOutlineRounded'
import CancelIcon from '@mui/icons-material/Cancel'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom'

import { ShareContractModal } from '@/view/components/ShareContractModal'
import { TITLE_MAP_TOKEN } from '@/constants/titleTokenType'
import { useUpdateUserContracts } from '@/hooks/userContracts/useUpdateUserContracts'
import { useRecentlyClicked } from '@/hooks/useRecentlyClicked'
import { DeleteContractModal } from '@/view/components/DeleteContractModal'
import { UpdateDeployment } from '@/domain/repositories/DeploymentRepository'
import { nameWithTimestamp } from '@/utils/generators'
import { getUserContractUrl } from './getUserContractUrl'

export interface TableConfig {
  onlyTable: boolean
  editName: boolean
}

export interface ContractsTableProps {
  contracts: UserContractTableItem[]
  onDownloadMeta: (contract: UserContractTableItem) => void
  tableConfig?: TableConfig
}

const MAX_INPUT_LENGTH = 20
const ERROR_MESSAGE = '20 characters max'

function ContractTableRow({
  contract,
  config,
  setOpenShareModal,
  setOpenDeleteModal,
  onDownloadMeta
}: {
  contract: UserContractTableItem
  setOpenShareModal: React.Dispatch<React.SetStateAction<boolean>>
  setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
  config?: TableConfig
} & Pick<ContractsTableProps, 'onDownloadMeta'>) {
  const [editable, setEditable] = React.useState(false)
  const [error, setError] = React.useState(false)
  const [textInput, setTextInput] = React.useState(contract.name)
  const { updateContract } = useUpdateUserContracts()
  const { ref: refButton, recentlyClicked } = useRecentlyClicked()
  const isDownloading = recentlyClicked || contract.isDownloading

  const typeMap = TITLE_MAP_TOKEN[contract.type]

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(false)
    const value = event.target.value
    if (value.length >= MAX_INPUT_LENGTH) {
      setError(true)
      return
    }
    setTextInput(value)
  }

  const handleUpdate = () => {
    setEditable(!editable)
    const contractName =
      textInput.length > 0 ? textInput : nameWithTimestamp('custom')
    const updatedContract: UpdateDeployment = {
      address: contract.address,
      userAddress: contract.userAddress,
      network: contract.network,
      name: textInput,
      hidden: false
    }
    setTextInput(contractName)
    updateContract({
      deployment: updatedContract
    })
  }

  return (
    <TableRow
      sx={{
        '&:last-child td, &:last-child th': { border: 0 },
        ':hover': {
          backgroundColor: '#AD093029'
        }
      }}
    >
      <TableCell
        sx={{
          minWidth: { lg: '10rem', xl: '16rem' },
          height: '5rem',
          color: 'white',
          input: {
            color: 'white'
          }
        }}
        component="th"
        scope="row"
      >
        <TokenWrapper>
          {editable ? (
            <>
              <TextField
                error={error}
                helperText={error ? ERROR_MESSAGE : ''}
                value={textInput}
                onChange={handleChange}
              ></TextField>

              <DefaultToolTipButton
                id="save-contract-name"
                sx={{ color: 'green' }}
                title="Save"
                Icon={CheckIcon}
                onClick={handleUpdate}
              ></DefaultToolTipButton>
              <DefaultToolTipButton
                id="cancel-contract-name"
                sx={{ color: 'tomato' }}
                title="Cancel"
                Icon={CancelIcon}
                onClick={() => setEditable(!editable)}
              ></DefaultToolTipButton>
            </>
          ) : (
            <>
              <Typography>{textInput}</Typography>
              {config?.editName && (
                <DefaultToolTipButton
                  id="edit-contract-address"
                  sx={{ color: 'white' }}
                  title="Edit"
                  Icon={EditIcon}
                  onClick={() => setEditable(!editable)}
                ></DefaultToolTipButton>
              )}
            </>
          )}
        </TokenWrapper>
      </TableCell>
      <TableCell component="th" scope="row">
        <TokenWrapper>
          <TokenIconSvg label={contract.type} />
          {typeMap.title}
        </TokenWrapper>
      </TableCell>
      <TableCell>
        <Stack direction="row">
          <MonoTypography>
            {truncateAddress(contract.address, 4)}
          </MonoTypography>
          <CopyToClipboardButton
            id="copy-contract-address"
            sx={{ marginLeft: '0.5rem' }}
            data={contract.address}
          />
        </Stack>
      </TableCell>
      <TableCell>
        <Tooltip placement="top" title={isoDate(contract.date)}>
          <Typography variant="body1">
            {isoToReadableDate(contract.date)}
          </Typography>
        </Tooltip>
      </TableCell>
      <TableCell align="right">
        <DefaultToolTipButton
          id="share-contract-address"
          sx={{ marginLeft: '0.5rem', color: 'white' }}
          title="Share"
          Icon={ShareIcon}
          onClick={() => setOpenShareModal(true)}
        ></DefaultToolTipButton>
        <DefaultToolTipButton
          id="delete-contract-address"
          sx={{ marginLeft: '0.5rem', color: 'white' }}
          title="Delete"
          Icon={DeleteIcon}
          onClick={() => setOpenDeleteModal(true)}
        ></DefaultToolTipButton>
        <IconButton
          sx={{ marginLeft: '0.5rem', color: 'white' }}
          size="small"
          ref={refButton}
          disabled={isDownloading}
          onClick={() => onDownloadMeta(contract)}
        >
          {isDownloading ? (
            <HourglassBottomIcon />
          ) : (
            <Tooltip title="download .json" placement="top">
              <FileDownloadIcon color={'inherit'} />
            </Tooltip>
          )}
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

export function ContractsTable({
  contracts,
  onDownloadMeta,
  tableConfig
}: ContractsTableProps): JSX.Element {
  const [openShareModal, setOpenShareModal] = React.useState(false)
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false)
  const [url, setUrl] = React.useState('')
  const [contract, setContract] = React.useState({} as UserContractTableItem)

  return (
    <>
      <StyledTableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="caption">NAME</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="caption">TYPE</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="caption">ADDRESS</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="caption">ADDED ON</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="caption">ACTIONS</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contracts.map(contract => {
              const url = getUserContractUrl(contract)
              return contract.hidden ? null : (
                <ContractTableRow
                  key={contract.address}
                  contract={contract}
                  config={tableConfig}
                  onDownloadMeta={onDownloadMeta}
                  setOpenShareModal={() => {
                    setUrl(url)
                    setOpenShareModal(true)
                  }}
                  setOpenDeleteModal={() => {
                    setContract(contract)
                    setOpenDeleteModal(true)
                  }}
                />
              )
            })}
          </TableBody>
        </Table>
      </StyledTableContainer>
      <ShareContractModal
        open={openShareModal}
        handleClose={() => setOpenShareModal(false)}
        url={url}
      ></ShareContractModal>

      <DeleteContractModal
        open={openDeleteModal}
        handleClose={() => setOpenDeleteModal(false)}
        contract={contract}
      ></DeleteContractModal>
    </>
  )
}
