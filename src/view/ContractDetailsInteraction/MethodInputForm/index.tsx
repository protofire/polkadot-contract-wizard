import { Box, Typography } from '@mui/material'
import { AbiMessage, Registry } from '@/services/substrate/types'
import { useArgValues } from './useArgValues'
import { ArgumentsForm } from './ArgumentForm'

export interface MethodInputFormProps {
  abiMessage: AbiMessage
  substrateRegistry: Registry
}

export function MethodInputForm({
  abiMessage,
  substrateRegistry
}: MethodInputFormProps) {
  const { argValues, setArgValues, inputData } = useArgValues(
    abiMessage,
    substrateRegistry
  )

  return (
    <Box>
      <Typography>Message to send</Typography>
      <ArgumentsForm
        argValues={argValues}
        args={abiMessage?.args ?? []}
        registry={substrateRegistry}
        setArgValues={setArgValues}
      />
    </Box>
  )
}
