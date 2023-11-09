import { Box, Typography } from '@mui/material'
import { AbiMessage } from '@/services/substrate/types'

interface Props {
  abiMessage: AbiMessage
}

export function MethodDocumentation({ abiMessage }: Props) {
  return (
    <Box
      sx={{
        borderWidth: '1px',
        borderColor: 'primary.main',
        borderRadius: '0.5rem',
        borderStyle: 'solid',
        p: 2,
        bgcolor: 'background.paper'
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        {abiMessage.method}
      </Typography>
      <Typography variant="body1">{abiMessage.docs}</Typography>
    </Box>
  )
}
