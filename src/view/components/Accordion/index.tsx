import { cloneElement, isValidElement, useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography
} from '@mui/material'
import { StyledAccordionContainer } from './styled'

interface AccordionRow {
  title: string
  content: React.ReactNode
  id: string
}
interface SimpleAccordionProps {
  elements: AccordionRow[]
  expandIcon?: React.ReactNode
}

export default function SimpleAccordion({
  elements,
  expandIcon = <ExpandMoreIcon />
}: SimpleAccordionProps) {
  const [expandedIds, setExpandedIds] = useState<{ [key: string]: boolean }>({})

  const handleChange =
    (id: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedIds(prevExpandedIds => ({
        ...prevExpandedIds,
        [id]: isExpanded ? true : !prevExpandedIds[id]
      }))
    }

  return (
    <StyledAccordionContainer mt={8}>
      {elements.map(row => (
        <Accordion
          key={row.id}
          expanded={!!expandedIds[row.id]}
          onChange={handleChange(row.id)}
        >
          <AccordionSummary
            expandIcon={expandIcon}
            aria-controls={row.id}
            id={row.id}
          >
            <Typography variant="h4">{row.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {row.content && isValidElement(row.content)
              ? cloneElement(row.content as React.ReactElement, {
                  expanded: !!expandedIds[row.id]
                })
              : row.content}
          </AccordionDetails>
        </Accordion>
      ))}
    </StyledAccordionContainer>
  )
}
