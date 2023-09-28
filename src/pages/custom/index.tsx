import { Box, Stack, Typography } from '@mui/material'

export default function CustomContracts() {
  return (
    <Box
      sx={{
        width: { sm: '90%', md: '75%', lg: '80%', xl: '60%' },
        margin: '0 auto 2rem auto'
      }}
    >
      <Typography variant="h1" align="center">
        Import Custom Contract
      </Typography>
      <Stack mt={8} flexDirection="column" gap={4} justifyContent={'center'}>
        <Typography variant="h3">Import form</Typography>
      </Stack>
    </Box>
  )
}
