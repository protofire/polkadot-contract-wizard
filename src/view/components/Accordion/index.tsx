import * as React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  styled,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography
} from '@mui/material'

const StyledAccordionContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    color: theme.palette.secondary.light
  },
  '& .MuiAccordion-root': {
    color: theme.palette.secondary.light,
    fontSize: '1.1rem'
  },
  '& .MuiAccordion-root::before': {
    background: theme.palette.secondary.dark
  },
  '& .MuiAccordionSummary-root :hover': {
    color: theme.palette.primary.main
  },
  '& .MuiAccordionSummary-content h3': {
    fontWeight: '300'
  },
  '& .Mui-expanded h3': {
    color: theme.palette.primary.main
  }
}))

export default function SimpleAccordion() {
  return (
    <StyledAccordionContainer mt={8}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="learn-section"
          id="learn-section"
        >
          <Typography variant="h3">How does it work?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            The Polkadot Contract Wizard is a non-code tool for smart contract
            development! It provides standard contracts (based on PSP), as well
            as useful contracts and macros to help you build ink! smart
            contracts.
          </Typography>
          <Typography variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant="h3">Polkadot Ecosystem</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography variant="h3">Smarts Contracts on Polkadot</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
          <Typography variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
          <Typography variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography variant="h3">Other networks and parachains</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
          <Typography variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
          <Typography variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </StyledAccordionContainer>
  )
}
