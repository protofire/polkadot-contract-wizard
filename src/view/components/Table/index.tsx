import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer, {
  TableContainerProps
} from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import { styled } from '@mui/material/styles'

const StyledTableContainer = styled(TableContainer)<TableContainerProps>(
  ({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      /* styles here */
    },
    '& .MuiTable-root': {
      margin: '2rem auto',
      width: '80%',
    },
    '& .MuiTableCell-root': {
      color: theme.palette.secondary.light,
      fontSize: '1.1rem',
    },
  })
)

function createData(type: string, name: string, address: string) {
  return { type, name, address }
}

const rows = [
  createData('NFT | PSP34', 'AXOLOTE', '0x2s10...3j2912'),
  createData('TOKEN | PSP22', 'SimpleToken', '0x8s82...s82MR0k'),
  createData('TOKEN | PSP22', 'ProtoToken', '0xa62h...s62ksd9'),
  createData('MULTI TOKEN | PSP37', 'ULTRA-DAO', '0x1f3f3...82K91a')
]

export default function BasicTable() {
  return (
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
          {rows.map(row => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.type}
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.address}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  )
}
