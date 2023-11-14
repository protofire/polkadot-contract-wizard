import { Box, CircularProgress, Stack, Typography } from '@mui/material'
import { ContractInteractionProps } from '.'
import { AbiParam } from '@/services/substrate/types'

type Props = React.PropsWithChildren<
  Pick<
    ContractInteractionProps,
    'abiMessage' | 'expanded' | 'contractPromise'
  > & {
    abiParams: AbiParam[]
    inputData: unknown[] | undefined
  }
>

export function WriteMethodsForm({ children, abiParams }: Props) {
  // const { outcome, executeDryRun } = useDryRunExecution({
  //   contractPromise,
  //   message: abiMessage,
  //   params: inputData,
  //   autoRun: false
  // })

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
          <Typography variant="body1">Outcome</Typography>
        </Box>

        {/* <Stack direction="row" justifyContent="space-between">
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
        </Stack> */}
      </Box>
      <Box sx={{ maxWidth: '45%', minWidth: '40%' }}>
        {/* <MethodDocumentation abiMessage={abiMessage} /> */}
      </Box>
    </Stack>
  )
}
