import { TableContainer, TableContainerProps, Stack } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledTableContainer = styled(TableContainer)<TableContainerProps>(
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

export const TokenWrapper = styled(Stack)(() => ({
  flexDirection: 'row',
  gap: '0.5rem'
}))
