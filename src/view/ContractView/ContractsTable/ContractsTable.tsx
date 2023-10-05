import * as React from 'react'
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Stack,
  Tooltip
} from '@mui/material'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom'

import { CopyToClipboardButton, TokenIconSvg } from '@/components'
import { isoToReadableDate, truncateAddress } from '@/utils/formatString'
import { TokenType } from '@/domain'
import { ContractTableItem } from '@/domain/wizard/ContractTableItem'
import { MonoTypography } from '@/components'
import { StyledTableContainer, TokenWrapper } from './styled'
import { DefaultToolTipButton } from '@/view/components/DefaultTooltipButton'

import EditIcon from '@mui/icons-material/Edit'
import ShareIcon from '@mui/icons-material/Share'
import DeleteIcon from '@mui/icons-material/Delete'
import { ShareContractModal } from '@/view/components/ShareContractModal'

export const typeMap: Record<TokenType, string> = {
  psp34: 'NFT',
  psp22: 'TOKEN',
  psp37: 'MULTI TOKEN'
}

export interface ContractsTableProps {
  contracts: ContractTableItem[]
}

function ContractTableRow({
  contract,
  setOpenModal
}: {
  contract: ContractTableItem
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const type = contract.name as TokenType
  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row">
        <TokenWrapper>
          {typeMap[type]}
          <DefaultToolTipButton
            id="edit-contract-address"
            sx={{ marginLeft: '0.5rem', color: 'white' }}
            title="Edit"
            Icon={EditIcon}
          ></DefaultToolTipButton>
        </TokenWrapper>
      </TableCell>
      <TableCell component="th" scope="row">
        <TokenWrapper>
          <TokenIconSvg label={type} />
          {typeMap[type]}
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
          onClick={() => setOpenModal(true)}
        ></DefaultToolTipButton>
        <DefaultToolTipButton
          id="delete-contract-address"
          sx={{ marginLeft: '0.5rem', color: 'white' }}
          title="Delete"
          Icon={DeleteIcon}
        ></DefaultToolTipButton>
      </TableCell>
    </TableRow>
  )
}

export function ContractsTable({
  contracts
}: ContractsTableProps): JSX.Element {
  const [openModal, setOpenModal] = React.useState(false)
  const [url, setUrl] = React.useState('')
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
              return (
                <ContractTableRow
                  key={contract.address}
                  contract={contract}
                  setOpenModal={() => {
                    setUrl(url)
                    setOpenModal(true)
                  }}
                />
              )
            })}
          </TableBody>
        </Table>
      </StyledTableContainer>
      <ShareContractModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        url={url}
      ></ShareContractModal>
    </>
  )
}
