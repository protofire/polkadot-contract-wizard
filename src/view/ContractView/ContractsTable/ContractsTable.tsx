import * as React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Stack,
  TextField,
  Typography
} from '@mui/material'

import { CopyToClipboardButton, TokenIconSvg } from '@/components'
import { isoToReadableDate, truncateAddress } from '@/utils/formatString'
import { ContractTableItem } from '@/domain/wizard/ContractTableItem'
import { MonoTypography } from '@/components'
import { StyledTableContainer, TokenWrapper } from './styled'
import { DefaultToolTipButton } from '@/view/components/DefaultTooltipButton'

import EditIcon from '@mui/icons-material/Edit'
import ShareIcon from '@mui/icons-material/Share'
import DeleteIcon from '@mui/icons-material/Delete'
import CheckIcon from '@mui/icons-material/CheckCircleOutlineRounded'
import CancelIcon from '@mui/icons-material/Cancel'

import { ShareContractModal } from '@/view/components/ShareContractModal'
import { TITLE_MAP_TOKEN } from '@/constants/titleTokenType'
import { useUpdateUserContracts } from '@/hooks/userContracts/useUpdateUserContracts'
import { DeleteContractModal } from '@/view/components/DeleteContractModal'
import { UpdateDeployment } from '@/domain/repositories/DeploymentRepository'

export interface ContractsTableProps {
  contracts: ContractTableItem[]
}

function ContractTableRow({
  contract,
  setOpenShareModal,
  setOpenDeleteModal
}: {
  contract: ContractTableItem
  setOpenShareModal: React.Dispatch<React.SetStateAction<boolean>>
  setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [editable, setEditable] = React.useState(false)
  const [textInput, setTextInput] = React.useState(contract.name)
  const { updateContract } = useUpdateUserContracts()

  const typeMap = TITLE_MAP_TOKEN[contract.type]

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(event.target.value)
  }

  const handleUpdate = () => {
    setEditable(!editable)
    const updatedContract: UpdateDeployment = {
      contractAddress: contract.address,
      userAddress: contract.userAddress,
      network: contract.blockchain,
      contractName: textInput,
      hidden: false
    }

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
              <TextField value={textInput} onChange={handleChange}></TextField>
              <DefaultToolTipButton
                id="save-contract-name"
                sx={{ marginLeft: '0.5rem', color: 'white' }}
                title="Save"
                Icon={CheckIcon}
                onClick={handleUpdate}
              ></DefaultToolTipButton>
              <DefaultToolTipButton
                id="cancel-contract-name"
                sx={{ marginLeft: '0.5rem', color: 'white' }}
                title="Cancel"
                Icon={CancelIcon}
                onClick={() => setEditable(!editable)}
              ></DefaultToolTipButton>
            </>
          ) : (
            <>
              <Typography>{textInput}</Typography>
              <DefaultToolTipButton
                id="edit-contract-address"
                sx={{ marginLeft: '0.5rem', color: 'white' }}
                title="Edit"
                Icon={EditIcon}
                onClick={() => setEditable(!editable)}
              ></DefaultToolTipButton>
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
      <TableCell>{isoToReadableDate(contract.date)}</TableCell>
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
      </TableCell>
    </TableRow>
  )
}

export function ContractsTable({
  contracts
}: ContractsTableProps): JSX.Element {
  const [openShareModal, setOpenShareModal] = React.useState(false)
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false)
  const [url, setUrl] = React.useState('')
  const [contract, setContract] = React.useState({} as ContractTableItem)
  return (
    <>
      <StyledTableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>NAME</TableCell>
              <TableCell>TYPE</TableCell>
              <TableCell>ADDRESS</TableCell>
              <TableCell>ADDED ON</TableCell>
              <TableCell align="right">ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contracts.map(contract => {
              const url = `https://contractwizard.xyz/contract/?user=${contract.userAddress}&contract=${contract.address}`
              return contract.hidden ? (
                <></>
              ) : (
                <ContractTableRow
                  key={contract.address}
                  contract={contract}
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
