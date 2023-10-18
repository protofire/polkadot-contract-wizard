import { Stack } from '@mui/material'
import WarningIcon from '@mui/icons-material/Warning'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'

interface Props {
  error?: string | null
  network: string
}

export function TextCodeHashValidation({ error, network }: Props) {
  return (
    <Stack flexDirection={'row'} gap={1}>
      {error ? (
        <>
          <WarningIcon />
          {error}
        </>
      ) : (
        <>
          <ThumbUpIcon />
          metadata source code hash is the same on {network}
        </>
      )}
    </Stack>
  )
}
