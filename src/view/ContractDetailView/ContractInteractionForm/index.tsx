import { Box } from '@mui/material'
import { useArgValues } from '../useArgValues'
import { ArgumentsForm } from '../ArgumentForm'
import {
  AbiMessage,
  ContractPromise,
  Registry
} from '@/services/substrate/types'
import { ReadMethodsForm } from './ReadMethodsForm'
import { ContractTabType } from '@/domain'
import { WriteMethodsForm } from './WriteMethodsForm'

export type ContractInteractionProps = {
  abiMessage: AbiMessage
  substrateRegistry: Registry
  contractPromise: ContractPromise
  expanded?: boolean
  type: ContractTabType
}

export function ContractInteractionForm({
  abiMessage,
  substrateRegistry,
  contractPromise,
  type,
  expanded
}: ContractInteractionProps) {
  const { argValues, setArgValues, inputData } = useArgValues(
    abiMessage,
    substrateRegistry
  )
  const abiParams = abiMessage.args ?? []

  return (
    <Box mt={2} ml={3} mr={3}>
      {type === 'Read Contract' ? (
        <ReadMethodsForm
          abiMessage={abiMessage}
          contractPromise={contractPromise}
          abiParams={abiParams}
          inputData={inputData}
          substrateRegistry={substrateRegistry}
          expanded={expanded}
        >
          <ArgumentsForm
            argValues={argValues}
            args={abiParams}
            registry={substrateRegistry}
            setArgValues={setArgValues}
          />
        </ReadMethodsForm>
      ) : (
        <WriteMethodsForm
          abiMessage={abiMessage}
          contractPromise={contractPromise}
          abiParams={abiParams}
          inputData={inputData}
          substrateRegistry={substrateRegistry}
          expanded={expanded}
        >
          <ArgumentsForm
            argValues={argValues}
            args={abiParams}
            registry={substrateRegistry}
            setArgValues={setArgValues}
          />
        </WriteMethodsForm>
      )}
    </Box>
  )
}
