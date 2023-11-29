import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledTabsContainer = styled(Box)(({ theme }) => ({
  '& .MuiTabs-root': {
    fontSize: '1.6rem',
    color: theme.palette.common.white,
    borderBottom: '3px solid' + theme.palette.primary.main,
    '& .Mui-selected': {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.primary.main
    }
  },

  '& .MuiTabs-root button': {
    padding: '0.7rem 1.8rem',
    borderRadius: '0.5rem 0.5rem 0 0',
    color: theme.palette.common.white,
    backgroundColor: theme.palette.background.paper
  },

  '& .tab-content': {
    backgroundColor: theme.palette.background.paper,
    padding: '2rem'
  }
}))
