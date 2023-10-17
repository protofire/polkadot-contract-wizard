import { styled, Box, alpha } from '@mui/material'

export const StyledTabsContainer = styled(Box)(({ theme }) => ({
  '& .MuiTabs-root': {
    fontSize: '1.6rem',
    color: theme.palette.common.white,
    borderBottom: '3px solid' + theme.palette.primary.main
  },
  '& .MuiTabs-root button': {
    fontSize: '1.1rem',
    padding: '1rem 2rem'
  },
  '& .Mui-selected': {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
    borderRadius: '0.5rem 0.5rem 0 0'
  },
  '& .tab-content': {
    backgroundColor: theme.palette.background.paper,
    padding: '2rem'
  }
}))
