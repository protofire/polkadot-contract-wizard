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
  Typography,
  Stack
} from '@mui/material'
import { styled } from '@mui/material/styles'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom'

import { CopyToClipboardButton, TokenIconSvg } from '@/components'
import {
  capitalizeFirstLetter,
  emptyAsDash,
  truncateAddress
} from '@/utils/formatString'
import { TokenType, isContractDeployed } from '@/domain'
import { ContractTableItem } from '@/domain/wizard/ContractTableItem'
import { useRecentlyClicked } from 'src/hooks/useRecentlyClicked'
import { MonoTypography } from '@/components'
import { PspChipLabel } from '@/view/components/PspChipLabel'

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
  psp34: 'NFT',
  psp22: 'TOKEN',
  psp37: 'MULTI TOKEN'
}

export interface ContractsTableProps {
  contracts: ContractTableItem[]
  onDownloadMeta: (codeId: string) => void
}

function ContractTableRow({
  contract,
  onDownloadMeta
}: {
  contract: ContractTableItem
} & Pick<ContractsTableProps, 'onDownloadMeta'>) {
  const _isContractDeployed = isContractDeployed(contract)
  const { ref: refButton, recentlyClicked } = useRecentlyClicked({
    onClick: () => onDownloadMeta(contract.code_id)
  })
  const isDownloading = recentlyClicked || contract.isDownloading

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row">
        <TokenIconSvg label={contract.type} />
        {typeMap[contract.type]}
      </TableCell>
      <TableCell>{emptyAsDash(contract.name)}</TableCell>
      <TableCell>
        {_isContractDeployed && contract.address && (
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
        )}
      </TableCell>
      <TableCell>
        <Chip
          label={capitalizeFirstLetter(contract.status)}
          variant="outlined"
          color={_isContractDeployed ? 'primary' : 'secondary'}
          size="small"
        />
      </TableCell>
      <TableCell>
        <IconButton ref={refButton} disabled={isDownloading}>
          {isDownloading ? <HourglassBottomIcon /> : <FileDownloadIcon />}
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

export function ContractsTable({
  contracts,
  onDownloadMeta
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
              <ContractTableRow
                key={contract.code_id}
                contract={contract}
                onDownloadMeta={onDownloadMeta}
              />
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </>
  )
}