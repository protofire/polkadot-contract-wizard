import { Box, CircularProgress, Stack, Typography } from '@mui/material'
import { ContractInteractionProps } from '.'
import { AbiParam } from '@/services/substrate/types'
import { useDryRunExecution } from '../useDryRunExecution'
import { MethodDocumentation } from '../MethodDocumentation'
import { ButtonCall } from './styled'
import { CopyBlock, atomOneDark } from 'react-code-blocks'

type Props = React.PropsWithChildren<
  Omit<ContractInteractionProps, 'type'> & {
    abiParams: AbiParam[]
    inputData: unknown[] | undefined
  }
>

export function WriteMethodsForm({
  children,
  abiParams,
  abiMessage,
  contractPromise,
  inputData
}: Props) {
  const { outcome, executeDryRun, isSubmitting } = useDryRunExecution({
    contractPromise,
    message: abiMessage,
    params: inputData,
    autoRun: false
  })

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="flex-start"
    >
      <Box minWidth="50%">
        <>
          {abiParams.length > 0 && (
            <Typography variant="overline">Message to send</Typography>
          )}
          {children}
        </>
        <Box display="block">
          <Typography variant="overline">Outcome</Typography>
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
            {isSubmitting ? (
              <CircularProgress color="primary" />
            ) : (
              <CopyBlock
                text={outcome}
                language="text"
                theme={atomOneDark}
                showLineNumbers={false}
                wrapLongLines={true}
              />
            )}
          </Box>
          <ButtonCall onClick={executeDryRun}>Call</ButtonCall>
        </Stack>
      </Box>
      <Box sx={{ maxWidth: '45%', minWidth: '40%' }}>
        <MethodDocumentation abiMessage={abiMessage} />
      </Box>
    </Stack>
  )
}
