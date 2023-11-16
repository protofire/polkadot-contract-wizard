import { Box, Stack, Typography } from '@mui/material'
import { ContractInteractionProps } from '.'
import { AbiParam } from '@/services/substrate/types'
import { useDryRunExecution } from '../useDryRunExecution'
import { MethodDocumentation } from '../MethodDocumentation'

import { ButtonCall } from './styled'
import { CopyToClipboardButton, StyledTextField } from '@/view/components'

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
  const { outcome, executeDryRun } = useDryRunExecution({
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
        <Box mt={2}>
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
              <ButtonCall isLoading={false} onClick={executeDryRun}>
                Recall
              </ButtonCall>
            </Box>
            {/* {error && (
              <FormHelperText error id={`error-${abiMessage.method}`}>
                {error}
              </FormHelperText>
            )} */}
          </Box>
        </Stack>
      </Box>
      <Box sx={{ maxWidth: '45%', minWidth: '40%' }}>
        <MethodDocumentation abiMessage={abiMessage} />
      </Box>
    </Stack>
  )
}
