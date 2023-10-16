import { styled, Box } from '@mui/material'

export const StyledAccordionContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    color: theme.palette.secondary.light
  },
  '& .MuiAccordion-root': {
    color: theme.palette.secondary.light,
    fontSize: '1rem',
    borderRadius: '0.5rem',
    margin: '0.8rem 0'
  },
  '& .MuiAccordion-root::before': {
    background: theme.palette.secondary.dark
  },
  '& .MuiAccordionSummary-root :hover': {
    color: theme.palette.primary.main
  },
  '& .MuiAccordionSummary-content h3': {
    fontWeight: '400'
  },
  '& .Mui-expanded h4': {
    color: theme.palette.primary.main
  }
}))
