import {
  TableContainer,
  TableContainerProps,
  Stack,
  TableRow
} from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledTableContainer = styled(TableContainer)<TableContainerProps>(
  ({ theme }) => ({
    '& .MuiTable-root': {
      margin: '2rem auto 1rem'
    },
    '& .MuiTableCell-root': {
      color: theme.palette.secondary.light,
      fontSize: '1.1rem',
      fontFeatureSettings: '"ss01", "ss02"'
    }
  })
)

export const TokenWrapper = styled(Stack)(() => ({
  flexDirection: 'row',
  gap: '0.5rem'
}))

export const TableRowStyled = styled(TableRow)({
  '&:last-child td, &:last-child th': {
    border: 0
  },
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 1)', // Ajusta el color según tus preferencias
    cursor: 'pointer'
  }
})
