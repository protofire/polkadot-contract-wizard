import * as React from 'react'
import {
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
import CopyToClipboardButton from '../../components/CopyButton'
import { TokenType } from '@/types'
import { ContractDeployed } from 'src/context/SCDeployedContext'
import { truncateAddress } from '@/utils/formatString'

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

export default function BasicTable({
  contractsDeployed
}: {
  contractsDeployed: ContractDeployed[]
}): JSX.Element | null {
  return (
    <>
      <Typography variant="h3" align="center" mt="2">
        Deployed contracts
      </Typography>
      <StyledTableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>TYPE</TableCell>
              <TableCell>NAME</TableCell>
              <TableCell>ADDRESS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contractsDeployed.map(contract => (
              <TableRow
                key={contract.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {typeMap[contract.type]}
                </TableCell>
                <TableCell>{contract.name || `-`}</TableCell>
                <TableCell>
                  {contract.address && (
                    <CopyToClipboard text={contract.address}>
                      <>
                        {truncateAddress(contract.address)}
                        <CopyToClipboardButton />
                      </>
                    </CopyToClipboard>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </>
  )
}
