import * as React from 'react'
import {
  IconButton,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableContainerProps,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { styled } from '@mui/material/styles'
import FileDownloadIcon from '@mui/icons-material/FileDownload'

import { CopyToClipboardButton } from '@/components'
import { downloadMetadata } from '@/utils/downloadMetadata'
import { TokenType } from '@/types'
import { capitalizeFirstLetter, truncateAddress } from '@/utils/formatString'
import { isContractDeployed } from '@/domain'
import { ContractTableItem } from '@/domain/wizard/ContractTableItem'

const StyledTableContainer = styled(TableContainer)<TableContainerProps>(
  ({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      /* styles here */
    },
    '& .MuiTable-root': {
      margin: '2rem auto',
      width: '80%'
    },
    '& .MuiTableCell-root': {
      color: theme.palette.secondary.light,
      fontSize: '1.1rem',
      fontFeatureSettings: '"ss01", "ss02"'
    }
  })
)

const typeMap: Record<TokenType, string> = {
  psp34: 'NFT | PSP34',
  psp22: 'TOKEN | PSP22',
  psp37: 'MULTI TOKEN | PSP37'
}

export interface ContractsTableProps {
  contracts: ContractTableItem[]
  onSearchContract: (codeId: string) => void
}

function ContractTableRow({ contract }: { contract: ContractTableItem }) {
  const _isContractDeployed = isContractDeployed(contract)

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row">
        {typeMap[contract.type]}
      </TableCell>
      <TableCell>{contract.name || `-`}</TableCell>
      <TableCell>
        {_isContractDeployed && contract.address && (
          <CopyToClipboard text={contract.address}>
            <>
              {truncateAddress(contract.address)}
              <CopyToClipboardButton />
            </>
          </CopyToClipboard>
        )}
      </TableCell>
      <TableCell>
        <Chip
          label={capitalizeFirstLetter(contract.status)}
          color={_isContractDeployed ? 'primary' : 'secondary'}
          size="small"
        />
      </TableCell>
      <TableCell>
        <IconButton
          onClick={() => {
            downloadMetadata(contract.code_id)
          }}
        >
          <FileDownloadIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

export function ContractsTable({
  contracts
}: ContractsTableProps): JSX.Element {
  return (
    <>
      <Typography variant="h3" align="center" mt="2">
        Contracts
      </Typography>
      <StyledTableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>TYPE</TableCell>
              <TableCell>NAME</TableCell>
              <TableCell>ADDRESS</TableCell>
              <TableCell>STATUS</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contracts.map(contract => (
              <ContractTableRow key={contract.code_id} contract={contract} />
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </>
  )
}
