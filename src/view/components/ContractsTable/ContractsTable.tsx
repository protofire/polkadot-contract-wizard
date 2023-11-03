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
  takeLastChars,
  truncateAddress
} from '@/utils/formatString'
import { UserContractTableItem } from '@/domain/wizard/ContractTableItem'
import { MonoTypography } from '@/components'
import { StyledTableContainer, TableRowStyled, TokenWrapper } from './styled'
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
import router from 'next/router'
import { ROUTES } from '@/constants'
import { MuiTextField } from '../MuiTextField'
import { useRef } from 'react'

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
  const textRef = useRef<HTMLInputElement>(null)

  const typeMap = TITLE_MAP_TOKEN[contract.type]

  const handleRowClick = () => {
    router.push(`${ROUTES.CONTRACTDETAIL}?uuid=${contract.uuid}`)
  }

  const stopPropagation = (
    event: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>,
    onFn: () => void
  ) => {
    event.stopPropagation()
    onFn()
  }

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
    <TableRowStyled onClick={handleRowClick}>
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
              <MuiTextField
                error={error}
                helperText={error ? ERROR_MESSAGE : ''}
                value={textInput}
                onChange={handleChange}
                ref={textRef}
              ></MuiTextField>

              <DefaultToolTipButton
                id={`save-contract-name${takeLastChars(contract.uuid)}`}
                sx={{ color: 'green' }}
                title="Save"
                Icon={CheckIcon}
                onClick={event => stopPropagation(event, () => handleUpdate())}
              ></DefaultToolTipButton>
              <DefaultToolTipButton
                id={`cancel-contract-name${takeLastChars(contract.uuid)}`}
                sx={{ color: 'tomato' }}
                title="Cancel"
                Icon={CancelIcon}
                onClick={event =>
                  stopPropagation(event, () => setEditable(!editable))
                }
              ></DefaultToolTipButton>
            </>
          ) : (
            <>
              <Typography>{textInput}</Typography>
              {config?.editName && (
                <DefaultToolTipButton
                  id={`edit-contract-name${takeLastChars(contract.uuid)}`}
                  sx={{ color: 'white' }}
                  title="Edit"
                  Icon={EditIcon}
                  onClick={event => {
                    stopPropagation(event, () => {
                      setEditable(!editable)
                      textRef.current && textRef.current.focus()
                    })
                  }}
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
            id={`copy-contract-${takeLastChars(contract.uuid)}`}
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
          id={`share-contract-${takeLastChars(contract.uuid)}`}
          sx={{ marginLeft: '0.5rem', color: 'white' }}
          title="Share"
          Icon={ShareIcon}
          onClick={event =>
            stopPropagation(event, () => setOpenShareModal(true))
          }
        ></DefaultToolTipButton>
        <DefaultToolTipButton
          id={`hide-contract-${takeLastChars(contract.uuid)}`}
          sx={{ marginLeft: '0.5rem', color: 'white' }}
          title="Delete"
          Icon={DeleteIcon}
          onClick={event =>
            stopPropagation(event, () => setOpenDeleteModal(true))
          }
        ></DefaultToolTipButton>
        <DefaultToolTipButton
          id={`download-metadata-${takeLastChars(contract.uuid)}`}
          sx={{ marginLeft: '0.5rem', color: 'white' }}
          ref={refButton}
          disabled={isDownloading}
          Icon={isDownloading ? HourglassBottomIcon : FileDownloadIcon}
          title={isDownloading ? '' : 'download .json'}
          onClick={event =>
            stopPropagation(event, () => onDownloadMeta(contract))
          }
        ></DefaultToolTipButton>
      </TableCell>
    </TableRowStyled>
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
  const [contractDeleted, setContractDeleted] = React.useState(
    {} as UserContractTableItem
  )

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
                    setContractDeleted(contract)
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
        contract={contractDeleted}
      ></DeleteContractModal>
    </>
  )
}
