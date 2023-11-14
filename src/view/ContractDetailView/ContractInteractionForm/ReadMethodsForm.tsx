import { useEffect, useState } from 'react'
import { ContractInteractionProps } from '.'
import { Box, CircularProgress, Stack, Typography } from '@mui/material'
import { MethodDocumentation } from '../MethodDocumentation'
import { AbiParam } from '@/services/substrate/types'
import { ButtonCall } from './styled'
import { useContractCaller } from '@/hooks/useContractCaller'
import { CopyBlock, atomOneDark } from 'react-code-blocks'

type Props = React.PropsWithChildren<
  Pick<
    ContractInteractionProps,
    'abiMessage' | 'expanded' | 'contractPromise'
  > & {
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
  expanded
}: Props) {
  const { caller } = useContractCaller(contractPromise, abiMessage.method)
  const [outcome, setOutcome] = useState<string>('')

  useEffect(() => {
    caller.send(inputData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputData])

  useEffect(() => {
    if (caller.result?.ok) {
      setOutcome(caller.result.value.decoded)
    }
  }, [caller.result])

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="flex-start"
    >
      <Box minWidth="50%">
        <>
          {abiParams.length > 0 && (
            <Typography variant="body1">Message to send</Typography>
          )}
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
              <CopyBlock
                text={outcome}
                language="text"
                theme={atomOneDark}
                showLineNumbers={false}
              />
            )}
          </Box>
          <ButtonCall onClick={() => caller.send(inputData)}>Call</ButtonCall>
        </Stack>
      </Box>
      <Box sx={{ maxWidth: '45%', minWidth: '40%' }}>
        <MethodDocumentation abiMessage={abiMessage} />
      </Box>
    </Stack>
  )
}
