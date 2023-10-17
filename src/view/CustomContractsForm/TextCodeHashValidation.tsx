import { Stack, Typography } from '@mui/material'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import WarningIcon from '@mui/icons-material/Warning'

interface Props {
  error?: string | null
  network: string
}

export function TextCodeHashValidation({ error, network }: Props) {
  if (error) {
    return (
      <Typography variant="h5" color="orange">
        <WarningIcon />
        {error}
      </Typography>
    )
  }

  return (
    <Stack flexDirection={'row'} gap={1}>
      <TaskAltIcon color="success" />
      <Typography variant="h5" color="success">
        Valid contract, Metadata source code hash is the same on {network}
      </Typography>
    </Stack>
  )
}
