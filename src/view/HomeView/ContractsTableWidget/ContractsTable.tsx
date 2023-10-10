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
  Tooltip,
  Box
} from '@mui/material'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom'

import { CopyToClipboardButton, TokenIconSvg } from '@/components'
import { isoToReadableDate, truncateAddress } from '@/utils/formatString'
import { TokenType } from '@/domain'
import { ContractTableItem } from '@/domain/wizard/ContractTableItem'
import { useRecentlyClicked } from '@/hooks/useRecentlyClicked'
import { MonoTypography } from '@/components'
import { StyledTableContainer, TokenWrapper } from './styled'
import Link from 'next/link'

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
  const { ref: refButton, recentlyClicked } = useRecentlyClicked()
  const isDownloading = recentlyClicked || contract.isDownloading
  const type = contract.name as TokenType

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
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
        <IconButton
          ref={refButton}
          disabled={isDownloading}
          onClick={() => onDownloadMeta(contract.codeHash)}
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
  onDownloadMeta
}: ContractsTableProps): JSX.Element {
  const totalContracts = contracts.length
  const lastContracts = contracts.slice(-4).reverse()

  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" gap={6}>
        <Typography variant="h3">Last Contracts</Typography>
        <Link href={''}>
          <Typography variant="h5" color="primary">
            View all contracts ({totalContracts})
          </Typography>
        </Link>
      </Box>
      <StyledTableContainer>
        {lastContracts.length > 0 ? (
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>TYPE</TableCell>
                <TableCell>ADDRESS</TableCell>
                <TableCell>ADDED</TableCell>
                <TableCell align="right">METADATA</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lastContracts.map(contract => (
                <ContractTableRow
                  key={contract.address}
                  contract={contract}
                  onDownloadMeta={onDownloadMeta}
                />
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography variant="body1" align="center" color="white" mt="2rem">
            You don&apos;t have any contracts for this network. Build one! ☝️
          </Typography>
        )}
      </StyledTableContainer>
    </>
  )
}
