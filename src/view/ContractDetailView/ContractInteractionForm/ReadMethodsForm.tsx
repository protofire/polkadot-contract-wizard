import { useEffect, useState } from 'react'
import { ContractInteractionProps } from '.'
import { Box, CircularProgress, Stack, Typography } from '@mui/material'
import { MethodDocumentation } from '../MethodDocumentation'
import { AbiParam } from '@/services/substrate/types'
import { ButtonCall } from './styled'
import { useContractCaller } from '@/hooks/useContractCaller'
import { getDecodedOutput } from '@/utils/contractExecResult'
import { CopyToClipboardButton, StyledTextField } from '@/view/components'

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
  const { caller } = useContractCaller(contractPromise, abiMessage.method)
  const [outcome, setOutcome] = useState<string>('')

  useEffect(() => {
    if (!expanded) return
    caller.send(inputData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputData, expanded])

  useEffect(() => {
    if (caller.result?.ok) {
      const { decodedOutput, isError } = getDecodedOutput(
        {
          debugMessage: caller.result.value.raw.debugMessage,
          result: caller.result.value.raw.result
        },
        abiMessage,
        substrateRegistry
      )
      setOutcome(decodedOutput)
    }
  }, [abiMessage, caller.result, substrateRegistry])

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
            {caller.isSubmitting ? (
              <CircularProgress color="primary" />
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '1rem'
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}
                >
                  <StyledTextField placeholder="0" value={outcome} />
                  <CopyToClipboardButton
                    id="copy-contract-address"
                    sx={{ marginLeft: '0.5rem' }}
                    data={outcome}
                  />
                </Box>
                <ButtonCall onClick={() => caller.send(inputData)}>
                  Recall
                </ButtonCall>
              </Box>
            )}
          </Box>
        </Stack>
      </Box>
      <Box sx={{ maxWidth: '45%', minWidth: '40%' }}>
        <MethodDocumentation abiMessage={abiMessage} />
      </Box>
    </Stack>
  )
}
