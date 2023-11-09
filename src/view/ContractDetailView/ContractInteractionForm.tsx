import { Box, Button, Stack, Typography } from '@mui/material'
import { MethodDocumentation } from './MethodDocumentation'
import { MethodInputForm, MethodInputFormProps } from './MethodInputForm'

type Props = MethodInputFormProps

export function ContractInteractionForm({
  abiMessage,
  substrateRegistry
}: Props) {
  return (
    <Box mt={2} ml={3} mr={3}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        spacing={2}
      >
        <Box>
          <MethodInputForm
            abiMessage={abiMessage}
            substrateRegistry={substrateRegistry}
          />
        </Box>
        <Box sx={{ maxWidth: '45%', minWidth: '40%' }}>
          <MethodDocumentation abiMessage={abiMessage} />
        </Box>
        <Stack direction="row">
          <Box>
            <Typography>Outcome</Typography>
          </Box>
          <Box sx={{ maxWidth: '45%', minWidth: '40%' }}>
            <Button>Call</Button>
          </Box>
        </Stack>
      </Stack>
    </Box>
  )
}
