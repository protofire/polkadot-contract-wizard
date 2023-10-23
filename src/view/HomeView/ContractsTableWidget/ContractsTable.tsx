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
import { ContractTableItem } from '@/domain/wizard/ContractTableItem'
import { useRecentlyClicked } from '@/hooks/useRecentlyClicked'
import { MonoTypography } from '@/components'
import { StyledTableContainer, TokenWrapper } from './styled'
import Link from 'next/link'
import { ROUTES } from '@/constants/routes'
import NetworkBadge from '@/components/NetworkBadge'
import { getChain } from '@/constants/chains'
import { useNetworkAccountsContext } from '@/context/NetworkAccountsContext'
import { ContractType } from '@/domain/repositories/DeploymentRepository'

const typeMap: Record<ContractType, string> = {
  psp34: 'NFT',
  psp22: 'TOKEN',
  psp37: 'MULTI TOKEN',
  custom: 'CUSTOM TOKEN'
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
  const type = contract.type
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
      <TableCell>
        <Tooltip placement="top" title={contract.date}>
          <Typography variant="body1">
            {isoToReadableDate(contract.date)}
          </Typography>
        </Tooltip>
      </TableCell>
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
  const { networkConnected: network } = useNetworkAccountsContext()
  const { logo, name: networkName } = getChain(network)

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={6}
        mt="3rem"
      >
        <Box display="flex" alignItems="center" gap={1.25}>
          <Typography variant="h3">Last Contracts</Typography>
          <Typography variant="body1" component="p">
            on
          </Typography>
          <NetworkBadge
            name={networkName}
            logo={logo.src}
            logoSize={{ width: 20, height: 20 }}
            description={logo.alt}
          />
        </Box>
      </Box>
      <StyledTableContainer>
        {lastContracts.length > 0 ? (
          <>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
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
                    <Typography variant="caption">METADATA</Typography>
                  </TableCell>
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
            {lastContracts.length > 0 ? (
              <Link href={ROUTES.CONTRACTS}>
                <Typography
                  variant="h5"
                  color="primary"
                  textAlign="center"
                  mb="1rem"
                >
                  View all contracts ({totalContracts})
                </Typography>
              </Link>
            ) : (
              ''
            )}
          </>
        ) : (
          <Typography
            variant="body1"
            align="center"
            color="white"
            mt="2rem"
            mb="1rem"
          >
            You don&apos;t have any contracts for this network. Build one! ☝️
          </Typography>
        )}
      </StyledTableContainer>
    </>
  )
}
