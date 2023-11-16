import { Box, FormHelperText, Stack, Typography } from '@mui/material'
import { ContractInteractionProps } from '.'
import { AbiParam } from '@/services/substrate/types'
import { useDryRunExecution } from '@/view/ContractDetailView/useDryRunExecution'
import { MethodDocumentation } from '@/view/ContractDetailView/MethodDocumentation'
import { ButtonCall, MinimalTextField } from './styled'
import { CopyToClipboardButton, StyledTextField } from '@/view/components'
import { DryRunMessage } from './DryRunMessage'
import { useContractTx } from '@/hooks/useContractTx'
import { shouldDisable } from '@/services/useink/utils/txUtils'
import { useRecentlyClicked } from '@/hooks/useRecentlyClicked'
import { ExplorerLink } from '@/view/components/ExplorerLink'

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
  substrateRegistry,
  userContract
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
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Stack direction="row">
            <Typography variant="overline">Tx hash</Typography>
            {outcome && (
              <ExplorerLink
                blockchain={userContract.network}
                txHash={outcome}
              />
            )}
          </Stack>

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
                <MinimalTextField
                  disabled={isDryRunning || isLoading || Boolean(errorDryrun)}
                  placeholder="Result not yet available."
                  value={outcome}
                  fullWidth
                  multiline
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
