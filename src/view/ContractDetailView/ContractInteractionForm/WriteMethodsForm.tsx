import { Box, FormHelperText, Stack, Typography } from '@mui/material'
import { ContractInteractionProps } from '.'
import { AbiParam } from '@/services/substrate/types'
import { useDryRunExecution } from '@/view/ContractDetailView/useDryRunExecution'
import { MethodDocumentation } from '@/view/ContractDetailView/MethodDocumentation'
import { ButtonCall } from './styled'
import { CopyToClipboardButton, StyledTextField } from '@/view/components'
import { DryRunMessage } from './DryRunMessage'
import { useContractTx } from '@/hooks/useContractTx'
import { shouldDisable } from '@/services/useink/utils/txUtils'
import { useRecentlyClicked } from '@/hooks/useRecentlyClicked'

type Props = React.PropsWithChildren<
  Omit<ContractInteractionProps, 'type'> & {
    abiParams: AbiParam[]
    inputData: unknown[] | undefined
    onCallback?: () => void
  }
>

export function WriteMethodsForm({
  children,
  abiParams,
  abiMessage,
  contractPromise,
  inputData,
  expanded,
  onCallback,
  substrateRegistry
}: Props) {
  const {
    outcome: outcomeDryRun = '',
    error: errorDryrun,
    isRunning: isDryRunning
  } = useDryRunExecution({
    contractPromise,
    message: abiMessage,
    params: inputData,
    substrateRegistry,
    autoRun: Boolean(expanded)
  })
  const { signAndSend, tx, outcome } = useContractTx({
    contractPromise,
    abiMessage,
    onCallback
  })
  const { ref: refButton, recentlyClicked } = useRecentlyClicked(2000)
  const isLoading = shouldDisable(tx) || recentlyClicked
  const _error = errorDryrun

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
        <Box display="flex" justifyContent="space-between">
          <Typography variant="overline">Tx hash</Typography>
          {shouldDisable(tx) ? (
            <Typography variant="caption">{tx.status}</Typography>
          ) : (
            <DryRunMessage
              error={errorDryrun}
              outcome={outcomeDryRun}
              isRunning={isDryRunning}
            />
          )}
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
                <StyledTextField
                  disabled={isDryRunning || isLoading || Boolean(errorDryrun)}
                  placeholder="Not results yet..."
                  value={outcome}
                />
                <CopyToClipboardButton
                  id="copy-contract-address"
                  sx={{ marginLeft: '0.5rem' }}
                  data={outcome}
                  disabled={isDryRunning || isLoading || Boolean(errorDryrun)}
                />
              </Box>

              <ButtonCall
                ref={refButton}
                disabled={isDryRunning}
                onClick={() => signAndSend(inputData)}
                isLoading={isLoading}
              >
                Call
              </ButtonCall>
            </Box>
            {_error && (
              <FormHelperText error id={`error-${abiMessage.method}`}>
                {_error}
              </FormHelperText>
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
