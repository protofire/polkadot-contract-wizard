import { Box } from '@mui/material'
import { alpha } from '@mui/system'
import { styled } from '@mui/material/styles'

export const StyledAccordionContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    color: theme.palette.secondary.light
  },
  '& .MuiAccordion-root': {
    color: theme.palette.common.white,
    fontSize: '1rem',
    borderRadius: '0.5rem',
    margin: '0.8rem 0',
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    border: '1px solid' + theme.palette.primary.main
  },
  '& .MuiAccordion-root::before': {
    background: 'transparent'
  },
  '& .MuiAccordionSummary-root :hover': {
    color: theme.palette.primary.main
  },
  '& .MuiAccordionSummary-content h3': {
    fontWeight: '400'
  },
  '& .Mui-expanded .MuiAccordionSummary-root': {
    backgroundColor: alpha(theme.palette.primary.main, 0.4)
  },
  '& h4': {
    color: alpha(theme.palette.common.white, 0.9),
    fontSize: '1.1rem'
  },
  '& .Mui-expanded h4': {
    color: theme.palette.common.white
  }
}))
