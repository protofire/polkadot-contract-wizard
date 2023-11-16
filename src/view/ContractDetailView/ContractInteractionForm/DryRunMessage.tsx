import { Stack, Typography, useTheme, alpha } from '@mui/material'
import { DryRunExecutionResult } from '../useDryRunExecution'
import { MySkeleton } from '@/view/components/MySkeleton'
import InfoIcon from '@mui/icons-material/Info'

type Props = Omit<DryRunExecutionResult, 'executeDryRun'>

export function DryRunMessage({ error, outcome, isRunning }: Props) {
  const isError = error !== undefined
  const color = isError ? 'red' : 'green'
  const theme = useTheme()

  if (!isError && !outcome && !isRunning) {
    return null
  }

  if (isRunning) {
    return (
      <MySkeleton
        variant="text"
        height={30}
        width={190}
        sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }}
      />
    )
  }

  return (
    <Stack direction="row" gap={1}>
      {/* <Tooltip placement="top" title={'info'}> */}
      <InfoIcon fontSize="small" color={isError ? 'error' : 'success'} />
      {/* </Tooltip> */}
      <Typography variant="caption" color={color}>
        {outcome}
      </Typography>
    </Stack>
  )
}
