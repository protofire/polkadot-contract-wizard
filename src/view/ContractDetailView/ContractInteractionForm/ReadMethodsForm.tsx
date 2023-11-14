import { useEffect } from 'react'
import { ContractInteractionProps } from '.'
import {
  Box,
  CircularProgress,
  Stack,
  Typography,
  FormHelperText
} from '@mui/material'
import { MethodDocumentation } from '../MethodDocumentation'
import { AbiParam } from '@/services/substrate/types'
import { ButtonCall } from './styled'
import { useContractCaller } from '@/hooks/useContractCaller'
import { CopyBlock, atomOneDark } from 'react-code-blocks'

type Props = React.PropsWithChildren<
  Omit<ContractInteractionProps, 'type'> & {
    abiParams: AbiParam[]
    inputData: unknown[] | undefined
  }
>

export function ReadMethodsForm({
  children,
  inputData,
  abiMessage,
  abiParams,
  contractPromise,
  substrateRegistry,
  expanded
}: Props) {
  const { caller, outcome, error } = useContractCaller({
    contractPromise,
    abiMessage,
    substrateRegistry
  })

  useEffect(() => {
    if (!expanded) return
    caller.send(inputData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputData, expanded])

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="flex-start"
    >
      <Box minWidth="50%">
        <>
          {abiParams.length > 0 && <Typography>Message to send</Typography>}
          {children}
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
            {caller.isSubmitting ? (
              <CircularProgress color="primary" />
            ) : (
              <>
                <CopyBlock
                  text={outcome}
                  language="text"
                  theme={atomOneDark}
                  showLineNumbers={false}
                  codeBlock={true}
                  wrapLongLines={true}
                />
                {error && (
                  <FormHelperText error id={`error-${abiMessage.method}`}>
                    {error}
                  </FormHelperText>
                )}
              </>
            )}
          </Box>
          <ButtonCall onClick={() => caller.send(inputData)}>Recall</ButtonCall>
        </Stack>
      </Box>
      <Box sx={{ maxWidth: '45%', minWidth: '40%' }}>
        <MethodDocumentation abiMessage={abiMessage} />
      </Box>
    </Stack>
  )
}
