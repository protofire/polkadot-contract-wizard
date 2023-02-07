import * as React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled, Box, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';

const StyledAccordionContainer = styled(Box)(
    ({ theme }) => ({
        [theme.breakpoints.down('md')]: {
            color: theme.palette.secondary.light,
        },
        '& .MuiAccordion-root': {
            color: theme.palette.secondary.light,
            fontSize: '1.1rem',
        },
        '& .Mui-expanded': {

        },
    })
)

export default function SimpleAccordion() {
    return (
        <StyledAccordionContainer mt={4}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
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
                    <Typography variant="h3">Polkadot Ecosystem</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="body1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </StyledAccordionContainer>
    );
}
