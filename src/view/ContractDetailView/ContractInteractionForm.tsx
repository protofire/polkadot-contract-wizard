import { Box, Stack, Typography, styled } from '@mui/material'
import { MethodDocumentation } from './MethodDocumentation'
import { LoadingButton, LoadingButtonProps } from '@/components'
import { CodeBlock } from '@/components/CodeBlock'
import { useArgValues } from './useArgValues'
import { ArgumentsForm } from './ArgumentForm'
import {
  AbiMessage,
  ContractPromise,
  Registry
} from '@/services/substrate/types'
import { useDryRunExecution } from './useDryRunExecution'

type Props = {
  abiMessage: AbiMessage
  substrateRegistry: Registry
  contractPromise: ContractPromise
  expanded?: boolean
}

export const ButtonCall = styled(LoadingButton)<LoadingButtonProps>(() => ({
  fontSize: '1rem',
  height: '2.5rem',
  borderRadius: '1.5rem',
  textTransform: 'none',
  border: 'none'
}))

export function ContractInteractionForm({
  abiMessage,
  substrateRegistry,
  contractPromise,
  expanded
}: Props) {
  const { argValues, setArgValues, inputData } = useArgValues(
    abiMessage,
    substrateRegistry
  )
  const messageArgs = abiMessage.args ?? []
  const { outcome, executeDryRun } = useDryRunExecution({
    contractPromise,
    message: abiMessage,
    params: inputData
  })

  return (
    <Box mt={2} ml={3} mr={3}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Box minWidth="50%">
          <>
            {messageArgs.length > 0 && <Typography>Message to send</Typography>}
            <ArgumentsForm
              argValues={argValues}
              args={messageArgs}
              registry={substrateRegistry}
              setArgValues={setArgValues}
            />
          </>
          <Box display="block">
            <Typography variant="caption">Outcome</Typography>
          </Box>

          <Stack direction="row" justifyContent="space-between">
            <Box
              sx={{
                minWidth: '45%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <CodeBlock label={outcome} />
            </Box>
            {messageArgs.length > 0 && (
              <ButtonCall onClick={executeDryRun}>Call</ButtonCall>
            )}
          </Stack>
        </Box>
        <Box sx={{ maxWidth: '45%', minWidth: '40%' }}>
          <MethodDocumentation abiMessage={abiMessage} />
        </Box>
      </Stack>
    </Box>
  )
}
