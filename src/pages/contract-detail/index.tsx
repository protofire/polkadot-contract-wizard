// import { Accordion } from '@/view/ContractDetailView/Accordion'
import SimpleAccordion from '@/view/components/Accordion'
import BasicTabs from '@/view/components/Tabs'
import { Box, Typography } from '@mui/material'

export default function ContractDetail() {
  return (
    <>
      <Box
        sx={{
          width: { sm: '90%', md: '75%', lg: '80%', xl: '60%' },
          margin: '0 auto 2rem auto'
        }}
      >
        <Typography variant="h3" align="left">
          Custom_01
        </Typography>
        <Typography variant="caption" align="left">
          Contract NAME
        </Typography>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          sx={{ margin: '2em 0 3rem' }}
        >
          <Box display="flex" flexDirection="column">
            <Typography variant="caption" align="left">
              TYPE
            </Typography>
            <Typography variant="h5" align="left">
              PSP22
            </Typography>
          </Box>
          <Box display="flex" flexDirection="column">
            <Typography variant="caption" align="left">
              STATUS
            </Typography>
            <Typography variant="h5" align="left">
              Imported
            </Typography>
          </Box>
          <Box display="flex" flexDirection="column">
            <Typography variant="caption" align="left">
              CONTRACT VERSION
            </Typography>
            <Typography variant="h5" align="left">
              1.2.1
            </Typography>
          </Box>
          <Box display="flex" flexDirection="column">
            <Typography variant="caption" align="left">
              LANGUAGE
            </Typography>
            <Typography variant="h5" align="left">
              INK! 4.0.5
            </Typography>
          </Box>
        </Box>
        <BasicTabs />
        <SimpleAccordion />
      </Box>
    </>
  )
}
